"use client";


import Link from "next/link";
import { tools } from "../data/tools";
import ToolIcon from "./ToolIcon";
import { useTranslations } from "next-intl";

export default function ToolMarquee() {
    const tTools = useTranslations('Tools');

    // Duplicate tools for seamless loop
    const allTools = [...tools, ...tools];

    return (
        <div
            className="group w-full overflow-x-hidden overflow-y-visible py-2 relative before:content-[''] before:absolute before:top-0 before:bottom-0 before:w-20 before:z-[2] before:pointer-events-none before:left-0 before:bg-gradient-to-r before:from-[var(--background)] before:to-transparent after:content-[''] after:absolute after:top-0 after:bottom-0 after:w-20 after:z-[2] after:pointer-events-none after:right-0 after:bg-gradient-to-l after:from-[var(--background)] after:to-transparent"
        >
            <div
                className="flex gap-3 w-fit animate-marquee group-hover:[animation-play-state:paused]"
            >
                {allTools.map((tool, index) => (
                    <Link
                        key={`${tool.id}-${index}`}
                        href={`/tools/${tool.id}`}
                        className="flex items-center gap-2 px-4 py-2.5 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-full no-underline whitespace-nowrap transition-all duration-200 flex-shrink-0 hover:bg-[var(--card-hover-bg)] hover:border-[#fb923c] hover:scale-105"
                        title={tTools(`${tool.id}.name`, { fallback: tool.name })}
                    >
                        <div className="w-6 h-6 flex items-center justify-center bg-[#f973161a] rounded-md text-[#fb923c]">
                            <ToolIcon name={tool.icon} size={18} />
                        </div>
                        <span className="text-[13px] font-medium text-[var(--title-color)]">{tTools(`${tool.id}.name`, { fallback: tool.name })}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
