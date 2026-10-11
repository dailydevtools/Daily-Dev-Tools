"use client";

import { useReducedMotion } from "framer-motion";
import { Link } from "../../i18n/routing";
import { useFrameSequence } from "../hooks/useFrameSequence";
import DotText from "./DotText";

export interface ScrollFrameHeroProps {
    /** Public directory the frames live in, e.g. "/frames/toolbox" */
    frameBasePath: string;
    /** Total number of frames in the sequence */
    frameCount: number;
    /** 1-based frame index -> filename, defaults to "frame-0001.webp" padding */
    frameNamePattern?: (index: number) => string;
    /** Scroll distance (px) the section stays pinned for. Defaults to frameCount * 20. */
    pinDistance?: number;
    eyebrow?: string;
    title: string;
    subtitle?: string;
    ctaLabel?: string;
    ctaHref?: string;
}

export default function ScrollFrameHero({
    frameBasePath,
    frameCount,
    frameNamePattern,
    pinDistance,
    eyebrow,
    title,
    subtitle,
    ctaLabel,
    ctaHref,
}: ScrollFrameHeroProps) {
    const prefersReducedMotion = useReducedMotion();

    const { containerRef, canvasRef, loadedCount, isReady } = useFrameSequence({
        frameBasePath,
        frameCount,
        frameNamePattern,
        pinDistance,
        disableScrub: !!prefersReducedMotion,
    });

    const progressPct = Math.round((loadedCount / frameCount) * 100);

    return (
        <section
            ref={containerRef}
            className="relative z-10 h-screen w-full overflow-hidden bg-black"
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
            />

            {/* Readability scrim */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/50" />

            {/* Content overlay */}
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
                {eyebrow && (
                    <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.16em] text-[#fb923c]">
                        {eyebrow}
                    </p>
                )}
                <h2 className="mb-5 max-w-[720px] w-full sr-only">{title.replace(/\n/g, " ")}</h2>
                <DotText
                    text={title}
                    accentLine={title.split("\n").length - 1}
                    className="mb-5 max-w-[720px]"
                    ariaHidden
                />
                {subtitle && (
                    <p className="mb-8 max-w-[520px] text-base leading-[1.65] text-white/70 md:text-lg">
                        {subtitle}
                    </p>
                )}
                {ctaLabel && ctaHref && (
                    <Link
                        href={ctaHref}
                        className="inline-flex items-center gap-2 rounded-full bg-[#f97316] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-[2px] hover:bg-[#ea6c10]"
                    >
                        {ctaLabel}
                    </Link>
                )}
            </div>

            {/* Preload progress */}
            {!isReady && (
                <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-2 pb-10">
                    <div className="h-1 w-48 overflow-hidden rounded-full bg-white/15">
                        <div
                            className="h-full bg-[#f97316] transition-[width] duration-150 ease-out"
                            style={{ width: `${progressPct}%` }}
                        />
                    </div>
                    <span className="text-[11px] font-medium text-white/50">
                        Loading {progressPct}%
                    </span>
                </div>
            )}
        </section>
    );
}
