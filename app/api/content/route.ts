import { connectDB } from "@/lib/db";
import Content from "@/models/Content";
import jwt from "jsonwebtoken";

/* 🔐 AUTH HELPER */
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

/* GET CONTENT (ROLE AWARE + PAGINATION + SEARCH) */
export async function GET(req: Request) {
  await connectDB();

  const user = getUserFromRequest(req);
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const search = searchParams.get("search") || "";

  const skip = (page - 1) * limit;

  const query: any = {};

  // 🔒 Editor sees only own content
  if (user.role === "editor") {
    query.author = user.id;
  }

  // 🔍 Search by title / category
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
    ];
  }

  const [data, total] = await Promise.all([
    Content.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Content.countDocuments(query),
  ]);

  return Response.json({
    data,
    page,
    totalPages: Math.ceil(total / limit),
    total,
  });
}

/* CREATE CONTENT (ADMIN + EDITOR) */
export async function POST(req: Request) {
  await connectDB();

  const user = getUserFromRequest(req);
  if (!user) return new Response("Unauthorized", { status: 401 });

  if (!["admin", "editor"].includes(user.role)) {
    return new Response("Forbidden", { status: 403 });
  }

  const body = await req.json();

  const item = await Content.create({
    ...body,
    author: user.id,
  });

  return Response.json(item);
}
