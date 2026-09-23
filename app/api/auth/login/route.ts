import { NextResponse } from "next/server";
import { scryptSync, timingSafeEqual } from "node:crypto";

import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { setSession } from "@/lib/auth";

function matchesPassword(password: string, storedHash: string) {
  const [salt, hash] = storedHash.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const identifier = typeof body?.identifier === "string" ? body.identifier.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!identifier || !password) return NextResponse.json({ error: "Enter your username or email and password." }, { status: 400 });

  const normalizedUsername = identifier.startsWith("@") ? identifier : `@${identifier}`;
  const user = await db.user.findFirst({
    where: {
      OR: [
        { email: identifier },
        { username: normalizedUsername },
        { username: identifier },
      ],
    },
  });
  if (!user || !matchesPassword(password, user.passwordHash)) return NextResponse.json({ error: "The login details are not valid." }, { status: 401 });

  const bootstrapEmail = process.env.INITIAL_ADMIN_EMAIL?.trim().toLowerCase();
  const currentUser = bootstrapEmail === user.email && user.role !== "ADMIN"
    ? await db.user.update({ where: { id: user.id }, data: { role: "ADMIN" } })
    : user;

  await setSession(currentUser.id);
  return NextResponse.json({ loggedIn: true, role: currentUser.role });
}

export async function DELETE() {
  const { clearSession } = await import("@/lib/auth");
  await clearSession();
  return NextResponse.json({ loggedOut: true });
}