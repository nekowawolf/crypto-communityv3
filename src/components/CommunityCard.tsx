'use client';

import { useState } from 'react';
import { FallbackImage } from './FallbackImage';
import { CommunityItem } from '@/types/community';
import { chatStore } from '@/components/NwwOneeAIChat';
import { CiBookmark } from "react-icons/ci";
import { FaTimes } from 'react-icons/fa';

export default function CommunityCard({ item }: { item: CommunityItem }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div
                onClick={() => setIsOpen(true)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsOpen(true);
                    }
                }}
                role="button"
                tabIndex={0}
                className="glass-card rounded-2xl overflow-hidden flex flex-col h-full card-hover transition-all cursor-pointer relative group hover:border-blue-500/40"
            >
            {/* Banner */}
            <div className="relative w-full h-32 bg-gradient-to-br from-blue-600/20 via-blue-500/10 to-purple-600/10 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <FallbackImage
                        src={item.image_url?.trim()}
                        alt={item.name}
                        className="w-20 h-20 rounded-2xl object-cover border-2 border-[var(--border-color)] shadow-lg"
                        width={80}
                        height={80}
                    />
                </div>
                {/* Platform badge */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {item.platforms && (
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-black/30 backdrop-blur-sm text-white/90 font-semibold uppercase tracking-wider">
                            {item.platforms}
                        </span>
                    )}
                </div>
                {/* Bookmark */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        chatStore.setIsOpen(true);
                        chatStore.setActiveView('user');
                    }}
                    className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-[rgba(var(--fill-color-rgb),0.06)] border border-color text-fill-color opacity-70 hover:opacity-100 hover:!bg-blue-500/20 hover:!text-blue-400 hover:!border-blue-500/40 transition-all cursor-pointer"
                    title="Bookmark"
                >
                    <CiBookmark className="w-[16px] h-[16px]" />
                </button>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-fill-color leading-tight truncate pr-2 group-hover:text-blue-400 transition-colors">
                        {item.name}
                    </h3>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                    {item.category && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                            {item.category}
                        </span>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 mt-auto pt-4 border-t border-[rgba(var(--fill-color-rgb),0.08)]">
                    <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="shrink-0 px-4 py-1.5 rounded-full text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20"
                    >
                        Join Now
                    </a>
                </div>
            </div>

            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 cursor-pointer"
                    onClick={() => setIsOpen(false)}
                    role="presentation"
                >
                    <div
                        className="glass-card rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-color shadow-2xl relative cursor-auto"
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={`community-title-${item._id}`}
                    >
                        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                            <button
                                onClick={() => {
                                    chatStore.setIsOpen(true);
                                    chatStore.setActiveView('user');
                                }}
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-[rgba(var(--fill-color-rgb),0.06)] border border-color text-fill-color opacity-70 hover:opacity-100 hover:!bg-blue-500/20 hover:!text-blue-400 hover:!border-blue-500/40 transition-all cursor-pointer"
                                title="Bookmark"
                            >
                                <CiBookmark className="w-[18px] h-[18px]" />
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-9 h-9 flex items-center justify-center rounded-full bg-[rgba(var(--fill-color-rgb),0.06)] border border-color text-fill-color opacity-70 hover:opacity-100 transition-all cursor-pointer"
                                aria-label="Close community details"
                            >
                                <FaTimes size={14} />
                            </button>
                        </div>

                        <div className="p-6 sm:p-8">
                            <div className="flex items-center gap-4 mb-6 pr-20">
                                <div className="w-20 h-20 relative rounded-xl overflow-hidden bg-card-color2 shrink-0 border border-color shadow-sm">
                                    <FallbackImage
                                        src={item.image_url?.trim()}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="min-w-0">
                                    <h2
                                        id={`community-title-${item._id}`}
                                        className="text-2xl font-bold text-fill-color leading-tight break-words"
                                    >
                                        {item.name}
                                    </h2>
                                    {item.category && (
                                        <span className="inline-flex mt-2 text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                            {item.category}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h4 className="text-sm font-semibold text-fill-color/50 mb-2 uppercase tracking-wider">
                                    Platforms
                                </h4>
                                <span className="inline-flex text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
                                    {item.platforms || 'Community platform'}
                                </span>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-[rgba(var(--fill-color-rgb),0.08)]">
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-1.5 rounded-full text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20"
                                >
                                    Join Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}