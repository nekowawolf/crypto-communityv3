import type { Metadata } from "next";
import { communityMetadata } from "@/constants/metadataTemplates";
import { FaTelegram, FaUsers, FaTag, FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = communityMetadata(
    "Submission Rules",
    "Guidelines and rules for submitting your crypto community to the NWW Directory."
);

export default function SubmissionRulesPage() {
    return (
        <div className="min-h-screen body-color text-fill-color overflow-x-hidden selection:bg-blue-500/30">
            <Header />

            <main className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 md:px-10">
                <div className="max-w-4xl mx-auto relative z-10">

                    {/* Header Section */}
                    <div className="text-center mb-6 relative">
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-fill-color mb-4 sm:mb-6 inline-block relative leading-tight">
                            <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
                                <div className="w-[220px] sm:w-[300px] h-[120px] sm:h-[150px] rounded-full bg-blue-500/20 blur-[80px]" />
                            </div>
                            Submission <span className="text-blue-400">Rules</span>
                        </h1>
                    </div>

                    {/* Rules Container */}
                    <div className="card-color2 rounded-3xl p-5 sm:p-8 md:p-12 border border-blue-500/20 shadow-2xl relative overflow-hidden">
                        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl z-0" />
                        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl z-0" />

                        <div className="relative z-10 space-y-10 sm:space-y-12">

                            {/* Step 1 */}
                            <section>
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-fill-color flex items-center gap-3 mb-4 sm:mb-6">
                                    <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-500/20 text-blue-400 text-sm sm:text-lg">1</span>
                                    How to Submit
                                </h2>
                                <div className="pl-9 sm:pl-11 space-y-3 sm:space-y-4 text-fill-color/80 text-sm sm:text-base md:text-lg leading-relaxed">
                                    <p className="text-fill-color/80">
                                        Submitting your community is simple and straightforward. Just reach out to our admin on Telegram by clicking the <span className="font-semibold text-fill-color">&quot;Submit Your Community&quot;</span> button below or on our homepage.
                                    </p>
                                    <p className="text-fill-color/80">
                                        Provide us with your community link and a brief description. We will manually verify your community to ensure it meets our quality standards before listing it on the platform.
                                    </p>
                                </div>
                            </section>

                            <hr className="border-gray-500/20" />

                            {/* Step 2 */}
                            <section>
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-fill-color flex items-center gap-3 mb-4 sm:mb-6">
                                    <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-500/20 text-blue-400 text-sm sm:text-lg">2</span>
                                    Minimum Requirements
                                </h2>
                                <div className="pl-9 sm:pl-11 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="card-color p-5 sm:p-6 rounded-2xl border border-gray-500/30">
                                        <FaUsers className="text-2xl sm:text-3xl text-blue-400 mb-3 sm:mb-4" />
                                        <h3 className="text-lg sm:text-xl font-bold text-fill-color mb-2">Member Count</h3>
                                        <p className="text-fill-color/70 text-sm sm:text-base leading-relaxed">
                                            Your community must have a minimum of <strong className="text-fill-color">100 members</strong> to be considered for listing.
                                        </p>
                                    </div>
                                    <div className="card-color p-5 sm:p-6 rounded-2xl border border-gray-500/30">
                                        <FaTag className="text-2xl sm:text-3xl text-green-400 mb-3 sm:mb-4" />
                                        <h3 className="text-lg sm:text-xl font-bold text-fill-color mb-2">Cost</h3>
                                        <p className="text-fill-color/70 text-sm sm:text-base leading-relaxed">
                                            Listing your community on the NWW Directory is absolutely <strong className="text-green-400">100% Free</strong>. We will never ask for payment to list your authentic community.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <hr className="border-gray-500/20" />

                            {/* Step 3 */}
                            <section>
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-fill-color flex items-center gap-3 mb-4 sm:mb-6">
                                    <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-500/20 text-blue-400 text-sm sm:text-lg">3</span>
                                    Accepted Categories
                                </h2>
                                <div className="pl-9 sm:pl-11">
                                    <p className="text-sm sm:text-base md:text-lg text-fill-color/80 mb-5 sm:mb-6 leading-relaxed">
                                        We exclusively list crypto-related communities to maintain our directory&apos;s standard and relevance for users.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5 sm:p-6">
                                            <h3 className="text-lg sm:text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                                                <FaCircleCheck /> We Accept
                                            </h3>
                                            <ul className="space-y-2 sm:space-y-3 text-fill-color/80 text-sm sm:text-base">
                                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Airdrop Hunters</li>
                                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-400" /> NFT Projects & Collectors</li>
                                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Web3 Developers</li>
                                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Crypto Trading & Discussions</li>
                                            </ul>
                                        </div>

                                        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5 sm:p-6">
                                            <h3 className="text-lg sm:text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                                                <FaCircleXmark /> We Reject
                                            </h3>
                                            <ul className="space-y-2 sm:space-y-3 text-fill-color/80 text-sm sm:text-base">
                                                <li className="flex items-start gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                                                    <span>Any community unrelated to Crypto, Web3, or Blockchain.</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                                                    <span>Communities with fewer than 100 members.</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                                                    <span>Spam or scam-oriented groups.</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </section>

                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-12 sm:mt-16 text-center">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-fill-color mb-5 sm:mb-6">
                            Ready to get listed?
                        </h2>
                        <a
                            href="https://t.me/nekowawolf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-500 font-bold text-base sm:text-lg rounded-xl hover:bg-gray-100 transition-colors shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] cursor-pointer max-w-full"
                        >
                            <FaTelegram className="text-xl sm:text-2xl" />
                            <span>Submit via Telegram</span>
                        </a>
                        <p className="mt-4 sm:mt-5 text-fill-color/60 text-xs sm:text-sm">
                            You will be redirected to our admin&apos;s Telegram (@nekowawolf)
                        </p>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}