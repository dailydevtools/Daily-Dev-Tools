"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, Braces, Code2, KeyRound } from "lucide-react";
import { Link } from "../../i18n/routing";
import { useTranslations } from "next-intl";
import { tools } from "../data/tools";
import WebsiteSchema from "../components/WebsiteSchema";
import ToolIcon from "../components/ToolIcon";
import PopularTools from "../components/PopularTools";
import CategoryShowcase from "../components/CategoryShowcase";
import ExtensionsSection from "../components/ExtensionsSection";
import FAQSection from "../components/FAQSection";
import CommunitySection from "../components/CommunitySection";
import OrbitHero from "../components/OrbitHero";
import MagneticCTA from "../components/MagneticCTA";

const STATS = [
    { value: 95, suffix: "+", label: "useful tools" },
    { value: 29, suffix: "", label: "languages" },
    { value: 100, suffix: "%", label: "runs locally" },
    { value: 0, suffix: "$", label: "forever free", prefix: true },
];
const QUICK_TOOLS = [
    { id: "json-formatter", icon: Braces, label: "JSON Formatter", color: "#f97316" },
    { id: "jwt-decoder", icon: KeyRound, label: "JWT Decoder", color: "#8b5cf6" },
    { id: "regex-tester", icon: Code2, label: "Regex Tester", color: "#0ea5e9" },
];

function useCountUp(target: number, isInView: boolean) {
    const [count, setCount] = useState(0);
    const ran = useRef(false);
    useEffect(() => {
        if (!isInView || ran.current) return;
        ran.current = true;
        if (target === 0) return;
        const started = performance.now();
        const tick = (now: number) => {
            const progress = Math.min((now - started) / 1300, 1);
            setCount(Math.round(target * (1 - Math.pow(1 - progress, 4))));
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [isInView, target]);
    return count;
}

function Stat({ value, suffix, label, prefix }: (typeof STATS)[number]) {
    const ref = useRef<HTMLDivElement>(null);
    const count = useCountUp(value, useInView(ref, { once: true }));
    return <div ref={ref} className="relative px-4 py-5 text-center md:text-left">
        <div className="font-heading text-[clamp(28px,3.5vw,42px)] font-bold leading-none tracking-[-0.04em] text-[#12213f] dark:text-white">{prefix ? suffix : ""}{count}{prefix ? "" : suffix}</div>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#746b5e] dark:text-neutral-400">{label}</p>
    </div>;
}

export default function Home() {
    const tTools = useTranslations("Tools");
    const [recents, setRecents] = useState<typeof tools>([]);
    const reducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            try {
                const saved = JSON.parse(localStorage.getItem("recent_tools") || "[]") as string[];
                setRecents(saved.map((id) => tools.find((tool) => tool.id === id)).filter(Boolean) as typeof tools);
            } catch { setRecents([]); }
        });
        return () => cancelAnimationFrame(frame);
    }, []);

    return <main className="relative min-h-screen overflow-hidden">
        <WebsiteSchema />
        {!reducedMotion && <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[110] h-[3px] origin-left bg-gradient-to-r from-orange-500 via-amber-400 to-violet-500" />}
        <OrbitHero />
        <section className="relative z-10 -mt-7 px-6">
            <div className="mx-auto grid max-w-[1100px] grid-cols-2 overflow-hidden rounded-[26px] border border-[#ddcfb8] bg-[#fffaf0] shadow-[0_18px_50px_rgba(64,47,24,.10)] dark:border-white/10 dark:bg-[#101c35] md:grid-cols-4">
                {STATS.map((stat, index) => <div key={stat.label} className={index ? "border-l border-[#e7dbc7] dark:border-white/10" : ""}><Stat {...stat} /></div>)}
            </div>
        </section>
        {recents.length > 0 && <section className="px-6 pt-12"><div className="mx-auto flex max-w-[1100px] flex-wrap items-center gap-2">
            <span className="mr-2 text-[11px] font-bold uppercase tracking-[.16em] text-[var(--muted-text)]">Pick up where you left off</span>
            {recents.slice(0, 5).map((tool) => <Link key={tool.id} href={`/tools/${tool.id}`} className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] px-3 py-2 text-xs font-semibold text-[var(--title-color)] no-underline transition hover:border-orange-400"><ToolIcon name={tool.icon} size={13} className="text-orange-500" />{tTools(`${tool.id}.name`, { fallback: tool.name })}</Link>)}
        </div></section>}
        <PopularTools />
        <section className="relative px-6 py-20">
            <div className="mx-auto grid max-w-[1100px] overflow-hidden rounded-[34px] bg-[#12213f] text-white shadow-[0_28px_70px_rgba(18,33,63,.18)] lg:grid-cols-[.9fr_1.1fr]">
                <div className="relative p-8 md:p-12">
                    <div className="absolute -left-16 -top-16 h-52 w-52 rounded-full bg-orange-500/20 blur-3xl" />
                    <p className="relative text-xs font-bold uppercase tracking-[.18em] text-orange-300">One toolbox, less context switching</p>
                    <h2 className="relative mt-4 font-heading text-[clamp(30px,4vw,48px)] font-bold leading-[1.05] tracking-[-.04em]">Small utilities that stay out of your way.</h2>
                    <p className="relative mt-5 max-w-md text-[15px] leading-7 text-slate-300">Everything runs client-side and follows the same simple rhythm: paste, transform, copy. Your focus stays on the work that matters.</p>
                </div>
                <div className="grid gap-px bg-white/10 sm:grid-cols-3">
                    {QUICK_TOOLS.map(({ id, icon: Icon, label, color }) => <Link key={id} href={`/tools/${id}`} className="group flex min-h-[220px] flex-col justify-between bg-[#0d1a33] p-7 text-white no-underline transition hover:bg-[#172744]">
                        <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10" style={{ backgroundColor: `${color}18`, color }}><Icon size={20} /></span>
                        <span><span className="block text-base font-bold">{label}</span><span className="mt-2 inline-flex items-center gap-1 text-xs text-white/45 transition group-hover:text-orange-300">Open tool <ArrowRight size={13} /></span></span>
                    </Link>)}
                </div>
            </div>
        </section>
        <CategoryShowcase />
        <ExtensionsSection />
        <FAQSection />
        <CommunitySection />
        <MagneticCTA />
    </main>;
}
