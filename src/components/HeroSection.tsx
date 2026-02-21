'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { TypeAnimation } from 'react-type-animation';
import { FaTelegram, FaMagnifyingGlass, FaFacebook, FaReddit } from 'react-icons/fa6';
import { BsDiscord } from 'react-icons/bs';

const LANGUAGES = [
  "Communities",
  "コミュニティ",
  "社区",
  "커뮤니티",
  "Komunitas",
  "Cộng đồng",
  "समुदाय",
];

export default function HeroSection() {
  const router = useRouter();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [firstLineDone, setFirstLineDone] = useState(false);
  const [secondLineDone, setSecondLineDone] = useState(false);
  const [isTypewriterDone, setIsTypewriterDone] = useState(false);
  const [badgeText, setBadgeText] = useState(LANGUAGES[0]);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    if (!searchValue.trim()) return;
    const val = searchValue.toLowerCase();

    if (val.includes("trading")) {
      router.push(`/community?category=Trading`);
    } else if (val.includes("nft")) {
      router.push(`/community?category=NFT`);
    } else if (val.includes("airdrop")) {
      router.push(`/community?category=Airdrop`);
    } else if (val.includes("web3")) {
      router.push(`/community?category=Web3 Jobs`);
    } else if (val.includes("developers")) {
      router.push(`/community?category=Developers`);
    } else {
      router.push(`/community?search=${encodeURIComponent(searchValue)}`);
    }
  };

  const firstSequence = useMemo(() => [
    "Discover Trusted",
    () => setFirstLineDone(true),
  ], []);

  const secondSequence = useMemo(() => [
    "Crypto Communities",
    () => setSecondLineDone(true),
  ], []);

  useEffect(() => {
    if (document.readyState === 'complete') {
      setPageLoaded(true);
    } else {
      const handleLoad = () => setPageLoaded(true);
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  useEffect(() => {
    if (!isTypewriterDone) return;

    let interval: NodeJS.Timeout;
    let currentIndex = 0;

    const cycleLanguage = () => {
      const nextIndex = (currentIndex + 1) % LANGUAGES.length;
      const targetText = LANGUAGES[nextIndex];
      const currentText = LANGUAGES[currentIndex];

      let scrambleIterations = 0;
      const maxIterations = 15;

      const scrambleInterval = setInterval(() => {
        scrambleIterations++;

        if (scrambleIterations >= maxIterations) {
          clearInterval(scrambleInterval);
          setBadgeText(targetText);
          currentIndex = nextIndex;
        } else {
          const progress = scrambleIterations / maxIterations;
          const length = Math.floor(
            currentText.length +
            (targetText.length - currentText.length) * progress
          );

          let scrambled = '';
          const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

          for (let i = 0; i < length; i++) {
            if (Math.random() < progress) {
              scrambled += targetText[i] || '';
            } else {
              scrambled += chars[Math.floor(Math.random() * chars.length)];
            }
          }

          setBadgeText(scrambled);
        }
      }, 60);
    };

    interval = setInterval(cycleLanguage, 3000);
    return () => clearInterval(interval);
  }, [isTypewriterDone]);

  useEffect(() => {
    if (secondLineDone) {
      setIsTypewriterDone(true);
    }
  }, [secondLineDone]);

  return (
    <section className="relative pt-40 pb-20 px-6 sm:px-10 overflow-hidden min-h-[85vh] flex flex-col items-center justify-center">

      {/* Background Grid */}
      <div className="absolute inset-0 z-0">
        <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-blue-500/50"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* Floating Badge */}
      <motion.div
        initial={false}
        animate={{ opacity: isTypewriterDone ? 1 : 0, y: isTypewriterDone ? 0 : 20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`mb-4 relative z-10 text-center max-w-5xl mx-auto ${!isTypewriterDone ? 'pointer-events-none select-none' : ''}`}
      >
        <div className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase">
          <span className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-blue-400 opacity-75 animate-ping" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500" />
          <span>120+ {badgeText}</span>
        </div>
      </motion.div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">

        {/* Main Headline */}
        <div className="relative inline-block">

          {/* Glow */}
          <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
            <div className="w-[650px] h-[420px] rounded-full bg-blue-500/20 blur-[130px] animate-pulse" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-fill-color leading-tight min-h-[120px] sm:min-h-[160px]">

            {/* LINE 1 */}
            <span className="inline-block relative">
              {pageLoaded && (
                <TypeAnimation
                  sequence={firstSequence}
                  speed={25}
                  cursor={false}
                  wrapper="span"
                  className="inline"
                />
              )}
              {!firstLineDone && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  className="inline-block w-[3px] sm:w-[4px] h-[0.85em] bg-gradient-to-b from-blue-300 to-blue-400 ml-2 align-baseline"
                />
              )}
            </span>

            <br />

            {/* LINE 2 */}
            <span className="text-blue-400 inline-block relative">
              {!firstLineDone ? (
                <span className="opacity-0 pointer-events-none select-none inline-block">
                  Crypto Communities
                </span>
              ) : (
                <>
                  <TypeAnimation
                    sequence={secondSequence}
                    speed={25}
                    cursor={false}
                    wrapper="span"
                    className="inline"
                  />
                  {!secondLineDone && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      className="inline-block w-[3px] sm:w-[4px] h-[0.85em] bg-gradient-to-b from-blue-300 to-blue-400 ml-2 align-baseline"
                    />
                  )}
                </>
              )}
            </span>

          </h1>

          {/* Sub-headline */}
          <motion.p
            initial={false}
            animate={{ opacity: isTypewriterDone ? 1 : 0, y: isTypewriterDone ? 0 : 20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`sm:mt-6 -mt-2 text-base sm:text-lg text-fill-color/70 max-w-xl mx-auto font-normal ${!isTypewriterDone ? 'pointer-events-none select-none' : ''}`}
          >
            Explore curated{' '}
            <span className="text-blue-400 font-medium">trading groups</span>,{' '}
            <span className="text-blue-400 font-medium">developer hubs</span>,{' '}
            <span className="text-blue-400 font-medium">airdrop communities</span>, and{' '}
            <span className="text-blue-400 font-medium">NFT communities</span> — all in one place.
          </motion.p>

        </div>

        {/* Search Bar */}
        <motion.div
          initial={false}
          animate={{ opacity: isTypewriterDone ? 1 : 0, y: isTypewriterDone ? 0 : 20 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className={`max-w-xl mx-auto mt-18 relative group ${!isTypewriterDone ? 'pointer-events-none select-none' : ''}`}
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
          <div className="relative flex items-center card-color2 rounded-xl border border-color p-2 shadow-2xl">
            <FaMagnifyingGlass className="text-gray-500 ml-4 text-xl" />
            <input
              type="text"
              placeholder="Search trading, NFT, or developer communities..."
              className="w-full bg-transparent text-fill-color px-4 py-3 focus:outline-none placeholder-gray-500"
              disabled={!isTypewriterDone}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              disabled={!isTypewriterDone}
              onClick={handleSearch}
              className="bg-blue-500 text-white font-bold px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer disabled:opacity-50"
            >
              Search
            </button>
          </div>
        </motion.div>

        {/* Social Proof Icons */}
        <motion.div
          initial={false}
          animate={{ opacity: isTypewriterDone ? 1 : 0, y: isTypewriterDone ? 0 : 20 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className={`pt-13 flex flex-col sm:flex-row items-center justify-center gap-3 text-gray-500 ${!isTypewriterDone ? 'pointer-events-none' : ''}`}
        >
          <span className="text-xs font-semibold uppercase tracking-widest mr-0 sm:mr-3">
            Trusted Networks only
          </span>
          <div className="flex gap-3">
            <BsDiscord className="text-lg sm:text-xl hover:text-[#5865F2] transition-colors cursor-pointer" />
            <FaTelegram className="text-lg sm:text-xl hover:text-[#24A1DE] transition-colors cursor-pointer" />
            <FaFacebook className="text-lg sm:text-xl hover:text-[#1877F2] transition-colors cursor-pointer" />
            <FaReddit className="text-lg sm:text-xl hover:text-[#FF4500] transition-colors cursor-pointer" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}