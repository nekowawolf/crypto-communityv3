'use client';

import { FaCode, FaChartLine, FaParachuteBox, FaArrowRight } from 'react-icons/fa6';
import { RiNftFill } from "react-icons/ri";
import { FadeIn } from "./ui/fade-in";
import Link from 'next/link';

const categories = [
    {
        icon: FaChartLine,
        name: 'Trading & Signals',
        description: 'Master the markets with real-time insights and expert signals.',
        href: '/directory?category=Trading'
    },
    {
        icon: FaParachuteBox,
        name: 'Airdrop Hunters',
        description: 'Find the next big opportunity before anyone else.',
        href: '/directory?category=Airdrop'
    },
    {
        icon: RiNftFill,
        name: 'NFT',
        description: 'Collect, trade, and explore unique digital assets.',
        href: '/directory?category=NFT'
    },
    {
        icon: FaCode,
        name: 'Developers',
        description: 'Build the future of Web3 with our developer community.',
        href: '/directory?category=Developers'
    },
];

export default function CategoryGrid() {
    return (
        <section id="explore" className="py-20 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <FadeIn>
                    <h2 className="text-3xl sm:text-5xl font-extrabold text-fill-color mb-4">
                        Explore Communities
                    </h2>
                </FadeIn>
                <FadeIn delay={0.2}>
                    <p className="text-base sm:text-lg text-fill-color/60 max-w-2xl mx-auto">
                        Join the most active groups in the crypto space.
                    </p>
                </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {categories.map((cat, idx) => (
                    <FadeIn
                        key={idx}
                        delay={0.1 * idx}
                        className="group relative cursor-pointer overflow-hidden rounded-2xl p-7 border border-[rgba(var(--fill-color-rgb),0.05)] bg-gradient-to-br from-blue-500/10 to-cyan-500/5 backdrop-blur-sm hover:scale-[1.02] transition-all duration-300 shadow-xl"
                    >
                        {/* Content */}
                        <Link href={cat.href} className="relative z-10 flex flex-col h-full cursor-pointer">
                            <div className="text-3xl text-blue-400 mb-5">
                                <cat.icon />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-fill-color mb-3">
                                {cat.name}
                            </h3>
                            <p className="text-fill-color/70 mb-8 leading-relaxed text-sm sm:text-base flex-grow">
                                {cat.description}
                            </p>

                            <div>
                                <span className="flex w-fit cursor-pointer items-center gap-2 px-5 py-2.5 rounded-xl bg-[rgba(var(--fill-color-rgb),0.05)] border border-[rgba(var(--fill-color-rgb),0.1)] text-fill-color font-semibold text-sm transition-all hover:bg-blue-500/20 group-hover:border-[rgba(var(--fill-color-rgb),0.2)]">
                                    Explore
                                    <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                                </span>
                            </div>
                        </Link>

                        {/* Watermark Icon */}
                        <div className="absolute -bottom-6 -right-6 text-8xl text-fill-color opacity-[0.03] transform rotate-12 pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                            <cat.icon />
                        </div>
                    </FadeIn>
                ))}
            </div>
        </section>
    );
}