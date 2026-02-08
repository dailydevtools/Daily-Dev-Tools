import { useState } from 'react';
import { getAllCases, CaseType } from '@dailydevtools/core-utils';
import CopyButton from '../CopyButton';

const CASE_LABELS: Record<CaseType, string> = {
    camel: 'camelCase',
    snake: 'snake_case',
    kebab: 'kebab-case',
    pascal: 'PascalCase',
    upper: 'UPPERCASE',
    lower: 'lowercase',
    title: 'Title Case',
    constant: 'CONSTANT_CASE',
};

export default function CaseConverter() {
    const [input, setInput] = useState('');
    const [results, setResults] = useState<Record<CaseType, string> | null>(null);

    return (
        <div className="tool-container">
            <div className="tool-section">
                <label className="section-label">Input Text</label>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                        if (e.target.value.trim()) {
                            setResults(getAllCases(e.target.value));
                        } else {
                            setResults(null);
                        }
                    }}
                    placeholder="hello world example"
                    className="text-input"
                />
            </div>

            {results && (
                <div className="results-grid">
                    {(Object.keys(CASE_LABELS) as CaseType[]).map((caseType) => (
                        <div key={caseType} className="case-item">
                            <div className="case-header">
                                <span className="case-label">{CASE_LABELS[caseType]}</span>
                                <CopyButton text={results[caseType]} />
                            </div>
                            <div className="case-value">{results[caseType]}</div>
                        </div>
                    ))}
                </div>
            )}

            <style>{`
                .tool-container { display: flex; flex-direction: column; gap: 12px; }
                .tool-section { display: flex; flex-direction: column; gap: 6px; }
                .section-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-secondary); }
                .text-input { padding: 10px 12px; font-size: 13px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-tertiary); color: var(--text-primary); width: 100%; }
                .text-input:focus { outline: none; border-color: var(--accent); }
                .results-grid { display: flex; flex-direction: column; gap: 8px; }
                .case-item { background: var(--bg-tertiary); border-radius: 8px; padding: 10px 12px; }
                .case-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
                .case-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted); }
                .case-value { font-family: monospace; font-size: 12px; color: var(--text-primary); word-break: break-all; }
            `}</style>
        </div>
    );
}
