"use client";

import { useState } from "react";
import { CreditCard, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function PaypalLink() {
    const [username, setUsername] = useState("");
    const [amount, setAmount] = useState("");
    const [currency, setCurrency] = useState("USD");

    const link = `https://paypal.me/${username}${amount ? `/${amount}${currency}` : ''}`;

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                            <div>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>PayPal.me Username</label>
                                <input
                                    type="text" value={username} onChange={e => setUsername(e.target.value)}
                                    placeholder="username"
                                    className="input-field"
                                    style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: 24 }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Amount (Optional)</label>
                                    <input
                                        type="number" value={amount} onChange={e => setAmount(e.target.value)}
                                        placeholder="25.00"
                                        className="input-field"
                                        style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                                    />
                                </div>
                                <div style={{ width: 120 }}>
                                    <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Currency</label>
                                    <select
                                        value={currency} onChange={e => setCurrency(e.target.value)}
                                        style={{ width: '100%', padding: 12, borderRadius: 12, background: '#111', border: '1px solid #333', color: 'white' }}
                                    >
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                        <option value="GBP">GBP</option>
                                        <option value="CAD">CAD</option>
                                        <option value="AUD">AUD</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ padding: 24, background: 'rgba(59, 130, 246, 0.1)', borderRadius: 16, border: '1px solid rgba(59, 130, 246, 0.2)', marginTop: 12 }}>
                                <div style={{ fontSize: 13, color: '#3b82f6', marginBottom: 8, fontWeight: 600 }}>Your PayPal Link</div>
                                <div style={{ marginBottom: 24, wordBreak: 'break-all', color: 'white', fontSize: 18 }}>
                                    {link}
                                </div>
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <button onClick={() => navigator.clipboard.writeText(link)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Copy Link</button>
                                    <a href={link} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none' }}>
                                        Open PayPal <ExternalLink size={16} />
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
