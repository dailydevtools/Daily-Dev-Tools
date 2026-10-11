"use client";

import { motion } from "framer-motion";

const PILLARS = [
    {
        num: "01",
        title: "Nothing leaves your browser",
        desc: "Every tool runs 100% client-side. Your JSON, your JWTs, your uploads — they never touch a server. That's not a policy, it's the architecture.",
        top: "top-24",
        className: "bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-xl",
        numColor: "text-[#fb923c]",
        titleColor: "text-[var(--title-color)]",
        descColor: "text-[var(--muted-text)]",
    },
    {
        num: "02",
        title: "Nothing costs a cent",
        desc: "No premium tier, no paywalled tools, no “upgrade to export” dialogs. All 95+ tools, free forever — a formatter shouldn't need a credit card.",
        top: "top-32",
        className: "bg-[#1c1a30]",
        numColor: "text-[#facc15]",
        titleColor: "text-white",
        descColor: "text-white/65",
    },
    {
        num: "03",
        title: "Nothing gets in your way",
        desc: "No accounts, no cookie banners chasing consent for tracking we don't do, no ads between you and the tool. Open it, use it, done.",
        top: "top-40",
        className: "bg-gradient-to-br from-[#f97316] to-[#ea6c10]",
        numColor: "text-white/80",
        titleColor: "text-white",
        descColor: "text-white/85",
    },
];

export default function StackedPillars() {
    return (
        <section className="relative z-10 py-20 px-6">
            <div className="max-w-[900px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <p className="text-[13px] font-semibold text-[#fb923c] uppercase tracking-widest mb-3">
                        The short version
                    </p>
                    <h2 className="text-[clamp(26px,4vw,42px)] font-bold font-heading text-[var(--title-color)] leading-tight">
                        Three promises, stacked
                    </h2>
                </motion.div>

                <div className="flex flex-col gap-6 pb-[280px]">
                    {PILLARS.map((p) => (
                        <motion.div
                            key={p.num}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5 }}
                            className={`sticky ${p.top} rounded-3xl p-9 md:p-11 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.35)] ${p.className}`}
                        >
                            <div className="flex items-baseline gap-5">
                                <span className={`font-heading font-bold text-sm shrink-0 ${p.numColor}`}>{p.num}</span>
                                <div>
                                    <h3 className={`font-heading font-bold text-[22px] md:text-[26px] mb-2.5 ${p.titleColor}`}>
                                        {p.title}
                                    </h3>
                                    <p className={`text-[15px] md:text-base leading-relaxed max-w-[540px] ${p.descColor}`}>
                                        {p.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
