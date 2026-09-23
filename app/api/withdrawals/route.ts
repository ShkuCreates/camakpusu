import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  const withdrawals = await db.withdrawal.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } });
  return NextResponse.json({ withdrawals });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  const body = await request.json().catch(() => null);
  const amount = Number(body?.amount);
  const method = typeof body?.method === "string" ? body.method.trim() : "";
  const destination = typeof body?.destination === "string" ? body.destination.trim() : "";
  if (!Number.isInteger(amount) || amount < 500 || !method || !destination) return NextResponse.json({ error: "Minimum withdrawal is ₹500 and payout details are required." }, { status: 400 });

  const entries = await db.walletEntry.findMany({ where: { userId: user.id, status: { in: ["AVAILABLE", "WITHDRAWAL_PAID"] } } });
  const available = entries.reduce((total, entry) => total + entry.amount, 0);
  const pending = await db.withdrawal.findMany({ where: { userId: user.id, status: { in: ["PENDING", "PROCESSING"] } } });
  const reserved = pending.reduce((total, item) => total + item.amount, 0);
  if (amount > available - reserved) return NextResponse.json({ error: "Withdrawal amount exceeds your available balance." }, { status: 400 });

  const withdrawal = await db.withdrawal.create({ data: { userId: user.id, amount, method, destination } });
  await db.notification.create({ data: { userId: user.id, title: "Withdrawal request received", body: `Your ₹${amount} withdrawal is waiting for admin review.`, category: "Finance" } });
  return NextResponse.json({ withdrawal }, { status: 201 });
}
