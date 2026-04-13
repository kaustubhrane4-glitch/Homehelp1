import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Bot, Sparkles } from "lucide-react";
import { getHomeHelpAIResponse } from "../lib/gemini";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AIChatProps {
  onClose: () => void;
}

export function AIChat({ onClose }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! 👋 I'm your HomeHelp AI. Describe your home problem and I'll recommend the perfect service, estimate cost, and help you book instantly.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await getHomeHelpAIResponse(userMessage.content, messages);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm having trouble connecting right now. Please try again later!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickChips = [
    "AC not cooling 🥵",
    "Best cleaning?",
    "Pest problem 🐜",
    "Cheapest service",
  ];

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
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="bg-white rounded-t-[32px] max-h-[85%] flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center text-green-600">
            <Bot size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-gray-900 font-bold text-base font-serif">HomeHelp AI</h3>
            <p className="text-green-600 text-[10px] font-medium uppercase tracking-wider">
              Powered by Gemini · Always available
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-linear-to-br from-green-600 to-emerald-600 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-none flex gap-1 items-center">
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-1.5 h-1.5 bg-green-600 rounded-full"
                />
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                  className="w-1.5 h-1.5 bg-green-600 rounded-full"
                />
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                  className="w-1.5 h-1.5 bg-green-600 rounded-full"
                />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Chips */}
        <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar">
          {quickChips.map((chip) => (
            <button
              key={chip}
              onClick={() => setInput(chip)}
              className="whitespace-nowrap px-4 py-2 bg-green-50 text-green-700 border border-green-100 rounded-full text-xs font-semibold hover:bg-green-100 transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 pb-8 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Describe your home problem..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-hidden focus:border-green-500 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="w-12 h-12 bg-linear-to-br from-green-600 to-emerald-600 text-white rounded-xl flex items-center justify-center disabled:opacity-50 transition-all active:scale-95"
          >
            <Send size={20} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
