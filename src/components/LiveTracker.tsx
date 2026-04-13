import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronLeft, MessageSquare, Star, Check } from "lucide-react";
import { Button } from "./ui/Button";

const PROVIDERS = [
  { id: 1, name: "Priya M.", title: "Home Care Expert", rating: 4.9, jobs: 320, avatar: "👩", badge: "Elite", status: "online", eta: 8 },
];

interface LiveTrackerProps {
  order: any;
  onClose: () => void;
  onChat: (pro: any) => void;
}

export function LiveTracker({ order, onClose, onChat }: LiveTrackerProps) {
  const [eta, setEta] = useState(order.eta ? parseInt(order.eta) : null);
  const pro = PROVIDERS[0]; // Simplified for demo

  useEffect(() => {
    if (!eta || eta <= 0) return;
    const timer = setInterval(() => setEta(e => (e && e > 1 ? e - 1 : 0)), 10000);
    return () => clearInterval(timer);
  }, [eta]);

  const stepIdx = order.status === "Completed" ? 4 : order.status === "In Service" ? 3 : order.status === "En Route" ? 2 : order.status === "Assigned" ? 1 : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-50 z-50 flex flex-col"
    >
      {/* Map Demo */}
      <div className="h-64 bg-green-100 relative overflow-hidden shrink-0">
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 50 Q 25 45 50 50 T 100 50" stroke="white" strokeWidth="2" fill="none" />
          <path d="M50 0 Q 45 25 50 50 T 50 100" stroke="white" strokeWidth="2" fill="none" />
        </svg>
        
        {/* Home Pin */}
        <div className="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 text-center z-10">
          <div className="w-5 h-5 rounded-full bg-green-600 border-4 border-white shadow-lg shadow-green-900/20 mx-auto" />
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 text-[8px] font-bold text-green-600 mt-2 border border-green-100 shadow-sm uppercase tracking-widest">🏠 Home</div>
        </div>

        {/* Pro Pin */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute top-1/4 left-[65%] -translate-x-1/2 -translate-y-1/2 text-center z-10"
        >
          <div className="w-12 h-12 rounded-full bg-white border-2 border-green-600 flex items-center justify-center text-2xl shadow-xl">
            {pro.avatar}
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 text-[8px] font-bold text-green-600 mt-2 border border-green-100 shadow-sm uppercase tracking-widest">
            {eta ? `${eta} min` : "Arrived"}
          </div>
        </motion.div>

        <button onClick={onClose} className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl p-3 text-gray-900 shadow-lg border border-gray-100 active:scale-95 transition-all">
          <ChevronLeft size={20} />
        </button>
      </div>

      {/* ETA Strip */}
      <div className={`p-5 flex items-center gap-4 border-b border-gray-100 shrink-0 ${eta && eta > 0 ? "bg-white" : "bg-green-50"}`}>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border ${
          eta && eta > 0 ? "bg-amber-50 border-amber-100 text-amber-600" : "bg-green-100 border-green-200 text-green-600"
        }`}>
          {eta && eta > 0 ? "⚡" : "✓"}
        </div>
        <div className="flex-1">
          <h4 className="text-gray-900 font-bold text-base">
            {eta && eta > 0 ? `${pro.name} arrives in ${eta} min!` : `${pro.name} has arrived!`}
          </h4>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">Order #{order.id} · ₹{order.price} paid</p>
        </div>
        <button onClick={() => onChat(pro)} className="bg-green-50 text-green-600 border border-green-200 rounded-xl px-4 py-2.5 text-xs font-bold flex items-center gap-2 active:scale-95 transition-all">
          <MessageSquare size={14} /> Chat
        </button>
      </div>

      {/* Steps */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl">{pro.avatar}</div>
            <div className="flex-1">
              <div className="flex gap-2 items-center">
                <p className="text-gray-900 font-bold text-sm">{pro.name}</p>
                <span className="bg-green-600 text-white text-[7px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-widest">Verified ✓</span>
              </div>
              <p className="text-gray-400 text-[9px] font-bold uppercase tracking-tighter mt-0.5">{pro.title} · {pro.jobs} jobs</p>
            </div>
            <div className="flex items-center gap-1 text-green-600 font-bold text-xs">
              <Star size={10} fill="currentColor" /> {pro.rating}
            </div>
          </div>
          <div className="bg-gray-100 rounded-full h-1.5 overflow-hidden mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${order.progress}%` }}
              className="h-full bg-linear-to-r from-green-500 to-emerald-500 rounded-full"
            />
          </div>
          <p className="text-right text-[9px] font-bold text-green-600 uppercase tracking-widest">{order.progress}% complete</p>
        </div>

        <div className="space-y-0">
          {order.steps.map((step: string, i: number) => {
            const done = i <= stepIdx;
            const active = i === stepIdx;
            return (
              <div key={i} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-extrabold transition-all duration-500 border-2 ${
                    done ? "bg-green-600 border-green-600 text-white" : "bg-white border-gray-200 text-gray-300"
                  } ${active ? "ring-4 ring-green-100" : ""}`}>
                    {done ? <Check size={14} /> : i + 1}
                  </div>
                  {i < order.steps.length - 1 && (
                    <div className={`w-0.5 h-10 transition-colors duration-500 ${done ? "bg-green-600" : "bg-gray-100"}`} />
                  )}
                </div>
                <div className="pt-1">
                  <p className={`text-sm font-bold ${done ? "text-gray-900" : "text-gray-300"}`}>{step}</p>
                  {active && <p className="text-green-600 text-[10px] font-bold uppercase tracking-widest mt-1">{eta && eta > 0 ? `Arriving in ${eta} min` : "In progress"}</p>}
                </div>
              </div>
            );
          })}
        </div>

        {order.status === "Completed" && (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm text-center">
            <p className="text-gray-900 font-bold text-sm mb-4 font-serif">Rate your experience</p>
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map(s => (
                <button key={s} className="w-10 h-10 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center text-xl text-green-600 active:scale-95 transition-all">★</button>
              ))}
            </div>
            <Button onClick={onClose} size="sm">Submit Rating</Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
