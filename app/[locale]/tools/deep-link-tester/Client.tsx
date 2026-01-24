"use client";

import { useState, useEffect } from "react";
import { QrCode, Save, Trash2, Play, Search, Link as LinkIcon } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

interface DeepLink {
    id: string;
    label: string;
    uri: string;
    category: string;
    hits: number;
    lastUsed: number;
}

export default function DeepLinkTesterClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const [uri, setUri] = useState("");
    const [links, setLinks] = useState<DeepLink[]>([]);
    const [activeTab, setActiveTab] = useState<"test" | "saved">("test");
    const [showQr, setShowQr] = useState(false);
    const [search, setSearch] = useState("");

    // Load links
    useEffect(() => {
        const saved = localStorage.getItem("qdt_deeplinks");
        if (saved) setLinks(JSON.parse(saved));
    }, []);

    const saveLinks = (newLinks: DeepLink[]) => {
        setLinks(newLinks);
        localStorage.setItem("qdt_deeplinks", JSON.stringify(newLinks));
    };

    const toQrUrl = (text: string) => {
        return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
    };

    const handleTest = (item?: DeepLink) => {
        const target = item ? item.uri : uri;
        if (!target) return;

        // Update hits
        if (item) {
            const updated = links.map(l => l.id === item.id ? { ...l, hits: l.hits + 1, lastUsed: Date.now() } : l);
            saveLinks(updated);
        }

        // Try to open
        window.open(target, '_blank');
    };

    const handleSave = () => {
        if (!uri) return;
        const label = prompt(t('DeepLinkTester.enterLabel'));
        if (!label) return;

        const newLink: DeepLink = {
            id: crypto.randomUUID(),
            label,
            uri,
            category: "General",
            hits: 0,
            lastUsed: Date.now()
        };
        saveLinks([newLink, ...links]);
        alert(t('DeepLinkTester.saved'));
    };

    const handleDelete = (id: string) => {
        if (!confirm(t('DeepLinkTester.confirmDelete'))) return;
        saveLinks(links.filter(l => l.id !== id));
    };

    const filteredLinks = links.filter(l => l.label.toLowerCase().includes(search.toLowerCase()) || l.uri.toLowerCase().includes(search.toLowerCase()));

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">

                    <ToolPageHeader
                        title={tTools('deep-link-tester.name')}
                        description={tTools('deep-link-tester.description')}
                        icon={<LinkIcon size={28} className="text-[#fb923c]" />}
                    />

                    {/* Tabs */}
                    <div className="flex gap-6 mb-8 border-b border-white/10">
                        <button
                            onClick={() => setActiveTab('test')}
                            className={`py-3 bg-transparent border-none cursor-pointer font-medium border-b-2 transition-colors duration-200 ${activeTab === 'test' ? 'border-[#fb923c] text-[#fb923c]' : 'border-transparent text-[#9ca3af]'}`}
                        >
                            Test & Launch
                        </button>
                        <button
                            onClick={() => setActiveTab('saved')}
                            className={`py-3 bg-transparent border-none cursor-pointer font-medium border-b-2 transition-colors duration-200 ${activeTab === 'saved' ? 'border-[#fb923c] text-[#fb923c]' : 'border-transparent text-[#9ca3af]'}`}
                        >
                            {t('DeepLinkTester.savedLinks')} ({links.length})
                        </button>
                    </div>

                    {activeTab === 'test' && (
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10">
                            <h1 className="text-2xl font-bold text-white mb-6">{t('DeepLinkTester.testLink')}</h1>

                            <div className="flex gap-4 mb-6">
                                <input
                                    value={uri}
                                    onChange={e => setUri(e.target.value)}
                                    placeholder={t('DeepLinkTester.linkPlaceholder')}
                                    className="flex-1 p-4 rounded-xl bg-black/30 border border-white/10 text-white text-base font-mono"
                                />
                            </div>

                            <div className="flex gap-4 flex-wrap">
                                <button onClick={() => handleTest()} disabled={!uri} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] flex-1 py-3 px-6 flex items-center justify-center gap-2">
                                    <Play size={18} /> {t('DeepLinkTester.launch')}
                                </button>
                                <button onClick={handleSave} disabled={!uri} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] py-3 px-6 flex items-center gap-2">
                                    <Save size={18} /> {t('DeepLinkTester.save')}
                                </button>
                                <button onClick={() => setShowQr(!showQr)} disabled={!uri} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] py-3 px-6 flex items-center gap-2">
                                    <QrCode size={18} /> QR Code
                                </button>
                            </div>

                            {showQr && uri && (
                                <div className="mt-8 text-center p-6 bg-white rounded-xl">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={toQrUrl(uri)} alt="QR Code" className="w-[200px] h-[200px] mx-auto" />
                                    <p className="text-black mt-3 text-sm">{t('DeepLinkTester.scanQr')}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'saved' && (
                        <div>
                            <div className="mb-6 relative">
                                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
                                <input
                                    value={search} onChange={e => setSearch(e.target.value)}
                                    placeholder={t('DeepLinkTester.searchPlaceholder')}
                                    className="w-full p-3 pl-12 rounded-xl bg-white/5 border-none text-white"
                                />
                            </div>

                            <div className="grid gap-4">
                                {filteredLinks.map(link => (
                                    <div key={link.id} className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-5 flex justify-between items-center">
                                        <div className="overflow-hidden">
                                            <div className="text-lg font-semibold text-white flex items-center gap-3">
                                                {link.label}
                                                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-[#9ca3af]">{link.hits} {t('DeepLinkTester.opens')}</span>
                                            </div>
                                            <div className="text-[#fb923c] text-[13px] font-mono mt-1 whitespace-nowrap overflow-hidden text-ellipsis">{link.uri}</div>
                                        </div>
                                        <div className="flex gap-2 shrink-0">
                                            <button onClick={() => handleTest(link)} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] py-2 px-4 text-[13px]">
                                                {t('DeepLinkTester.launch')}
                                            </button>
                                            <button onClick={() => handleDelete(link.id)} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] p-2.5 text-[#ef4444]">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {filteredLinks.length === 0 && <div className="text-center p-10 text-[#6b7280]">{t('DeepLinkTester.noSavedLinks')}</div>}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </main>
    );
}
