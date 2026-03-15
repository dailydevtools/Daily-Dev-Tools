"use client";

import { useState, useRef } from "react";
import { GitCompare } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";

import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";
import CodeDiffEditor from "../../../components/CodeDiffEditor";

export default function JsonDiffClient() {
    const t = useTranslations('ToolPage');
    const tTools = useTranslations('Tools');
    const diffEditorRef = useRef<any>(null);
    const [error, setError] = useState("");

    const handleEditorMount = (editor: any, monaco: any) => {
        diffEditorRef.current = editor;
    };

    const computeDiff = () => {
        try {
            if (!diffEditorRef.current) return;
            const originalModel = diffEditorRef.current.getModel().original;
            const modifiedModel = diffEditorRef.current.getModel().modified;

            const originalVal = originalModel.getValue();
            const modifiedVal = modifiedModel.getValue();

            if (!originalVal && !modifiedVal) {
                return;
            }

            const lVal = originalVal ? JSON.stringify(JSON.parse(originalVal), null, 2) : "";
            const rVal = modifiedVal ? JSON.stringify(JSON.parse(modifiedVal), null, 2) : "";

            originalModel.setValue(lVal);
            modifiedModel.setValue(rVal);
            setError("");
        } catch (e: any) {
            setError(t('common.error') + ": " + e.message);
        }
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <ToolPageHeader
                        title={tTools('json-diff.name')}
                        description={tTools('json-diff.description')}
                        icon={<GitCompare size={28} className="text-[#fb923c]" />}
                    />

                    <LiquidCard className="p-0 overflow-hidden flex flex-col group focus-within:ring-2 ring-orange-500/20 transition-all mb-8 h-[600px] w-full">
                        <div className="py-3 px-5 flex border-b border-[var(--border-color)] bg-neutral-100/50 dark:bg-white/5 text-[var(--muted-text)] text-xs font-medium uppercase tracking-wider">
                            <div className="w-1/2 pr-4">{t('JsonDiff.original')}</div>
                            <div className="w-1/2 pl-4 border-l border-[var(--border-color)]">{t('JsonDiff.modified')}</div>
                        </div>
                        <div className="flex-1 w-full h-full relative">
                            <CodeDiffEditor
                                language="json"
                                onMount={handleEditorMount}
                                className="border-none !bg-transparent rounded-none rounded-b-xl"
                            />
                        </div>
                    </LiquidCard>

                    <div className="text-center mb-8">
                        <LiquidButton onClick={computeDiff} className="px-12 py-4 text-base">
                            <GitCompare size={20} className="mr-2" />
                            {t('JsonDiff.compare')}
                        </LiquidButton>
                    </div>

                    {error && (
                        <div className="text-center text-red-500 mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl animate-in fade-in slide-in-from-top-2">
                            {error}
                        </div>
                    )}

                </div>
            </div>
        </main>
    );
}
