import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true, message: "Logged out" }, { status: 200 });
  res.cookies.delete("token");
  return res;
}