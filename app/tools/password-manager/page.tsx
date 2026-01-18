"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Key, Eye, EyeOff, Lock, Unlock, Copy, Search, LogOut, Save } from "lucide-react";
import Link from "next/link";

// --- Crypto Helpers ---
async function deriveKey(password: string) {
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
        "raw", enc.encode(password), { name: "PBKDF2" }, false, ["deriveKey"]
    );
    return window.crypto.subtle.deriveKey(
        { name: "PBKDF2", salt: enc.encode("salt-quickdevtools"), iterations: 100000, hash: "SHA-256" },
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

export default function PasswordManager() {
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
            setError("Incorrect password or corrupted data.");
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

    if (loading) return <div className="p-20 text-center text-white">Loading...</div>;

    if (!isUnlocked) {
        return (
            <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
                <div className="glass-card" style={{ maxWidth: 400, width: '100%', padding: 40, textAlign: 'center' }}>
                    <div style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: '#fb923c' }}>
                        {hasVault ? <Lock size={32} /> : <div style={{ fontSize: 32 }}>🆕</div>}
                    </div>

                    <h2 style={{ fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 8 }}>
                        {hasVault ? "Unlock Vault" : "Create New Vault"}
                    </h2>
                    <p style={{ color: '#9ca3af', marginBottom: 24 }}>
                        {hasVault ? "Enter your master password to access your accounts." : "Set a strong master password. It encrypts your data locally."}
                    </p>

                    <input
                        type="password"
                        value={passwordInput}
                        onChange={e => setPasswordInput(e.target.value)}
                        placeholder="Master Password"
                        onKeyDown={e => e.key === 'Enter' && handleUnlock()}
                        style={{ width: '100%', padding: 16, borderRadius: 12, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', marginBottom: 16 }}
                    />

                    {error && <div style={{ color: '#ef4444', marginBottom: 16, fontSize: 13 }}>{error}</div>}

                    <button onClick={handleUnlock} className="btn-primary" style={{ width: '100%', padding: 16 }}>
                        {hasVault ? "Unlock" : "Create Vault"}
                    </button>

                    <p style={{ marginTop: 24, fontSize: 12, color: '#6b7280' }}>
                        Data is stored in your browser using AES-GCM encryption. We cannot recover your password if lost.
                    </p>
                </div>
            </div>
        );
    }

    const filtered = accounts.filter(a => a.title.toLowerCase().includes(search.toLowerCase()) || a.username.toLowerCase().includes(search.toLowerCase()));

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>

            <div style={{ position: 'relative', zIndex: 10, paddingTop: 24, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 800, margin: '0 auto' }}>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                        <h1 style={{ fontSize: 28, fontWeight: 'bold', color: 'white' }}>My Passwords</h1>
                        <div style={{ display: 'flex', gap: 12 }}>
                            <button onClick={() => setViewMode("add")} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Plus size={18} /> Add New
                            </button>
                            <button onClick={() => window.location.reload()} className="btn-secondary" title="Lock">
                                <LogOut size={18} />
                            </button>
                        </div>
                    </div>

                    {viewMode === "list" && (
                        <>
                            <div style={{ marginBottom: 24, position: 'relative' }}>
                                <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                                <input
                                    value={search} onChange={e => setSearch(e.target.value)}
                                    placeholder="Search accounts..."
                                    style={{ width: '100%', padding: '12px 12px 12px 48px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white' }}
                                />
                            </div>

                            <div style={{ display: 'grid', gap: 16 }}>
                                {filtered.map(acc => (
                                    <div key={acc.id} className="glass-card" style={{ padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <div style={{ fontSize: 18, fontWeight: 600, color: 'white' }}>{acc.title}</div>
                                            <div style={{ color: '#9ca3af', fontSize: 13 }}>{acc.username}</div>
                                            {acc.url && <a href={acc.url} target="_blank" style={{ color: '#fb923c', fontSize: 12, textDecoration: 'none' }}>{acc.url}</a>}
                                        </div>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <button onClick={() => copyToClipboard(acc.password)} className="btn-secondary" style={{ padding: 10 }} title="Copy Password">
                                                <Copy size={16} />
                                            </button>
                                            <button onClick={() => deleteAccount(acc.id)} className="btn-secondary" style={{ padding: 10, color: '#ef4444' }} title="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {filtered.length === 0 && <div style={{ textAlign: 'center', padding: 40, color: '#6b7280' }}>No passwords found.</div>}
                            </div>
                        </>
                    )}

                    {viewMode === "add" && <AddForm onSave={addAccount} onCancel={() => setViewMode("list")} />}
                </div>
            </div>
        </div>
    );
}

function AddForm({ onSave, onCancel }: any) {
    const [form, setForm] = useState({ title: "", username: "", password: "", url: "" });
    const [showPass, setShowPass] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        onSave({ ...form, id: crypto.randomUUID(), updatedAt: Date.now() });
    };

    return (
        <div className="glass-card" style={{ padding: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 'bold', color: 'white', marginBottom: 24 }}>Add Account</h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 20 }}>
                <div>
                    <label style={{ display: 'block', color: '#9ca3af', marginBottom: 8, fontSize: 13 }}>Title / Website</label>
                    <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="input-field" style={{ width: '100%', padding: 12, borderRadius: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                </div>
                <div>
                    <label style={{ display: 'block', color: '#9ca3af', marginBottom: 8, fontSize: 13 }}>Username / Email</label>
                    <input required value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} className="input-field" style={{ width: '100%', padding: 12, borderRadius: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                </div>
                <div>
                    <label style={{ display: 'block', color: '#9ca3af', marginBottom: 8, fontSize: 13 }}>Password</label>
                    <div style={{ position: 'relative' }}>
                        <input required type={showPass ? "text" : "password"} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="input-field" style={{ width: '100%', padding: 12, borderRadius: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                        <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 12, top: 12, background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer' }}>
                            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>
                <div>
                    <label style={{ display: 'block', color: '#9ca3af', marginBottom: 8, fontSize: 13 }}>URL (Optional)</label>
                    <input value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} className="input-field" style={{ width: '100%', padding: 12, borderRadius: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }} />
                </div>

                <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
                    <button type="submit" className="btn-primary" style={{ padding: '12px 24px' }}>Save Account</button>
                    <button type="button" onClick={onCancel} className="btn-secondary" style={{ padding: '12px 24px' }}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

