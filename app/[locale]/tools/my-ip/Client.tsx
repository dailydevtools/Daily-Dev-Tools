"use client";

import { useState, useEffect } from "react";
import { Globe, MapPin, Shield, Server } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";

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
        <div className="flex items-center justify-between py-4 border-b border-[var(--border-color)] last:border-0 hover:bg-neutral-50/50 dark:hover:bg-white/5 px-2 rounded-lg transition-colors">
            <div className="flex items-center gap-3 text-[var(--muted-text)]">
                {icon}
                <span>{label}</span>
            </div>
            <div className="font-medium text-[var(--foreground)]">{value || 'Unknown'}</div>
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

                    <LiquidCard className="p-10 text-center mb-8">
                        <h2 className="text-sm font-medium text-[var(--muted-text)] mb-4 uppercase tracking-widest">{t('ipLabel')}</h2>
                        {loading ? (
                            <div className="text-5xl font-bold text-[var(--muted-text)] opacity-20">{t('loading')}</div>
                        ) : (
                            <div className="text-[clamp(40px,8vw,64px)] font-bold text-[var(--foreground)] font-mono break-all animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {data?.ip || 'Unless blocked'}
                            </div>
                        )}
                    </LiquidCard>

                    {data && (
                        <LiquidCard className="p-8">
                            <InfoRow icon={<Globe size={18} className="text-blue-500" />} label={t('isp')} value={data.org} />
                            <InfoRow icon={<MapPin size={18} className="text-red-500" />} label={t('location')} value={`${data.city}, ${data.region}, ${data.country_name}`} />
                            <InfoRow icon={<Server size={18} className="text-purple-500" />} label={t('asn')} value={data.asn} />
                            <InfoRow icon={<Shield size={18} className="text-green-500" />} label={t('timezone')} value={data.timezone} />
                            <div className="mt-8 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-500 text-sm leading-relaxed flex gap-3 items-start">
                                <div className="mt-0.5"><Shield size={16} /></div>
                                {t('note')}
                            </div>
                        </LiquidCard>
                    )}

                </div>
            </div>
        </main>
    );
}
