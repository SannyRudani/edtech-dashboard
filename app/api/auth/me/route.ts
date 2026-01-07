import { connectDB } from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";

/* ✅ SAFE JWT READER (NO cookies()) */
function getUserFromRequest(req: Request) {
  const cookie = req.headers.get("cookie");
  if (!cookie) return null;

  const match = cookie.match(/token=([^;]+)/);
  if (!match) return null;

  try {
    return jwt.verify(match[1], process.env.JWT_SECRET!) as any;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  await connectDB();

  const decoded = getUserFromRequest(req);
  if (!decoded) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await User.findById(decoded.id).select("-password");
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  return Response.json({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  });
}
