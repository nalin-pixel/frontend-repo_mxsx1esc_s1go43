import { useMemo, useState } from "react";
import { BadgeCheck, Filter, Search } from "lucide-react";

const statusColors = {
  Open: "bg-red-50 text-red-700 ring-red-200",
  "In Progress": "bg-amber-50 text-amber-700 ring-amber-200",
  Resolved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Closed: "bg-slate-100 text-slate-700 ring-slate-200",
};

export default function ComplaintList({ complaints = [], onSelect }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");

  const filtered = useMemo(() => {
    return complaints.filter((c) => {
      const matchesQuery =
        !query ||
        c.customer_name?.toLowerCase().includes(query.toLowerCase()) ||
        c.service_id?.toLowerCase().includes(query.toLowerCase()) ||
        c.issue_type?.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "All" || c.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [complaints, query, status]);

  return (
    <div className="rounded-xl border bg-white">
      <div className="flex flex-col gap-2 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full items-center gap-2 sm:w-auto">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, service ID, or issue"
              className="w-full rounded-lg border px-9 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Filter size={16} className="text-slate-400" />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg border px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {['All','Open','In Progress','Resolved','Closed'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="text-xs text-slate-500">{filtered.length} of {complaints.length} shown</div>
      </div>
      <ul className="divide-y">
        {filtered.map((c) => (
          <li key={c.id} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between hover:bg-slate-50">
            <div className="flex min-w-0 flex-1 items-start gap-3">
              <div className="mt-1 hidden h-2.5 w-2.5 flex-shrink-0 rounded-full bg-indigo-600 sm:block" />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold">{c.customer_name} <span className="ml-2 text-xs font-normal text-slate-500">({c.service_id})</span></p>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] ring-1 ${statusColors[c.status]}`}>
                    <BadgeCheck size={12} /> {c.status}
                  </span>
                </div>
                <p className="mt-1 line-clamp-1 text-sm text-slate-600">{c.issue_type} • {c.description}</p>
                <p className="mt-1 text-xs text-slate-500">{new Date(c.timestamp).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onSelect?.(c)}
                className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
              >
                View / Assign
              </button>
            </div>
          </li>
        ))}
        {!filtered.length && (
          <li className="p-8 text-center text-sm text-slate-500">No complaints match your filters.</li>
        )}
      </ul>
    </div>
  );
}
