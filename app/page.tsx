'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { useRef, useState } from 'react';
import { BadgeCheck, ChevronRight, Clock, Globe2, MapPin, Plane, ShieldCheck, Sparkles, Star, Timer, Zap } from 'lucide-react';
import BookingFlow from '@/components/BookingFlow';
import AuthModal from '@/components/AuthModal';
import Navbar from '@/components/home/Navbar';
import SiteBackground from '@/components/home/SiteBackground';
import { HomeFooter } from '@/components/home/HomeFooter';
import { HomeSearchEngine } from '@/components/home/HomeSearchEngine';
import { tourPackages, dummyFlights } from '@/lib/data';
import { useAppTheme } from '@/hooks/use-app-theme';
import {
    FEATURED_VISAS,
    FROM_AIRPORTS,
    TO_AIRPORTS,
    TOP_AIRLINES,
    formatAirport,
    type AirportOption,
} from '@/components/home/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type SearchTab = 'home' | 'hotel' | 'flights' | 'visa' | 'tour';
type SearchType = 'one-way' | 'round-trip' | 'multi-city';

type MultiCityLeg = {
    from: string;
    to: string;
    date: string;
};

export default function Home() {
    const [isSearching, setIsSearching] = useState(false);
    const [flights, setFlights] = useState(dummyFlights);
    const [selectedFlight, setSelectedFlight] = useState<(typeof dummyFlights)[number] | null>(null);
    const [searchTab, setSearchTab] = useState<SearchTab>('flights');
    const [searchType, setSearchType] = useState<SearchType>('one-way');
    const [fromAirport, setFromAirport] = useState<AirportOption>(FROM_AIRPORTS[0]);
    const [toAirport, setToAirport] = useState<AirportOption>(TO_AIRPORTS[0]);
    const [fromInput, setFromInput] = useState(formatAirport(FROM_AIRPORTS[0]));
    const [toInput, setToInput] = useState(formatAirport(TO_AIRPORTS[0]));
    const [openAirportDropdown, setOpenAirportDropdown] = useState<'from' | 'to' | null>(null);
    const [departDate, setDepartDate] = useState('2026-05-18');
    const [returnDate, setReturnDate] = useState('2026-05-25');
    const [multiCityLegs, setMultiCityLegs] = useState<MultiCityLeg[]>([
        { from: 'Dhaka (DAC)', to: 'Dubai (DXB)', date: '2026-05-18' },
        { from: 'Dubai (DXB)', to: 'London (LHR)', date: '2026-05-20' },
    ]);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useAppTheme('light');
    const containerRef = useRef<HTMLDivElement>(null);

    async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSearching(true);

        globalThis.setTimeout(() => {
            setFlights(dummyFlights);
            setIsSearching(false);
            document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 1200);
    }

    function swapAirports() {
        const currentFrom = fromAirport;
        const currentTo = toAirport;

        setFromAirport(currentTo);
        setToAirport(currentFrom);
        setFromInput(formatAirport(currentTo));
        setToInput(formatAirport(currentFrom));
        setOpenAirportDropdown(null);
    }

    function updateMultiCityLeg(index: number, field: keyof MultiCityLeg, value: string) {
        setMultiCityLegs((previousLegs) => previousLegs.map((leg, legIndex) => (legIndex === index ? { ...leg, [field]: value } : leg)));
    }

    return (
        <main
            ref={containerRef}
            className={cn(
                'relative min-h-screen overflow-x-hidden transition-colors duration-500 font-sans',
                theme === 'dark' ? 'bg-slate-950 text-slate-200' : 'bg-white text-slate-900',
            )}
        >
            <SiteBackground theme={theme} />
            <Navbar
                theme={theme}
                isMobileMenuOpen={isMobileMenuOpen}
                toggleTheme={toggleTheme}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                setIsAuthOpen={setIsAuthOpen}
            />

            <section className="relative min-h-screen flex flex-col justify-center px-6 lg:px-20 pt-28 pb-16 z-10">
                <div className="absolute inset-0 -z-10">
                    <Image
                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop"
                        alt="World Travel"
                        fill
                        priority
                        className="object-cover"
                    />
                    <div className={theme === 'dark' ? 'absolute inset-0 bg-slate-950/70' : 'absolute inset-0 bg-gradient-to-b from-white/10 via-white/10 to-white'} />
                </div>

                <div className="max-w-4xl relative z-20 mb-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full mb-8 shadow-xl shadow-blue-600/30"
                    >
                        <Star className="w-3 h-3 fill-current" />
                        Leading Travel Agency in Bangladesh
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={cn(
                            'text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 drop-shadow-sm',
                            theme === 'dark' ? 'text-white' : 'text-blue-950',
                        )}
                    >
                        Let&apos;s Explore <br />
                        <span className="text-blue-600 underline decoration-4 underline-offset-8">The World</span> Together.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={cn(
                            'text-lg lg:text-xl max-w-xl font-medium leading-relaxed',
                            theme === 'dark' ? 'text-slate-400' : 'text-slate-700',
                        )}
                    >
                        Trusted travel partner offering the best deals on flights, hotels, and holiday packages globally.
                    </motion.p>
                </div>

                <HomeSearchEngine
                    theme={theme}
                    searchTab={searchTab}
                    setSearchTab={setSearchTab}
                    searchType={searchType}
                    setSearchType={setSearchType}
                    fromAirport={fromAirport}
                    toAirport={toAirport}
                    fromInput={fromInput}
                    toInput={toInput}
                    openAirportDropdown={openAirportDropdown}
                    departDate={departDate}
                    returnDate={returnDate}
                    multiCityLegs={multiCityLegs}
                    isSearching={isSearching}
                    swapAirports={swapAirports}
                    setFromAirport={setFromAirport}
                    setToAirport={setToAirport}
                    setFromInput={setFromInput}
                    setToInput={setToInput}
                    setOpenAirportDropdown={setOpenAirportDropdown}
                    setDepartDate={setDepartDate}
                    setReturnDate={setReturnDate}
                    updateMultiCityLeg={updateMultiCityLeg}
                    handleSearch={handleSearch}
                />
            </section>

            <section className={cn('py-12 px-6 lg:px-20 relative z-20', theme === 'dark' ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' : 'bg-gradient-to-br from-white via-blue-50/40 to-white')}>
                <div className="max-w-7xl mx-auto mb-8">
                    <h2 className={cn('text-4xl md:text-5xl font-black tracking-tighter mb-4', theme === 'dark' ? 'text-white' : 'text-slate-900')}>Why Choose Us</h2>
                    <p className={cn('text-lg font-medium', theme === 'dark' ? 'text-slate-300' : 'text-slate-500')}>Discover the benefits of booking with Roaming Bangladesh</p>
                </div>
                <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={cn(
                            'lg:col-span-2 rounded-3xl p-8 border backdrop-blur-xl',
                            theme === 'dark' ? 'bg-slate-900/70 border-white/10' : 'bg-white/80 border-sky-100',
                        )}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500 text-white text-[10px] font-black tracking-widest uppercase mb-4">
                            <Sparkles className="w-3 h-3" /> Flight Intelligence
                        </div>
                        <h3 className={cn('text-3xl md:text-4xl font-black tracking-tight mb-4', theme === 'dark' ? 'text-white' : 'text-slate-900')}>Travel Smart With Real-Time Route Insights</h3>
                        <p className={cn('leading-relaxed font-medium', theme === 'dark' ? 'text-slate-300' : 'text-slate-500')}>
                            Compare schedules, discover flexible dates, and find carrier recommendations by destination.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        className={cn(
                            'rounded-3xl p-8 border relative overflow-hidden',
                            theme === 'dark' ? 'bg-slate-900/70 border-white/10' : 'bg-white/80 border-sky-100',
                        )}
                    >
                        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-cyan-300/40 to-fuchsia-300/20 blur-2xl" />
                        <h4 className={cn('text-xl font-black mb-2', theme === 'dark' ? 'text-white' : 'text-slate-900')}>Top Route This Week</h4>
                        <p className={cn('text-sm font-medium mb-6', theme === 'dark' ? 'text-slate-300' : 'text-slate-500')}>Dhaka (DAC) to Dubai (DXB)</p>
                        <div className="flex items-center justify-between text-xs uppercase font-black tracking-widest text-blue-600">
                            <span>Avg Fare</span>
                            <span>৳39,900</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className={cn('py-12 px-6 lg:px-20 relative overflow-hidden', theme === 'dark' ? 'bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50' : 'bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50')}>
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        animate={{ x: [-40, 30, -40], y: [0, 15, 0], opacity: [0.2, 0.35, 0.2] }}
                        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute -top-20 -left-20 w-72 h-72 rounded-full blur-3xl bg-cyan-400/25"
                    />
                    <motion.div
                        animate={{ x: [20, -25, 20], y: [0, -12, 0], opacity: [0.18, 0.32, 0.18] }}
                        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                        className="absolute -bottom-24 right-0 w-80 h-80 rounded-full blur-3xl bg-blue-500/20"
                    />
                </div>
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest mb-3 shadow-lg shadow-blue-600/30">
                            <Plane className="w-3 h-3" /> Partner Airlines
                        </div>
                        <h2 className={cn('text-3xl md:text-4xl font-black tracking-tighter mb-2', theme === 'dark' ? 'text-white' : 'text-slate-950')}>Top Airlines</h2>
                        <p className={cn('text-base font-medium mb-4', theme === 'dark' ? 'text-slate-300' : 'text-slate-600')}>Instantly compare schedules and trusted carriers worldwide.</p>
                        <div className="flex flex-wrap gap-2">
                            <span className={cn('inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full border', theme === 'dark' ? 'bg-cyan-500/15 border-cyan-400/30 text-cyan-200' : 'bg-cyan-50 border-cyan-200 text-cyan-700')}><Globe2 className="w-3 h-3" /> 60+ Routes</span>
                            <span className={cn('inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full border', theme === 'dark' ? 'bg-emerald-500/15 border-emerald-400/30 text-emerald-200' : 'bg-emerald-50 border-emerald-200 text-emerald-700')}><BadgeCheck className="w-3 h-3" /> Verified Partners</span>
                            <span className={cn('inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full border', theme === 'dark' ? 'bg-fuchsia-500/15 border-fuchsia-400/30 text-fuchsia-200' : 'bg-fuchsia-50 border-fuchsia-200 text-fuchsia-700')}><Timer className="w-3 h-3" /> Real-time Fare Alerts</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {TOP_AIRLINES.map((airline, index) => (
                            <motion.div
                                key={airline.name}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className={cn(
                                    'rounded-3xl border p-0 relative overflow-hidden min-h-[220px]',
                                    theme === 'dark' ? 'bg-slate-900/70 border-white/10' : 'bg-white border-slate-200 shadow-lg shadow-slate-200/30',
                                )}
                            >
                                <motion.div
                                    animate={{ x: ['-120%', '140%'] }}
                                    transition={{ duration: 3.6, repeat: Infinity, ease: 'linear', delay: index * 0.2 }}
                                    className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent z-20"
                                />
                                <div className={cn('absolute inset-x-0 top-0 h-1 bg-gradient-to-r', airline.accent)} />
                                <div className="absolute inset-0">
                                    <Image src={airline.bg} alt={airline.name} fill className="object-cover" referrerPolicy="no-referrer" />
                                    <div className={theme === 'dark' ? 'absolute inset-0 bg-slate-950/68' : 'absolute inset-0 bg-slate-900/52'} />
                                </div>
                                <div className="relative z-10 p-6 flex h-full flex-col justify-between text-white">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center border border-white/20">
                                            <Plane className="w-5 h-5" />
                                        </div>
                                        <div className="w-14 h-14 rounded-xl bg-white/90 overflow-hidden border border-white/40 relative">
                                            <Image src={airline.logo} alt={`${airline.name} logo`} fill className="object-cover" referrerPolicy="no-referrer" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-black text-2xl mb-1">{airline.name}</h3>
                                        <p className="text-white text-sm font-semibold drop-shadow">Hub: {airline.region}</p>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full bg-white/15 border border-white/25">Global Carrier</span>
                                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full bg-white/15 border border-white/25">24/7 Support</span>
                                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full bg-cyan-400/20 border border-cyan-200/40 text-cyan-100">Instant Confirmation</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={cn('py-12 px-6 lg:px-20 relative overflow-hidden', theme === 'dark' ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' : 'bg-gradient-to-br from-emerald-50 via-white to-teal-50')}>
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                        className="absolute -right-24 top-10 w-72 h-72 rounded-full border border-emerald-400/20"
                    />
                    <motion.div
                        animate={{ rotate: [360, 0] }}
                        transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
                        className="absolute -left-20 bottom-0 w-56 h-56 rounded-full border border-cyan-300/20"
                    />
                </div>
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest mb-3 shadow-lg shadow-emerald-600/30">
                            <ShieldCheck className="w-3 h-3" /> Featured Visa
                        </div>
                        <h2 className={cn('text-3xl md:text-4xl font-black tracking-tighter mb-2', theme === 'dark' ? 'text-white' : 'text-slate-950')}>Visa Services You Can Trust</h2>
                        <p className={cn('text-base font-medium', theme === 'dark' ? 'text-slate-300' : 'text-slate-600')}>Fast processing and transparent support for popular destinations.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {FEATURED_VISAS.map((item, index) => (
                            <motion.div
                                key={item.country}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.06 }}
                                viewport={{ once: true }}
                                className={cn(
                                    'rounded-3xl border h-full relative overflow-hidden',
                                    theme === 'dark' ? 'bg-slate-900/70 border-white/10' : 'bg-gradient-to-b from-white to-slate-50 border-slate-200',
                                )}
                            >
                                <div className="relative h-32 overflow-hidden">
                                    <Image src={item.image} alt={`${item.country} visa`} fill className="object-cover" referrerPolicy="no-referrer" />
                                    <div className={cn('absolute inset-0 bg-gradient-to-t', theme === 'dark' ? 'from-slate-950/90 via-slate-900/40 to-transparent' : 'from-slate-900/70 via-slate-800/20 to-transparent')} />
                                    <div className={cn('absolute inset-x-0 top-0 h-1 bg-gradient-to-r', item.gradient)} />
                                    <div className="absolute top-3 left-3 text-2xl leading-none">{item.flag}</div>
                                    <div className="absolute bottom-3 left-3 right-3">
                                        <h3 className="text-white text-lg font-black leading-tight">{item.country}</h3>
                                    </div>
                                </div>
                                <div className="p-4 space-y-3">
                                    <p className={cn('text-xs font-semibold', theme === 'dark' ? 'text-slate-300' : 'text-slate-600')}>{item.visaType}</p>
                                    <div className="grid grid-cols-2 gap-2 text-[10px] font-bold uppercase tracking-wider">
                                        <div className={cn('rounded-lg px-2.5 py-2 border', theme === 'dark' ? 'bg-slate-900/70 border-white/10 text-slate-200' : 'bg-white border-slate-200 text-slate-600')}>
                                            <div className="text-emerald-600 mb-1">Processing</div>
                                            <div className="normal-case text-[11px] font-black tracking-normal">{item.processing}</div>
                                        </div>
                                        <div className={cn('rounded-lg px-2.5 py-2 border', theme === 'dark' ? 'bg-slate-900/70 border-white/10 text-slate-200' : 'bg-white border-slate-200 text-slate-600')}>
                                            <div className="text-blue-600 mb-1">Service Fee</div>
                                            <div className="normal-case text-[11px] font-black tracking-normal">{item.fee}</div>
                                        </div>
                                    </div>
                                    <p className={cn('text-[11px] font-semibold', theme === 'dark' ? 'text-cyan-300' : 'text-cyan-700')}>{item.highlight}</p>
                                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                                        <div className={cn('rounded-lg px-2.5 py-2 border font-semibold', theme === 'dark' ? 'border-white/10 bg-white/5 text-slate-200' : 'border-slate-200 bg-slate-50 text-slate-600')}>
                                            Approval Rate
                                            <div className="text-[11px] font-black text-emerald-600 mt-1">98% Success</div>
                                        </div>
                                        <div className={cn('rounded-lg px-2.5 py-2 border font-semibold', theme === 'dark' ? 'border-white/10 bg-white/5 text-slate-200' : 'border-slate-200 bg-slate-50 text-slate-600')}>
                                            Support Window
                                            <div className="text-[11px] font-black text-blue-600 mt-1">Dedicated Agent</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="results" className={cn('py-12 px-6 lg:px-20 relative z-30 overflow-hidden', theme === 'dark' ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950' : 'bg-gradient-to-b from-white via-orange-50 to-white')}>
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        animate={{ x: [0, 60, 0], y: [0, -14, 0], opacity: [0.15, 0.28, 0.15] }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute top-8 -right-24 w-72 h-72 rounded-full blur-3xl bg-orange-400/20"
                    />
                    <motion.div
                        animate={{ x: [0, -45, 0], y: [0, 10, 0], opacity: [0.12, 0.24, 0.12] }}
                        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                        className="absolute bottom-0 -left-20 w-64 h-64 rounded-full blur-3xl bg-cyan-400/18"
                    />
                </div>
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-full mb-4 shadow-lg shadow-orange-200/50">
                                <Zap className="w-3 h-3 fill-current" /> Fast Expanding Deals
                            </div>
                            <h2 className={cn('text-4xl md:text-5xl font-black tracking-tighter mb-2', theme === 'dark' ? 'text-white' : 'text-blue-950')}>
                                Recommended Deals.
                            </h2>
                            <p className={cn('font-medium text-lg', theme === 'dark' ? 'text-slate-300' : 'text-slate-500')}>Hand-picked flight offers for your next global transit.</p>
                        </div>

                        <div className="flex gap-4 items-center">
                            <div className="flex -space-x-3 overflow-hidden">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden relative">
                                        <Image src={`https://picsum.photos/seed/user${i}/100/100`} alt="user" fill />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col justify-center">
                                <span className="text-[10px] font-black text-blue-600 uppercase">2.5k Travelers</span>
                                <span className="text-[10px] text-slate-400 font-bold uppercase">Booking right now</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-3">
                        {flights.map((flight, index) => (
                            <motion.div
                                key={flight.flightNumber || index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.08 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.008 }}
                                onClick={() => setSelectedFlight(flight)}
                                className={cn(
                                    'p-4 lg:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col lg:flex-row items-center gap-4 relative overflow-hidden group',
                                    theme === 'dark' ? 'bg-slate-900 border-white/5 hover:border-blue-500' : 'bg-white border-slate-100 hover:border-blue-600 shadow-xl shadow-slate-200/50',
                                )}
                            >
                                <div className="flex items-center gap-3 w-full lg:w-64">
                                    <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center shadow-inner group-hover:bg-blue-50 transition-colors">
                                        <Plane className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-sm lg:text-base leading-tight">{flight.airlineName}</h4>
                                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{flight.flightNumber}</span>
                                        <p className="text-[11px] font-semibold text-slate-500 mt-1">{flight.aircraftModel}</p>
                                    </div>
                                </div>

                                <div className="flex flex-1 items-center justify-center gap-6 w-full">
                                    <div className="text-center">
                                        <span className="block text-2xl font-black tracking-tighter">22:30</span>
                                        <span className="text-[10px] font-black text-slate-400 uppercase">DAC (DHAKA)</span>
                                    </div>
                                    <div className="flex-1 max-w-[220px] relative px-2">
                                        <div className={cn('w-full h-[2px] rounded-full relative overflow-hidden', theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200')}>
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400" />
                                            {[10, 35, 65, 90].map((point) => (
                                                <div key={point} className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white ring-1 ring-blue-300 rounded-full" style={{ left: `${point}%` }} />
                                            ))}
                                        </div>
                                        <motion.div
                                            animate={{ left: ['0%', '100%'] }}
                                            transition={{ duration: 4.8, repeat: Infinity, ease: 'linear' }}
                                            className="absolute top-0 -translate-y-1/2 z-10"
                                        >
                                            <div className="relative -translate-x-1/2">
                                                <div className="w-3 h-3 rounded-full bg-green-800 shadow-[0_0_16px_rgba(251,113,133,0.95)]" />
                                                <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping" />
                                                <div className="absolute inset-1 rounded-full border border-rose-200/90" />
                                            </div>
                                        </motion.div>
                                        <motion.div
                                            animate={{ left: ['0%', '100%'], opacity: [0.2, 0.75, 0.2] }}
                                            transition={{ duration: 4.8, repeat: Infinity, ease: 'linear' }}
                                            className="absolute top-0 -translate-y-1/2 -translate-x-[56px] w-14 h-[2px] rounded-full bg-gradient-to-r from-transparent via-rose-300/85 to-transparent"
                                        />
                                        <div className="mt-2 flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-wider">
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 7h 45m</span>
                                            <span className="flex items-center gap-1 text-green-500"><Zap className="w-3 h-3 fill-current" /> Non-Stop</span>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <span className="block text-2xl font-black tracking-tighter">04:15</span>
                                        <span className="text-[10px] font-black text-slate-400 uppercase">DXB (DUBAI)</span>
                                    </div>
                                </div>

                                <div className="flex flex-col lg:items-end gap-2 w-full lg:w-auto lg:min-w-[180px]">
                                    <div className="flex gap-2 flex-wrap lg:justify-end">
                                        {flight.features.slice(0, 2).map((feature) => (
                                            <span key={feature} className={cn('text-[10px] font-bold px-2 py-1 rounded-full border', theme === 'dark' ? 'text-slate-200 border-white/20 bg-white/5' : 'text-slate-600 border-slate-200 bg-slate-50')}>
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Starting Price</span>
                                        <span className="text-2xl font-black text-blue-600">৳{(flight.price * 115).toLocaleString()}</span>
                                    </div>
                                    <button className={cn('px-5 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest text-white shadow-xl flex items-center gap-2 transition-all', theme === 'dark' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30')}>
                                        Book <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="packages" className={cn('py-12 px-6 lg:px-20 relative overflow-hidden', theme === 'dark' ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' : 'bg-gradient-to-br from-blue-50 via-white to-cyan-50')}>
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        animate={{ scale: [1, 1.12, 1], opacity: [0.12, 0.24, 0.12] }}
                        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute -top-20 left-1/3 w-72 h-72 rounded-full blur-3xl bg-blue-500/20"
                    />
                </div>
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
                        <div>
                            <p className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-[10px] font-black rounded-full mb-4 tracking-widest uppercase shadow-lg shadow-blue-600/30"><Sparkles className="w-3 h-3" /> Special Offers</p>
                            <h2 className={cn('text-4xl md:text-5xl font-black tracking-tighter mb-2', theme === 'dark' ? 'text-white' : 'text-slate-900')}>Tour Packages.</h2>
                            <p className={cn('text-lg font-medium', theme === 'dark' ? 'text-slate-300' : 'text-slate-500')}>Explore our handpicked collection of unforgettable destinations.</p>
                        </div>
                        <Link href="/package/tour-package" className="text-blue-600 font-bold text-sm hover:underline mt-4 md:mt-0 flex items-center gap-2">
                            View All Packages <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
                        {tourPackages.filter((pkg) => !pkg.category || pkg.category === 'Popular').map((pkg, index) => (
                            <TourCard key={pkg.id} pkg={pkg} index={index} theme={theme} />
                        ))}
                    </div>
                </div>
            </section>

            <section className={cn('py-12 px-6 lg:px-20', theme === 'dark' ? 'bg-gradient-to-br from-slate-900/70 via-slate-800/40 to-slate-900/70' : 'bg-gradient-to-br from-green-50/80 via-white to-emerald-50/80')}>
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-[10px] font-black rounded-full mb-4 tracking-widest uppercase shadow-lg shadow-green-600/30"><Star className="w-3 h-3" /> Memorable Moments</div>
                            <h2 className={cn('text-4xl md:text-5xl font-black tracking-tighter mb-2', theme === 'dark' ? 'text-white' : 'text-green-950')}>Family Tour Packages.</h2>
                            <p className={cn('text-lg font-medium', theme === 'dark' ? 'text-slate-300' : 'text-slate-500')}>Create lasting memories with your loved ones.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
                        {tourPackages.filter((pkg) => pkg.category === 'Family').map((pkg, index) => (
                            <TourCard key={pkg.id} pkg={pkg} index={index} theme={theme} variant="compact" />
                        ))}
                    </div>
                </div>
            </section>

            <section className={cn('py-12 px-6 lg:px-20', theme === 'dark' ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' : 'bg-gradient-to-br from-orange-50/80 via-white to-amber-50/80')}>
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white text-[10px] font-black rounded-full mb-4 tracking-widest uppercase shadow-lg shadow-orange-600/30"><MapPin className="w-3 h-3" /> Multi-Country</div>
                        <h2 className={cn('text-4xl md:text-5xl font-black tracking-tighter mb-2', theme === 'dark' ? 'text-white' : 'text-blue-950')}>Combo Tour Packages.</h2>
                        <p className={cn('text-lg font-medium', theme === 'dark' ? 'text-slate-300' : 'text-slate-500')}>Experience multiple countries in one amazing journey.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-fr">
                        {tourPackages.filter((pkg) => pkg.category === 'Combo').map((pkg, index) => (
                            <TourCard key={pkg.id} pkg={pkg} index={index} theme={theme} variant="wide" />
                        ))}
                    </div>
                </div>
            </section>

            <HomeFooter theme={theme} />

            <AnimatePresence>
                {selectedFlight && <BookingFlow flight={selectedFlight} theme={theme} onClose={() => setSelectedFlight(null)} />}
            </AnimatePresence>

            <AuthModal isOpen={isAuthOpen} theme={theme} onClose={() => setIsAuthOpen(false)} />
        </main>
    );
}

function TourCard(props: Readonly<{ pkg: any; index: number; theme: string; variant?: 'standard' | 'compact' | 'wide' }>) {
    const { pkg, index, theme, variant = 'standard' } = props;
    const [imageSrc, setImageSrc] = useState(pkg.image || '/images/hero.png');

    return (
        <Link href={`/package/${pkg.id}`} className="block">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                    'group rounded-3xl overflow-hidden border transition-all relative flex flex-col cursor-pointer h-full',
                    theme === 'dark' ? 'bg-slate-900 border-white/5 hover:border-slate-700' : 'bg-white border-slate-200 shadow-2xl shadow-slate-300/30 hover:shadow-2xl hover:shadow-slate-400/40',
                )}
            >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-fuchsia-500/20 pointer-events-none" />
                <div className="relative overflow-hidden shrink-0 h-44 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
                    <Image
                        src={imageSrc}
                        alt={pkg.package_name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                        onError={() => setImageSrc('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%2360a5fa%22 width=%22400%22 height=%22300%22/%3E%3C/svg%3E')}
                    />
                    <div className="absolute top-3 left-3 z-10 bg-blue-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-2xl">
                        {pkg.duration}
                    </div>
                    {pkg.fair_included && (
                        <div className="absolute top-3 right-3 z-10 bg-green-500 text-white text-[10px] font-black px-2.5 py-1.5 rounded-full shadow-2xl">
                            Airfare Included
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
                </div>

                <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="text-[10px] text-blue-600 font-black uppercase tracking-[0.2em]">{pkg.destination}</span>
                    </div>
                    <h3 className={cn('font-black tracking-tighter mb-3 flex-1 group-hover:text-blue-600 transition-colors', variant === 'compact' ? 'text-xl leading-tight' : 'text-2xl lg:text-3xl')}>
                        {pkg.package_name}
                    </h3>

                    <p className={cn('text-[11px] leading-relaxed mb-3 font-semibold', theme === 'dark' ? 'text-slate-300' : 'text-slate-600')}>
                        {(pkg.highlights ?? []).slice(0, 3).join(' • ')}
                    </p>

                    <div className="grid grid-cols-3 gap-2 mb-4 text-[10px]">
                        <div className={cn('rounded-lg px-2 py-2 border font-semibold', theme === 'dark' ? 'border-white/10 bg-white/5 text-slate-200' : 'border-slate-200 bg-slate-50 text-slate-600')}>
                            Duration
                            <div className="font-black text-[11px] text-blue-600 mt-1">{pkg.duration}</div>
                        </div>
                        <div className={cn('rounded-lg px-2 py-2 border font-semibold', theme === 'dark' ? 'border-white/10 bg-white/5 text-slate-200' : 'border-slate-200 bg-slate-50 text-slate-600')}>
                            Style
                            <div className="font-black text-[11px] text-emerald-600 mt-1">{pkg.category ?? 'Popular'}</div>
                        </div>
                        <div className={cn('rounded-lg px-2 py-2 border font-semibold', theme === 'dark' ? 'border-white/10 bg-white/5 text-slate-200' : 'border-slate-200 bg-slate-50 text-slate-600')}>
                            Includes
                            <div className="font-black text-[11px] text-orange-600 mt-1">{pkg.fair_included ? 'Flight + Hotel' : 'Hotel + Tour'}</div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {(pkg.highlights ?? []).slice(0, 3).map((highlight: string) => (
                            <span key={highlight} className={cn('text-[10px] font-bold px-2 py-1 rounded-full border', theme === 'dark' ? 'text-slate-200 border-white/15 bg-white/5' : 'text-slate-600 border-slate-200 bg-slate-50')}>
                                {highlight}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-slate-200 border-t border-inherit mt-auto">
                        <div>
                            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1 flex items-center gap-2">
                                <Star className="w-3 h-3 text-orange-400 fill-current" /> {(pkg.rating ?? 4.9).toFixed(1)} Rating
                            </span>
                            <span className={cn('text-2xl font-black', theme === 'dark' ? 'text-white' : 'text-blue-600')}>
                                ৳{pkg.price_bdt.toLocaleString()}
                            </span>
                        </div>
                        <button
                            className={cn(
                                'p-3 rounded-xl transition-all shadow-xl group-hover:scale-110',
                                theme === 'dark' ? 'bg-white/5 text-white hover:bg-blue-600' : 'bg-blue-400 text-white hover:bg-blue-700 shadow-blue-600/30',
                            )}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
