import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  const withdrawals = await db.withdrawal.findMany({ include: { user: { select: { username: true, email: true } } }, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ withdrawals });
}

export async function PATCH(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  const body = await request.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id : "";
  const status = ["PROCESSING", "PAID", "REJECTED"].includes(body?.status) ? body.status : null;
  if (!id || !status) return NextResponse.json({ error: "Valid withdrawal status required." }, { status: 400 });

  const withdrawal = await db.withdrawal.findUnique({ where: { id } });
  if (!withdrawal) return NextResponse.json({ error: "Withdrawal not found." }, { status: 404 });
  const updated = await db.withdrawal.update({ where: { id }, data: { status, reviewedAt: new Date() } });
  if (status === "PAID") await db.walletEntry.create({ data: { userId: withdrawal.userId, amount: -withdrawal.amount, status: "WITHDRAWAL_PAID", reason: `Withdrawal ${withdrawal.id}` } });
  await db.notification.create({ data: { userId: withdrawal.userId, title: `Withdrawal ${status.toLowerCase()}`, body: `Your ₹${withdrawal.amount} withdrawal was marked ${status.toLowerCase()} by admin.`, category: "Finance" } });
  return NextResponse.json({ withdrawal: updated });
}
