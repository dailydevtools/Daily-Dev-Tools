import { useState, useCallback } from 'react';
import { testRegex, COMMON_PATTERNS } from '@dailydevtools/core-utils';
import ActionButton from '../ActionButton';

export default function RegexTester() {
    const [pattern, setPattern] = useState('');
    const [testString, setTestString] = useState('');
    const [flags, setFlags] = useState('g');
    const [matches, setMatches] = useState<{ match: string; index: number }[]>([]);
    const [error, setError] = useState('');

    const handleTest = useCallback(() => {
        if (!pattern.trim()) {
            setError('Please enter a pattern');
            setMatches([]);
            return;
        }

        const result = testRegex(pattern, testString, flags);
        if (result.success) {
            setMatches(result.matches || []);
            setError('');
        } else {
            setError(result.error || 'Invalid pattern');
            setMatches([]);
        }
    }, [pattern, testString, flags]);

    const loadPreset = (key: string) => {
        const preset = COMMON_PATTERNS[key];
        if (preset) {
            setPattern(preset.pattern);
        }
    };

    return (
        <div className="tool-container">
            <div className="tool-section">
                <label className="section-label">Pattern</label>
                <input
                    type="text"
                    value={pattern}
                    onChange={(e) => setPattern(e.target.value)}
                    placeholder="[a-zA-Z0-9]+"
                    className="text-input"
                />
            </div>

            <div className="presets">
                {Object.keys(COMMON_PATTERNS).slice(0, 4).map(key => (
                    <button key={key} className="preset-btn" onClick={() => loadPreset(key)}>
                        {key}
                    </button>
                ))}
            </div>

            <div className="tool-section">
                <label className="section-label">Test String</label>
                <textarea
                    value={testString}
                    onChange={(e) => setTestString(e.target.value)}
                    placeholder="Enter text to test against..."
                    rows={4}
                />
            </div>

            <div className="actions-row">
                <ActionButton onClick={handleTest} primary>Test</ActionButton>
                <div className="flags">
                    {['g', 'i', 'm'].map(f => (
                        <label key={f} className="flag-label">
                            <input
                                type="checkbox"
                                checked={flags.includes(f)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setFlags(flags + f);
                                    } else {
                                        setFlags(flags.replace(f, ''));
                                    }
                                }}
                            />
                            {f}
                        </label>
                    ))}
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            {matches.length > 0 && (
                <div className="tool-section">
                    <label className="section-label">{matches.length} Match{matches.length !== 1 ? 'es' : ''}</label>
                    <div className="matches-list">
                        {matches.map((m, i) => (
                            <div key={i} className="match-item">
                                <span className="match-text">{m.match}</span>
                                <span className="match-index">@{m.index}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {pattern && testString && matches.length === 0 && !error && (
                <div className="no-matches">No matches found</div>
            )}

            <style>{`
                .tool-container { display: flex; flex-direction: column; gap: 12px; }
                .tool-section { display: flex; flex-direction: column; gap: 6px; }
                .section-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-secondary); }
                .text-input { padding: 10px 12px; font-size: 13px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-tertiary); color: var(--text-primary); width: 100%; font-family: monospace; }
                .text-input:focus { outline: none; border-color: var(--accent); }
                .presets { display: flex; gap: 6px; flex-wrap: wrap; }
                .preset-btn { padding: 4px 8px; font-size: 10px; border-radius: 4px; background: var(--bg-tertiary); color: var(--text-muted); border: 1px solid var(--border-color); text-transform: uppercase; }
                .preset-btn:hover { color: var(--accent); border-color: var(--accent); }
                .actions-row { display: flex; gap: 12px; align-items: center; }
                .flags { display: flex; gap: 12px; }
                .flag-label { display: flex; align-items: center; gap: 4px; font-size: 12px; color: var(--text-secondary); cursor: pointer; }
                .error-message { padding: 8px 12px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 6px; color: var(--error); font-size: 12px; }
                .matches-list { display: flex; flex-direction: column; gap: 4px; }
                .match-item { display: flex; justify-content: space-between; padding: 8px 12px; background: var(--bg-tertiary); border-radius: 6px; }
                .match-text { font-family: monospace; font-size: 12px; color: var(--accent); }
                .match-index { font-size: 11px; color: var(--text-muted); }
                .no-matches { padding: 12px; text-align: center; color: var(--text-muted); font-size: 12px; }
            `}</style>
        </div>
    );
}
