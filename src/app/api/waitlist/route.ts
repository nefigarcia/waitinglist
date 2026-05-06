import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Body {
  option: string;
  optionName: string;
  name: string;
  email: string;
  situation: string;
  outcome: string;
  blocker: string;
  budget: string;
  notes?: string;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { option, optionName, name, email, situation, outcome, blocker, budget, notes } = body;

  // Basic validation
  if (!option || !optionName || !name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }
  if (!situation || !outcome || !blocker?.trim() || !budget) {
    return NextResponse.json({ error: "Please answer all required questions" }, { status: 400 });
  }

  try {
    const entry = await prisma.waitlistEntry.create({
      data: {
        option,
        optionName,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        situation,
        outcome,
        blocker: blocker.trim(),
        budget,
        notes: notes?.trim() || null,
      },
    });

    return NextResponse.json({ id: entry.id }, { status: 201 });
  } catch (err) {
    console.error("DB error:", err);
    return NextResponse.json({ error: "Failed to save. Please try again." }, { status: 500 });
  }
}
