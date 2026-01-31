"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "dark",
    toggleTheme: () => { },
    mounted: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("dark");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("theme") as Theme;
        const initialTheme = saved || "dark";

        setTheme(initialTheme);

        // IMPORTANT: Remove the dark class first
        document.documentElement.classList.remove("dark");

        // Only add it back if theme is dark
        if (initialTheme === "dark") {
            document.documentElement.classList.add("dark");
        }

        // Debug logs
        console.log("=== THEME PROVIDER INIT ===");
        console.log("Theme from localStorage:", saved);
        console.log("Initial theme:", initialTheme);
        console.log("HTML element classes:", document.documentElement.className);
        console.log("Has dark class?", document.documentElement.classList.contains("dark"));

        setMounted(true);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);

        // Remove dark class first
        document.documentElement.classList.remove("dark");

        // Add it back only if new theme is dark
        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        }

        // Debug logs
        console.log("=== THEME TOGGLED ===");
        console.log("New theme:", newTheme);
        console.log("HTML element classes:", document.documentElement.className);
        console.log("Has dark class?", document.documentElement.classList.contains("dark"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}