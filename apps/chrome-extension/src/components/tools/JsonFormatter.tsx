import { useState, useCallback } from 'react';
import { formatJson, minifyJson, validateJson } from '@dailydevtools/core-utils';
import ActionButton from '../ActionButton';
import CopyButton from '../CopyButton';

export default function JsonFormatter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [indent, setIndent] = useState(2);

    const handleFormat = useCallback(() => {
        if (!input.trim()) {
            setError('Please enter JSON');
            setOutput('');
            return;
        }
        const result = formatJson(input, indent);
        if (result.success) {
            setOutput(result.output);
            setError('');
        } else {
            setError(result.error || 'Invalid JSON');
            setOutput('');
        }
    }, [input, indent]);

    const handleMinify = useCallback(() => {
        if (!input.trim()) {
            setError('Please enter JSON');
            setOutput('');
            return;
        }
        const result = minifyJson(input);
        if (result.success) {
            setOutput(result.output);
            setError('');
        } else {
            setError(result.error || 'Invalid JSON');
            setOutput('');
        }
    }, [input]);

    const handleValidate = useCallback(() => {
        if (!input.trim()) {
            setError('Please enter JSON');
            return;
        }
        const result = validateJson(input);
        if (result.valid) {
            setError('');
            alert('✅ Valid JSON!');
        } else {
            setError(result.error || 'Invalid JSON');
        }
    }, [input]);

    return (
        <div className="tool-container">
            <div className="tool-section">
                <label className="section-label">Input</label>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='{"name": "John", "age": 30}'
                    rows={8}
                />
            </div>

            <div className="actions-row">
                <ActionButton onClick={handleFormat} primary>Format</ActionButton>
                <ActionButton onClick={handleMinify}>Minify</ActionButton>
                <ActionButton onClick={handleValidate}>Validate</ActionButton>
                <select
                    value={indent}
                    onChange={(e) => setIndent(Number(e.target.value))}
                    className="indent-select"
                >
                    <option value={2}>2 spaces</option>
                    <option value={4}>4 spaces</option>
                    <option value={1}>1 tab</option>
                </select>
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
                        rows={10}
                    />
                </div>
            )}

            <style>{`
        .tool-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
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
          flex-wrap: wrap;
        }

        .indent-select {
          padding: 6px 10px;
          font-size: 12px;
          border-radius: 6px;
          border: 1px solid var(--border-color);
          background: var(--bg-tertiary);
          color: var(--text-primary);
          cursor: pointer;
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
