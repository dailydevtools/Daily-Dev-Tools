"use client";

import { useState } from "react";
import { CreditCard, ExternalLink } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function PaypalLinkClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [username, setUsername] = useState("");
    const [amount, setAmount] = useState("");
    const [currency, setCurrency] = useState("USD");

    const link = `https://paypal.me/${username}${amount ? `/${amount}${currency}` : ''}`;

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">
                    <ToolPageHeader
                        title={tTools('paypal-link.name')}
                        description={tTools('paypal-link.description')}
                        icon={<CreditCard size={28} className="text-[#fb923c]" />}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10">
                        <div className="flex flex-col gap-6">

                            <div>
                                <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('PayPalLink.username')}</label>
                                <input
                                    type="text" value={username} onChange={e => setUsername(e.target.value)}
                                    placeholder="username"
                                    className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
                                />
                            </div>

                            <div className="flex gap-6">
                                <div className="flex-1">
                                    <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('PayPalLink.amount')} (Optional)</label>
                                    <input
                                        type="number" value={amount} onChange={e => setAmount(e.target.value)}
                                        placeholder="25.00"
                                        className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
                                    />
                                </div>
                                <div className="w-[120px]">
                                    <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('PayPalLink.currency')}</label>
                                    <select
                                        value={currency} onChange={e => setCurrency(e.target.value)}
                                        className="w-full p-3 rounded-xl bg-[#111] border border-[#333] text-white"
                                    >
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                        <option value="GBP">GBP</option>
                                        <option value="CAD">CAD</option>
                                        <option value="AUD">AUD</option>
                                    </select>
                                </div>
                            </div>

                            <div className="p-6 bg-blue-500/10 rounded-2xl border border-blue-500/20 mt-3">
                                <div className="text-[13px] text-blue-500 mb-2 font-semibold">{t('PayPalLink.yourLink')}</div>
                                <div className="mb-6 break-all text-white text-lg">
                                    {link}
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={() => navigator.clipboard.writeText(link)} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] flex-1 justify-center py-2.5">{t('common.copy')}</button>
                                    <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] flex-1 flex items-center justify-center gap-2 no-underline py-2.5">
                                        {t('PayPalLink.openPaypal')} <ExternalLink size={16} />
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
