import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  
  // Get the latest user data from database to ensure accurate ratings and completed tasks
  const freshUser = await db.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      username: true,
      email: true,
      college: true,
      locality: true,
      bio: true,
      rating: true,
      completedTasks: true,
      role: true,
      createdAt: true
    }
  });
  
  if (!freshUser) return NextResponse.json({ error: "User not found" }, { status: 404 });
  
  return NextResponse.json({ user: freshUser });
}

export async function PATCH(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const college = typeof body?.college === "string" ? body.college.trim() : null;
  const locality = typeof body?.locality === "string" ? body.locality.trim() : null;
  const bio = typeof body?.bio === "string" ? body.bio.trim() : null;

  // Only update fields that are provided, keep existing values for empty strings
  const updateData: any = {};
  if (college !== undefined) updateData.college = college || null;
  if (locality !== undefined) updateData.locality = locality || null;
  if (bio !== undefined) updateData.bio = bio || null;

  const updated = await db.user.update({
    where: { id: user.id },
    data: updateData,
    select: {
      id: true,
      username: true,
      email: true,
      college: true,
      locality: true,
      bio: true,
      rating: true,
      completedTasks: true,
      role: true,
      createdAt: true
    }
  });
  return NextResponse.json({ user: updated });
}
