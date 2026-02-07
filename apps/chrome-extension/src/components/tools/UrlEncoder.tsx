import { useState, useCallback } from 'react';
import { encodeUrl, decodeUrl } from '@dailydevtools/core-utils';
import ActionButton from '../ActionButton';
import CopyButton from '../CopyButton';

export default function UrlEncoder() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');

    const handleProcess = useCallback(() => {
        if (!input.trim()) {
            setError('Please enter text');
            setOutput('');
            return;
        }

        const result = mode === 'encode' ? encodeUrl(input) : decodeUrl(input);

        if (result.success) {
            setOutput(result.output);
            setError('');
        } else {
            setError(result.error || 'Processing failed');
            setOutput('');
        }
    }, [input, mode]);

    const handleSwap = useCallback(() => {
        setInput(output);
        setOutput('');
        setMode(mode === 'encode' ? 'decode' : 'encode');
    }, [output, mode]);

    return (
        <div className="tool-container">
            <div className="mode-toggle">
                <button
                    className={`mode-btn ${mode === 'encode' ? 'active' : ''}`}
                    onClick={() => setMode('encode')}
                >
                    Encode
                </button>
                <button
                    className={`mode-btn ${mode === 'decode' ? 'active' : ''}`}
                    onClick={() => setMode('decode')}
                >
                    Decode
                </button>
            </div>

            <div className="tool-section">
                <label className="section-label">
                    {mode === 'encode' ? 'Text to Encode' : 'URL to Decode'}
                </label>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={mode === 'encode' ? 'Hello World!' : 'Hello%20World%21'}
                    rows={6}
                />
            </div>

            <div className="actions-row">
                <ActionButton onClick={handleProcess} primary>
                    {mode === 'encode' ? '🔗 Encode' : '🔓 Decode'}
                </ActionButton>
                {output && <ActionButton onClick={handleSwap}>↔ Swap</ActionButton>}
            </div>

            {error && <div className="error-message">{error}</div>}

            {output && (
                <div className="tool-section">
                    <div className="section-header">
                        <label className="section-label">Output</label>
                        <CopyButton text={output} />
                    </div>
                    <textarea
                        value={output}
                        readOnly
                        rows={6}
                    />
                </div>
            )}

            <style>{`
        .tool-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .mode-toggle {
          display: flex;
          background: var(--bg-tertiary);
          border-radius: 8px;
          padding: 4px;
        }

        .mode-btn {
          flex: 1;
          padding: 8px;
          font-size: 12px;
          font-weight: 500;
          border-radius: 6px;
          color: var(--text-secondary);
          transition: all 0.2s;
        }

        .mode-btn:hover {
          color: var(--text-primary);
        }

        .mode-btn.active {
          background: var(--accent);
          color: white;
        }

        .tool-section {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .section-label {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-secondary);
        }

        .actions-row {
          display: flex;
          gap: 8px;
        }

        .error-message {
          padding: 8px 12px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 6px;
          color: var(--error);
          font-size: 12px;
        }
      `}</style>
        </div>
    );
}
