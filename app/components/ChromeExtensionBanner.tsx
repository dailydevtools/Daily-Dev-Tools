"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function ChromeExtensionBanner() {
    const [dismissed, setDismissed] = useState(false);

    if (dismissed) return null;

    return (
        <div className="max-w-[1200px] mx-auto w-full px-6 mt-8">
            <div className="relative flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#f973160d] to-[#facc150d] border border-[#f9731622] overflow-hidden">
                {/* Chrome icon */}
                <div className="shrink-0 w-10 h-10 rounded-xl bg-[#f973161a] border border-[#f9731633] flex items-center justify-center text-[#fb923c]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                        <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.4"/>
                        <path d="M12 8h8.5M5.5 17.5l4-7M18.5 17.5l-11 .1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                </div>

                <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[var(--title-color)]">
                        Use these tools directly in Chrome
                    </p>
                    <p className="text-[12px] text-[var(--muted-text)] truncate">
                        Install the DailyDevTools extension — access all tools from your browser toolbar
                    </p>
                </div>

                <a
                    href="https://chrome.google.com/webstore/detail/dailydevtools"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-[#f97316] hover:bg-[#ea6c10] text-white text-[12px] font-semibold rounded-full transition-colors duration-200 whitespace-nowrap"
                >
                    Add to Chrome
                </a>

                <button
                    onClick={() => setDismissed(true)}
                    className="shrink-0 p-1 text-[var(--muted-text)] hover:text-[var(--title-color)] transition-colors"
                    aria-label="Dismiss"
                >
                    <X size={14} />
                </button>
            </div>
        </div>
    );
}
