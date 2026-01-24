"use client";

import { useState } from "react";
import { MousePointer } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

const cursors = [
    "auto", "default", "none", "context-menu", "help", "pointer", "progress", "wait",
    "cell", "crosshair", "text", "vertical-text", "alias", "copy", "move", "no-drop",
    "not-allowed", "grab", "grabbing", "all-scroll", "col-resize", "row-resize",
    "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize",
    "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out"
];

export default function CssCursorClient() {
    const t = useTranslations('CssCursor');
    const [selected, setSelected] = useState("auto");

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[1000px] mx-auto">

                    <ToolPageHeader
                        title="CSS Cursor Tester"
                        description="Test different CSS cursor values by hovering over the buttons."
                        icon={<MousePointer size={28} className="text-[#fb923c]" />}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10">
                        <div className="text-center mb-10 p-10 bg-white/5 rounded-2xl border border-dashed border-white/10">
                            <div className="text-[13px] text-[#9ca3af] mb-3">{t('hoverTest')}</div>
                            <div
                                style={{ cursor: selected }}
                                className="text-3xl font-bold text-white inline-block py-5 px-10 bg-[#222] rounded-xl"
                            >
                                cursor: {selected};
                            </div>
                        </div>

                        <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4">
                            {cursors.map(c => (
                                <button
                                    key={c}
                                    onClick={() => { setSelected(c); navigator.clipboard.writeText(`cursor: ${c};`); }}
                                    style={{ cursor: c }}
                                    className={`p-4 rounded-xl border transition-all duration-200 text-center ${selected === c ? 'border-[#fb923c] bg-orange-500/20 text-[#fb923c]' : 'border-white/10 bg-white/5 text-white'}`}
                                >
                                    <div className="text-sm font-medium text-center">{c}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
