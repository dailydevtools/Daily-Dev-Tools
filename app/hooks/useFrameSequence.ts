"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface UseFrameSequenceOptions {
    /** Directory (public path) the frames live in, e.g. "/frames/toolbox" */
    frameBasePath: string;
    /** Total number of frames in the sequence */
    frameCount: number;
    /** 1-based frame index -> filename. Defaults to "frame-0001.webp" style padding. */
    frameNamePattern?: (index: number) => string;
    /** Scroll distance (px) the section stays pinned for while frames play. Defaults to frameCount * 20. */
    pinDistance?: number;
    /** Disable the pin/scrub and freeze on a single frame (used for prefers-reduced-motion). */
    disableScrub?: boolean;
    /** Which frame to freeze on when disableScrub is true. Defaults to the last frame. */
    staticFrameIndex?: number;
}

export interface UseFrameSequenceResult {
    containerRef: React.RefObject<HTMLDivElement>;
    canvasRef: React.RefObject<HTMLCanvasElement>;
    loadedCount: number;
    isReady: boolean;
}

function defaultFrameName(index: number): string {
    return `frame-${String(index).padStart(4, "0")}.webp`;
}

export function useFrameSequence({
    frameBasePath,
    frameCount,
    frameNamePattern = defaultFrameName,
    pinDistance,
    disableScrub = false,
    staticFrameIndex,
}: UseFrameSequenceOptions): UseFrameSequenceResult {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [loadedCount, setLoadedCount] = useState(0);
    const [isReady, setIsReady] = useState(false);

    const imagesRef = useRef<HTMLImageElement[]>([]);
    const currentFrameRef = useRef(0);
    const rafIdRef = useRef<number | null>(null);
    const pendingFrameRef = useRef<number | null>(null);
    const dprRef = useRef(1);

    // ── Preload every frame, decode before counting it as loaded ──
    useEffect(() => {
        let cancelled = false;

        const targetIndex = disableScrub
            ? (staticFrameIndex ?? frameCount)
            : null;
        const indices =
            targetIndex !== null
                ? [targetIndex]
                : Array.from({ length: frameCount }, (_, i) => i + 1);

        const images: HTMLImageElement[] = new Array(frameCount + 1);
        let loaded = 0;

        const loadOne = (index: number) =>
            new Promise<void>((resolve) => {
                const img = new Image();
                img.src = `${frameBasePath}/${frameNamePattern(index)}`;
                const settle = () => {
                    if (cancelled) return resolve();
                    images[index] = img;
                    loaded += 1;
                    setLoadedCount(loaded);
                    resolve();
                };
                if (typeof img.decode === "function") {
                    img.decode().then(settle).catch(settle);
                } else {
                    img.onload = settle;
                    img.onerror = settle;
                }
            });

        (async () => {
            // First frame (or the static frame) loads on its own so the hero
            // is never blank; the rest follow in order right after.
            await loadOne(indices[0]);
            if (cancelled) return;
            for (const index of indices.slice(1)) {
                await loadOne(index);
                if (cancelled) return;
            }
            imagesRef.current = images;
            currentFrameRef.current = targetIndex ?? 1;
            setIsReady(true);
        })();

        return () => {
            cancelled = true;
        };
    }, [frameBasePath, frameCount, frameNamePattern, disableScrub, staticFrameIndex]);

    // ── Canvas sizing + draw (cover-fit, DPR-aware) ──
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            dprRef.current = dpr;
            const width = parent.clientWidth;
            const height = parent.clientHeight;
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            draw(currentFrameRef.current);
        };

        function draw(index: number) {
            const img = imagesRef.current[index];
            if (!img || !ctx || !canvas) return;
            const cw = canvas.width / dprRef.current;
            const ch = canvas.height / dprRef.current;
            const iw = img.naturalWidth;
            const ih = img.naturalHeight;
            if (!iw || !ih) return;
            const canvasRatio = cw / ch;
            const imgRatio = iw / ih;
            let sx: number, sy: number, sw: number, sh: number;
            if (imgRatio > canvasRatio) {
                sh = ih;
                sw = ih * canvasRatio;
                sx = (iw - sw) / 2;
                sy = 0;
            } else {
                sw = iw;
                sh = iw / canvasRatio;
                sx = 0;
                sy = (ih - sh) / 2;
            }
            ctx.clearRect(0, 0, cw, ch);
            ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
        }

        const scheduleDraw = (index: number) => {
            pendingFrameRef.current = index;
            if (rafIdRef.current !== null) return;
            rafIdRef.current = requestAnimationFrame(() => {
                rafIdRef.current = null;
                if (pendingFrameRef.current !== null) {
                    draw(pendingFrameRef.current);
                }
            });
        };

        let resizeRaf: number | null = null;
        const onResize = () => {
            if (resizeRaf !== null) cancelAnimationFrame(resizeRaf);
            resizeRaf = requestAnimationFrame(resize);
        };

        resize();
        window.addEventListener("resize", onResize);

        let scrollTrigger: ScrollTrigger | null = null;

        if (!disableScrub && isReady) {
            gsap.registerPlugin(ScrollTrigger);
            const distance = pinDistance ?? frameCount * 20;
            scrollTrigger = ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: `+=${distance}`,
                pin: true,
                scrub: true,
                onUpdate: (self) => {
                    const frameIndex =
                        Math.round(self.progress * (frameCount - 1)) + 1;
                    if (frameIndex !== currentFrameRef.current) {
                        currentFrameRef.current = frameIndex;
                        scheduleDraw(frameIndex);
                    }
                },
            });
        } else if (isReady) {
            draw(currentFrameRef.current);
        }

        return () => {
            window.removeEventListener("resize", onResize);
            if (resizeRaf !== null) cancelAnimationFrame(resizeRaf);
            if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
            scrollTrigger?.kill();
        };
    }, [isReady, disableScrub, pinDistance, frameCount]);

    return { containerRef, canvasRef, loadedCount, isReady };
}
