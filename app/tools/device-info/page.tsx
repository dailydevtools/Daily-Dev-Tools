"use client";

import { useState, useEffect } from "react";
import { Monitor, Cpu, Globe, Battery } from "lucide-react";
import Link from "next/link";

export default function DeviceInfo() {
    const [info, setInfo] = useState<any>(null);

    useEffect(() => {
        const getBattery = async () => {
            if ('getBattery' in navigator) {
                // @ts-ignore
                const battery = await navigator.getBattery();
                return {
                    level: Math.round(battery.level * 100) + '%',
                    charging: battery.charging ? 'Yes' : 'No'
                };
            }
            return null;
        };

        getBattery().then(battery => {
            setInfo({
                userAgent: navigator.userAgent,
                platform: navigator.platform,
                language: navigator.language,
                screen: `${window.screen.width} x ${window.screen.height}`,
                window: `${window.innerWidth} x ${window.innerHeight}`,
                colorDepth: window.screen.colorDepth + '-bit',
                pixelRatio: window.devicePixelRatio,
                cores: navigator.hardwareConcurrency || 'Unknown',
                memory: (navigator as any).deviceMemory ? `~${(navigator as any).deviceMemory} GB` : 'Unknown',
                online: navigator.onLine ? 'Yes' : 'No',
                cookies: navigator.cookieEnabled ? 'Enabled' : 'Disabled',
                battery
            });
        });
    }, []);

    if (!info) return null;

    const InfoCard = ({ icon, label, value }: any) => (
        <div className="glass-card" style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.05)', color: '#fb923c' }}>
                {icon}
            </div>
            <div>
                <div style={{ fontSize: 13, color: '#9ca3af', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'white' }}>{value}</div>
            </div>
        </div>
    );

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 1000, margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20, marginBottom: 40 }}>
                        <InfoCard icon={<Monitor size={20} />} label="Screen Resolution" value={info.screen} />
                        <InfoCard icon={<Globe size={20} />} label="Browser" value={navigator.vendor || "Unknown"} />
                        <InfoCard icon={<Cpu size={20} />} label="CPU Cores" value={info.cores} />
                        {info.battery && (
                            <InfoCard icon={<Battery size={20} />} label="Battery" value={`${info.battery.level} (${info.battery.charging})`} />
                        )}
                    </div>

                    <div className="glass-card" style={{ padding: 32 }}>
                        <h3 style={{ fontSize: 18, fontWeight: 'bold', color: 'white', marginBottom: 20 }}>Detailed Specs</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontSize: 14 }}>
                            {[
                                ['User Agent', info.userAgent],
                                ['Platform', info.platform],
                                ['Window Size', info.window],
                                ['Pixel Ratio', info.pixelRatio],
                                ['Color Depth', info.colorDepth],
                                ['RAM', info.memory],
                                ['Cookies Enabled', info.cookies],
                                ['Online Status', info.online]
                            ].map(([label, value]) => (
                                <div key={label} style={{ padding: 12, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ color: '#9ca3af', marginBottom: 4 }}>{label}</div>
                                    <div style={{ color: 'white', wordBreak: 'break-all' }}>{value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
