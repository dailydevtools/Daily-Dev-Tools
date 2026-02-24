"use client";

import { useMemo } from "react";
import { tools } from "../data/tools";
import ToolIcon from "./ToolIcon";

interface Bubble {
    id: string;
    name: string;
    icon: string;
    x: number;
    y: number;
    size: number;
    opacity: number;
    duration: number;
    delay: number;
}

interface FloatingBubblesProps {
    count?: number;
}

export default function FloatingBubbles({ count = 15 }: FloatingBubblesProps) {
    const bubbles = useMemo<Bubble[]>(() => {
        // Shuffle and pick random tools
        const shuffled = [...tools].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, count);

        return selected.map((tool, index) => ({
            id: tool.id,
            name: tool.name,
            icon: tool.icon,
            // Position across the full width, avoiding center (40-60%)
            x: index < count / 2
                ? Math.random() * 35 + 2   // Left side: 2-37%
                : Math.random() * 35 + 63, // Right side: 63-98%
            // Position across the full height
            y: Math.random() * 80 + 10, // 10-90%
            // Vary bubble sizes
            size: Math.random() * 20 + 70, // 70-90px
            // Vary opacity for depth
            opacity: Math.random() * 0.3 + 0.15, // 0.15-0.45
            // Vary animation duration for organic feel
            duration: Math.random() * 4 + 6, // 6-10s
            // Stagger animation start
            delay: Math.random() * 5, // 0-5s
        }));
    }, [count]);

    return (
        <div
            className="absolute inset-0 overflow-hidden pointer-events-none z-0"
            aria-hidden="true"
        >
            {bubbles.map((bubble) => (
                <div
                    key={bubble.id}
                    className="absolute flex items-center gap-2 px-3 py-2 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-sm motion-safe:animate-float-bubble motion-reduce:animate-none"
                    style={{
                        left: `${bubble.x}%`,
                        top: `${bubble.y}%`,
                        opacity: bubble.opacity,
                        animationDuration: `${bubble.duration}s`,
                        animationDelay: `${bubble.delay}s`,
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <div
                        className="flex items-center justify-center rounded-md bg-[#f973161a] text-[#fb923c]"
                        style={{
                            width: bubble.size * 0.28,
                            height: bubble.size * 0.28,
                        }}
                    >
                        <ToolIcon
                            name={bubble.icon}
                            size={Math.round(bubble.size * 0.18)}
                            className="text-[#fb923c]"
                        />
                    </div>
                    <span
                        className="text-[var(--muted-text)] font-medium whitespace-nowrap"
                        style={{ fontSize: `${bubble.size * 0.14}px` }}
                    >
                        {bubble.name}
                    </span>
                </div>
            ))}
        </div>
    );
}
