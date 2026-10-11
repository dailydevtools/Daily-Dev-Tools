"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "../../i18n/routing";

export default function MagneticCTA() {
    const wrapRef = useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const prefersReducedMotion = useReducedMotion();

    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (prefersReducedMotion || !wrapRef.current) return;
        const rect = wrapRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.45;
        setPos({ x, y });
    };
    const reset = () => setPos({ x: 0, y: 0 });

    return (
        <section className="relative z-10 py-24 px-6 text-center border-t border-[var(--border-color)]">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-[clamp(28px,4.5vw,48px)] font-bold font-heading text-[var(--title-color)] leading-[1.2] max-w-[640px] mx-auto mb-10"
            >
                Try the button.
                <br />
                It wants to be clicked.
            </motion.h2>
            <motion.div
                ref={wrapRef}
                onMouseMove={handleMove}
                onMouseLeave={reset}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="inline-block"
            >
                <Link
                    href="/tools"
                    style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
                    className="inline-flex items-center gap-2 px-9 py-4 bg-[#f97316] hover:bg-[#ea6c10] text-white font-semibold rounded-full text-base transition-[transform,background-color] duration-200 ease-out shadow-[0_10px_36px_rgba(249,115,22,0.4)] no-underline"
                >
                    Explore all tools
                    <ArrowRight size={17} />
                </Link>
            </motion.div>
        </section>
    );
}
