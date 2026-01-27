"use client";

import { Toaster as Sonner } from "sonner";
import { useTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";

export function Toaster() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent hydration mismatch
    const themeToUse = mounted ? theme === 'dark' ? 'dark' : 'light' : 'light';

    return (
        <Sonner
            theme={themeToUse as "light" | "dark" | "system"}
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast: "group toast group-[.toaster]:bg-[var(--card-bg)] group-[.toaster]:text-[var(--foreground)] group-[.toaster]:border-[var(--border-color)] group-[.toaster]:shadow-lg",
                    description: "group-[.toast]:text-[var(--muted-text)]",
                    actionButton: "group-[.toast]:bg-[var(--foreground)] group-[.toast]:text-[var(--background)]",
                    cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
                },
            }}
        />
    );
}
