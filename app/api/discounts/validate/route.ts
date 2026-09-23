import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Sign in required" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const code = typeof body?.code === "string" ? body.code.trim().toUpperCase() : "";

  if (!code) {
    return NextResponse.json({ error: "Discount code required." }, { status: 400 });
  }

  const discountCode = await db.discountCode.findUnique({
    where: { code }
  });

  if (!discountCode) {
    return NextResponse.json({ error: "Invalid discount code." }, { status: 404 });
  }

  if (!discountCode.isActive) {
    return NextResponse.json({ error: "This discount code is not active." }, { status: 400 });
  }

  if (discountCode.expiresAt && new Date() > discountCode.expiresAt) {
    return NextResponse.json({ error: "This discount code has expired." }, { status: 400 });
  }

  if (discountCode.currentUses >= discountCode.maxUses) {
    return NextResponse.json({ error: "This discount code has reached its maximum uses." }, { status: 400 });
  }

  return NextResponse.json({
    valid: true,
    discountPercent: discountCode.discountPercent,
    code: discountCode.code
  });
}