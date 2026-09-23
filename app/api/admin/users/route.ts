import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Admin access required" }, { status: 403 });

  const users = await db.user.findMany({
    select: { 
      id: true, 
      username: true, 
      email: true, 
      college: true, 
      role: true, 
      createdAt: true,
      rating: true,
      completedTasks: true
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(users);
}

export async function PATCH(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Admin access required" }, { status: 403 });

  const body = await request.json().catch(() => null);
  const userId = typeof body?.userId === "string" ? body.userId : "";
  const action = typeof body?.action === "string" ? body.action : "";
  
  if (!userId || !action) return NextResponse.json({ error: "User ID and action are required." }, { status: 400 });

  if (userId === admin.id && action === "removeAdmin") {
    return NextResponse.json({ error: "You cannot remove your own admin access." }, { status: 400 });
  }

  try {
    let user;
    
    if (action === "makeAdmin") {
      user = await db.user.update({ 
        where: { id: userId }, 
        data: { role: "ADMIN" },
        select: { id: true, role: true, username: true }
      });
      await db.notification.create({
        data: {
          userId,
          title: "Admin access granted",
          body: "You have been granted admin access to CampusAid.",
          category: "Admin"
        }
      });
    } else if (action === "removeAdmin") {
      user = await db.user.update({ 
        where: { id: userId }, 
        data: { role: "STUDENT" },
        select: { id: true, role: true, username: true }
      });
      await db.notification.create({
        data: {
          userId,
          title: "Admin access removed",
          body: "Your admin access to CampusAid has been removed.",
          category: "Admin"
        }
      });
    } else if (action === "flagUser") {
      await db.notification.create({
        data: {
          userId,
          title: "Account flagged",
          body: "Your account has been flagged by admin. Please contact support if you believe this is an error.",
          category: "Admin"
        }
      });
      user = await db.user.findUnique({
        where: { id: userId },
        select: { id: true, username: true, email: true }
      });
    } else if (action === "logoutUser") {
      // Create a notification telling the user they've been logged out
      await db.notification.create({
        data: {
          userId,
          title: "Session terminated",
          body: "An admin has terminated your current session. Please log in again.",
          category: "Admin"
        }
      });
      user = await db.user.findUnique({
        where: { id: userId },
        select: { id: true, username: true, email: true }
      });
    } else if (action === "addFunds") {
      const amount = typeof body?.amount === "number" ? body.amount : 0;
      if (amount <= 0) {
        return NextResponse.json({ error: "Amount must be greater than 0" }, { status: 400 });
      }
      
      await db.walletEntry.create({
        data: {
          userId,
          amount: amount,
          status: "AVAILABLE",
          reason: "Admin bonus added"
        }
      });
      
      await db.notification.create({
        data: {
          userId,
          title: "Funds added to wallet",
          body: `An admin has added ₹${amount} to your wallet. You can now withdraw these funds.`,
          category: "Wallet"
        }
      });
      
      user = await db.user.findUnique({
        where: { id: userId },
        select: { id: true, username: true, email: true }
      });
    } else {
      return NextResponse.json({ error: "Invalid action." }, { status: 400 });
    }
    
    return NextResponse.json({ user, action });
  } catch (error) {
    console.error("Admin action failed:", error);
    return NextResponse.json({ error: "Action failed. User not found or operation not permitted." }, { status: 404 });
  }
}