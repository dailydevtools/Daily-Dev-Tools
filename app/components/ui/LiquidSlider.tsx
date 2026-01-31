"use client";

import React from 'react';

interface LiquidSliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    valueDisplay?: string | number;
    containerClassName?: string;
}

export function LiquidSlider({
    label,
    valueDisplay,
    containerClassName = "",
    className = "",
    ...props
}: LiquidSliderProps) {
    return (
        <div className={`w-full ${containerClassName}`}>
            {(label || valueDisplay !== undefined) && (
                <div className="flex justify-between items-end mb-4">
                    {label && (
                        <label className="text-xs uppercase font-bold tracking-widest text-[var(--muted-text)] select-none">
                            {label}
                        </label>
                    )}
                    {valueDisplay !== undefined && (
                        <span className="text-sm text-orange-500 dark:text-orange-400 font-bold font-mono px-2.5 py-1 bg-orange-500/5 dark:bg-orange-500/10 rounded-lg border border-orange-500/10 dark:border-orange-500/20 shadow-sm animate-in fade-in zoom-in duration-300">
                            {valueDisplay}
                        </span>
                    )}
                </div>
            )}
            <div className="relative group/slider py-2">
                {/* Custom Track Background (Glassmorphism) */}
                <div className="absolute top-1/2 left-0 w-full h-2.5 -translate-y-1/2 bg-neutral-100/80 dark:bg-white/5 border border-white/20 dark:border-white/5 rounded-full backdrop-blur-sm shadow-inner overflow-hidden">
                    {/* Progressive Fill Layer */}
                    <div
                        className="h-full bg-gradient-to-r from-orange-400/80 to-orange-500/90 shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all duration-150 rounded-l-full"
                        style={{ width: `${((Number(props.value || 0) - Number(props.min || 0)) / (Number(props.max || 100) - Number(props.min || 0))) * 100}%` }}
                    />
                </div>

                <input
                    type="range"
                    className={`
                        absolute inset-0 w-full h-full opacity-0 cursor-grab active:cursor-grabbing z-10
                        ${className}
                    `}
                    {...props}
                />

                {/* Visual Thumb representation */}
                <div
                    className="absolute top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-150"
                    style={{
                        left: `calc(${((Number(props.value || 0) - Number(props.min || 0)) / (Number(props.max || 100) - Number(props.min || 0))) * 100}% - 10px)`
                    }}
                >
                    <div className="w-5 h-5 bg-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.1),0_0_0_4px_rgba(249,115,22,0.1)] border-2 border-orange-500 dark:border-orange-400 flex items-center justify-center transition-transform group-hover/slider:scale-110 group-active/slider:scale-95 group-hover/slider:shadow-[0_4px_20px_rgba(249,115,22,0.4)]">
                        {/* Inner Droplet Sparkle */}
                        <div className="w-1.5 h-1.5 bg-orange-500 dark:bg-orange-400 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
