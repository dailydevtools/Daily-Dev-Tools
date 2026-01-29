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


