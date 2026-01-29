import React from 'react';

export function LiquidInput({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className={`w-full bg-neutral-50/50 dark:bg-neutral-900/50 border border-neutral-200/60 dark:border-neutral-700/60 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50 transition-all font-mono text-sm placeholder:text-neutral-400 text-[var(--foreground)] ${className}`}
            {...props}
        />
    );
}

export function LiquidTextArea({ className = "", ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea
            className={`w-full bg-neutral-50/50 dark:bg-neutral-900/50 border border-neutral-200/60 dark:border-neutral-700/60 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50 transition-all font-mono text-sm placeholder:text-neutral-400 text-[var(--foreground)] ${className}`}
            {...props}
        />
    );
}

export function LiquidSelect({ className = "", children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <div className="relative">
            <select
                className={`w-full bg-neutral-50/50 dark:bg-neutral-900/50 border border-neutral-200/60 dark:border-neutral-700/60 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50 transition-all text-sm appearance-none cursor-pointer text-[var(--foreground)] ${className}`}
                {...props}
            >
                {children}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    );
}
