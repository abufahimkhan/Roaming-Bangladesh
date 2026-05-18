'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Briefcase, Plane, ShieldCheck, Trophy } from 'lucide-react';

type Props = {
    theme: string;
};

export function HomeFooter({ theme }: Readonly<Props>) {
    const authPartners = [
        { name: 'IATA', logo: 'https://picsum.photos/seed/iata/200/80', color: 'bg-blue-50' },
        { name: 'Aftab', logo: 'https://images.unsplash.com/photo-1620288627223-53302f4e8c74?q=80&w=100&h=100&auto=format&fit=crop', color: 'bg-green-50' },
        { name: 'Civil', logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=100&h=100&auto=format&fit=crop', color: 'bg-orange-50' },
        { name: 'North', logo: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=100&h=100&auto=format&fit=crop', color: 'bg-purple-50' },
        { name: 'Stock', logo: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=100&h=100&auto=format&fit=crop', color: 'bg-indigo-50' },
    ];

    return (
        <footer id="footer" className={theme === 'dark' ? 'pt-24 pb-16 px-6 lg:px-20 border-t bg-gradient-to-br from-slate-950 to-slate-900 border-white/10 relative z-50' : 'pt-24 pb-16 px-6 lg:px-20 border-t bg-gradient-to-br from-blue-50 via-slate-50 to-cyan-50 border-slate-300 relative z-50 shadow-2xl shadow-slate-200/30'}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                <div>
                    <span className="block text-xs font-black text-blue-600 uppercase tracking-widest mb-6">Authorized By</span>
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                        {authPartners.map((auth) => (
                            <div key={auth.name} className={theme === 'dark'
                                ? 'h-20 rounded-xl flex flex-col items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer overflow-hidden p-3 group border relative bg-white border-white/5'
                                : `h-20 rounded-xl flex flex-col items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer overflow-hidden p-3 group border relative ${auth.color} border-transparent shadow-sm hover:shadow-lg`}>
                                <div className="relative w-full h-8 mb-2">
                                    <Image src={auth.logo} alt={auth.name} fill className="object-contain group-hover:scale-110 transition-transform" referrerPolicy="no-referrer" />
                                </div>
                                <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors">{auth.name}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10">
                        <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Member Since 2010</span>
                        <p className="text-xs text-slate-500 font-medium">Leading the travel hospitality industry in Bangladesh for over 15 years.</p>
                    </div>
                </div>

                <div>
                    <span className="block text-xs font-black text-blue-600 uppercase tracking-widest mb-6">Page Links</span>
                    <ul className="space-y-4 text-sm font-bold text-slate-500">
                        <li><Link href="/" className="hover:text-blue-600 transition-colors">About Us</Link></li>
                        <li><Link href="/" className="hover:text-blue-600 transition-colors">Agent Registration</Link></li>
                        <li><Link href="/" className="hover:text-blue-600 transition-colors">Hotel List</Link></li>
                        <li><Link href="/" className="hover:text-blue-600 transition-colors">Hotel Booking</Link></li>
                        <li><Link href="/package/tour-package" className="hover:text-blue-600 transition-colors">Tour Package Booking</Link></li>
                        <li><Link href="/package/tour-package" className="hover:text-blue-600 transition-colors">Package Confirm</Link></li>
                        <li><Link href="/package/tour-package" className="hover:text-blue-600 transition-colors">Package Search</Link></li>
                        <li><Link href="/package/tour-package" className="hover:text-blue-600 transition-colors">Tour Package Single</Link></li>
                    </ul>
                </div>

                <div>
                    <span className="block text-xs font-black text-blue-600 uppercase tracking-widest mb-6">About Roaming BD</span>
                    <ul className="space-y-4 text-sm font-bold text-slate-500">
                        <li><Link href="/" className="hover:text-blue-600 transition-colors">News & Updates</Link></li>
                        <li><Link href="/" className="hover:text-blue-600 transition-colors">Careers</Link></li>
                        <li><Link href="/" className="hover:text-blue-600 transition-colors">Terms & Conditions</Link></li>
                        <li><Link href="/" className="hover:text-blue-600 transition-colors">Privacy Statement</Link></li>
                        <li><Link href="/" className="hover:text-blue-600 transition-colors">Security Policy</Link></li>
                    </ul>
                    <div className="mt-10">
                        <span className="block text-xs font-black text-blue-600 uppercase tracking-widest mb-4">Newsletter</span>
                        <div className="flex gap-2">
                            <input className="bg-slate-200/50 border border-slate-200 rounded-lg px-4 py-2 text-xs flex-1 outline-none focus:border-blue-600" placeholder="Email Address" />
                            <button className="bg-blue-600 text-white p-2 rounded-lg"><ChevronRight className="w-5 h-5" /></button>
                        </div>
                    </div>
                </div>

                <div>
                    <span className="block text-xs font-black text-blue-600 uppercase tracking-widest mb-6">Other Services</span>
                    <ul className="space-y-4 text-sm font-bold text-slate-500">
                        <li className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-blue-600" /> <Link href="/" className="hover:text-blue-600 transition-colors">Hotels</Link></li>
                        <li className="flex items-center gap-2"><Plane className="w-4 h-4 text-blue-600" /> <Link href="/" className="hover:text-blue-600 transition-colors">Flights</Link></li>
                        <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-blue-600" /> <Link href="/visa" className="hover:text-blue-600 transition-colors">Visa Services</Link></li>
                        <li className="flex items-center gap-2"><Trophy className="w-4 h-4 text-blue-600" /> <Link href="/" className="hover:text-blue-600 transition-colors">Corporate Travel</Link></li>
                    </ul>
                    <div className="mt-10 flex flex-wrap gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center font-bold text-[8px] text-black">LOGO 1</div>
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center font-bold text-[8px] text-black">LOGO 2</div>
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center font-bold text-[8px] text-black">LOGO 3</div>
                    </div>
                </div>
            </div>

            <div className="pt-12 border-t border-inherit flex flex-col md:flex-row items-center justify-between text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                <div className="flex items-center gap-8 mb-6 md:mb-0">
                    <span>© 2026 ROAMING BANGLADESH</span>
                    <span className="hidden sm:inline">License: RA-992-B</span>
                </div>
                <div className="flex gap-8">
                    <span className="hover:text-blue-600 cursor-pointer">Facebook</span>
                    <span className="hover:text-blue-600 cursor-pointer">Instagram</span>
                    <span className="hover:text-blue-600 cursor-pointer">LinkedIn</span>
                </div>
            </div>
        </footer>
    );
}