import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const tasks = await db.task.findMany({
      where: { status: { in: ["OPEN", "OFFER_RECEIVED"] } },
      include: { requester: { select: { username: true, college: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      tasks.map((task) => ({
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
      })),
    );
  } catch {
    return NextResponse.json({ error: "Task service unavailable" }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.json({ error: "Sign in required" }, { status: 401 });
  const body = await request.json().catch(() => null);
  const title = typeof body?.title === "string" ? body.title.trim() : "";
  const description = typeof body?.description === "string" ? body.description.trim() : "";
  const category = typeof body?.category === "string" ? body.category.trim() : "";
  const locality = typeof body?.locality === "string" ? body.locality.trim() : "";
  const format = typeof body?.format === "string" ? body.format.trim() : "";
  const college = typeof body?.college === "string" ? body.college.trim() : "";
  const budget = typeof body?.budget === "number" ? body.budget : Number(body?.budget);
  const deadline = typeof body?.deadline === "string" ? new Date(body.deadline) : null;
  const requesterId = currentUser.id;

  if (!title || !description || !category || !locality || !format || !college || !requesterId || !Number.isInteger(budget) || budget <= 0 || !deadline || Number.isNaN(deadline.valueOf())) {
    return NextResponse.json({ error: "Invalid task payload" }, { status: 400 });
  }

  const requester = await db.user.findUnique({ where: { id: requesterId }, select: { id: true } });
  if (!requester) {
    return NextResponse.json({ error: "Requester account not found" }, { status: 404 });
  }

  const task = await db.task.create({
    data: { title, description, category, locality, format, budget, deadline, college, requesterId },
  });

  return NextResponse.json({ id: task.id }, { status: 201 });
}
