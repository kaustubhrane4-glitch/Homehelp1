import { useState } from "react";
import { motion } from "motion/react";
import { X, ChevronLeft, ShieldCheck, CreditCard, Wallet, Banknote, Smartphone } from "lucide-react";
import { Button } from "./ui/Button";

interface PaymentModalProps {
  amount: number;
  service: any;
  onSuccess: () => void;
  onClose: () => void;
}

export function PaymentModal({ amount, service, onSuccess, onClose }: PaymentModalProps) {
  const [method, setMethod] = useState<string | null>(null);
  const [step, setStep] = useState<"select" | "enter" | "processing" | "success">("select");
  const [upi, setUpi] = useState("");
  const [card, setCard] = useState({ num: "", name: "", exp: "", cvv: "" });

  const methods = [
    { id: "gpay", icon: "🟢", label: "Google Pay", sub: "UPI instant", type: "upi" },
    { id: "phonepe", icon: "🟣", label: "PhonePe", sub: "UPI payment", type: "upi" },
    { id: "upi", icon: <Smartphone size={20} />, label: "Other UPI", sub: "Any UPI ID", type: "upi" },
    { id: "card", icon: <CreditCard size={20} />, label: "Card", sub: "Visa · Mastercard · RuPay", type: "card" },
    { id: "cod", icon: <Banknote size={20} />, label: "Pay at Doorstep", sub: "Cash after service", type: "cod" },
  ];

  const handlePay = () => {
    setStep("processing");
    setTimeout(() => setStep("success"), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 z-50 flex flex-col justify-end backdrop-blur-sm"
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        className="bg-white rounded-t-[32px] max-h-[90%] flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-100 shrink-0">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-900 font-bold text-lg font-serif">Secure Checkout</h3>
            <button onClick={onClose} className="p-2 bg-gray-50 rounded-xl text-gray-400">
              <X size={20} />
            </button>
          </div>
          <div className="bg-green-50 rounded-2xl p-4 flex justify-between items-center border border-green-100">
            <div className="flex gap-3 items-center">
              <span className="text-2xl">{service.emoji || "✦"}</span>
              <div>
                <p className="text-gray-900 font-bold text-sm">{service.name}</p>
                <p className="text-gray-400 text-[9px] uppercase tracking-widest">incl. ₹29 platform fee</p>
              </div>
            </div>
            <p className="text-green-600 font-extrabold text-xl">₹{amount}</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 pb-12">
          {step === "select" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-4">Choose Payment Method</p>
              <div className="space-y-2">
                {methods.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => { setMethod(m.id); setStep("enter"); }}
                    className={`p-4 rounded-2xl border transition-all flex items-center gap-4 cursor-pointer ${
                      method === m.id ? "bg-green-50 border-green-500" : "bg-gray-50 border-gray-100"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-xl shadow-xs">
                      {m.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-bold text-sm">{m.label}</p>
                      <p className="text-gray-400 text-[10px] font-medium uppercase tracking-tighter">{m.sub}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 transition-all flex items-center justify-center ${
                      method === m.id ? "bg-green-600 border-green-600" : "border-gray-200"
                    }`}>
                      {method === m.id && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center items-center gap-2 mt-8 text-gray-400">
                <ShieldCheck size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">256-bit SSL · RBI Compliant</span>
              </div>
            </motion.div>
          )}

          {step === "enter" && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <button onClick={() => setStep("select")} className="flex items-center gap-1 text-green-600 font-bold text-xs mb-6 uppercase tracking-widest">
                <ChevronLeft size={14} /> Back
              </button>
              
              {method === "card" ? (
                <div className="space-y-4">
                  <div className="bg-linear-to-br from-green-800 to-emerald-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden mb-6">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full" />
                    <div className="flex justify-between items-start mb-8">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">HomeHelp Pay</p>
                      <CreditCard size={24} className="text-white/40" />
                    </div>
                    <p className="text-lg font-bold tracking-[0.2em] mb-6 font-mono">{card.num || "•••• •••• •••• ••••"}</p>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-[8px] font-bold uppercase tracking-widest text-white/40">Cardholder</p>
                        <p className="text-xs font-bold uppercase">{card.name || "YOUR NAME"}</p>
                      </div>
                      <div>
                        <p className="text-[8px] font-bold uppercase tracking-widest text-white/40">Expires</p>
                        <p className="text-xs font-bold">{card.exp || "MM/YY"}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <input
                      placeholder="Card Number"
                      value={card.num}
                      onChange={e => setCard(c => ({ ...c, num: e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim() }))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono outline-hidden focus:border-green-500"
                    />
                    <input
                      placeholder="Cardholder Name"
                      value={card.name}
                      onChange={e => setCard(c => ({ ...c, name: e.target.value.toUpperCase() }))}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-hidden focus:border-green-500"
                    />
                    <div className="flex gap-3">
                      <input
                        placeholder="MM/YY"
                        value={card.exp}
                        onChange={e => setCard(c => ({ ...c, exp: e.target.value.replace(/\D/g, "").slice(0, 4).replace(/^(\d{2})(\d)/, "$1/$2") }))}
                        className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-hidden focus:border-green-500"
                      />
                      <input
                        placeholder="CVV"
                        type="password"
                        value={card.cvv}
                        onChange={e => setCard(c => ({ ...c, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) }))}
                        className="w-24 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-hidden focus:border-green-500"
                      />
                    </div>
                  </div>
                  <Button onClick={handlePay} className="mt-4">Pay ₹{amount} Securely 🔒</Button>
                </div>
              ) : method === "cod" ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-4xl mx-auto mb-6 shadow-xs">💵</div>
                  <h4 className="text-xl font-bold text-gray-900 font-serif mb-2">Pay at Doorstep</h4>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8">
                    Pay <span className="text-green-600 font-extrabold">₹{amount}</span> in cash or via UPI after the service is completed.
                  </p>
                  <Button onClick={handlePay}>Confirm Booking</Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center py-4">
                    <div className="text-5xl mb-4">{methods.find(m => m.id === method)?.icon}</div>
                    <p className="text-gray-900 font-bold text-lg">{methods.find(m => m.id === method)?.label}</p>
                    <p className="text-gray-400 text-xs mt-1">Approve the payment in your app</p>
                  </div>
                  <input
                    placeholder="Enter UPI ID (e.g. name@okicici)"
                    value={upi}
                    onChange={e => setUpi(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-hidden focus:border-green-500"
                  />
                  <Button onClick={handlePay} disabled={method === "upi" && upi.length < 5}>Pay ₹{amount}</Button>
                </div>
              )}
            </motion.div>
          )}

          {step === "processing" && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full border-4 border-green-100 border-t-green-600 animate-spin mx-auto mb-6" />
              <h4 className="text-lg font-bold text-gray-900 mb-2">Processing Payment...</h4>
              <p className="text-gray-400 text-xs">Please don't close this screen or press back</p>
            </div>
          )}

          {step === "success" && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-600 flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg shadow-green-100">✓</div>
              <h4 className="text-2xl font-bold text-gray-900 font-serif mb-2">Payment Successful</h4>
              <p className="text-gray-500 text-sm mb-8">₹{amount} paid · Professional has been notified</p>
              <div className="bg-gray-50 rounded-2xl p-5 mb-8 border border-gray-100 text-left space-y-3">
                {[
                  ["Transaction ID", `TXN${Date.now().toString().slice(-8)}`],
                  ["Amount", `₹${amount}`],
                  ["Status", "✓ Success"]
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{k}</span>
                    <span className="text-gray-900 font-bold text-xs">{v}</span>
                  </div>
                ))}
              </div>
              <Button onClick={onSuccess}>Track Your Pro ✦</Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
