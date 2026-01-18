"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { tools } from "../data/tools";

export default function RecentToolsTracker() {
    const pathname = usePathname();

    useEffect(() => {
        if (pathname.startsWith("/tools/")) {
            const toolId = pathname.replace("/tools/", "");

            // Validate tool exists
            if (!tools.find(t => t.id === toolId)) return;

            const saved = localStorage.getItem("recent_tools");
            let recents: string[] = saved ? JSON.parse(saved) : [];

            // Remove current if exists (to push to top)
            recents = recents.filter(id => id !== toolId);

            // Add to front (LIFO - Most Recent First)
            recents.unshift(toolId);

            // Keep max 10
            if (recents.length > 10) recents.pop();

            localStorage.setItem("recent_tools", JSON.stringify(recents));
        }
    }, [pathname]);

    return null;
}
