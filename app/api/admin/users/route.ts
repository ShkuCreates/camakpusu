import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Admin access required" }, { status: 403 });

  const users = await db.user.findMany({
    select: { id: true, username: true, email: true, college: true, role: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(users);
}

export async function PATCH(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Admin access required" }, { status: 403 });

  const body = await request.json().catch(() => null);
  const userId = typeof body?.userId === "string" ? body.userId : "";
  const role = body?.role === "ADMIN" ? "ADMIN" : body?.role === "STUDENT" ? "STUDENT" : null;
  if (!userId || !role) return NextResponse.json({ error: "A valid user and role are required." }, { status: 400 });

  if (userId === admin.id && role !== "ADMIN") return NextResponse.json({ error: "You cannot remove your own admin access." }, { status: 400 });

  try {
    const user = await db.user.update({ where: { id: userId }, data: { role }, select: { id: true, role: true } });
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }
}