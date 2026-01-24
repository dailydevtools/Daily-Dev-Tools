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
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 border w-full text-left ${checked ? 'bg-green-500/20 border-green-500/30' : 'bg-white/5 border-white/10'}`}
        >
            <div className={`w-5 h-5 rounded border flex items-center justify-center ${checked ? 'bg-[#22c55e] border-[#22c55e]' : 'bg-transparent border-white/30'}`}>
                {checked && <Check size={12} color="white" />}
            </div>
            <span className={`font-medium ${checked ? 'text-[#22c55e]' : 'text-[#9ca3af]'}`}>{label}</span>
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

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            <div>
                                <div className="mb-4 text-white font-semibold">{t('owner')}</div>
                                <div className="grid gap-2">
                                    <Toggle checked={owner.r} onChange={(v) => setOwner({ ...owner, r: v })} label={`${t('read')} (4)`} />
                                    <Toggle checked={owner.w} onChange={(v) => setOwner({ ...owner, w: v })} label={`${t('write')} (2)`} />
                                    <Toggle checked={owner.x} onChange={(v) => setOwner({ ...owner, x: v })} label={`${t('execute')} (1)`} />
                                </div>
                            </div>
                            <div>
                                <div className="mb-4 text-white font-semibold">{t('group')}</div>
                                <div className="grid gap-2">
                                    <Toggle checked={group.r} onChange={(v) => setGroup({ ...group, r: v })} label={`${t('read')} (4)`} />
                                    <Toggle checked={group.w} onChange={(v) => setGroup({ ...group, w: v })} label={`${t('write')} (2)`} />
                                    <Toggle checked={group.x} onChange={(v) => setGroup({ ...group, x: v })} label={`${t('execute')} (1)`} />
                                </div>
                            </div>
                            <div>
                                <div className="mb-4 text-white font-semibold">{t('public')}</div>
                                <div className="grid gap-2">
                                    <Toggle checked={public_.r} onChange={(v) => setPublic({ ...public_, r: v })} label={`${t('read')} (4)`} />
                                    <Toggle checked={public_.w} onChange={(v) => setPublic({ ...public_, w: v })} label={`${t('write')} (2)`} />
                                    <Toggle checked={public_.x} onChange={(v) => setPublic({ ...public_, x: v })} label={`${t('execute')} (1)`} />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1 p-6 bg-white/5 rounded-2xl text-center">
                                <div className="text-[13px] text-[#9ca3af] mb-2">{t('numeric')}</div>
                                <div className="text-5xl font-bold text-[#fb923c]">{numeric}</div>
                            </div>
                            <div className="flex-1 p-6 bg-white/5 rounded-2xl text-center">
                                <div className="text-[13px] text-[#9ca3af] mb-2">{t('symbolic')}</div>
                                <div className="text-2xl font-bold text-[#22c55e] leading-[58px]">{symbolic}</div>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-[#111] rounded-lg text-[#888] text-center font-mono">
                            chmod {numeric} filename
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
