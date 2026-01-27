"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MotionCardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function MotionCard({ children, className = "", onClick }: MotionCardProps) {
    return (
        <motion.article
            className={`relative overflow-hidden group ${className}`}
            whileHover={{
                y: -5,
                scale: 1.01,
                boxShadow: "0 20px 40px -10px rgba(249, 115, 22, 0.2)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={onClick}
        >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#f97316]/0 via-[#f97316]/2 to-[#f97316]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Top border shine */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#fb923c]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Inner border shine effect */}
            <div className="absolute inset-0 rounded-[inherit] border border-transparent group-hover:border-[#fb923c]/20 transition-colors duration-300 pointer-events-none" />

            {children}
        </motion.article>
    );
}
