"use client";

import { useState } from "react";
import { Lock, Copy } from "lucide-react";
import Link from "next/link";

export default function HtpasswdGenerator() {
    const [user, setUser] = useState("admin");
    const [pass, setPass] = useState("");
    const [algo, setAlgo] = useState("sha1"); // Only secure-ish client side easy option without heavy libs
    const [output, setOutput] = useState("");

    const generate = async () => {
        if (!user || !pass) return;

        if (algo === "sha1") {
            const enc = new TextEncoder();
            const hash = await crypto.subtle.digest("SHA-1", enc.encode(pass));
            const base64 = btoa(String.fromCharCode(...new Uint8Array(hash)));
            setOutput(`${user}:{SHA}${base64}`);
        } else {
            // Placeholder for complex bcrypt/md5 which require heavy js libs
            setOutput("Only SHA-1 is supported in this client-side version.");
        }
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 600, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40 }}>
                        <div style={{ marginBottom: 24 }}>
                            <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Username</label>
                            <input
                                type="text" value={user} onChange={e => setUser(e.target.value)}
                                className="input-field"
                                style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                            />
                        </div>

                        <div style={{ marginBottom: 24 }}>
                            <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Password</label>
                            <input
                                type="password" value={pass} onChange={e => setPass(e.target.value)}
                                className="input-field"
                                style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                            />
                        </div>

                        <div style={{ marginBottom: 32 }}>
                            <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>Algorithm</label>
                            <select value={algo} onChange={e => setAlgo(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 12, background: '#111', border: '1px solid #333', color: 'white' }}>
                                <option value="sha1">SHA-1 (Insecure but standard)</option>
                            </select>
                        </div>

                        <button onClick={generate} className="btn-primary" style={{ width: '100%', padding: 16, marginBottom: 32 }}>
                            Generate Entry
                        </button>

                        {output && (
                            <div style={{ padding: 20, background: 'rgba(255,255,255,0.05)', borderRadius: 12, position: 'relative' }}>
                                <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 8 }}>Result</div>
                                <div style={{ fontFamily: 'monospace', color: '#fb923c', fontSize: 16, wordBreak: 'break-all' }}>{output}</div>
                                <button onClick={() => navigator.clipboard.writeText(output)} style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>
                                    <Copy size={16} />
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
