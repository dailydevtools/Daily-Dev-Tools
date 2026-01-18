"use client";

import { useState } from "react";
import { Network } from "lucide-react";
import Link from "next/link";

export default function SubnetCalculator() {
    const [ip, setIp] = useState("192.168.1.1");
    const [cidr, setCidr] = useState("24");

    const [info, setInfo] = useState<any>(null);

    const calculate = () => {
        try {
            const mask = 0xffffffff << (32 - parseInt(cidr));

            const ipParts = ip.split('.').map(Number);
            if (ipParts.length !== 4 || ipParts.some(n => isNaN(n) || n < 0 || n > 255)) {
                setInfo(null); return;
            }

            const ipInt = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];
            const netAddr = (ipInt & mask) >>> 0;
            const broadAddr = (netAddr | (~mask)) >>> 0;

            const first = netAddr + 1;
            const last = broadAddr - 1;
            const count = Math.max(0, last - first + 1);

            const toIp = (int: number) => {
                return [
                    (int >>> 24) & 0xff,
                    (int >>> 16) & 0xff,
                    (int >>> 8) & 0xff,
                    int & 0xff
                ].join('.');
            };

            setInfo({
                mask: toIp(mask),
                network: toIp(netAddr),
                broadcast: toIp(broadAddr),
                first: toIp(first),
                last: toIp(last),
                count: count.toLocaleString()
            });

        } catch (e) {
            setInfo(null);
        }
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40 }}>
                        <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
                            <div style={{ flex: 3 }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>IP Address</label>
                                <input
                                    type="text" value={ip} onChange={e => { setIp(e.target.value); }}
                                    className="input-field" placeholder="192.168.1.1"
                                    style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: 8, color: '#9ca3af', fontSize: 13 }}>CIDR (/{cidr})</label>
                                <input
                                    type="number" min="0" max="32" value={cidr} onChange={e => { setCidr(e.target.value); }}
                                    className="input-field"
                                    style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                                />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                                <button onClick={calculate} className="btn-primary" style={{ padding: '12px 24px' }}>Calculate</button>
                            </div>
                        </div>

                        {info && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                                <div style={{ padding: 20, background: 'rgba(255,255,255,0.05)', borderRadius: 12 }}>
                                    <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 4 }}>Subnet Mask</div>
                                    <div style={{ fontSize: 18, fontWeight: 600, color: 'white' }}>{info.mask}</div>
                                </div>
                                <div style={{ padding: 20, background: 'rgba(255,255,255,0.05)', borderRadius: 12 }}>
                                    <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 4 }}>Network Address</div>
                                    <div style={{ fontSize: 18, fontWeight: 600, color: '#fb923c' }}>{info.network}</div>
                                </div>
                                <div style={{ padding: 20, background: 'rgba(255,255,255,0.05)', borderRadius: 12 }}>
                                    <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 4 }}>First Host</div>
                                    <div style={{ fontSize: 18, fontWeight: 600, color: 'white' }}>{info.first}</div>
                                </div>
                                <div style={{ padding: 20, background: 'rgba(255,255,255,0.05)', borderRadius: 12 }}>
                                    <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 4 }}>Last Host</div>
                                    <div style={{ fontSize: 18, fontWeight: 600, color: 'white' }}>{info.last}</div>
                                </div>
                                <div style={{ padding: 20, background: 'rgba(255,255,255,0.05)', borderRadius: 12 }}>
                                    <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 4 }}>Broadcast Address</div>
                                    <div style={{ fontSize: 18, fontWeight: 600, color: '#ef4444' }}>{info.broadcast}</div>
                                </div>
                                <div style={{ padding: 20, background: 'rgba(255,255,255,0.05)', borderRadius: 12 }}>
                                    <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 4 }}>Total Hosts</div>
                                    <div style={{ fontSize: 18, fontWeight: 600, color: '#22c55e' }}>{info.count}</div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
