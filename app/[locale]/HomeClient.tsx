"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "../../i18n/routing";
import { Github, Star, ArrowRight, Zap, Shield, Globe, Sparkles } from "lucide-react";
import { tools } from "../data/tools";
import WebsiteSchema from "../components/WebsiteSchema";
import ToolIcon from "../components/ToolIcon";
import ToolMarquee from "../components/ToolMarquee";
import { useTranslations } from "next-intl";
import MeshGradientBackground from "../components/MeshGradientBackground";
import PopularTools from "../components/PopularTools";
import CategoryShowcase from "../components/CategoryShowcase";
import CommunitySection from "../components/CommunitySection";
import HowItWorks from "../components/HowItWorks";
import ExtensionsSection from "../components/ExtensionsSection";
import { motion, useInView } from "framer-motion";

const PREVIEW_TOOLS = tools.slice(0, 12);

const FEATURES = [
    {
        icon: Shield,
        label: "Privacy",
        title: "Privacy by design",
        desc: "Nothing ever leaves your device. Every tool runs 100% in your browser — no servers, no tracking, no exceptions.",
        accent: "from-emerald-500/8 to-transparent",
        border: "hover:border-emerald-500/30",
        iconColor: "text-emerald-500",
        iconBg: "bg-emerald-500/10 border-emerald-500/20",
        glow: "rgba(16,185,129,0.25)",
    },
    {
        icon: Zap,
        label: "Speed",
        title: "No friction, ever",
        desc: "No account, no install, no loading spinner. Open a tool, use it, done. The way utilities should work.",
        accent: "from-orange-500/8 to-transparent",
        border: "hover:border-orange-500/30",
        iconColor: "text-orange-400",
        iconBg: "bg-orange-500/10 border-orange-500/20",
        glow: "rgba(249,115,22,0.25)",
    },
    {
        icon: Globe,
        label: "Global",
        title: "29 languages",
        desc: "Developer tools belong to everyone. Fully localized for 29 locales so you can work in your native language.",
        accent: "from-blue-500/8 to-transparent",
        border: "hover:border-blue-500/30",
        iconColor: "text-blue-400",
        iconBg: "bg-blue-500/10 border-blue-500/20",
        glow: "rgba(59,130,246,0.25)",
    },
];

const STATS = [
    { value: 95, suffix: "+", label: "Developer tools" },
    { value: 29, suffix: "", label: "Languages" },
    { value: 100, suffix: "%", label: "Client-side" },
    { value: 0, suffix: "$", label: "Forever free", prefix: true },
];

