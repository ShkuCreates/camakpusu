import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const author = await getCurrentUser();
  if (!author) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  const body = await request.json().catch(() => null);
  const taskId = typeof body?.taskId === "string" ? body.taskId : "";
  const score = Number(body?.score);
  const review = typeof body?.review === "string" ? body.review.trim() : null;
  if (!taskId || !Number.isInteger(score) || score < 1 || score > 5) return NextResponse.json({ error: "Choose a rating from 1 to 5." }, { status: 400 });

  const task = await db.task.findUnique({ where: { id: taskId }, include: { transaction: true } });
  if (!task || task.status !== "COMPLETED" || (task.requesterId !== author.id && task.providerId !== author.id)) {
    return NextResponse.json({ error: "Only participants can rate completed tasks." }, { status: 403 });
  }
  const recipientId = task.requesterId === author.id ? task.providerId : task.requesterId;
  if (!recipientId) return NextResponse.json({ error: "No rating recipient is assigned." }, { status: 400 });

  try {
    const rating = await db.rating.create({ data: { score, review: review || null, taskId, authorId: author.id, recipientId } });
    const aggregate = await db.rating.aggregate({ where: { recipientId }, _avg: { score: true }, _count: { score: true } });
    await db.user.update({ 
      where: { id: recipientId }, 
      data: { rating: aggregate._avg.score ?? 0 } 
    });
    await db.notification.create({ 
      data: { 
        userId: recipientId, 
        title: "New rating received", 
        body: `${author.username} rated your completed task ${score}/5. Your new average is ${(aggregate._avg.score ?? 0).toFixed(1)}.`, 
        category: "Rating" 
      } 
    });
    return NextResponse.json({ rating, newAverage: aggregate._avg.score ?? 0 }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "You have already rated this task." }, { status: 409 });
  }
}
