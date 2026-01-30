"use client";

import {
    Activity, AlignJustify, AlignLeft, Binary, Bot, Box, Braces, Calculator, Calendar, CalendarDays,
    Clock, Code, Code2, CreditCard, Database, Dices, DollarSign, FileCode, FileJson, FileText,
    Fingerprint, Fuel, GitMerge, GitCompare, Globe, Hash, Image, ImageDown, Key, Keyboard,
    Landmark, Layers, LayoutGrid, Link, Link2, List, Lock, Mail, MessageCircle, Mic, MousePointer2,
    Network, Palette, PenTool, Percent, QrCode, Scale, Search, Server, Share2, Shield, ShieldCheck,
    Smartphone, Table, Tag, Ticket, Timer, TrendingUp, Triangle, Twitter, Type, Video, Volume2, Youtube
} from "lucide-react";

const IconMap: Record<string, any> = {
    Activity, AlignJustify, AlignLeft, Binary, Bot, Box, Braces, Calculator, Calendar, CalendarDays,
    Clock, Code, Code2, CreditCard, Database, Dices, DollarSign, FileCode, FileJson, FileText,
    Fingerprint, Fuel, GitMerge, GitCompare, Globe, Hash, Image, ImageDown, Key, Keyboard,
    Landmark, Layers, LayoutGrid, Link, Link2, List, Lock, Mail, MessageCircle, Mic, MousePointer2,
    Network, Palette, PenTool, Percent, QrCode, Scale, Search, Server, Share2, Shield, ShieldCheck,
    Smartphone, Table, Tag, Ticket, Timer, TrendingUp, Triangle, Twitter, Type, Video, Volume2, Youtube
};

interface ToolIconProps {
    name: string;
    size?: number;
    className?: string;
    style?: React.CSSProperties;
}

export default function ToolIcon({ name, size = 24, className, style }: ToolIconProps) {
    const LucideIcon = IconMap[name];

    if (!LucideIcon) {
        // Fallback if icon name is invalid or it's an old string/emoji
        // If it's a short string (like emoji), render it as text
        if (name.length < 5 && !name.includes("-")) {
            return <span style={{ fontSize: size, ...style }} className={className}>{name}</span>;
        }
        // Default fallback
        const DefaultIcon = IconMap["Box"];
        return <DefaultIcon size={size} className={className} style={style} />;
    }

    return <LucideIcon size={size} className={className} style={style} aria-hidden="true" />;
}
