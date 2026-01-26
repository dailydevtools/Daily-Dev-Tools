"use client";

import Giscus from "@giscus/react";
import { useTheme } from "./ThemeProvider";

export default function Comments() {
    const { theme } = useTheme();

    return (
        <div className="w-full mt-10 bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] p-8">
            <h2 className="text-2xl font-bold mb-6 text-[var(--title-color)]">Comments</h2>
            <Giscus
                id="comments"
                repo="dailydevtools/Daily-Dev-Tools"
                repoId="R_kgDOQ8P6nA"
                category="General"
                categoryId="DIC_kwDOQ8P6nM4C1b0G"
                mapping="pathname"
                strict="0"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="bottom"
                theme={theme === 'dark' ? 'https://cdn.jsdelivr.net/gh/dailydevtools/Daily-Dev-Tools@feat/giscus-integration/public/giscus.css' : 'light'}
                lang="en"
                loading="lazy"
            />
        </div>
    );
}
