import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import TeamMember from "@/models/TeamMember";
import { requireAdmin } from "@/lib/adminAuth";

// PUT update a team member (admin only)
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await requireAdmin(req))) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
    }
    const { id } = await params;
    await connectDB();
    const body = await req.json();
    const member = await TeamMember.findByIdAndUpdate(id, body, { new: true });
    if (!member) {
      return NextResponse.json({ success: false, message: "Team member not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, member }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// DELETE a team member (admin only)
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await requireAdmin(req))) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
    }
    const { id } = await params;
    await connectDB();
    const member = await TeamMember.findByIdAndDelete(id);
    if (!member) {
      return NextResponse.json({ success: false, message: "Team member not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Team member deleted" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}