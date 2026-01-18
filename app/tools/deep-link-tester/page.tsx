"use client";

import { useState, useEffect } from "react";
import { ExternalLink, QrCode, Save, Trash2, Plus, Play, History, Folder, Search } from "lucide-react";
import Link from "next/link";

interface DeepLink {
    id: string;
    label: string;
    uri: string;
    category: string;
    hits: number;
    lastUsed: number;
}

export default function DeepLinkTester() {
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
        } else {
            // Add to recent history? Maybe later.
        }

        // Try to open
        window.open(target, '_blank');
    };

    const handleSave = () => {
        if (!uri) return;
        const label = prompt("Enter a label for this link:");
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
        alert("Saved!");
    };

    const handleDelete = (id: string) => {
        if (!confirm("Delete this link?")) return;
        saveLinks(links.filter(l => l.id !== id));
    };

    const filteredLinks = links.filter(l => l.label.toLowerCase().includes(search.toLowerCase()) || l.uri.toLowerCase().includes(search.toLowerCase()));

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    {/* Tabs */}
                    <div style={{ display: 'flex', gap: 24, marginBottom: 32, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <button onClick={() => setActiveTab('test')} style={{ padding: '12px 0', background: 'transparent', border: 'none', color: activeTab === 'test' ? '#fb923c' : '#9ca3af', borderBottom: activeTab === 'test' ? '2px solid #fb923c' : 'none', cursor: 'pointer', fontWeight: 500 }}>
                            Test & Launch
                        </button>
                        <button onClick={() => setActiveTab('saved')} style={{ padding: '12px 0', background: 'transparent', border: 'none', color: activeTab === 'saved' ? '#fb923c' : '#9ca3af', borderBottom: activeTab === 'saved' ? '2px solid #fb923c' : 'none', cursor: 'pointer', fontWeight: 500 }}>
                            Saved Links ({links.length})
                        </button>
                    </div>

                    {activeTab === 'test' && (
                        <div className="glass-card" style={{ padding: 40 }}>
                            <h1 style={{ fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 24 }}>Test Deep Link</h1>

                            <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                                <input
                                    value={uri}
                                    onChange={e => setUri(e.target.value)}
                                    placeholder="myapp://handle?id=123"
                                    style={{ flex: 1, padding: 16, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: 16, fontFamily: 'monospace' }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                                <button onClick={() => handleTest()} disabled={!uri} className="btn-primary" style={{ padding: '12px 24px', flex: 1 }}>
                                    <Play size={18} style={{ marginRight: 8 }} /> Launch
                                </button>
                                <button onClick={handleSave} disabled={!uri} className="btn-secondary" style={{ padding: '12px 24px' }}>
                                    <Save size={18} style={{ marginRight: 8 }} /> Save
                                </button>
                                <button onClick={() => setShowQr(!showQr)} disabled={!uri} className="btn-secondary" style={{ padding: '12px 24px' }}>
                                    <QrCode size={18} style={{ marginRight: 8 }} /> QR Code
                                </button>
                            </div>

                            {showQr && uri && (
                                <div style={{ marginTop: 32, textAlign: 'center', padding: 24, background: 'white', borderRadius: 12 }}>
                                    <img src={toQrUrl(uri)} alt="QR Code" style={{ width: 200, height: 200 }} />
                                    <p style={{ color: 'black', marginTop: 12, fontSize: 14 }}>Scan with your mobile device to test</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'saved' && (
                        <div>
                            <div style={{ marginBottom: 24, position: 'relative' }}>
                                <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                <input
                                    value={search} onChange={e => setSearch(e.target.value)}
                                    placeholder="Search saved links..."
                                    style={{ width: '100%', padding: '12px 12px 12px 48px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white' }}
                                />
                            </div>

                            <div style={{ display: 'grid', gap: 16 }}>
                                {filteredLinks.map(link => (
                                    <div key={link.id} className="glass-card" style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ overflow: 'hidden' }}>
                                            <div style={{ fontSize: 18, fontWeight: 600, color: 'white', display: 'flex', alignItems: 'center', gap: 12 }}>
                                                {link.label}
                                                <span style={{ fontSize: 10, background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: 100, color: '#9ca3af' }}>{link.hits} opens</span>
                                            </div>
                                            <div style={{ color: '#fb923c', fontSize: 13, fontFamily: 'monospace', marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{link.uri}</div>
                                        </div>
                                        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                                            <button onClick={() => handleTest(link)} className="btn-primary" style={{ padding: '8px 16px', fontSize: 13 }}>
                                                Launch
                                            </button>
                                            <button onClick={() => handleDelete(link.id)} className="btn-secondary" style={{ padding: 10, color: '#ef4444' }}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {filteredLinks.length === 0 && <div style={{ textAlign: 'center', padding: 40, color: '#6b7280' }}>No saved links found.</div>}
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
