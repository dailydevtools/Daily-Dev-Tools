"use client";

import { icons } from "lucide-react";

interface ToolIconProps {
    name: string;
    size?: number;
    className?: string;
    style?: React.CSSProperties;
}

export default function ToolIcon({ name, size = 24, className, style }: ToolIconProps) {
    const LucideIcon = (icons as any)[name];

    if (!LucideIcon) {
        // Fallback if icon name is invalid or it's an old string/emoji
        // If it's a short string (like emoji), render it as text
        if (name.length < 5 && !name.includes("-")) {
            return <span style={{ fontSize: size, ...style }} className={className}>{name}</span>;
        }
        // Default fallback
        const DefaultIcon = (icons as any)["Box"];
        return <DefaultIcon size={size} className={className} style={style} />;
    }

    return <LucideIcon size={size} className={className} style={style} />;
}
