"use client";

import { useState } from "react";
import { CreditCard, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

export default function CreditCardValidator() {
    const [number, setNumber] = useState("");
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [brand, setBrand] = useState("");

    const validate = (val: string) => {
        const num = val.replace(/\D/g, '');
        setNumber(val);

        if (num.length < 8) {
            setIsValid(null);
            setBrand("");
            return;
        }

        // Luhn Algorithm
        let sum = 0;
        let shouldDouble = false;
        for (let i = num.length - 1; i >= 0; i--) {
            let digit = parseInt(num.charAt(i));
            if (shouldDouble) {
                if ((digit *= 2) > 9) digit -= 9;
            }
            sum += digit;
            shouldDouble = !shouldDouble;
        }
        setIsValid(sum % 10 === 0);

        // Brand Detection
        if (/^4/.test(num)) setBrand("Visa");
        else if (/^5[1-5]/.test(num)) setBrand("Mastercard");
        else if (/^3[47]/.test(num)) setBrand("American Express");
        else if (/^6(?:011|5)/.test(num)) setBrand("Discover");
        else setBrand("Unknown");
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 600, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40 }}>
                        <div style={{ textAlign: 'center', marginBottom: 32 }}>
                            <CreditCard size={48} color="#fb923c" style={{ marginBottom: 16 }} />
                            <h2 style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Validate Card Numbers</h2>
                            <p style={{ color: '#9ca3af' }}>Uses Luhn algorithm. Safe & Local.</p>
                        </div>

                        <input
                            type="text"
                            value={number}
                            onChange={(e) => validate(e.target.value)}
                            placeholder="0000 0000 0000 0000"
                            maxLength={24}
                            style={{
                                width: '100%', padding: 20, fontSize: 24, textAlign: 'center', letterSpacing: 2,
                                borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white',
                                fontFamily: 'monospace'
                            }}
                        />

                        {isValid !== null && (
                            <div style={{ marginTop: 24, padding: 20, borderRadius: 12, background: isValid ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', border: `1px solid ${isValid ? '#22c55e' : '#ef4444'}`, display: 'flex', alignItems: 'center', gap: 16 }}>
                                {isValid ? <CheckCircle color="#22c55e" size={32} /> : <XCircle color="#ef4444" size={32} />}
                                <div>
                                    <div style={{ fontSize: 18, fontWeight: 'bold', color: isValid ? '#22c55e' : '#ef4444' }}>
                                        {isValid ? "Valid Card Number" : "Invalid Number"}
                                    </div>
                                    {brand && <div style={{ color: 'white', marginTop: 4 }}>Issuer: {brand}</div>}
                                </div>
                            </div>
                        )}
                    </div>

                    <p style={{ marginTop: 16, fontSize: 13, color: '#6b7280', textAlign: 'center' }}>
                        We process this locally. We do NOT collect or store card numbers.
                    </p>

                </div>
            </div>
        </div>
    );
}
