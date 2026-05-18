'use client';

import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <>
            <AnimatePresence mode="wait">
                <motion.div
                    key={pathname}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>

            <RouteTransitionLoader key={pathname} />
        </>
    );
}

function RouteTransitionLoader() {
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const timer = window.setTimeout(() => setShowLoader(false), 700);
        return () => window.clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {showLoader && (
                <motion.div
                    className="route-loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    <div className="relative grid place-items-center">
                        <div className="loader-core" />
                        <div className="loader-plane" />
                        <div className="loader-label">Preparing Journey</div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
