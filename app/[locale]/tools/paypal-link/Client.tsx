"use client";

import { useState } from "react";
import { CreditCard, ExternalLink } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput } from "../../../components/ui/LiquidInput";
import LiquidSelect from "../../../components/ui/LiquidSelect";
import { LiquidButton } from "../../../components/ui/LiquidButton";

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

                    <LiquidCard className="p-10">
                        <div className="flex flex-col gap-6">

                            <div>
                                <label className="block mb-2 text-[var(--muted-text)] text-[13px]">{t('PayPalLink.username')}</label>
                                <LiquidInput
                                    type="text" value={username} onChange={e => setUsername(e.target.value)}
                                    placeholder="username"
                                />
                            </div>

                            <div className="flex gap-6">
                                <div className="flex-1">
                                    <label className="block mb-2 text-[var(--muted-text)] text-[13px]">{t('PayPalLink.amount')} (Optional)</label>
                                    <LiquidInput
                                        type="number" value={amount} onChange={e => setAmount(e.target.value)}
                                        placeholder="25.00"
                                    />
                                </div>
                                <div className="w-[120px]">
                                    <label className="block mb-2 text-[var(--muted-text)] text-[13px]">{t('PayPalLink.currency')}</label>
                                    <LiquidSelect
                                        value={currency}
                                        onChange={setCurrency}
                                        options={[
                                            { value: "USD", label: "USD" },
                                            { value: "EUR", label: "EUR" },
                                            { value: "GBP", label: "GBP" },
                                            { value: "CAD", label: "CAD" },
                                            { value: "AUD", label: "AUD" }
                                        ]}
                                    />
                                </div>
                            </div>

                            <div className="p-6 bg-blue-500/10 rounded-2xl border border-blue-500/20 mt-3">
                                <div className="text-[13px] text-blue-500 mb-2 font-semibold">{t('PayPalLink.yourLink')}</div>
                                <div className="mb-6 break-all text-[var(--foreground)] text-lg font-mono">
                                    {link}
                                </div>
                                <div className="flex gap-3">
                                    <LiquidButton onClick={() => navigator.clipboard.writeText(link)} variant="secondary" className="flex-1">
                                        {t('common.copy')}
                                    </LiquidButton>
                                    <LiquidButton onClick={() => window.open(link, '_blank')} className="flex-1 gap-2">
                                        {t('PayPalLink.openPaypal')} <ExternalLink size={16} />
                                    </LiquidButton>
                                </div>
                            </div>

                        </div>
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
