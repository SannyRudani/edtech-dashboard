import StatCard from "@/components/dashboard/StatCard";

export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Content" value="12" />
        <StatCard title="Active Users" value="4" />
        <StatCard title="AI Summaries" value="9" />
        <StatCard title="Role" value="Editor / Admin" />
      </div>
    </div>
  );
}
