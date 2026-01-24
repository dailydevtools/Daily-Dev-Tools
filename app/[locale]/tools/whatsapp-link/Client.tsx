"use client";

import { useState } from "react";
import { MessageCircle, ExternalLink, Smartphone } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

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

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div>
                                <div className="mb-6">
                                    <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('phone')}</label>
                                    <input
                                        type="text" value={phone} onChange={e => setPhone(e.target.value)}
                                        placeholder="e.g. 15551234567"
                                        className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
                                    />
                                    <div className="text-xs text-[#6b7280] mt-2">{t('hint')}</div>
                                </div>
                                <div>
                                    <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('message')}</label>
                                    <textarea
                                        value={message} onChange={e => setMessage(e.target.value)}
                                        placeholder="Hello, I'm interested..."
                                        className="input-field w-full h-[120px] p-3 rounded-xl bg-black/30 border border-white/10 text-white resize-y"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col justify-center">
                                <div className="p-6 bg-[#22c55e]/10 rounded-2xl border border-[#22c55e]/20">
                                    <div className="text-[13px] text-[#22c55e] mb-2 font-semibold">{t('yourLink')}</div>

                                    <div className="mb-6 break-all text-white flex items-center gap-2">
                                        <Smartphone size={16} color="#22c55e" />
                                        {link}
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => navigator.clipboard.writeText(link)}
                                            className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] flex-1 justify-center"
                                        >
                                            {t('copy')}
                                        </button>
                                        <a
                                            href={link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] flex-1 flex items-center justify-center gap-2 no-underline"
                                        >
                                            {t('open')} <ExternalLink size={16} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
