import { useMemo, useState } from "react";
import Header from "./components/Header";
import StatsCards from "./components/StatsCards";
import ComplaintList from "./components/ComplaintList";
import ComplaintForm from "./components/ComplaintForm";
import AssignmentPanel from "./components/AssignmentPanel";

// Demo seed data to visualize the dashboard UI. In a full build, this would come from the backend API.
const demoComplaints = [
  {
    id: "C-202501-001",
    customer_name: "Jane Smith",
    address: "221B Baker Street, London",
    service_id: "SVC-10293",
    issue_type: "Technical",
    urgency: "High",
    description: "Internet disconnects intermittently every evening.",
    status: "Open",
    timestamp: new Date().toISOString(),
  },
  {
    id: "C-202501-002",
    customer_name: "Rahul Verma",
    address: "D-12, Sector 15, Noida",
    service_id: "SVC-55678",
    issue_type: "Billing",
    urgency: "Medium",
    description: "Incorrect charge added to last invoice.",
    status: "In Progress",
    timestamp: new Date(Date.now() - 3600_000 * 5).toISOString(),
  },
  {
    id: "C-202501-003",
    customer_name: "Maria Garcia",
    address: "Av. Paulista 1500, São Paulo",
    service_id: "SVC-99881",
    issue_type: "Service Outage",
    urgency: "Critical",
    description: "No connectivity since morning across the neighborhood.",
    status: "Resolved",
    timestamp: new Date(Date.now() - 3600_000 * 26).toISOString(),
  },
];

const demoTechs = [
  { id: "T-01", name: "Alex Johnson" },
  { id: "T-02", name: "Priya Singh" },
  { id: "T-03", name: "Chen Wei" },
];

export default function App() {
  const [complaints, setComplaints] = useState(demoComplaints);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);

  const stats = useMemo(() => {
    const total = complaints.length;
    const open = complaints.filter((c) => c.status === "Open").length;
    const resolved24h = complaints.filter(
      (c) => c.status === "Resolved" && Date.now() - new Date(c.timestamp).getTime() < 24 * 3600_000
    ).length;
    return { total, open, resolved24h, technicians: demoTechs.length };
  }, [complaints]);

  function handleNewComplaint(data) {
    const id = `C-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}-${
      Math.floor(Math.random() * 900) + 100
    }`;
    setComplaints((prev) => [
      {
        id,
        ...data,
        status: "Open",
        timestamp: new Date().toISOString(),
      },
      ...prev,
    ]);
  }

  function handleAssign({ complaintId, technicianId, status, notes }) {
    setComplaints((prev) =>
      prev.map((c) => (c.id === complaintId ? { ...c, status, assigned_to: technicianId, last_note: notes } : c))
    );
    setSelected(null);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onNewComplaint={() => setShowForm(true)} />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <StatsCards stats={stats} />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ComplaintList complaints={complaints} onSelect={setSelected} />
          </div>
          <div className="space-y-4">
            <div className="rounded-xl border bg-white p-4">
              <h3 className="text-sm font-semibold">Quick Actions</h3>
              <div className="mt-3 grid gap-2 text-sm">
                <button onClick={() => setShowForm(true)} className="rounded-lg bg-indigo-600 px-3 py-2 font-medium text-white hover:bg-indigo-700">
                  Submit New Complaint
                </button>
                <button className="rounded-lg border px-3 py-2 font-medium hover:bg-slate-50">Export Report</button>
                <button className="rounded-lg border px-3 py-2 font-medium hover:bg-slate-50">View Technician Load</button>
              </div>
            </div>

            <div className="rounded-xl border bg-white p-4">
              <h3 className="text-sm font-semibold">Notifications</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>3 new complaints submitted in the last hour.</li>
                <li>Technician Priya resolved 2 tickets today.</li>
                <li>Scheduled maintenance tomorrow 9am - 11am.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {showForm && (
        <ComplaintForm onSubmit={handleNewComplaint} onClose={() => setShowForm(false)} />
      )}

      {selected && (
        <AssignmentPanel
          complaint={selected}
          technicians={demoTechs}
          onAssign={handleAssign}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
