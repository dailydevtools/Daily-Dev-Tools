"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Github, Heart, MessageSquare, Code, Users } from "lucide-react";

export default function CommunitySection() {
    const t = useTranslations('Homepage');

    const stats = [
        { label: "Open Source", value: "100%", icon: Code },
        { label: "Free Forever", value: "100%", icon: Heart },
        { label: "Community", value: "Active", icon: Users },
    ];

    return (
        <section className="relative z-10 py-12 px-6 flex flex-col items-center overflow-hidden">
            {/* Abstract background shapes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-tr from-orange-500/5 via-purple-500/5 to-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-[1200px] mx-auto relative z-10">
                <div className="bg-[var(--card-bg)] backdrop-blur-2xl border border-[var(--card-border)] rounded-[32px] p-8 md:p-16 text-center relative overflow-hidden group">
                    {/* Top Pulse Animation */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#fb923c] to-transparent animate-pulse-border opacity-50" />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f973161a] border border-[#f9731633] text-[#fb923c] text-sm font-medium mb-8">
                            <Heart size={14} className="fill-current" />
                            <span>Community Driven</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold font-heading text-[var(--title-color)] mb-6">
                            Built for Developers, <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fb923c] to-[#facc15]">by Developers</span>
                        </h2>

                        <p className="text-lg text-[var(--muted-text)] mb-10 leading-relaxed">
                            Daily Dev Tools is an open-source project dedicated to providing free, high-quality tools for the developer community. No tracking, no paywalls, just useful utilities.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mb-16">
                            <a
                                href="https://github.com/dailydevtools/Daily-Dev-Tools"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-[#0a0a0a] dark:bg-white text-white dark:text-black font-semibold rounded-full hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl"
                            >
                                <Github size={20} />
                                <span>Star on GitHub</span>
                            </a>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-[var(--border-color)]">
                            {stats.map((stat, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full bg-[var(--background)] flex items-center justify-center text-[#fb923c] mb-3 shadow-sm border border-[var(--border-color)]">
                                        <stat.icon size={20} />
                                    </div>
                                    <div className="text-2xl font-bold text-[var(--title-color)]">{stat.value}</div>
                                    <div className="text-sm text-[var(--muted-text)]">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="w-full max-w-[800px] mt-10 mx-auto flex justify-center">
                            <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] w-full p-[clamp(24px,5vw,40px)] text-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(249,115,22,0.05)] to-[rgba(250,204,21,0.05)]"></div>
                                <div className="relative z-10 flex flex-col items-center">
                                    <p className="text-[var(--muted-text)] text-sm mb-4 italic text-center">“Have an idea or found a bug? Your feed  back drives what we build next.”</p>
                                    <button className="bg-transparent border border-[var(--border-color)] text-[var(--muted-text)] hover:text-[var(--title-color)] hover:border-[#fb923c] text-xs px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer">Share Feedback</button>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}
