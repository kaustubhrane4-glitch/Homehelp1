import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ChevronRight, ChevronLeft, Shield, Lock, CreditCard, Star } from "lucide-react";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Input } from "./ui/Input";

const CITIES = ["Bangalore", "Mumbai", "Delhi NCR", "Hyderabad", "Pune", "Chennai", "Kolkata", "Ahmedabad"];

const ALL_SERVICES = [
  "Deep Cleaning", "Laundry & Washing", "Window Cleaning", "Bathroom Sanitize",
  "Kitchen Cleaning", "Sofa & Carpet", "Plumbing Fix", "Electrical Work",
  "Pest Control", "AC Service", "Ironing", "Garden Care", "Dishwashing", "Meal Prep",
  "Elder Care", "Baby Sitting", "Water Tank Clean", "Geyser Repair", "Painting",
];

interface EnrollmentWizardProps {
  onComplete: () => void;
}

export function EnrollmentWizard({ onComplete }: EnrollmentWizardProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", city: "", address: "",
    services: [] as string[], experience: "", bio: "",
    aadhaar: "", pan: "", bank: "", ifsc: "", accountName: "",
    availability: [] as string[], languages: [] as string[],
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));
  const toggleArr = (k: "services" | "availability" | "languages", v: string) => {
    set(k, form[k].includes(v) ? form[k].filter(x => x !== v) : [...form[k], v]);
  };

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const langs = ["Hindi", "English", "Kannada", "Tamil", "Telugu", "Marathi", "Bengali"];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <Card className="max-w-md w-full text-center p-10">
          <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-600 flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg shadow-green-100">
            <Check className="text-green-600" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 font-serif">Application Submitted!</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Thank you <span className="font-bold text-gray-900">{form.name}</span>! We've received your application. Our team will verify your documents and contact you within <span className="text-green-600 font-bold">24–48 hours</span>.
          </p>
          <div className="bg-green-50 rounded-2xl p-5 mb-8 border border-green-100 text-left">
            <p className="font-bold text-green-700 text-[10px] mb-4 tracking-widest uppercase">What happens next</p>
            {[
              "Document verification (Aadhaar & PAN)",
              "Background check (1–2 days)",
              "Training session (online, 2 hrs)",
              "Profile goes live — start earning!"
            ].map((s, i) => (
              <div key={i} className="flex gap-3 mb-3 items-center">
                <div className="w-6 h-6 rounded-full bg-linear-to-br from-green-600 to-emerald-600 text-white flex items-center justify-center text-[10px] font-extrabold shrink-0">
                  {i + 1}
                </div>
                <p className="text-xs text-gray-800 font-medium">{s}</p>
              </div>
            ))}
          </div>
          <Button onClick={onComplete}>Go to Pro Dashboard <ChevronRight size={16} className="ml-1" /></Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="bg-linear-to-br from-green-600 to-emerald-600 p-6 flex items-center justify-between shadow-lg">
        <div>
          <p className="text-white/70 text-[10px] font-bold tracking-widest uppercase mb-1">HomeHelp Professional</p>
          <h1 className="text-white text-xl font-bold font-serif">Join as a Pro ✦</h1>
        </div>
        <div className="bg-white/15 rounded-xl px-4 py-2 text-center backdrop-blur-sm">
          <p className="text-white font-extrabold text-lg">{step}/4</p>
          <p className="text-white/70 text-[10px] font-bold uppercase tracking-tighter">Steps</p>
        </div>
      </div>

      <div className="h-1 bg-green-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(step / 4) * 100}%` }}
          className="h-full bg-linear-to-r from-green-500 to-emerald-500"
        />
      </div>

      <div className="max-w-xl mx-auto p-6 pb-12">
        <div className="flex mb-8">
          {[
            { icon: "👤", label: "Personal" },
            { icon: "🛠", label: "Services" },
            { icon: "📄", label: "Documents" },
            { icon: "🏦", label: "Payment" }
          ].map((item, i) => (
            <div key={i} className={`flex-1 text-center transition-opacity ${i + 1 <= step ? "opacity-100" : "opacity-30"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mx-auto mb-2 border-2 ${
                i + 1 < step ? "bg-linear-to-br from-green-600 to-emerald-600 border-green-600 text-white" :
                i + 1 === step ? "bg-green-50 border-green-600 text-green-600" :
                "bg-gray-100 border-gray-200 text-gray-400"
              }`}>
                {i + 1 < step ? <Check size={14} /> : item.icon}
              </div>
              <p className={`text-[10px] font-bold uppercase tracking-wider ${i + 1 === step ? "text-green-600" : "text-gray-400"}`}>
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <Card>
                <h2 className="text-xl font-bold text-gray-900 mb-1 font-serif">Personal Information</h2>
                <p className="text-gray-500 text-xs mb-6">Tell us about yourself to get started</p>
                <Input label="Full Name" placeholder="As on Aadhaar" value={form.name} onChange={v => set("name", v)} required />
                <Input label="Mobile Number" placeholder="+91 9876543210" type="tel" value={form.phone} onChange={v => set("phone", v)} required hint="OTP will be sent for verification" />
                <Input label="Email Address" placeholder="you@email.com" type="email" value={form.email} onChange={v => set("email", v)} required />
                <div className="mb-4">
                  <label className="block text-[10px] font-bold text-gray-500 mb-1.5 tracking-wider uppercase">City <span className="text-red-500">*</span></label>
                  <select value={form.city} onChange={e => set("city", e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-hidden focus:border-green-500 transition-all">
                    <option value="">Select your city</option>
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <Input label="Home Address" placeholder="Full address with pincode" value={form.address} onChange={v => set("address", v)} required />
                <div className="mb-8">
                  <label className="block text-[10px] font-bold text-gray-500 mb-2 tracking-wider uppercase">Languages Spoken</label>
                  <div className="flex flex-wrap gap-2">
                    {langs.map(l => (
                      <button key={l} onClick={() => toggleArr("languages", l)} className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${form.languages.includes(l) ? "bg-green-50 text-green-600 border-green-200" : "bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300"}`}>{l}</button>
                    ))}
                  </div>
                </div>
                <Button onClick={() => setStep(2)} disabled={!form.name || !form.phone || !form.city}>Continue <ChevronRight size={16} className="ml-1" /></Button>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <Card>
                <h2 className="text-xl font-bold text-gray-900 mb-1 font-serif">Your Skills & Services</h2>
                <p className="text-gray-500 text-xs mb-6">Select everything you can do professionally</p>
                <div className="mb-6">
                  <label className="block text-[10px] font-bold text-gray-500 mb-3 tracking-wider uppercase">Services You Offer <span className="text-red-500">*</span></label>
                  <div className="flex flex-wrap gap-2">
                    {ALL_SERVICES.map(s => (
                      <button key={s} onClick={() => toggleArr("services", s)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${form.services.includes(s) ? "bg-green-50 text-green-600 border-green-200" : "bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300"}`}>{form.services.includes(s) && "✓ "} {s}</button>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-[10px] font-bold text-gray-500 mb-2 tracking-wider uppercase">Years of Experience <span className="text-red-500">*</span></label>
                  <div className="flex gap-2">
                    {["< 1", "1–2", "3–5", "5–10", "10+"].map(e => (
                      <button key={e} onClick={() => set("experience", e)} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all border ${form.experience === e ? "bg-green-50 text-green-600 border-green-200" : "bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300"}`}>{e}</button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)} fullWidth={false} className="px-8"><ChevronLeft size={16} className="mr-1" /> Back</Button>
                  <Button onClick={() => setStep(3)} disabled={!form.services.length || !form.experience}>Continue <ChevronRight size={16} className="ml-1" /></Button>
                </div>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <Card>
                <h2 className="text-xl font-bold text-gray-900 mb-1 font-serif">Identity & Verification</h2>
                <p className="text-gray-500 text-xs mb-6">Required for background verification</p>
                <Input label="Aadhaar Number" placeholder="XXXX XXXX XXXX" value={form.aadhaar} onChange={v => set("aadhaar", v)} required hint="12-digit Aadhaar number" />
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(2)} fullWidth={false} className="px-8"><ChevronLeft size={16} className="mr-1" /> Back</Button>
                  <Button onClick={() => setStep(4)} disabled={form.aadhaar.length < 12}>Continue <ChevronRight size={16} className="ml-1" /></Button>
                </div>
              </Card>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <Card>
                <h2 className="text-xl font-bold text-gray-900 mb-1 font-serif">Payment Details</h2>
                <p className="text-gray-500 text-xs mb-6">Where should we send your weekly earnings?</p>
                <Input label="Bank Account Number" placeholder="XXXXXXXXXX" value={form.bank} onChange={v => set("bank", v)} required />
                <Input label="IFSC Code" placeholder="SBIN0001234" value={form.ifsc} onChange={v => set("ifsc", v)} required />
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(3)} fullWidth={false} className="px-8"><ChevronLeft size={16} className="mr-1" /> Back</Button>
                  <Button onClick={() => setSubmitted(true)} disabled={!form.bank || !form.ifsc}>Submit Application 🎉</Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
