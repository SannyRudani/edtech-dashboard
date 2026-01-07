import { connectDB } from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";

/* ✅ SAFE ADMIN AUTH (NO cookies()) */
function getAdminFromRequest(req: Request) {
  const cookie = req.headers.get("cookie");
  if (!cookie) return null;

  const match = cookie.match(/token=([^;]+)/);
  if (!match) return null;

  try {
    const decoded = jwt.verify(match[1], process.env.JWT_SECRET!) as any;

    if (decoded.role !== "admin") return null;
    return decoded;
  } catch {
    return null;
  }
}

/* GET ALL USERS — ADMIN ONLY */
export async function GET(req: Request) {
  await connectDB();

  const admin = getAdminFromRequest(req);
  if (!admin) {
    return new Response("Forbidden", { status: 403 });
  }

  const users = await User.find().select("-password");
  return Response.json(users);
}
