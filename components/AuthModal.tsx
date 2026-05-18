
'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Github, Chrome } from 'lucide-react';
import { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  theme?: 'dark' | 'light';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login', theme = 'light' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              "absolute inset-0 backdrop-blur-xl",
              theme === 'dark' ? "bg-black/90" : "bg-slate-900/40"
            )}
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className={cn(
              "relative w-full max-w-md border rounded-[40px] shadow-2xl p-10 overflow-hidden",
              theme === 'dark' ? "bg-slate-950 border-white/10" : "bg-white border-slate-200"
            )}
          >
            {/* Background Accent */}
            <div className={cn(
              "absolute -top-24 -right-24 w-64 h-64 blur-[100px] rounded-full",
              theme === 'dark' ? "bg-blue-600/10" : "bg-blue-400/20"
            )} />
            
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className={cn(
                    "text-3xl font-black tracking-tighter",
                    theme === 'dark' ? "text-white" : "text-blue-950"
                  )}>
                    {mode === 'login' ? 'Welcome Back.' : 'Create Account.'}
                  </h3>
                  <p className="text-slate-500 text-sm font-medium mt-2">Access your travel dashboard</p>
                </div>
                <button onClick={onClose} className={cn(
                  "p-3 rounded-full transition-colors group",
                  theme === 'dark' ? "hover:bg-white/5" : "hover:bg-slate-100"
                )}>
                  <X className={cn(
                    "w-6 h-6",
                    theme === 'dark' ? "text-slate-500 group-hover:text-white" : "text-slate-400 group-hover:text-slate-900"
                  )} />
                </button>
              </div>

              <div className="space-y-6">
                {mode === 'signup' && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-blue-600">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input className={cn(
                        "w-full rounded-2xl px-12 py-5 outline-none transition-all font-bold border",
                        theme === 'dark' ? "bg-white/5 border-white/5 focus:border-blue-500/50 text-white" : "bg-slate-50 border-slate-100 focus:border-blue-600 text-blue-950"
                      )} placeholder="John Doe" />
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-blue-600">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input className={cn(
                      "w-full rounded-2xl px-12 py-5 outline-none transition-all font-bold border",
                      theme === 'dark' ? "bg-white/5 border-white/5 focus:border-blue-500/50 text-white" : "bg-slate-50 border-slate-100 focus:border-blue-600 text-blue-950"
                    )} placeholder="hello@roamingbd.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black uppercase tracking-widest text-blue-600">Password</label>
                    {mode === 'login' && <button className="text-[10px] font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest">Forgot?</button>}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="password" className={cn(
                      "w-full rounded-2xl px-12 py-5 outline-none transition-all font-bold border",
                      theme === 'dark' ? "bg-white/5 border-white/5 focus:border-blue-500/50 text-white" : "bg-slate-50 border-slate-100 focus:border-blue-600 text-blue-950"
                    )} placeholder="••••••••" />
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black tracking-widest uppercase text-xs hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 mt-4 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  {mode === 'login' ? 'Continue Access' : 'Create Identity'}
                </button>

                <div className="relative my-8 text-center uppercase text-[10px] font-black tracking-[.3em] text-slate-400">
                  <div className="absolute inset-0 flex items-center"><div className={cn("w-full border-t", theme === 'dark' ? "border-white/5" : "border-slate-100")}></div></div>
                  <span className={cn("relative px-6", theme === 'dark' ? "bg-slate-950" : "bg-white")}>Or Join via</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className={cn(
                    "flex items-center justify-center gap-3 py-4 rounded-2xl border transition-all group",
                    theme === 'dark' ? "bg-white/5 border-white/5 hover:bg-white/10" : "bg-slate-50 border-slate-100 hover:bg-slate-100 shadow-sm"
                  )}>
                    <Github className="w-4 h-4 text-slate-400 group-hover:scale-110 transition-transform" />
                    <span className={cn("text-[10px] font-black uppercase tracking-widest", theme === 'dark' ? "text-white" : "text-slate-700")}>Github</span>
                  </button>
                  <button className={cn(
                    "flex items-center justify-center gap-3 py-4 rounded-2xl border transition-all group",
                    theme === 'dark' ? "bg-white/5 border-white/5 hover:bg-white/10" : "bg-slate-50 border-slate-100 hover:bg-slate-100 shadow-sm"
                  )}>
                    <Chrome className="w-4 h-4 text-slate-400 group-hover:scale-110 transition-transform" />
                    <span className={cn("text-[10px] font-black uppercase tracking-widest", theme === 'dark' ? "text-white" : "text-slate-700")}>Google</span>
                  </button>
                </div>
              </div>

              <p className="text-center text-xs font-bold text-slate-500 mt-10">
                {mode === 'login' ? "Don't have an account?" : "Already a member?"}{' '}
                <button 
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="text-blue-600 font-black hover:underline"
                >
                  {mode === 'login' ? 'Join Now' : 'Sign In Now'}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
