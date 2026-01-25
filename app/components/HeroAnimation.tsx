"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from "framer-motion";
import { useRef, ReactNode } from "react";
import {
    FileJson,
    Binary,
    Calculator,
    Globe,
    Image as ImageIcon,
    Lock,
    Type,
    Search
} from "lucide-react";

// Gear Configuration
interface GearProps {
    id: number;
    x: number;
    y: number;
    size: number;
    teeth: number;
    speed: number;
    direction: 1 | -1;
    color: string;
    depthColor: string;
    icon?: ReactNode;
    label?: string;
    connectedTo?: number; // ID of the gear this one meshes with (for visual debugging/logic if needed)
}

const GEARS: GearProps[] = [
    // Central Giant (Red)
    {
        id: 1,
        x: 0,
        y: 0,
        size: 280,
        teeth: 24,
        speed: 1,
        direction: 1,
        color: "#ef4444",
        depthColor: "#b91c1c",
        label: "FORMATTER",
        icon: <FileJson size={48} className="text-white/90" />
    },
    // Top Left (Yellow)
    {
        id: 2,
        x: -210,
        y: -120,
        size: 180,
        teeth: 16,
        speed: 1.5, // 24/16 = 1.5
        direction: -1,
        color: "#eab308",
        depthColor: "#a16207",
        label: "CONVERTER",
        icon: <Binary size={32} className="text-white/90" />
    },
    // Bottom Right (Orange)
    {
        id: 3,
        x: 180,
        y: 140,
        size: 160,
        teeth: 14, // Approx
        speed: 1.71,
        direction: -1,
        color: "#f97316",
        depthColor: "#c2410c",
        label: "IMAGE",
        icon: <ImageIcon size={28} className="text-white/90" />
    },
    // Top Right (Cream/Beige)
    {
        id: 4,
        x: 200,
        y: -80,
        size: 140,
        teeth: 12,
        speed: 2,
        direction: -1,
        color: "#fcd34d",
        depthColor: "#d97706",
        icon: <Calculator size={24} className="text-orange-900/80" />
    },
    // Far Left (Red Small)
    {
        id: 5,
        x: -320,
        y: 20,
        size: 120,
        teeth: 11,
        speed: 2.18,
        direction: 1, // Meshed with #2 (Dir -1) -> Dir 1? Wait, position matters. 
        // Let's assume visual mesh for now, physics is rough.
        color: "#ef4444",
        depthColor: "#b91c1c",
        icon: <Lock size={22} className="text-white/90" />
    },
    // Bottom Left (Yellow Small)
    {
        id: 6,
        x: -160,
        y: 180,
        size: 130,
        teeth: 12,
        speed: 2,
        direction: -1,
        color: "#eab308",
        depthColor: "#a16207",
        icon: <Globe size={24} className="text-white/90" />
    },
];

export default function HeroAnimation() {
    const { scrollY } = useScroll();
    // High mass/damping for "heavy" smooth feel that ignores jittery fast scrolls
    const baseRotation = useSpring(scrollY, { stiffness: 15, damping: 50, mass: 3 });

    return (
        <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none flex items-center justify-center translate-y-[10%] opacity-20 dark:opacity-30">
            <div className="relative w-[1px] h-[1px]"> {/* Anchor Point at Center */}
                {GEARS.map((gear) => (
                    <GearItem
                        key={gear.id}
                        gear={gear}
                        scrollRotation={baseRotation}
                    />
                ))}
            </div>
        </div>
    );
}

function GearItem({ gear, scrollRotation }: { gear: GearProps, scrollRotation: any }) {
    // Only scroll-based rotation for performance
    const rotate = useTransform(
        scrollRotation,
        (scroll: any) => scroll * 0.2 * gear.speed * gear.direction
    );

    // Counter-rotate content so it stays upright
    const counterRotate = useTransform(rotate, (r) => -r);

    return (
        <motion.div
            className="absolute flex items-center justify-center p-4"
            style={{
                left: gear.x,
                top: gear.y,
                width: gear.size,
                height: gear.size,
                marginLeft: -gear.size / 2,
                marginTop: -gear.size / 2,
                rotate: rotate,
            }}
        >
            {/* 3D Depth Layer (Darker, Offset) */}
            <GearShape
                size={gear.size}
                teeth={gear.teeth}
                color={gear.depthColor}
                className="absolute top-[4px] left-[0px]"
            />

            {/* Main Face Layer */}
            <GearShape
                size={gear.size}
                teeth={gear.teeth}
                color={gear.color}
                className="absolute top-0 left-0 drop-shadow-xl"
            />

            {/* Content Container (Counter-Rotated) */}
            <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center z-10"
                style={{ rotate: counterRotate }}
            >
                {gear.icon && <div className="mb-1">{gear.icon}</div>}
                {gear.label && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/90 bg-black/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                        {gear.label}
                    </span>
                )}
            </motion.div>
        </motion.div>
    );
}

// Procedural Gear SVG Generator
const GearShape = ({ size, teeth, color, className }: any) => {
    const radius = size / 2;
    const cx = radius;
    const cy = radius;
    const holeRadius = radius * 0.4; // Inner hole
    const outerRadius = radius - 2;
    const innerRadius = radius * 0.85; // Valleys

    // Use a simpler path approach: 
    // Draw a circle for the base, then add teeth. 
    // Actually, to make it one shape, we need to calculate points.

    const points = [];
    const angleStep = (Math.PI * 2) / teeth;
    const toothWidthAngle = angleStep * 0.4;

    for (let i = 0; i < teeth; i++) {
        const angle = i * angleStep;

        // Tooth Base Start
        points.push({
            x: cx + Math.cos(angle - toothWidthAngle / 2) * innerRadius,
            y: cy + Math.sin(angle - toothWidthAngle / 2) * innerRadius
        });

        // Tooth Tip Start
        points.push({
            x: cx + Math.cos(angle - toothWidthAngle / 3) * outerRadius,
            y: cy + Math.sin(angle - toothWidthAngle / 3) * outerRadius
        });

        // Tooth Tip End
        points.push({
            x: cx + Math.cos(angle + toothWidthAngle / 3) * outerRadius,
            y: cy + Math.sin(angle + toothWidthAngle / 3) * outerRadius
        });

        // Tooth Base End
        points.push({
            x: cx + Math.cos(angle + toothWidthAngle / 2) * innerRadius,
            y: cy + Math.sin(angle + toothWidthAngle / 2) * innerRadius
        });
    }

    const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ') + ' Z';

    // Create the hole path (Counter-Clockwise to create a hole in Fill Rule: EvenOdd)
    // M cx, cy-holeRadius A holeRadius,holeRadius 0 1,0 cx, cy+holeRadius A ...
    // Actually simpler to just use mask or separate path depending on implementation.
    // Let's use a compound path with fill-rule="evenodd".

    const holePath = `M ${cx} ${cy - holeRadius} A ${holeRadius} ${holeRadius} 0 1 0 ${cx} ${cy + holeRadius} A ${holeRadius} ${holeRadius} 0 1 0 ${cx} ${cy - holeRadius} Z`;

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className} style={{ overflow: 'visible' }}>
            <path d={`${d} ${holePath}`} fill={color} fillRule="evenodd" />
            {/* Inner shadow/ring for detail */}
            <circle cx={cx} cy={cy} r={holeRadius + 5} fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="4" />
        </svg>
    );
};
