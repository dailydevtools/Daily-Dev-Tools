"use client";

import { useState, useEffect } from "react";
import { Globe, MapPin, Shield, Server } from "lucide-react";
import Link from "next/link";

export default function MyIP() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const InfoRow = ({ icon, label, value }: any) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#9ca3af' }}>
                {icon}
                <span>{label}</span>
            </div>
            <div style={{ fontWeight: 500, color: 'white' }}>{value || 'Unknown'}</div>
        </div>
    );

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 600, margin: '0 auto' }}>

                    <div className="glass-card" style={{ padding: 40, textAlign: 'center', marginBottom: 32 }}>
                        <h2 style={{ fontSize: 16, color: '#9ca3af', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 1 }}>Your Public IP Address</h2>
                        {loading ? (
                            <div style={{ fontSize: 48, fontWeight: 'bold', color: 'rgba(255,255,255,0.1)' }}>Loading...</div>
                        ) : (
                            <div style={{ fontSize: 'clamp(40px, 8vw, 64px)', fontWeight: 'bold', color: 'white', fontFamily: 'monospace' }}>
                                {data?.ip || 'Unless blocked'}
                            </div>
                        )}
                    </div>

                    {data && (
                        <div className="glass-card" style={{ padding: 32 }}>
                            <InfoRow icon={<Globe size={18} />} label="Internet Provider (ISP)" value={data.org} />
                            <InfoRow icon={<MapPin size={18} />} label="Location" value={`${data.city}, ${data.region}, ${data.country_name}`} />
                            <InfoRow icon={<Server size={18} />} label="ASN" value={data.asn} />
                            <InfoRow icon={<Shield size={18} />} label="Timezone" value={data.timezone} />
                            <div style={{ marginTop: 24, padding: 16, background: 'rgba(251, 146, 60, 0.1)', borderRadius: 8, color: '#fb923c', fontSize: 13, lineHeight: 1.5 }}>
                                This is the IP address visible to websites you visit. It may be different from your local IP if you use a VPN or proxy.
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
