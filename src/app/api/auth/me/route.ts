import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { verifyToken, getTokenFromCookies } from "@/lib/auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const token = await getTokenFromCookies();

    // 1) Try our custom email/password JWT cookie first
    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        const user = await User.findById(decoded.userId).select("-password");
        if (user) {
          return NextResponse.json(
            {
              success: true,
              user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                avatar: user.avatar,
                role: user.role,
              },
            },
            { status: 200 }
          );
        }
      }
    }

    // 2) Fall back to a NextAuth (Google) session
    const session = await getServerSession(authOptions);
    if (session?.user?.email) {
      const user = await User.findOne({ email: session.user.email }).select("-password");
      if (user) {
        return NextResponse.json(
          {
            success: true,
            user: {
              id: user._id,
              fullName: user.fullName,
              email: user.email,
              phone: user.phone,
              avatar: user.avatar,
              role: user.role,
            },
          },
          { status: 200 }
        );
      }
    }

    return NextResponse.json(
      { success: false, message: "Not authenticated" },
      { status: 401 }
    );
  } catch (error: any) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}