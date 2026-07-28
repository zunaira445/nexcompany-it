import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import OTPVerification from "@/models/OTPVerification";
import { generateToken, setTokenCookie } from "@/lib/auth";
import { sendWelcomeEmail } from "@/lib/mail";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, otp, type } = await req.json();

    if (!email || !otp || !type) {
      return NextResponse.json(
        { success: false, message: "Please provide email, OTP, and type" },
        { status: 400 }
      );
    }

    // Find OTP record
    const otpRecord = await OTPVerification.findOne({
      email,
      otp,
      type,
    }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return NextResponse.json(
        { success: false, message: "Invalid OTP" },
        { status: 400 }
      );
    }

    if (new Date() > otpRecord.expiresAt) {
      return NextResponse.json(
        { success: false, message: "OTP has expired" },
        { status: 400 }
      );
    }

    if (type === "register") {
      // Verify user
      const user = await User.findOneAndUpdate(
        { email },
        { isVerified: true },
        { new: true }
      );

      if (!user) {
        return NextResponse.json(
          { success: false, message: "User not found" },
          { status: 404 }
        );
      }

      // Delete OTP
      await OTPVerification.deleteOne({ _id: otpRecord._id });

      // Generate token and set cookie
      const token = generateToken({
        userId: user._id,
        email: user.email,
        role: user.role,
      });
      await setTokenCookie(token);

      // Send welcome email
      await sendWelcomeEmail(email, user.fullName);

      return NextResponse.json(
        {
          success: true,
          message: "Email verified successfully",
          user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
          },
        },
        { status: 200 }
      );
    }

    if (type === "forgot-password") {
      // Delete OTP
      await OTPVerification.deleteOne({ _id: otpRecord._id });

      return NextResponse.json(
        { success: true, message: "OTP verified. You can now reset your password." },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Invalid type" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("OTP verification error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}