"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { Search, MousePointerClick, ClipboardCheck } from "lucide-react";
import { Link } from "../../i18n/routing";

const STEPS = [
    {
        number: "01",
        icon: Search,
        title: "Find your tool",
        description: "Browse or search across 95+ tools organized by category — formatter, converter, generator, and more.",
        accent: "from-orange-500/20 to-amber-500/10",
        iconColor: "text-orange-400",
        iconBg: "bg-orange-500/10 border-orange-500/20",
        glow: "rgba(249,115,22,0.3)",
    },
    {
        number: "02",
        icon: MousePointerClick,
        title: "Open & use it",
        description: "No login, no install, no waiting. Click open and start immediately — everything runs in your browser.",
        accent: "from-violet-500/20 to-purple-500/10",
        iconColor: "text-violet-400",
        iconBg: "bg-violet-500/10 border-violet-500/20",
        glow: "rgba(139,92,246,0.3)",
    },
    {
        number: "03",
        icon: ClipboardCheck,
        title: "Copy your result",
        description: "Your data never leaves your device. Copy, download, or export your result — done in seconds.",
        accent: "from-emerald-500/20 to-teal-500/10",
        iconColor: "text-emerald-400",
        iconBg: "bg-emerald-500/10 border-emerald-500/20",
        glow: "rgba(16,185,129,0.3)",
    },
];

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.18,
        },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
};

export default function HowItWorks() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    return (
        <section ref={sectionRef} className="relative z-10 py-24 px-6 overflow-hidden">
            {/* Background accent */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full pointer-events-none opacity-40"
                    style={{
                        background: "radial-gradient(ellipse, rgba(249,115,22,0.06) 0%, transparent 70%)",
                        filter: "blur(60px)",
                    }}
                />
            </div>

            <div className="max-w-[1100px] mx-auto relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <p className="text-[13px] font-semibold text-[#fb923c] uppercase tracking-widest mb-3">
                        Effortless by design
                    </p>
                    <h2 className="text-[clamp(28px,4.5vw,44px)] font-bold font-heading text-[var(--title-color)] leading-tight mb-4">
                        Three steps. Zero friction.
                    </h2>
                    <p className="text-[var(--muted-text)] max-w-md mx-auto text-[15px] leading-relaxed">
                        No accounts. No subscriptions. Just open the tool you need and get back to building.
                    </p>
                </motion.div>

                {/* Steps */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-3 gap-5 relative"
                >
                    {/* Connector lines (desktop only) */}
                    <div className="hidden md:block absolute top-[60px] left-[33.33%] right-[33.33%] h-px z-0 pointer-events-none">
                        <motion.div
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
                            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                            className="w-full h-full origin-left"
                            style={{
                                background: "linear-gradient(90deg, rgba(249,115,22,0.4) 0%, rgba(139,92,246,0.4) 50%, rgba(16,185,129,0.4) 100%)",
                            }}
                        />
                    </div>

                    {STEPS.map((step, i) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={i}
                                variants={cardVariants}
                                className="relative group"
                                onMouseMove={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                                    e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                                    e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
                                }}
                            >
                                <div
                                    className={`spotlight-card relative rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8 h-full overflow-hidden transition-all duration-300 hover:border-[var(--orange-400)]/30 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]`}
                                >
                                    {/* Accent gradient fill */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${step.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none`}
                                    />

                                    {/* Step number — large ghost text */}
                                    <div className="absolute top-4 right-6 text-[80px] font-bold leading-none text-[var(--muted-text)] opacity-[0.06] select-none pointer-events-none font-heading">
                                        {step.number}
                                    </div>

                                    <div className="relative z-10">
                                        {/* Icon */}
                                        <div
                                            className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${step.iconBg} ${step.iconColor}`}
                                            style={{
                                                boxShadow: `0 0 0 0 ${step.glow}`,
                                                transition: "box-shadow 0.3s ease, transform 0.3s ease",
                                            }}
                                            onMouseEnter={(e) => {
                                                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px 4px ${step.glow}`;
                                            }}
                                            onMouseLeave={(e) => {
                                                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 ${step.glow}`;
                                            }}
                                        >
                                            <Icon size={22} strokeWidth={1.75} />
                                        </div>

                                        {/* Step label */}
                                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted-text)] mb-2">
                                            Step {step.number}
                                        </p>

                                        {/* Title */}
                                        <h3 className="text-[18px] font-bold font-heading text-[var(--title-color)] mb-3 leading-snug">
                                            {step.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-[14px] text-[var(--muted-text)] leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="text-center mt-12"
                >
                    <Link
                        href="/tools"
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#f97316] hover:bg-[#ea6c10] text-white font-semibold rounded-full text-sm transition-all duration-200 shadow-[0_4px_20px_rgba(249,115,22,0.4)] hover:shadow-[0_8px_32px_rgba(249,115,22,0.55)] hover:-translate-y-[2px] animate-pulse-glow cursor-pointer"
                    >
                        Try any tool — it&apos;s free
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                        </svg>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
