import { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function requireAdmin(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get("token")?.value;
  if (!token) return false;

  const decoded = verifyToken(token);
  if (!decoded || decoded.role !== "admin") return false;

  return true;
}