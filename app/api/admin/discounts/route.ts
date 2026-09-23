import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Admin access required" }, { status: 403 });

  const discountCodes = await db.discountCode.findMany({
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json(discountCodes);
}

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Admin access required" }, { status: 403 });

  const body = await request.json().catch(() => null);
  const code = typeof body?.code === "string" ? body.code.trim().toUpperCase() : "";
  const discountPercent = typeof body?.discountPercent === "number" ? body.discountPercent : 0;
  const maxUses = typeof body?.maxUses === "number" ? body.maxUses : 100;
  const expiresAt = body?.expiresAt ? new Date(body.expiresAt) : null;

  if (!code || discountPercent <= 0 || discountPercent > 100) {
    return NextResponse.json({ error: "Valid code and discount percentage (1-100) required." }, { status: 400 });
  }

  try {
    const discountCode = await db.discountCode.create({
      data: {
        code,
        discountPercent,
        maxUses,
        expiresAt,
        isActive: true
      }
    });
    return NextResponse.json(discountCode, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Discount code already exists." }, { status: 409 });
  }
}

export async function PATCH(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Admin access required" }, { status: 403 });

  const body = await request.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id : "";
  const isActive = typeof body?.isActive === "boolean" ? body.isActive : null;

  if (!id || isActive === null) {
    return NextResponse.json({ error: "Valid ID and status required." }, { status: 400 });
  }

  try {
    const discountCode = await db.discountCode.update({
      where: { id },
      data: { isActive }
    });
    return NextResponse.json(discountCode);
  } catch {
    return NextResponse.json({ error: "Discount code not found." }, { status: 404 });
  }
}