// Inline tech brand SVG logos (trust strip)
const TRUST_LOGOS = [
    {
        name: "TypeScript",
        svg: `<svg viewBox="0 0 24 24" fill="#3178C6"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg>`
    },
    {
        name: "React",
        svg: `<svg viewBox="0 0 24 24" fill="#61DAFB"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09c.278 0 .4.107.463.157.617.358.86 1.7.43 3.465-.806-.219-1.683-.378-2.598-.468a18.717 18.717 0 0 0-1.658-1.578C14.8 3.476 16.104 2.406 17.2 2.406h-.002zm-9.386-.002c1.096 0 2.4 1.07 3.362 2.874a18.717 18.717 0 0 0-1.658 1.578 18.27 18.27 0 0 0-2.598.468c-.43-1.766-.187-3.108.43-3.466.064-.05.184-.157.462-.157l.002.703zM12 8.27c.596 0 1.175.026 1.726.072.456.47.918.978 1.369 1.527.45.55.87 1.107 1.248 1.655.378.549.724 1.098 1.02 1.635.297.537.545 1.07.738 1.59a18.33 18.33 0 0 1-1.02 1.634 17.95 17.95 0 0 1-1.248 1.655 19.05 19.05 0 0 1-1.369 1.527c-.55.046-1.13.072-1.726.072-.596 0-1.175-.026-1.726-.072a18.706 18.706 0 0 1-1.369-1.527 17.95 17.95 0 0 1-1.248-1.655 18.33 18.33 0 0 1-1.02-1.634 17.95 17.95 0 0 1-.738-1.59c.193-.52.44-1.053.738-1.59.297-.537.643-1.086 1.02-1.635.378-.548.798-1.105 1.248-1.655a18.706 18.706 0 0 1 1.369-1.527c.55-.046 1.13-.072 1.726-.072zm-6.5 5.734c-.32.614-.596 1.23-.822 1.84A17.95 17.95 0 0 0 3.84 12.004c0-.616.116-1.23.338-1.84.227-.612.503-1.228.822-1.84a18.11 18.11 0 0 0 0 7.68zM18.5 12.004c0 .616-.116 1.23-.338 1.84-.227.612-.503 1.228-.822 1.84a18.11 18.11 0 0 0 0-7.68c.32.612.595 1.228.822 1.84.222.61.338 1.224.338 1.84zM5.52 16.19c.43 1.766.187 3.108-.43 3.465-.063.05-.183.158-.462.158-1.096 0-2.4-1.07-3.362-2.874a18.717 18.717 0 0 0 1.658-1.578 18.27 18.27 0 0 0 2.598.829zm13.016 0c.806.22 1.683.56 2.598.83a18.717 18.717 0 0 0 1.658 1.578c-.962 1.804-2.266 2.874-3.362 2.874-.278 0-.4-.107-.462-.158-.617-.358-.86-1.7-.43-3.465l-.002-.66zm-10.48.468A17.95 17.95 0 0 0 12 17.737c.617 0 1.218-.036 1.795-.102a18.706 18.706 0 0 0 1.369 1.527c-.962.78-1.95 1.44-2.8 1.82a10.3 10.3 0 0 1-.364.152 10.3 10.3 0 0 1-.364-.152c-.85-.38-1.838-1.04-2.8-1.82a18.706 18.706 0 0 0 1.369-1.527c-.578.066-1.178.102-1.795.102v-.278z"/></svg>`
    },
    {
        name: "Node.js",
        svg: `<svg viewBox="0 0 24 24" fill="#339933"><path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L1.226,18.419C0.48,18.005,0,17.207,0,16.071V5.921 C0,4.789,0.48,3.99,1.226,3.578l8.795-5.079c0.726-0.407,1.692-0.407,2.415,0l8.794,5.079C22.02,3.99,22.5,4.789,22.5,5.921v10.15 c0,1.131-0.48,1.93-1.226,2.344l-8.795,5.077C12.641,23.916,12.321,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/></svg>`
    },
    {
        name: "Python",
        svg: `<svg viewBox="0 0 24 24"><defs><linearGradient id="py-a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#387EB8"/><stop offset="1" stop-color="#366994"/></linearGradient><linearGradient id="py-b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFE052"/><stop offset="1" stop-color="#FFC331"/></linearGradient></defs><path fill="url(#py-a)" d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.89S0 5.789 0 11.969c0 6.18 3.403 5.963 3.403 5.963h2.031v-2.867s-.109-3.404 3.35-3.404h5.766s3.24.052 3.24-3.131V3.298S18.304 0 11.914 0zM8.708 1.91a1.049 1.049 0 1 1 0 2.098 1.049 1.049 0 0 1 0-2.097z"/><path fill="url(#py-b)" d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.814v-.826h8.131S24 18.211 24 12.031c0-6.18-3.403-5.963-3.403-5.963h-2.031v2.867s.109 3.404-3.35 3.404H9.45s-3.24-.052-3.24 3.131V20.7S5.696 24 12.086 24zm3.206-1.91a1.049 1.049 0 1 1 0-2.098 1.049 1.049 0 0 1 0 2.097z"/></svg>`
    },
    {
        name: "VS Code",
        svg: `<svg viewBox="0 0 24 24" fill="#007ACC"><path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/></svg>`
    },
    {
        name: "Docker",
        svg: `<svg viewBox="0 0 24 24" fill="#2496ED"><path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/></svg>`
    },
    {
        name: "Git",
        svg: `<svg viewBox="0 0 24 24" fill="#F05032"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/></svg>`
    },
    {
        name: "Vite",
        svg: `<svg viewBox="0 0 24 24"><defs><linearGradient id="vite-a" x1="6" y1=".689" x2="13.5" y2="14.939" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#41D1FF"/><stop offset="1" stop-color="#BD34FE"/></linearGradient><linearGradient id="vite-b" x1="15" y1="5.939" x2="18.5" y2="18.939" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#FF3CAC"/><stop offset="1" stop-color="#FF9A03"/></linearGradient></defs><path d="M23.997 3.617L12.537 23.25a.574.574 0 0 1-.995.005L.003 3.62a.574.574 0 0 1 .536-.794l11.964 2.16a.574.574 0 0 0 .206 0L23.46 2.82a.574.574 0 0 1 .537.797z" fill="url(#vite-a)"/><path d="M17.657.01L9.124 1.52a.174.174 0 0 0-.142.16l-.498 7.457a.174.174 0 0 0 .197.186l2.36-.447a.174.174 0 0 1 .2.2l-.699 3.4a.174.174 0 0 0 .225.2l1.456-.442a.174.174 0 0 1 .225.2l-1.11 5.37c-.07.337.393.522.588.234l.13-.2 7.108-14.199c.094-.188-.064-.408-.27-.374L17.27 3.75a.174.174 0 0 1-.2-.204l.782-3.303A.174.174 0 0 0 17.657.01z" fill="url(#vite-b)"/></svg>`
    },
];

