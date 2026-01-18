"use client";

import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export default function EmailValidator() {
    const [email, setEmail] = useState("");

    const validate = () => {
        if (!email) return null;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = regex.test(email);

        let typo = "";
        if (email.includes("@gnail.com")) typo = "Did you mean @gmail.com?";
        if (email.includes("@hotmial.com")) typo = "Did you mean @hotmail.com?";
        if (email.includes("@yaho.com")) typo = "Did you mean @yahoo.com?";

        return { isValid, typo };
    };

    const res = validate();

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 600, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40, textAlign: 'center' }}>
                        <div style={{ marginBottom: 32 }}>
                            <label style={{ display: 'block', marginBottom: 12, color: '#9ca3af', fontSize: 13 }}>Enter Email Address</label>
                            <input
                                type="email" value={email} onChange={e => setEmail(e.target.value)}
                                className="input-field" placeholder="user@example.com"
                                style={{ width: '100%', padding: 16, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 18, textAlign: 'center' }}
                            />
                        </div>

                        {email && res && (
                            <div style={{
                                padding: 24, borderRadius: 16,
                                background: res.isValid ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                border: `1px solid ${res.isValid ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16
                            }}>
                                {res.isValid ? <CheckCircle size={48} color="#22c55e" /> : <XCircle size={48} color="#ef4444" />}

                                <div>
                                    <div style={{ fontWeight: 700, fontSize: 20, color: res.isValid ? '#22c55e' : '#ef4444' }}>
                                        {res.isValid ? "Valid Format" : "Invalid Format"}
                                    </div>
                                    {res.typo && (
                                        <div style={{ color: '#fb923c', marginTop: 8, fontWeight: 500 }}>
                                            {res.typo}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
