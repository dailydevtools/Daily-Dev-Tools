"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Key, Eye, EyeOff, Lock, Copy, Search, LogOut } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

// --- Crypto Helpers ---
async function deriveKey(password: string) {
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
        "raw", enc.encode(password), { name: "PBKDF2" }, false, ["deriveKey"]
    );
    return window.crypto.subtle.deriveKey(
        { name: "PBKDF2", salt: enc.encode("salt-dailydevtools"), iterations: 100000, hash: "SHA-256" },
        keyMaterial, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]
    );
}

async function encrypt(text: string, key: CryptoKey) {
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(text);
    const encrypted = await window.crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoded);

    // Combine IV + Encrypted Data -> Base64
    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encrypted), iv.length);
    return btoa(String.fromCharCode(...Array.from(combined)));
}

async function decrypt(cipherText: string, key: CryptoKey) {
    try {
        const combined = Uint8Array.from(atob(cipherText), c => c.charCodeAt(0));
        const iv = combined.slice(0, 12);
        const data = combined.slice(12);
        const decrypted = await window.crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, data);
        return new TextDecoder().decode(decrypted);
    } catch (e) {
        throw new Error("Invalid password");
    }
}

// --- Types ---
interface Account {
    id: string;
    title: string;
    username: string;
    password: string;
    url?: string;
    updatedAt: number;
}

export default function PasswordManagerClient() {
    const t = useTranslations('PasswordManager');
    const [masterKey, setMasterKey] = useState<CryptoKey | null>(null);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [hasVault, setHasVault] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const [accounts, setAccounts] = useState<Account[]>([]);
    const [search, setSearch] = useState("");
    const [viewMode, setViewMode] = useState<"list" | "add">("list");

    // Load initial state
    useEffect(() => {
        const data = localStorage.getItem("qdt_vault_data");
        if (data) setHasVault(true);
        setLoading(false);
    }, []);

    const handleUnlock = async () => {
        setError("");
        setLoading(true);
        try {
            const key = await deriveKey(passwordInput);
            const data = localStorage.getItem("qdt_vault_data");

            let acts: Account[] = [];
            if (data) {
                const json = await decrypt(data, key);
                acts = JSON.parse(json);
            } else {
                // New vault
                await saveVault([], key);
            }

            setMasterKey(key);
            setAccounts(acts);
            setIsUnlocked(true);
            setHasVault(true);
        } catch (err) {
            setError(t('incorrectPassword'));
            if (!hasVault) {
                // Creating new
                const key = await deriveKey(passwordInput);
                setMasterKey(key);
                setAccounts([]);
                setIsUnlocked(true);
                setHasVault(true);
                await saveVault([], key);
            }
        }
        setLoading(false);
    };

    const saveVault = async (newAccounts: Account[], key: CryptoKey) => {
        const json = JSON.stringify(newAccounts);
        const encrypted = await encrypt(json, key);
        localStorage.setItem("qdt_vault_data", encrypted);
    };

    const addAccount = (act: Account) => {
        if (!masterKey) return;
        const updated = [...accounts, act];
        setAccounts(updated);
        saveVault(updated, masterKey);
        setViewMode("list");
    };

    const deleteAccount = (id: string) => {
        if (!masterKey) return;
        if (!confirm("Are you sure?")) return;
        const updated = accounts.filter(a => a.id !== id);
        setAccounts(updated);
        saveVault(updated, masterKey);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Could show toast
    };

    // --- Views ---

    if (loading) return <div className="p-20 text-center text-white">{t('loading')}</div>;

    if (!isUnlocked) {
        return (
            <main className="relative min-h-screen pt-6 px-6">
                <ToolPageHeader
                    title={t('title')}
                    description={t('desc')}
                    icon={<Key size={28} className="text-[#fb923c]" />}
                />
                <div className="flex items-center justify-center p-6">
                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 w-full max-w-[400px] p-10 text-center">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-[#fb923c]">
                            {hasVault ? <Lock size={32} /> : <div className="text-[32px]">🆕</div>}
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-2">
                            {hasVault ? t('unlock') : t('create')}
                        </h2>
                        <p className="text-[#9ca3af] mb-6">
                            {hasVault ? t('unlockDesc') : t('createDesc')}
                        </p>

                        <input
                            type="password"
                            value={passwordInput}
                            onChange={e => setPasswordInput(e.target.value)}
                            placeholder={t('masterPassword')}
                            onKeyDown={e => e.key === 'Enter' && handleUnlock()}
                            className="w-full p-4 rounded-xl bg-black/30 border border-white/10 text-white mb-4 outline-none focus:border-[#fb923c]/50 transition-colors"
                        />

                        {error && <div className="text-[#ef4444] mb-4 text-[13px]">{error}</div>}

                        <button onClick={handleUnlock} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] w-full p-4">
                            {hasVault ? t('unlockBtn') : t('createBtn')}
                        </button>

                        <p className="mt-6 text-xs text-[#6b7280]">
                            {t('note')}
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    const filtered = accounts.filter(a => a.title.toLowerCase().includes(search.toLowerCase()) || a.username.toLowerCase().includes(search.toLowerCase()));

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">

                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-[28px] font-bold text-white">{t('myPasswords')}</h1>
                        <div className="flex gap-3">
                            <button onClick={() => setViewMode("add")} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] flex items-center gap-2">
                                <Plus size={18} /> {t('addNew')}
                            </button>
                            <button onClick={() => window.location.reload()} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)]" title="Lock">
                                <LogOut size={18} />
                            </button>
                        </div>
                    </div>

                    {viewMode === "list" && (
                        <>
                            <div className="mb-6 relative">
                                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
                                <input
                                    value={search} onChange={e => setSearch(e.target.value)}
                                    placeholder={t('search')}
                                    className="w-full py-3 pr-3 pl-12 rounded-xl bg-white/5 border-none text-white outline-none focus:bg-white/10 transition-colors"
                                />
                            </div>

                            <div className="grid gap-4">
                                {filtered.map(acc => (
                                    <div key={acc.id} className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-5 flex justify-between items-center">
                                        <div>
                                            <div className="text-lg font-semibold text-white">{acc.title}</div>
                                            <div className="text-[#9ca3af] text-[13px]">{acc.username}</div>
                                            {acc.url && <a href={acc.url} target="_blank" className="text-[#fb923c] text-xs no-underline hover:underline">{acc.url}</a>}
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => copyToClipboard(acc.password)} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] p-2.5" title="Copy Password">
                                                <Copy size={16} />
                                            </button>
                                            <button onClick={() => deleteAccount(acc.id)} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] p-2.5 text-[#ef4444]" title="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {filtered.length === 0 && <div className="text-center p-10 text-[#6b7280]">{t('noPasswords')}</div>}
                            </div>
                        </>
                    )}

                    {viewMode === "add" && <AddForm onSave={addAccount} onCancel={() => setViewMode("list")} t={t} />}
                </div>
            </div>
        </main>
    );
}

