import { useState, useCallback } from 'react';
import { generateLoremIpsum } from '@dailydevtools/core-utils';
import ActionButton from '../ActionButton';
import CopyButton from '../CopyButton';

export default function LoremIpsum() {
    const [output, setOutput] = useState('');
    const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
    const [count, setCount] = useState(3);

    const handleGenerate = useCallback(() => {
        const options = {
            [type]: count,
            startWithLorem: true,
        };
        const text = generateLoremIpsum(options);
        setOutput(text);
    }, [type, count]);

    return (
        <div className="tool-container">
            <div className="options-row">
                <select value={type} onChange={(e) => setType(e.target.value as any)} className="type-select">
                    <option value="paragraphs">Paragraphs</option>
                    <option value="sentences">Sentences</option>
                    <option value="words">Words</option>
                </select>
                <input
                    type="number"
                    value={count}
                    onChange={(e) => setCount(Math.max(1, Number(e.target.value)))}
                    min={1}
                    max={50}
                    className="count-input"
                />
                <ActionButton onClick={handleGenerate} primary>Generate</ActionButton>
            </div>

            {output && (
                <div className="tool-section">
                    <div className="section-header">
                        <label className="section-label">Generated Text</label>
                        <CopyButton text={output} />
                    </div>
                    <textarea value={output} readOnly rows={10} />
                </div>
            )}

            <style>{`
                .tool-container { display: flex; flex-direction: column; gap: 12px; }
                .options-row { display: flex; gap: 8px; align-items: center; }
                .type-select { padding: 8px 12px; font-size: 12px; border-radius: 6px; border: 1px solid var(--border-color); background: var(--bg-tertiary); color: var(--text-primary); }
                .count-input { width: 60px; padding: 8px 12px; font-size: 12px; border-radius: 6px; border: 1px solid var(--border-color); background: var(--bg-tertiary); color: var(--text-primary); text-align: center; }
                .tool-section { display: flex; flex-direction: column; gap: 6px; }
                .section-header { display: flex; justify-content: space-between; align-items: center; }
                .section-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-secondary); }
            `}</style>
        </div>
    );
}