// Animated counter hook
function useCountUp(target: number, isInView: boolean, duration = 1.6) {
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!isInView || hasAnimated.current) return;
        hasAnimated.current = true;
        if (target === 0) { return; }

        const start = performance.now();
        const tick = (now: number) => {
            const elapsed = (now - start) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quart
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [isInView, target, duration]);

    return count;
}

function AnimatedStat({ value, suffix, label, prefix }: { value: number; suffix: string; label: string; prefix?: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });
    const count = useCountUp(value, isInView);

    return (
        <div ref={ref}>
            <div className="text-[clamp(28px,4vw,42px)] font-bold font-heading text-[var(--title-color)] leading-none mb-1.5 tabular-nums">
                {prefix ? suffix : ""}{count}{!prefix ? suffix : ""}
            </div>
            <div className="text-sm text-[var(--muted-text)]">{label}</div>
        </div>
    );
}

// Spotlight feature card
function FeatureCard({ feat, index }: { feat: typeof FEATURES[0]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        cardRef.current.style.setProperty('--mouse-x', `${x}%`);
        cardRef.current.style.setProperty('--mouse-y', `${y}%`);
    }, []);

    const Icon = feat.icon;
    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: index * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMouseMove}
            className={`spotlight-card relative overflow-hidden rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8 group transition-all duration-300 hover:-translate-y-1 ${feat.border}`}
            style={{ "--mouse-x": "50%", "--mouse-y": "50%" } as React.CSSProperties}
        >
            {/* Spotlight radial hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl"
                style={{
                    background: `radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), ${feat.glow.replace('0.25', '0.08')}, transparent 60%)`,
                }}
            />

            {/* Accent gradient fill */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feat.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none`} />

            {/* Large background icon ghost */}
            <div className="absolute bottom-3 right-3 opacity-[0.04] pointer-events-none">
                <Icon size={110} />
            </div>

            <div className="relative z-10">
                <div
                    className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 ${feat.iconBg} ${feat.iconColor}`}
                    style={{ boxShadow: "0 0 0 0 transparent", transition: "all 0.3s ease" }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px 4px ${feat.glow}`;
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 transparent`;
                    }}
                >
                    <Icon size={22} strokeWidth={1.75} />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--muted-text)] mb-2">
                    {feat.label}
                </p>
                <h3 className="text-[19px] font-bold font-heading text-[var(--title-color)] mb-3 leading-snug">
                    {feat.title}
                </h3>
                <p className="text-[var(--muted-text)] text-[14.5px] leading-relaxed">
                    {feat.desc}
                </p>
            </div>
        </motion.div>
    );
}

