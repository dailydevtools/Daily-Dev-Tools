"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`bg-transparent border border-[var(--card-border)] rounded-lg w-11 h-11 flex items-center justify-center cursor-pointer transition-all duration-200 ${theme === "dark" ? "text-[#fb923c]" : "text-[#f97316]"
                } hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)]`}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
        >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
}
