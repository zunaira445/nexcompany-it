import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Portfolio from "@/models/Portfolio";
import { requireAdmin } from "@/lib/adminAuth";

// GET all portfolio projects (public)
export async function GET() {
  try {
    await connectDB();
    const projects = await Portfolio.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, projects }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// POST create a new project (admin only)
export async function POST(req: NextRequest) {
  try {
    if (!(await requireAdmin(req))) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
    }
    await connectDB();
    const body = await req.json();
    const project = await Portfolio.create(body);
    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}