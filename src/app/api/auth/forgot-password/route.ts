import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import OTPVerification from "@/models/OTPVerification";
import { generateOTP } from "@/lib/utils";
import { sendOTP } from "@/lib/mail";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Please provide email" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Generate and send OTP
    const otp = generateOTP();
    await OTPVerification.create({
      email,
      otp,
      type: "forgot-password",
    });

    await sendOTP(email, otp, "forgot-password");

    return NextResponse.json(
      { success: true, message: "OTP sent to your email" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}