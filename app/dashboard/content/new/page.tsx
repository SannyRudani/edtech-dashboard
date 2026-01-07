"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    summary: "",
  });

  const generateSummary = async () => {
    setLoading(true);
    const res = await fetch("/api/ai/summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: form.description }),
    });

    const data = await res.json();
    setForm({ ...form, summary: data.summary });
    setLoading(false);
  };

  const submit = async () => {
    await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    router.push("/dashboard/content");
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-bold mb-6">Create Content</h2>

      <input
        className="w-full mb-4 p-3 border rounded"
        placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        className="w-full mb-4 p-3 border rounded"
        rows={6}
        placeholder="Description"
        onChange={(e) =>
          setForm({
            ...form,
            description: e.target.value,
          })
        }
      />

      <input
        className="w-full mb-4 p-3 border rounded"
        placeholder="Category"
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      <button
        onClick={generateSummary}
        className="bg-indigo-600 text-white px-4 py-2 rounded mb-4"
      >
        {loading ? "Generating..." : "Generate AI Summary"}
      </button>

      <textarea
        className="w-full mb-6 p-3 border rounded bg-slate-50"
        rows={4}
        placeholder="AI / Custom Summary (editable)"
        value={form.summary}
        onChange={(e) => setForm({ ...form, summary: e.target.value })}
      />

      <button
        onClick={submit}
        className="bg-slate-900 text-white px-6 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
}
