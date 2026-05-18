'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun, Zap } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface NavbarProps {
    readonly theme: string;
    readonly isMobileMenuOpen: boolean;
    readonly toggleTheme: () => void;
    readonly setIsMobileMenuOpen: (open: boolean) => void;
    readonly setIsAuthOpen: (open: boolean) => void;
}

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Flights', href: '#results' },
    { label: 'Tour Packages', href: '#packages' },
    { label: 'Visa Services', href: '/visa' },
    { label: 'Contact', href: '#footer' },
];

export default function Navbar({
    theme,
    isMobileMenuOpen,
    toggleTheme,
    setIsMobileMenuOpen,
    setIsAuthOpen,
}: NavbarProps) {
    const pathname = usePathname();

    return (
        <>
            <nav
                className={cn(
                    'fixed top-0 left-0 w-full z-[80] px-6 lg:px-20 py-4 flex items-center justify-between transition-all duration-300',
                    theme === 'dark'
                        ? 'bg-slate-950/70 border-b border-white/10 backdrop-blur-2xl'
                        : 'bg-transparent border-none backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
                )}
            >
                {/* Logo */}
                <Link href="/" className="group flex items-center gap-3">
                    <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-2xl overflow-hidden bg-white shadow-lg shadow-blue-500/20 ring-1 ring-blue-100/60 transition-transform duration-300 group-hover:scale-105">
                        <Image
                            src="/images/logo.png"
                            alt="Roaming Bangladesh"
                            fill
                            sizes="(max-width: 768px) 40px, 44px"
                            className="object-contain p-1.5"
                            priority
                        />
                    </div>

                    <div className="flex flex-col">
                        <span
                            className={cn(
                                'text-lg md:text-xl font-black tracking-tight leading-none',
                                theme === 'dark'
                                    ? 'text-white'
                                    : 'bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent'
                            )}
                        >
                            ROAMING
                        </span>

                        <span className="text-[10px] font-bold text-blue-500 tracking-[0.35em] uppercase">
                            Bangladesh
                        </span>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div
                    className={cn(
                        'hidden xl:flex items-center gap-8',
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    )}
                >
                    {navItems.map((item) => {
                        const isActive =
                            item.href === pathname ||
                            (pathname === '/visa' && item.href === '/visa');

                        return (
                            <div key={item.label} className="relative group">
                                {item.href.startsWith('/') ? (
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            'relative py-2 text-[14px] font-black uppercase tracking-[0.15em] transition-colors duration-300',
                                            isActive
                                                ? 'text-blue-600'
                                                : theme === 'dark'
                                                    ? 'hover:text-white'
                                                    : 'hover:text-slate-950'
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <a
                                        href={item.href}
                                        className={cn(
                                            'relative py-2 text-[14px] font-black uppercase tracking-[0.15em] transition-colors duration-300',
                                            theme === 'dark'
                                                ? 'hover:text-white'
                                                : 'hover:text-slate-950'
                                        )}
                                    >
                                        {item.label}
                                    </a>
                                )}

                                {/* Hover Underline */}
                                <span
                                    className={cn(
                                        'absolute left-0 -bottom-0.5 h-[2px] w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 transition-transform duration-300 ease-out group-hover:scale-x-100'
                                    )}
                                />

                                {/* Active Underline */}
                                {isActive && (
                                    <motion.span
                                        layoutId="navbar-active-line"
                                        className="absolute left-0 -bottom-0.5 h-[3px] w-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 shadow-[0_0_12px_rgba(59,130,246,0.7)]"
                                        transition={{
                                            type: 'spring',
                                            stiffness: 380,
                                            damping: 30,
                                        }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3 lg:gap-4">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className={cn(
                            'group relative overflow-hidden p-2.5 rounded-2xl border transition-all duration-300',
                            theme === 'dark'
                                ? 'border-white/10 bg-white/[0.03] hover:bg-white/[0.07] text-yellow-400'
                                : 'border-slate-200 bg-white hover:bg-slate-100 text-blue-600 shadow-sm'
                        )}
                    >
                        <div className="relative z-10">
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5 transition-transform duration-500 group-hover:rotate-180" />
                            ) : (
                                <Moon className="w-5 h-5 transition-transform duration-500 group-hover:-rotate-12" />
                            )}
                        </div>
                    </button>

                    {/* Auth Button */}
                    <button
                        id="auth-trigger"
                        onClick={() => setIsAuthOpen(true)}
                        className={cn(
                            'hidden md:flex items-center gap-2 px-6 py-3 rounded-2xl text-[13px] font-black uppercase tracking-[0.15em] transition-all duration-300 border relative overflow-hidden group',
                            theme === 'dark'
                                ? 'bg-white/[0.04] border-white/10 text-white hover:border-indigo-500/40'
                                : 'bg-gradient-to-r from-indigo-600 to-violet-600 border-indigo-700 text-white shadow-xl shadow-indigo-600/20'
                        )}
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <span className="relative z-10">My Account</span>
                    </button>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={cn(
                            'xl:hidden p-2.5 rounded-2xl border transition-all duration-300',
                            theme === 'dark'
                                ? 'border-white/10 bg-white/[0.03] hover:bg-white/[0.08]'
                                : 'border-slate-200 bg-white hover:bg-slate-100'
                        )}
                    >
                        <div className="w-6 h-5 flex flex-col justify-between items-end">
                            <span
                                className={cn(
                                    'h-0.5 rounded-full transition-all duration-300 bg-current',
                                    isMobileMenuOpen
                                        ? 'w-6 rotate-45 translate-y-2'
                                        : 'w-6'
                                )}
                            />

                            <span
                                className={cn(
                                    'h-0.5 rounded-full transition-all duration-300 bg-current',
                                    isMobileMenuOpen
                                        ? 'opacity-0'
                                        : 'w-4'
                                )}
                            />

                            <span
                                className={cn(
                                    'h-0.5 rounded-full transition-all duration-300 bg-current',
                                    isMobileMenuOpen
                                        ? 'w-6 -rotate-45 -translate-y-2.5'
                                        : 'w-5'
                                )}
                            />
                        </div>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className={cn(
                            'fixed inset-0 z-[100] xl:hidden flex flex-col p-8',
                            theme === 'dark'
                                ? 'bg-slate-950'
                                : 'bg-white'
                        )}
                    >
                        {/* Top */}
                        <div className="flex justify-between items-center mb-16">
                            <div className="flex items-center gap-3">
                                <div className="relative w-11 h-11 rounded-2xl overflow-hidden bg-white ring-1 ring-blue-100/60 shadow-lg">
                                    <Image
                                        src="/images/logo.png"
                                        alt="Roaming Bangladesh"
                                        fill
                                        sizes="44px"
                                        className="object-contain p-1.5"
                                    />
                                </div>

                                <div>
                                    <h2 className="text-xl font-black tracking-tight">
                                        ROAMING
                                    </h2>
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-blue-500 font-bold">
                                        Bangladesh
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={cn(
                                    'p-3 rounded-2xl transition-all',
                                    theme === 'dark'
                                        ? 'bg-white/[0.05] hover:bg-white/[0.08]'
                                        : 'bg-slate-100 hover:bg-slate-200'
                                )}
                            >
                                <Zap className="w-6 h-6 rotate-45" />
                            </button>
                        </div>

                        {/* Mobile Links */}
                        <div className="flex flex-col gap-7">
                            {navItems.map((item, i) => (
                                <motion.a
                                    key={item.label}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: i * 0.08,
                                        duration: 0.4,
                                    }}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={cn(
                                        'group relative w-fit text-3xl font-black tracking-tight transition-colors',
                                        theme === 'dark'
                                            ? 'text-white/80 hover:text-white'
                                            : 'text-slate-700 hover:text-slate-950'
                                    )}
                                >
                                    {item.label}

                                    <span className="absolute left-0 -bottom-2 h-[3px] w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-transform duration-300 group-hover:scale-x-100" />
                                </motion.a>
                            ))}
                        </div>

                        {/* Bottom CTA */}
                        <div className="mt-auto">
                            <button
                                onClick={() => {
                                    setIsAuthOpen(true);
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-white py-5 rounded-3xl font-black text-lg shadow-2xl shadow-indigo-600/30"
                            >
                                Sign In
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}