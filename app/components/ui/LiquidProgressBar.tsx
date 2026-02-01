import React from 'react';
import { cn } from '../../lib/utils';

interface LiquidProgressBarProps {
    value: number; // Current value relative to max
    max?: number; // Max value, default 100
    segments?: {
        width: number; // Percentage of the bar (0-100)
        color: string; // Tailwind bg class
        label?: string; // Tooltip/title
    }[];
    showMarker?: boolean;
    className?: string;
    height?: string; // e.g. "h-3"
}

export function LiquidProgressBar({
    value,
    max = 100,
    segments,
    showMarker = false,
    className,
    height = "h-3",
}: LiquidProgressBarProps) {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
        <div className={cn("w-full bg-neutral-200 dark:bg-neutral-800 rounded-full relative overflow-visible", height, className)}>
            <div className="absolute inset-0 rounded-full overflow-hidden">
                {segments ? (
                    // Render segments
                    segments.map((seg, i) => {
                        // Calculate left offset based on previous segments
                        const left = segments.slice(0, i).reduce((acc, s) => acc + s.width, 0);
                        return (
                            <div
                                key={i}
                                className={cn("absolute h-full transition-all duration-300", seg.color)}
                                style={{ left: `${left}%`, width: `${seg.width}%` }}
                                title={seg.label}
                            />
                        );
                    })
                ) : (
                    // Render simple fill
                    <div
                        className="h-full bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-500 ease-out rounded-full"
                        style={{ width: `${percentage}%` }}
                    />
                )}
            </div>

            {showMarker && (
                <div
                    className="absolute top-0 bottom-0 w-1.5 bg-white dark:bg-neutral-900 ring-2 ring-black/10 dark:ring-white/20 rounded-full shadow-lg z-10 transition-all duration-1000 ease-out"
                    style={{ left: `${percentage}%` }}
                />
            )}
        </div>
    );
}
