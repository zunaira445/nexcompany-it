import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import SiteSettings from "@/models/SiteSettings";
import { requireAdmin } from "@/lib/adminAuth";

// GET site settings (public) — creates the default document on first call
export async function GET() {
  try {
    await connectDB();
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    return NextResponse.json({ success: true, settings }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// PUT update site settings (admin only)
export async function PUT(req: NextRequest) {
  try {
    if (!(await requireAdmin(req))) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
    }
    await connectDB();
    const body = await req.json();
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(body);
    } else {
      Object.assign(settings, body);
      await settings.save();
    }
    return NextResponse.json({ success: true, settings }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}