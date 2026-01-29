"use client";

import { useEffect, useState } from "react";
import { Github, Star } from "lucide-react";

export default function GitHubStarCard() {
    const [stars, setStars] = useState<number | null>(null);

    useEffect(() => {
        fetch("https://api.github.com/repos/dailydevtools/Daily-Dev-Tools")
            .then(res => res.json())
            .then(data => {
                if (data.stargazers_count) {
                    setStars(data.stargazers_count);
                }
            })
            .catch(() => setStars(null));
    }, []);

    return (
        <a
            href="https://github.com/dailydevtools/Daily-Dev-Tools"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[var(--background)] border border-[var(--border-color)] hover:border-[#fb923c] transition-all duration-300 no-underline shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(251,146,60,0.2)]"
        >
            <div className="flex items-center gap-2">
                <Github size={18} className="text-[var(--foreground)] transition-colors group-hover:text-[#fb923c]" />
                <span className="text-[13px] font-semibold text-[var(--foreground)] tracking-wide">
                    Star on GitHub
                </span>
            </div>

            {stars !== null && (
                <div className="flex items-center gap-1.5 pl-2.5 border-l border-[var(--border-color)]">
                    <Star size={14} className="text-[#fb923c] fill-[#fb923c] group-hover:rotate-[72deg] transition-transform duration-500" />
                    <span className="text-[13px] font-mono font-medium text-[var(--muted-text)] group-hover:text-[var(--foreground)] transition-colors">
                        {stars.toLocaleString()}
                    </span>
                </div>
            )}
        </a>
    );
}
