"use client";

import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

interface JsonEditorProps {
    value: string;
    onChange?: (value: string | undefined) => void;
    readOnly?: boolean;
    height?: string;
    className?: string;
}

export default function JsonEditor({
    value,
    onChange,
    readOnly = false,
    height = "100%",
    className = "",
}: JsonEditorProps) {
    const [mounted, setMounted] = useState(false);
    const [editorTheme, setEditorTheme] = useState<"vs-dark" | "light">("vs-dark");

    useEffect(() => {
        setMounted(true);
        const isDark = document.documentElement.classList.contains('dark');
        setEditorTheme(isDark ? "vs-dark" : "light");

        // Listen for theme changes
        const observer = new MutationObserver(() => {
            const isDark = document.documentElement.classList.contains('dark');
            setEditorTheme(isDark ? "vs-dark" : "light");
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    if (!mounted) {
        return <div className={`w-full h-full bg-neutral-100 dark:bg-[#1e1e1e] ${className}`} style={{ height }} />;
    }

    return (
        <Editor
            key={editorTheme}
            height={height}
            defaultLanguage="json"
            language="json"
            theme={editorTheme}
            value={value}
            onChange={onChange}
            options={{
                readOnly,
                domReadOnly: readOnly,
                minimap: { enabled: false },
                fontSize: 13,
                wordWrap: 'on',
                padding: { top: 16, bottom: 16 },
                formatOnPaste: true,
            }}
        />
    );
}
