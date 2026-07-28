import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Service from "@/models/Service";
import { requireAdmin } from "@/lib/adminAuth";

// GET all services
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const query = category ? { category, isActive: true } : { isActive: true };
    const services = await Service.find(query).sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, services },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// POST create service (Admin only)
export async function POST(req: NextRequest) {
  try {
    if (!(await requireAdmin(req))) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
    }
    await connectDB();
    const body = await req.json();

    const service = await Service.create(body);

    return NextResponse.json(
      { success: true, service },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}