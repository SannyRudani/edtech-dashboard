import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <Link
        href="/login"
        className="px-6 py-3 bg-indigo-600 text-white rounded"
      >
        Go to Dashboard
      </Link>
    </main>
  );
}
