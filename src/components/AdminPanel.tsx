import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ChevronLeft, ChevronRight, Check, X, Shield, BarChart3, Users, Clock, TrendingUp, Star } from "lucide-react";

const PENDING_PROS = [
  { id: "P001", name: "Anita Sharma", phone: "9876543210", city: "Bangalore", services: ["Deep Cleaning", "Laundry & Washing"], exp: 3, aadhaar: "XXXX-XXXX-4521", submitted: "Apr 10, 2026", docs: true },
  { id: "P002", name: "Ravi Kumar", phone: "9123456789", city: "Mumbai", services: ["Plumbing Fix", "Electrical Work"], exp: 5, aadhaar: "XXXX-XXXX-7832", submitted: "Apr 9, 2026", docs: true },
  { id: "P003", name: "Meena Devi", phone: "9988776655", city: "Hyderabad", services: ["Meal Prep", "Dishwashing"], exp: 2, aadhaar: "XXXX-XXXX-3310", submitted: "Apr 11, 2026", docs: false },
];

const PROVIDERS = [
  { name: "Priya M.", title: "Home Care Expert", rating: 4.9, jobs: 320, avatar: "👩", status: "online" },
  { name: "Sunita D.", title: "Deep Clean Specialist", rating: 5.0, jobs: 412, avatar: "👩‍🦱", status: "online" },
  { name: "Meena K.", title: "Laundry Expert", rating: 4.8, jobs: 214, avatar: "👩‍🦰", status: "online" },
  { name: "Rajan K.", title: "Repair Specialist", rating: 4.8, jobs: 203, avatar: "👨", status: "busy" },
];

interface AdminPanelProps {
  onBack: () => void;
}

