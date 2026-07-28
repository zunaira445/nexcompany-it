import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Portfolio from "@/models/Portfolio";
import { requireAdmin } from "@/lib/adminAuth";

// PUT update a project (admin only)
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await requireAdmin(req))) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
    }
    const { id } = await params;
    await connectDB();
    const body = await req.json();
    const project = await Portfolio.findByIdAndUpdate(id, body, { new: true });
    if (!project) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, project }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// DELETE a project (admin only)
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await requireAdmin(req))) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
    }
    const { id } = await params;
    await connectDB();
    const project = await Portfolio.findByIdAndDelete(id);
    if (!project) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Project deleted" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}