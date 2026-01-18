"use client";

import { useState } from "react";
import { MessageCircle, Copy, ExternalLink, Smartphone } from "lucide-react";
import Link from "next/link";

export default function WhatsAppLink() {
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    // Basic cleaning of phone number
    const cleanPhone = phone.replace(/[^\d]/g, '');
    const link = `https://wa.me/${cleanPhone}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
                            <div>
                                <div style={{ marginBottom: 24 }}>
                                    <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Phone Number (with Country Code)</label>
                                    <input
                                        type="text" value={phone} onChange={e => setPhone(e.target.value)}
                                        placeholder="e.g. 15551234567"
                                        className="input-field"
                                        style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                                    />
                                    <div style={{ fontSize: 12, color: '#6b7280', marginTop: 8 }}>Do not include +, -, or ().</div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Pre-filled Message</label>
                                    <textarea
                                        value={message} onChange={e => setMessage(e.target.value)}
                                        placeholder="Hello, I'm interested..."
                                        className="input-field"
                                        style={{ width: '100%', height: 120, padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', resize: 'vertical' }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div style={{ padding: 24, background: 'rgba(34, 197, 94, 0.1)', borderRadius: 16, border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                                    <div style={{ fontSize: 13, color: '#22c55e', marginBottom: 8, fontWeight: 600 }}>Your WhatsApp Link</div>

                                    <div style={{ marginBottom: 24, wordBreak: 'break-all', color: 'white', display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <Smartphone size={16} color="#22c55e" />
                                        {link}
                                    </div>

                                    <div style={{ display: 'flex', gap: 12 }}>
                                        <button onClick={() => navigator.clipboard.writeText(link)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Copy Link</button>
                                        <a href={link} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none' }}>
                                            Open Chat <ExternalLink size={16} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
