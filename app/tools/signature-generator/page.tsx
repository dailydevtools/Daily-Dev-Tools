"use client";

import { useState, useRef, useEffect } from "react";
import { Download, Trash2, PenTool } from "lucide-react";
import Link from "next/link";

export default function SignatureGenerator() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [hasContent, setHasContent] = useState(false);
    const [color, setColor] = useState("#000000"); // Default black for signature
    const [width, setWidth] = useState(2);

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
    }, []);

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
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 24, marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label style={{ fontSize: 13, color: '#9ca3af' }}>Color</label>
                                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ width: 32, height: 32, padding: 0, border: 'none', borderRadius: 4, cursor: 'pointer' }} />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <label style={{ fontSize: 13, color: '#9ca3af' }}>Width</label>
                                <input type="range" min="1" max="10" value={width} onChange={(e) => setWidth(Number(e.target.value))} style={{ width: 100, cursor: 'pointer' }} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: 12 }}>
                            <button onClick={clear} className="btn-secondary" disabled={!hasContent} style={{ opacity: !hasContent ? 0.5 : 1 }}>
                                <Trash2 size={16} style={{ marginRight: 6 }} /> Clear
                            </button>
                            <button onClick={download} className="btn-primary" disabled={!hasContent} style={{ opacity: !hasContent ? 0.5 : 1 }}>
                                <Download size={16} style={{ marginRight: 6 }} /> Download PNG
                            </button>
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: 0, height: 400, background: 'white', overflow: 'hidden', cursor: 'crosshair', position: 'relative' }}>
                        <canvas
                            ref={canvasRef}
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            style={{ width: '100%', height: '100%' }}
                        />
                        {!hasContent && (
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', color: '#e5e7eb' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <PenTool size={48} style={{ marginBottom: 16, opacity: 0.5 }} />
                                    <p>Sign here</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <p style={{ marginTop: 16, fontSize: 13, color: '#6b7280', textAlign: 'center' }}>
                        Signatures are processed locally in your browser. We do not store or upload them.
                    </p>

                </div>
            </div>
        </div>
    );
}
