"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditContent() {
  const router = useRouter();
  const { id } = useParams() as { id: string };

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    summary: "",
  });

  useEffect(() => {
    fetch(`/api/content/${id}`)
      .then((res) => res.json())
      .then(setForm);
  }, [id]);

  const submit = async () => {
    await fetch(`/api/content/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    router.push("/dashboard/content");
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-bold mb-6">Edit Content</h2>

      <input
        className="w-full mb-4 p-3 border rounded"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        className="w-full mb-4 p-3 border rounded"
        rows={6}
        value={form.description}
        onChange={(e) =>
          setForm({
            ...form,
            description: e.target.value,
          })
        }
      />

      <input
        className="w-full mb-4 p-3 border rounded"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      <textarea
        className="w-full mb-6 p-3 border rounded bg-slate-50"
        rows={4}
        value={form.summary}
        onChange={(e) => setForm({ ...form, summary: e.target.value })}
      />

      <button
        onClick={submit}
        className="bg-slate-900 text-white px-6 py-2 rounded"
      >
        Update
      </button>
    </div>
  );
}
