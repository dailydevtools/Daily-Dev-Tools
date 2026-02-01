"use client";

import { useState, useEffect } from "react";
import { Monitor, Cpu, Globe, Battery } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import ToolIcon from "../../../components/ToolIcon";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";

export default function DeviceInfoClient() {
    const t = useTranslations('DeviceInfo');
    const [info, setInfo] = useState<any>(null);

    useEffect(() => {
        const getBattery = async () => {
            if ('getBattery' in navigator) {
                // @ts-ignore
                const battery = await navigator.getBattery();
                return {
                    level: Math.round(battery.level * 100) + '%',
                    charging: battery.charging ? t('yes') : t('no')
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
                cores: navigator.hardwareConcurrency || t('unknown'),
                memory: (navigator as any).deviceMemory ? `~${(navigator as any).deviceMemory} GB` : t('unknown'),
                online: navigator.onLine ? t('yes') : t('no'),
                cookies: navigator.cookieEnabled ? t('enabled') : t('disabled'),
                battery
            });
        });
    }, [t]);

    if (!info) return null;

    const InfoCard = ({ icon, label, value }: any) => (
        <LiquidCard className="p-6 flex items-center gap-5 group hover:border-orange-500/30 transition-all">
            <div className="p-4 rounded-2xl bg-orange-500/5 dark:bg-orange-500/10 text-orange-500 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted-text)] mb-1">{label}</div>
                <div className="text-lg font-bold text-[var(--foreground)]">{value}</div>
            </div>
        </LiquidCard>
    );

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[1000px] mx-auto">

                    <ToolPageHeader
                        title="Device Information"
                        description="View detailed information about your device, browser, and network."
                        icon={<ToolIcon name="Smartphone" size={32} />}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        <InfoCard icon={<Monitor size={24} />} label={t('screenResolution')} value={info.screen} />
                        <InfoCard icon={<Globe size={24} />} label={t('browser')} value={navigator.vendor || t('unknown')} />
                        <InfoCard icon={<Cpu size={24} />} label={t('cpuCores')} value={info.cores} />
                        {info.battery && (
                            <InfoCard icon={<Battery size={24} />} label={t('battery')} value={info.battery.level} />
                        )}
                    </div>

                    <LiquidCard className="p-0 overflow-hidden">
                        <div className="p-8 border-b border-[var(--border-color)] bg-neutral-100/50 dark:bg-white/5">
                            <h3 className="text-xl font-bold text-[var(--title-color)]">{t('detailedSpecs')}</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {[
                                [t('userAgent'), info.userAgent],
                                [t('platform'), info.platform],
                                [t('windowSize'), info.window],
                                [t('pixelRatio'), info.pixelRatio],
                                [t('colorDepth'), info.colorDepth],
                                [t('ram'), info.memory],
                                [t('cookiesEnabled'), info.cookies],
                                [t('onlineStatus'), info.online]
                            ].map(([label, value], i) => (
                                <div key={label} className={`p-6 border-[var(--border-color)] ${i % 2 === 0 ? 'md:border-r' : ''} border-b last:border-b-0`}>
                                    <div className="text-[11px] font-bold uppercase tracking-widest text-[var(--muted-text)] mb-2">{label}</div>
                                    <div className="text-[var(--foreground)] font-medium break-all">{value}</div>
                                </div>
                            ))}
                        </div>
                    </LiquidCard>
                </div>
            </div>
        </main>
    );
}
