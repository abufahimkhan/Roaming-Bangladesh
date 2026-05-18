'use client';

import { motion } from 'motion/react';
import { Plane } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function SiteBackground(props: Readonly<{ theme: string }>) {
  const { theme } = props;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Animated plane 1 — large, slow, left to right */}
      <motion.div
        animate={{ x: ['-120px', 'calc(100vw + 120px)'], y: ['35vh', '30vh', '35vh'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="absolute top-0 left-0"
      >
        <Plane
          className={cn(
            'rotate-[35deg] drop-shadow-lg',
            theme === 'dark' ? 'text-blue-400/30' : 'text-blue-500/20'
          )}
          style={{ width: 64, height: 64 }}
        />
      </motion.div>

      {/* Animated plane 2 — small, fast, right to left, lower */}
      <motion.div
        animate={{ x: ['calc(100vw + 80px)', '-80px'], y: ['65vh', '68vh', '65vh'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear', delay: 6 }}
        className="absolute top-0 left-0"
      >
        <Plane
          className={cn(
            '-rotate-[145deg] drop-shadow-lg',
            theme === 'dark' ? 'text-orange-400/25' : 'text-orange-500/15'
          )}
          style={{ width: 40, height: 40 }}
        />
      </motion.div>

      {/* Animated plane 3 — medium, slow diagonal */}
      <motion.div
        animate={{ x: ['-60px', 'calc(100vw + 60px)'], y: ['80vh', '75vh', '80vh'] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear', delay: 14 }}
        className="absolute top-0 left-0"
      >
        <Plane
          className={cn(
            'rotate-[30deg]',
            theme === 'dark' ? 'text-cyan-400/20' : 'text-cyan-500/15'
          )}
          style={{ width: 48, height: 48 }}
        />
      </motion.div>

      {/* Floating orb — top right */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className={cn(
          'absolute top-20 right-20 w-80 h-80 rounded-full blur-3xl',
          theme === 'dark' ? 'bg-blue-600/10' : 'bg-blue-300/20'
        )}
      />

      {/* Floating orb — bottom left */}
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className={cn(
          'absolute bottom-40 left-10 w-64 h-64 rounded-full blur-3xl',
          theme === 'dark' ? 'bg-fuchsia-600/10' : 'bg-violet-300/20'
        )}
      />
    </div>
  );
}
