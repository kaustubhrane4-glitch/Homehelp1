import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, Package, DollarSign, User, Star, Check, X, MapPin, ChevronRight, LogOut, MessageSquare } from "lucide-react";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";

const SAMPLE_BOOKINGS = [
  { id: "HH1023", customer: "Rahul S.", service: "Deep Cleaning", time: "Today 2:00 PM", addr: "Koramangala, Bengaluru", amount: 528, status: "New" },
  { id: "HH1024", customer: "Priti M.", service: "AC Service", time: "Today 4:00 PM", addr: "Indiranagar, Bengaluru", amount: 578, status: "Accepted" },
  { id: "HH1025", customer: "Amit K.", service: "Laundry & Wash", time: "Tomorrow 9:00 AM", addr: "HSR Layout, Bengaluru", amount: 328, status: "Completed" },
  { id: "HH1026", customer: "Neha R.", service: "Kitchen Cleaning", time: "Tomorrow 11:00 AM", addr: "Whitefield, Bengaluru", amount: 478, status: "New" },
];

const EARNINGS = [
  { week: "Mar 25–31", jobs: 18, earned: 7240, tips: 480 },
  { week: "Apr 1–7", jobs: 22, earned: 8910, tips: 620 },
  { week: "Apr 8–14", jobs: 19, earned: 7650, tips: 510 },
];

interface ProDashboardProps {
  onLogout: () => void;
}

