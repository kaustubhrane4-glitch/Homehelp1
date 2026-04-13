import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, Bell, ShoppingBag, Zap, Bot, Package, 
  MessageSquare, Star, ChevronRight, Home, User,
  Plus, Check, X, MapPin, Clock, LogOut, CreditCard
} from "lucide-react";

import { SERVICES, CATS, PROVIDERS, ORDERS_INIT, NOTIFS_INIT } from "./constants";
import { EnrollmentWizard } from "./components/EnrollmentWizard";
import { ProDashboard } from "./components/ProDashboard";
import { AdminPanel } from "./components/AdminPanel";
import { AIChat } from "./components/AIChat";
import { ProChat } from "./components/ProChat";
import { BookingFlow } from "./components/BookingFlow";
import { PaymentModal } from "./components/PaymentModal";
import { LiveTracker } from "./components/LiveTracker";
import { CancelModal } from "./components/CancelModal";
import { Button } from "./components/ui/Button";
import { Card } from "./components/ui/Card";

export default function App() {
  const [screen, setScreen] = useState<"landing" | "enroll" | "dashboard" | "admin">("landing");
  const [tab, setTab] = useState("home");
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
  const [selSvc, setSelSvc] = useState<any>(null);
  const [booking, setBooking] = useState<any>(null);
  const [instant, setInstant] = useState(false);
  const [payment, setPayment] = useState<any>(null);
  const [orders, setOrders] = useState(ORDERS_INIT);
  const [notifs, setNotifs] = useState(NOTIFS_INIT);
  const [confirmed, setConfirmed] = useState<any>(null);
  const [trackOrder, setTrackOrder] = useState<any>(null);
  const [cancelTarget, setCancelTarget] = useState<any>(null);
  const [showAI, setShowAI] = useState(false);
  const [proChat, setProChat] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);

  const unread = notifs.filter(n => !n.read).length;
  const filtered = SERVICES.filter(s => (cat === "All" || s.cat === cat) && (s.name.toLowerCase().includes(search.toLowerCase()) || s.sub.toLowerCase().includes(search.toLowerCase())));
  const popular = SERVICES.filter(s => s.popular);
  const cartTotal = cart.reduce((s, x) => s + x.price, 0);

  const handleBookingConfirm = ({ service, addr, date, slot, pro }: any) => {
    setBooking(null); setInstant(false);
    setPayment({ service, addr, date, slot, pro, amount: service.price + 29 });
  };

  const handlePaySuccess = () => {
    const { service, slot, pro, amount } = payment;
    const isNow = slot.includes("Now");
    const o = { id: `HH${1030 + orders.length}`, service: service.name, emoji: service.emoji, status: isNow ? "En Route" : "Scheduled", progress: isNow ? 50 : 10, eta: isNow ? "8 min" : null, date: isNow ? "Today, Now" : `Tomorrow, ${slot}`, pro: pro.name, price: amount, steps: ["Booked", "Assigned", "En Route", "In Service", "Done"] };
    setOrders(p => [o, ...p]);
    setNotifs(n => [{ id: Date.now(), icon: "⚡", title: isNow ? "Pro arriving in 8 min!" : "Booking Confirmed!", body: `${service.name} — ₹${amount} paid`, time: "Just now", read: false }, ...n]);
    setPayment(null); setSelSvc(null); setConfirmed(o); setTab("orders");
    if (isNow) setTrackOrder(o);
  };

  const handleCancel = (o: any) => {
    setOrders(prev => prev.map(x => x.id === o.id ? { ...x, status: "Cancelled", progress: 0 } : x));
    setNotifs(n => [{ id: Date.now(), icon: "✕", title: "Booking Cancelled", body: `${o.service} cancelled. Refund initiated.`, time: "Just now", read: false }, ...n]);
  };

  if (screen === "enroll") return <EnrollmentWizard onComplete={() => setScreen("dashboard")} />;
  if (screen === "dashboard") return <ProDashboard onLogout={() => setScreen("landing")} />;
  if (screen === "admin") return <AdminPanel onBack={() => setScreen("landing")} />;

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4 font-sans">
      <div className="w-[390px] h-[844px] bg-white rounded-[48px] shadow-2xl overflow-hidden relative border-[8px] border-gray-900">
        
        {/* Modals */}
        <AnimatePresence>
          {showAI && <AIChat onClose={() => setShowAI(false)} />}
          {proChat && <ProChat pro={proChat} onClose={() => setProChat(null)} />}
          {trackOrder && <LiveTracker order={trackOrder} onClose={() => setTrackOrder(null)} onChat={p => { setTrackOrder(null); setProChat(p); }} />}
          {booking && <BookingFlow service={booking} instant={instant} onClose={() => { setBooking(null); setInstant(false); }} onConfirm={handleBookingConfirm} />}
          {payment && <PaymentModal amount={payment.amount} service={payment.service} onSuccess={handlePaySuccess} onClose={() => setPayment(null)} />}
          {cancelTarget && <CancelModal order={cancelTarget} onCancel={handleCancel} onClose={() => setCancelTarget(null)} />}
        </AnimatePresence>

        {/* Cart Drawer */}
        <AnimatePresence>
          {showCart && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-40 flex items-end backdrop-blur-sm">
              <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="bg-white rounded-t-[32px] w-full p-6 pb-12 shadow-2xl max-h-[80%] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-gray-900 font-bold text-lg font-serif">Your Cart ({cart.length})</h3>
                  <button onClick={() => setShowCart(false)} className="p-2 bg-gray-50 rounded-xl text-gray-400"><X size={20} /></button>
                </div>
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-5xl mb-4">✦</div>
                    <p className="text-gray-900 font-bold">Your cart is empty</p>
                    <p className="text-gray-400 text-xs mt-1 mb-8">Browse services and add them here</p>
                    <Button onClick={() => setShowCart(false)}>Browse Services</Button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 mb-8">
                      {cart.map(s => (
                        <div key={s.id} className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4 border border-gray-100">
                          <span className="text-2xl">{s.emoji}</span>
                          <div className="flex-1">
                            <p className="text-gray-900 font-bold text-sm">{s.name}</p>
                            <p className="text-gray-400 text-[10px] uppercase tracking-tighter">{s.sub}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-green-600 font-extrabold text-sm">₹{s.price}</p>
                            <button onClick={() => setCart(c => c.filter(x => x.id !== s.id))} className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-1">Remove</button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-green-50 rounded-2xl p-5 mb-6 border border-green-100 space-y-2">
                      <div className="flex justify-between text-xs font-medium text-gray-500"><span>Subtotal</span><span>₹{cartTotal}</span></div>
                      <div className="flex justify-between text-xs font-medium text-gray-500"><span>Platform fee</span><span>₹{cart.length * 29}</span></div>
                      <div className="border-t border-green-200/50 pt-3 mt-3 flex justify-between items-center">
                        <span className="text-gray-900 font-bold text-sm">Total</span>
                        <span className="text-green-600 font-extrabold text-xl">₹{cartTotal + cart.length * 29}</span>
                      </div>
                    </div>
                    <Button onClick={() => { setShowCart(false); if (cart[0]) setPayment({ service: cart[0], amount: cartTotal + cart.length * 29 }); }}>Pay ₹{cartTotal + cart.length * 29} →</Button>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="h-full flex flex-col bg-gray-50">
          <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
            
            {/* ── HOME ── */}
            {tab === "home" && !selSvc && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-0">
                {/* Header */}
                <div className="p-6 pt-12 bg-white rounded-b-[40px] shadow-sm">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1 flex items-center gap-1"><MapPin size={10} /> Bangalore, KA</p>
                      <h1 className="text-gray-900 text-2xl font-bold font-serif leading-tight">Good morning,<br /><span className="text-green-600">Rahul ✦</span></h1>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setTab("notifs")} className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 relative border border-gray-100">
                        <Bell size={20} />
                        {unread > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />}
                      </button>
                      <button onClick={() => setShowCart(true)} className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 relative border border-gray-100">
                        <ShoppingBag size={20} />
                        {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[8px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">{cart.length}</span>}
                      </button>
                    </div>
                  </div>
                  {/* Search */}
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-center gap-3 focus-within:border-green-400 transition-all">
                    <Search className="text-gray-400" size={18} />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search services..." className="bg-transparent border-none outline-hidden text-sm font-medium w-full" />
                  </div>
                </div>

                {/* Instant Book */}
                <div className="p-6">
                  <motion.div 
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setInstant(true); setBooking(SERVICES[0]); }}
                    className="bg-linear-to-br from-red-50 to-orange-50 border border-red-100 rounded-3xl p-5 flex items-center gap-4 cursor-pointer relative overflow-hidden shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-200 shrink-0">
                      <Zap size={24} fill="currentColor" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-bold text-sm">Instant Booking</p>
                      <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">Pro at your door in 10 mins</p>
                    </div>
                    <div className="bg-white/50 backdrop-blur-sm rounded-xl px-3 py-2 border border-red-100">
                      <ChevronRight size={16} className="text-red-500" />
                    </div>
                  </motion.div>
                </div>

                {/* Quick Actions */}
                <div className="px-6 grid grid-cols-4 gap-3 mb-8">
                  {[
                    { icon: <Bot size={20} />, label: "AI Help", action: () => setShowAI(true) },
                    { icon: <Package size={20} />, label: "Bookings", action: () => setTab("orders") },
                    { icon: <MessageSquare size={20} />, label: "Chat Pros", action: () => setProChat(PROVIDERS[0]) },
                    { icon: <Star size={20} />, label: "Elite", action: () => {} }
                  ].map((item) => (
                    <button key={item.label} onClick={item.action} className="flex flex-col items-center gap-2">
                      <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-xs flex items-center justify-center text-green-600 active:scale-95 transition-all">
                        {item.icon}
                      </div>
                      <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{item.label}</span>
                    </button>
                  ))}
                </div>

                {/* Categories */}
                <div className="px-6 mb-6">
                  <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                    {CATS.map(c => (
                      <button
                        key={c}
                        onClick={() => setCat(c)}
                        className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${
                          cat === c ? "bg-green-600 border-green-600 text-white shadow-lg shadow-green-100" : "bg-white border-gray-200 text-gray-500 hover:border-gray-300"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular */}
                {cat === "All" && !search && (
                  <div className="mb-8">
                    <div className="px-6 flex justify-between items-center mb-4">
                      <h3 className="text-gray-900 font-bold font-serif">Most Booked</h3>
                      <button className="text-green-600 text-[10px] font-bold uppercase tracking-widest">See all →</button>
                    </div>
                    <div className="flex gap-4 overflow-x-auto no-scrollbar px-6 pb-4">
                      {popular.map((s) => (
                        <Card key={s.id} onClick={() => setSelSvc(s)} className="shrink-0 w-36 p-4">
                          <div className="text-3xl mb-3">{s.emoji}</div>
                          <p className="text-gray-900 font-bold text-xs mb-1 truncate">{s.name}</p>
                          <p className="text-gray-400 text-[8px] font-bold uppercase tracking-tighter mb-3 truncate">{s.sub}</p>
                          <div className="flex justify-between items-center">
                            <p className="text-green-600 font-extrabold text-sm">₹{s.price}</p>
                            <div className="flex items-center gap-0.5 text-amber-500 text-[9px] font-bold">
                              <Star size={8} fill="currentColor" /> {s.rating}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* All Services */}
                <div className="px-6">
                  <h3 className="text-gray-900 font-bold font-serif mb-4 flex items-center gap-2">
                    All Services <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">({filtered.length})</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {filtered.map((s) => (
                      <Card key={s.id} onClick={() => setSelSvc(s)} className="relative overflow-hidden">
                        {s.popular && <div className="absolute top-0 right-0 bg-green-600 text-white text-[7px] font-bold px-2 py-1 rounded-bl-xl uppercase tracking-widest">Hot</div>}
                        <div className="text-3xl mb-3">{s.emoji}</div>
                        <p className="text-gray-900 font-bold text-xs mb-1">{s.name}</p>
                        <p className="text-gray-400 text-[8px] font-bold uppercase tracking-tighter mb-4 line-clamp-2">{s.sub}</p>
                        <div className="flex justify-between items-center">
                          <p className="text-green-600 font-extrabold text-sm">₹{s.price}</p>
                          <span className="text-gray-400 text-[8px] font-bold uppercase tracking-tighter flex items-center gap-1"><Clock size={8} /> {s.time}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Staff Access */}
                <div className="px-6 mt-12 mb-8">
                  <button onClick={() => setScreen("admin")} className="w-full py-4 bg-slate-900 rounded-2xl text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-800 transition-all">
                    ⚙️ Admin Panel (Staff Only)
                  </button>
                  <button onClick={() => setScreen("enroll")} className="w-full mt-3 py-4 bg-white border border-gray-200 rounded-2xl text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-50 transition-all">
                    🛠 Join as a Professional
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── SERVICE DETAIL ── */}
            {tab === "home" && selSvc && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-0">
                <div className="relative h-64 bg-linear-to-br from-green-50 to-emerald-100 flex items-center justify-center overflow-hidden">
                  <div className="text-9xl opacity-20">{selSvc.emoji}</div>
                  <button onClick={() => setSelSvc(null)} className="absolute top-12 left-6 w-10 h-10 rounded-xl bg-white/80 backdrop-blur-md flex items-center justify-center text-gray-900 shadow-lg border border-white/50 active:scale-95 transition-all">
                    <X size={20} />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-linear-to-t from-gray-50 to-transparent">
                    <p className="text-green-600 text-[10px] font-bold uppercase tracking-widest mb-1">{selSvc.cat}</p>
                    <h2 className="text-gray-900 text-3xl font-bold font-serif">{selSvc.name}</h2>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { v: `₹${selSvc.price}`, l: "Starting", c: "text-green-600" },
                      { v: selSvc.time, l: "Duration", c: "text-gray-900" },
                      { v: `★ ${selSvc.rating}`, l: "Rating", c: "text-amber-500" }
                    ].map((stat) => (
                      <div key={stat.l} className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-xs">
                        <p className={`font-extrabold text-sm ${stat.c}`}>{stat.v}</p>
                        <p className="text-gray-400 text-[8px] font-bold uppercase tracking-widest mt-1">{stat.l}</p>
                      </div>
                    ))}
                  </div>

                  <div onClick={() => { setInstant(true); setBooking(selSvc); }} className="bg-linear-to-br from-red-500 to-orange-600 rounded-3xl p-5 flex items-center gap-4 cursor-pointer shadow-lg shadow-red-100 text-white group active:scale-[0.98] transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                      <Zap size={24} fill="currentColor" />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm">Get a Pro in 10 Minutes</p>
                      <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest mt-0.5">3 pros available now near you</p>
                    </div>
                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </div>

                  <Button onClick={() => { setInstant(false); setBooking(selSvc); }} variant="outline" className="py-5">Schedule a Booking</Button>

                  <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs">
                    <h4 className="text-gray-900 font-bold text-sm mb-4 font-serif">What's Included</h4>
                    <div className="space-y-3">
                      {[
                        "Aadhaar & police verified professional",
                        "All equipment & supplies included",
                        "100% satisfaction guarantee",
                        "On-time or full refund",
                        "Insured up to ₹10,000"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0"><Check size={10} /></div>
                          <p className="text-gray-500 text-xs font-medium">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => { cart.find(c => c.id === selSvc.id) ? setCart(c => c.filter(x => x.id !== selSvc.id)) : setCart(c => [...c, selSvc]); }}
                    className={`w-full py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all border ${
                      cart.find(c => c.id === selSvc.id) ? "bg-green-50 border-green-200 text-green-600" : "bg-gray-100 border-gray-200 text-gray-500"
                    }`}
                  >
                    {cart.find(c => c.id === selSvc.id) ? "✓ Added to Cart" : "+ Add to Cart"}
                  </button>

                  <div onClick={() => { setSelSvc(null); setShowAI(true); }} className="bg-blue-50 border border-blue-100 rounded-3xl p-5 flex items-center gap-4 cursor-pointer active:scale-[0.98] transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-100 shrink-0">
                      <Bot size={24} />
                    </div>
                    <div className="flex-1">
                      <p className="text-blue-900 font-bold text-sm">Not sure? Ask HomeHelp AI</p>
                      <p className="text-blue-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">Personalised advice in seconds</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── ORDERS ── */}
            {tab === "orders" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 pt-12">
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">My Bookings</p>
                <h2 className="text-gray-900 text-2xl font-bold font-serif mb-8">{orders.length} Total Orders</h2>
                
                {confirmed && (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-green-50 border border-green-100 rounded-3xl p-5 mb-6 relative">
                    <p className="text-green-700 font-bold text-sm flex items-center gap-2"><Check size={16} /> Booking Confirmed & Paid</p>
                    <p className="text-gray-500 text-[11px] mt-1 ml-6">{confirmed.service} — ₹{confirmed.price}</p>
                    <button onClick={() => setConfirmed(null)} className="absolute top-4 right-4 text-gray-400"><X size={14} /></button>
                  </motion.div>
                )}

                <div className="space-y-4">
                  {orders.map(o => (
                    <Card key={o.id} className="p-5">
                      <div className="flex gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center text-3xl shrink-0">{o.emoji}</div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="text-gray-900 font-bold text-sm">{o.service}</h4>
                            <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border ${
                              o.status === "Completed" ? "bg-green-50 text-green-600 border-green-100" :
                              o.status === "Cancelled" ? "bg-red-50 text-red-600 border-red-100" :
                              "bg-blue-50 text-blue-600 border-blue-100"
                            }`}>{o.status}</span>
                          </div>
                          <p className="text-gray-400 text-[10px] font-medium uppercase tracking-tighter mt-1">{o.date} · {o.pro}</p>
                          {o.eta && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-1.5 flex items-center gap-1"><Zap size={10} fill="currentColor" /> Arriving in {o.eta}</p>}
                          <p className="text-green-600 text-[10px] font-bold uppercase tracking-widest mt-1.5">₹{o.price} paid ✓</p>
                        </div>
                      </div>
                      {o.status !== "Cancelled" && (
                        <div className="bg-gray-100 rounded-full h-1.5 overflow-hidden mb-6">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${o.progress}%` }} className="h-full bg-linear-to-r from-green-500 to-emerald-500 rounded-full" />
                        </div>
                      )}
                      <div className="flex gap-2">
                        {o.status !== "Cancelled" && <Button size="sm" onClick={() => setTrackOrder(o)} className="flex-1">Track</Button>}
                        {o.status !== "Completed" && o.status !== "Cancelled" && (
                          <button onClick={() => setProChat(PROVIDERS.find(p => p.name.startsWith(o.pro.split(" ")[0])) || PROVIDERS[0])} className="px-4 py-2.5 bg-gray-100 rounded-xl text-[10px] font-bold text-gray-600 uppercase tracking-widest">Chat</button>
                        )}
                        {o.status === "Completed" && <button className="flex-1 py-2.5 bg-amber-50 border border-amber-100 rounded-xl text-[10px] font-bold text-amber-600 uppercase tracking-widest">Rate</button>}
                        {o.status !== "Completed" && o.status !== "Cancelled" && (
                          <button onClick={() => setCancelTarget(o)} className="px-4 py-2.5 bg-red-50 border border-red-100 rounded-xl text-[10px] font-bold text-red-500 uppercase tracking-widest">Cancel</button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── NOTIFS ── */}
            {tab === "notifs" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 pt-12">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Notifications</p>
                    <h2 className="text-gray-900 text-2xl font-bold font-serif">{unread} Unread</h2>
                  </div>
                  {unread > 0 && <button onClick={() => setNotifs(n => n.map(x => ({ ...x, read: true })))} className="text-green-600 text-[10px] font-bold uppercase tracking-widest">Mark all read</button>}
                </div>
                <div className="space-y-3">
                  {notifs.map(n => (
                    <div key={n.id} onClick={() => setNotifs(ns => ns.map(x => x.id === n.id ? { ...x, read: true } : x))} className={`p-4 rounded-[24px] border transition-all flex gap-4 cursor-pointer ${n.read ? "bg-white border-gray-100" : "bg-green-50 border-green-200 shadow-sm"}`}>
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${n.read ? "bg-gray-50 text-gray-300 border border-gray-100" : "bg-white text-green-600 border border-green-100 shadow-xs"}`}>{n.icon}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className={`text-sm ${n.read ? "text-gray-500 font-medium" : "text-gray-900 font-bold"}`}>{n.title}</h4>
                          {!n.read && <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5" />}
                        </div>
                        <p className="text-gray-400 text-[11px] mt-1 leading-relaxed">{n.body}</p>
                        <p className="text-gray-300 text-[9px] font-bold uppercase tracking-widest mt-3">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── PROFILE ── */}
            {tab === "profile" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="p-8 pt-12 bg-white rounded-b-[40px] shadow-sm text-center">
                  <div className="w-24 h-24 rounded-full bg-linear-to-br from-green-50 to-emerald-100 border-4 border-white flex items-center justify-center text-5xl mx-auto mb-6 shadow-xl">👤</div>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Welcome back</p>
                  <h2 className="text-gray-900 text-2xl font-bold font-serif">Rahul Sharma</h2>
                  <p className="text-gray-400 text-xs mt-1">rahul.sharma@gmail.com</p>
                  <div className="flex justify-center gap-4 mt-8">
                    {[
                      { v: "12", l: "Bookings" },
                      { v: "4.9", l: "Rating" },
                      { v: "₹4.2K", l: "Saved" }
                    ].map((stat) => (
                      <div key={stat.l} className="bg-gray-50 rounded-2xl px-6 py-3 text-center border border-gray-100">
                        <p className="text-green-600 font-extrabold text-sm">{stat.v}</p>
                        <p className="text-gray-400 text-[8px] font-bold uppercase tracking-widest mt-1">{stat.l}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  {[
                    { icon: <Package size={18} />, label: "My Bookings", sub: "3 active", action: () => setTab("orders") },
                    { icon: <Bot size={18} />, label: "HomeHelp AI", sub: "Instant advice", action: () => setShowAI(true) },
                    { icon: <CreditCard size={18} />, label: "Payment Methods", sub: "GPay, Card, UPI" },
                    { icon: <MapPin size={18} />, label: "Saved Addresses", sub: "Home, Office" },
                    { icon: <Star size={18} />, label: "Reviews & Ratings", sub: "Leave feedback" },
                    { icon: <Bell size={18} />, label: "Notifications", sub: "Manage alerts", action: () => setTab("notifs") },
                    { icon: <LogOut size={18} />, label: "Sign Out", sub: "", danger: true }
                  ].map((item, i) => (
                    <Card key={i} onClick={item.action} className={`hover:bg-gray-50 transition-colors ${item.danger ? "border-red-100" : ""}`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                          item.danger ? "bg-red-50 border-red-100 text-red-500" : "bg-green-50 border-green-100 text-green-600"
                        }`}>{item.icon}</div>
                        <div className="flex-1">
                          <p className={`font-bold text-sm ${item.danger ? "text-red-600" : "text-gray-900"}`}>{item.label}</p>
                          {item.sub && <p className="text-gray-400 text-[10px] uppercase tracking-tighter">{item.sub}</p>}
                        </div>
                        {item.action && <ChevronRight size={16} className="text-gray-300" />}
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* AI FAB */}
          {tab === "home" && !selSvc && !showAI && !showCart && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAI(true)}
              className="absolute bottom-24 right-6 bg-linear-to-br from-green-600 to-emerald-600 text-white rounded-full px-6 py-4 flex items-center gap-3 shadow-2xl shadow-green-200 z-30 border-2 border-white/20"
            >
              <Bot size={24} />
              <span className="text-xs font-bold uppercase tracking-widest">Ask AI</span>
            </motion.button>
          )}

          {/* Bottom Nav */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100 flex justify-around py-4 pb-8 z-30">
            {[
              { id: "home", icon: <Home size={20} />, label: "Home" },
              { id: "orders", icon: <Package size={20} />, label: "Orders" },
              { id: "notifs", icon: <Bell size={20} />, label: "Alerts", badge: unread },
              { id: "profile", icon: <User size={20} />, label: "Profile" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => { setTab(item.id); setSelSvc(null); }}
                className="flex-1 flex flex-col items-center gap-1 relative group"
              >
                <div className={`transition-all duration-300 ${tab === item.id ? "text-green-600 scale-110" : "text-gray-400 group-hover:text-gray-600"}`}>
                  {item.icon}
                  {item.badge ? <span className="absolute -top-1 right-1/4 w-4 h-4 bg-red-500 text-white text-[8px] font-extrabold rounded-full flex items-center justify-center border-2 border-white">{item.badge}</span> : null}
                </div>
                <span className={`text-[9px] font-bold uppercase tracking-widest transition-colors ${tab === item.id ? "text-green-600" : "text-gray-400"}`}>
                  {item.label}
                </span>
                {tab === item.id && (
                  <motion.div layoutId="activeTabMain" className="w-4 h-0.5 bg-green-600 rounded-full mt-0.5" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
