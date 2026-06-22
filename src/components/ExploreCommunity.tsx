"use client";

import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import { FadeIn } from "./ui/fade-in";

const ExploreCommunity = () => {
  return (
    <section className="relative w-full pt-24 pb-42 flex flex-col items-center justify-center overflow-hidden bg-body-color">

      {/* Curved background arc */}
      <div className="absolute bottom-[-720px] left-1/2 -translate-x-1/2 w-[200%] sm:w-[130%] h-[1000px] rounded-[300%] bg-body-color border-t-2 border-blue-500/60 shadow-[0_-20px_80px_rgba(59,130,246,0.3)] z-0" />

      {/* Center glow */}
      <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[60%] h-[400px] bg-blue-600/15 blur-[120px] rounded-full z-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center flex flex-col items-center px-4 max-w-4xl mx-auto pt-10">
        <FadeIn viewport={{ once: true, margin: "-100px" }}>
          <h2 className="text-3xl sm:text-4xl md:text-7xl font-extrabold text-fill-color tracking-tight leading-tight mb-20">
            Build and connect with <br />
            <span className="text-blue-400">crypto communities</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2} className="relative" viewport={{ once: true, margin: "-100px" }}>
          <Link
            href="/directory"
            className="group relative inline-flex items-center gap-2 
            px-6 py-3 text-sm 
            sm:px-8 sm:py-3.5 sm:text-base
            md:px-10 md:py-4 md:text-lg
            bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold
            transition-all duration-300
            shadow-[0_0_16px_rgba(37,99,235,0.4)] 
            hover:shadow-[0_0_32px_rgba(37,99,235,0.6)]"
          >
            Explore Now
            <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-2" />
          </Link>

          {/* Button glow */}
          <div className="absolute -inset-4 bg-blue-500/20 blur-xl rounded-full -z-10 transition-colors group-hover:bg-blue-500/40" />
        </FadeIn>
      </div>
    </section>
  );
};

export default ExploreCommunity;