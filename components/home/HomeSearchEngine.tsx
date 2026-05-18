'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeftRight, Briefcase, MapPin, Plane, Route, Search, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import AirportSelector from './AirportSelector';
import { FROM_AIRPORTS, TO_AIRPORTS, formatAirport, type AirportOption } from './types';

type SearchType = 'one-way' | 'round-trip' | 'multi-city';
type SearchTab = 'home' | 'hotel' | 'flights' | 'visa' | 'tour';

type MultiCityLeg = {
    from: string;
    to: string;
    date: string;
};

type Props = {
    theme: string;
    searchTab: SearchTab;
    setSearchTab: (value: SearchTab) => void;
    searchType: SearchType;
    setSearchType: (value: SearchType) => void;
    fromAirport: AirportOption;
    toAirport: AirportOption;
    fromInput: string;
    toInput: string;
    openAirportDropdown: 'from' | 'to' | null;
    departDate: string;
    returnDate: string;
    multiCityLegs: MultiCityLeg[];
    isSearching: boolean;
    swapAirports: () => void;
    setFromAirport: (airport: AirportOption) => void;
    setToAirport: (airport: AirportOption) => void;
    setFromInput: (value: string) => void;
    setToInput: (value: string) => void;
    setOpenAirportDropdown: (value: 'from' | 'to' | null) => void;
    setDepartDate: (value: string) => void;
    setReturnDate: (value: string) => void;
    updateMultiCityLeg: (index: number, field: keyof MultiCityLeg, value: string) => void;
    handleSearch: (event: React.FormEvent<HTMLFormElement>) => void;
};

