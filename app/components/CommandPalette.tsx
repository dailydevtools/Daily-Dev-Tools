"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { tools } from "../data/tools";
import { Search, ArrowRight, Delete, X } from "lucide-react";
import Link from "next/link";
import ToolIcon from "./ToolIcon";
import { useTranslations } from "next-intl";

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const t = useTranslations('CommandPalette');
    const tTools = useTranslations('Tools');

    // Toggle with Cmd+K
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen((open) => !open);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        const openHandler = () => setIsOpen(true);

        document.addEventListener("keydown", down);
        window.addEventListener("open-cmd-palette", openHandler);

        return () => {
            document.removeEventListener("keydown", down);
            window.removeEventListener("open-cmd-palette", openHandler);
        };
    }, []);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 10);
            setQuery("");
            setActiveIndex(0);
        }
    }, [isOpen]);

    // Filter tools
    const filteredTools = useMemo(() => {
        if (!query) return tools.slice(0, 5); // Show top 5 initially
        return tools.filter(t =>
            t.name.toLowerCase().includes(query.toLowerCase()) ||
            t.description.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 8);
    }, [query]);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex(i => (i + 1) % filteredTools.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex(i => (i - 1 + filteredTools.length) % filteredTools.length);
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (filteredTools[activeIndex]) {
                router.push(`/tools/${filteredTools[activeIndex].id}`);
                setIsOpen(false);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-[4px] flex items-start justify-center pt-[15vh]"
            onClick={() => setIsOpen(false)}
        >
            <div
                className="w-[600px] max-w-[90vw] bg-[var(--background)] rounded-xl border border-[var(--border-color)] shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden animate-[fadeIn_0.1s_ease-out]"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-4 border-b border-[var(--border-color)] flex items-center gap-3">
                    <Search size={20} className="text-[var(--muted-text)]" />
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={e => { setQuery(e.target.value); setActiveIndex(0); }}
                        onKeyDown={handleKeyDown}
                        placeholder={t('searchPlaceholder')}
                        className="flex-1 bg-transparent border-none outline-none focus-visible:outline-none text-lg text-[var(--title-color)] placeholder:text-[var(--muted-text)] font-inherit"
                    />
                    <button
                        onClick={() => setIsOpen(false)}
                        className="bg-transparent border-none text-[var(--muted-text)] cursor-pointer flex items-center justify-center min-w-[44px] min-h-[44px] hover:text-[var(--title-color)]"
                        aria-label="Close"
                    >
                        <span className="text-[10px] border border-[var(--border-color)] px-1.5 py-0.5 rounded bg-[var(--card-hover-bg)] font-mono">ESC</span>
                    </button>
                </div>

                <div ref={listRef} className="max-h-[400px] overflow-y-auto p-2">
                    {filteredTools.length === 0 ? (
                        <div className="p-8 text-center text-[var(--muted-text)]">
                            {t('noResults')}
                        </div>
                    ) : (
                        filteredTools.map((tool, index) => (
                            <div
                                key={tool.id}
                                onClick={() => {
                                    router.push(`/tools/${tool.id}`);
                                    setIsOpen(false);
                                }}
                                onMouseEnter={() => setActiveIndex(index)}
                                className={`p-3 md:px-4 md:py-3 flex items-center gap-4 rounded-lg cursor-pointer transition-colors duration-100 ${index === activeIndex ? 'bg-[var(--card-hover-bg)]' : 'bg-transparent'
                                    }`}
                            >
                                <div className="bg-[#f973161a] text-[#fb923c] flex items-center justify-center rounded-xl border border-[#f9731633] transition-transform duration-300 hover:scale-110 w-8 h-8 flex items-center justify-center">
                                    <ToolIcon name={tool.icon} size={18} className="text-[#fb923c]" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-[var(--title-color)] font-medium">{tTools(`${tool.id}.name`, { fallback: tool.name })}</div>
                                    <div className="text-[var(--muted-text)] text-[13px]">{tTools(`${tool.id}.description`, { fallback: tool.description })}</div>
                                </div>
                                {index === activeIndex && <ArrowRight size={16} className="text-[#fb923c]" />}
                            </div>
                        ))
                    )}
                </div>

                <div className="px-4 py-2 bg-[var(--card-bg)] border-t border-[var(--border-color)] flex justify-between text-[11px] text-[var(--muted-text)]">
                    <div className="flex gap-3">
                        <span>{t('select')} <kbd className="bg-[var(--card-hover-bg)] px-1 py-[1px] rounded border border-[var(--border-color)]">↵</kbd></span>
                        <span>{t('navigate')} <kbd className="bg-[var(--card-hover-bg)] px-1 py-[1px] rounded border border-[var(--border-color)]">↑↓</kbd></span>
                    </div>
                    <div>DailyDevTools</div>
                </div>
            </div>
            {/* ... styles ... */}
            <style jsx global>{`
             @keyframes fadeIn {
                 from { opacity: 0; transform: scale(0.98); }
                 to { opacity: 1; transform: scale(1); }
             }
         `}</style>
        </div>
    );
}
