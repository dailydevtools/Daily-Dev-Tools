"use client";

import { useState, useEffect } from "react";
import { Play, Square, Volume2 } from "lucide-react";
import Link from "next/link";

export default function TextToSpeech() {
    const [text, setText] = useState("Hello, welcome to Daily Dev Tools.");
    const [rate, setRate] = useState(1);
    const [pitch, setPitch] = useState(1);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState("");
    const [speaking, setSpeaking] = useState(false);

    useEffect(() => {
        const loadVoices = () => {
            const v = window.speechSynthesis.getVoices();
            setVoices(v);
            if (v.length > 0) setSelectedVoice(v[0].name);
        };
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    const speak = () => {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.rate = rate;
        u.pitch = pitch;
        const v = voices.find(voice => voice.name === selectedVoice);
        if (v) u.voice = v;

        u.onend = () => setSpeaking(false);
        u.onstart = () => setSpeaking(true);

        window.speechSynthesis.speak(u);
    };

    const stop = () => {
        window.speechSynthesis.cancel();
        setSpeaking(false);
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>


            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40 }}>

                        <div style={{ marginBottom: 24 }}>
                            <textarea
                                value={text} onChange={e => setText(e.target.value)}
                                className="input-field"
                                placeholder="Enter text to speak..."
                                style={{ width: '100%', height: 150, padding: 16, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 18, resize: 'vertical' }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: 24, marginBottom: 32, flexWrap: 'wrap' }}>
                            <div style={{ flex: 2, minWidth: 200 }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Voice</label>
                                <select
                                    value={selectedVoice} onChange={e => setSelectedVoice(e.target.value)}
                                    style={{ width: '100%', padding: 12, borderRadius: 12, background: '#111', border: '1px solid #333', color: 'white' }}
                                >
                                    {voices.map(v => (
                                        <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>
                                    ))}
                                </select>
                            </div>
                            <div style={{ flex: 1, minWidth: 100 }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Speed ({rate})</label>
                                <input type="range" min="0.5" max="2" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} style={{ width: '100%' }} />
                            </div>
                            <div style={{ flex: 1, minWidth: 100 }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Pitch ({pitch})</label>
                                <input type="range" min="0" max="2" step="0.1" value={pitch} onChange={e => setPitch(Number(e.target.value))} style={{ width: '100%' }} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: 16 }}>
                            <button onClick={speak} className="btn-primary" style={{ flex: 1, padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                <Volume2 size={20} /> Speak
                            </button>
                            <button onClick={stop} className="btn-secondary" style={{ width: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Square size={20} />
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
