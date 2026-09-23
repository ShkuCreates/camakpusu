import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  
  const [users, tasks, completed, withdrawals, notifications, walletData] = await Promise.all([
    db.user.count(),
    db.task.count(),
    db.task.count({ where: { status: "COMPLETED" } }),
    db.withdrawal.count({ where: { status: { in: ["PENDING", "PROCESSING"] } } }),
    db.notification.count({ where: { unread: true } }),
    db.walletEntry.aggregate({
      _sum: { amount: true },
      where: { amount: { gt: 0 } }
    })
  ]);
  
  // Calculate active users (users who have logged in or performed actions in the last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const activeUsers = await db.user.count({
    where: {
      OR: [
        { updatedAt: { gte: thirtyDaysAgo } },
        { requestedTasks: { some: { createdAt: { gte: thirtyDaysAgo } } } },
        { providerTasks: { some: { createdAt: { gte: thirtyDaysAgo } } } }
      ]
    }
  });
  
  const totalEarnings = walletData._sum.amount || 0;
  
  return NextResponse.json({ 
    users, 
    tasks, 
    completed, 
    pendingWithdrawals: withdrawals, 
    unreadNotifications: notifications,
    totalEarnings,
    activeUsers
  });
}
