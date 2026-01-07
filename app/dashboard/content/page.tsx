"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ContentService } from "@/services/content.service";
import { AuthService } from "@/services/auth.service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

export default function ContentPage() {
  const [data, setData] = useState<any[]>([]);
  const [me, setMe] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit: number = 10;

  const load = async (pageNo = 1) => {
    const res = await ContentService.list({
      page: pageNo,
      limit,
    });

    setData(res.data.data);
    setTotalPages(res.data.totalPages);
  };

  useEffect(() => {
    AuthService.me().then((res) => setMe(res.data));
    load(page);
  }, [page]);

  const remove = async (id: string) => {
    if (!confirm("Delete content?")) return;

    await ContentService.delete(id);
    toast.success("Content deleted");

    load(page);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Content</h1>

        <Link
          href="/dashboard/content/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          + New Content
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-6">
                  No content found
                </TableCell>
              </TableRow>
            )}

            {data.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="space-x-3">
                  <Link
                    href={`/dashboard/content/${item._id}`}
                    className="text-indigo-600"
                  >
                    Edit
                  </Link>

                  {me?.role === "admin" && (
                    <button
                      onClick={() => remove(item._id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
