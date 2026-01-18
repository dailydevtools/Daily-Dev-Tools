"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { tools } from "../data/tools";
import { Search, ArrowRight, Delete, X } from "lucide-react";
import Link from "next/link";
import ToolIcon from "./ToolIcon";

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

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
            style={{
                position: 'fixed', inset: 0, zIndex: 9999,
                background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
                display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '15vh'
            }}
            onClick={() => setIsOpen(false)}
        >
            <div
                style={{
                    width: 600, maxWidth: '90vw',
                    background: 'var(--background)',
                    borderRadius: 12,
                    border: '1px solid var(--border-color)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                    overflow: 'hidden',
                    animation: 'fadeIn 0.1s ease-out'
                }}
                onClick={e => e.stopPropagation()}
            >
                <div style={{ padding: 16, borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Search size={20} style={{ color: 'var(--muted-text)' }} />
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={e => { setQuery(e.target.value); setActiveIndex(0); }}
                        onKeyDown={handleKeyDown}
                        placeholder="Search tools..."
                        style={{
                            flex: 1, background: 'transparent', border: 'none', outline: 'none',
                            fontSize: 18, color: 'var(--title-color)', fontFamily: 'inherit'
                        }}
                    />
                    <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--muted-text)', cursor: 'pointer' }}>
                        <span style={{ fontSize: 12, border: '1px solid var(--border-color)', padding: '2px 6px', borderRadius: 4 }}>ESC</span>
                    </button>
                </div>

                <div ref={listRef} style={{ maxHeight: 400, overflowY: 'auto', padding: 8 }}>
                    {filteredTools.length === 0 ? (
                        <div style={{ padding: 32, textAlign: 'center', color: 'var(--muted-text)' }}>
                            No results found.
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
                                style={{
                                    padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 16,
                                    borderRadius: 8, cursor: 'pointer',
                                    background: index === activeIndex ? 'var(--card-hover-bg)' : 'transparent',
                                    transition: 'background 0.1s'
                                }}
                            >
                                <div className="icon-box-primary" style={{ width: 32, height: 32 }}>
                                    <ToolIcon name={tool.icon} size={18} style={{ color: '#fb923c' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ color: 'var(--title-color)', fontWeight: 500 }}>{tool.name}</div>
                                    <div style={{ color: 'var(--muted-text)', fontSize: 13 }}>{tool.description}</div>
                                </div>
                                {index === activeIndex && <ArrowRight size={16} color="#fb923c" />}
                            </div>
                        ))
                    )}
                </div>

                <div style={{ padding: '8px 16px', background: 'var(--card-bg)', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted-text)' }}>
                    <div style={{ display: 'flex', gap: 12 }}>
                        <span>Select <kbd style={{ background: 'var(--card-hover-bg)', padding: '1px 4px', borderRadius: 3, border: '1px solid var(--border-color)' }}>↵</kbd></span>
                        <span>Navigate <kbd style={{ background: 'var(--card-hover-bg)', padding: '1px 4px', borderRadius: 3, border: '1px solid var(--border-color)' }}>↑↓</kbd></span>
                    </div>
                    <div>QuickDevTools</div>
                </div>
            </div>
            <style jsx global>{`
            @keyframes fadeIn {
                from { opacity: 0; transform: scale(0.98); }
                to { opacity: 1; transform: scale(1); }
            }
        `}</style>
        </div>
    );
}
