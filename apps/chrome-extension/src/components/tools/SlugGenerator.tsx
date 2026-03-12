import { useState, useEffect } from 'react';
import CopyButton from '../CopyButton';

export default function SlugGenerator() {
    const [input, setInput] = useState('');
    const [slug, setSlug] = useState('');

    useEffect(() => {
        const generateSlug = (text: string) => {
             return text
                 .toLowerCase()
                 .trim()
                 .replace(/[^\w\s-]/g, '')
                 .replace(/[\s_-]+/g, '-')
                 .replace(/^-+|-+$/g, '');
         };
         setSlug(generateSlug(input));
    }, [input]);

    const handleClear = () => {
        setInput('');
    };

    return (
        <div className="tool-container">
            <div className="tool-section">
                <div className="flex-between">
                    <label className="section-label">Input Text</label>
                    {input && (
                        <button onClick={handleClear} className="clear-btn">Clear</button>
                    )}
                </div>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter text to convert to slug..."
                    className="text-input textarea"
                    spellCheck={false}
                />
            </div>

            <div className="result-section">
                <div className="result-header">
                    <span className="section-label">Generated Slug</span>
                    {slug && <CopyButton text={slug} />}
                </div>
                <div className="result-box">
                    {slug || <span className="empty-text">Slug will appear here</span>}
                </div>
            </div>

            <style>{`
                .tool-container { display: flex; flex-direction: column; gap: 16px; }
                .tool-section { display: flex; flex-direction: column; gap: 8px; }
                .flex-between { display: flex; justify-content: space-between; align-items: center; }
                .section-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-secondary); }
                .clear-btn { font-size: 11px; color: var(--accent); background: none; border: none; cursor: pointer; padding: 0; outline: none; }
                .clear-btn:hover { text-decoration: underline; }
                .text-input { padding: 10px 12px; font-size: 13px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-tertiary); color: var(--text-primary); width: 100%; border-sizing: border-box; }
                .text-input:focus { outline: none; border-color: var(--accent); }
                .textarea { min-height: 80px; resize: vertical; }
                .result-section { display: flex; flex-direction: column; gap: 8px; }
                .result-header { display: flex; justify-content: space-between; align-items: center; }
                .result-box { background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 8px; padding: 12px; font-family: monospace; font-size: 13px; color: var(--text-primary); word-break: break-all; min-height: 44px; display: flex; align-items: center; }
                .empty-text { color: var(--text-muted); font-style: italic; font-family: sans-serif; font-size: 12px; }
            `}</style>
        </div>
    );
}
