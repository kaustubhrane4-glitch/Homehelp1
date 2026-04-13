import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { X, Send } from "lucide-react";

interface Message {
  from: "user" | "pro";
  text: string;
}

interface ProChatProps {
  pro: any;
  onClose: () => void;
}

export function ProChat({ pro, onClose }: ProChatProps) {
  const [msgs, setMsgs] = useState<Message[]>(pro.chat || []);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const send = () => {
    if (!input.trim()) return;
    setMsgs((m) => [...m, { from: "user", text: input.trim() }]);
    setInput("");
    setTimeout(() => {
      const responses = ["On my way! 👍", "Sure, no problem 😊", "I'll be there soon!", "Understood ✓", "See you shortly!"];
      setMsgs((m) => [...m, { from: "pro", text: responses[Math.floor(Math.random() * responses.length)] }]);
    }, 900);
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
        className="bg-white rounded-t-[32px] max-h-[75%] flex flex-col shadow-2xl"
      >
        <div className="p-5 border-b border-gray-100 flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-green-50 border-2 border-green-600 flex items-center justify-center text-2xl">
              {pro.avatar}
            </div>
            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${pro.status === "online" ? "bg-green-500" : "bg-amber-500"}`} />
          </div>
          <div className="flex-1">
            <h3 className="text-gray-900 font-bold text-sm">{pro.name}</h3>
            <p className="text-gray-400 text-[10px] font-medium uppercase tracking-widest mt-0.5">
              {pro.title} · {pro.jobs} jobs
            </p>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-50 rounded-lg text-gray-400">
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"} items-end gap-2`}>
              {m.from === "pro" && <span className="text-xl mb-1">{pro.avatar}</span>}
              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                  m.from === "user"
                    ? "bg-linear-to-br from-green-600 to-emerald-600 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <div className="p-4 pb-8 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder={`Message ${pro.name}...`}
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-hidden focus:border-green-500 transition-all"
          />
          <button
            onClick={send}
            className="w-12 h-12 bg-linear-to-br from-green-600 to-emerald-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-green-100"
          >
            <Send size={20} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
