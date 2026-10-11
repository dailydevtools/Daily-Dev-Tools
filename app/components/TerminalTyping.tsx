"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const INPUT = `{"user":"alice","active":true,"roles":["admin","dev"]}`;

export default function TerminalTyping() {
    const prefersReducedMotion = useReducedMotion();
    const [typed, setTyped] = useState(prefersReducedMotion ? INPUT : "");
    const [showResult, setShowResult] = useState(!!prefersReducedMotion);

    useEffect(() => {
        if (prefersReducedMotion) return;
        let cancelled = false;

        const run = () => {
            setTyped("");
            setShowResult(false);
            let i = 0;
            const typeChar = () => {
                if (cancelled) return;
                i++;
                setTyped(INPUT.slice(0, i));
                if (i < INPUT.length) {
                    window.setTimeout(typeChar, 28 + Math.random() * 35);
                } else {
                    window.setTimeout(() => {
                        if (!cancelled) setShowResult(true);
                    }, 350);
                    window.setTimeout(() => {
                        if (!cancelled) run();
                    }, 3400);
                }
            };
            window.setTimeout(typeChar, 500);
        };

        run();
        return () => {
            cancelled = true;
        };
    }, [prefersReducedMotion]);

    return (
        <section className="relative z-10 py-20 px-6">
            <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55 }}
                    className="rounded-2xl overflow-hidden bg-[#171430] shadow-2xl"
                >
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F0776A]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F3BE4E]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#66C089]" />
                        <span className="ml-2.5 font-mono text-[11px] text-white/40">
                            dailydevtools — json formatter
                        </span>
                    </div>
                    <div className="p-6 font-mono text-[13.5px] leading-[1.9] min-h-[160px]">
                        <div className="text-white/35">{"// paste anything, watch it transform"}</div>
                        <div className="text-white/80 break-all">
                            <span className="text-[#7cf2c0]">$</span> paste{" "}
                            <span className="text-[#f9a566]">{typed}</span>
                            <span className="inline-block w-[7px] h-[15px] bg-[#7cf2c0] align-[-2px] animate-pulse ml-0.5" />
                        </div>
                        {showResult && (
                            <motion.div
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-[#7cf2c0] mt-1"
                            >
                                → ✓ Valid JSON · formatted in 2ms
                            </motion.div>
                        )}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55, delay: 0.1 }}
                >
                    <p className="text-[13px] font-semibold text-[#fb923c] uppercase tracking-widest mb-3">
                        See it work
                    </p>
                    <h2 className="text-[clamp(26px,4vw,42px)] font-bold font-heading text-[var(--title-color)] leading-tight mb-4">
                        Paste it in. Watch it transform.
                    </h2>
                    <p className="text-[var(--muted-text)] text-[15px] leading-relaxed max-w-md">
                        No uploads, no waiting on a server. Validation and formatting happen instantly, right
                        in your browser, the moment you paste.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
