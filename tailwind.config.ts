import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-space)', 'sans-serif'],
                heading: ['var(--font-space)', 'sans-serif'],
            },
            colors: {
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                },
                accent: {
                    purple: '#8b5cf6',
                    pink: '#ec4899',
                    orange: '#f97316',
                    green: '#10b981',
                },
                dark: {
                    bg: '#0a0a0f',
                    card: '#13131a',
                    border: '#1f1f29',
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-mesh': 'radial-gradient(at 40% 20%, hsla(28,100%,74%,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,0.15) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,0.15) 0px, transparent 50%)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-slow': 'float-slow 10s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'aurora-1': 'aurora-1 18s ease-in-out infinite',
                'aurora-2': 'aurora-2 22s ease-in-out infinite',
                'aurora-3': 'aurora-3 25s ease-in-out infinite',
                'aurora-4': 'aurora-4 20s ease-in-out infinite',
                'shimmer-sweep': 'shimmer-sweep 3.5s linear infinite',
                'border-sweep': 'border-sweep 4s linear infinite',
                'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
                'spin-slow': 'spin-slow 12s linear infinite',
                'marquee': 'marquee 50s linear infinite',
                'marquee-reverse': 'marquee-reverse 50s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'float-slow': {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '33%': { transform: 'translateY(-18px) rotate(1.5deg)' },
                    '66%': { transform: 'translateY(-8px) rotate(-1deg)' },
                },
                glow: {
                    'from': { boxShadow: '0 0 20px rgba(14, 165, 233, 0.3)' },
                    'to': { boxShadow: '0 0 30px rgba(14, 165, 233, 0.6)' },
                },
                'aurora-1': {
                    '0%':   { transform: 'translate(0%, 0%) scale(1)' },
                    '25%':  { transform: 'translate(8%, -12%) scale(1.08)' },
                    '50%':  { transform: 'translate(-6%, -8%) scale(0.95)' },
                    '75%':  { transform: 'translate(4%, 10%) scale(1.05)' },
                    '100%': { transform: 'translate(0%, 0%) scale(1)' },
                },
                'aurora-2': {
                    '0%':   { transform: 'translate(0%, 0%) scale(1)' },
                    '25%':  { transform: 'translate(-10%, 6%) scale(1.06)' },
                    '50%':  { transform: 'translate(8%, 12%) scale(0.97)' },
                    '75%':  { transform: 'translate(-4%, -8%) scale(1.03)' },
                    '100%': { transform: 'translate(0%, 0%) scale(1)' },
                },
                'aurora-3': {
                    '0%':   { transform: 'translate(0%, 0%) scale(1)' },
                    '33%':  { transform: 'translate(12%, 8%) scale(1.1)' },
                    '66%':  { transform: 'translate(-8%, -10%) scale(0.93)' },
                    '100%': { transform: 'translate(0%, 0%) scale(1)' },
                },
                'aurora-4': {
                    '0%':   { transform: 'translate(0%, 0%) scale(1)' },
                    '40%':  { transform: 'translate(-6%, 14%) scale(1.07)' },
                    '80%':  { transform: 'translate(10%, -6%) scale(0.96)' },
                    '100%': { transform: 'translate(0%, 0%) scale(1)' },
                },
                'shimmer-sweep': {
                    '0%':   { backgroundPosition: '-200% center' },
                    '100%': { backgroundPosition: '200% center' },
                },
                'border-sweep': {
                    '0%':   { backgroundPosition: '0% 50%' },
                    '50%':  { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
                'pulse-glow': {
                    '0%, 100%': { boxShadow: '0 0 0 0 rgba(249, 115, 22, 0)' },
                    '50%':      { boxShadow: '0 0 28px 6px rgba(249, 115, 22, 0.35)' },
                },
                'spin-slow': {
                    'from': { transform: 'rotate(0deg)' },
                    'to':   { transform: 'rotate(360deg)' },
                },
                'marquee': {
                    '0%':   { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                'marquee-reverse': {
                    '0%':   { transform: 'translateX(-50%)' },
                    '100%': { transform: 'translateX(0)' },
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
