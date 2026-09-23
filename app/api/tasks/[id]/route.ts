import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const task = await db.task.findUnique({
    where: { id },
    include: { 
      requester: { select: { username: true, college: true } },
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
    locality: task.locality,
    deadline: task.deadline.toISOString(),
    budget: task.budget,
    posted: task.createdAt.toISOString(),
    status: task.status,
    format: task.format,
    college: task.college ?? task.requester.college,
    ratings: task.ratings.map(rating => ({
      id: rating.id,
      score: rating.score,
      review: rating.review,
      author: rating.author,
      createdAt: rating.createdAt.toISOString()
    }))
  });
}
