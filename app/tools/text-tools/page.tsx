"use client";

import { useState } from "react";
import { RefreshCw, Copy } from "lucide-react";
import Link from "next/link";

export default function TextTools() {
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
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
                        <button onClick={() => setMode("reverse")} className="btn-secondary" style={{ background: mode === 'reverse' ? '#fb923c' : undefined, color: mode === 'reverse' ? 'black' : undefined }}>Reverse Text</button>
                        <button onClick={() => setMode("flip")} className="btn-secondary" style={{ background: mode === 'flip' ? '#fb923c' : undefined, color: mode === 'flip' ? 'black' : undefined }}>Upside Down</button>
                        <button onClick={() => setMode("binary")} className="btn-secondary" style={{ background: mode === 'binary' ? '#fb923c' : undefined, color: mode === 'binary' ? 'black' : undefined }}>Text to Binary</button>
                        <button onClick={() => setMode("hex")} className="btn-secondary" style={{ background: mode === 'hex' ? '#fb923c' : undefined, color: mode === 'hex' ? 'black' : undefined }}>Text to Hex</button>
                    </div>

                    <div className="glass-card" style={{ padding: 40 }}>
                        <div style={{ marginBottom: 20 }}>
                            <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Input Text</label>
                            <textarea
                                value={input} onChange={e => setInput(e.target.value)}
                                placeholder="Type something..."
                                className="input-field"
                                style={{ width: '100%', height: 120, padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', resize: 'vertical' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Result</label>
                            <div style={{ position: 'relative' }}>
                                <textarea
                                    readOnly
                                    value={output}
                                    style={{ width: '100%', height: 120, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 16, color: '#fb923c', fontSize: 16, resize: 'vertical' }}
                                />
                                <button onClick={() => navigator.clipboard.writeText(output)} className="btn-secondary" style={{ position: 'absolute', top: 12, right: 12 }}>
                                    <Copy size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
