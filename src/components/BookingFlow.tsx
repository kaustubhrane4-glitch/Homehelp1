import { useState } from "react";
import { motion } from "motion/react";
import { ChevronRight, ChevronLeft, MapPin, Calendar, Clock, Star, Zap, Check } from "lucide-react";
import { Button } from "./ui/Button";

const PROVIDERS = [
  { id: 1, name: "Priya M.", title: "Home Care Expert", rating: 4.9, jobs: 320, avatar: "👩", badge: "Elite", status: "online", eta: 8 },
  { id: 2, name: "Sunita D.", title: "Deep Clean Specialist", rating: 5.0, jobs: 412, avatar: "👩‍🦱", badge: "Top Pro", status: "online", eta: 12 },
  { id: 3, name: "Meena K.", title: "Laundry Expert", rating: 4.8, jobs: 214, avatar: "👩‍🦰", badge: "Pro", status: "online", eta: 6 },
];

interface BookingFlowProps {
  service: any;
  onClose: () => void;
  onConfirm: (data: any) => void;
  instant?: boolean;
}

export function BookingFlow({ service, onClose, onConfirm, instant = false }: BookingFlowProps) {
  const [step, setStep] = useState(1);
  const [addr, setAddr] = useState(instant ? "🏠 Home address, Bangalore" : "");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState(instant ? "⚡ Now — Instant" : "");
  const [pro, setPro] = useState<any>(null);

  const slots = ["⚡ Now — Instant", "7:00–9:00 AM", "9:00–11:00 AM", "11:00–1:00 PM", "2:00–4:00 PM", "4:00–6:00 PM"];
  const onlinePros = PROVIDERS.filter((p) => p.status === "online");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 z-50 flex items-end backdrop-blur-sm"
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        className="bg-white rounded-t-[32px] w-full max-w-md mx-auto p-6 pb-12 shadow-2xl max-h-[90%] overflow-y-auto"
      >
        {/* Step dots */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`flex-1 h-1 rounded-full transition-all duration-500 ${s <= step ? "bg-green-600" : "bg-gray-100"}`} />
          ))}
        </div>

        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Step 1 of 3</p>
            <h3 className="text-xl font-bold text-gray-900 font-serif mb-1">Your Address</h3>
            <p className="text-gray-500 text-xs mb-6">Where should the professional come?</p>
            <textarea
              value={addr}
              onChange={(e) => setAddr(e.target.value)}
              placeholder="Flat, Street, Area, City..."
              rows={2}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm outline-hidden focus:border-green-500 transition-all resize-none mb-4"
            />
            <div className="flex gap-2 mb-8">
              {["🏠 Home", "🏢 Office", "📍 Other"].map((l) => (
                <button
                  key={l}
                  onClick={() => setAddr(l + " address, Bangalore")}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all ${
                    addr.includes(l.split(" ")[1]) ? "bg-green-50 border-green-200 text-green-600" : "bg-gray-50 border-gray-100 text-gray-400"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <Button onClick={() => setStep(2)} disabled={!addr}>Continue <ChevronRight size={16} className="ml-1" /></Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Step 2 of 3</p>
            <h3 className="text-xl font-bold text-gray-900 font-serif mb-1">When?</h3>
            <p className="text-gray-500 text-xs mb-6">Choose a time slot or book instantly</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {slots.map((s) => (
                <button
                  key={s}
                  onClick={() => setSlot(s)}
                  className={`py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all ${
                    slot === s
                      ? s.includes("Now")
                        ? "bg-red-500 border-red-500 text-white"
                        : "bg-green-50 border-green-200 text-green-600"
                      : "bg-gray-50 border-gray-100 text-gray-400"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {slot && !slot.includes("Now") && (
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-hidden focus:border-green-500 transition-all mb-6"
              />
            )}
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} fullWidth={false} className="px-8">
                <ChevronLeft size={16} className="mr-1" /> Back
              </Button>
              <Button onClick={() => setStep(3)} disabled={!slot || (slot !== "⚡ Now — Instant" && !date)}>
                Continue <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Step 3 of 3</p>
            <h3 className="text-xl font-bold text-gray-900 font-serif mb-1">Choose Your Pro</h3>
            <p className="text-gray-500 text-xs mb-6">All Aadhaar-verified & trained professionals</p>
            <div className="space-y-2 mb-6">
              {onlinePros.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setPro(p)}
                  className={`p-4 rounded-2xl border transition-all flex items-center gap-4 cursor-pointer ${
                    pro?.id === p.id ? "bg-green-50 border-green-500" : "bg-gray-50 border-gray-100"
                  }`}
                >
                  <div className="relative">
                    <div className="w-11 h-11 rounded-full bg-white border border-gray-100 flex items-center justify-center text-2xl shadow-xs">
                      {p.avatar}
                    </div>
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex gap-2 items-center">
                      <p className="text-gray-900 font-bold text-sm">{p.name}</p>
                      <span className="bg-green-600 text-white text-[7px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-widest">{p.badge}</span>
                    </div>
                    <p className="text-gray-400 text-[9px] font-bold uppercase tracking-tighter mt-0.5">
                      {p.jobs} jobs · ⚡ {p.eta} min away
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-green-600 font-bold text-xs">
                      <Star size={10} fill="currentColor" /> {p.rating}
                    </div>
                    {pro?.id === p.id && <Check size={16} className="text-green-600 mt-1 ml-auto" />}
                  </div>
                </div>
              ))}
              <div
                onClick={() => setPro({ id: 0, name: "Best Available", avatar: "✦", eta: 6 })}
                className={`p-4 rounded-2xl border transition-all flex items-center gap-4 cursor-pointer ${
                  pro?.id === 0 ? "bg-green-50 border-green-500" : "bg-gray-50 border-gray-100"
                }`}
              >
                <div className="w-11 h-11 rounded-full bg-white border border-green-100 flex items-center justify-center text-xl text-green-600 shadow-xs">
                  <Zap size={20} fill="currentColor" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-bold text-sm">AI-Matched Pro</p>
                  <p className="text-gray-400 text-[9px] font-bold uppercase tracking-tighter mt-0.5">Fastest ETA · Best for your need</p>
                </div>
                {pro?.id === 0 && <Check size={16} className="text-green-600 ml-auto" />}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-green-50 rounded-2xl p-4 mb-6 border border-green-100">
              <p className="text-green-700 font-bold text-[9px] uppercase tracking-widest mb-3">Order Summary</p>
              {[
                ["Service", service.name],
                [slot.includes("Now") ? "Time" : "Date", slot + (slot !== "⚡ Now — Instant" && date ? `, ${date}` : "")],
                ["Pro", pro ? pro.name : "—"]
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between mb-2 last:mb-0">
                  <span className="text-gray-500 text-[11px] font-medium">{k}</span>
                  <span className="text-gray-900 font-bold text-[11px]">{v}</span>
                </div>
              ))}
              <div className="border-t border-green-200/50 pt-3 mt-3 flex justify-between items-center">
                <span className="text-gray-900 font-bold text-xs">Total</span>
                <span className="text-green-600 font-extrabold text-lg">₹{service.price + 29}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)} fullWidth={false} className="px-8">
                <ChevronLeft size={16} className="mr-1" /> Back
              </Button>
              <Button onClick={() => onConfirm({ service, addr, date, slot, pro: pro || onlinePros[0] })} disabled={!pro}>
                Pay & Book ✦
              </Button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
