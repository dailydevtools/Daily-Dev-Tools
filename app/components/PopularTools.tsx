"use client";

import { useRef } from "react";
import { Link } from "../../i18n/routing";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { tools } from "../data/tools";
import ToolIcon from "./ToolIcon";
import MotionCard from "./ui/MotionCard";

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

export default function PopularTools() {
    const tTools = useTranslations('Tools');
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    const popularTools = popularToolIds
        .map(id => tools.find(t => t.id === id))
        .filter(Boolean) as typeof tools;

    return (
        <section ref={containerRef} className="relative z-10 py-12 px-6 flex flex-col items-center overflow-hidden">
            {/* Decorative background elements */}
            {/* <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none" /> */}

            <div className="w-full max-w-[1200px] mx-auto relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div>
                        <span className="text-[#fb923c] font-semibold tracking-wider text-sm uppercase mb-2 block">Trending Now</span>
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-[var(--title-color)]">
                            Most Popular Tools
                        </h2>
                    </div>

                    <Link href="/tools" className="group flex items-center gap-2 text-[var(--muted-text)] hover:text-[#fb923c] transition-colors font-medium">
                        View all tools
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {popularTools.map((tool, index) => (
                        <motion.div
                            key={tool.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link href={`/tools/${tool.id}`} className="block no-underline h-full group">
                                <MotionCard className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-2xl p-6 h-full transition-all duration-300 hover:border-[#fb923c]/40 hover:shadow-[0_12px_40px_-12px_rgba(249,115,22,0.15)] group-hover:-translate-y-1 relative overflow-hidden">
                                    {/* Hover glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="w-12 h-12 flex items-center justify-center bg-[var(--background)] rounded-xl text-[#fb923c] shadow-sm border border-[var(--border-color)] group-hover:scale-110 transition-transform duration-300">
                                                <ToolIcon name={tool.icon} size={24} />
                                            </div>
                                            {/* <div className="bg-[#f973161a] text-[#fb923c] text-[10px] font-bold px-2.5 py-1 rounded-full">
                                                HOT
                                            </div> */}
                                        </div>

                                        <h3 className="text-lg font-semibold font-heading text-[var(--title-color)] mb-2 group-hover:text-[#fb923c] transition-colors truncate">
                                            {tTools(`${tool.id}.name`, { fallback: tool.name })}
                                        </h3>

                                        <p className="text-[var(--muted-text)] text-sm line-clamp-2 mb-4">
                                            {tTools(`${tool.id}.description`, { fallback: tool.description })}
                                        </p>

                                        <div className="flex items-center text-sm font-medium text-[var(--muted-text)] group-hover:text-[#fb923c] transition-colors">
                                            Try it now
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                                <path d="M5 12h14" />
                                                <path d="m12 5 7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </MotionCard>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
