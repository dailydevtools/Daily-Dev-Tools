"use client";

import { useState } from "react";
import { Lock, Copy } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

export default function HtpasswdGeneratorClient() {
    const t = useTranslations('HtpasswdGenerator');
    const [user, setUser] = useState("admin");
    const [pass, setPass] = useState("");
    const [algo, setAlgo] = useState("sha1"); // Only secure-ish client side easy option without heavy libs
    const [output, setOutput] = useState("");

    const generate = async () => {
        if (!user || !pass) return;

        if (algo === "sha1") {
            const enc = new TextEncoder();
            const hash = await crypto.subtle.digest("SHA-1", enc.encode(pass));
            const base64 = btoa(String.fromCharCode(...new Uint8Array(hash)));
            setOutput(`${user}:{SHA}${base64}`);
        } else {
            // Placeholder for complex bcrypt/md5 which require heavy js libs
            setOutput(t('notSupported'));
        }
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[600px] mx-auto">

                    <ToolPageHeader
                        title="Htpasswd Generator"
                        description="Generate Basic Auth entries for .htpasswd files (Nginx / Apache)."
                        icon={<Lock size={28} className="text-[#fb923c]" />}
                    />

                    <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 p-10">
                        <div className="mb-6">
                            <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('username')}</label>
                            <input
                                type="text" value={user} onChange={e => setUser(e.target.value)}
                                className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('password')}</label>
                            <input
                                type="password" value={pass} onChange={e => setPass(e.target.value)}
                                className="input-field w-full p-3 rounded-xl bg-black/30 border border-white/10 text-white"
                            />
                        </div>

                        <div className="mb-8">
                            <label className="block mb-2 text-[#9ca3af] text-[13px]">{t('algorithm')}</label>
                            <select value={algo} onChange={e => setAlgo(e.target.value)} className="w-full p-3 rounded-xl bg-[#111] border border-[#333] text-white">
                                <option value="sha1">{t('sha1')}</option>
                            </select>
                        </div>

                        <button onClick={generate} className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#f97316] to-[#ea580c] text-white font-semibold text-sm px-6 py-3 rounded-[10px] border-none cursor-pointer transition-all duration-300 no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.3)] w-full p-4 mb-8">
                            {t('generate')}
                        </button>

                        {output && (
                            <div className="p-5 bg-white/5 rounded-xl relative">
                                <div className="text-[13px] text-[#9ca3af] mb-2">{t('result')}</div>
                                <div className="font-mono text-[#fb923c] text-base break-all">{output}</div>
                                <button onClick={() => navigator.clipboard.writeText(output)} className="absolute top-4 right-4 bg-transparent border-none text-[#9ca3af] cursor-pointer">
                                    <Copy size={16} />
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </main>
    );
}
