'use client';

import { motion } from 'motion/react';
import { ShieldCheck, Plane, ArrowRight, Zap, Star, Shield, Clock, FileText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import AuthModal from '@/components/AuthModal';
import { useAppTheme } from '@/hooks/use-app-theme';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function VisaPage() {
  const { theme } = useAppTheme('light');
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <main className={cn(
      "min-h-screen font-sans transition-colors duration-500",
      theme === 'dark' ? "bg-slate-950 text-slate-200" : "bg-white text-slate-900"
    )}>
      {/* Background Graphics */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          animate={{ x: ['-15%', '115%'], y: ['12%', '18%', '12%'], rotate: [0, 12, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 left-0 opacity-25"
        >
          <Plane className="w-14 h-14 text-cyan-500 rotate-45" />
        </motion.div>
        <motion.div
          animate={{ x: ['115%', '-15%'], y: ['66%', '58%', '66%'], rotate: [0, -12, 0] }}
          transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 right-0 opacity-25"
        >
          <Plane className="w-12 h-12 text-orange-500 -rotate-135" />
        </motion.div>
        <div className={cn(
          "absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[140px]",
          theme === 'dark' ? "bg-blue-600/10" : "bg-blue-400/20"
        )} />
        <div className={cn(
          "absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px]",
          theme === 'dark' ? "bg-indigo-600/10" : "bg-indigo-400/20"
        )} />
      </div>

      <nav className={cn(
        "fixed top-0 left-0 w-full z-50 px-4 sm:px-6 lg:px-20 py-3 sm:py-4 flex items-center justify-between border-b transition-all",
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
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/" className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-blue-600 hover:underline">Back to Home</Link>
          <button
            onClick={() => setIsAuthOpen(true)}
            className="px-3 sm:px-6 py-2 bg-blue-600 text-white rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest"
          >
            Sign In
          </button>
        </div>
      </nav>

      <section className="pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-8 shadow-xl shadow-blue-600/30"
              >
                <ShieldCheck className="w-3 h-3" />
                Trusted Visa Consultant
              </motion.div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] mb-6 sm:mb-8">
                Your International <br />
                <span className="text-blue-600">Gateway.</span>
              </h1>
              <p className="text-slate-500 text-base sm:text-lg font-medium max-w-lg mb-8 sm:mb-12">
                Roaring Bangladesh provides seamless visa processing services for over 50+ countries. Fast, secure, and reliable.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: <Clock className="w-5 h-5" />, label: 'Fast Processing', desc: 'Average 5-7 days' },
                  { icon: <FileText className="w-5 h-5" />, label: 'Easy Documentation', desc: 'Digital upload' },
                  { icon: <Shield className="w-5 h-5" />, label: '99% Success Rate', desc: 'Expert guidance' },
                  { icon: <Star className="w-5 h-5" />, label: 'Premium Support', desc: '24/7 Assistance' },
                ].map((item) => (
                  <div key={item.label} className={cn(
                    "p-4 sm:p-6 rounded-3xl border",
                    theme === 'dark' ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-100 shadow-sm"
                  )}>
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 mb-4">
                      {item.icon}
                    </div>
                    <h4 className="font-black text-sm uppercase tracking-tight mb-1">{item.label}</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-2 lg:mt-0">
              <div className="aspect-square relative rounded-[60px] overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=2070&auto=format&fit=crop"
                  alt="Passport"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/60 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 text-white">
                  <div className="text-4xl font-black">50+</div>
                  <div className="text-xs font-black uppercase tracking-[0.2em]">Countries Supported</div>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute -top-6 -right-2 bg-white p-5 sm:p-6 rounded-[28px] shadow-2xl border border-slate-100 hidden lg:block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                    <Zap className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-slate-900 leading-none">Instant</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Clearance</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className={cn("py-14 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-20", theme === 'dark' ? "bg-slate-900/50" : "bg-blue-50/50")}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tighter mb-4">Start Your Application</h2>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em]">Fill the details to get started</p>
          </div>

          <form className={cn(
            "p-5 sm:p-8 lg:p-10 rounded-[28px] sm:rounded-[40px] border shadow-2xl grid md:grid-cols-2 gap-5 sm:gap-8",
            theme === 'dark' ? "bg-slate-950 border-white/10" : "bg-white border-slate-200"
          )}>
            <div className="space-y-4">
              <label htmlFor="visa-origin" className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Where are you from?</label>
              <input className={cn(
                "w-full rounded-2xl px-6 py-4 outline-none border font-bold text-lg",
                theme === 'dark' ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-100"
              )} id="visa-origin" defaultValue="Bangladesh" />
            </div>
            <div className="space-y-4">
              <label htmlFor="visa-destination" className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Where are you going?</label>
              <input className={cn(
                "w-full rounded-2xl px-6 py-4 outline-none border font-bold text-lg",
                theme === 'dark' ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-100"
              )} id="visa-destination" placeholder="Select Destination" />
            </div>
            <div className="space-y-4 md:col-span-2">
              <label htmlFor="visa-type" className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Visa Type</label>
              <select className={cn(
                "w-full rounded-2xl px-6 py-4 outline-none border font-bold text-lg appearance-none",
                theme === 'dark' ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-100"
              )} id="visa-type">
                <option>Tourist Visa</option>
                <option>Business Visa</option>
                <option>Student Visa</option>
              </select>
            </div>
            <button className="md:col-span-2 bg-blue-600 text-white py-4 sm:py-6 rounded-2xl font-black text-base sm:text-xl uppercase tracking-widest shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 sm:gap-4">
              Calculate Package
              <ArrowRight className="w-6 h-6" />
            </button>
          </form>
        </div>
      </section>

      <footer className="py-12 px-6 lg:px-20 border-t border-slate-100 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
        © 2026 ROAMING BANGLADESH. ALL RIGHTS RESERVED.
      </footer>

      <AuthModal
        isOpen={isAuthOpen}
        theme={theme}
        onClose={() => setIsAuthOpen(false)}
      />
    </main>
  );
}
