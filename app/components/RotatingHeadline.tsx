"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ROTATING_WORDS = ["JSON", "JWTs", "Base64", "regex", "colors", "timestamps"];

export default function RotatingHeadline() {
    const [index, setIndex] = useState(0);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) return;
        const id = window.setInterval(() => {
            setIndex((i) => (i + 1) % ROTATING_WORDS.length);
        }, 2000);
        return () => window.clearInterval(id);
    }, [prefersReducedMotion]);

    return (
        <section className="relative z-10 py-20 px-6 text-center overflow-hidden">
            <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-[13px] font-semibold text-[#fb923c] uppercase tracking-widest mb-5"
            >
                One toolbox, every job
            </motion.p>
            <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className="text-[clamp(26px,4.5vw,48px)] font-bold font-heading text-[var(--title-color)] leading-[1.25] max-w-[820px] mx-auto"
            >
                DailyDevTools formats, decodes and converts your{" "}
                <span className="relative inline-flex h-[1.25em] min-w-[4.8ch] align-bottom overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={ROTATING_WORDS[index]}
                            initial={{ y: prefersReducedMotion ? 0 : 24, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: prefersReducedMotion ? 0 : -24, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute left-0 right-0 text-center bg-gradient-to-br from-[#fb923c] via-[#facc15] to-[#fde047] bg-clip-text text-transparent"
                        >
                            {ROTATING_WORDS[index]}
                        </motion.span>
                    </AnimatePresence>
                </span>
                , so you don&apos;t have to.
            </motion.h2>
        </section>
    );
}
