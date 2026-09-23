import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  const [entries, withdrawals] = await Promise.all([
    db.walletEntry.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } }),
    db.withdrawal.findMany({ where: { userId: user.id }, orderBy: { createdAt: "desc" } }),
  ]);
  const earned = entries.filter((entry) => entry.amount > 0).reduce((total, entry) => total + entry.amount, 0);
  const withdrawn = withdrawals.filter((item) => item.status === "PAID").reduce((total, item) => total + item.amount, 0);
  const pending = withdrawals.filter((item) => item.status === "PENDING" || item.status === "PROCESSING").reduce((total, item) => total + item.amount, 0);
  const available = earned - withdrawn - pending;
  
  // Combine entries and withdrawals for display
  const allTransactions = [
    ...entries.map(entry => ({
      id: entry.id,
      amount: entry.amount,
      reason: entry.reason,
      status: entry.status,
      type: 'entry',
      createdAt: entry.createdAt.toISOString()
    })),
    ...withdrawals.map(withdrawal => ({
      id: withdrawal.id,
      amount: -withdrawal.amount,
      reason: `Withdrawal via ${withdrawal.method}`,
      status: withdrawal.status,
      type: 'withdrawal',
      createdAt: withdrawal.createdAt.toISOString()
    }))
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
  return NextResponse.json({ 
    entries, 
    withdrawals, 
    allTransactions,
    available, 
    pending, 
    earned, 
    withdrawn 
  });
}
