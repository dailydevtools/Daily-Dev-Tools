"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import HeaderSearchTrigger from "./HeaderSearchTrigger";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            padding: '12px 16px',
            background: 'var(--header-bg)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--border-color)'
        }}>
            <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
                    <Image src="/project_logo.png" alt="DailyDevTools Logo" width={42} height={42} />

                    <span style={{ fontSize: 18, fontWeight: 'bold', color: 'var(--title-color)' }}>DailyDevTools</span>
                </Link>

                {/* Desktop Nav */}
                <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <HeaderSearchTrigger />
                    <Link href="/#tools" style={{ color: 'var(--muted-text)', fontSize: 14, textDecoration: 'none' }}>Tools</Link>
                    <Link href="/blog" style={{ color: 'var(--muted-text)', fontSize: 14, textDecoration: 'none' }}>Blog</Link>
                    <ThemeToggle />
                    <a href="https://github.com/sohanpaliyal" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '8px 16px' }}>GitHub</a>
                </div>

                {/* Mobile Nav Toggle */}
                <div className="mobile-nav-toggle" style={{ display: 'none', alignItems: 'center', gap: 12 }}>
                    <ThemeToggle />
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--title-color)',
                            cursor: 'pointer',
                            padding: 8
                        }}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="mobile-menu" style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: 'var(--background)',
                    borderBottom: '1px solid var(--border-color)',
                    padding: '16px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16
                }}>
                    <HeaderSearchTrigger />
                    <Link href="/#tools" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--title-color)', fontSize: 16, textDecoration: 'none', padding: '8px 0' }}>Tools</Link>
                    <Link href="/blog" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--title-color)', fontSize: 16, textDecoration: 'none', padding: '8px 0' }}>Blog</Link>
                    <a href="https://github.com/sohanpaliyal" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding: '12px 16px', textAlign: 'center' }}>GitHub</a>
                </div>
            )}
        </nav>
    );
}
