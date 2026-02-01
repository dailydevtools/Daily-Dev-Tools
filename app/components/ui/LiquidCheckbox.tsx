"use client";

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LiquidCheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    description?: string;
    className?: string; // Container styling
    variant?: 'default' | 'card';
    disabled?: boolean;
}

export function LiquidCheckbox({
    checked,
    onChange,
    label,
    description,
    className,
    variant = 'default',
    disabled = false
}: LiquidCheckboxProps) {
    if (variant === 'card') {
        return (
            <button
                type="button"
                role="checkbox"
                aria-checked={checked}
                disabled={disabled}
                onClick={() => !disabled && onChange(!checked)}
                className={cn(
                    "flex items-center gap-3 p-3 rounded-xl transition-all duration-200 border w-full text-left outline-none group",
                    checked
                        ? 'bg-orange-500/10 border-orange-500/30'
                        : 'bg-neutral-100/50 dark:bg-white/5 border-transparent hover:border-orange-500/20',
                    disabled && "opacity-50 cursor-not-allowed",
                    !disabled && "cursor-pointer",
                    className
                )}
            >
                <div className={cn(
                    "w-5 h-5 rounded border flex items-center justify-center transition-colors shadow-sm min-w-5",
                    checked
                        ? 'bg-orange-500 border-orange-500'
                        : 'bg-transparent border-[var(--border-color)] group-hover:border-orange-500/50'
                )}>
                    {checked && <Check size={12} className="text-white stroke-[3px]" />}
                </div>
                {label && (
                    <div className="flex flex-col">
                        <span className={cn(
                            "font-medium transition-colors",
                            checked
                                ? 'text-orange-600 dark:text-orange-400'
                                : 'text-[var(--muted-text)] group-hover:text-[var(--foreground)]'
                        )}>
                            {label}
                        </span>
                        {description && (
                            <span className="text-xs text-[var(--muted-text)] mt-0.5">
                                {description}
                            </span>
                        )}
                    </div>
                )}
            </button>
        );
    }

    return (
        <div
            className={cn("flex items-center gap-3 cursor-pointer group w-fit", disabled && "opacity-50 cursor-not-allowed", className)}
            onClick={() => !disabled && onChange(!checked)}
            role="checkbox"
            aria-checked={checked}
        >
            <div className={cn(
                "w-5 h-5 rounded border flex items-center justify-center transition-all bg-neutral-100 dark:bg-white/5 shadow-sm",
                checked
                    ? 'bg-orange-500 border-orange-500'
                    : 'border-neutral-300 dark:border-white/10 group-hover:border-orange-500/50'
            )}>
                {checked && <Check size={12} className="text-white stroke-[3px]" />}
            </div>
            {label && (
                <span className="text-sm font-medium text-[var(--foreground)] select-none">
                    {label}
                </span>
            )}
        </div>
    );
}
