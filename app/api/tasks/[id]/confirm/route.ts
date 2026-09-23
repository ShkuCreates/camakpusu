import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const discountCode = typeof body?.discountCode === "string" ? body.discountCode.trim().toUpperCase() : "";
  
  const task = await db.task.findUnique({ where: { id }, include: { transaction: true } });
  if (!task || task.requesterId !== user.id || task.status !== "AWAITING_CONFIRMATION") return NextResponse.json({ error: "Confirmation is not available for this task." }, { status: 403 });

  let finalAmount = task.transaction?.amount || task.budget;
  let discountApplied = 0;

  // Validate and apply discount code
  if (discountCode) {
    const discount = await db.discountCode.findUnique({ where: { code: discountCode } });
    if (discount && discount.isActive) {
      if (discount.expiresAt && new Date() > discount.expiresAt) {
        return NextResponse.json({ error: "Discount code has expired." }, { status: 400 });
      }
      if (discount.currentUses >= discount.maxUses) {
        return NextResponse.json({ error: "Discount code has reached maximum uses." }, { status: 400 });
      }
      
      discountApplied = Math.round(finalAmount * (discount.discountPercent / 100));
      finalAmount = finalAmount - discountApplied;
      
      // Increment discount code usage
      await db.discountCode.update({
        where: { id: discount.id },
        data: { currentUses: { increment: 1 } }
      });
    } else {
      return NextResponse.json({ error: "Invalid discount code." }, { status: 400 });
    }
  }

  const updated = await db.$transaction(async (tx) => {
    const result = await tx.task.update({ where: { id }, data: { status: "COMPLETED" } });
    if (task.transaction) {
      await tx.transaction.update({ 
        where: { id: task.transaction.id }, 
        data: { 
          status: "COMPLETED",
          amount: finalAmount 
        } 
      });
      if (task.providerId) {
        await tx.walletEntry.create({ 
          data: { 
            userId: task.providerId, 
            amount: finalAmount, 
            status: "AVAILABLE", 
            reason: `Completed task ${task.id}${discountApplied > 0 ? ` (₹${discountApplied} discount applied)` : ""}` 
          } 
        });
        await tx.user.update({ where: { id: task.providerId }, data: { completedTasks: { increment: 1 } } });
      }
    }
    if (task.providerId) {
      await tx.notification.create({ 
        data: { 
          userId: task.providerId, 
          title: "Task confirmed", 
          body: `${user.username} confirmed your work. Your earnings of ₹${finalAmount} are now available.${discountApplied > 0 ? ` ₹${discountApplied} discount was applied.` : ""}`, 
          category: "Wallet" 
        } 
      });
    }
    return result;
  });
  
  return NextResponse.json({ 
    task: updated, 
    finalAmount, 
    discountApplied,
    originalAmount: task.transaction?.amount || task.budget
  });
}
