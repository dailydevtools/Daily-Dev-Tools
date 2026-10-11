"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export interface DotTextProps {
    /** Text to render; "\n" splits into separate lines */
    text: string;
    className?: string;
    fontFamily?: string;
    fontWeight?: number;
    /** 0-based line index that should render in accentColor instead of color */
    accentLine?: number;
    color?: string;
    accentColor?: string;
    minFontSize?: number;
    maxFontSize?: number;
    /** Hide the canvas from assistive tech (use when an accessible text equivalent renders elsewhere) */
    ariaHidden?: boolean;
}

interface Dot {
    x: number;
    y: number;
    ox: number;
    oy: number;
    line: number;
}

/**
 * Renders text as a field of dots sampled from the glyph outlines. Dots ease in from a
 * scattered start on mount and gently repel away from the pointer. Falls back to a static,
 * settled layout when the user prefers reduced motion.
 */
export default function DotText({
    text,
    className,
    fontFamily = '"Space Grotesk", sans-serif',
    fontWeight = 700,
    accentLine,
    color = "#ffffff",
    accentColor = "#fb923c",
    minFontSize = 28,
    maxFontSize = 64,
    ariaHidden = false,
}: DotTextProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const prefersReducedMotion = useReducedMotion();
    const lines = text.split("\n");
    const linesKey = lines.join("\n");

    useEffect(() => {
        const cv = canvasRef.current;
        if (!cv) return;
        const ctx = cv.getContext("2d");
        if (!ctx) return;

        const lines = linesKey.split("\n");
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        let W = 0;
        let H = 0;
        let dots: Dot[] = [];
        const mouse = { x: -9999, y: -9999 };
        let raf = 0;
        let visible = true;
        let cancelled = false;

        const build = () => {
            W = cv.clientWidth || 700;
            const fs = Math.max(minFontSize, Math.min(maxFontSize, W * 0.089));
            const lh = fs * 1.24;
            H = Math.round(lh * lines.length + fs * 0.4);
            cv.width = Math.round(W * dpr);
            cv.height = Math.round(H * dpr);
            cv.style.height = `${H}px`;

            const off = document.createElement("canvas");
            off.width = W;
            off.height = H;
            const o = off.getContext("2d");
            if (!o) return;
            o.textAlign = "center";
            o.textBaseline = "middle";
            o.font = `${fontWeight} ${fs}px ${fontFamily}`;
            o.fillStyle = "#000";
            lines.forEach((line, i) => o.fillText(line, W / 2, lh * (i + 0.58)));

            const data = o.getImageData(0, 0, W, H).data;
            const gap = Math.max(3, Math.round(fs / 14));
            dots = [];
            for (let y = 0; y < H; y += gap) {
                for (let x = 0; x < W; x += gap) {
                    if (data[(y * W + x) * 4 + 3] > 120) {
                        dots.push({
                            x: W / 2 + (Math.random() - 0.5) * W * 1.6,
                            y: H / 2 + (Math.random() - 0.5) * H * 4,
                            ox: x,
                            oy: y,
                            line: Math.min(lines.length - 1, Math.floor(y / lh)),
                        });
                    }
                }
            }
        };

        const draw = () => {
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, W, H);
            const R = 60;
            const F = 16;
            const base: Dot[] = [];
            const accent: Dot[] = [];
            for (const p of dots) {
                const dx = p.ox - mouse.x;
                const dy = p.oy - mouse.y;
                const d = Math.hypot(dx, dy);
                let tx = p.ox;
                let ty = p.oy;
                if (d < R && d > 0.1) {
                    const f = Math.pow(1 - d / R, 1.4) * F;
                    tx = p.ox + (dx / d) * f - (dy / d) * f * 0.35;
                    ty = p.oy + (dy / d) * f + (dx / d) * f * 0.35;
                }
                p.x += (tx - p.x) * 0.085;
                p.y += (ty - p.y) * 0.085;
                (p.line === accentLine ? accent : base).push(p);
            }
            ctx.fillStyle = color;
            for (const p of base) ctx.fillRect(p.x, p.y, 2.2, 2.2);
            ctx.fillStyle = accentColor;
            for (const p of accent) ctx.fillRect(p.x, p.y, 2.2, 2.2);
        };

        const loop = () => {
            if (cancelled) return;
            if (visible) draw();
            raf = requestAnimationFrame(loop);
        };

        const io = new IntersectionObserver((entries) => {
            visible = entries[0]?.isIntersecting ?? true;
        });
        io.observe(cv);

        const onPointerMove = (e: PointerEvent) => {
            const r = cv.getBoundingClientRect();
            mouse.x = e.clientX - r.left;
            mouse.y = e.clientY - r.top;
        };
        const onPointerLeave = () => {
            mouse.x = -9999;
            mouse.y = -9999;
        };
        cv.addEventListener("pointermove", onPointerMove);
        cv.addEventListener("pointerleave", onPointerLeave);

        const onResize = () => build();
        window.addEventListener("resize", onResize);

        const start = () => {
            if (cancelled) return;
            build();
            if (prefersReducedMotion) {
                for (const p of dots) {
                    p.x = p.ox;
                    p.y = p.oy;
                }
                draw();
            } else {
                loop();
            }
        };

        if (document.fonts?.ready) {
            document.fonts
                .load(`${fontWeight} ${maxFontSize}px ${fontFamily}`)
                .then(() => document.fonts.ready)
                .then(start)
                .catch(start);
        } else {
            start();
        }

        return () => {
            cancelled = true;
            cancelAnimationFrame(raf);
            io.disconnect();
            cv.removeEventListener("pointermove", onPointerMove);
            cv.removeEventListener("pointerleave", onPointerLeave);
            window.removeEventListener("resize", onResize);
        };
    }, [linesKey, fontFamily, fontWeight, accentLine, color, accentColor, minFontSize, maxFontSize, prefersReducedMotion]);

    return (
        <canvas
            ref={canvasRef}
            role={ariaHidden ? undefined : "img"}
            aria-label={ariaHidden ? undefined : lines.join(" ")}
            aria-hidden={ariaHidden || undefined}
            className={className}
            style={{ width: "100%", display: "block", touchAction: "none" }}
        />
    );
}
