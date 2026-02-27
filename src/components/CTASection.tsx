'use client';

import { FaPlus } from 'react-icons/fa6';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        <div className="relative card-color2 rounded-3xl p-8 sm:p-20 text-center shadow-2xl border border-blue-500/20 overflow-hidden z-20">
          {/* Glow */}
          <div className="absolute -bottom-50 left-1/2 -translate-x-1/2 h-96 w-[140%] rounded-full bg-gradient-to-t from-purple-600 via-blue-500 to-transparent opacity-70 blur-3xl z-0" />
          <div className="absolute -bottom-60 left-1/2 -translate-x-1/2 h-80 w-[120%] rounded-full bg-gradient-to-t from-blue-500 via-blue-400 to-transparent opacity-60 blur-3xl z-0" />

          <div className="relative z-30">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-fill-color mb-5">
              Have a Crypto Community?
            </h2>

            <p className="text-fill-color/60 text-base sm:text-xl max-w-3xl mx-auto mb-8 sm:mb-10">
              List it on the NWW Directory and reach thousands of users every day looking for active, reliable, and growing crypto communities. Free and fast to join.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <a
                href="https://t.me/nekowawolf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 sm:px-8 sm:py-4 bg-white text-blue-500 font-bold text-sm sm:text-lg rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <FaPlus className="text-xs sm:text-sm" />
                Submit Your Community
              </a>

              <Link
                href="/submission-rules"
                className="px-5 py-3 card-color border border-gray-500/50 sm:px-8 sm:py-4 font-bold text-sm sm:text-lg rounded-lg sm:rounded-xl hover:bg-white/10 text-fill-color cursor-pointer flex items-center justify-center"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}