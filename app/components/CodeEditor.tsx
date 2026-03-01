"use client";

import React, { useRef, useEffect, useState } from "react";
import Editor, { EditorProps, OnMount } from "@monaco-editor/react";
import { useTheme } from "next-themes";

interface CodeEditorProps extends EditorProps {
    className?: string;
}

export default function CodeEditor({ className = "", theme, onMount, beforeMount, options, ...props }: CodeEditorProps) {
    const { resolvedTheme } = useTheme();
    const monacoRef = useRef<any>(null);
    const [mounted, setMounted] = useState(false);
    const [editorTheme, setEditorTheme] = useState<"vs-dark" | "light">("vs-dark");

    // Detect theme from document class
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

    const handleEditorWillMount = (monaco: any) => {
        monacoRef.current = monaco;

        // Call parent beforeMount if exists
        if (beforeMount) {
            beforeMount(monaco);
        }
    };

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        // Set initial theme
        const activeTheme = theme || editorTheme;
        monaco.editor.setTheme(activeTheme);

        if (onMount) {
            onMount(editor, monaco);
        }
    };

    // Determine effective theme prop
    const effectiveTheme = theme || editorTheme;

    return (
        <div className={`rounded-xl overflow-hidden border border-[var(--border-color)] bg-neutral-100/50 dark:bg-[#1e1e1e] group ${className}`} style={{ height: props.height || '100%' }}>
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
                    scrollBeyondLastLine: false,
                    fontFamily: 'var(--font-mono)',
                    renderLineHighlight: 'none',
                    overviewRulerLanes: 0,
                    hideCursorInOverviewRuler: true,
                    scrollbar: {
                        vertical: 'visible',
                        horizontal: 'visible',
                        useShadows: false,
                        verticalScrollbarSize: 10,
                        horizontalScrollbarSize: 10,
                    },
                    wordWrap: 'on',
                    ...options
                }}
            />
        </div>
    );
}
