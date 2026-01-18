"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
    const pathname = usePathname();

    useEffect(() => {
        // Enforce scroll to top with no behavior to ensure instant jump
        // or usage scroll-behavior from css if preferred. 
        // We use window.scrollTo which respects CSS scroll-behavior: smooth if set on html
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
