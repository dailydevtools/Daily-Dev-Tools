import { useState, useCallback } from 'react';
import { unixToDate, dateToUnix, getCurrentTimestamp } from '@dailydevtools/core-utils';
import ActionButton from '../ActionButton';
import CopyButton from '../CopyButton';

export default function TimestampTool() {
    const [unixInput, setUnixInput] = useState('');
    const [dateInput, setDateInput] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const [mode, setMode] = useState<'toDate' | 'toUnix'>('toDate');

    const handleConvert = useCallback(() => {
        setError('');
        if (mode === 'toDate') {
            if (!unixInput.trim()) {
                setError('Please enter a Unix timestamp');
                return;
            }
            const res = unixToDate(Number(unixInput));
            if (res.success) {
                setResult(String(res.output));
            } else {
                setError(res.error || 'Conversion failed');
            }
        } else {
            if (!dateInput.trim()) {
                setError('Please enter a date');
                return;
            }
            const res = dateToUnix(dateInput);
            if (res.success) {
                setResult(String(res.output));
            } else {
                setError(res.error || 'Conversion failed');
            }
        }
    }, [mode, unixInput, dateInput]);

    const handleNow = () => {
        const current = getCurrentTimestamp();
        setUnixInput(String(current.unix));
        setDateInput(current.iso);
    };

    return (
        <div className="tool-container">
            <div className="mode-toggle">
                <button className={`mode-btn ${mode === 'toDate' ? 'active' : ''}`} onClick={() => setMode('toDate')}>
                    Unix → Date
                </button>
                <button className={`mode-btn ${mode === 'toUnix' ? 'active' : ''}`} onClick={() => setMode('toUnix')}>
                    Date → Unix
                </button>
            </div>

            <div className="tool-section">
                <label className="section-label">{mode === 'toDate' ? 'Unix Timestamp' : 'Date String'}</label>
                {mode === 'toDate' ? (
                    <input
                        type="text"
                        value={unixInput}
                        onChange={(e) => setUnixInput(e.target.value)}
                        placeholder="1704067200"
                        className="text-input"
                    />
                ) : (
                    <input
                        type="text"
                        value={dateInput}
                        onChange={(e) => setDateInput(e.target.value)}
                        placeholder="2024-01-01T00:00:00Z"
                        className="text-input"
                    />
                )}
            </div>

            <div className="actions-row">
                <ActionButton onClick={handleConvert} primary>Convert</ActionButton>
                <ActionButton onClick={handleNow}>Now</ActionButton>
            </div>

            {error && <div className="error-message">{error}</div>}

            {result && (
                <div className="tool-section">
                    <div className="section-header">
                        <label className="section-label">Result</label>
                        <CopyButton text={result} />
                    </div>
                    <div className="result-box">{result}</div>
                </div>
            )}

            <style>{`
                .tool-container { display: flex; flex-direction: column; gap: 12px; }
                .mode-toggle { display: flex; background: var(--bg-tertiary); border-radius: 8px; padding: 4px; }
                .mode-btn { flex: 1; padding: 8px; font-size: 12px; font-weight: 500; border-radius: 6px; color: var(--text-secondary); transition: all 0.2s; }
                .mode-btn:hover { color: var(--text-primary); }
                .mode-btn.active { background: var(--accent); color: white; }
                .tool-section { display: flex; flex-direction: column; gap: 6px; }
                .section-header { display: flex; justify-content: space-between; align-items: center; }
                .section-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-secondary); }
                .actions-row { display: flex; gap: 8px; }
                .text-input { padding: 10px 12px; font-size: 13px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-tertiary); color: var(--text-primary); width: 100%; }
                .text-input:focus { outline: none; border-color: var(--accent); }
                .error-message { padding: 8px 12px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 6px; color: var(--error); font-size: 12px; }
                .result-box { padding: 12px; background: var(--bg-tertiary); border-radius: 8px; font-family: monospace; font-size: 13px; word-break: break-all; }
            `}</style>
        </div>
    );
}
