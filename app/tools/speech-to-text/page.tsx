"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Copy } from "lucide-react";
import Link from "next/link";

export default function SpeechToText() {
    const [text, setText] = useState("");
    const [listening, setListening] = useState(false);
    const [supported, setSupported] = useState(true);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && (window as any).webkitSpeechRecognition) {
            const SpeechRecognition = (window as any).webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'en-US';

            recognition.onresult = (event: any) => {
                let interimTranscript = '';
                let finalTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }
                if (finalTranscript) {
                    setText(prev => prev + (prev ? ' ' : '') + finalTranscript);
                }
            };

            recognition.onend = () => {
                setListening(false);
            };

            recognitionRef.current = recognition;
        } else {
            setSupported(false);
        }
    }, []);

    const toggle = () => {
        if (!recognitionRef.current) return;
        if (listening) {
            recognitionRef.current.stop();
            setListening(false);
        } else {
            recognitionRef.current.start();
            setListening(true);
        }
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40 }}>

                        {!supported && (
                            <div style={{ padding: 12, background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: 8, marginBottom: 24 }}>
                                Your browser does not support the Web Speech API. Please use Chrome.
                            </div>
                        )}

                        <div style={{ marginBottom: 24, position: 'relative' }}>
                            <textarea
                                value={text} onChange={e => setText(e.target.value)}
                                className="input-field"
                                placeholder="Transcript will appear here..."
                                style={{ width: '100%', height: 200, padding: 20, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 18, resize: 'vertical' }}
                            />
                            <button onClick={() => navigator.clipboard.writeText(text)} className="btn-secondary" style={{ position: 'absolute', top: 12, right: 12 }}>
                                <Copy size={16} />
                            </button>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button
                                onClick={toggle} disabled={!supported}
                                style={{
                                    width: 80, height: 80, borderRadius: 40,
                                    background: listening ? '#ef4444' : '#22c55e',
                                    color: 'white', border: 'none', cursor: supported ? 'pointer' : 'not-allowed',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: listening ? '0 0 20px rgba(239, 68, 68, 0.5)' : 'none',
                                    transition: 'all 0.3s'
                                }}
                            >
                                {listening ? <MicOff size={32} /> : <Mic size={32} />}
                            </button>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: 16, color: '#9ca3af', fontSize: 13 }}>
                            {listening ? "Listening..." : "Click microphone to start"}
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
