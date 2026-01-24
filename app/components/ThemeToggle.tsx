"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`bg-transparent border border-[var(--card-border)] rounded-lg w-9 h-9 flex items-center justify-center cursor-pointer transition-all duration-200 ${theme === "dark" ? "text-[#fb923c]" : "text-[#f97316]"
                } hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)]`}
            aria-label="Toggle Theme"
        >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
}
