import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getCurrentUser, requireAdmin } from "@/lib/auth";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const task = await db.task.findUnique({
    where: { id },
    include: { 
      requester: { select: { username: true, college: true } },
      provider: { select: { username: true, college: true, rating: true, completedTasks: true } },
      ratings: {
        include: {
          author: { select: { username: true } }
        },
        orderBy: { createdAt: 'desc' }
      }
    },
  });

  if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 });

  return NextResponse.json({
    id: task.id,
    title: task.title,
    category: task.category,
    description: task.description,
    requester: task.requester.username,
    provider: task.provider?.username ?? null,
    providerStats: task.provider ? { rating: task.provider.rating, completedTasks: task.provider.completedTasks, college: task.provider.college } : null,
    locality: task.locality,
    deadline: task.deadline.toISOString(),
    budget: task.budget,
    posted: task.createdAt.toISOString(),
    status: task.status,
    format: task.format,
    college: task.college ?? task.requester.college,
    completionNotes: task.completionNotes ?? null,
    completionFiles: task.completionFiles ?? null,
    ratings: task.ratings.map(rating => ({
      id: rating.id,
      score: rating.score,
      review: rating.review,
      author: rating.author,
      createdAt: rating.createdAt.toISOString()
    }))
  });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Admin access required" }, { status: 401 });

  const { id } = await params;
  const existing = await db.task.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Task not found" }, { status: 404 });

  await db.$transaction([
    db.offer.deleteMany({ where: { taskId: id } }),
    db.message.deleteMany({ where: { taskId: id } }),
    db.dispute.deleteMany({ where: { taskId: id } }),
    db.rating.deleteMany({ where: { taskId: id } }),
    db.transaction.deleteMany({ where: { taskId: id } }),
    db.task.delete({ where: { id } }),
  ]);

  return NextResponse.json({ deleted: true, id });
}
