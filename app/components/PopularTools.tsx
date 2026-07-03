"use client";

import { useRef, useState, useCallback } from "react";
import { Link } from "../../i18n/routing";
import { useTranslations } from "next-intl";
import { motion, useScroll } from "framer-motion";
import { tools } from "../data/tools";
import ToolIcon from "./ToolIcon";

// Manually select some popular tools for now
const popularToolIds = [
    "json-formatter",
    "uuid-generator",
    "base64-encoder",
    "qr-generator",
    "password-generator",
    "image-compressor",
    "jwt-decoder",
    "regex-tester"
];

// Tools that are recently added (for "New" badge)
const recentlyAdded = new Set(["qr-generator", "image-compressor"]);

function MagneticCard({ children, className }: { children: React.ReactNode; className?: string }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState({ x: 0, y: 0 });

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = (e.clientX - centerX) / (rect.width / 2);
        const dy = (e.clientY - centerY) / (rect.height / 2);
        setTransform({ x: dx * 5, y: dy * 5 });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setTransform({ x: 0, y: 0 });
    }, []);

    return (
        <div
            ref={cardRef}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `translate(${transform.x}px, ${transform.y}px)`,
                transition: transform.x === 0 && transform.y === 0
                    ? "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)"
                    : "transform 0.1s linear",
            }}
        >
            {children}
        </div>
    );
}

export default function PopularTools() {
    const tTools = useTranslations('Tools');
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const popularTools = popularToolIds
        .map(id => tools.find(t => t.id === id))
        .filter(Boolean) as typeof tools;

    return (
        <section ref={containerRef} className="relative z-10 py-20 px-6">
            <div className="w-full max-w-[1100px] mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
                    <div>
                        <p className="text-[13px] font-semibold text-[#fb923c] uppercase tracking-widest mb-3">
                            Start here
                        </p>
                        <h2 className="text-[clamp(26px,4vw,40px)] font-bold font-heading text-[var(--title-color)] leading-tight">
                            Most used tools
                        </h2>
                    </div>
                    <Link
                        href="/tools"
                        className="group inline-flex items-center gap-1.5 text-sm text-[var(--muted-text)] hover:text-[var(--title-color)] transition-colors font-medium shrink-0 cursor-pointer"
                    >
                        View all 95+ tools
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {popularTools.map((tool, index) => (
                        <motion.div
                            key={tool.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ delay: index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <MagneticCard>
                                <Link href={`/tools/${tool.id}`} className="block no-underline h-full group cursor-pointer">
                                    <div
                                        className="relative bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 h-full transition-all duration-300 hover:border-[#fb923c]/50 overflow-hidden"
                                        onMouseMove={(e) => {
                                            const rect = e.currentTarget.getBoundingClientRect();
                                            const x = ((e.clientX - rect.left) / rect.width) * 100;
                                            const y = ((e.clientY - rect.top) / rect.height) * 100;
                                            e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                                            e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
                                        }}
                                    >
                                        {/* Spotlight effect */}
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                                            style={{
                                                background: "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(249,115,22,0.07), transparent 60%)",
                                            }}
                                        />

                                        {/* Hover gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                        {/* "New" badge */}
                                        {recentlyAdded.has(tool.id) && (
                                            <div className="absolute top-3.5 right-3.5 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#f97316] to-[#facc15] text-white text-[9px] font-bold tracking-wider uppercase shadow-sm">
                                                New
                                            </div>
                                        )}

                                        <div className="relative z-10 flex flex-col h-full">
                                            <div className="w-11 h-11 flex items-center justify-center bg-[#f973161a] rounded-xl text-[#fb923c] border border-[#f9731622] mb-4 group-hover:scale-110 group-hover:shadow-[0_0_16px_rgba(249,115,22,0.3)] transition-all duration-300">
                                                <ToolIcon name={tool.icon} size={20} />
                                            </div>

                                            <h3 className="text-[15px] font-semibold font-heading text-[var(--title-color)] mb-1.5 group-hover:text-[#fb923c] transition-colors leading-snug">
                                                {tTools(`${tool.id}.name`, { fallback: tool.name })}
                                            </h3>
                                            <p className="text-[13px] text-[var(--muted-text)] line-clamp-2 leading-relaxed flex-1">
                                                {tTools(`${tool.id}.description`, { fallback: tool.description })}
                                            </p>

                                            <div className="mt-4 flex items-center gap-1.5 text-[12px] font-semibold text-[var(--muted-text)] group-hover:text-[#fb923c] transition-colors">
                                                Open tool
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="-translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-250">
                                                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </MagneticCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
