"use client";

import { useState, useEffect } from "react";
import { Monitor, Cpu, Globe, Battery } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

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
        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-6 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-white/5 text-[#fb923c]">
                {icon}
            </div>
            <div>
                <div className="text-[13px] text-[#9ca3af] mb-1">{label}</div>
                <div className="text-base font-semibold text-white">{value}</div>
            </div>
        </div>
    );

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[1000px] mx-auto">

                    <ToolPageHeader
                        title="Device Information"
                        description="View detailed information about your device, browser, and network."
                        icon={<Monitor size={28} className="text-[#fb923c]" />}
                    />

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 mb-10">
                        <InfoCard icon={<Monitor size={20} />} label={t('screenResolution')} value={info.screen} />
                        <InfoCard icon={<Globe size={20} />} label={t('browser')} value={navigator.vendor || t('unknown')} />
                        <InfoCard icon={<Cpu size={20} />} label={t('cpuCores')} value={info.cores} />
                        {info.battery && (
                            <InfoCard icon={<Battery size={20} />} label={t('battery')} value={`${info.battery.level} (${info.battery.charging})`} />
                        )}
                    </div>

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-8">
                        <h3 className="text-lg font-bold text-white mb-5">{t('detailedSpecs')}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            {[
                                [t('userAgent'), info.userAgent],
                                [t('platform'), info.platform],
                                [t('windowSize'), info.window],
                                [t('pixelRatio'), info.pixelRatio],
                                [t('colorDepth'), info.colorDepth],
                                [t('ram'), info.memory],
                                [t('cookiesEnabled'), info.cookies],
                                [t('onlineStatus'), info.online]
                            ].map(([label, value]) => (
                                <div key={label} className="p-3 border-b border-white/5">
                                    <div className="text-[#9ca3af] mb-1">{label}</div>
                                    <div className="text-white break-all">{value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
