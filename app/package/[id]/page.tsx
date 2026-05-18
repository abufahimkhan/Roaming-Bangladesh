'use client';

import { useParams } from 'next/navigation';
import { motion } from 'motion/react';
import { tourPackages } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Calendar, Users, Plane, ChevronRight, Star, ShieldCheck, Zap, Coffee, Wifi, Luggage, ArrowLeft, Info, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import AuthModal from '@/components/AuthModal';
import { useAppTheme } from '@/hooks/use-app-theme';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function PackageDetailPage() {
  const params = useParams();
  const pkg = tourPackages.find(p => p.id === params.id) || tourPackages[0];
  const { theme } = useAppTheme('light');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'procedure'>('overview');

  return (
    <main className={cn(
      "min-h-screen font-sans transition-colors duration-500 pb-20",
      theme === 'dark' ? "bg-slate-950 text-slate-200" : "bg-white text-slate-900"
    )}>
      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 left-0 w-full z-50 px-6 lg:px-20 py-4 flex items-center justify-between border-b transition-all",
        theme === 'dark' ? "border-white/5 bg-slate-950/80 backdrop-blur-md" : "border-slate-100 bg-white/90 backdrop-blur-md shadow-sm"
      )}>
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white/90 ring-1 ring-blue-100/60">
            <Image
              src="/images/logo.png"
              alt="Roaming Bangladesh"
              fill
              sizes="40px"
              className="object-contain p-1"
            />
          </div>
          <span className="text-xl font-black">ROAMING</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-blue-600 flex items-center gap-2">
            <ArrowLeft className="w-3 h-3" /> Back
          </Link>
          <button onClick={() => setIsAuthOpen(true)} className="px-6 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Account</button>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="pt-24 h-[60vh] relative overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.package_name}
          fill
          className="object-cover"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute bottom-20 left-6 lg:left-20 max-w-4xl text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="bg-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{pkg.duration}</div>
            <div className="flex items-center gap-1 text-orange-400">
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
              <Star className="w-3 h-3 fill-current" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-4"
          >
            {pkg.package_name}
          </motion.h1>
          <div className="flex items-center gap-6 opacity-80 text-sm font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-500" /> {pkg.destination}</span>
            <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-orange-500" /> Instant Confirmation</span>
          </div>
        </div>
      </section>

      {/* Tabs / Navigation */}
      <section className="px-6 lg:px-20 -mt-10 relative z-20">
        <div className={cn(
          "max-w-7xl mx-auto rounded-[32px] shadow-2xl p-4 flex flex-col lg:flex-row gap-4",
          theme === 'dark' ? "bg-slate-900 border border-white/5" : "bg-white border border-slate-100"
        )}>
          <div className="flex flex-wrap gap-2 lg:flex-1">
            {[
              { id: 'overview', label: 'Overview', icon: <Info className="w-4 h-4" /> },
              { id: 'itinerary', label: 'Itinerary', icon: <Calendar className="w-4 h-4" /> },
              { id: 'procedure', label: 'Booking Procedure', icon: <HelpCircle className="w-4 h-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 transition-all",
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-600/30 font-black"
                    : (theme === 'dark' ? "text-slate-400 hover:bg-white/5" : "text-slate-500 hover:bg-slate-50")
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-8 px-6 lg:border-l border-inherit">
            <div>
              <span className="block text-[10px] text-slate-400 uppercase font-black tracking-widest">Package Starting From</span>
              <span className="text-3xl font-black text-blue-600">৳{pkg.price_bdt.toLocaleString()}</span>
            </div>
            <button className="bg-orange-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-600/30 hover:scale-105 transition-all">
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* Information Content */}
      <section className="pt-20 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">

            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                <div>
                  <h2 className="text-4xl font-black tracking-tighter mb-8 underline decoration-blue-600/20 underline-offset-8 decoration-4">What&apos;s Included.</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { icon: <Plane className="w-6 h-6" />, title: 'Round Trip Flight', desc: 'Premium economy class tickets from Dhaka.' },
                      { icon: <Coffee className="w-6 h-6" />, title: 'Daily Breakfast', desc: 'International buffet breakfast included.' },
                      { icon: <MapPin className="w-6 h-6" />, title: 'Guided Tours', desc: 'English speaking certified local guides.' },
                      { icon: <Wifi className="w-6 h-6" />, title: 'Free Connectivity', desc: 'Local SIM card with 10GB high-speed data.' },
                      { icon: <Luggage className="w-6 h-6" />, title: 'Private Transfers', desc: 'Private luxury cars for all airport transits.' },
                      { icon: <Star className="w-6 h-6" />, title: '5-Star Stay', desc: 'Central city location premium hotel rooms.' },
                    ].map((item, i) => (
                      <div key={i} className={cn(
                        "p-8 rounded-[32px] border transition-all hover:scale-[1.02]",
                        theme === 'dark' ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-100"
                      )}>
                        <div className="text-blue-600 mb-4">{item.icon}</div>
                        <h4 className="font-black text-lg tracking-tight mb-2">{item.title}</h4>
                        <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-4xl font-black tracking-tighter mb-8">Package Description.</h2>
                  <p className="text-slate-500 leading-relaxed text-lg font-medium">
                    Experience the ultimate getaway in {pkg.destination}. This {pkg.duration} package covers all major attractions including local city tours, traditional dinner experiences, and plenty of free time for shopping. We take care of all the logistics so you can focus on making memories.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'procedure' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                <h2 className="text-4xl font-black tracking-tighter mb-8 underline decoration-blue-600/20 underline-offset-8 decoration-4">Booking Procedure.</h2>
                <div className="relative space-y-8">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-600/10" />
                  {[
                    { step: '01', title: 'Identity Verification', desc: 'Upload your passport copy and provide basic contact details for visa clearance.' },
                    { step: '02', title: 'Payment Authorization', desc: 'Securely pay the booking amount through our encrypted payment gateway.' },
                    { step: '03', title: 'Document Collection', desc: 'Our team will collect your physical documents (if required) from your doorstep.' },
                    { step: '04', title: 'Visa Processing', desc: 'We handle the embassy procedures. This usually takes 5-7 business days.' },
                    { step: '05', title: 'Travel Clearance', desc: 'Receive your e-visa and tickets in your email. Pack your bags for the journey!' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-8 items-start relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 font-black text-xl shadow-lg shadow-blue-600/20">{item.step}</div>
                      <div className="pt-2">
                        <h4 className="text-2xl font-black tracking-tight mb-2">{item.title}</h4>
                        <p className="text-slate-500 font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'itinerary' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <h2 className="text-4xl font-black tracking-tighter mb-8">Day-to-Day Plan.</h2>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map(day => (
                    <div key={day} className={cn(
                      "p-8 rounded-3xl border",
                      theme === 'dark' ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-100"
                    )}>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Day {day}</span>
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">City Tour & Free Time</span>
                      </div>
                      <h4 className="text-xl font-black mb-4">Exploring {pkg.destination}&apos;s Highlights</h4>
                      <p className="text-slate-500 text-sm font-medium">After breakfast at the hotel, our guide will pick you up for a full-day guided tour of the city&apos;s most iconic landmarks.</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </div>

          <aside className="space-y-8">
            <div className={cn(
              "p-10 rounded-[40px] border sticky top-32",
              theme === 'dark' ? "bg-slate-900 border-white/5" : "bg-slate-50 border-slate-100"
            )}>
              <div className="flex items-center gap-3 mb-8">
                <ShieldCheck className="w-6 h-6 text-green-500" />
                <h4 className="text-xl font-black tracking-tight">Travel Protection</h4>
              </div>
              <ul className="space-y-6 text-sm font-bold text-slate-500 mb-10">
                <li className="flex gap-4"><Star className="w-4 h-4 text-blue-600 shrink-0" /> Full refund if visa is rejected*</li>
                <li className="flex gap-4"><Star className="w-4 h-4 text-blue-600 shrink-0" /> Covid-19 travel insurance cover</li>
                <li className="flex gap-4"><Star className="w-4 h-4 text-blue-600 shrink-0" /> 24/7 dedicated travel concierge</li>
              </ul>
              <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition-all">
                Contact Agent
              </button>
            </div>
          </aside>
        </div>
      </section>

      <AuthModal isOpen={isAuthOpen} theme={theme} onClose={() => setIsAuthOpen(false)} />
    </main>
  );
}
