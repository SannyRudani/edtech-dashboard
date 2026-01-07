"use client";

import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-slate-800">Dashboard</h1>

      <button
        onClick={logout}
        className="text-sm bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-700"
      >
        Logout
      </button>
    </header>
  );
}
