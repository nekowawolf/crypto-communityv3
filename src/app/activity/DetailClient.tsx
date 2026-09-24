'use client';

import Link from "next/link";
import NwwOneeAIChat from "@/components/NwwOneeAIChat";
import LastCommunities from "@/components/LastCommunities";
import Support from "@/components/Support";

export default function DetailClient() {
  return (
    <main className="flex-grow pt-36 pb-16 min-h-screen body-color text-fill-color px-4 sm:px-8 font-sans">
      <div className="w-full max-w-3xl mx-auto flex flex-col">
        <LastCommunities />
        <Support />
      </div>
      <NwwOneeAIChat />
    </main>
  );
}