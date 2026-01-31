import React from 'react';

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
}

export function LiquidButton({ className = "", variant = 'primary', ...props }: LiquidButtonProps) {
    const baseStyles = "inline-flex items-center justify-center gap-2 font-medium text-sm transition-all duration-300 rounded-xl px-6 py-3 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const variants = {
        primary: "bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-[0_4px_12px_rgba(251,146,60,0.3)] hover:shadow-[0_6px_20px_rgba(251,146,60,0.4)] hover:-translate-y-0.5 border border-transparent",
        secondary: "bg-neutral-100/80 dark:bg-white/5 text-[var(--foreground)] hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 border border-[var(--border-color)] backdrop-blur-sm",
        ghost: "bg-transparent text-[var(--muted-text)] hover:text-orange-500 hover:bg-orange-500/10 border border-transparent hover:border-orange-500/20"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        />
    );
}
