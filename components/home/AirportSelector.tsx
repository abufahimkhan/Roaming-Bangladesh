'use client';

import { ChevronDown } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AirportOption, formatAirport } from './types';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface AirportSelectorProps {
    readonly id: string;
    readonly label: string;
    readonly value: string;
    readonly selectedAirport: AirportOption;
    readonly options: AirportOption[];
    readonly isOpen: boolean;
    readonly theme: string;
    readonly className?: string;
    readonly onFocus: () => void;
    readonly onBlur: () => void;
    readonly onSelect: (airport: AirportOption) => void;
}

export default function AirportSelector({
    id,
    label,
    value,
    selectedAirport,
    options,
    isOpen,
    theme,
    className,
    onFocus,
    onBlur,
    onSelect,
}: AirportSelectorProps) {
    return (
        <div className={cn('relative', className)}>
            <button
                type="button"
                className={cn(
                    'flex w-full flex-col p-4 rounded-2xl border-2 transition-all text-left select-none',
                    theme === 'dark'
                        ? 'bg-white/5 border-white/10 hover:border-blue-500/60'
                        : 'bg-white border-slate-200 hover:border-blue-500 shadow-sm',
                    isOpen && (theme === 'dark' ? 'border-blue-500/60' : 'border-blue-500 ring-2 ring-blue-100')
                )}
                onClick={onFocus}
                onBlur={onBlur}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onFocus();
                    }
                }}
            >
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-0.5">{label}</span>
                <div className="flex items-center justify-between gap-2">
                    <span className="font-black text-base leading-tight truncate">{value}</span>
                    <ChevronDown
                        className={cn(
                            'w-4 h-4 shrink-0 transition-transform duration-200',
                            isOpen ? 'rotate-180 text-blue-500' : 'text-slate-400'
                        )}
                    />
                </div>
                <span className="text-[11px] text-slate-400 font-semibold mt-0.5 truncate">{selectedAirport.airport}</span>
            </button>

            {isOpen && (
                <div
                    className={cn(
                        'absolute top-[calc(100%+6px)] left-0 right-0 border-2 rounded-2xl shadow-2xl z-[200] overflow-hidden',
                        theme === 'dark'
                            ? 'bg-slate-900 border-blue-500/30 shadow-blue-900/40'
                            : 'bg-white border-blue-100 shadow-blue-100/60'
                    )}
                >
                    {options.map((airport) => (
                        <button
                            key={`${airport.code}-${airport.city}`}
                            type="button"
                            onMouseDown={(e) => {
                                e.preventDefault();
                                onSelect(airport);
                            }}
                            className={cn(
                                'w-full px-4 py-3 text-left border-b last:border-b-0 transition-all group',
                                theme === 'dark'
                                    ? 'border-white/5 hover:bg-blue-600/20'
                                    : 'border-slate-50 hover:bg-blue-50'
                            )}
                        >
                            <div className="font-black text-sm group-hover:text-blue-600 transition-colors">
                                {formatAirport(airport)}
                            </div>
                            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
                                {airport.airlines.slice(0, 3).join(' · ')}
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
