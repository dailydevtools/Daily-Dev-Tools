"use client";

import { Search } from "lucide-react";

export default function HeaderSearchTrigger() {
    return (
        <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-cmd-palette"))}
            className="glass-card"
            style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px',
                background: 'var(--card-bg)', border: '1px solid var(--border-color)',
                borderRadius: 8, cursor: 'pointer', height: 36
            }}
        >
            <Search size={14} className="text-[var(--muted-text)]" />
            <span style={{ fontSize: 13, color: 'var(--muted-text)', marginRight: 8 }}>Search...</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{
                    fontSize: 10, background: 'var(--card-hover-bg)', padding: '2px 4px',
                    borderRadius: 4, color: 'var(--muted-text)', fontFamily: 'monospace',
                    border: '1px solid var(--border-color)'
                }}>⌘K</span>
            </div>
        </button>
    );
}
