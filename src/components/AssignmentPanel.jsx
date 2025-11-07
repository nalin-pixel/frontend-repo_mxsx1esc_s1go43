import { useState } from "react";
import { CheckCircle2, X } from "lucide-react";

export default function AssignmentPanel({ complaint, technicians = [], onAssign, onClose }) {
  const [techId, setTechId] = useState(technicians[0]?.id || "");
  const [status, setStatus] = useState(complaint?.status || "Open");
  const [notes, setNotes] = useState("");

  if (!complaint) return null;

  function handleAssign() {
    onAssign?.({ complaintId: complaint.id, technicianId: techId, status, notes });
  }

  return (
    <div className="fixed inset-0 z-30 bg-black/40 p-4 sm:p-6 md:p-10">
      <div className="mx-auto max-w-2xl rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Assign & Update</h2>
          <button onClick={onClose} className="rounded-md p-1 text-slate-600 hover:bg-slate-100"><X size={18} /></button>
        </div>
        <div className="grid gap-4 p-4 sm:p-6">
          <div className="rounded-lg border bg-slate-50 p-4">
            <p className="text-sm font-semibold">{complaint.customer_name} <span className="ml-2 text-xs font-normal text-slate-500">({complaint.service_id})</span></p>
            <p className="mt-1 text-sm text-slate-600">{complaint.issue_type} • {complaint.description}</p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <div className="grid gap-1">
              <label className="text-sm font-medium">Assign Technician</label>
              <select
                value={techId}
                onChange={(e) => setTechId(e.target.value)}
                className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {technicians.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-1">
              <label className="text-sm font-medium">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {["Open","In Progress","Resolved","Closed"].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-1">
            <label className="text-sm font-medium">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Add internal notes or resolution details"
            />
          </div>

          <div className="flex items-center justify-end gap-2">
            <button onClick={onClose} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">Cancel</button>
            <button
              onClick={handleAssign}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700"
            >
              <CheckCircle2 size={16} /> Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
