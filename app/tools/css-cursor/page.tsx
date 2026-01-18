"use client";

import { useState } from "react";
import { MousePointer } from "lucide-react";
import Link from "next/link";

const cursors = [
    "auto", "default", "none", "context-menu", "help", "pointer", "progress", "wait",
    "cell", "crosshair", "text", "vertical-text", "alias", "copy", "move", "no-drop",
    "not-allowed", "grab", "grabbing", "all-scroll", "col-resize", "row-resize",
    "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize",
    "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out"
];

export default function CssCursor() {
    const [selected, setSelected] = useState("auto");

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40 }}>
                        <div style={{ textAlign: 'center', marginBottom: 40, padding: 40, background: 'rgba(255,255,255,0.05)', borderRadius: 16, border: '1px dashed rgba(255,255,255,0.1)' }}>
                            <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 12 }}>Hover here to test</div>
                            <div style={{ fontSize: 32, fontWeight: 700, color: 'white', cursor: selected, display: 'inline-block', padding: '20px 40px', background: '#222', borderRadius: 12 }}>
                                cursor: {selected};
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 16 }}>
                            {cursors.map(c => (
                                <button
                                    key={c}
                                    onClick={() => { setSelected(c); navigator.clipboard.writeText(`cursor: ${c};`); }}
                                    style={{
                                        padding: 16, borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)',
                                        background: selected === c ? 'rgba(251, 146, 60, 0.2)' : 'rgba(255,255,255,0.05)',
                                        color: selected === c ? '#fb923c' : 'white', cursor: c,
                                        transition: 'all 0.2s', textAlign: 'center'
                                    }}
                                >
                                    <div style={{ fontSize: 14, fontWeight: 500 }}>{c}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
