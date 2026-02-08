import { useState, useCallback } from 'react';
import { generateHash, generateMD5, HashAlgorithm } from '@dailydevtools/core-utils';
import ActionButton from '../ActionButton';
import CopyButton from '../CopyButton';

export default function HashGenerator() {
    const [input, setInput] = useState('');
    const [hash, setHash] = useState('');
    const [algorithm, setAlgorithm] = useState<HashAlgorithm | 'MD5'>('SHA-256');
    const [error, setError] = useState('');

    const handleGenerate = useCallback(async () => {
        if (!input.trim()) {
            setError('Please enter text');
            setHash('');
            return;
        }

        let result;
        if (algorithm === 'MD5') {
            result = generateMD5(input);
        } else {
            result = await generateHash(input, algorithm as HashAlgorithm);
        }

        if (result.success && result.hash) {
            setHash(result.hash);
            setError('');
        } else {
            setError(result.error || 'Hash failed');
            setHash('');
        }
    }, [input, algorithm]);

    return (
        <div className="tool-container">
            <div className="tool-section">
                <label className="section-label">Input Text</label>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter text to hash..."
                    rows={4}
                />
            </div>

            <div className="actions-row">
                <ActionButton onClick={handleGenerate} primary>Generate Hash</ActionButton>
                <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value as HashAlgorithm)} className="algo-select">
                    <option value="SHA-256">SHA-256</option>
                    <option value="SHA-384">SHA-384</option>
                    <option value="SHA-512">SHA-512</option>
                    <option value="SHA-1">SHA-1</option>
                    <option value="MD5">MD5</option>
                </select>
            </div>

            {error && <div className="error-message">{error}</div>}

            {hash && (
                <div className="tool-section">
                    <div className="section-header">
                        <label className="section-label">{algorithm} Hash</label>
                        <CopyButton text={hash} />
                    </div>
                    <textarea value={hash} readOnly rows={3} className="hash-output" />
                </div>
            )}

            <style>{`
                .tool-container { display: flex; flex-direction: column; gap: 12px; }
                .tool-section { display: flex; flex-direction: column; gap: 6px; }
                .section-header { display: flex; justify-content: space-between; align-items: center; }
                .section-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-secondary); }
                .actions-row { display: flex; gap: 8px; align-items: center; }
                .algo-select { padding: 8px 12px; font-size: 12px; border-radius: 6px; border: 1px solid var(--border-color); background: var(--bg-tertiary); color: var(--text-primary); }
                .error-message { padding: 8px 12px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 6px; color: var(--error); font-size: 12px; }
                .hash-output { word-break: break-all; }
            `}</style>
        </div>
    );
}
