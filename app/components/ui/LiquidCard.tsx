import React from 'react';

export function LiquidCard({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={`bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[24px] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02),0_2px_4px_-1px_rgba(0,0,0,0.02),inset_0_0_0_1px_var(--glass-highlight)] transition-all duration-300 ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