export function AdminPanel({ onBack }: AdminPanelProps) {
  const [tab, setTab] = useState("applications");
  const [apps, setApps] = useState(PENDING_PROS);
  const [selected, setSelected] = useState<any>(null);
  const [search, setSearch] = useState("");

  const approve = (id: string) => { setApps(a => a.map(p => p.id === id ? { ...p, status: "Approved" } : p)); setSelected(null); };
  const reject = (id: string) => { setApps(a => a.map(p => p.id === id ? { ...p, status: "Rejected" } : p)); setSelected(null); };

  const pending = apps.filter(a => !a.status);
  const approved = apps.filter(a => a.status === "Approved");
  const rejected = apps.filter(a => a.status === "Rejected");

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200">
      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 rounded-[32px] p-8 w-full max-w-md border border-slate-800 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-white font-bold text-lg font-serif">Application — {selected.id}</h3>
                <button onClick={() => setSelected(null)} className="p-2 bg-slate-800 rounded-xl text-slate-400">
                  <X size={20} />
                </button>
              </div>
              <div className="bg-slate-800/50 rounded-2xl p-6 mb-8 border border-slate-800">
                {[
                  ["Name", selected.name],
                  ["Phone", selected.phone],
                  ["City", selected.city],
                  ["Experience", selected.exp + " years"],
                  ["Aadhaar", selected.aadhaar],
                  ["Submitted", selected.submitted],
                  ["Docs Uploaded", selected.docs ? "✓ Yes" : "✗ Missing"]
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between mb-4 last:mb-0">
                    <span className="text-slate-500 text-xs font-medium">{k}</span>
                    <span className={`text-xs font-bold ${k === "Docs Uploaded" ? (selected.docs ? "text-green-400" : "text-red-400") : "text-slate-200"}`}>{v}</span>
                  </div>
                ))}
              </div>
              <div className="mb-8">
                <p className="text-slate-500 text-[10px] font-bold mb-3 tracking-widest uppercase">Services Offered</p>
                <div className="flex flex-wrap gap-2">
                  {selected.services.map((s: string) => (
                    <span key={s} className="bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg px-3 py-1.5 text-[11px] font-bold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              {!selected.status && (
                <div className="flex gap-3">
                  <button onClick={() => reject(selected.id)} className="flex-1 py-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs font-bold uppercase tracking-widest hover:bg-red-500/20 transition-all">
                    ✕ Reject
                  </button>
                  <button onClick={() => approve(selected.id)} className="flex-1 py-4 bg-linear-to-br from-green-600 to-emerald-600 rounded-2xl text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-green-900/20 hover:scale-[1.02] transition-all">
                    ✓ Approve
                  </button>
                </div>
              )}
              {selected.status && (
                <div className={`text-center py-4 rounded-2xl border ${
                  selected.status === "Approved" ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400"
                }`}>
                  <p className="font-bold text-sm uppercase tracking-widest">{selected.status === "Approved" ? "✓ Application Approved" : "✕ Application Rejected"}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Header */}
      <div className="bg-linear-to-br from-slate-950 to-slate-900 p-8 pt-12 border-b border-slate-800">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-slate-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">HomeHelp Internal</p>
            <h1 className="text-white text-2xl font-bold font-serif">Admin Panel ⚙️</h1>
          </div>
          <button onClick={onBack} className="bg-slate-800 border border-slate-700 rounded-xl px-5 py-2.5 text-slate-300 text-xs font-bold hover:bg-slate-700 transition-all">
            ← Exit
          </button>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { v: pending.length, l: "Pending", c: "text-amber-400" },
            { v: approved.length, l: "Approved", c: "text-green-400" },
            { v: rejected.length, l: "Rejected", c: "text-red-400" },
            { v: "1,240", l: "Total Pros", c: "text-blue-400" }
          ].map((stat) => (
            <div key={stat.l} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-center">
              <p className={`font-extrabold text-xl ${stat.c}`}>{stat.v}</p>
              <p className="text-slate-600 text-[8px] font-bold uppercase tracking-widest mt-1">{stat.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-950 sticky top-0 z-10 border-b border-slate-800">
        {[
          { id: "applications", label: "Applications" },
          { id: "professionals", label: "All Pros" },
          { id: "analytics", label: "Analytics" }
        ].map((tabItem) => (
          <button
            key={tabItem.id}
            onClick={() => setTab(tabItem.id)}
            className={`flex-1 py-5 text-xs font-bold uppercase tracking-widest transition-all border-b-2 ${
              tab === tabItem.id ? "text-green-400 border-green-500" : "text-slate-600 border-transparent hover:text-slate-400"
            }`}
          >
            {tabItem.label}
          </button>
        ))}
      </div>

      <div className="p-6 pb-12">
        {/* Search */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex gap-3 items-center mb-8 focus-within:border-slate-700 transition-all">
          <Search className="text-slate-600" size={18} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, city, service..."
            className="bg-transparent border-none outline-hidden text-slate-200 text-sm w-full font-medium"
          />
        </div>

        {/* APPLICATIONS */}
        {tab === "applications" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {pending.length > 0 && (
              <div>
                <p className="text-slate-600 text-[10px] font-bold tracking-widest uppercase mb-4">Pending Review ({pending.length})</p>
                {pending.map(p => (
                  <div
                    key={p.id}
                    onClick={() => setSelected(p)}
                    className="bg-slate-900 rounded-2xl p-5 mb-3 border border-slate-800 cursor-pointer hover:border-green-500/30 transition-all group"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex gap-3 items-center mb-1.5">
                          <p className="text-slate-200 font-bold text-sm">{p.name}</p>
                          {!p.docs && <span className="bg-red-500/10 text-red-400 text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-red-500/20">⚠ Docs Missing</span>}
                        </div>
                        <p className="text-slate-500 text-[11px] font-medium">📍 {p.city} · {p.exp} yrs exp · {p.services.length} services</p>
                        <p className="text-slate-600 text-[10px] mt-2 uppercase tracking-tighter">Submitted: {p.submitted}</p>
                      </div>
                      <ChevronRight className="text-slate-700 group-hover:text-green-500 transition-colors" size={20} />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {approved.length > 0 && (
              <div>
                <p className="text-slate-600 text-[10px] font-bold tracking-widest uppercase mb-4">Approved ({approved.length})</p>
                {approved.map(p => (
                  <div
                    key={p.id}
                    onClick={() => setSelected(p)}
                    className="bg-green-500/5 rounded-2xl p-5 mb-3 border border-green-500/10 cursor-pointer hover:bg-green-500/10 transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-slate-200 font-bold text-sm">{p.name}</p>
                        <p className="text-slate-500 text-[11px] font-medium mt-1">📍 {p.city} · {p.services.join(", ")}</p>
                      </div>
                      <span className="text-green-400 font-bold text-[10px] uppercase tracking-widest">✓ Live</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* PROFESSIONALS */}
        {tab === "professionals" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <p className="text-slate-600 text-[10px] font-bold tracking-widest uppercase mb-4">All Professionals (1,240)</p>
            {PROVIDERS.map((p, i) => (
              <div key={i} className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl">{p.avatar}</div>
                  <div className="flex-1">
                    <div className="flex gap-3 items-center">
                      <p className="text-slate-200 font-bold text-sm">{p.name}</p>
                      <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border ${
                        p.status === "online" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}>
                        {p.status}
                      </span>
                    </div>
                    <p className="text-slate-500 text-[10px] font-medium mt-1 uppercase tracking-tighter">{p.title} · ★ {p.rating} · {p.jobs} jobs</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold text-[10px] uppercase tracking-widest">Active</p>
                    <p className="text-slate-600 text-[9px] mt-1 uppercase tracking-tighter">Bangalore</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* ANALYTICS */}
        {tab === "analytics" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            {[
              { icon: <TrendingUp size={20} />, label: "Total Bookings Today", value: "1,847", sub: "+12% vs yesterday" },
              { icon: <BarChart3 size={20} />, label: "Platform Revenue Today", value: "₹52,340", sub: "+8.4% vs yesterday" },
              { icon: <Users size={20} />, label: "Active Professionals", value: "892", sub: "of 1,240 registered" },
              { icon: <Star size={20} />, label: "Avg Service Rating", value: "4.82", sub: "across all services" },
              { icon: <Clock size={20} />, label: "Avg Response Time", value: "9.2 min", sub: "booking to pro arrival" },
              { icon: <Shield size={20} />, label: "Repeat Customer Rate", value: "68%", sub: "booked 3+ times" }
            ].map((stat) => (
              <div key={stat.label} className="bg-slate-900 rounded-2xl p-6 border border-slate-800 flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
                  {stat.icon}
                </div>
                <div className="flex-1">
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
                  <p className="text-white font-extrabold text-xl mt-1">{stat.value}</p>
                </div>
                <p className="text-green-400 text-[10px] font-bold uppercase tracking-tighter text-right">{stat.sub}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
