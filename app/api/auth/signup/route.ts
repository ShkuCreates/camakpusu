import { NextResponse } from "next/server";
import { randomBytes, scryptSync } from "node:crypto";

import { db } from "@/lib/db";
import { setSession } from "@/lib/auth";
import { Prisma } from "@prisma/client";

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
    const role = email === process.env.INITIAL_ADMIN_EMAIL?.trim().toLowerCase() ? "ADMIN" : "STUDENT";
    const user = await db.user.create({ data: { username: `@${username}`, email, passwordHash, college: college || null, role } });
    await setSession(user.id);
    return NextResponse.json({ created: true, role: user.role }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ error: "That username or email is already registered." }, { status: 409 });
    }
    console.error("Signup failed", error);
    return NextResponse.json({ error: "The account service is unavailable. Check the Render database connection." }, { status: 503 });
  }
}