function AddForm({ onSave, onCancel, t }: any) {
    const [form, setForm] = useState({ title: "", username: "", password: "", url: "" });
    const [showPass, setShowPass] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        onSave({ ...form, id: crypto.randomUUID(), updatedAt: Date.now() });
    };

    return (
        <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-8">
            <h2 className="text-xl font-bold text-white mb-6">{t('addAccount')}</h2>
            <form onSubmit={handleSubmit} className="grid gap-5">
                <div>
                    <label className="block text-[#9ca3af] mb-2 text-[13px]">{t('accountTitle')}</label>
                    <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="input-field w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white" />
                </div>
                <div>
                    <label className="block text-[#9ca3af] mb-2 text-[13px]">{t('username')}</label>
                    <input required value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} className="input-field w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white" />
                </div>
                <div>
                    <label className="block text-[#9ca3af] mb-2 text-[13px]">{t('password')}</label>
                    <div className="relative">
                        <input required type={showPass ? "text" : "password"} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="input-field w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white" />
                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3 bg-transparent border-none text-[#9ca3af] cursor-pointer">
                            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>
                <div>
                    <label className="block text-[#9ca3af] mb-2 text-[13px]">{t('url')}</label>
                    <input value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} className="input-field w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white" />
                </div>

                <div className="flex gap-4 mt-4">
                    <button type="submit" className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] py-3 px-6">{t('save')}</button>
                    <button type="button" onClick={onCancel} className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--muted-text)] font-medium text-sm px-6 py-3 rounded-[10px] border border-[var(--border-color)] cursor-pointer transition-all duration-300 no-underline hover:bg-[var(--card-hover-bg)] hover:border-[var(--orange-400)] hover:text-[var(--title-color)] py-3 px-6">{t('cancel')}</button>
                </div>
            </form>
        </div>
    );
}
