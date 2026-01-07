"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((user) => setRole(user.role))
      .catch(() => setRole(null));
  }, []);

  const nav = [
    // { label: "Dashboard", href: "/dashboard" },
    { label: "Content", href: "/dashboard/content" },
  ];

  if (role === "admin") {
    nav.push({ label: "Admin", href: "/dashboard/admin" });
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white">
      <div className="h-16 flex items-center px-6 text-xl font-bold border-b border-slate-700">
        EdTech Admin
      </div>

      <nav className="p-4 space-y-1">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-2 rounded-lg text-sm ${
              pathname === item.href
                ? "bg-indigo-600"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-4 left-4 text-xs text-slate-400">
        Logged in as {role}
      </div>
    </aside>
  );
}
