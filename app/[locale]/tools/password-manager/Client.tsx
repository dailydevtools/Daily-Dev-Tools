"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Key, Eye, EyeOff, Lock, Copy, Search, LogOut } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";
import { useConfirmDialog } from "../../../components/ui/ConfirmDialog";

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

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidInput } from "../../../components/ui/LiquidInput";
import { LiquidButton } from "../../../components/ui/LiquidButton";
import CreditCard from "../../../components/CreditCard";

// ... (keep helper functions deriveKey, encrypt, decrypt, and Account interface)

export default function PasswordManagerClient() {
    // ... (keep state and hooks: t, masterKey, isUnlocked, hasVault, passwordInput, error, loading, accounts, search, viewMode)
    const t = useTranslations('PasswordManager');
    const { confirm } = useConfirmDialog();
    const [masterKey, setMasterKey] = useState<CryptoKey | null>(null);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [hasVault, setHasVault] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const [accounts, setAccounts] = useState<Account[]>([]);
    const [search, setSearch] = useState("");
    const [viewMode, setViewMode] = useState<"list" | "add">("list");

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
                await saveVault([], key);
            }

            setMasterKey(key);
            setAccounts(acts);
            setIsUnlocked(true);
            setHasVault(true);
        } catch (err) {
            setError(t('incorrectPassword'));
            if (!hasVault) {
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

    const deleteAccount = async (id: string) => {
        if (!masterKey) return;
        if (!await confirm({
            title: t('deleteAccount') || "Delete Account",
            description: t('deleteAccountConfirm') || "Are you sure you want to delete this account?",
            variant: "danger",
            confirmText: t('delete') || "Delete",
            cancelText: t('cancel') || "Cancel"
        })) return;
        const updated = accounts.filter(a => a.id !== id);
        setAccounts(updated);
        saveVault(updated, masterKey);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Could show toast
    };


    if (loading) return <div className="p-20 text-center text-[var(--muted-text)]">{t('loading')}</div>;

    if (!isUnlocked) {
        return (
            <main className="relative min-h-screen pt-6 px-6">
                <ToolPageHeader
                    title={t('title')}
                    description={t('desc')}
                    icon={<Key size={28} className="text-[#fb923c]" />}
                />
                <div className="flex items-center justify-center p-6">
                    <LiquidCard className="w-full max-w-[400px] p-10 text-center">
                        <div className="w-16 h-16 bg-neutral-100/50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-500">
                            {hasVault ? <Lock size={32} /> : <div className="text-[32px]">🆕</div>}
                        </div>

                        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">
                            {hasVault ? t('unlock') : t('create')}
                        </h2>
                        <p className="text-[var(--muted-text)] mb-6">
                            {hasVault ? t('unlockDesc') : t('createDesc')}
                        </p>

                        <LiquidInput
                            type="password"
                            value={passwordInput}
                            onChange={e => setPasswordInput(e.target.value)}
                            placeholder={t('masterPassword')}
                            onKeyDown={e => e.key === 'Enter' && handleUnlock()}
                            className="mb-4"
                        />

                        {error && <div className="text-red-500 mb-4 text-[13px]">{error}</div>}

                        <LiquidButton onClick={handleUnlock} className="w-full justify-center">
                            {hasVault ? t('unlockBtn') : t('createBtn')}
                        </LiquidButton>

                        <p className="mt-6 text-xs text-[var(--muted-text)]">
                            {t('note')}
                        </p>
                    </LiquidCard>
                </div>

                <CreditCard
                    name="Yogesh Choudhary Paliyal"
                    linkedin="https://www.linkedin.com/in/yogeshpaliyal/"
                    github="https://github.com/yogeshpaliyal/KeyPass"
                    appName="KeyPass"
                    appUrl="https://play.google.com/store/apps/details?id=com.yogeshpaliyal.keypass"
                />
            </main>
        );
    }

    const filtered = accounts.filter(a => a.title.toLowerCase().includes(search.toLowerCase()) || a.username.toLowerCase().includes(search.toLowerCase()));

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[800px] mx-auto">

                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-[28px] font-bold text-[var(--foreground)]">{t('myPasswords')}</h1>
                        <div className="flex gap-3">
                            <LiquidButton onClick={() => setViewMode("add")} className="gap-2">
                                <Plus size={18} /> {t('addNew')}
                            </LiquidButton>
                            <LiquidButton onClick={() => window.location.reload()} variant="ghost" className="text-[var(--muted-text)] hover:text-red-500" title="Lock">
                                <LogOut size={18} />
                            </LiquidButton>
                        </div>
                    </div>

                    {viewMode === "list" && (
                        <>
                            <div className="mb-6 relative">
                                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted-text)] z-10" />
                                <LiquidInput
                                    value={search} onChange={e => setSearch(e.target.value)}
                                    placeholder={t('search')}
                                    className="pl-12"
                                />
                            </div>

                            <div className="grid gap-4">
                                {filtered.map(acc => (
                                    <LiquidCard key={acc.id} className="p-5 flex justify-between items-center">
                                        <div>
                                            <div className="text-lg font-semibold text-[var(--foreground)]">{acc.title}</div>
                                            <div className="text-[var(--muted-text)] text-[13px]">{acc.username}</div>
                                            {acc.url && <a href={acc.url} target="_blank" className="text-orange-500 text-xs no-underline hover:underline">{acc.url}</a>}
                                        </div>
                                        <div className="flex gap-2">
                                            <LiquidButton onClick={() => copyToClipboard(acc.password)} variant="ghost" className="p-2.5 text-[var(--muted-text)] hover:text-[var(--foreground)]" title="Copy Password">
                                                <Copy size={16} />
                                            </LiquidButton>
                                            <LiquidButton onClick={() => deleteAccount(acc.id)} variant="ghost" className="p-2.5 text-[var(--muted-text)] hover:text-red-500" title="Delete">
                                                <Trash2 size={16} />
                                            </LiquidButton>
                                        </div>
                                    </LiquidCard>
                                ))}
                                {filtered.length === 0 && <div className="text-center p-10 text-[var(--muted-text)]">{t('noPasswords')}</div>}
                            </div>
                        </>
                    )}

                    {viewMode === "add" && <AddForm onSave={addAccount} onCancel={() => setViewMode("list")} t={t} />}

                    <CreditCard
                        name="Yogesh Choudhary Paliyal"
                        linkedin="https://www.linkedin.com/in/yogeshpaliyal/"
                        github="https://github.com/yogeshpaliyal/KeyPass"
                        appName="KeyPass"
                        appUrl="https://play.google.com/store/apps/details?id=com.yogeshpaliyal.keypass"
                    />
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
        <LiquidCard className="p-8">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">{t('addAccount')}</h2>
            <form onSubmit={handleSubmit} className="grid gap-5">
                <div>
                    <label className="block text-[var(--muted-text)] mb-2 text-[13px]">{t('accountTitle')}</label>
                    <LiquidInput required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                </div>
                <div>
                    <label className="block text-[var(--muted-text)] mb-2 text-[13px]">{t('username')}</label>
                    <LiquidInput required value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
                </div>
                <div>
                    <label className="block text-[var(--muted-text)] mb-2 text-[13px]">{t('password')}</label>
                    <div className="relative">
                        <LiquidInput required type={showPass ? "text" : "password"} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="pr-10" />
                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none text-[var(--muted-text)] cursor-pointer hover:text-[var(--foreground)]">
                            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>
                <div>
                    <label className="block text-[var(--muted-text)] mb-2 text-[13px]">{t('url')}</label>
                    <LiquidInput value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} />
                </div>

                <div className="flex gap-4 mt-4">
                    <LiquidButton type="submit" className="px-6 py-3">{t('save')}</LiquidButton>
                    <LiquidButton type="button" onClick={onCancel} variant="ghost" className="px-6 py-3 border border-[var(--border-color)]">{t('cancel')}</LiquidButton>
                </div>
            </form>
        </LiquidCard>
    );
}
