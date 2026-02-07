"use client";

import React, { useRef, useEffect } from "react";
import Editor, { EditorProps, OnMount } from "@monaco-editor/react";
import { useTheme } from "next-themes";

interface CodeEditorProps extends EditorProps {
    className?: string;
}

export default function CodeEditor({ className = "", theme, onMount, beforeMount, options, ...props }: CodeEditorProps) {
    const { resolvedTheme } = useTheme();
    const monacoRef = useRef<any>(null);

    const handleEditorWillMount = (monaco: any) => {
        monacoRef.current = monaco;

        // Call parent beforeMount if exists
        if (beforeMount) {
            beforeMount(monaco);
        }
    };

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        // Set initial theme
        const activeTheme = theme || (resolvedTheme === 'dark' ? 'vs-dark' : 'light');
        monaco.editor.setTheme(activeTheme);

        if (onMount) {
            onMount(editor, monaco);
        }
    };

    // Sync theme changes
    useEffect(() => {
        if (monacoRef.current && !theme) {
            monacoRef.current.editor.setTheme(resolvedTheme === 'dark' ? 'vs-dark' : 'light');
        }
    }, [resolvedTheme, theme]);

    // Determine effective theme prop
    // If 'theme' is explicitly provided, use it. Otherwise, use custom themes based on resolvedTheme
    const effectiveTheme = theme || (resolvedTheme === 'dark' ? 'vs-dark' : 'light');

    return (
        <div className={`rounded-xl overflow-hidden border border-[var(--border-color)] bg-neutral-100/50 dark:bg-[#1e1e1e] ${className}`} style={{ height: props.height || '100%' }}>
            <Editor
                key={effectiveTheme}
                {...props}
                theme={effectiveTheme}
                beforeMount={handleEditorWillMount}
                onMount={handleEditorDidMount}
                options={{
                    minimap: { enabled: false },
                    fontSize: 13,
                    padding: { top: 16, bottom: 16 },
                    ...options
                }}
            />
        </div>
    );
}
