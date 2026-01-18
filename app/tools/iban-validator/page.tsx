"use client";

import { useState } from "react";
import { CheckCircle, XCircle, CreditCard } from "lucide-react";
import Link from "next/link";

export default function IbanValidator() {
    const [iban, setIban] = useState("");
    const [isValid, setIsValid] = useState<boolean | null>(null);

    const validate = (input: string) => {
        // Remove spaces
        const code = input.replace(/\s/g, '').toUpperCase();
        setIban(input); // keep formatting? or raw? user typing...

        if (code.length < 5) {
            setIsValid(null);
            return;
        }

        // Move first 4 chars to end
        const rearranged = code.slice(4) + code.slice(0, 4);

        // Replace letters with numbers (A=10, B=11...)
        const numeric = rearranged.replace(/[A-Z]/g, (char) => (char.charCodeAt(0) - 55).toString());

        // BigInt Mod 97
        try {
            const remainder = BigInt(numeric) % BigInt(97);
            setIsValid(remainder === BigInt(1));
        } catch (e) {
            setIsValid(false);
        }
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 600, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40, textAlign: 'center' }}>
                        <div style={{ marginBottom: 32 }}>
                            <label style={{ display: 'block', marginBottom: 12, color: '#9ca3af', fontSize: 13 }}>Enter IBAN Number</label>
                            <input
                                type="text" value={iban} onChange={e => validate(e.target.value)}
                                placeholder="DE89 3704 0044..."
                                className="input-field"
                                style={{ width: '100%', padding: 16, fontSize: 18, textAlign: 'center', borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontFamily: 'monospace' }}
                            />
                        </div>

                        {iban.length > 5 && isValid !== null && (
                            <div style={{
                                padding: 24, borderRadius: 16,
                                background: isValid ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                border: `1px solid ${isValid ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16
                            }}>
                                {isValid ? <CheckCircle size={32} color="#22c55e" /> : <XCircle size={32} color="#ef4444" />}
                                <div style={{ textAlign: 'left' }}>
                                    <div style={{ fontWeight: 700, fontSize: 18, color: isValid ? '#22c55e' : '#ef4444' }}>
                                        {isValid ? "Valid Benchmark" : "Invalid Checksum"}
                                    </div>
                                    <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 4 }}>
                                        {isValid ? "The IBAN format and checksum are correct." : "The IBAN does not match the checksum algorithm."}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
