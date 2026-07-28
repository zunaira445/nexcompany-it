import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { generateToken, setTokenCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Please provide email and password" },
        { status: 400 }
      );
    }

    // Find user with password
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Check if verified
    if (!user.isVerified) {
      return NextResponse.json(
        { success: false, message: "Please verify your email first" },
        { status: 401 }
      );
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken({
      userId: user._id,
      email: user.email,
      role: user.role,
    });
    await setTokenCookie(token);

    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}