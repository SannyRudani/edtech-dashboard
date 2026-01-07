import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-slate-100">
      <h1 className="text-3xl font-bold">House of EdTech</h1>

      <p className="text-gray-600">Fullstack Dashboard with RBAC & AI</p>

      <Link
        href="/register"
        className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        Create Account
      </Link>

      <Link href="/login" className="text-sm text-indigo-600 underline">
        Already have an account? Login
      </Link>
    </main>
  );
}
