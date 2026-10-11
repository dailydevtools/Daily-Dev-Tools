"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

const FAQS = [
    {
        q: "Is my data actually private?",
        a: "Yes. Every tool runs entirely in your browser — nothing you paste, upload or generate is ever sent to a server. That's the whole premise of the project.",
    },
    {
        q: "Do I need to create an account?",
        a: "No. There's no sign-up, no login, no email required for any tool. Open it and start using it.",
    },
    {
        q: "Is it really free forever?",
        a: "Yes — no premium tier, no paywalled tools, no usage limits. Free and open source, always.",
    },
    {
        q: "Can I use it offline or self-host it?",
        a: "The project is open source on GitHub, so you can clone it and run it locally, or contribute a new tool yourself.",
    },
    {
        q: "Which browsers are supported?",
        a: "Any modern browser — Chrome, Firefox, Safari, Edge. No installs required, though we do have optional Chrome and VS Code extensions.",
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="relative z-10 py-20 px-6">
            <div className="max-w-[760px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <p className="text-[13px] font-semibold text-[#fb923c] uppercase tracking-widest mb-3">FAQ</p>
                    <h2 className="text-[clamp(26px,4vw,42px)] font-bold font-heading text-[var(--title-color)] leading-tight">
                        Before you ask
                    </h2>
                </motion.div>

                <div className="flex flex-col gap-3">
                    {FAQS.map((faq, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <motion.div
                                key={faq.q}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                                className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] overflow-hidden"
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenIndex(isOpen ? null : i)}
                                    aria-expanded={isOpen}
                                    className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 cursor-pointer"
                                >
                                    <span className="font-heading font-semibold text-[16px] text-[var(--title-color)]">
                                        {faq.q}
                                    </span>
                                    <span
                                        className={`shrink-0 w-6 h-6 rounded-full bg-[var(--background)] border border-[var(--border-color)] flex items-center justify-center transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                                    >
                                        <Plus size={13} className="text-[var(--title-color)]" />
                                    </span>
                                </button>
                                <div
                                    className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                                >
                                    <div className="overflow-hidden">
                                        <p className="text-[14.5px] leading-relaxed text-[var(--muted-text)] px-6 pb-5">
                                            {faq.a}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
