"use client";

import React, { useRef, useEffect, useState } from "react";
import { DiffEditor, DiffEditorProps, Monaco } from "@monaco-editor/react";

interface CodeDiffEditorProps extends DiffEditorProps {
    className?: string;
}

export default function CodeDiffEditor({ className = "", theme, onMount, beforeMount, options, ...props }: CodeDiffEditorProps) {
    const monacoRef = useRef<Monaco | null>(null);
    const [editorTheme, setEditorTheme] = useState<"vs-dark" | "light">("vs-dark");

    // Detect theme from document class
    useEffect(() => {
        const checkTheme = () => {
            const isDark = document.documentElement.classList.contains('dark');
            const newTheme = isDark ? "vs-dark" : "light";
            setEditorTheme((prev) => prev !== newTheme ? newTheme : prev);
        };

        checkTheme();

        // Listen for theme changes
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    const handleEditorWillMount = (monaco: Monaco) => {
        monacoRef.current = monaco;

        // Call parent beforeMount if exists
        if (beforeMount) {
            beforeMount(monaco);
        }
    };

    const handleEditorDidMount = (editor: Parameters<NonNullable<DiffEditorProps["onMount"]>>[0], monaco: Monaco) => {
        // Set initial theme
        const activeTheme = theme || editorTheme;
        monaco.editor.setTheme(activeTheme as string);

        if (onMount) {
            onMount(editor, monaco);
        }
    };

    // Determine effective theme prop
    const effectiveTheme = theme || editorTheme;

    return (
        <div className={`rounded-xl overflow-hidden border border-[var(--border-color)] bg-neutral-100/50 dark:bg-[#1e1e1e] group ${className}`} style={{ height: props.height || '100%' }}>
            <DiffEditor
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
                    renderSideBySide: true,
                    originalEditable: true,
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
