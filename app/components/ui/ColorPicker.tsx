"use client";

interface ColorPickerProps {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    className?: string; // Allow external styling/margins
}

export function ColorPicker({ label, value, onChange, className = "" }: ColorPickerProps) {
    return (
        <div className={className}>
            {label && <label className="block text-[var(--muted-text)] mb-2 text-[12px] font-medium uppercase tracking-wide">{label}</label>}
            <div className="flex gap-3 items-center">
                <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-sm border border-[var(--border-color)] shrink-0 group hover:scale-105 transition-transform">
                    <input
                        type="color"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] cursor-pointer p-0 m-0 border-none"
                    />
                </div>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="flex-1 h-11 bg-transparent border border-[var(--border-color)] rounded-xl px-3 text-[var(--foreground)] text-sm font-mono outline-none focus:border-orange-500/50 transition-colors uppercase"
                />
            </div>
        </div>
    );
}
