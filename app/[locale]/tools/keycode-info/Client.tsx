"use client";

import { useState, useEffect } from "react";
import { Keyboard } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function KeyCodeInfoClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [event, setEvent] = useState<KeyboardEvent | null>(null);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            e.preventDefault();
            setEvent(e);
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    const Card = ({ label, value, sub }: any) => (
        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-6 text-center flex flex-col items-center justify-center">
            <div className="text-[13px] text-[#9ca3af] mb-2 uppercase">{label}</div>
            <div className="text-[32px] font-bold text-white font-mono">{value}</div>
            {sub && <div className="text-xs text-[#6b7280] mt-1">{sub}</div>}
        </div>
    );

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">
                    <ToolPageHeader
                        title={tTools('keycode-info.name')}
                        description={tTools('keycode-info.description')}
                        icon={<Keyboard size={28} className="text-[#fb923c]" />}
                    />

                    {!event ? (
                        <div className="py-[100px] text-center text-[#6b7280]">
                            <div className="mb-6 inline-flex p-6 rounded-full bg-white/5">
                                <Keyboard size={48} />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">{t('KeycodeInfo.pressKey')}</h2>
                            <p>{t('KeycodeInfo.info')}</p>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-[60px]">
                                <div className="text-[120px] font-bold text-[#fb923c] leading-none">{event.keyCode || event.which}</div>
                                <div className="text-lg text-[#9ca3af] mt-4">{t('KeycodeInfo.which')}</div>
                            </div>

                            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
                                <Card label={t('KeycodeInfo.key')} value={event.key === ' ' ? t('KeycodeInfo.space') : event.key} />
                                <Card label={t('KeycodeInfo.code')} value={event.code} />
                                <Card label={t('KeycodeInfo.location')} value={event.location} sub={[t('KeycodeInfo.standard'), t('KeycodeInfo.left'), t('KeycodeInfo.right'), t('KeycodeInfo.numpad')][event.location]} />
                                <Card label={t('KeycodeInfo.modifiers')} value={
                                    [event.ctrlKey && 'Ctrl', event.shiftKey && 'Shift', event.altKey && 'Alt', event.metaKey && 'Meta'].filter(Boolean).join(' + ') || 'None'
                                } />
                            </div>
                        </>
                    )}

                </div>
            </div>
        </main>
    );
}
