import "./globals.css";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-100">
        {children}

        {/* ✅ GLOBAL TOAST */}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
