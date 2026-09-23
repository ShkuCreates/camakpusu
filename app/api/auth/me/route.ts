import { NextResponse } from "next/server";

import { getCurrentUser, setSession } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ user: null });
  await setSession(user.id);
  return NextResponse.json({ user: { id: user.id, username: user.username, email: user.email, role: user.role, college: user.college } });
}
