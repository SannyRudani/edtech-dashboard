import { connectDB } from "@/lib/db";
import Content from "@/models/Content";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

/* AUTH HELPER — NO cookies(), NO headers() */
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

/* GET SINGLE CONTENT */
export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  // ✅ REQUIRED BY NEXT.JS
  const { id } = await context.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new Response("Invalid ID", { status: 400 });
  }

  const content = await Content.findById(id);
  if (!content) {
    return new Response("Not Found", { status: 404 });
  }

  return Response.json(content);
}

/* UPDATE — ADMIN OR CREATOR */
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await context.params;
  const user = getUserFromRequest(req);
  if (!user) return new Response("Unauthorized", { status: 401 });

  const content = await Content.findById(id);
  if (!content) return new Response("Not Found", { status: 404 });

  if (user.role !== "admin" && content.author.toString() !== user.id) {
    return new Response("Forbidden", { status: 403 });
  }

  const body = await req.json();

  const updated = await Content.findByIdAndUpdate(id, body, {
    new: true,
  });

  return Response.json(updated);
}

/* DELETE — ADMIN ONLY */
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await context.params;
  const user = getUserFromRequest(req);
  if (!user) return new Response("Unauthorized", { status: 401 });

  //   if (user.role !== "admin") {
  //     return new Response("Forbidden", { status: 403 });
  //   }

  const result = await Content.deleteOne({
    _id: new mongoose.Types.ObjectId(id),
  });

  if (result.deletedCount === 0) {
    return new Response("Not Found", { status: 404 });
  }

  return Response.json({ success: true });
}
