"use client";

import { useState } from "react";
import { Lock, Copy } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";
import { LiquidInput, LiquidSelect } from "../../../components/ui/LiquidInput";

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

                    <LiquidCard className="p-10">
                        <div className="mb-6">
                            <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('username')}</label>
                            <LiquidInput
                                type="text" value={user} onChange={e => setUser(e.target.value)}
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('password')}</label>
                            <LiquidInput
                                type="password" value={pass} onChange={e => setPass(e.target.value)}
                            />
                        </div>

                        <div className="mb-8">
                            <label className="block mb-2 text-[var(--muted-text)] text-sm font-medium">{t('algorithm')}</label>
                            <LiquidSelect value={algo} onChange={e => setAlgo(e.target.value)}>
                                <option value="sha1">{t('sha1')}</option>
                            </LiquidSelect>
                        </div>

                        <LiquidButton onClick={generate} className="w-full mb-8 py-3">
                            {t('generate')}
                        </LiquidButton>

                        {output && (
                            <div className="p-5 bg-neutral-100 dark:bg-white/5 rounded-xl relative border border-neutral-200 dark:border-white/5 animate-in fade-in slide-in-from-top-2">
                                <div className="text-xs text-[var(--muted-text)] mb-2 font-medium uppercase tracking-wider">{t('result')}</div>
                                <div className="font-mono text-orange-500 text-sm break-all pr-8">{output}</div>
                                <LiquidButton
                                    variant="ghost"
                                    onClick={() => navigator.clipboard.writeText(output)}
                                    className="absolute top-2 right-2 h-8 w-8 p-0"
                                >
                                    <Copy size={16} />
                                </LiquidButton>
                            </div>
                        )}
                    </LiquidCard>

                </div>
            </div>
        </main>
    );
}
