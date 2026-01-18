"use client";

import { useState } from "react";
import { Copy, Check, RefreshCw, FileText } from "lucide-react";
import Link from "next/link";

export default function LoremIpsum() {
    const [paragraphs, setParagraphs] = useState(3);
    const [text, setText] = useState("");
    const [copied, setCopied] = useState(false);

    // Classic Lorem Ipsum text chunks
    const loremText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst. Fusce convallis, mauris imperdiet gravida bibendum, nisl turpis suscipit mauris, sed placerat ipsum urna sed risus. In convallis tellus a mauris. Aspicio.";

    const sentences = loremText.split('. ');

    if (!text) generateLorem();

    function generateLorem() {
        let result = [];
        for (let i = 0; i < paragraphs; i++) {
            // Shuffle and pick random sentences to make it look different each time
            const shuffled = [...sentences].sort(() => 0.5 - Math.random());
            const pLength = Math.floor(Math.random() * 5) + 3; // 3-8 sentences per paragraph
            const p = shuffled.slice(0, pLength).join('. ') + '.';
            result.push(p);
        }
        setText(result.join('\n\n'));
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div className="gradient-orb gradient-orb-1" style={{ opacity: 0.15 }} />
            <div className="gradient-orb gradient-orb-2" style={{ opacity: 0.15 }} />

            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 900, margin: '0 auto' }}>
                    <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #f97316 0%, #facc15 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>📄</div>
                        <div>
                            <h1 style={{ fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 4 }}>Lorem Ipsum Generator</h1>
                            <p style={{ color: '#9ca3af', fontSize: 14 }}>Generate placeholder text for layouts and designs</p>
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: 24, borderRadius: 16, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 24 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <label style={{ color: '#fb923c', fontWeight: 500 }}>Paragraphs:</label>
                            <input
                                type="number"
                                min="1"
                                max="20"
                                value={paragraphs}
                                onChange={(e) => setParagraphs(Number(e.target.value))}
                                style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 12px', borderRadius: 8, color: 'white', width: 80 }}
                            />
                        </div>
                        <button onClick={generateLorem} className="btn-primary" style={{ padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <RefreshCw style={{ width: 16, height: 16 }} /> Generate
                        </button>
                        <button onClick={copyToClipboard} className="btn-secondary" style={{ marginLeft: 'auto', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 8 }}>
                            {copied ? <Check style={{ width: 16, height: 16, color: '#22c55e' }} /> : <Copy style={{ width: 16, height: 16 }} />}
                            Copy Text
                        </button>
                    </div>

                    <div className="glass-card" style={{ padding: 32, borderRadius: 24, minHeight: 400 }}>
                        {text.split('\n\n').map((p, i) => (
                            <p key={i} style={{ color: '#e5e7eb', lineHeight: 1.8, marginBottom: 24, fontSize: 16 }}>
                                {p}
                            </p>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}
