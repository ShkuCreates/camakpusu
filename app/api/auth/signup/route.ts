import { NextResponse } from "next/server";
import { randomBytes, scryptSync } from "node:crypto";

import { db } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const username = typeof body?.username === "string" ? body.username.trim().replace(/^@/, "") : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const college = typeof body?.college === "string" ? body.college.trim() : null;

  if (!/^[a-zA-Z0-9_.-]{3,30}$/.test(username) || !email.includes("@") || password.length < 8) {
    return NextResponse.json({ error: "Use a valid username, email, and password of at least 8 characters." }, { status: 400 });
  }

  const salt = randomBytes(16).toString("hex");
  const passwordHash = `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;

  try {
    await db.user.create({ data: { username: `@${username}`, email, passwordHash, college: college || null } });
    return NextResponse.json({ created: true }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error && error.message.includes("Unique constraint")
      ? "That username or email is already registered."
      : "We could not create your account right now.";
    return NextResponse.json({ error: message }, { status: 409 });
  }
}