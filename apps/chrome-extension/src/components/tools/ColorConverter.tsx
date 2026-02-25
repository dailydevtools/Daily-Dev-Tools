import { useState, useCallback } from 'react';
import { parseColor } from '@dailydevtools/core-utils';
import CopyButton from '../CopyButton';

export default function ColorConverter() {
    const [input, setInput] = useState('');
    const [hex, setHex] = useState('');
    const [rgb, setRgb] = useState('');
    const [hsl, setHsl] = useState('');
    const [error, setError] = useState('');

    const handleConvert = useCallback((value: string) => {
        setInput(value);
        if (!value.trim()) {
            setHex(''); setRgb(''); setHsl(''); setError('');
            return;
        }

        const result = parseColor(value);
        if (result.success) {
            setError('');
            if (result.hex) setHex(result.hex);
            if (result.rgb) setRgb(`rgb(${result.rgb.r}, ${result.rgb.g}, ${result.rgb.b})`);
            if (result.hsl) setHsl(`hsl(${result.hsl.h}, ${result.hsl.s}%, ${result.hsl.l}%)`);
        } else {
            setError(result.error || 'Invalid color');
            setHex(''); setRgb(''); setHsl('');
        }
    }, []);

    return (
        <div className="tool-container">
            <div className="tool-section">
                <label className="section-label">Input Color</label>
                <div className="input-row">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => handleConvert(e.target.value)}
                        placeholder="#f97316 or rgb(249, 115, 22)"
                        className="text-input"
                    />
                    {hex && <div className="color-preview" style={{ background: hex }} />}
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            {hex && (
                <div className="results">
                    <div className="format-item">
                        <div className="format-header">
                            <span className="format-label">HEX</span>
                            <CopyButton text={hex} />
                        </div>
                        <div className="format-value">{hex}</div>
                    </div>
                    <div className="format-item">
                        <div className="format-header">
                            <span className="format-label">RGB</span>
                            <CopyButton text={rgb} />
                        </div>
                        <div className="format-value">{rgb}</div>
                    </div>
                    <div className="format-item">
                        <div className="format-header">
                            <span className="format-label">HSL</span>
                            <CopyButton text={hsl} />
                        </div>
                        <div className="format-value">{hsl}</div>
                    </div>
                </div>
            )}

            <style>{`
                .tool-container { display: flex; flex-direction: column; gap: 12px; }
                .tool-section { display: flex; flex-direction: column; gap: 6px; }
                .section-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-secondary); }
                .input-row { display: flex; gap: 8px; align-items: center; }
                .text-input { flex: 1; padding: 10px 12px; font-size: 13px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-tertiary); color: var(--text-primary); }
                .text-input:focus { outline: none; border-color: var(--accent); }
                .color-preview { width: 40px; height: 40px; border-radius: 8px; border: 2px solid var(--border-color); flex-shrink: 0; }
                .error-message { padding: 8px 12px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 6px; color: var(--error); font-size: 12px; }
                .results { display: flex; flex-direction: column; gap: 8px; }
                .format-item { background: var(--bg-tertiary); border-radius: 8px; padding: 10px 12px; }
                .format-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
                .format-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted); }
                .format-value { font-family: monospace; font-size: 13px; color: var(--text-primary); }
            `}</style>
        </div>
    );
}
