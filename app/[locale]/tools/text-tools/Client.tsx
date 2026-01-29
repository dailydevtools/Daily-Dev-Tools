"use client";

import { useState } from "react";
import { Copy, Type } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function TextToolsClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [input, setInput] = useState("");
    const [mode, setMode] = useState<"reverse" | "flip" | "binary" | "hex">("reverse");

    const process = () => {
        if (!input) return "";
        if (mode === "reverse") return input.split("").reverse().join("");
        if (mode === "flip") {
            // Upside down map
            const map: Record<string, string> = {
                a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ', j: 'ɾ', k: 'ʞ', l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z',
                A: '∀', B: 'q', C: 'Ɔ', D: 'p', E: 'Ǝ', F: 'Ⅎ', G: 'פ', H: 'H', I: 'I', J: 'ſ', K: 'ʞ', L: '˥', M: 'W', N: 'N', O: 'O', P: 'd', Q: 'b', R: 'ɹ', S: 'S', T: '┴', U: '∩', V: 'Λ', W: 'M', X: 'X', Y: '⅄', Z: 'Z',
                '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6', '0': '0', '.': '˙', ',': "'", '?': '¿', '!': '¡', '"': ',,', "'": ',', '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{', '<': '>', '>': '<', '&': '⅋', '_': '‾'
            };
            return input.split("").reverse().map(c => map[c] || c).join("");
        }
        if (mode === "binary") {
            return input.split("").map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(" ");
        }
        if (mode === "hex") {
            return input.split("").map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(" ");
        }
        return input;
    };

    const output = process();

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">
                    <ToolPageHeader
                        title={tTools('text-tools.name')}
                        description={tTools('text-tools.description')}
                        icon={<Type size={28} className="text-[#fb923c]" />}
                    />

                    <div className="flex justify-center gap-3 mb-6 flex-wrap">
                        <button onClick={() => setMode("reverse")} className={`inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] ${mode === 'reverse' ? 'bg-orange-500 text-black border-orange-500 hover:bg-orange-600' : ''}`}>{t('TextTools.reverse')}</button>
                        <button onClick={() => setMode("flip")} className={`inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] ${mode === 'flip' ? 'bg-orange-500 text-black border-orange-500 hover:bg-orange-600' : ''}`}>Upside Down</button>
                        <button onClick={() => setMode("binary")} className={`inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] ${mode === 'binary' ? 'bg-orange-500 text-black border-orange-500 hover:bg-orange-600' : ''}`}>Binary</button>
                        <button onClick={() => setMode("hex")} className={`inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] ${mode === 'hex' ? 'bg-orange-500 text-black border-orange-500 hover:bg-orange-600' : ''}`}>Hex</button>
                    </div>

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10">
                        <div className="mb-5">
                            <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('common.input')}</label>
                            <textarea
                                value={input} onChange={e => setInput(e.target.value)}
                                placeholder={t('TextTools.inputPlaceholder')}
                                className="input-field w-full h-[120px] p-3 rounded-xl bg-transparent dark:bg-black/30 border border-neutral-200 dark:border-white/10 text-[var(--foreground)] resize-y"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('common.output')}</label>
                            <div className="relative">
                                <textarea
                                    readOnly
                                    value={output}
                                    className="w-full h-[120px] bg-transparent dark:bg-black/30 border border-neutral-200 dark:border-white/10 rounded-xl p-4 text-[#fb923c] text-base resize-y outline-none"
                                />
                                <button onClick={() => navigator.clipboard.writeText(output)} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] absolute top-3 right-3 p-2">
                                    <Copy size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
