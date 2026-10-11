"use client";

import { motion, type Variants } from "framer-motion";
import { Github, Moon, ShieldCheck, Zap } from "lucide-react";
import { Link } from "../../i18n/routing";

const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

function onSpotlightMove(e: React.MouseEvent<HTMLElement>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--mouse-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
}

const TOOLS = [
    { name: "JSON", color: "#f97316" },
    { name: "JWT", color: "#8b5cf6" },
    { name: "Base64", color: "#06b6d4" },
    { name: "UUID", color: "#10b981" },
    { name: "Regex", color: "#f59e0b" },
];

export default function BentoGrid() {
    return (
        <section className="relative z-10 py-20 px-6">
            <div className="max-w-[1200px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <p className="text-[13px] font-semibold text-[#fb923c] uppercase tracking-widest mb-3">
                        Built for real workflows
                    </p>
                    <h2 className="text-[clamp(26px,4vw,42px)] font-bold font-heading text-[var(--title-color)] leading-tight">
                        Everything, in one place
                    </h2>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid grid-cols-2 md:grid-cols-4 auto-rows-[170px] gap-4"
                >
                    {/* Big 2x2 — privacy engine */}
                    <motion.div
                        onMouseMove={onSpotlightMove}
                        variants={item}
                        className="spotlight-card col-span-2 row-span-2 relative overflow-hidden rounded-3xl p-8 bg-[#171430] text-white flex flex-col"
                        style={{ "--mouse-x": "50%", "--mouse-y": "50%" } as React.CSSProperties}
                    >
                        <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center mb-auto">
                            <ShieldCheck size={22} className="text-[#fb923c]" />
                        </div>
                        <h3 className="relative z-10 font-heading font-bold text-2xl leading-tight mt-6 mb-2.5">
                            Runs entirely in your browser
                        </h3>
                        <p className="relative z-10 text-[15px] leading-relaxed text-white/60 max-w-[340px]">
                            No upload, no round-trip to a server. Formatting and parsing happen locally — your data stays yours.
                        </p>
                    </motion.div>

                    {/* 2-wide — 100+ tools */}
                    <motion.div
                        onMouseMove={onSpotlightMove}
                        variants={item}
                        className="spotlight-card col-span-2 relative overflow-hidden rounded-3xl p-7 bg-[var(--card-bg)] border border-[var(--card-border)]"
                        style={{ "--mouse-x": "50%", "--mouse-y": "50%" } as React.CSSProperties}
                    >
                        <h3 className="relative z-10 font-heading font-bold text-lg text-[var(--title-color)] mb-1.5">
                            95+ tools, one search
                        </h3>
                        <p className="relative z-10 text-sm text-[var(--muted-text)] mb-4">
                            Formatters, converters, generators — all in the same place.
                        </p>
                        <div className="relative z-10 flex gap-2.5 flex-wrap">
                            {TOOLS.map((t) => (
                                <span
                                    key={t.name}
                                    className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                                    style={{ backgroundColor: `${t.color}18`, border: `1px solid ${t.color}30`, color: t.color }}
                                >
                                    {t.name}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Accent stat */}
                    <motion.div
                        variants={item}
                        className="badge-shimmer relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-[#f97316] to-[#ea6c10] text-white flex flex-col justify-center"
                    >
                        <div className="font-heading font-bold text-[40px] leading-none tracking-tight">$0</div>
                        <div className="text-[13px] font-medium text-white/90 mt-2">
                            Free forever, no catch
                        </div>
                    </motion.div>

                    {/* Dark mode */}
                    <motion.div
                        variants={item}
                        className="relative overflow-hidden rounded-3xl p-6 bg-[var(--card-bg)] border border-[var(--card-border)] flex flex-col"
                    >
                        <div className="w-11 h-11 rounded-xl bg-[#f973161a] border border-[#f9731633] flex items-center justify-center mb-3.5">
                            <Moon size={18} className="text-[#fb923c]" />
                        </div>
                        <h3 className="font-heading font-semibold text-[16px] text-[var(--title-color)] mb-1">
                            Dark mode, built in
                        </h3>
                        <p className="text-[13px] leading-snug text-[var(--muted-text)]">
                            Every tool, easy on the eyes at 2am.
                        </p>
                    </motion.div>

                    {/* Open source — 2-wide */}
                    <motion.div variants={item} className="col-span-2">
                        <Link
                            onMouseMove={onSpotlightMove}
                            href="https://github.com/dailydevtools/Daily-Dev-Tools"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="spotlight-card group relative overflow-hidden rounded-3xl p-7 bg-[#171430] text-white flex flex-col justify-center no-underline h-full"
                            style={{ "--mouse-x": "50%", "--mouse-y": "50%" } as React.CSSProperties}
                        >
                            <div className="relative z-10 flex items-center gap-2.5 mb-2">
                                <Github size={18} />
                                <h3 className="font-heading font-semibold text-[17px]">Open source &amp; auditable</h3>
                            </div>
                            <p className="relative z-10 text-[13.5px] leading-relaxed text-white/60 max-w-[380px]">
                                Every line is public on GitHub. Don&apos;t take our word for the privacy claims — read the code.
                            </p>
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="flex items-center justify-center gap-2 text-center text-[12px] text-[var(--muted-text)] mt-6"
                >
                    <Zap size={12} className="text-[#fb923c]" />
                    No build step for your data — everything renders instantly, client-side.
                </motion.p>
            </div>
        </section>
    );
}
