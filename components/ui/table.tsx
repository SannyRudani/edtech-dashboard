import * as React from "react";

export function Table({ children }: { children: React.ReactNode }) {
  return <table className="w-full text-sm">{children}</table>;
}

export function TableHeader({ children }: any) {
  return <thead className="bg-muted">{children}</thead>;
}

export function TableBody({ children }: any) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children }: any) {
  return <tr className="border-b">{children}</tr>;
}

export function TableHead({ children }: any) {
  return <th className="p-3 text-left font-medium">{children}</th>;
}

export function TableCell({ children }: any) {
  return <td className="p-3">{children}</td>;
}
