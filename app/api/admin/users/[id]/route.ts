import { connectDB } from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

/* 🔐 ADMIN AUTH — NO cookies(), NO headers() */
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

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await context.params;

  const admin = getAdminFromRequest(req);
  if (!admin) {
    return new Response("Forbidden", { status: 403 });
  }

  // 🚫 ADMIN CANNOT CHANGE OWN ROLE
  if (admin.id === id) {
    return new Response("You cannot change your own role", { status: 400 });
  }

  const { role } = await req.json();

  if (!["admin", "editor"].includes(role)) {
    return new Response("Invalid role", { status: 400 });
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { role },
    { new: true }
  ).select("-password");

  if (!updatedUser) {
    return new Response("User not found", { status: 404 });
  }

  return Response.json(updatedUser);
}
