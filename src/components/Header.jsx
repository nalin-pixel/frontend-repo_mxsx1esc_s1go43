import { Bell, Settings, User } from "lucide-react";

export default function Header({ onNewComplaint }) {
  return (
    <header className="sticky top-0 z-20 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">
              CS
            </div>
            <div>
              <h1 className="text-lg font-semibold leading-tight">Complaint Suite</h1>
              <p className="text-xs text-slate-500">Intake • Assignment • Resolution • Insights</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onNewComplaint}
              className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              New Complaint
            </button>
            <button className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100">
              <Bell size={18} />
              <span className="absolute -right-0 -top-0 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">3</span>
            </button>
            <button className="rounded-lg p-2 text-slate-600 hover:bg-slate-100">
              <Settings size={18} />
            </button>
            <div className="ml-1 flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm">
              <User size={16} className="text-slate-600" />
              <span className="font-medium">Admin</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
