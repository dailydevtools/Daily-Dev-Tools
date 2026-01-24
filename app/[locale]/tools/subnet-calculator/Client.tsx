"use client";

import { useState } from "react";
import { Network } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function SubnetCalculatorClient() {
    const t = useTranslations('SubnetCalculator');
    const [ip, setIp] = useState("192.168.1.1");
    const [cidr, setCidr] = useState("24");

    const [info, setInfo] = useState<any>(null);

    const calculate = () => {
        try {
            const mask = 0xffffffff << (32 - parseInt(cidr));

            const ipParts = ip.split('.').map(Number);
            if (ipParts.length !== 4 || ipParts.some(n => isNaN(n) || n < 0 || n > 255)) {
                setInfo(null); return;
            }

            const ipInt = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];
            const netAddr = (ipInt & mask) >>> 0;
            const broadAddr = (netAddr | (~mask)) >>> 0;

            const first = netAddr + 1;
            const last = broadAddr - 1;
            const count = Math.max(0, last - first + 1);

            const toIp = (int: number) => {
                return [
                    (int >>> 24) & 0xff,
                    (int >>> 16) & 0xff,
                    (int >>> 8) & 0xff,
                    int & 0xff
                ].join('.');
            };

            setInfo({
                mask: toIp(mask),
                network: toIp(netAddr),
                broadcast: toIp(broadAddr),
                first: toIp(first),
                last: toIp(last),
                count: count.toLocaleString()
            });

        } catch (e) {
            setInfo(null);
        }
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">
                    <ToolPageHeader
                        title="Subnet Calculator"
                        description="Calculate network address, broadcast address, and host range from IP and CIDR."
                        icon={<Network size={28} className="text-[#fb923c]" />}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10">
                        <div className="flex flex-col md:flex-row gap-6 mb-8">
                            <div className="flex-[3]">
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('ip')}</label>
                                <input
                                    type="text" value={ip} onChange={e => { setIp(e.target.value); }}
                                    className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
                                    placeholder="192.168.1.1"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('cidr')}</label>
                                <input
                                    type="number" min="0" max="32" value={cidr} onChange={e => { setCidr(e.target.value); }}
                                    className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
                                />
                            </div>
                            <div className="flex items-end">
                                <button onClick={calculate} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] py-3 px-6 h-[50px] flex items-center justify-center">{t('calculate')}</button>
                            </div>
                        </div>

                        {info && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-5 bg-white/5 rounded-xl border border-white/5">
                                    <div className="text-[13px] text-[#9ca3af] mb-1">{t('subnetMask')}</div>
                                    <div className="text-lg font-semibold text-white">{info.mask}</div>
                                </div>
                                <div className="p-5 bg-white/5 rounded-xl border border-white/5">
                                    <div className="text-[13px] text-[#9ca3af] mb-1">{t('networkAddress')}</div>
                                    <div className="text-lg font-semibold text-[#fb923c]">{info.network}</div>
                                </div>
                                <div className="p-5 bg-white/5 rounded-xl border border-white/5">
                                    <div className="text-[13px] text-[#9ca3af] mb-1">{t('firstHost')}</div>
                                    <div className="text-lg font-semibold text-white">{info.first}</div>
                                </div>
                                <div className="p-5 bg-white/5 rounded-xl border border-white/5">
                                    <div className="text-[13px] text-[#9ca3af] mb-1">{t('lastHost')}</div>
                                    <div className="text-lg font-semibold text-white">{info.last}</div>
                                </div>
                                <div className="p-5 bg-white/5 rounded-xl border border-white/5">
                                    <div className="text-[13px] text-[#9ca3af] mb-1">{t('broadcastAddress')}</div>
                                    <div className="text-lg font-semibold text-[#ef4444]">{info.broadcast}</div>
                                </div>
                                <div className="p-5 bg-white/5 rounded-xl border border-white/5">
                                    <div className="text-[13px] text-[#9ca3af] mb-1">{t('totalHosts')}</div>
                                    <div className="text-lg font-semibold text-[#22c55e]">{info.count}</div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </main>
    );
}
