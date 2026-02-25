import { useState, useCallback } from 'react';
import { generateUUID, generateMultipleUUIDs } from '@dailydevtools/core-utils';
import ActionButton from '../ActionButton';
import CopyButton from '../CopyButton';

export default function UuidGenerator() {
    const [uuid, setUuid] = useState('');
    const [count, setCount] = useState(1);
    const [uuids, setUuids] = useState<string[]>([]);

    const handleGenerate = useCallback(() => {
        if (count === 1) {
            const result = generateUUID();
            if (result.uuid) {
                setUuid(result.uuid);
                setUuids([]);
            }
        } else {
            const results = generateMultipleUUIDs(count);
            setUuids(results);
            setUuid('');
        }
    }, [count]);

    const output = count === 1 ? uuid : uuids.join('\n');

    return (
        <div className="tool-container">
            <div className="actions-row">
                <ActionButton onClick={handleGenerate} primary>Generate UUID</ActionButton>
                <select value={count} onChange={(e) => setCount(Number(e.target.value))} className="count-select">
                    <option value={1}>1 UUID</option>
                    <option value={5}>5 UUIDs</option>
                    <option value={10}>10 UUIDs</option>
                </select>
            </div>

            {output && (
                <div className="tool-section">
                    <div className="section-header">
                        <label className="section-label">Generated UUID{count > 1 ? 's' : ''}</label>
                        <CopyButton text={output} />
                    </div>
                    <textarea value={output} readOnly rows={count === 1 ? 2 : 6} />
                </div>
            )}

            <style>{`
                .tool-container { display: flex; flex-direction: column; gap: 12px; }
                .tool-section { display: flex; flex-direction: column; gap: 6px; }
                .section-header { display: flex; justify-content: space-between; align-items: center; }
                .section-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-secondary); }
                .actions-row { display: flex; gap: 8px; align-items: center; }
                .count-select { padding: 8px 12px; font-size: 12px; border-radius: 6px; border: 1px solid var(--border-color); background: var(--bg-tertiary); color: var(--text-primary); }
            `}</style>
        </div>
    );
}
