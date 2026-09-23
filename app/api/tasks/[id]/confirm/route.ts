import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  const { id } = await params;
  const task = await db.task.findUnique({ where: { id }, include: { transaction: true } });
  if (!task || task.requesterId !== user.id || task.status !== "AWAITING_CONFIRMATION") return NextResponse.json({ error: "Confirmation is not available for this task." }, { status: 403 });

  const updated = await db.$transaction(async (tx) => {
    const result = await tx.task.update({ where: { id }, data: { status: "COMPLETED" } });
    if (task.transaction) {
      await tx.transaction.update({ where: { id: task.transaction.id }, data: { status: "COMPLETED" } });
      if (task.providerId) {
        await tx.walletEntry.create({ data: { userId: task.providerId, amount: task.transaction.amount, status: "AVAILABLE", reason: `Completed task ${task.id}` } });
        await tx.user.update({ where: { id: task.providerId }, data: { completedTasks: { increment: 1 } } });
      }
    }
    if (task.providerId) {
      await tx.notification.create({ 
        data: { 
          userId: task.providerId, 
          title: "Task confirmed", 
          body: `${user.username} confirmed your work. Your earnings of ₹${task.transaction?.amount || task.budget} are now available.`, 
          category: "Wallet" 
        } 
      });
    }
    return result;
  });
  return NextResponse.json({ task: updated });
}
