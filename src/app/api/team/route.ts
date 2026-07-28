import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import TeamMember from "@/models/TeamMember";
import { requireAdmin } from "@/lib/adminAuth";

// GET all team members (public)
export async function GET() {
  try {
    await connectDB();
    const members = await TeamMember.find().sort({ order: 1 });
    return NextResponse.json({ success: true, members }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST create a new team member (admin only)
export async function POST(req: NextRequest) {
  try {
    if (!(await requireAdmin(req))) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
    }
    await connectDB();
    const body = await req.json();
    const member = await TeamMember.create(body);
    return NextResponse.json({ success: true, member }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}