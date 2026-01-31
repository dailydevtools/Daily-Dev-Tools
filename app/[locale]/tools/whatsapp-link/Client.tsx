"use client";

import { useState } from "react";
import { MessageCircle, ExternalLink, Smartphone } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";
import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput, LiquidTextArea } from "../../../components/ui/LiquidInput";
import { LiquidButton } from "../../../components/ui/LiquidButton";
export default function WhatsAppLinkClient() {
    const t = useTranslations('WhatsAppLink');
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    // Basic cleaning of phone number
    const cleanPhone = phone.replace(/[^\d]/g, '');
    const link = `https://wa.me/${cleanPhone}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">
                    <ToolPageHeader
                        title="WhatsApp Link Generator"
                        description="Create click-to-chat WhatsApp links for your website or social media."
                        icon={<MessageCircle size={28} className="text-[#fb923c]" />}
                    />

                    <LiquidCard className="p-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div>
                                <div className="mb-6">
                                    <label className="block mb-2 text-[var(--muted-text)] text-[13px]">{t('phone')}</label>
                                    <LiquidInput
                                        value={phone} onChange={e => setPhone(e.target.value)}
                                        placeholder="e.g. 15551234567"
                                    />
                                    <div className="text-xs text-[var(--muted-text)] mt-2">{t('hint')}</div>
                                </div>
                                <div>
                                    <label className="block mb-2 text-[var(--muted-text)] text-[13px]">{t('message')}</label>
                                    <LiquidTextArea
                                        value={message} onChange={e => setMessage(e.target.value)}
                                        placeholder="Hello, I'm interested..."
                                        className="h-[120px]"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col justify-center">
                                <div className="p-6 bg-green-500/10 rounded-2xl border border-green-500/20">
                                    <div className="text-[13px] text-green-500 mb-2 font-semibold">Your WhatsApp Link</div>

                                    <div className="mb-6 break-all text-[var(--foreground)] flex items-center gap-2">
                                        <Smartphone size={16} className="text-green-500 shrink-0" />
                                        <span className="text-sm">{link}</span>
                                    </div>

                                    <div className="flex gap-3">
                                        <LiquidButton
                                            variant="ghost"
                                            onClick={() => navigator.clipboard.writeText(link)}
                                            className="flex-1 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 hover:bg-green-500/10 whitespace-nowrap"
                                        >
                                            Copy Link
                                        </LiquidButton>
                                        <LiquidButton
                                            onClick={() => window.open(link, '_blank')}
                                            className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white border-none shadow-lg shadow-green-500/20 whitespace-nowrap"
                                        >
                                            Open Chat <ExternalLink size={16} className="ml-2" />
                                        </LiquidButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
