"use client";

import { useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, ExternalLink } from "lucide-react";

const CHROME_FEATURES = [
    "One-click access to all 95+ tools from your toolbar",
    "Works on any page — no tab switching required",
    "Tool history for quick re-access",
    "Lightweight — zero performance impact",
];

const VSCODE_FEATURES = [
    "Run tools without leaving your editor",
    "Format, decode & convert directly in VS Code",
    "Output goes straight to your clipboard",
    "Fits right into your existing dev workflow",
];

function ChromeMockup() {
    return (
        <div className="relative w-[230px] mx-auto">
            <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="px-3.5 py-2.5 border-b border-[var(--border-color)] flex items-center gap-2 bg-[var(--header-bg,var(--card-bg))]">
                    <div className="w-6 h-6 rounded-lg bg-[#f973161a] border border-[#f9731633] flex items-center justify-center flex-shrink-0">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2">
                            <path d="M12 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3z" /><circle cx="12" cy="12" r="3.5" fill="#fb923c" fillOpacity=".5" stroke="none" /><path d="M12 8.5h7M6.5 18l3.7-6.5M17.5 18l-9.9.1" strokeLinecap="round" />
                        </svg>
                    </div>
                    <span className="text-[11px] font-semibold text-[var(--title-color)]">DailyDevTools</span>
                    <div className="ml-auto flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                </div>

                {/* Search */}
                <div className="px-3 py-2.5">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--background)] border border-[var(--border-color)]">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[var(--muted-text)] flex-shrink-0">
                            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                        </svg>
                        <span className="text-[10px] text-[var(--muted-text)]">Search tools...</span>
                    </div>
                </div>

                {/* Tool grid */}
                <div className="px-3 pb-3 grid grid-cols-3 gap-1.5">
                    {[
                        { name: "JSON", color: "#f97316" },
                        { name: "JWT", color: "#8b5cf6" },
                        { name: "Base64", color: "#06b6d4" },
                        { name: "UUID", color: "#10b981" },
                        { name: "Regex", color: "#f59e0b" },
                        { name: "URL", color: "#3b82f6" },
                    ].map((tool) => (
                        <div
                            key={tool.name}
                            className="flex flex-col items-center gap-1 p-1.5 rounded-xl bg-[var(--background)] border border-[var(--border-color)] cursor-default"
                        >
                            <div
                                className="w-6 h-6 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: `${tool.color}18`, border: `1px solid ${tool.color}28` }}
                            >
                                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: tool.color }} />
                            </div>
                            <span className="text-[8px] text-[var(--muted-text)] font-medium">{tool.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating active badge */}
            <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 -right-3 px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[9px] font-bold shadow-lg shadow-emerald-500/30"
            >
                Active
            </motion.div>

            {/* Corner glow */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-[#f97316]/20 blur-2xl rounded-full pointer-events-none" />
        </div>
    );
}

function VSCodeMockup() {
    const toolList = ["json-formatter", "jwt-decoder", "base64-encoder", "url-encoder"];

    return (
        <div className="relative w-[230px] mx-auto">
            <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-2xl overflow-hidden">
                {/* Title bar */}
                <div className="px-3 py-2 border-b border-[var(--border-color)] bg-[var(--header-bg,var(--card-bg))] flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                    <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                    <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                    <span className="ml-2 text-[9px] text-[var(--muted-text)] font-mono">DailyDevTools — VS Code</span>
                </div>

                {/* Panel header */}
                <div className="px-3 py-2 bg-[var(--background)] border-b border-[var(--border-color)] flex items-center gap-1.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="#007ACC">
                        <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
                    </svg>
                    <span className="text-[9px] font-semibold text-[var(--title-color)] uppercase tracking-wider">Tools</span>
                </div>

                {/* Tool list */}
                <div className="px-2.5 py-2 space-y-0.5">
                    {toolList.map((tool, i) => (
                        <motion.div
                            key={tool}
                            initial={{ opacity: 0, x: -8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + i * 0.09 }}
                            className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[#007ACC]/8 transition-colors cursor-default group"
                        >
                            <div className="w-3.5 h-3.5 rounded flex items-center justify-center bg-[#f973161a] border border-[#f9731633] flex-shrink-0">
                                <div className="w-1.5 h-1.5 rounded-sm bg-[#fb923c]" />
                            </div>
                            <span className="text-[9.5px] text-[var(--muted-text)] group-hover:text-[var(--title-color)] transition-colors capitalize">
                                {tool.replace(/-/g, " ")}
                            </span>
                            <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#007ACC" strokeWidth="2.5" className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </motion.div>
                    ))}
                </div>

                {/* VS Code status bar */}
                <div className="px-3 py-1.5 bg-[#007ACC]/10 border-t border-[#007ACC]/20 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#007ACC]" />
                    <span className="text-[8.5px] text-[#007ACC] font-semibold">Extension Active</span>
                </div>
            </div>

            {/* Floating version badge */}
            <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 -left-3 px-2.5 py-1 rounded-full bg-[#007ACC] text-white text-[9px] font-bold shadow-lg shadow-[#007ACC]/30"
            >
                v1.0
            </motion.div>

            {/* Corner glow */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-[#007ACC]/15 blur-2xl rounded-full pointer-events-none" />
        </div>
    );
}

function ExtensionCard({
    platform,
    title,
    desc,
    features,
    ctaLabel,
    ctaHref,
    mockup,
    accentColor,
    delay = 0,
}: {
    platform: string;
    title: string;
    desc: string;
    features: string[];
    ctaLabel: string;
    ctaHref: string;
    mockup: React.ReactNode;
    accentColor: string;
    delay?: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        cardRef.current.style.setProperty("--mouse-x", `${x}%`);
        cardRef.current.style.setProperty("--mouse-y", `${y}%`);
    }, []);

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 44, rotateX: 8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMouseMove}
            className="spotlight-card relative overflow-hidden rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-7 lg:p-8 group hover:border-[color:var(--ext-accent)]/30 transition-colors duration-300"
            style={
                {
                    "--mouse-x": "50%",
                    "--mouse-y": "50%",
                    "--ext-accent": accentColor,
                    transformPerspective: 1000,
                } as React.CSSProperties
            }
        >
            {/* Spotlight radial */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl"
                style={{
                    background: `radial-gradient(480px circle at var(--mouse-x) var(--mouse-y), ${accentColor}0d, transparent 60%)`,
                }}
            />

            {/* Corner glow orb */}
            <div
                className="absolute -top-20 -right-20 w-56 h-56 rounded-full opacity-[0.06] blur-3xl pointer-events-none group-hover:opacity-[0.14] transition-opacity duration-500"
                style={{ backgroundColor: accentColor }}
            />

            <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center">
                {/* Left: content */}
                <div className="flex-1 space-y-5">
                    {/* Platform badge */}
                    <div className="space-y-3">
                        <span
                            className="inline-block text-[10.5px] font-bold uppercase tracking-[0.14em] px-3 py-1 rounded-full"
                            style={{
                                color: accentColor,
                                backgroundColor: `${accentColor}15`,
                                border: `1px solid ${accentColor}28`,
                            }}
                        >
                            {platform}
                        </span>
                        <h3 className="text-[21px] font-bold font-heading text-[var(--title-color)] leading-snug">
                            {title}
                        </h3>
                        <p className="text-[14px] text-[var(--muted-text)] leading-[1.7]">
                            {desc}
                        </p>
                    </div>

                    {/* Feature list */}
                    <ul className="space-y-2.5">
                        {features.map((feature, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: delay + 0.18 + i * 0.08, duration: 0.4 }}
                                className="flex items-start gap-2.5 text-[13px] text-[var(--muted-text)]"
                            >
                                <div
                                    className="w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0 mt-[1px]"
                                    style={{
                                        backgroundColor: `${accentColor}18`,
                                        border: `1px solid ${accentColor}30`,
                                    }}
                                >
                                    <Check size={9} style={{ color: accentColor }} strokeWidth={3} />
                                </div>
                                {feature}
                            </motion.li>
                        ))}
                    </ul>

                    {/* CTA */}
                    <a
                        href={ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[13px] font-semibold transition-all duration-200 hover:-translate-y-[1px] group/btn w-fit"
                        style={{
                            backgroundColor: accentColor,
                            boxShadow: `0 4px 18px ${accentColor}38`,
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 28px ${accentColor}55`;
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 18px ${accentColor}38`;
                        }}
                    >
                        {ctaLabel}
                        <ExternalLink
                            size={12}
                            className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                        />
                    </a>
                </div>

                {/* Right: floating mockup */}
                <div className="flex-shrink-0 flex items-center justify-center w-full md:w-[250px]">
                    <motion.div
                        animate={{ y: [-6, 6, -6] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        {mockup}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

export default function ExtensionsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

    return (
        <section ref={sectionRef} className="relative z-10 py-24 px-6 overflow-hidden">
            {/* Scroll-parallax ambient blob */}
            <motion.div
                style={{ y: bgY }}
                className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[380px] rounded-full bg-gradient-to-br from-[#3b82f6]/7 via-[#007ACC]/5 to-[#f97316]/5 blur-[90px] pointer-events-none"
            />

            <div className="max-w-[1100px] mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-12 text-center"
                >
                    <p className="text-[12.5px] font-bold text-[#fb923c] uppercase tracking-[0.15em] mb-3">
                        Take it everywhere
                    </p>
                    <h2 className="text-[clamp(28px,4.5vw,44px)] font-bold font-heading text-[var(--title-color)] leading-tight mb-4">
                        Your tools,{" "}
                        <span className="gradient-text-animate">your way</span>
                    </h2>
                    <p className="text-[var(--muted-text)] max-w-[420px] mx-auto text-[15px] leading-[1.65]">
                        Access all 95+ tools from your Chrome toolbar or inside VS Code — no tab switching, no friction.
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <ExtensionCard
                        platform="Chrome Extension"
                        title="Tools in your toolbar"
                        desc="Install once and every tool is one click away on any page — no searching, no opening new tabs."
                        features={CHROME_FEATURES}
                        ctaLabel="Add to Chrome"
                        ctaHref="https://chrome.google.com/webstore/detail/dailydevtools"
                        mockup={<ChromeMockup />}
                        accentColor="#f97316"
                        delay={0}
                    />

                    <ExtensionCard
                        platform="VS Code Extension"
                        title="Dev tools in your editor"
                        desc="Format JSON, decode JWTs, convert timestamps — all without ever leaving your code editor."
                        features={VSCODE_FEATURES}
                        ctaLabel="Install for VS Code"
                        ctaHref="https://marketplace.visualstudio.com/items?itemName=dailydevtools"
                        mockup={<VSCodeMockup />}
                        accentColor="#007ACC"
                        delay={0.1}
                    />
                </div>

                {/* Bottom nudge */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.45, duration: 0.5 }}
                    className="text-center text-[12px] text-[var(--muted-text)] mt-6"
                >
                    Both extensions are{" "}
                    <span className="text-[#fb923c] font-semibold">100% free</span>
                    {" "}and open source
                </motion.p>
            </div>
        </section>
    );
}