export function ProDashboard({ onLogout }: ProDashboardProps) {
  const [tab, setTab] = useState("home");
  const [bookings, setBookings] = useState(SAMPLE_BOOKINGS);
  const [isOnline, setIsOnline] = useState(true);
  const [showDetail, setShowDetail] = useState<any>(null);
  const [showLogout, setShowLogout] = useState(false);

  const pending = bookings.filter(b => b.status === "New");
  const accepted = bookings.filter(b => b.status === "Accepted");
  const done = bookings.filter(b => b.status === "Completed");
  const todayEarned = done.reduce((s, b) => s + b.amount, 0);

  const acceptJob = (id: string) => setBookings(bs => bs.map(b => b.id === id ? { ...b, status: "Accepted" } : b));
  const completeJob = (id: string) => setBookings(bs => bs.map(b => b.id === id ? { ...b, status: "Completed" } : b));
  const declineJob = (id: string) => setBookings(bs => bs.map(b => b.id === id ? { ...b, status: "Rejected" } : b));

  const statusStyle = (s: string) => {
    const styles: any = {
      New: "bg-blue-50 text-blue-700 border-blue-100",
      Accepted: "bg-green-50 text-green-700 border-green-100",
      Completed: "bg-emerald-50 text-emerald-700 border-emerald-100",
      Rejected: "bg-red-50 text-red-700 border-red-100",
    };
    return styles[s] || "bg-gray-50 text-gray-700 border-gray-100";
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans max-w-md mx-auto relative shadow-2xl">
      {/* Logout Modal */}
      <AnimatePresence>
        {showLogout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 w-full max-w-xs text-center shadow-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-3xl mx-auto mb-4">🚪</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 font-serif">Log Out?</h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-8">You'll need to log back in to accept new bookings. Make sure you've finished your active jobs.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowLogout(false)} className="flex-1 py-3 bg-gray-100 rounded-xl text-sm font-bold text-gray-500">Cancel</button>
                <button onClick={onLogout} className="flex-1 py-3 bg-red-500 rounded-xl text-sm font-bold text-white shadow-lg shadow-red-100">Log Out</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Sheet */}
      <AnimatePresence>
        {showDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40 flex items-end backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-white rounded-t-[32px] w-full max-w-md mx-auto p-6 pb-12 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900 font-serif">Booking #{showDetail.id}</h3>
                <button onClick={() => setShowDetail(null)} className="p-2 bg-gray-100 rounded-xl text-gray-400">
                  <X size={20} />
                </button>
              </div>
              <div className="bg-green-50 rounded-2xl p-5 mb-8 border border-green-100">
                {[
                  ["Service", showDetail.service],
                  ["Customer", showDetail.customer],
                  ["Date & Time", showDetail.time],
                  ["Address", showDetail.addr],
                  ["Amount", `₹${showDetail.amount}`],
                  ["Status", showDetail.status]
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between mb-3 last:mb-0">
                    <span className="text-gray-500 text-xs font-medium">{k}</span>
                    <span className={`text-xs font-bold ${k === "Amount" ? "text-green-600" : "text-gray-900"}`}>{v}</span>
                  </div>
                ))}
              </div>
              {showDetail.status === "New" && (
                <div className="flex gap-3">
                  <Button variant="danger" onClick={() => { declineJob(showDetail.id); setShowDetail(null); }}>
                    <X size={16} className="mr-1" /> Decline
                  </Button>
                  <Button onClick={() => { acceptJob(showDetail.id); setShowDetail(null); }}>
                    <Check size={16} className="mr-1" /> Accept Job
                  </Button>
                </div>
              )}
              {showDetail.status === "Accepted" && (
                <Button onClick={() => { completeJob(showDetail.id); setShowDetail(null); }}>
                  <Check size={16} className="mr-1" /> Mark as Completed
                </Button>
              )}
              {showDetail.status === "Completed" && (
                <div className="bg-emerald-50 rounded-2xl p-4 text-center border border-emerald-100">
                  <p className="text-emerald-700 font-bold text-sm">✓ Job Completed</p>
                  <p className="text-gray-500 text-[10px] mt-1 uppercase tracking-widest">₹{showDetail.amount} will be credited on Monday</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pb-24">
        {/* HOME TAB */}
        {tab === "home" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-0">
            {/* Header */}
            <div className="bg-linear-to-br from-green-600 to-emerald-600 p-8 pt-12 rounded-b-[40px] shadow-lg">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-1">Welcome back</p>
                  <h2 className="text-white text-2xl font-bold font-serif">Priya M. 👩</h2>
                  <p className="text-white/70 text-[11px] mt-1 font-medium">Elite Pro · ★ 4.9 · 320 jobs</p>
                </div>
                <div className="text-center">
                  <p className="text-white/60 text-[9px] font-bold uppercase tracking-tighter mb-2">Status</p>
                  <button
                    onClick={() => setIsOnline(!isOnline)}
                    className={`w-14 h-7 rounded-full relative transition-colors duration-300 ${isOnline ? "bg-white/30" : "bg-black/20"}`}
                  >
                    <motion.div
                      animate={{ x: isOnline ? 28 : 4 }}
                      className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                    />
                  </button>
                  <p className={`text-[9px] font-bold mt-2 uppercase tracking-widest ${isOnline ? "text-green-200" : "text-white/40"}`}>
                    {isOnline ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
              {/* Stats */}
              <div className="flex gap-3">
                {[
                  { v: `₹${todayEarned}`, l: "Today's Earnings" },
                  { v: `${pending.length}`, l: "New Requests" },
                  { v: `${accepted.length}`, l: "In Progress" }
                ].map((stat) => (
                  <div key={stat.l} className="flex-1 bg-white/15 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/10">
                    <p className="text-white font-extrabold text-lg leading-none mb-1.5">{stat.v}</p>
                    <p className="text-white/60 text-[8px] font-bold uppercase tracking-widest">{stat.l}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 space-y-6">
              {/* New requests */}
              {pending.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-900 font-serif">🔔 New Requests</h3>
                    <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{pending.length} new</span>
                  </div>
                  {pending.map(b => (
                    <Card key={b.id} className="mb-3 border-l-4 border-l-blue-500">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{b.service}</p>
                          <p className="text-gray-500 text-[11px] mt-1 flex items-center gap-1">
                            <User size={10} /> {b.customer} · {b.time}
                          </p>
                          <p className="text-gray-400 text-[10px] mt-1 flex items-center gap-1">
                            <MapPin size={10} /> {b.addr}
                          </p>
                        </div>
                        <p className="font-extrabold text-green-600 text-base">₹{b.amount}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="danger" onClick={() => declineJob(b.id)} fullWidth={false} className="px-4">Decline</Button>
                        <Button size="sm" onClick={() => acceptJob(b.id)} className="flex-1">Accept</Button>
                        <button onClick={() => setShowDetail(b)} className="px-4 py-2 bg-gray-100 rounded-xl text-[11px] font-bold text-gray-500">Details</button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* Active jobs */}
              {accepted.length > 0 && (
                <div>
                  <h3 className="font-bold text-gray-900 mb-4 font-serif">⚡ Active Jobs</h3>
                  {accepted.map(b => (
                    <Card key={b.id} className="mb-3 border-l-4 border-l-green-500">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{b.service}</p>
                          <p className="text-gray-500 text-[11px] mt-1 flex items-center gap-1">
                            <User size={10} /> {b.customer} · {b.time}
                          </p>
                          <p className="text-gray-400 text-[10px] mt-1 flex items-center gap-1">
                            <MapPin size={10} /> {b.addr}
                          </p>
                        </div>
                        <p className="font-extrabold text-green-600 text-base">₹{b.amount}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => completeJob(b.id)}>Mark Complete</Button>
                        <button onClick={() => setShowDetail(b)} className="px-4 py-2 bg-gray-100 rounded-xl text-[11px] font-bold text-gray-500 flex items-center gap-1">
                          Navigate <MapPin size={10} />
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {pending.length === 0 && accepted.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">☕</div>
                  <p className="font-bold text-gray-900 text-base">You're all caught up!</p>
                  <p className="text-gray-400 text-xs mt-1">New bookings will appear here when you're online</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* BOOKINGS TAB */}
        {tab === "bookings" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-linear-to-br from-green-600 to-emerald-600 p-8 pt-12 rounded-b-[40px] shadow-lg">
              <h2 className="text-white text-2xl font-bold font-serif">📦 All Bookings</h2>
              <p className="text-white/70 text-[11px] mt-1 font-medium uppercase tracking-widest">{bookings.length} total bookings</p>
            </div>
            <div className="p-5 space-y-3">
              {bookings.map(b => (
                <Card key={b.id} onClick={() => setShowDetail(b)} className="hover:border-green-200 transition-all">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex gap-2 items-center mb-1.5">
                        <p className="font-bold text-gray-900 text-sm">{b.service}</p>
                        <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border ${statusStyle(b.status)}`}>
                          {b.status}
                        </span>
                      </div>
                      <p className="text-gray-500 text-[10px] flex items-center gap-1">
                        <User size={8} /> {b.customer} · {b.time}
                      </p>
                      <p className="text-gray-400 text-[9px] mt-0.5 flex items-center gap-1">
                        <MapPin size={8} /> {b.addr}
                      </p>
                    </div>
                    <p className="font-extrabold text-green-600 text-sm ml-2">₹{b.amount}</p>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* EARNINGS TAB */}
        {tab === "earnings" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-linear-to-br from-green-600 to-emerald-600 p-8 pt-12 rounded-b-[40px] shadow-lg">
              <h2 className="text-white text-2xl font-bold font-serif">💸 Earnings</h2>
              <p className="text-white/70 text-[11px] mt-1 font-medium uppercase tracking-widest">Weekly payout — every Monday</p>
              <div className="bg-white/15 backdrop-blur-sm rounded-3xl p-6 mt-6 border border-white/10">
                <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest">This Month's Total</p>
                <p className="text-white text-3xl font-extrabold mt-1">₹23,800</p>
                <p className="text-white/60 text-[10px] mt-2 font-medium">59 jobs · ₹1,610 in tips</p>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <h3 className="font-bold text-gray-900 font-serif">Weekly Breakdown</h3>
              {EARNINGS.map((e, i) => (
                <Card key={i}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{e.week}</p>
                      <p className="text-gray-400 text-[10px] mt-1 uppercase tracking-tighter">{e.jobs} jobs completed</p>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-green-600 text-base">₹{e.earned.toLocaleString()}</p>
                      <p className="text-amber-500 text-[9px] font-bold uppercase tracking-widest">+₹{e.tips} tips</p>
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-full h-1.5 mt-4 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(e.jobs / 22) * 100}%` }}
                      className="h-full bg-linear-to-r from-green-500 to-emerald-500 rounded-full"
                    />
                  </div>
                </Card>
              ))}
              <Card className="bg-green-50/50 border-green-100">
                <p className="font-bold text-gray-900 text-xs mb-4 uppercase tracking-widest">Payment Method</p>
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-green-100 flex items-center justify-center text-2xl shadow-sm">🏦</div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">SBI Bank Account</p>
                    <p className="text-gray-400 text-[10px] uppercase tracking-tighter">XXXX XXXX 4521 · IFSC: SBIN0012</p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        )}

        {/* PROFILE TAB */}
        {tab === "profile" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-linear-to-br from-green-600 to-emerald-600 p-8 pt-12 rounded-b-[40px] shadow-lg text-center">
              <div className="w-20 h-20 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center text-4xl mx-auto mb-4 shadow-xl">👩</div>
              <h2 className="text-white text-2xl font-bold font-serif">Priya Mehta</h2>
              <p className="text-white/70 text-[11px] mt-1 font-medium uppercase tracking-widest">Elite Pro · Bangalore</p>
              <div className="flex justify-center gap-4 mt-8">
                {[
                  { v: "4.9★", l: "Rating" },
                  { v: "320", l: "Jobs" },
                  { v: "₹23.8K", l: "This Month" }
                ].map((stat) => (
                  <div key={stat.l} className="bg-white/15 backdrop-blur-sm rounded-2xl px-5 py-3 text-center border border-white/10">
                    <p className="text-white font-extrabold text-sm">{stat.v}</p>
                    <p className="text-white/60 text-[8px] font-bold uppercase tracking-widest">{stat.l}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5 space-y-2">
              {[
                { icon: "🛠", label: "My Services", sub: "Deep Cleaning, Laundry..." },
                { icon: "📍", label: "Service Areas", sub: "Koramangala, HSR Layout..." },
                { icon: "📅", label: "Availability", sub: "Mon–Sat, 7AM–7PM" },
                { icon: "💳", label: "Payment", sub: "SBI XXXX4521" },
                { icon: "⭐", label: "My Reviews", sub: "4.9 avg · 298 reviews" },
                { icon: "📱", label: "Notifications", sub: "All enabled" },
                { icon: "❓", label: "Help & Support", sub: "24/7" },
                { icon: "🚪", label: "Logout", sub: "", danger: true }
              ].map((item, i) => (
                <Card
                  key={i}
                  className={`hover:bg-gray-50 transition-colors ${item.danger ? "border-red-100" : ""}`}
                  onClick={item.label === "Logout" ? () => setShowLogout(true) : undefined}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg border ${
                      item.danger ? "bg-red-50 border-red-100" : "bg-green-50 border-green-100"
                    }`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <p className={`font-bold text-sm ${item.danger ? "text-red-600" : "text-gray-900"}`}>{item.label}</p>
                      {item.sub && <p className="text-gray-400 text-[10px] uppercase tracking-tighter">{item.sub}</p>}
                    </div>
                    {!item.danger && <ChevronRight size={16} className="text-gray-300" />}
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 backdrop-blur-xl border-t border-gray-100 flex justify-around py-3 pb-6 z-30">
        {[
          { id: "home", icon: <Home size={20} />, label: "Home" },
          { id: "bookings", icon: <Package size={20} />, label: "Bookings" },
          { id: "earnings", icon: <DollarSign size={20} />, label: "Earnings" },
          { id: "profile", icon: <User size={20} />, label: "Profile" }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className="flex-1 flex flex-col items-center gap-1 group"
          >
            <div className={`transition-all duration-300 ${tab === item.id ? "text-green-600 scale-110" : "text-gray-400 group-hover:text-gray-600"}`}>
              {item.icon}
            </div>
            <span className={`text-[9px] font-bold uppercase tracking-widest transition-colors ${tab === item.id ? "text-green-600" : "text-gray-400"}`}>
              {item.label}
            </span>
            {tab === item.id && (
              <motion.div layoutId="activeTab" className="w-4 h-0.5 bg-green-600 rounded-full mt-0.5" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
