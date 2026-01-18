"use client";

import { useState } from "react";
import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function PasswordStrength() {
    const [pass, setPass] = useState("");

    const calc = () => {
        let score = 0;
        if (!pass) return { score: 0, label: "Enter Password", color: "#9ca3af" };

        if (pass.length > 8) score++;
        if (pass.length > 12) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;

        if (score <= 2) return { score, label: "Weak", color: "#ef4444" };
        if (score <= 4) return { score, label: "Medium", color: "#fb923c" };
        return { score, label: "Strong", color: "#22c55e" };
    };

    const { score, label, color } = calc();
    const width = Math.min(100, (score / 5) * 100);

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 600, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40 }}>
                        <div style={{ marginBottom: 32 }}>
                            <label style={{ display: 'block', marginBottom: 12, color: '#9ca3af', fontSize: 13 }}>Password to check</label>
                            <input
                                type="text" value={pass} onChange={e => setPass(e.target.value)}
                                className="input-field" placeholder="Type here..."
                                style={{ width: '100%', padding: 16, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 18 }}
                            />
                        </div>

                        <div style={{ padding: 24, background: 'rgba(255,255,255,0.05)', borderRadius: 16, textAlign: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                                {score <= 2 ? <ShieldAlert size={48} color={color} /> : score <= 4 ? <Shield size={48} color={color} /> : <ShieldCheck size={48} color={color} />}
                            </div>
                            <div style={{ fontSize: 24, fontWeight: 700, color, marginBottom: 16 }}>{label}</div>

                            <div style={{ height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden' }}>
                                <div style={{ width: `${width}%`, height: '100%', background: color, transition: 'all 0.3s' }} />
                            </div>

                            <div style={{ marginTop: 24, textAlign: 'left', fontSize: 13, color: '#9ca3af', display: 'grid', gap: 8 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div style={{ width: 8, height: 8, borderRadius: 4, background: pass.length > 8 ? '#22c55e' : '#4b5563' }} /> 8+ Characters
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div style={{ width: 8, height: 8, borderRadius: 4, background: /[0-9]/.test(pass) ? '#22c55e' : '#4b5563' }} /> Contains Numbers
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div style={{ width: 8, height: 8, borderRadius: 4, background: /[A-Z]/.test(pass) ? '#22c55e' : '#4b5563' }} /> Contains Uppercase
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div style={{ width: 8, height: 8, borderRadius: 4, background: /[^A-Za-z0-9]/.test(pass) ? '#22c55e' : '#4b5563' }} /> Contains Symbols
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
