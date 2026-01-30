"use client";

import dynamic from "next/dynamic";
import BackToTop from "./BackToTop";
import RecentToolsTracker from "./RecentToolsTracker";
import { Toaster } from "./Toaster";

const CommandPalette = dynamic(() => import("./CommandPalette"), { ssr: false });
const FeedbackForm = dynamic(() => import("./FeedbackForm"), { ssr: false });

export default function LayoutEssentials() {
    return (
        <>
            <CommandPalette />
            <BackToTop />
            <FeedbackForm />
            <Toaster />
            <RecentToolsTracker />
        </>
    );
}
