"use client";

import { useState, useEffect } from "react";
import { Globe, MapPin, Shield, Server } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function MyIPClient() {
    const t = useTranslations('MyIP');
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
        <div className="flex items-center justify-between py-4 border-b border-white/5">
            <div className="flex items-center gap-3 text-[#9ca3af]">
                {icon}
                <span>{label}</span>
            </div>
            <div className="font-medium text-white">{value || 'Unknown'}</div>
        </div>
    );

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[600px] mx-auto">
                    <ToolPageHeader
                        title="My IP Address"
                        description="Check your public IP address, location, and ISP details instantly."
                        icon={<Globe size={28} className="text-[#fb923c]" />}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10 text-center mb-8">
                        <h2 className="text-base text-[#9ca3af] mb-4 uppercase tracking-widest">{t('ipLabel')}</h2>
                        {loading ? (
                            <div className="text-5xl font-bold text-white/10">{t('loading')}</div>
                        ) : (
                            <div className="text-[clamp(40px,8vw,64px)] font-bold text-white font-mono break-all">
                                {data?.ip || 'Unless blocked'}
                            </div>
                        )}
                    </div>

                    {data && (
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-8">
                            <InfoRow icon={<Globe size={18} />} label={t('isp')} value={data.org} />
                            <InfoRow icon={<MapPin size={18} />} label={t('location')} value={`${data.city}, ${data.region}, ${data.country_name}`} />
                            <InfoRow icon={<Server size={18} />} label={t('asn')} value={data.asn} />
                            <InfoRow icon={<Shield size={18} />} label={t('timezone')} value={data.timezone} />
                            <div className="mt-6 p-4 bg-[#fb923c]/10 rounded-lg text-[#fb923c] text-[13px] leading-6">
                                {t('note')}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </main>
    );
}
