"use client";

import React from "react";
import Editor, { OnMount, OnChange } from "@monaco-editor/react";
import { useTheme } from "next-themes";

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
    const { theme } = useTheme();

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        // Configure editor settings if needed
        editor.updateOptions({
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 13,
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
            formatOnPaste: true,
            scrollbar: {
                vertical: 'visible',
                horizontal: 'visible',
                verticalScrollbarSize: 10,
                horizontalScrollbarSize: 10,
            },
            padding: { top: 16, bottom: 16 },
        });

        // Add custom keybindings or actions here
    };

    const handleEditorChange: OnChange = (newValue) => {
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <div className={`rounded-xl overflow-hidden border border-[var(--border-color)] bg-neutral-100/50 dark:bg-[#1e1e1e] ${className}`} style={{ height }}>
            <Editor
                height="100%"
                language="json"
                value={value}
                onChange={handleEditorChange}
                onMount={handleEditorDidMount}
                theme={theme === "dark" ? "vs-dark" : "light"}
                options={{
                    readOnly,
                    domReadOnly: readOnly,
                    wordWrap: "on",
                }}
            />
        </div>
    );
}
