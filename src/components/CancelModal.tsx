import { useState } from "react";
import { motion } from "motion/react";
import { X, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "./ui/Button";

interface CancelModalProps {
  order: any;
  onCancel: (order: any) => void;
  onClose: () => void;
}

export function CancelModal({ order, onCancel, onClose }: CancelModalProps) {
  const [done, setDone] = useState(false);
  const isFree = order.status === "Scheduled";
  const refund = isFree ? order.price : Math.max(0, order.price - 49);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-[32px] p-8 w-full max-w-xs text-center shadow-2xl border border-red-50"
      >
        {!done ? (
          <>
            <div className="w-16 h-16 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-500 mx-auto mb-6">
              <X size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 font-serif mb-2">Cancel Booking?</h3>
            <p className="text-gray-500 text-xs leading-relaxed mb-8">
              <span className="font-bold text-gray-900">{order.service}</span> on <span className="font-bold text-gray-900">{order.date}</span>
            </p>
            <div className="bg-red-50 rounded-2xl p-5 mb-8 border border-red-100 text-left">
              <p className="text-red-700 font-bold text-[10px] mb-4 tracking-widest uppercase flex items-center gap-2">
                <AlertCircle size={12} /> Cancellation Policy
              </p>
              <div className="space-y-2">
                <p className={`text-[11px] font-bold ${isFree ? "text-green-600" : "text-red-600"}`}>
                  {isFree ? "✓ Free cancellation" : "⚠ ₹49 cancellation fee"}
                </p>
                <p className="text-gray-700 text-[11px] font-medium">Refund: ₹{refund} in 3–5 days</p>
                <p className="text-gray-400 text-[10px]">Free if cancelled 30+ min before service</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 py-4 bg-gray-100 rounded-2xl text-xs font-bold text-gray-500 hover:bg-gray-200 transition-all">Keep It</button>
              <button
                onClick={() => { onCancel(order); setDone(true); }}
                className="flex-1 py-4 bg-red-500 rounded-2xl text-xs font-bold text-white shadow-lg shadow-red-100 hover:bg-red-600 transition-all"
              >
                Yes, Cancel
              </button>
            </div>
          </>
        ) : (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <div className="w-16 h-16 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-green-500 mx-auto mb-6">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 font-serif mb-2">Booking Cancelled</h3>
            <p className="text-gray-500 text-xs mb-8">{order.service} has been cancelled</p>
            <div className="bg-green-50 rounded-2xl p-5 mb-8 border border-green-100">
              <p className="text-green-700 font-bold text-xs">Refund Initiated</p>
              <p className="text-gray-500 text-[10px] mt-1 uppercase tracking-widest">₹{refund} credited in 3–5 business days</p>
            </div>
            <Button onClick={onClose}>Done</Button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
