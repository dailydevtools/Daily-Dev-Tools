"use client";

import { motion, type Variants } from "framer-motion";
import { Check, X } from "lucide-react";

const OLD_WAY = [
    "Pop-up ads covering the tool",
    "Your file gets uploaded to a server",
    "Account required to unlock basic features",
    "Slow, bloated pages full of trackers",
];

const NEW_WAY = [
    "Zero ads, zero popups, zero trackers",
    "100% client-side — nothing leaves your browser",
    "No sign-up, no account, ever",
    "Instant load — every one of 95+ tools",
];

const listVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09 } },
};

const rowVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

export default function VersusSplit() {
    return (
        <section className="relative z-10 py-20 px-6">
            <div className="max-w-[1100px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <p className="text-[13px] font-semibold text-[#fb923c] uppercase tracking-widest mb-3">
                        Why it feels different
                    </p>
                    <h2 className="text-[clamp(26px,4vw,42px)] font-bold font-heading text-[var(--title-color)] leading-tight">
                        Most free tool sites aren&apos;t really free.
                    </h2>
                </motion.div>

                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* VS badge */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-[var(--title-color)] text-[var(--background)] items-center justify-center font-bold font-heading text-xs shadow-lg">
                        VS
                    </div>

                    {/* Old way */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5 }}
                        className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8 md:p-9 grayscale opacity-[0.85]"
                    >
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted-text)] mb-2">
                            Other tool sites
                        </p>
                        <h3 className="text-[22px] font-bold font-heading text-[var(--title-color)] mb-6">
                            Ad-cluttered, sign-up walls
                        </h3>
                        <motion.ul variants={listVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-3.5">
                            {OLD_WAY.map((line) => (
                                <motion.li key={line} variants={rowVariants} className="flex items-start gap-3 text-[14px] text-[var(--muted-text)]">
                                    <span className="w-[20px] h-[20px] rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 mt-[1px]">
                                        <X size={11} className="text-red-500" strokeWidth={3} />
                                    </span>
                                    {line}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>

                    {/* New way */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="relative rounded-3xl border border-[#f9731633] bg-gradient-to-br from-[#f973161a] to-[#facc151a] p-8 md:p-9 overflow-hidden"
                    >
                        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#f97316]/10 blur-3xl pointer-events-none" />
                        <p className="relative text-[11px] font-bold uppercase tracking-[0.14em] text-[#fb923c] mb-2">
                            The DailyDevTools way
                        </p>
                        <h3 className="relative text-[22px] font-bold font-heading text-[var(--title-color)] mb-6">
                            Open it. Use it. Done.
                        </h3>
                        <motion.ul variants={listVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative space-y-3.5">
                            {NEW_WAY.map((line) => (
                                <motion.li key={line} variants={rowVariants} className="flex items-start gap-3 text-[14px] text-[var(--title-color)] font-medium">
                                    <span className="w-[20px] h-[20px] rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center flex-shrink-0 mt-[1px]">
                                        <Check size={11} className="text-emerald-500" strokeWidth={3} />
                                    </span>
                                    {line}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