export function HomeSearchEngine({
    theme,
    searchTab,
    setSearchTab,
    searchType,
    setSearchType,
    fromAirport,
    toAirport,
    fromInput,
    toInput,
    openAirportDropdown,
    departDate,
    returnDate,
    multiCityLegs,
    isSearching,
    swapAirports,
    setFromAirport,
    setToAirport,
    setFromInput,
    setToInput,
    setOpenAirportDropdown,
    setDepartDate,
    setReturnDate,
    updateMultiCityLeg,
    handleSearch,
}: Readonly<Props>) {
    const tabs = [
        { id: 'flights', label: 'Flights', icon: <Plane className="w-4 h-4" /> },
        { id: 'hotel', label: 'Hotel', icon: <Briefcase className="w-4 h-4" /> },
        { id: 'tour', label: 'Tour', icon: <MapPin className="w-4 h-4" /> },
        { id: 'visa', label: 'Visa', icon: <ShieldCheck className="w-4 h-4" /> },
    ] as const;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={theme === 'dark'
                ? 'w-full max-w-7xl mx-auto border border-white/10 rounded-2xl shadow-2xl p-1 pt-2 relative z-20 bg-slate-900/40 backdrop-blur-3xl'
                : 'w-full max-w-7xl mx-auto border border-slate-200 rounded-2xl shadow-2xl p-1 pt-2 relative z-20 bg-white/90 backdrop-blur-xl'}
        >
            <div className="flex flex-wrap border-b border-inherit px-2">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setSearchTab(tab.id)}
                        className={theme === 'dark'
                            ? `flex items-center gap-2 px-6 py-5 text-sm font-black uppercase tracking-widest border-b-2 transition-all ${searchTab === tab.id ? 'text-blue-600 border-blue-600' : 'text-slate-400 border-transparent hover:text-blue-600'}`
                            : `flex items-center gap-2 px-6 py-5 text-sm font-black uppercase tracking-widest border-b-2 transition-all ${searchTab === tab.id ? 'text-blue-600 border-blue-600' : 'text-slate-400 border-transparent hover:text-blue-600'}`}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="p-8">
                {searchTab === 'flights' && (
                    <>
                        <div className="flex flex-wrap gap-3 mb-6">
                            {['one-way', 'round-trip', 'multi-city'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setSearchType(type as SearchType)}
                                    className={theme === 'dark'
                                        ? `px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${searchType === type ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`
                                        : `px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${searchType === type ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                                >
                                    {type.replace('-', ' ')}
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handleSearch} className="space-y-5">
                            {searchType !== 'multi-city' && (
                                <div className="flex flex-col lg:flex-row gap-3 items-center w-full">
                                    <div className="flex-1 min-w-full lg:min-w-0">
                                        <AirportSelector
                                            id="going-from"
                                            label="Going From"
                                            value={fromInput}
                                            selectedAirport={fromAirport}
                                            options={FROM_AIRPORTS}
                                            isOpen={openAirportDropdown === 'from'}
                                            theme={theme}
                                            onFocus={() => setOpenAirportDropdown('from')}
                                            onBlur={() => setTimeout(() => setOpenAirportDropdown(null), 120)}
                                            className="w-full"
                                            onSelect={(airport) => {
                                                setFromAirport(airport);
                                                setFromInput(formatAirport(airport));
                                                setOpenAirportDropdown(null);
                                            }}
                                        />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={swapAirports}
                                        className={theme === 'dark'
                                            ? 'w-11 h-11 lg:w-12 lg:h-12 rounded-full border flex items-center justify-center transition-all shadow-lg shadow-blue-500/20 flex-shrink-0 bg-slate-900 border-white/15 hover:bg-slate-800 text-cyan-300'
                                            : 'w-11 h-11 lg:w-12 lg:h-12 rounded-full border flex items-center justify-center transition-all shadow-lg shadow-blue-500/20 flex-shrink-0 bg-gradient-to-br from-cyan-100 to-blue-100 border-blue-200 hover:from-cyan-200 hover:to-blue-200 text-blue-700'}
                                        aria-label="Swap departure and destination"
                                        title="Swap"
                                    >
                                        <ArrowLeftRight className="w-4 h-4" />
                                    </button>

                                    <div className="flex-1 min-w-full lg:min-w-0">
                                        <AirportSelector
                                            id="going-to"
                                            label="Going To"
                                            value={toInput}
                                            selectedAirport={toAirport}
                                            options={TO_AIRPORTS}
                                            isOpen={openAirportDropdown === 'to'}
                                            theme={theme}
                                            onFocus={() => setOpenAirportDropdown('to')}
                                            onBlur={() => setTimeout(() => setOpenAirportDropdown(null), 120)}
                                            className="w-full"
                                            onSelect={(airport) => {
                                                setToAirport(airport);
                                                setToInput(formatAirport(airport));
                                                setOpenAirportDropdown(null);
                                            }}
                                        />
                                    </div>

                                    <div className={theme === 'dark'
                                        ? 'flex flex-col  p-4 rounded-xl border-2 transition-all bg-white/5 border-white/10 hover:border-blue-500/50 flex-1 min-w-full lg:min-w-0'
                                        : 'flex flex-col p-5 rounded-xl border-3 transition-all bg-slate-50 border-slate-200 hover:border-blue-600 flex-1 min-w-full lg:min-w-0'}>
                                        <span className="text-[10px] font-black text-blue-600 uppercase mb-1">Departure</span>
                                        <input
                                            id="departure-date"
                                            type="date"
                                            value={departDate}
                                            onChange={(event) => setDepartDate(event.target.value)}
                                            className="bg-transparent font-black outline-none text-base text-inherit"
                                        />
                                    </div>

                                    {searchType === 'round-trip' && (
                                        <div className={theme === 'dark'
                                            ? 'flex flex-col p-4 rounded-xl border transition-all bg-white/5 border-white/10 hover:border-blue-500/50 flex-1 min-w-0'
                                            : 'flex flex-col p-4 rounded-xl border transition-all bg-slate-50 border-slate-200 hover:border-blue-600 flex-1 min-w-0'}>
                                            <span className="text-[10px] font-black text-blue-600 uppercase mb-1">Return</span>
                                            <input
                                                id="return-date"
                                                type="date"
                                                value={returnDate}
                                                onChange={(event) => setReturnDate(event.target.value)}
                                                className="bg-transparent font-black outline-none text-base text-inherit"
                                            />
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className="p-8 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-black text-sm lg:text-base transition-all shadow-xl shadow-cyan-600/30 flex items-center justify-center gap-2 relative overflow-hidden group flex-shrink-0 px-6 lg:px-8 whitespace-nowrap"
                                    >
                                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        {isSearching ? <Zap className="w-6 h-6 animate-spin" /> : 'Search'}
                                        {!isSearching && <Search className="w-5 h-5" />}
                                    </button>
                                </div>
                            )}

                            {searchType === 'multi-city' && (
                                <div className="space-y-4">
                                    <p className="text-sm font-semibold text-slate-500 flex items-center gap-2">
                                        <Route className="w-4 h-4 text-blue-500" /> Plan multiple legs with separate departure dates.
                                    </p>
                                    {multiCityLegs.map((leg, index) => (
                                        <div
                                            key={`${leg.from}-${leg.to}-${leg.date}`}
                                            className={theme === 'dark'
                                                ? 'grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-2xl border bg-white/5 border-white/10'
                                                : 'grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-2xl border bg-slate-50/90 border-slate-200'}
                                        >
                                            <div className={theme === 'dark'
                                                ? 'flex flex-col p-4 rounded-xl border transition-all bg-slate-900/60 border-white/10'
                                                : 'flex flex-col p-4 rounded-xl border transition-all bg-white border-slate-200'}>
                                                <span className="text-[10px] font-black text-blue-600 uppercase mb-1">From</span>
                                                <input
                                                    className="bg-transparent font-black outline-none text-base lg:text-lg text-inherit"
                                                    value={leg.from}
                                                    onChange={(event) => updateMultiCityLeg(index, 'from', event.target.value)}
                                                />
                                            </div>

                                            <div className={theme === 'dark'
                                                ? 'flex flex-col p-4 rounded-xl border transition-all bg-slate-900/60 border-white/10'
                                                : 'flex flex-col p-4 rounded-xl border transition-all bg-white border-slate-200'}>
                                                <span className="text-[10px] font-black text-blue-600 uppercase mb-1">To</span>
                                                <input
                                                    className="bg-transparent font-black outline-none text-base lg:text-lg text-inherit"
                                                    value={leg.to}
                                                    onChange={(event) => updateMultiCityLeg(index, 'to', event.target.value)}
                                                />
                                            </div>

                                            <div className={theme === 'dark'
                                                ? 'flex flex-col p-4 rounded-xl border transition-all bg-slate-900/60 border-white/10'
                                                : 'flex flex-col p-4 rounded-xl border transition-all bg-white border-slate-200'}>
                                                <span className="text-[10px] font-black text-blue-600 uppercase mb-1">Date</span>
                                                <input
                                                    type="date"
                                                    className="bg-transparent font-black outline-none text-base lg:text-lg text-inherit"
                                                    value={leg.date}
                                                    onChange={(event) => updateMultiCityLeg(index, 'date', event.target.value)}
                                                />
                                            </div>
                                        </div>
                                    ))}

                                    <button
                                        type="submit"
                                        className="w-full min-h-[64px] bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white rounded-xl font-black text-lg lg:text-xl transition-all shadow-xl shadow-fuchsia-600/30 flex items-center justify-center gap-3 relative overflow-hidden group"
                                    >
                                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        {isSearching ? <Zap className="w-6 h-6 animate-spin" /> : 'Search Multi-City'}
                                        {!isSearching && <Search className="w-5 h-5" />}
                                    </button>
                                </div>
                            )}
                        </form>
                    </>
                )}

                {searchTab === 'hotel' && (
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        <FieldCard theme={theme} label="Destination">
                            <input className="bg-transparent font-black outline-none text-base lg:text-lg text-inherit" placeholder="City, airport" defaultValue="Dhaka" />
                        </FieldCard>

                        <FieldCard theme={theme} label="Check In / Out">
                            <div className="font-black text-lg">May 18 ~ May 20</div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">2 Nights Duration</span>
                        </FieldCard>

                        <FieldCard theme={theme} label="Adults, Children, Rooms" className="col-span-1 md:col-span-2">
                            <div className="font-black text-lg">1 Adults - 0 Children - 1 Room</div>
                        </FieldCard>

                        <button
                            type="submit"
                            className="h-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-black text-lg lg:text-xl transition-all shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-3"
                        >
                            Search
                            <Search className="w-5 h-5" />
                        </button>
                    </form>
                )}

                {searchTab === 'visa' && (
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <FieldCard theme={theme} label="From Country">
                            <input className="bg-transparent font-black outline-none text-base lg:text-lg text-inherit" placeholder="Where are you from?" defaultValue="Bangladesh" />
                        </FieldCard>

                        <FieldCard theme={theme} label="To Country">
                            <input className="bg-transparent font-black outline-none text-base lg:text-lg text-inherit" placeholder="Where are you going?" defaultValue="United Arab Emirates" />
                        </FieldCard>

                        <FieldCard theme={theme} label="Select Visa Processing Type">
                            <select className="bg-transparent font-black outline-none text-sm appearance-none text-inherit">
                                <option>Select a country first</option>
                                <option>Tourist Visa</option>
                                <option>Business Visa</option>
                            </select>
                        </FieldCard>

                        <button
                            type="submit"
                            className="h-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white rounded-xl font-black text-lg lg:text-xl transition-all shadow-xl shadow-amber-600/30 flex items-center justify-center gap-3"
                        >
                            Search
                            <Search className="w-5 h-5" />
                        </button>
                    </form>
                )}

                {searchTab === 'tour' && (
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <FieldCard theme={theme} label="Destinations" className="col-span-1 md:col-span-3">
                            <input className="bg-transparent font-black outline-none text-base lg:text-lg text-inherit" placeholder="Search Destination?" defaultValue="Maldives" />
                        </FieldCard>

                        <button
                            type="submit"
                            className="h-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white rounded-xl font-black text-lg lg:text-xl transition-all shadow-xl shadow-rose-600/30 flex items-center justify-center gap-3"
                        >
                            Search
                            <Search className="w-5 h-5" />
                        </button>
                    </form>
                )}
            </div>
        </motion.div>
    );
}

function FieldCard({
    theme,
    label,
    className,
    children,
}: {
    theme: string;
    label: string;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div className={theme === 'dark'
            ? `flex flex-col p-4 rounded-xl border transition-all bg-white/5 border-white/10 hover:border-blue-500/50 ${className ?? ''}`
            : `flex flex-col p-4 rounded-xl border transition-all bg-slate-50 border-slate-200 hover:border-blue-600 ${className ?? ''}`}>
            <span className="text-[10px] font-black text-blue-600 uppercase mb-1">{label}</span>
            {children}
        </div>
    );
}