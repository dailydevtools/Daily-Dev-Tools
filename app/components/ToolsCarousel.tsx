"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Tool } from "../data/tools";
import ToolIcon from "./ToolIcon";

interface ToolsCarouselProps {
    tools: Tool[];
}

export default function ToolsCarousel({ tools }: ToolsCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
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
        <div style={{ position: "relative", group: "carousel-group" } as any}>
            {/* Scroll Container */}
            <div
                ref={scrollRef}
                onScroll={checkScroll}
                className="no-scrollbar"
                style={{
                    display: "flex",
                    gap: 16,
                    overflowX: "auto",
                    scrollSnapType: "x mandatory",
                    padding: "4px 0",
                }}
            >
                {tools.map((tool) => (
                    <Link
                        key={tool.id}
                        href={`/tools/${tool.id}`}
                        className="glass-card flex-shrink-0 snap-start min-w-[85%] md:min-w-[calc(50%-8px)] lg:min-w-[calc(33.333%-11px)]"
                        style={{
                            padding: "20px",
                            display: "flex",
                            alignItems: "center",
                            gap: 16,
                            textDecoration: "none",
                            border: "1px solid var(--border-color)",
                            background: "var(--card-bg)",
                            scrollSnapAlign: "start",
                            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                        }}
                    >
                        <div
                            className="icon-box-primary"
                            style={{
                                width: 48,
                                height: 48,
                            }}
                        >
                            <ToolIcon name={tool.icon} size={24} style={{ color: '#fb923c' }} />
                        </div>
                        <div className="text-start">
                            <span style={{ color: "var(--muted-text)", fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600, display: 'block', marginBottom: 2 }}>{tool.category}</span>
                            <span style={{ color: "var(--title-color)", fontSize: 16, fontWeight: 600, display: 'block' }}>
                                {tool.name}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                style={{
                    position: "absolute",
                    left: -20,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    background: "var(--card-bg)",
                    border: "1px solid var(--border-color)",
                    color: "var(--title-color)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: canScrollLeft ? "pointer" : "not-allowed",
                    zIndex: 10,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                    opacity: canScrollLeft ? 1 : 0.3,
                    transition: "all 0.2s"
                }}
            >
                <ChevronLeft size={20} />
            </button>

            <button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                style={{
                    position: "absolute",
                    right: -20,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    background: "var(--card-bg)",
                    border: "1px solid var(--border-color)",
                    color: "var(--title-color)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: canScrollRight ? "pointer" : "not-allowed",
                    zIndex: 10,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                    opacity: canScrollRight ? 1 : 0.3,
                    transition: "all 0.2s"
                }}
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
}
