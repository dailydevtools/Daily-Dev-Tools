"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import {
    Github,
    Heart,
    GitCommit,
    Star,
    Users,
    Code,
    ExternalLink,
    GitFork,
} from "lucide-react";

interface Contributor {
    login: string;
    avatar_url: string;
    html_url: string;
    contributions: number;
    type: string;
}

interface RepoStats {
    stars: number;
    forks: number;
}

const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function CommunitySection() {
    const [contributors, setContributors] = useState<Contributor[]>([]);
    const [stats, setStats] = useState<RepoStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch("https://api.github.com/repos/dailydevtools/Daily-Dev-Tools/contributors?per_page=24")
                .then(r => r.json())
                .then(data => (Array.isArray(data) ? data.filter((c: Contributor) => c.type !== "Bot") : [])),
            fetch("https://api.github.com/repos/dailydevtools/Daily-Dev-Tools")
                .then(r => r.json()),
        ])
            .then(([contribs, repo]) => {
                setContributors(contribs);
                if (repo.stargazers_count !== undefined) {
                    setStats({ stars: repo.stargazers_count, forks: repo.forks_count });
                }
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const [featured, second, third, ...rest] = contributors;

    return (
        <section className="relative z-10 py-20 px-6 overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-orange-500/5 via-purple-500/5 to-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-[1200px] mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f973161a] border border-[#f9731633] text-[#fb923c] text-sm font-medium mb-6">
                        <Users size={14} />
                        <span>Open Source Community</span>
                    </div>
                    <h2 className="text-[clamp(28px,5vw,48px)] font-bold font-heading text-[var(--title-color)] mb-4">
                        The people{" "}
                        <span className="bg-gradient-to-br from-[#fb923c] via-[#facc15] to-[#fde047] bg-clip-text text-transparent">
                            building this
                        </span>
                    </h2>
                    <p className="text-lg text-[var(--muted-text)] max-w-[480px] mx-auto leading-relaxed">
                        Every commit, every idea, every bug report — this project is shaped by the community that uses it.
                    </p>
                </motion.div>

                {/* Bento Masonry Grid */}
                {loading ? (
                    <ContributorsSkeleton />
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] gap-4"
                    >
                        {/* Featured contributor — large 2×2 */}
                        {featured && (
                            <motion.a
                                variants={itemVariants}
                                href={featured.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="col-span-2 row-span-2 group relative bg-[var(--card-bg)] border border-[var(--card-border)] rounded-3xl p-8 flex flex-col items-center justify-center text-center overflow-hidden hover:border-[#fb923c]/50 transition-all duration-300"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                <div className="absolute top-4 left-4 text-[10px] font-mono text-[#fb923c]/60 font-bold tracking-widest uppercase">
                                    Top Contributor
                                </div>

                                <div className="relative mb-4">
                                    <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-[#fb923c]/20 group-hover:ring-[#fb923c]/70 transition-all duration-500 shadow-2xl">
                                        <Image
                                            src={featured.avatar_url}
                                            alt={featured.login}
                                            width={96}
                                            height={96}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-br from-[#fb923c] to-[#facc15] flex items-center justify-center text-white text-[10px] font-bold shadow-lg">
                                        #1
                                    </div>
                                </div>

                                <div className="font-bold text-[var(--title-color)] text-xl mb-1">
                                    @{featured.login}
                                </div>
                                <div className="flex items-center gap-1.5 text-[var(--muted-text)] text-sm mb-5">
                                    <GitCommit size={13} />
                                    <span>{featured.contributions} contributions</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-[#fb923c] text-xs font-semibold translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <span>View on GitHub</span>
                                    <ExternalLink size={11} />
                                </div>
                            </motion.a>
                        )}

                        {/* Stat card — stars */}
                        <motion.a
                            variants={itemVariants}
                            href="https://github.com/dailydevtools/Daily-Dev-Tools"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-[var(--card-bg)] border border-[var(--card-border)] rounded-3xl p-6 flex flex-col justify-between hover:border-[#fb923c]/40 transition-all duration-300 overflow-hidden relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            <Star size={20} className="text-[#fb923c]" />
                            <div>
                                <div className="text-3xl font-bold text-[var(--title-color)] mb-0.5">
                                    {stats ? stats.stars.toLocaleString() : "—"}
                                </div>
                                <div className="text-sm text-[var(--muted-text)]">GitHub Stars</div>
                            </div>
                        </motion.a>

                        {/* Stat card — forks */}
                        <motion.a
                            variants={itemVariants}
                            href="https://github.com/dailydevtools/Daily-Dev-Tools/forks"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-[var(--card-bg)] border border-[var(--card-border)] rounded-3xl p-6 flex flex-col justify-between hover:border-[#fb923c]/40 transition-all duration-300 overflow-hidden relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            <GitFork size={20} className="text-[#fb923c]" />
                            <div>
                                <div className="text-3xl font-bold text-[var(--title-color)] mb-0.5">
                                    {stats ? stats.forks.toLocaleString() : "—"}
                                </div>
                                <div className="text-sm text-[var(--muted-text)]">Forks</div>
                            </div>
                        </motion.a>

                        {/* 2nd contributor — medium 1×2 */}
                        {second && (
                            <ContributorCard contributor={second} rank={2} tall />
                        )}

                        {/* 3rd contributor — medium 1×2 */}
                        {third && (
                            <ContributorCard contributor={third} rank={3} tall />
                        )}

                        {/* Stat card — tools */}
                        <motion.div
                            variants={itemVariants}
                            className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-3xl p-6 flex flex-col justify-between"
                        >
                            <Code size={20} className="text-[#fb923c]" />
                            <div>
                                <div className="text-3xl font-bold text-[var(--title-color)] mb-0.5">95+</div>
                                <div className="text-sm text-[var(--muted-text)]">Free Tools</div>
                            </div>
                        </motion.div>

                        {/* Remaining contributors — small 1×1 */}
                        {rest.slice(0, 7).map((contributor) => (
                            <ContributorCard key={contributor.login} contributor={contributor} />
                        ))}

                        {/* "Become a contributor" CTA card */}
                        <motion.a
                            variants={itemVariants}
                            href="https://github.com/dailydevtools/Daily-Dev-Tools"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-gradient-to-br from-[#f973161a] to-[#facc151a] border border-dashed border-[#f9731633] rounded-3xl p-5 flex flex-col items-center justify-center text-center hover:border-[#fb923c]/60 transition-all duration-300 cursor-pointer"
                        >
                            <div className="w-11 h-11 rounded-full bg-[#f973161a] border border-[#f9731633] flex items-center justify-center text-[#fb923c] mb-3 group-hover:scale-110 group-hover:bg-[#f973163a] transition-all duration-300">
                                <Heart size={18} />
                            </div>
                            <div className="font-semibold text-[#fb923c] text-sm">You?</div>
                            <div className="text-[11px] text-[var(--muted-text)] mt-1 leading-snug">
                                Contribute & join the list
                            </div>
                        </motion.a>
                    </motion.div>
                )}

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a
                        href="https://github.com/dailydevtools/Daily-Dev-Tools"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0a0a0a] dark:bg-white text-white dark:text-black font-semibold rounded-full hover:scale-105 transition-transform duration-200 shadow-lg text-sm"
                    >
                        <Github size={18} />
                        <span>Star on GitHub</span>
                        {stats && (
                            <span className="ml-1 pl-3 border-l border-white/20 dark:border-black/20 flex items-center gap-1 font-mono text-xs">
                                <Star size={12} className="fill-current" />
                                {stats.stars.toLocaleString()}
                            </span>
                        )}
                    </a>
                    <p className="text-sm text-[var(--muted-text)]">
                        Open source · MIT License · No paywalls
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

function ContributorCard({
    contributor,
    rank,
    tall,
}: {
    contributor: Contributor;
    rank?: number;
    tall?: boolean;
}) {
    return (
        <motion.a
            variants={itemVariants}
            href={contributor.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative bg-[var(--card-bg)] border border-[var(--card-border)] rounded-3xl flex flex-col items-center justify-center text-center overflow-hidden hover:border-[#fb923c]/40 transition-all duration-300 hover:-translate-y-1 ${tall ? "row-span-2 p-7" : "p-4"}`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-amber-500/0 group-hover:from-orange-500/5 group-hover:to-amber-500/5 transition-all duration-500 pointer-events-none" />

            <div className={`relative ${tall ? "mb-4" : "mb-2.5"}`}>
                <div
                    className={`rounded-full overflow-hidden ring-1 ring-transparent group-hover:ring-[#fb923c]/40 transition-all duration-300 ${tall ? "w-16 h-16" : "w-12 h-12"}`}
                >
                    <Image
                        src={contributor.avatar_url}
                        alt={contributor.login}
                        width={tall ? 64 : 48}
                        height={tall ? 64 : 48}
                        className="w-full h-full object-cover"
                    />
                </div>
                {rank && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] flex items-center justify-center text-[9px] font-bold text-[#fb923c]">
                        #{rank}
                    </div>
                )}
            </div>

            <div className={`font-semibold text-[var(--title-color)] truncate w-full ${tall ? "text-base mb-1" : "text-[13px] mb-0.5"}`}>
                @{contributor.login}
            </div>
            <div className={`text-[var(--muted-text)] flex items-center justify-center gap-1 ${tall ? "text-xs" : "text-[10px]"}`}>
                <GitCommit size={10} />
                <span>{contributor.contributions}</span>
            </div>
        </motion.a>
    );
}

function ContributorsSkeleton() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] gap-4">
            {[
                "col-span-2 row-span-2",
                "",
                "",
                "row-span-2",
                "row-span-2",
                "",
                "",
                "",
                "",
                "",
                "",
            ].map((cls, i) => (
                <div
                    key={i}
                    className={`${cls} bg-[var(--card-bg)] border border-[var(--card-border)] rounded-3xl animate-pulse`}
                />
            ))}
        </div>
    );
}
