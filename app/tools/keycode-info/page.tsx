"use client";

import { useState, useEffect } from "react";
import { Keyboard } from "lucide-react";
import Link from "next/link";

export default function KeyCodeInfo() {
    const [event, setEvent] = useState<KeyboardEvent | null>(null);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            e.preventDefault();
            setEvent(e);
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    const Card = ({ label, value, sub }: any) => (
        <div className="glass-card" style={{ padding: 24, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 8, textTransform: 'uppercase' }}>{label}</div>
            <div style={{ fontSize: 32, fontWeight: 'bold', color: 'white', fontFamily: 'monospace' }}>{value}</div>
            {sub && <div style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>{sub}</div>}
        </div>
    );

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    {!event ? (
                        <div style={{ padding: '100px 0', textAlign: 'center', color: '#6b7280' }}>
                            <div style={{ marginBottom: 24, display: 'inline-flex', padding: 24, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}>
                                <Keyboard size={48} />
                            </div>
                            <h2 style={{ fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 8 }}>Press any key</h2>
                            <p>We'll show you the JavaScript event KeyCode, Code, and more.</p>
                        </div>
                    ) : (
                        <>
                            <div style={{ textAlign: 'center', marginBottom: 60 }}>
                                <div style={{ fontSize: '120px', fontWeight: 'bold', color: '#fb923c', lineHeight: 1 }}>{event.keyCode || event.which}</div>
                                <div style={{ fontSize: 18, color: '#9ca3af', marginTop: 16 }}>event.which</div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
                                <Card label="event.key" value={event.key === ' ' ? '(Space)' : event.key} />
                                <Card label="event.code" value={event.code} />
                                <Card label="event.location" value={event.location} sub={['Standard', 'Left', 'Right', 'Numpad'][event.location]} />
                                <Card label="Modifiers" value={
                                    [event.ctrlKey && 'Ctrl', event.shiftKey && 'Shift', event.altKey && 'Alt', event.metaKey && 'Meta'].filter(Boolean).join(' + ') || 'None'
                                } />
                            </div>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}
