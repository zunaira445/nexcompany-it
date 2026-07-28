import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Service from "@/models/Service";
import { requireAdmin } from "@/lib/adminAuth";

// GET single service (public)
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const service = await Service.findById(id);

    if (!service) {
      return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, service }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// PUT update service (admin only)
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await requireAdmin(req))) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
    }
    const { id } = await params;
    await connectDB();
    const body = await req.json();

    const service = await Service.findByIdAndUpdate(id, body, { new: true });

    if (!service) {
      return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, service }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// DELETE service (admin only)
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await requireAdmin(req))) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
    }
    const { id } = await params;
    await connectDB();
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Service deleted" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}