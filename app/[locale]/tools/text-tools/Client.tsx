"use client";

import { useState } from "react";
import { Copy, Type } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";
import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidTextArea } from "../../../components/ui/LiquidInput";
import LiquidTabs from "../../../components/ui/LiquidTabs";
import { LiquidButton } from "../../../components/ui/LiquidButton";
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

                    <div className="flex justify-center mb-6">
                        <LiquidTabs
                            tabs={['reverse', 'flip', 'binary', 'hex']}
                            activeTab={mode}
                            onChange={(m) => setMode(m as any)}
                            labels={{
                                reverse: t('TextTools.reverse'),
                                flip: "Upside Down",
                                binary: "Binary",
                                hex: "Hex"
                            }}
                        />
                    </div>

                    <LiquidCard className="p-10">
                        <div className="mb-6">
                            <label className="block mb-2 text-[var(--muted-text)] text-[13px]">{t('common.input')}</label>
                            <LiquidTextArea
                                value={input} onChange={e => setInput(e.target.value)}
                                placeholder={t('TextTools.inputPlaceholder')}
                                className="h-[120px]"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-[var(--muted-text)] text-[13px]">{t('common.output')}</label>
                            <div className="relative">
                                <LiquidTextArea
                                    readOnly
                                    value={output}
                                    className="h-[120px] text-orange-500"
                                />
                                <div className="absolute top-3 right-3">
                                    <LiquidButton
                                        variant="ghost"
                                        onClick={() => navigator.clipboard.writeText(output)}
                                        className="h-8 w-8 p-0"
                                    >
                                        <Copy size={16} />
                                    </LiquidButton>
                                </div>
                            </div>
                        </div>
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
