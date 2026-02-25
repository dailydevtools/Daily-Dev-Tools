"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRightLeft } from "lucide-react";

interface LiquidTabsProps {
    tabs: readonly string[]; // Labels for the tabs
    activeTab: string; // Currently active value
    onChange: (tab: any) => void; // Handler
    onSwap?: () => void; // Optional swap handler
    swapTitle?: string; // Tooltip for swap
    labels?: Record<string, string>; // Custom display labels
    icons?: Record<string, ReactNode>; // Icons for each tab
    variant?: "pill" | "inline"; // Visual variant
    className?: string;
}

export default function LiquidTabs({
    tabs,
    activeTab,
    onChange,
    onSwap,
    swapTitle = "Swap",
    labels,
    icons,
    variant = "pill",
    className = ""
}: LiquidTabsProps) {
    // Inline variant - compact style with glass effect for tool panels
    if (variant === "inline") {
        return (
            <div className={`inline-flex p-1 bg-[rgba(255,255,255,0.8)] dark:bg-[var(--card-bg)] rounded-lg backdrop-blur-xl border border-[var(--card-border)] shadow-sm relative items-center ${className}`}>
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => onChange(tab)}
                        className={`relative px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 z-10 outline-none select-none flex items-center gap-2
                            ${activeTab === tab ? 'text-[var(--foreground)]' : 'text-[var(--muted-text)] hover:text-[var(--foreground)]'}`}
                    >
                        {activeTab === tab && (
                            <motion.div
                                layoutId="active-inline-tab"
                                className="absolute inset-0 bg-[var(--tab-pill-active-bg)] rounded-md shadow-sm border border-[rgba(0,0,0,0.04)] dark:border-white/5"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                style={{ zIndex: -1 }}
                            />
                        )}
                        {icons?.[tab]}
                        <span className={labels?.[tab] ? "" : "capitalize"}>{labels?.[tab] || tab}</span>
                    </button>
                ))}
            </div>
        );
    }

    // Default pill variant - centered with glass effect
    return (
        <div className={`flex justify-center mb-10 text-center w-full ${className}`}>
            <div className="inline-flex p-1 bg-[rgba(255,255,255,0.8)] dark:bg-[var(--card-bg)] rounded-full backdrop-blur-xl border border-[var(--card-border)] shadow-sm relative items-center">
                {tabs.map((tab, i) => (
                    <div key={tab} className="flex items-center">
                        <button
                            onClick={() => onChange(tab)}
                            className={`relative px-8 py-2.5 text-sm font-medium rounded-full transition-colors duration-200 z-10 outline-none select-none flex items-center gap-2
                            ${activeTab === tab ? 'text-[var(--title-color)]' : 'text-[var(--muted-text)] hover:text-[var(--title-color)]'}`}
                        >
                            {activeTab === tab && (
                                <motion.div
                                    layoutId="active-tab-pill"
                                    className="absolute inset-0 bg-[var(--tab-pill-active-bg)] rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-[rgba(0,0,0,0.04)] dark:border-white/5"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    style={{ zIndex: -1 }}
                                />
                            )}
                            {icons?.[tab]}
                            <span className={labels?.[tab] ? "" : "capitalize"}>{labels?.[tab] || tab}</span>
                        </button>
                        {/* Render Swap Button between tabs (only after the first one) */}
                        {onSwap && i < tabs.length - 1 && (
                            <button
                                onClick={onSwap}
                                className="p-1.5 mx-1 text-[var(--muted-text)] hover:text-[#fb923c] rounded-full hover:bg-[var(--card-hover-bg)] transition-colors z-10 flex items-center justify-center cursor-pointer"
                                title={swapTitle}
                            >
                                <ArrowRightLeft size={16} />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

