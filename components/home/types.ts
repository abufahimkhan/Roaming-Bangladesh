export type AirportOption = {
  city: string;
  code: string;
  airport: string;
  airlines: string[];
};

export type AirlineShowcase = {
  name: string;
  region: string;
  accent: string;
  bg: string;
  logo: string;
};

export type VisaShowcase = {
  country: string;
  visaType: string;
  processing: string;
  flag: string;
  gradient: string;
  image: string;
  fee?: string;
  highlight?: string;
};

export const FROM_AIRPORTS: AirportOption[] = [
  {
    city: "Dhaka",
    code: "DAC",
    airport: "Hazrat Shahjalal Intl",
    airlines: [
      "Biman Bangladesh Airlines",
      "Emirates",
      "Qatar Airways",
      "Singapore Airlines",
    ],
  },
  {
    city: "Chattogram",
    code: "CGP",
    airport: "Shah Amanat Intl",
    airlines: [
      "Biman Bangladesh Airlines",
      "US-Bangla Airlines",
      "Qatar Airways",
    ],
  },
  {
    city: "Sylhet",
    code: "ZYL",
    airport: "Osmani Intl Airport",
    airlines: ["Biman Bangladesh Airlines", "Emirates", "FlyDubai"],
  },
];

export const TO_AIRPORTS: AirportOption[] = [
  {
    city: "Dubai",
    code: "DXB",
    airport: "Dubai Intl Airport",
    airlines: ["Emirates", "FlyDubai", "Qatar Airways", "Etihad"],
  },
  {
    city: "Doha",
    code: "DOH",
    airport: "Hamad Intl Airport",
    airlines: ["Qatar Airways", "Biman Bangladesh Airlines", "Emirates"],
  },
  {
    city: "Singapore",
    code: "SIN",
    airport: "Changi Airport",
    airlines: ["Singapore Airlines", "Biman Bangladesh Airlines", "Emirates"],
  },
  {
    city: "London",
    code: "LHR",
    airport: "Heathrow Airport",
    airlines: ["British Airways", "Emirates", "Qatar Airways"],
  },
  {
    city: "Bangkok",
    code: "BKK",
    airport: "Suvarnabhumi Airport",
    airlines: ["Thai Airways", "Biman Bangladesh Airlines", "Bangkok Air"],
  },
  {
    city: "Kuala Lumpur",
    code: "KUL",
    airport: "Kuala Lumpur Intl",
    airlines: ["Malaysia Airlines", "AirAsia", "Biman Bangladesh Airlines"],
  },
];

export const TOP_AIRLINES: AirlineShowcase[] = [
  {
    name: "Biman Bangladesh",
    region: "Bangladesh",
    accent: "from-sky-500 to-blue-700",
    bg: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop",
    logo: "https://picsum.photos/seed/biman/200/200",
  },
  {
    name: "Emirates",
    region: "UAE · Dubai",
    accent: "from-orange-500 to-red-600",
    bg: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop",
    logo: "https://picsum.photos/seed/emirates/200/200",
  },
  {
    name: "Qatar Airways",
    region: "Qatar · Doha",
    accent: "from-fuchsia-500 to-purple-700",
    bg: "https://images.unsplash.com/photo-1540339832862-474599807836?q=80&w=800&auto=format&fit=crop",
    logo: "https://picsum.photos/seed/qatar/200/200",
  },
  {
    name: "Singapore Airlines",
    region: "Singapore",
    accent: "from-amber-400 to-orange-600",
    bg: "https://images.unsplash.com/photo-1565967511849-76a60a516170?q=80&w=800&auto=format&fit=crop",
    logo: "https://picsum.photos/seed/singapore/200/200",
  },
  {
    name: "Turkish Airlines",
    region: "Turkey · Istanbul",
    accent: "from-rose-500 to-red-700",
    bg: "/images/hero.png",
    logo: "/images/logo.png",
  },
  {
    name: "Etihad Airways",
    region: "Abu Dhabi · UAE",
    accent: "from-emerald-400 to-teal-700",
    bg: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop",
    logo: "https://picsum.photos/seed/etihad/200/200",
  },
  {
    name: "British Airways",
    region: "United Kingdom",
    accent: "from-blue-600 to-indigo-800",
    bg: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?q=80&w=800&auto=format&fit=crop",
    logo: "https://picsum.photos/seed/british/200/200",
  },
  {
    name: "Malaysia Airlines",
    region: "Malaysia · KL",
    accent: "from-red-500 to-blue-600",
    bg: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",
    logo: "https://picsum.photos/seed/malaysia/200/200",
  },
  {
    name: "Thai Airways",
    region: "Thailand · Bangkok",
    accent: "from-violet-500 to-purple-700",
    bg: "https://images.unsplash.com/photo-1534008757030-27299c4371b6?q=80&w=800&auto=format&fit=crop",
    logo: "https://picsum.photos/seed/thai/200/200",
  },
];

