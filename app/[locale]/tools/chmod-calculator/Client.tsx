"use client";

import { useState } from "react";
import { Check, Shield } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

interface Permission {
    r: boolean;
    w: boolean;
    x: boolean;
}

import { LiquidCard } from "../../../components/ui/LiquidCard";

export default function ChmodCalculatorClient() {
    const t = useTranslations('ChmodCalculator');
    const [owner, setOwner] = useState<Permission>({ r: true, w: true, x: true });
    const [group, setGroup] = useState<Permission>({ r: true, w: false, x: true });
    const [public_, setPublic] = useState<Permission>({ r: true, w: false, x: true });

    const calc = (p: Permission) => (p.r ? 4 : 0) + (p.w ? 2 : 0) + (p.x ? 1 : 0);
    const sym = (p: Permission) => (p.r ? 'r' : '-') + (p.w ? 'w' : '-') + (p.x ? 'x' : '-');

    const numeric = `${calc(owner)}${calc(group)}${calc(public_)}`;
    const symbolic = `${sym(owner)}${sym(group)}${sym(public_)}`;

    const Toggle = ({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) => (
        <button
            onClick={() => onChange(!checked)}
            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border w-full text-left ${checked ? 'bg-orange-500/10 border-orange-500/30' : 'bg-neutral-100/50 dark:bg-white/5 border-transparent hover:border-orange-500/20'}`}
        >
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${checked ? 'bg-orange-500 border-orange-500' : 'bg-transparent border-[var(--border-color)]'}`}>
                {checked && <Check size={12} className="text-white" />}
            </div>
            <span className={`font-medium ${checked ? 'text-orange-600 dark:text-orange-400' : 'text-[var(--muted-text)]'}`}>{label}</span>
        </button>
    );

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">

                    <ToolPageHeader
                        title="Chmod Calculator"
                        description="Interactive calculator for Linux file permissions."
                        icon={<Shield size={28} className="text-[#fb923c]" />}
                    />

                    <LiquidCard className="p-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            <div>
                                <div className="mb-4 text-[var(--foreground)] font-semibold text-center">{t('owner')}</div>
                                <div className="grid gap-3">
                                    <Toggle checked={owner.r} onChange={(v) => setOwner({ ...owner, r: v })} label={`${t('read')} (4)`} />
                                    <Toggle checked={owner.w} onChange={(v) => setOwner({ ...owner, w: v })} label={`${t('write')} (2)`} />
                                    <Toggle checked={owner.x} onChange={(v) => setOwner({ ...owner, x: v })} label={`${t('execute')} (1)`} />
                                </div>
                            </div>
                            <div>
                                <div className="mb-4 text-[var(--foreground)] font-semibold text-center">{t('group')}</div>
                                <div className="grid gap-3">
                                    <Toggle checked={group.r} onChange={(v) => setGroup({ ...group, r: v })} label={`${t('read')} (4)`} />
                                    <Toggle checked={group.w} onChange={(v) => setGroup({ ...group, w: v })} label={`${t('write')} (2)`} />
                                    <Toggle checked={group.x} onChange={(v) => setGroup({ ...group, x: v })} label={`${t('execute')} (1)`} />
                                </div>
                            </div>
                            <div>
                                <div className="mb-4 text-[var(--foreground)] font-semibold text-center">{t('public')}</div>
                                <div className="grid gap-3">
                                    <Toggle checked={public_.r} onChange={(v) => setPublic({ ...public_, r: v })} label={`${t('read')} (4)`} />
                                    <Toggle checked={public_.w} onChange={(v) => setPublic({ ...public_, w: v })} label={`${t('write')} (2)`} />
                                    <Toggle checked={public_.x} onChange={(v) => setPublic({ ...public_, x: v })} label={`${t('execute')} (1)`} />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 mb-8">
                            <div className="flex-1 p-6 bg-neutral-100/50 dark:bg-white/5 border border-[var(--border-color)] rounded-2xl text-center">
                                <div className="text-sm text-[var(--muted-text)] mb-2 font-medium">{t('numeric')}</div>
                                <div className="text-5xl font-bold text-orange-500 tracking-tight">{numeric}</div>
                            </div>
                            <div className="flex-1 p-6 bg-neutral-100/50 dark:bg-white/5 border border-[var(--border-color)] rounded-2xl text-center">
                                <div className="text-sm text-[var(--muted-text)] mb-2 font-medium">{t('symbolic')}</div>
                                <div className="text-3xl font-bold text-green-600 dark:text-green-400 leading-[48px] font-mono">{symbolic}</div>
                            </div>
                        </div>

                        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl text-neutral-400 text-center font-mono text-sm shadow-inner">
                            chmod <span className="text-orange-400 font-bold">{numeric}</span> filename
                        </div>
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
