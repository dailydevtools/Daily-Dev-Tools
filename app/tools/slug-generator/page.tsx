"use client";

import { useState } from "react";
import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export default function SlugGenerator() {
    const [input, setInput] = useState("");

    const process = (text: string) => {
        // Lowercase
        // Replace non-alphanum with -
        // Remove dupe hyphens
        // Trim hyphens
        return text.toLowerCase()
            .replace(/[^\w\s-]/g, '') // remove non-word chars except hyphen/space
            .replace(/[\s]+/g, '-')     // replace space with hyphen
            .replace(/-+/g, '-')        // remove invalid chars
            .replace(/^-+/, '')         // trim start
            .replace(/-+$/, '');        // trim end
    };

    const output = process(input);

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40, textAlign: 'center' }}>
                        <div style={{ marginBottom: 32 }}>
                            <label style={{ display: 'block', marginBottom: 12, color: '#9ca3af', fontSize: 13 }}>Enter Article Title / Text</label>
                            <input
                                type="text"
                                value={input} onChange={e => setInput(e.target.value)}
                                placeholder="Hello World! This is a Title."
                                className="input-field"
                                style={{ width: '100%', padding: 16, fontSize: 18, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', textAlign: 'center' }}
                            />
                        </div>

                        {output && (
                            <div style={{ padding: 24, background: 'rgba(34, 197, 94, 0.1)', borderRadius: 16, border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                                <div style={{ fontSize: 13, color: '#22c55e', marginBottom: 8, fontWeight: 600 }}>Generated Slug</div>
                                <div style={{ fontSize: 24, fontWeight: 'bold', color: 'white', fontFamily: 'monospace', wordBreak: 'break-all' }}>{output}</div>
                                <button onClick={() => navigator.clipboard.writeText(output)} className="btn-primary" style={{ marginTop: 16, padding: '8px 24px' }}>Copy Slug</button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
