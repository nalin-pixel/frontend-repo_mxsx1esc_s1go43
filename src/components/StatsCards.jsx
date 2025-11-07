import { Activity, Clock, FolderOpenDot, Users } from "lucide-react";

export default function StatsCards({ stats }) {
  const items = [
    { label: "Total Complaints", value: stats.total, icon: FolderOpenDot, color: "bg-indigo-50 text-indigo-700" },
    { label: "Open", value: stats.open, icon: Activity, color: "bg-amber-50 text-amber-700" },
    { label: "Resolved (24h)", value: stats.resolved24h, icon: Clock, color: "bg-emerald-50 text-emerald-700" },
    { label: "Technicians", value: stats.technicians, icon: Users, color: "bg-sky-50 text-sky-700" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="rounded-xl border bg-white p-4">
          <div className={`inline-flex items-center justify-center rounded-lg ${color} p-2`}>
            <Icon size={18} />
          </div>
          <p className="mt-3 text-2xl font-bold">{value}</p>
          <p className="text-sm text-slate-500">{label}</p>
        </div>
      ))}
    </div>
  );
}
