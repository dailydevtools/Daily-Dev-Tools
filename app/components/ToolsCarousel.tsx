"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Tool } from "../data/tools";
import ToolIcon from "./ToolIcon";
import { useTranslations } from "next-intl";
import MotionCard from "./ui/MotionCard";

interface ToolsCarouselProps {
    tools: Tool[];
}

export default function ToolsCarousel({ tools }: ToolsCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const tTools = useTranslations('Tools');
    const t = useTranslations('Homepage');

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        checkScroll();

        let timeoutId: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(checkScroll, 100);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(timeoutId);
        };
    }, [tools]);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.8; // Scroll 80% of width
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
            setTimeout(checkScroll, 300);
        }
    };

    return (
        <div className="relative group/carousel-group w-full">
            {/* Scroll Container */}
            <div
                ref={scrollRef}
                onScroll={checkScroll}
                className="flex gap-4 pt-8 pb-8 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
                {tools.map((tool) => (
                    <Link
                        key={tool.id}
                        href={`/tools/${tool.id}`}
                        className="flex-shrink-0 snap-start min-w-[85%] md:min-w-[calc(50%-8px)] lg:min-w-[calc(33.333%-11px)] block no-underline"
                    >
                        <MotionCard className="p-5 flex items-center gap-4 bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] text-[var(--foreground)] h-full">
                            <div className="w-12 h-12 flex items-center justify-center bg-[#f973161a] text-[#fb923c] rounded-xl border border-[#f9731633] transition-transform duration-300 group-hover:scale-110">
                                <ToolIcon name={tool.icon} size={24} className="text-[#fb923c]" />
                            </div>
                            <div className="text-start">
                                <span className="text-[var(--muted-text)] text-[11px] uppercase tracking-[0.5px] font-semibold block mb-0.5">{t(`categories.${tool.category}`, { fallback: tool.category })}</span>
                                <span className="text-[var(--title-color)] font-heading text-base font-semibold block truncate">
                                    {tTools(`${tool.id}.name`, { fallback: tool.name })}
                                </span>
                            </div>
                        </MotionCard>
                    </Link>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={`absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--title-color)] flex items-center justify-center z-10 shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all duration-200 ${canScrollLeft ? "cursor-pointer opacity-100" : "cursor-not-allowed opacity-30"}`}
                aria-label="Previous items"
            >
                <ChevronLeft size={20} aria-hidden="true" />
            </button>

            <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={`absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--title-color)] flex items-center justify-center z-10 shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all duration-200 ${canScrollRight ? "cursor-pointer opacity-100" : "cursor-not-allowed opacity-30"}`}
                aria-label="Next items"
            >
                <ChevronRight size={20} aria-hidden="true" />
            </button>
        </div>
    );
}
