"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { tools } from "../data/tools";

export default function RecentToolsTracker() {
    const pathname = usePathname();

    useEffect(() => {
        // Handle routes like /en/tools/tool-id or /tools/tool-id
        if (pathname.includes("/tools/")) {
            // Split by '/tools/' and take the last part
            // Example: "/en/tools/uuid-generator" -> ["/en", "uuid-generator"]
            // Example: "/tools/uuid-generator" -> ["", "uuid-generator"]
            const parts = pathname.split("/tools/");
            if (parts.length < 2) return;

            const toolId = parts[1]; // Get the part after /tools/

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

            // Dispatch strict event to ensure immediate UI update across tabs/components
            window.dispatchEvent(new Event("storage"));
        }
    }, [pathname]);

    return null;
}