export default function Home() {
    const t = useTranslations("Homepage");
    const tTools = useTranslations("Tools");
    const [recents, setRecents] = useState<typeof tools>([]);
    const [mounted, setMounted] = useState(false);
    const [stars, setStars] = useState<number | null>(null);

    // Hero parallax tilt
    const mockupRef = useRef<HTMLDivElement>(null);

    const handleHeroMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
        if (!mockupRef.current) return;
        const rect = mockupRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = (e.clientX - centerX) / (rect.width / 2);
        const dy = (e.clientY - centerY) / (rect.height / 2);
        const rotX = -dy * 3;
        const rotY = dx * 3;
        mockupRef.current.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`;
    }, []);

    const handleHeroMouseLeave = useCallback(() => {
        if (!mockupRef.current) return;
        mockupRef.current.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0)`;
    }, []);

    useEffect(() => {
        const tid = window.setTimeout(() => {
            setMounted(true);
            const saved = localStorage.getItem("recent_tools");
            if (saved) {
                const ids = JSON.parse(saved);
                setRecents(
                    ids
                        .map((id: string) => tools.find((t) => t.id === id))
                        .filter(Boolean)
                );
            }
        }, 0);

        fetch("https://api.github.com/repos/dailydevtools/Daily-Dev-Tools")
            .then((r) => r.json())
            .then((d) => { if (d.stargazers_count) setStars(d.stargazers_count); })
            .catch(() => {});

        return () => window.clearTimeout(tid);
    }, []);

    // Double up trust logos for seamless marquee
    const allLogos = [...TRUST_LOGOS, ...TRUST_LOGOS];

    return (
        <div className="relative min-h-screen overflow-x-hidden">
            <WebsiteSchema />

            {/* ── Ambient aurora background ──────────── */}
            <div className="absolute top-0 left-0 right-0 h-[1100px] overflow-hidden pointer-events-none z-0">
                <MeshGradientBackground />
            </div>

            {/* ── Hero ───────────────────────────────── */}
            <section
                className="relative z-10 pt-28 md:pt-36 pb-8 px-6 flex flex-col items-center"
                onMouseMove={handleHeroMouseMove}
                onMouseLeave={handleHeroMouseLeave}
            >
                <div className="w-full max-w-[1100px] mx-auto flex flex-col items-center text-center">

                    {/* ── Animated eyebrow badge ──────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-8"
                    >
                        <div className="badge-shimmer relative inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#f9731644] bg-gradient-to-r from-[#f9731615] via-[#facc1510] to-[#f9731615] text-[13px] text-[#fb923c] font-semibold backdrop-blur-sm cursor-default">
                            <div className="relative">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-60" />
                            </div>
                            <Sparkles size={13} className="opacity-80" />
                            <span>95+ free tools — no login required</span>
                            <span className="w-px h-3.5 bg-[#f9731630]" />
                            <span className="text-[11px] font-bold uppercase tracking-wider opacity-70">Open source</span>
                        </div>
                    </motion.div>

                    {/* ── Headline ────────────────────────── */}
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-[clamp(42px,8vw,88px)] font-bold font-heading leading-[1.0] tracking-tight text-[var(--title-color)] mb-5"
                    >
                        {t("titleLine1")}
                        <br />
                        <span className="gradient-text-animate">
                            {t("titleLine2")}
                        </span>
                    </motion.h1>

                    {/* ── Subtitle ────────────────────────── */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.18 }}
                        className="text-lg md:text-xl text-[var(--muted-text)] max-w-[520px] leading-[1.65] mb-10"
                    >
                        {t("subtitle")}
                    </motion.p>

                    {/* ── CTAs ────────────────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.26 }}
                        className="flex flex-col sm:flex-row items-center gap-3 mb-14"
                    >
                        <Link
                            href="/tools"
                            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#f97316] hover:bg-[#ea6c10] text-white font-semibold rounded-full text-sm transition-all duration-200 shadow-[0_4px_24px_rgba(249,115,22,0.45)] hover:shadow-[0_8px_36px_rgba(249,115,22,0.60)] hover:-translate-y-[2px] animate-pulse-glow cursor-pointer"
                        >
                            Explore all tools
                            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                        </Link>

                        <a
                            href="https://github.com/dailydevtools/Daily-Dev-Tools"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 px-7 py-3.5 border border-[var(--border-color)] hover:border-[var(--muted-text)] text-[var(--title-color)] font-semibold rounded-full text-sm transition-all duration-200 hover:-translate-y-[2px] bg-[var(--card-bg)] backdrop-blur-sm cursor-pointer"
                        >
                            <Github size={15} />
                            GitHub
                            {stars !== null && (
                                <span className="flex items-center gap-1 pl-3 ml-0.5 border-l border-[var(--border-color)] text-[var(--muted-text)] font-mono text-[11px]">
                                    <Star size={11} className="fill-amber-400 text-amber-400" />
                                    {stars.toLocaleString()}
                                </span>
                            )}
                        </a>
                    </motion.div>

                    {/* ── Product mockup — parallax tilt ──── */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.75, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full max-w-[860px] relative mb-6"
                    >
                        {/* Glowing border ring */}
                        <div
                            className="absolute -inset-[1.5px] rounded-[22px] pointer-events-none animate-border-sweep z-10"
                            style={{
                                background: "linear-gradient(135deg, rgba(249,115,22,0.5), rgba(250,204,21,0.3), rgba(139,92,246,0.3), rgba(249,115,22,0.5))",
                                backgroundSize: "300% 300%",
                                padding: "1.5px",
                                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                WebkitMaskComposite: "xor",
                                maskComposite: "exclude",
                            }}
                        />

                        {/* Glow beneath card */}
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-[#f97316]/20 blur-2xl rounded-full pointer-events-none" />

                        <div
                            ref={mockupRef}
                            className="relative rounded-[20px] border border-[var(--card-border)] bg-[var(--card-bg)] backdrop-blur-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.15)]"
                            style={{ transition: "transform 0.2s ease-out" }}
                        >
                            {/* Browser chrome */}
                            <div className="flex items-center gap-1.5 px-4 py-3.5 border-b border-[var(--border-color)] bg-[var(--header-bg)]">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                                <div className="ml-4 flex-1 bg-[var(--background)] rounded-md h-[22px] max-w-[200px] flex items-center px-3 border border-[var(--border-color)]">
                                    <span className="text-[10px] text-[var(--muted-text)] font-mono">dailydev.tools</span>
                                </div>
                            </div>

                            {/* Tool grid inside mockup */}
                            <div className="p-5 grid grid-cols-4 sm:grid-cols-6 gap-2.5">
                                {PREVIEW_TOOLS.map((tool, i) => (
                                    <motion.div
                                        key={tool.id}
                                        initial={{ opacity: 0, scale: 0.82 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.5 + i * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                        className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-[var(--background)] border border-[var(--border-color)] hover:border-[#fb923c]/50 hover:bg-[#fb923c]/5 transition-all duration-200 cursor-default group"
                                    >
                                        <div className="w-7 h-7 rounded-lg bg-[#f973161a] flex items-center justify-center text-[#fb923c] group-hover:scale-110 group-hover:shadow-[0_0_10px_rgba(249,115,22,0.3)] transition-all">
                                            <ToolIcon name={tool.icon} size={16} />
                                        </div>
                                        <span className="text-[9px] text-[var(--muted-text)] text-center leading-tight line-clamp-2 w-full">
                                            {tool.name}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Fade at bottom of mockup */}
                            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[var(--card-bg)] to-transparent pointer-events-none" />
                        </div>
                    </motion.div>

                    {/* ── Trust logos strip ──────────────── */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                        className="w-full mb-10"
                    >
                        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted-text)] mb-4 text-center">
                            Built for engineers who use
                        </p>
                        <div className="group w-full overflow-x-hidden relative before:content-[''] before:absolute before:top-0 before:bottom-0 before:w-24 before:z-[2] before:pointer-events-none before:left-0 before:bg-gradient-to-r before:from-[var(--background)] before:to-transparent after:content-[''] after:absolute after:top-0 after:bottom-0 after:w-24 after:z-[2] after:pointer-events-none after:right-0 after:bg-gradient-to-l after:from-[var(--background)] after:to-transparent">
                            <div className="flex gap-6 w-fit animate-marquee-reverse group-hover:[animation-play-state:paused]">
                                {allLogos.map((logo, index) => (
                                    <div
                                        key={`${logo.name}-${index}`}
                                        className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-200 cursor-default"
                                        title={logo.name}
                                    >
                                        <span
                                            className="w-5 h-5 flex-shrink-0"
                                            dangerouslySetInnerHTML={{ __html: logo.svg }}
                                        />
                                        <span className="text-[12px] font-medium text-[var(--muted-text)] whitespace-nowrap">
                                            {logo.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Tool Marquee */}
                    <div className="w-full overflow-hidden">
                        <ToolMarquee />
                    </div>
                </div>
            </section>

            {/* ── Recently used (pill strip) ─────────── */}
            {mounted && recents.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="relative z-10 px-6 pt-6 pb-2"
                >
                    <div className="max-w-[1100px] mx-auto flex items-center gap-2.5 flex-wrap">
                        <span className="text-[11px] text-[var(--muted-text)] font-semibold uppercase tracking-widest shrink-0 mr-1">
                            Recent
                        </span>
                        {recents.slice(0, 6).map((tool) => (
                            <Link
                                key={tool.id}
                                href={`/tools/${tool.id}`}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] text-xs text-[var(--muted-text)] hover:border-[#fb923c]/50 hover:text-[var(--title-color)] hover:bg-[#fb923c]/5 transition-all no-underline cursor-pointer"
                            >
                                <ToolIcon name={tool.icon} size={11} className="text-[#fb923c]" />
                                {tTools(`${tool.id}.name`, { fallback: tool.name })}
                            </Link>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* ── Stats bar (animated counters) ──────── */}
            <div className="relative z-10 py-12 px-6 border-y border-[var(--border-color)] mt-6">
                <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {STATS.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.4 }}
                        >
                            <AnimatedStat
                                value={stat.value}
                                suffix={stat.suffix}
                                label={stat.label}
                                prefix={stat.prefix}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ── Popular Tools ──────────────────────── */}
            <PopularTools />

            {/* ── How It Works ───────────────────────── */}
            <HowItWorks />

            {/* ── Features ───────────────────────────── */}
            <section className="relative z-10 py-24 px-6">
                <div className="max-w-[1100px] mx-auto">
                    {/* Section header */}
                    <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <p className="text-[13px] font-semibold text-[#fb923c] uppercase tracking-widest mb-3">
                                Why this, not that
                            </p>
                            <h2 className="text-[clamp(28px,4.5vw,44px)] font-bold font-heading text-[var(--title-color)] leading-tight">
                                Built different.
                            </h2>
                        </div>
                        <p className="text-[var(--muted-text)] max-w-xs md:text-right text-sm leading-relaxed">
                            Most online tools ship your data to a server. We don&apos;t. Here&apos;s what that means.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {FEATURES.map((feat, i) => (
                            <FeatureCard key={i} feat={feat} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Extensions Showcase ────────────────── */}
            <ExtensionsSection />

            {/* ── Category Showcase ──────────────────── */}
            <CategoryShowcase />

            {/* ── Community / Contributors ───────────── */}
            <CommunitySection />
        </div>
    );
}
