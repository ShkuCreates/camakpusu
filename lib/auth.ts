import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

import { db } from "@/lib/db";

const sessionCookie = "campusaid_session";
const sessionSecret = process.env.SESSION_SECRET ?? "development-only-change-me";

const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 90;
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 90;

type SessionPayload = { userId: string; exp: number };

function sign(value: string) {
  return createHmac("sha256", sessionSecret).update(value).digest("base64url");
}

export function createSessionToken(userId: string, durationMs = SESSION_DURATION_MS) {
  const payload = Buffer.from(JSON.stringify({ userId, exp: Date.now() + durationMs })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function verifySessionToken(token: string): SessionPayload | null {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = sign(payload);
  const isValid = signature.length === expected.length && timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  if (!isValid) return null;

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString()) as SessionPayload;
    return session.exp > Date.now() ? session : null;
  } catch {
    return null;
  }
}

export async function setSession(userId: string) {
  const cookieStore = await cookies();
  cookieStore.set(sessionCookie, createSessionToken(userId), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookie);
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookie)?.value;
  const session = token ? verifySessionToken(token) : null;
  if (!session) return null;

  return db.user.findUnique({ where: { id: session.userId } });
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  return user?.role === "ADMIN" ? user : null;
}
