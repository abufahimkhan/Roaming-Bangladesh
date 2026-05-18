import type { Metadata } from 'next';
import { inter, display, jetbrainsMono } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'AeroPulse | Next-Gen Flight Booking',
  description: 'Experience the future of travel with AeroPulse.',
};

export default function RootLayout(props: Readonly<{ children: React.ReactNode }>) {
  const { children } = props;

  return (
    <html lang="en">
      <body className={`${inter.variable} ${display.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#f6fbff] text-slate-900 relative overflow-x-hidden`} suppressHydrationWarning>
        <div className="site-atmosphere" aria-hidden>
          <div className="aurora a1" />
          <div className="aurora a2" />
          <div className="aurora a3" />
          <div className="aircraft p1" />
          <div className="aircraft p2" />
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
