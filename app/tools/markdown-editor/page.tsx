"use client";

import { useState } from "react";
import { Copy, Check, Eye, Code } from "lucide-react";
import Link from "next/link";
// We will use a simple regex based parser for improved performance without heavy deps
// In a real prod app, we'd use 'react-markdown' or 'marked'

export default function MarkdownEditor() {
    const [input, setInput] = useState("# Hello World\n\nThis is a **bold** statement.\n\n- Item 1\n- Item 2\n\n```\nconsole.log('code');\n```");
    const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');

    // Simple Markdown Parser (Client-side, validation-free)
    const parseMarkdown = (text: string) => {
        let html = text
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
            .replace(/\*(.*)\*/gim, '<i>$1</i>')
            .replace(/`([^`]*)`/gim, '<code>$1</code>')
            .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
            .replace(/^-(.*$)/gim, '<li>$1</li>')
            .replace(/\n\n/gim, '<br/><br/>'); // Basic line breaks

        return { __html: html };
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div className="gradient-orb gradient-orb-1" style={{ opacity: 0.15 }} />
            <div className="gradient-orb gradient-orb-2" style={{ opacity: 0.15 }} />

            {/* Navbar removed */}

            <div style={{ position: 'relative', zIndex: 10, paddingBottom: 60, paddingLeft: 24, paddingRight: 24 }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg, #f97316 0%, #facc15 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>📝</div>
                        <div>
                            <h1 style={{ fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 4 }}>Markdown Editor</h1>
                            <p style={{ color: '#9ca3af', fontSize: 14 }}>Real-time Markdown preview</p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, height: 'calc(100vh - 250px)', minHeight: 500 }}>
                        {/* Editor */}
                        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', borderRadius: 16, overflow: 'hidden' }}>
                            <div style={{ padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Code style={{ width: 16, height: 16, color: '#fb923c' }} />
                                <span style={{ fontSize: 14, fontWeight: 500, color: 'white' }}>Markdown Input</span>
                            </div>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                style={{ flex: 1, background: 'transparent', border: 'none', padding: 20, fontFamily: 'monospace', fontSize: 14, color: '#e5e7eb', resize: 'none', outline: 'none', lineHeight: 1.6 }}
                            />
                        </div>

                        {/* Preview */}
                        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', borderRadius: 16, overflow: 'hidden' }}>
                            <div style={{ padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Eye style={{ width: 16, height: 16, color: '#4ade80' }} />
                                <span style={{ fontSize: 14, fontWeight: 500, color: 'white' }}>Live Preview</span>
                            </div>
                            <div
                                style={{ flex: 1, padding: 20, overflowY: 'auto', color: '#e5e7eb', lineHeight: 1.6 }}
                                className="markdown-preview"
                                dangerouslySetInnerHTML={parseMarkdown(input)}
                            />
                        </div>
                    </div>

                </div>
            </div>

            <style jsx global>{`
        .markdown-preview h1 { font-size: 2em; font-weight: bold; margin-bottom: 0.5em; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.2em; color: #fb923c; }
        .markdown-preview h2 { font-size: 1.5em; font-weight: bold; margin-bottom: 0.5em; color: #facc15; }
        .markdown-preview h3 { font-size: 1.25em; font-weight: bold; margin-bottom: 0.5em; }
        .markdown-preview p { margin-bottom: 1em; }
        .markdown-preview code { background: rgba(0,0,0,0.3); padding: 2px 4px; borderRadius: 4px; font-family: monospace; color: #fb923c; }
        .markdown-preview pre { background: rgba(0,0,0,0.3); padding: 16px; borderRadius: 8px; margin-bottom: 1em; overflow-x: auto; }
        .markdown-preview pre code { background: transparent; padding: 0; color: #e5e7eb; }
        .markdown-preview ul { list-style: disc; padding-left: 20px; margin-bottom: 1em; }
        .markdown-preview li { margin-bottom: 0.2em; }
        .markdown-preview blockquote { border-left: 4px solid #fb923c; padding-left: 16px; margin: 0 0 1em 0; color: #9ca3af; }
      `}</style>
        </div>
    );
}
