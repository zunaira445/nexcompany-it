import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import OTPVerification from "@/models/OTPVerification";
import { generateOTP } from "@/lib/utils";
import { sendOTP } from "@/lib/mail";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, type } = await req.json();

    if (!email || !type) {
      return NextResponse.json(
        { success: false, message: "Please provide email and type" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "No account found with this email" },
        { status: 404 }
      );
    }

    // Remove any previous OTPs for this email/type to avoid confusion
    await OTPVerification.deleteMany({ email, type });

    const otp = generateOTP();
    await OTPVerification.create({ email, otp, type });
    await sendOTP(email, otp, type);

    return NextResponse.json(
      { success: true, message: "A new verification code has been sent to your email." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Resend OTP error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}