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

import { LiquidCard } from "../../../components/ui/LiquidCard";

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

                    <LiquidCard className="p-10">
                        <div className="text-center mb-12 p-12 bg-neutral-100 dark:bg-[#111] rounded-[24px] border border-dashed border-neutral-300 dark:border-neutral-800 relative overflow-hidden group">

                            <div className="absolute inset-0 bg-grid-slate-200/50 -z-10 [mask-image:linear-gradient(to_bottom,white,transparent)] dark:bg-grid-slate-800/20" />

                            <div className="text-sm text-[var(--muted-text)] mb-4 font-medium">{t('hoverTest')}</div>
                            <div
                                style={{ cursor: selected }}
                                className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600 inline-block py-6 px-12 bg-white dark:bg-neutral-800 rounded-2xl shadow-xl shadow-orange-500/5 border border-white dark:border-white/5 transition-transform hover:scale-105"
                            >
                                cursor: {selected};
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            {cursors.map(c => (
                                <button
                                    key={c}
                                    onClick={() => { setSelected(c); navigator.clipboard.writeText(`cursor: ${c};`); }}
                                    style={{ cursor: c }}
                                    className={`p-4 rounded-xl border text-center transition-all duration-300 ${selected === c ? 'bg-orange-500 border-orange-400 text-white shadow-lg shadow-orange-500/30 scale-105 z-10' : 'bg-neutral-50 dark:bg-white/5 border-[var(--border-color)] text-[var(--foreground)] hover:bg-neutral-100 dark:hover:bg-white/10 hover:border-orange-200 dark:hover:border-orange-800'}`}
                                >
                                    <div className="text-xs font-medium font-mono truncate">{c}</div>
                                </button>
                            ))}
                        </div>
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
