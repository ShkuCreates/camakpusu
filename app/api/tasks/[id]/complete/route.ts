import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const notes = typeof body?.notes === "string" ? body.notes.trim() : "";
  const files = typeof body?.files === "string" ? body.files.trim() : null;
  const task = await db.task.findUnique({ where: { id }, include: { transaction: true } });
  if (!task || task.providerId !== user.id) return NextResponse.json({ error: "Only the assigned provider can complete this task." }, { status: 403 });

  const updated = await db.$transaction(async (tx) => {
    const result = await tx.task.update({ where: { id }, data: { status: "AWAITING_CONFIRMATION", completionNotes: notes || null, completionFiles: files || null, completedAt: new Date() } });
    if (task.transaction) await tx.transaction.update({ where: { id: task.transaction.id }, data: { status: "SUBMITTED" } });
    await tx.notification.create({ data: { userId: task.requesterId, title: "Work submitted", body: `${user.username} submitted work for your task.`, category: "Task" } });
    return result;
  });
  return NextResponse.json({ task: updated });
}
