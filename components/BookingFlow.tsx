'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X, CreditCard, ChevronRight, User, ShieldCheck, Zap } from 'lucide-react';
import { useState, useMemo } from 'react';

interface BookingFlowProps {
  flight: any;
  onClose: () => void;
  theme?: 'dark' | 'light';
}

export default function BookingFlow({ flight, onClose, theme = 'light' }: BookingFlowProps) {
  const [step, setStep] = useState(1);
  const bookingId = "RMG-88291";
  const [formData, setFormData] = useState({
    name: '',
    passport: '',
    seat: ''
  });

  const steps = [
    { id: 1, title: 'Identification' },
    { id: 2, title: 'Seat Selection' },
    { id: 3, title: 'Payment' },
    { id: 4, title: 'Confirmed' }
  ];

  const handleNext = () => {
    if (step < 4) setStep(s => s + 1);
    else onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={cn(
          "absolute inset-0 backdrop-blur-md",
          theme === 'dark' ? "bg-black/80" : "bg-slate-900/40"
        )}
        onClick={onClose}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        className={cn(
          "relative w-full max-w-xl border rounded-[40px] shadow-2xl overflow-hidden",
          theme === 'dark' ? "bg-slate-950 border-white/10" : "bg-white border-slate-200 text-slate-900"
        )}
      >
        {/* Header */}
        <div className={cn(
          "p-8 border-b flex items-center justify-between",
          theme === 'dark' ? "border-white/10 bg-white/[0.02]" : "border-slate-100 bg-slate-50/50"
        )}>
          <div>
            <h3 className={cn(
              "text-3xl font-black tracking-tight",
              theme === 'dark' ? "text-white" : "text-blue-950"
            )}>
              {step === 4 ? 'Booking Successful.' : 'Secure Reservation.'}
            </h3>
            <p className="text-[10px] text-blue-600 uppercase tracking-[0.3em] font-black mt-2">{flight?.airlineName} • {flight?.flightNumber}</p>
          </div>
          <button onClick={onClose} className={cn(
            "p-3 rounded-full transition-colors group",
            theme === 'dark' ? "hover:bg-white/10" : "hover:bg-slate-100"
          )}>
            <X className={cn(
              "w-6 h-6",
              theme === 'dark' ? "text-slate-500 group-hover:text-white" : "text-slate-400 group-hover:text-slate-900"
            )} />
          </button>
        </div>

        {/* Stepper */}
        <div className={cn(
          "flex px-10 py-6 justify-between border-b",
          theme === 'dark' ? "border-white/5 bg-white/[0.01]" : "border-slate-100 bg-white"
        )}>
          {steps.map((s) => (
            <div key={s.id} className="flex items-center gap-3">
              <div className={cn(
                "w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black transition-colors",
                step >= s.id 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" 
                  : (theme === 'dark' ? "bg-white/5 text-slate-600" : "bg-slate-100 text-slate-400")
              )}>
                {step > s.id ? '✓' : s.id}
              </div>
              <span className={cn(
                "text-[10px] uppercase tracking-widest font-black hidden sm:inline",
                step >= s.id 
                  ? (theme === 'dark' ? "text-white" : "text-blue-900") 
                  : (theme === 'dark' ? "text-slate-600" : "text-slate-400")
              )}>{s.title}</span>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="p-10 min-h-[400px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-blue-600 font-black">Full Legal Name</label>
                    <div className="relative">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        className={cn(
                          "w-full rounded-2xl px-12 py-5 outline-none transition-all font-bold border",
                          theme === 'dark' ? "bg-white/5 border-white/5 focus:border-blue-500/50 text-white" : "bg-slate-50 border-slate-100 focus:border-blue-600"
                        )}
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest text-blue-600 font-black">Passport / NID Number</label>
                    <div className="relative">
                      <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        className={cn(
                          "w-full rounded-2xl px-12 py-5 outline-none transition-all font-mono font-bold border",
                          theme === 'dark' ? "bg-white/5 border-white/5 focus:border-blue-500/50 text-white" : "bg-slate-50 border-slate-100 focus:border-blue-600"
                        )}
                        placeholder="A00000000"
                        value={formData.passport}
                        onChange={(e) => setFormData({...formData, passport: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <div className="mb-6">
                  <h4 className={cn(
                    "font-black text-sm mb-8 flex items-center gap-3",
                    theme === 'dark' ? "text-white" : "text-blue-950"
                  )}>
                    <div className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_12px_#3b82f6]" />
                    Select Preferred Seat
                  </h4>
                  <div className="grid grid-cols-4 gap-4">
                    {['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B', '6A', '6B'].map((seat) => (
                      <button
                        key={seat}
                        onClick={() => setFormData({...formData, seat})}
                        className={cn(
                          "py-5 rounded-2xl border text-sm font-black transition-all",
                          formData.seat === seat 
                            ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-600/30" 
                            : (theme === 'dark' ? "bg-white/5 border-white/5 text-slate-500 hover:border-white/20" : "bg-slate-50 border-slate-100 text-slate-400 hover:bg-slate-100")
                        )}
                      >
                        {seat}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-center py-6"
              >
                <motion.div 
                  className={cn(
                    "w-24 h-24 rounded-[32px] flex items-center justify-center mx-auto mb-8 border shadow-inner",
                    theme === 'dark' ? "bg-blue-600/10 border-blue-500/20" : "bg-blue-50 border-blue-100"
                  )}
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                >
                  <CreditCard className="w-10 h-10 text-blue-600" />
                </motion.div>
                <h4 className={cn(
                  "text-3xl font-black mb-3 tracking-tighter",
                  theme === 'dark' ? "text-white" : "text-blue-950"
                )}>Payment Summary</h4>
                <p className="text-slate-500 text-sm mb-10 font-medium">Safe & secure encrypted transaction.</p>
                
                <div className={cn(
                  "rounded-3xl p-8 text-left border backdrop-blur-sm",
                  theme === 'dark' ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
                )}>
                  <div className={cn(
                    "flex justify-between text-[11px] font-black uppercase tracking-widest mb-6 pb-6 border-b",
                    theme === 'dark' ? "text-slate-500 border-white/10" : "text-slate-400 border-slate-200"
                  )}>
                    <span>Booking Details</span>
                    <span className="text-blue-600">ID: {bookingId}</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm font-bold">
                      <span className="text-slate-500">Base Fare (BDT)</span>
                      <span className={theme === 'dark' ? "text-white" : "text-slate-900"}>৳{(flight?.price * 115).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold">
                      <span className="text-slate-500">Taxes & Fees</span>
                      <span className={theme === 'dark' ? "text-white" : "text-slate-900"}>৳1,500</span>
                    </div>
                    <div className={cn(
                      "flex justify-between pt-6 mt-6 border-t",
                      theme === 'dark' ? "border-white/5" : "border-slate-200"
                    )}>
                      <span className="text-base font-black uppercase tracking-tighter">Grand Total</span>
                      <span className="text-3xl font-black text-blue-600">৳{(flight?.price * 115 + 1500).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-28 h-28 bg-green-500/10 border border-green-500/20 rounded-[40px] flex items-center justify-center mx-auto mb-10 relative">
                   <motion.div 
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 12, stiffness: 100, delay: 0.2 }}
                   >
                    <Zap className="w-12 h-12 text-green-500 fill-current" />
                   </motion.div>
                   <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 bg-green-500/10 rounded-[40px] -z-10"
                   />
                </div>
                <h4 className={cn(
                  "text-4xl font-black mb-5 tracking-tighter",
                  theme === 'dark' ? "text-white" : "text-blue-950"
                )}>Ticket Confirmed!</h4>
                <p className="text-slate-500 text-sm max-w-[320px] mx-auto font-medium leading-relaxed">
                  Your seat <span className="text-blue-600 font-black">{formData.seat || 'Any'}</span> for <span className="font-black underline underline-offset-4 decoration-blue-500">Flight {flight.flightNumber}</span> has been confirmed.
                </p>
                <div className={cn(
                  "mt-12 p-6 border rounded-3xl text-[10px] font-black uppercase tracking-[0.3em]",
                  theme === 'dark' ? "border-white/5 bg-white/[0.02] text-slate-500" : "border-slate-100 bg-slate-50 text-slate-400"
                )}>
                  Ref clearance: RMG-SEC-CONF-77
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className={cn(
          "p-8 flex gap-4 border-t",
          theme === 'dark' ? "bg-white/[0.02] border-white/10" : "bg-slate-50/50 border-slate-100"
        )}>
          {step > 1 && step < 4 && (
            <button 
              onClick={() => setStep(s => s - 1)}
              className={cn(
                "px-10 py-5 rounded-2xl border transition-all font-black uppercase text-xs tracking-widest",
                theme === 'dark' ? "border-white/10 text-white hover:bg-white/5" : "border-slate-200 text-slate-600 hover:bg-slate-100"
              )}
            >
              Back
            </button>
          )}
          <button 
            onClick={handleNext}
            className="flex-1 bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-xs tracking-widest uppercase hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-3 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10">{step === 3 ? 'Confirm Order' : step === 4 ? 'Close Window' : 'Continue'}</span>
            {step < 4 && <ChevronRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
