'use client';

import { useState } from "react";
import { FaShieldHalved, FaBolt } from 'react-icons/fa6';
import BlurText from "./ui/Blur-text";
import { motion } from "motion/react";

export default function WhyUs() {

    const [title1Complete, setTitle1Complete] = useState(false);
    const [title2Complete, setTitle2Complete] = useState(false);

    return (
        <section id="whyus" className="py-24 body-color relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-900/5 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">

                <div className="space-y-3 sm:space-y-5">

                    {/* TITLE */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-fill-color leading-tight">
                        <BlurText
                            text="Curated Quality"
                            delay={150}
                            onAnimationComplete={() => setTitle1Complete(true)}
                        />
                        <span className="text-blue-400">
                            <BlurText
                                text="Zero Scam Links"
                                delay={150}
                                start={title1Complete}
                                onAnimationComplete={() => setTitle2Complete(true)}
                            />
                        </span>
                    </h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={title2Complete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="space-y-6 sm:space-y-8"
                    >
                        <p className="text-fill-color/60 text-base sm:text-lg leading-relaxed">
                            We manually verify every community link submitted to our directory.
                            Nww isn't just a list; it's a gateway to safe, high-value crypto interactions.
                        </p>

                        <div className="space-y-4 sm:space-y-6 pt-2 sm:pt-4">
                            <div className="flex gap-3 sm:gap-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 text-xl sm:text-2xl shrink-0">
                                    <FaShieldHalved />
                                </div>
                                <div>
                                    <h4 className="text-fill-color font-extrabold text-base sm:text-lg">Verified Safety</h4>
                                    <p className="text-fill-color/60 text-xs sm:text-sm">
                                        Every Discord and Telegram link is checked for authenticity.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3 sm:gap-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 text-xl sm:text-2xl shrink-0">
                                    <FaBolt />
                                </div>
                                <div>
                                    <h4 className="text-fill-color font-extrabold text-base sm:text-lg">Real-Time Updates</h4>
                                    <p className="text-fill-color/60 text-xs sm:text-sm">
                                        Dead links are purged weekly. Always fresh.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>

                <div className="relative">
                    <div className="absolute inset-0 bg-blue-500 blur-[100px] opacity-20" />
                    <div className="relative card-color2 border border-[var(--border-color)] rounded-2xl p-5 sm:p-8 shadow-2xl skew-y-2 sm:skew-y-3 hover:skew-y-0 transition-transform duration-500 scale-[0.92] sm:scale-100">
                        <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 border-b border-[var(--border-color)] pb-4 sm:pb-6">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-700 animate-pulse" />
                            <div className="space-y-1 sm:space-y-2">
                                <div className="h-3 sm:h-4 w-28 sm:w-32 bg-gray-700 rounded animate-pulse" />
                                <div className="h-2.5 sm:h-3 w-16 sm:w-20 bg-gray-800 rounded animate-pulse" />
                            </div>
                            <div className="ml-auto px-2 sm:px-3 py-0.5 sm:py-1 bg-green-500/20 text-green-500 text-[10px] sm:text-xs font-extrabold rounded-full">
                                VERIFIED
                            </div>
                        </div>

                        <div className="space-y-2 sm:space-y-3">
                            <div className="h-2.5 sm:h-3 w-full bg-gray-800 rounded animate-pulse" />
                            <div className="h-2.5 sm:h-3 w-5/6 bg-gray-800 rounded animate-pulse" />
                        </div>

                        <div className="mt-6 sm:mt-8 flex gap-3">
                            <div className="h-8 sm:h-10 w-full bg-blue-600/20 rounded-lg animate-pulse" />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}