export const FEATURED_VISAS: VisaShowcase[] = [
  {
    country: "United States",
    visaType: "Tourist / Business",
    processing: "7-10 business days",
    flag: "🇺🇸",
    gradient: "from-blue-500 to-indigo-600",
    image: "https://picsum.photos/seed/visa-usa/900/600",
    fee: "From ৳13,500",
    highlight: "Interview support included",
  },
  {
    country: "Canada",
    visaType: "Visitor Visa",
    processing: "8-12 business days",
    flag: "🇨🇦",
    gradient: "from-red-500 to-rose-600",
    image: "https://picsum.photos/seed/visa-canada/900/600",
    fee: "From ৳12,000",
    highlight: "Biometric assistance",
  },
  {
    country: "Australia",
    visaType: "Tourist (ETA)",
    processing: "10-14 business days",
    flag: "🇦🇺",
    gradient: "from-yellow-500 to-orange-600",
    image: "https://picsum.photos/seed/visa-australia/900/600",
    fee: "From ৳14,500",
    highlight: "Document checklist included",
  },
  {
    country: "Thailand",
    visaType: "Tourist Express",
    processing: "3-5 business days",
    flag: "🇹🇭",
    gradient: "from-violet-500 to-purple-700",
    image: "https://picsum.photos/seed/visa-thailand/900/600",
    fee: "From ৳5,500",
    highlight: "Express lane available",
  },
  {
    country: "Malaysia",
    visaType: "eVisa",
    processing: "2-3 business days",
    flag: "🇲🇾",
    gradient: "from-emerald-500 to-teal-600",
    image: "https://picsum.photos/seed/visa-malaysia/900/600",
    fee: "From ৳4,800",
    highlight: "100% online process",
  },
  {
    country: "Dubai / UAE",
    visaType: "Tourist 30 / 90 Day",
    processing: "24-48 hours",
    flag: "🇦🇪",
    gradient: "from-amber-500 to-yellow-600",
    image: "https://picsum.photos/seed/visa-uae/900/600",
    fee: "From ৳7,500",
    highlight: "Urgent processing available",
  },
  {
    country: "Schengen Zone",
    visaType: "Short Stay Visa",
    processing: "15-20 business days",
    flag: "🇪🇺",
    gradient: "from-sky-500 to-cyan-600",
    image: "https://picsum.photos/seed/visa-schengen/900/600",
    fee: "From ৳16,000",
    highlight: "Cover letter drafting help",
  },
  {
    country: "United Kingdom",
    visaType: "Standard Visitor",
    processing: "12-18 business days",
    flag: "🇬🇧",
    gradient: "from-fuchsia-500 to-pink-600",
    image: "https://picsum.photos/seed/visa-uk/900/600",
    fee: "From ৳15,500",
    highlight: "Priority slot booking",
  },
];

export const TRUST_STATS = [
  { value: "12+", label: "Years of Experience", sub: "Est. 2010" },
  { value: "85K+", label: "Happy Travelers", sub: "And counting" },
  { value: "150+", label: "Destinations Served", sub: "Worldwide" },
  { value: "98%", label: "Satisfaction Rate", sub: "Client reviews" },
];

export const WHY_CHOOSE = [
  {
    icon: "✈️",
    title: "Best Fare Guarantee",
    desc: "We match or beat any competitor price. Transparent pricing with zero hidden fees.",
    gradient: "from-blue-500/20 to-cyan-500/10 border-blue-200",
  },
  {
    icon: "🛡️",
    title: "IATA Certified Agency",
    desc: "Officially certified and authorized by IATA. Your bookings are safe and protected.",
    gradient: "from-emerald-500/20 to-teal-500/10 border-emerald-200",
  },
  {
    icon: "⚡",
    title: "Instant Confirmation",
    desc: "Real-time booking with immediate ticket issuance. No wait, no hassle.",
    gradient: "from-orange-500/20 to-amber-500/10 border-orange-200",
  },
  {
    icon: "🌏",
    title: "24/7 Global Support",
    desc: "Our travel experts are available round the clock wherever you are in the world.",
    gradient: "from-violet-500/20 to-purple-500/10 border-violet-200",
  },
];

export function formatAirport(option: AirportOption) {
  return `${option.city} (${option.code}) - ${option.airport}`;
}
