"use client";

import { useState } from "react";
import Link from "next/link";
import { tools } from "../data/tools";
import ToolIcon from "./ToolIcon";

export default function ToolMarquee() {
    const [isPaused, setIsPaused] = useState(false);

    // Duplicate tools for seamless loop
    const allTools = [...tools, ...tools];

    return (
        <div
            className="marquee-container"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div
                className={`marquee-track ${isPaused ? 'paused' : ''}`}
            >
                {allTools.map((tool, index) => (
                    <Link
                        key={`${tool.id}-${index}`}
                        href={`/tools/${tool.id}`}
                        className="marquee-item"
                        title={tool.name}
                    >
                        <div className="marquee-icon">
                            <ToolIcon name={tool.icon} size={18} />
                        </div>
                        <span className="marquee-name">{tool.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
