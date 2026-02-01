import React from 'react';
import { cn } from '../../lib/utils';

export function LiquidInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className={cn(
                "w-full bg-neutral-100/50 dark:bg-white/5",
                "border border-neutral-300 dark:border-white/10",
                "rounded-xl px-4 py-3",
                "outline-none",
                "focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50",
                "transition-all font-mono text-sm",
                "placeholder:text-neutral-400",
                "text-[var(--foreground)]",
                className
            )}
            {...props}
        />
    );
}

export function LiquidTextArea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea
            className={cn(
                "w-full bg-neutral-100/50 dark:bg-white/5",
                "border border-neutral-300 dark:border-white/10",
                "rounded-xl px-4 py-3",
                "outline-none",
                "focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50",
                "transition-all font-mono text-sm",
                "placeholder:text-neutral-400",
                "text-[var(--foreground)]",
                className
            )}
            {...props}
        />
    );
}