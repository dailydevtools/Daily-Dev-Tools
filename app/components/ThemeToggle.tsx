"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
      className={`relative overflow-hidden rounded-full w-11 h-11 flex items-center justify-center cursor-pointer transition-all duration-300
                bg-[var(--card-bg)] border border-[var(--card-border)] shadow-[0_10px_30px_rgba(15,23,42,0.08)]
                ${theme === "dark" ? "text-[var(--orange-400)]" : "text-[var(--orange-500)]"}
                hover:bg-[var(--card-hover-bg)]`}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
        >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    );
}
