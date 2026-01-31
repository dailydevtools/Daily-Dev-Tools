"use client";

import { useState, useRef, useEffect } from "react";
import { Download, Trash2, PenTool } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function SignatureGeneratorClient() {
    const t = useTranslations('SignatureGenerator');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasContent, setHasContent] = useState(false);
    const [color, setColor] = useState("#000000"); // Default black for signature
    const [width, setWidth] = useState(2);

    // Set initial color based on theme
    useEffect(() => {
        if (document.documentElement.classList.contains('dark')) {
            setColor("#ffffff");
        }
    }, []);

    // Initialize canvas context
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.strokeStyle = color;
                ctx.lineWidth = width;
            }
        }
    }, [color, width]); // Added dependencies to re-init if needed, though usually just strokeStyle update is fine

    // Update stroke style
    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) {
            ctx.strokeStyle = color;
            ctx.lineWidth = width;
        }
    }, [color, width]);

    const startDrawing = ({ nativeEvent }: any) => {
        const { offsetX, offsetY } = nativeEvent;
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) {
            ctx.beginPath();
            ctx.moveTo(offsetX, offsetY);
            setIsDrawing(true);
            setHasContent(true);
        }
    };

    const draw = ({ nativeEvent }: any) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = nativeEvent;
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) {
            ctx.lineTo(offsetX, offsetY);
            ctx.stroke();
        }
    };

    const stopDrawing = () => {
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) ctx.closePath();
        setIsDrawing(false);
    };

    const clear = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (canvas && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            setHasContent(false);
        }
    };

    const download = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const url = canvas.toDataURL("image/png");
            const a = document.createElement("a");
            a.href = url;
            a.download = "signature.png";
            a.click();
        }
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">
                    <ToolPageHeader
                        title="Digital Signature Generator"
                        description="Draw and download your digital signature as a PNG image."
                        icon={<PenTool size={28} className="text-[#fb923c]" />}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-6 mb-6 flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <label className="text-[13px] text-[#9ca3af]">{t('color')}</label>
                                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-8 h-8 p-0 border-none rounded cursor-pointer" />
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="text-[13px] text-[#9ca3af]">{t('width')}</label>
                                <input type="range" min="1" max="10" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-[100px] cursor-pointer" />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={clear} className={`inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] flex items-center gap-1.5 ${!hasContent ? 'opacity-50' : ''}`} disabled={!hasContent}>
                                <Trash2 size={16} /> {t('clear')}
                            </button>
                            <button onClick={download} className={`inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] flex items-center gap-1.5 ${!hasContent ? 'opacity-50' : ''}`} disabled={!hasContent}>
                                <Download size={16} /> {t('download')}
                            </button>
                        </div>
                    </div>

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-0 h-[400px] bg-white dark:bg-white/5 overflow-hidden cursor-crosshair relative">
                        <canvas
                            ref={canvasRef}
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            className="w-full h-full"
                        />
                        {!hasContent && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-[#e5e7eb]">
                                <div className="text-center">
                                    <PenTool size={48} className="mb-4 opacity-50 mx-auto" />
                                    <p>{t('signHere')}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <p className="mt-4 text-[13px] text-[#6b7280] text-center">
                        {t('note')}
                    </p>

                </div>
            </div>
        </main>
    );
}
