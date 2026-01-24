"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggle = () => {
            if (window.scrollY > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", toggle);
        return () => window.removeEventListener("scroll", toggle);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-[100] flex items-center justify-center w-12 h-12 p-0 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white rounded-full shadow-[0_4px_12px_rgba(249,115,22,0.4)] border-none cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)]"
            aria-label="Back to top"
        >
            <ArrowUp size={24} />
        </button>
    );
}
