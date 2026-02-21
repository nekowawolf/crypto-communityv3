"use client";

import { useCommunity } from "@/hooks/useCommunity";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommunityCard from "@/components/CommunityCard";
import { Spinner } from "@/components/ui/spinner";
import Pagination from "@/components/Pagination";
import { Suspense } from "react";
import Image from "next/image";

const categories = [
    "Airdrop",
    "Trading",
    "All Types",
    "NFT",
    "Developers",
    "Social",
    "Web3 Jobs",
    "Meme Coin"
];

function CommunityContent() {
    const {
        communityData,
        loading,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        totalItems,
        error
    } = useCommunity();

    return (
        <>
            <Header />
            <div className="min-h-screen body-color text-fill-color p-8 pt-36 font-sans">
                <div className="max-w-6xl mx-auto flex flex-col items-center">
                    <div className="w-full max-w-2xl mb-8 text-center">
                        <h1 className="text-3xl font-bold mb-2">
                            NWW Community
                        </h1>
                        <p className="text-fill-color/70 max-w-md mx-auto">
                            Empowering builders, traders, and explorers to connect, share alpha, and thrive in the decentralized future.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="w-full max-w-xl mb-6 relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-fill-color/50">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search Project"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full py-3 pl-12 pr-6 rounded-full card-color border border-color focus:outline-none focus:border-blue-500 text-fill-color placeholder:text-fill-color/50"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap justify-center gap-2 mb-10">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedCategory === category
                                    ? "bg-blue-600 text-white"
                                    : "card-color text-fill-color/70 hover:text-fill-color border border-color"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Card List */}
                    {loading ? (
                        <div className="flex justify-center p-12">
                            <Spinner className="text-blue-500 size-10" />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4 w-full">
                            {error && (
                                <div className="text-red-500 text-center py-4 bg-red-500/10 rounded-lg border border-red-500/20">
                                    Error loading communities: {error}
                                </div>
                            )}

                            <div id="fillcommunity" className="w-full flex-col flex gap-4">
                                {communityData.length === 0 ? (
                                    <div className="text-center py-10">
                                        <Image
                                            src="https://nekowawolf.github.io/cdn-images/images/2026/1771661079_pixchan.png"
                                            alt="No data found"
                                            width={176}
                                            height={176}
                                            className="mx-auto"
                                        />
                                        <p className="text-gray-500 mt-4">No data available.</p>
                                    </div>
                                ) : (
                                    communityData.map((item) => (
                                        <CommunityCard key={item._id} item={item} />
                                    ))
                                )}
                            </div>

                            {communityData.length > 0 && (
                                <Pagination
                                    currentPage={currentPage}
                                    itemsPerPage={itemsPerPage}
                                    totalItems={totalItems}
                                    onPageChange={setCurrentPage}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default function CommunityPage() {
    return (
        <Suspense fallback={
            <div className="flex justify-center min-h-screen items-center">
                <Spinner className="text-blue-500 size-10" />
            </div>
        }>
            <CommunityContent />
        </Suspense>
    );
}