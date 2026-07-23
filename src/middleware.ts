import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { getToken } from "next-auth/jwt";

// Pages that DON'T require login (auth pages themselves + password reset flow)
const PUBLIC_PATHS = [
  "/login",
  "/register",
  "/verify-otp",
  "/forgot-password",
  "/reset-password",
];

// API routes that must stay reachable without a logged-in session
const PUBLIC_API_PREFIXES = ["/api/auth"];

function isPublicPath(pathname: string) {
  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))) return true;
  if (PUBLIC_API_PREFIXES.some((p) => pathname.startsWith(p))) return true;
  return false;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always allow Next.js internals and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.match(/\.(png|jpg|jpeg|svg|webp|gif|ico|css|js|map)$/)
  ) {
    return NextResponse.next();
  }

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // 1) Check our custom email/password login cookie
  const token = req.cookies.get("token")?.value;
  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch {
      // fall through to check Google session below
    }
  }

  // 2) Check NextAuth (Google) session
  const googleToken = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (googleToken) {
    return NextResponse.next();
  }

  // Not logged in via either method — send to Register (first-time visitors)
  const registerUrl = new URL("/register", req.url);
  registerUrl.searchParams.set("redirect", pathname);
  const res = NextResponse.redirect(registerUrl);
  if (token) res.cookies.delete("token");
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};