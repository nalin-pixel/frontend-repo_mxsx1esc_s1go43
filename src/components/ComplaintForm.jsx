import { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";

const ISSUE_TYPES = ["Technical", "Billing", "Service Outage", "Other"];
const URGENCY = ["Low", "Medium", "High", "Critical"];

export default function ComplaintForm({ onSubmit, onClose }) {
  const [form, setForm] = useState({
    customerName: "",
    address: "",
    serviceId: "",
    issueType: ISSUE_TYPES[0],
    urgency: URGENCY[1],
    description: "",
    attachments: [],
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleFileChange(e) {
    const files = Array.from(e.target.files || []);
    setForm((f) => ({ ...f, attachments: files }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const data = {
        customer_name: form.customerName.trim(),
        address: form.address.trim(),
        service_id: form.serviceId.trim(),
        issue_type: form.issueType,
        urgency: form.urgency,
        description: form.description.trim(),
        attachments: form.attachments.map((f) => ({ name: f.name, size: f.size })),
      };
      await onSubmit?.(data);
      onClose?.();
    } catch (err) {
      setError(err?.message || "Failed to submit complaint");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-30 bg-black/40 p-4 sm:p-6 md:p-10">
      <div className="mx-auto max-w-2xl rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Submit a Complaint</h2>
          <button onClick={onClose} className="rounded-md px-2 py-1 text-slate-600 hover:bg-slate-100">Close</button>
        </div>
        {error && (
          <div className="mx-4 mt-4 flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            <AlertCircle size={16} className="mt-0.5" />
            <p>{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="grid gap-4 p-4 sm:p-6">
          <div className="grid gap-1">
            <label className="text-sm font-medium">Customer Name</label>
            <input
              name="customerName"
              value={form.customerName}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="John Doe"
              required
            />
          </div>
          <div className="grid gap-1">
            <label className="text-sm font-medium">Address</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="123 Main St, City"
              required
            />
          </div>
          <div className="grid gap-1 sm:grid-cols-3 sm:items-end sm:gap-3">
            <div className="grid gap-1 sm:col-span-1">
              <label className="text-sm font-medium">Service ID</label>
              <input
                name="serviceId"
                value={form.serviceId}
                onChange={handleChange}
                className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="SVC-12345"
                required
              />
            </div>
            <div className="grid gap-1 sm:col-span-1">
              <label className="text-sm font-medium">Issue Type</label>
              <select
                name="issueType"
                value={form.issueType}
                onChange={handleChange}
                className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {ISSUE_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-1 sm:col-span-1">
              <label className="text-sm font-medium">Urgency</label>
              <select
                name="urgency"
                value={form.urgency}
                onChange={handleChange}
                className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {URGENCY.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid gap-1">
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Describe the issue in detail"
              required
            />
          </div>
          <div className="grid gap-1">
            <label className="text-sm font-medium">Attachments</label>
            <input type="file" multiple onChange={handleFileChange} />
            {!!form.attachments.length && (
              <div className="mt-1 text-xs text-slate-600">
                {form.attachments.length} file(s) selected
              </div>
            )}
          </div>
          <div className="flex items-center justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting && <Loader2 size={16} className="animate-spin" />} Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
