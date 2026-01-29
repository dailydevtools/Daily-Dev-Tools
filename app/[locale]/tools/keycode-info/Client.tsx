"use client";

import { useState, useEffect } from "react";
import { Keyboard } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";

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
        <LiquidCard className="p-6 text-center flex flex-col items-center justify-center min-h-[160px]">
            <div className="text-xs font-medium text-[var(--muted-text)] mb-3 uppercase tracking-wider">{label}</div>
            <div className="text-3xl font-bold text-[var(--foreground)] font-mono break-all">{value}</div>
            {sub && <div className="text-xs text-[var(--muted-text)] mt-2">{sub}</div>}
        </LiquidCard>
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
                        <div className="py-[100px] text-center text-[var(--muted-text)] animate-in fade-in zoom-in duration-500">
                            <div className="mb-8 inline-flex p-8 rounded-full bg-orange-500/10 text-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.2)]">
                                <Keyboard size={64} />
                            </div>
                            <h2 className="text-3xl font-bold text-[var(--foreground)] mb-3">{t('KeycodeInfo.pressKey')}</h2>
                            <p className="text-lg opacity-60">{t('KeycodeInfo.info')}</p>
                        </div>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
                            <div className="text-center mb-[60px]">
                                <div className="text-[140px] font-bold text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-red-600 leading-none drop-shadow-2xl">
                                    {event.keyCode || event.which}
                                </div>
                                <div className="text-xl font-medium text-[var(--muted-text)] mt-4 uppercase tracking-widest">{t('KeycodeInfo.which')}</div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                <Card label={t('KeycodeInfo.key')} value={event.key === ' ' ? t('KeycodeInfo.space') : event.key} />
                                <Card label={t('KeycodeInfo.code')} value={event.code} />
                                <Card label={t('KeycodeInfo.location')} value={event.location} sub={[t('KeycodeInfo.standard'), t('KeycodeInfo.left'), t('KeycodeInfo.right'), t('KeycodeInfo.numpad')][event.location]} />
                                <Card label={t('KeycodeInfo.modifiers')} value={
                                    [event.ctrlKey && 'Ctrl', event.shiftKey && 'Shift', event.altKey && 'Alt', event.metaKey && 'Meta'].filter(Boolean).join(' + ') || 'None'
                                } />
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </main>
    );
}
