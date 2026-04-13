export const SERVICES = [
  { id: 1, icon: "✦", emoji: "🧹", name: "Deep Cleaning", cat: "Cleaning", sub: "Full home • All rooms", price: 499, time: "3–4 hrs", rating: 4.9, reviews: 2341, popular: true },
  { id: 2, icon: "◈", emoji: "👕", name: "Laundry & Wash", cat: "Laundry", sub: "Wash, dry & fold", price: 299, time: "Same day", rating: 4.8, reviews: 1892, popular: true },
  { id: 3, icon: "◇", emoji: "🪟", name: "Window Cleaning", cat: "Cleaning", sub: "Streak-free shine", price: 349, time: "2 hrs", rating: 4.7, reviews: 987, popular: false },
  { id: 4, icon: "✦", emoji: "🛁", name: "Bathroom Sanitize", cat: "Cleaning", sub: "Deep scrub & disinfect", price: 399, time: "1–2 hrs", rating: 4.9, reviews: 3102, popular: true },
  { id: 5, icon: "◈", emoji: "🍳", name: "Kitchen Cleaning", cat: "Cleaning", sub: "Grease-free & spotless", price: 449, time: "2–3 hrs", rating: 4.8, reviews: 2210, popular: false },
  { id: 6, icon: "◇", emoji: "🛋️", name: "Sofa & Carpet", cat: "Cleaning", sub: "Steam & foam clean", price: 599, time: "3 hrs", rating: 4.7, reviews: 1450, popular: false },
  { id: 7, icon: "✦", emoji: "🔧", name: "Plumbing Fix", cat: "Repair", sub: "Leaks, pipes & taps", price: 199, time: "1 hr", rating: 4.8, reviews: 4321, popular: true },
  { id: 8, icon: "◈", emoji: "⚡", name: "Electrical Work", cat: "Repair", sub: "Wiring, fuse & fans", price: 249, time: "1 hr", rating: 4.9, reviews: 3876, popular: false },
  { id: 9, icon: "◇", emoji: "🐜", name: "Pest Control", cat: "Pest", sub: "Cockroach, ants, rats", price: 699, time: "2 hrs", rating: 4.6, reviews: 2987, popular: false },
  { id: 10, icon: "✦", emoji: "❄️", name: "AC Service", cat: "Repair", sub: "Clean, gas & repair", price: 549, time: "2 hrs", rating: 4.8, reviews: 5230, popular: true },
  { id: 11, icon: "◈", emoji: "🧺", name: "Ironing", cat: "Laundry", sub: "Crisp & fast delivery", price: 149, time: "4 hrs", rating: 4.7, reviews: 1230, popular: false },
  { id: 12, icon: "◇", emoji: "🌿", name: "Garden Care", cat: "Garden", sub: "Trim, water & cleanup", price: 399, time: "2 hrs", rating: 4.8, reviews: 876, popular: false },
  { id: 13, icon: "✦", emoji: "🍽️", name: "Dishwashing", cat: "Cleaning", sub: "Spotless utensils & sink", price: 149, time: "1 hr", rating: 4.8, reviews: 1102, popular: true },
  { id: 14, icon: "◈", emoji: "🍱", name: "Meal Prep", cat: "Kitchen", sub: "Chopping & cooking assist", price: 299, time: "2 hrs", rating: 4.8, reviews: 876, popular: true },
  { id: 15, icon: "◇", emoji: "👵", name: "Elder Care", cat: "Care", sub: "Companion & assistance", price: 599, time: "4 hrs", rating: 4.9, reviews: 432, popular: false },
  { id: 16, icon: "✦", emoji: "👶", name: "Baby Sitting", cat: "Care", sub: "Trusted child care", price: 499, time: "4 hrs", rating: 4.9, reviews: 321, popular: false },
];

export const CATS = ["All", "Cleaning", "Laundry", "Repair", "Kitchen", "Care", "Pest", "Garden"];

export const PROVIDERS = [
  { id: 1, name: "Priya M.", title: "Home Care Expert", rating: 4.9, jobs: 320, avatar: "👩", badge: "Elite", status: "online", eta: 8, verified: true, chat: [{ from: "pro", text: "Hello! I'm nearby and ready. How can I help? 🙏" }] },
  { id: 2, name: "Sunita D.", title: "Deep Clean Specialist", rating: 5.0, jobs: 412, avatar: "👩‍🦱", badge: "Top Pro", status: "online", eta: 12, verified: true, chat: [{ from: "pro", text: "Hi! Specialist in deep cleaning ✨" }] },
  { id: 3, name: "Meena K.", title: "Laundry Expert", rating: 4.8, jobs: 214, avatar: "👩‍🦰", badge: "Pro", status: "online", eta: 6, verified: true, chat: [{ from: "pro", text: "Hello! Ready to serve 😊" }] },
  { id: 4, name: "Rajan K.", title: "Repair Specialist", rating: 4.8, jobs: 203, avatar: "👨", badge: "Pro", status: "busy", eta: 25, verified: true, chat: [{ from: "pro", text: "Hi there! I'll be free soon." }] },
];

export const ORDERS_INIT = [
  { id: "HH1023", service: "Deep Cleaning", emoji: "🧹", status: "En Route", progress: 55, eta: "8 min", date: "Today, 2:00 PM", pro: "Priya M.", price: 528, steps: ["Booked", "Assigned", "En Route", "In Service", "Done"] },
  { id: "HH1019", service: "AC Service", emoji: "❄️", status: "Completed", progress: 100, eta: null, date: "Apr 8, 10:00 AM", pro: "Rajan K.", price: 578, steps: ["Booked", "Assigned", "En Route", "In Service", "Done"] },
  { id: "HH1015", service: "Laundry & Washing", emoji: "👕", status: "Scheduled", progress: 10, eta: null, date: "Apr 12, 9:00 AM", pro: "Sunita D.", price: 328, steps: ["Booked", "Assigned", "En Route", "In Service", "Done"] },
];

export const NOTIFS_INIT = [
  { id: 1, icon: "⚡", title: "Pro arriving in 8 mins", body: "Priya M. is on the way to you", time: "Now", read: false },
  { id: 2, icon: "✓", title: "Booking Confirmed", body: "Deep Cleaning — Today 2:00 PM", time: "5 min ago", read: false },
  { id: 3, icon: "✦", title: "30% Off — First Booking", body: "Code HOMEHELP30 applied", time: "1 hr ago", read: true },
  { id: 4, icon: "★", title: "Rate Your Last Service", body: "How was your AC Service?", time: "2 days ago", read: true },
];
