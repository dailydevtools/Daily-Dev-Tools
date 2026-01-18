"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";
import { tools } from "../data/tools";

export default function Breadcrumb() {
    const pathname = usePathname();
    const parts = pathname.split('/').filter(Boolean);

    // If we're on a tool page (/tools/slug)
    const isToolPage = parts[0] === 'tools' && parts[1];

    // Find tool name if on a tool page
    const toolName = isToolPage
        ? tools.find((t: any) => t.id === parts[1])?.name || parts[1]
        : null;

    if (!isToolPage) return null;

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 14,
            color: 'var(--muted-text)',
            marginBottom: 24,
            flexWrap: 'wrap'
        }}>
            <Link
                href="/"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    color: 'var(--muted-text)',
                    textDecoration: 'none',
                    transition: 'color 0.2s'
                }}
                className="hover:text-primary"
            >
                <Home size={14} />
                <span>Home</span>
            </Link>

            <ChevronRight size={14} style={{ opacity: 0.5 }} />

            <Link
                href="/#tools"
                style={{
                    color: 'var(--muted-text)',
                    textDecoration: 'none',
                    transition: 'color 0.2s'
                }}
                className="hover:text-primary"
            >
                Tools
            </Link>

            <ChevronRight size={14} style={{ opacity: 0.5 }} />

            <span style={{
                color: 'var(--title-color)',
                fontWeight: 500
            }}>
                {toolName}
            </span>
        </div>
    );
}
