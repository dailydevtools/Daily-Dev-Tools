"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import Link from "next/link";

export default function ChmodCalculator() {
    const [owner, setOwner] = useState({ r: true, w: true, x: true });
    const [group, setGroup] = useState({ r: true, w: false, x: true });
    const [public_, setPublic] = useState({ r: true, w: false, x: true });

    const calc = (p: { r: boolean, w: boolean, x: boolean }) => (p.r ? 4 : 0) + (p.w ? 2 : 0) + (p.x ? 1 : 0);
    const sym = (p: { r: boolean, w: boolean, x: boolean }) => (p.r ? 'r' : '-') + (p.w ? 'w' : '-') + (p.x ? 'x' : '-');

    const numeric = `${calc(owner)}${calc(group)}${calc(public_)}`;
    const symbolic = `${sym(owner)}${sym(group)}${sym(public_)}`;

    const Toggle = ({ checked, onChange, label }: any) => (
        <div
            onClick={() => onChange(!checked)}
            style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 8,
                background: checked ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255,255,255,0.05)',
                cursor: 'pointer', transition: 'all 0.2s',
                border: `1px solid ${checked ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255,255,255,0.1)'}`
            }}
        >
            <div style={{ width: 20, height: 20, borderRadius: 4, border: '1px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', background: checked ? '#22c55e' : 'transparent', borderColor: checked ? '#22c55e' : 'rgba(255,255,255,0.3)' }}>
                {checked && <Check size={12} color="white" />}
            </div>
            <span style={{ color: checked ? '#22c55e' : '#9ca3af', fontWeight: 500 }}>{label}</span>
        </div>
    );

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginBottom: 40 }}>
                            <div>
                                <div style={{ marginBottom: 16, color: 'white', fontWeight: 600 }}>Owner</div>
                                <div style={{ display: 'grid', gap: 8 }}>
                                    <Toggle checked={owner.r} onChange={(v: boolean) => setOwner({ ...owner, r: v })} label="Read (4)" />
                                    <Toggle checked={owner.w} onChange={(v: boolean) => setOwner({ ...owner, w: v })} label="Write (2)" />
                                    <Toggle checked={owner.x} onChange={(v: boolean) => setOwner({ ...owner, x: v })} label="Execute (1)" />
                                </div>
                            </div>
                            <div>
                                <div style={{ marginBottom: 16, color: 'white', fontWeight: 600 }}>Group</div>
                                <div style={{ display: 'grid', gap: 8 }}>
                                    <Toggle checked={group.r} onChange={(v: boolean) => setGroup({ ...group, r: v })} label="Read (4)" />
                                    <Toggle checked={group.w} onChange={(v: boolean) => setGroup({ ...group, w: v })} label="Write (2)" />
                                    <Toggle checked={group.x} onChange={(v: boolean) => setGroup({ ...group, x: v })} label="Execute (1)" />
                                </div>
                            </div>
                            <div>
                                <div style={{ marginBottom: 16, color: 'white', fontWeight: 600 }}>Public</div>
                                <div style={{ display: 'grid', gap: 8 }}>
                                    <Toggle checked={public_.r} onChange={(v: boolean) => setPublic({ ...public_, r: v })} label="Read (4)" />
                                    <Toggle checked={public_.w} onChange={(v: boolean) => setPublic({ ...public_, w: v })} label="Write (2)" />
                                    <Toggle checked={public_.x} onChange={(v: boolean) => setPublic({ ...public_, x: v })} label="Execute (1)" />
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: 24 }}>
                            <div style={{ flex: 1, padding: 24, background: 'rgba(255,255,255,0.05)', borderRadius: 16, textAlign: 'center' }}>
                                <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 8 }}>Numeric</div>
                                <div style={{ fontSize: 48, fontWeight: 700, color: '#fb923c' }}>{numeric}</div>
                            </div>
                            <div style={{ flex: 1, padding: 24, background: 'rgba(255,255,255,0.05)', borderRadius: 16, textAlign: 'center' }}>
                                <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 8 }}>Symbolic</div>
                                <div style={{ fontSize: 24, fontWeight: 700, color: '#22c55e', lineHeight: '58px' }}>{symbolic}</div>
                            </div>
                        </div>

                        <div style={{ marginTop: 24, padding: 16, background: '#111', borderRadius: 8, color: '#888', textAlign: 'center', fontFamily: 'monospace' }}>
                            chmod {numeric} filename
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
