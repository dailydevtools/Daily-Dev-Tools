import { useState, useEffect } from 'react';
import CopyButton from '../CopyButton';

export default function HtmlEncoder() {
    const [input, setInput] = useState('');
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
    const [output, setOutput] = useState('');

    useEffect(() => {
        try {
            if (mode === 'encode') {
                const encoded = input.replace(/[\u00A0-\u9999<>\&]/g, function(i) {
                   return '&#'+i.charCodeAt(0)+';';
                });
                setOutput(encoded);
            } else {
                const textarea = document.createElement('textarea');
                textarea.innerHTML = input;
                setOutput(textarea.value);
            }
        } catch (e) {
            setOutput('Error processing text');
        }
    }, [input, mode]);

    const handleClear = () => {
        setInput('');
    };

    return (
        <div className="tool-container">
            <div className="tab-buttons">
                <button
                    className={`tab-btn ${mode === 'encode' ? 'active' : ''}`}
                    onClick={() => setMode('encode')}
                >
                    Encode
                </button>
                <button
                    className={`tab-btn ${mode === 'decode' ? 'active' : ''}`}
                    onClick={() => setMode('decode')}
                >
                    Decode
                </button>
            </div>

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
                    placeholder={mode === 'encode' ? 'Enter HTML or text to encode...' : 'Enter HTML entities to decode...'}
                    className="text-input textarea"
                    spellCheck={false}
                />
            </div>

            <div className="result-section">
                <div className="result-header">
                    <span className="section-label">Output</span>
                    {output && output !== 'Error processing text' && <CopyButton text={output} />}
                </div>
                <div className="result-box">
                    {output || <span className="empty-text">Result will appear here</span>}
                </div>
            </div>

            <style>{`
                .tool-container { display: flex; flex-direction: column; gap: 16px; }
                .tab-buttons { display: flex; gap: 8px; background: var(--bg-tertiary); padding: 4px; border-radius: 8px; border: 1px solid var(--border-color); }
                .tab-btn { flex: 1; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: 500; border: none; background: transparent; color: var(--text-secondary); cursor: pointer; transition: all 0.2s; }
                .tab-btn:hover { color: var(--text-primary); }
                .tab-btn.active { background: var(--bg-elevated); color: var(--text-primary); box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
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
