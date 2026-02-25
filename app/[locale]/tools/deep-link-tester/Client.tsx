"use client";

import { useState, useEffect } from "react";
import { QrCode, Save, Trash2, Play, Search, Link as LinkIcon } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";
import LiquidTabs from "../../../components/ui/LiquidTabs";
import { useConfirmDialog } from "../../../components/ui/ConfirmDialog";
import { LiquidInput } from "../../../components/ui/LiquidInput";
import { LiquidButton } from "../../../components/ui/LiquidButton";

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
    const { confirm, alert } = useConfirmDialog();
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

    const handleSave = async () => {
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
        await alert({
            title: t('DeepLinkTester.savedTitle') || "Saved",
            description: t('DeepLinkTester.saved'),
            variant: "success",
            confirmText: "OK"
        });
    };

    const handleDelete = async (id: string) => {
        if (!await confirm({
            title: t('DeepLinkTester.deleteLink') || "Delete Link",
            description: t('DeepLinkTester.confirmDelete'),
            variant: "danger",
            confirmText: "Delete",
            cancelText: "Cancel"
        })) return;
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
                    <div className="mb-8">
                        <LiquidTabs
                            tabs={['test', 'saved']}
                            activeTab={activeTab}
                            onChange={(tab) => setActiveTab(tab as typeof activeTab)}
                            labels={{
                                test: "Test & Launch",
                                saved: `${t('DeepLinkTester.savedLinks')} (${links.length})` // Dynamic label support might be limited in LiquidTabs props interface if checked strictly, seeing previous usage it accepts string map.
                            }}
                        />
                    </div>

                    {activeTab === 'test' && (
                        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10">
                            <h1 className="text-2xl font-bold text-[var(--foreground)] mb-6">{t('DeepLinkTester.testLink')}</h1>

                            <div className="flex gap-4 mb-6">
                                <LiquidInput
                                    value={uri}
                                    onChange={e => setUri(e.target.value)}
                                    placeholder={t('DeepLinkTester.linkPlaceholder')}
                                    className="dark:bg-black/30 text-base"
                                />
                            </div>

                            <div className="flex gap-4 flex-wrap">
                                <LiquidButton onClick={() => handleTest()} disabled={!uri} className="flex-1">
                                    <Play size={18} /> {t('DeepLinkTester.launch')}
                                </LiquidButton>
                                <LiquidButton onClick={handleSave} disabled={!uri} variant="secondary">
                                    <Save size={18} /> {t('DeepLinkTester.save')}
                                </LiquidButton>
                                <LiquidButton onClick={() => setShowQr(!showQr)} disabled={!uri} variant="ghost">
                                    <QrCode size={18} /> QR Code
                                </LiquidButton>
                            </div>

                            {showQr && uri && (
                                <div className="mt-8 text-center p-6 bg-white rounded-xl border border-neutral-200">
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
                                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-text)] z-10" />
                                <LiquidInput
                                    value={search} onChange={e => setSearch(e.target.value)}
                                    placeholder={t('DeepLinkTester.searchPlaceholder')}
                                    className="w-full pl-12"
                                />
                            </div>

                            <div className="grid gap-4">
                                {filteredLinks.map(link => (
                                    <div key={link.id} className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-5 flex justify-between items-center">
                                        <div className="overflow-hidden">
                                            <div className="text-lg font-semibold text-[var(--foreground)] flex items-center gap-3">
                                                {link.label}
                                                <span className="text-[10px] bg-neutral-100 dark:bg-white/10 px-2 py-0.5 rounded-full text-[var(--muted-text)]">{link.hits} {t('DeepLinkTester.opens')}</span>
                                            </div>
                                            <div className="text-[#fb923c] text-[13px] font-mono mt-1 whitespace-nowrap overflow-hidden text-ellipsis">{link.uri}</div>
                                        </div>
                                        <div className="flex gap-2 shrink-0">
                                            <LiquidButton onClick={() => handleTest(link)} className="py-2 px-4 text-xs h-auto">
                                                {t('DeepLinkTester.launch')}
                                            </LiquidButton>
                                            <LiquidButton onClick={() => handleDelete(link.id)} variant="ghost" className="p-2.5 text-[#ef4444] hover:text-[#dc2626] hover:bg-red-50 dark:hover:bg-red-900/10 hover:border-red-200 h-auto">
                                                <Trash2 size={16} />
                                            </LiquidButton>
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
