"use client";

import { useState } from "react";
import { Dices, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function RandomGenerator() {
    const [tab, setTab] = useState<'number' | 'list' | 'coin'>('number');

    // Number
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(100);
    const [count, setCount] = useState(1);
    const [numbers, setNumbers] = useState<number[]>([]);

    // List
    const [listInput, setListInput] = useState("Apple\nBanana\nOrange\nMango");
    const [picked, setPicked] = useState("");

    // Coin
    const [coinResult, setCoinResult] = useState<string | null>(null);

    const generateNumbers = () => {
        const arr = [];
        for (let i = 0; i < count; i++) {
            arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        setNumbers(arr);
    };

    const pickFromList = () => {
        const items = listInput.split('\n').filter(line => line.trim() !== '');
        const random = items[Math.floor(Math.random() * items.length)];
        setPicked(random);
    };

    const flipCoin = () => {
        setCoinResult(Math.random() > 0.5 ? 'Heads' : 'Tails');
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div style={{ display: 'flex', gap: 12, marginBottom: 32, overflowX: 'auto', paddingBottom: 4 }}>
                        {['number', 'list', 'coin'].map((t) => (
                            <button
                                key={t}
                                onClick={() => setTab(t as any)}
                                className={tab === t ? 'btn-primary' : 'btn-secondary'}
                                style={{ textTransform: 'capitalize' }}
                            >
                                {t} Generator
                            </button>
                        ))}
                    </div>

                    <div className="glass-card" style={{ padding: 32 }}>
                        {tab === 'number' && (
                            <div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
                                    <div>
                                        <label style={{ display: 'block', color: '#9ca3af', marginBottom: 8, fontSize: 13 }}>Min</label>
                                        <input type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} style={{ width: '100%', padding: 12, borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', color: '#9ca3af', marginBottom: 8, fontSize: 13 }}>Max</label>
                                        <input type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} style={{ width: '100%', padding: 12, borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                                    </div>
                                </div>
                                <div style={{ marginBottom: 32 }}>
                                    <label style={{ display: 'block', color: '#9ca3af', marginBottom: 8, fontSize: 13 }}>Count</label>
                                    <input type="number" value={count} min={1} max={100} onChange={(e) => setCount(Number(e.target.value))} style={{ width: '100%', padding: 12, borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                                </div>
                                <button onClick={generateNumbers} className="btn-primary" style={{ width: '100%' }}>Generate</button>

                                {numbers.length > 0 && (
                                    <div style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                                        {numbers.map((n, i) => (
                                            <div key={i} style={{ width: 64, height: 64, borderRadius: '50%', background: '#22c55e', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 20 }}>{n}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {tab === 'list' && (
                            <div>
                                <label style={{ display: 'block', color: '#9ca3af', marginBottom: 8, fontSize: 13 }}>List Items (one per line)</label>
                                <textarea
                                    value={listInput}
                                    onChange={(e) => setListInput(e.target.value)}
                                    style={{ width: '100%', height: 200, padding: 16, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', marginBottom: 24, fontFamily: 'monospace' }}
                                />
                                <button onClick={pickFromList} className="btn-primary" style={{ width: '100%' }}>Pick Random Item</button>

                                {picked && (
                                    <div style={{ marginTop: 40, textAlign: 'center' }}>
                                        <div style={{ fontSize: 14, color: '#9ca3af', marginBottom: 12 }}>The winner is...</div>
                                        <div style={{ fontSize: 32, fontWeight: 'bold', color: '#facc15' }}>{picked}</div>
                                    </div>
                                )}
                            </div>
                        )}

                        {tab === 'coin' && (
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <button onClick={flipCoin} className="btn-primary" style={{ padding: '16px 40px', fontSize: 18 }}>
                                    <Dices size={24} /> Flip Coin
                                </button>

                                {coinResult && (
                                    <div style={{ marginTop: 40 }}>
                                        <div style={{
                                            width: 120, height: 120, borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #f97316, #facc15)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: 24, fontWeight: 'bold', color: 'black',
                                            margin: '0 auto',
                                            boxShadow: '0 0 40px rgba(249, 115, 22, 0.4)'
                                        }}>
                                            {coinResult}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
