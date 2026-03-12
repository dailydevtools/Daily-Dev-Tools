import { useState, useEffect } from 'react';
import { RefreshIcon } from '../icons';
import CopyButton from '../CopyButton';

export default function PasswordGenerator() {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [useUppercase, setUseUppercase] = useState(true);
    const [useNumbers, setUseNumbers] = useState(true);
    const [useSymbols, setUseSymbols] = useState(true);

    const generatePassword = () => {
        const lower = 'abcdefghijklmnopqrstuvwxyz';
        const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

        let chars = lower;
        if (useUppercase) chars += upper;
        if (useNumbers) chars += numbers;
        if (useSymbols) chars += symbols;

        let generated = '';
        for (let i = 0; i < length; i++) {
            generated += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setPassword(generated);
    };

    useEffect(() => {
        generatePassword();
    }, [length, useUppercase, useNumbers, useSymbols]);

    return (
        <div className="tool-container">
            <div className="password-display">
                <span className="password-text">{password}</span>
                <div className="password-actions">
                    <button onClick={generatePassword} className="icon-btn" title="Regenerate">
                        <RefreshIcon />
                    </button>
                    <CopyButton text={password} />
                </div>
            </div>

            <div className="tool-section">
                <div className="flex-between">
                    <label className="section-label">Length: {length}</label>
                </div>
                <input
                    type="range"
                    min="8"
                    max="64"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="range-input"
                />
            </div>

            <div className="options-grid">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={useUppercase}
                        onChange={(e) => setUseUppercase(e.target.checked)}
                    />
                    <span>Uppercase (A-Z)</span>
                </label>
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={useNumbers}
                        onChange={(e) => setUseNumbers(e.target.checked)}
                    />
                    <span>Numbers (0-9)</span>
                </label>
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={useSymbols}
                        onChange={(e) => setUseSymbols(e.target.checked)}
                    />
                    <span>Symbols (!@#$)</span>
                </label>
            </div>

            <style>{`
                .tool-container { display: flex; flex-direction: column; gap: 16px; }
                .password-display { display: flex; justify-content: space-between; align-items: center; padding: 16px; background: var(--bg-tertiary); border-radius: 8px; border: 1px solid var(--border-color); }
                .password-text { font-family: monospace; font-size: 16px; color: var(--accent); word-break: break-all; font-weight: 600; }
                .password-actions { display: flex; gap: 8px; }
                .tool-section { display: flex; flex-direction: column; gap: 8px; }
                .flex-between { display: flex; justify-content: space-between; align-items: center; }
                .section-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-secondary); }
                .range-input { width: 100%; accent-color: var(--accent); }
                .options-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
                .checkbox-label { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--text-primary); cursor: pointer; }
                .checkbox-label input { accent-color: var(--accent); width: 16px; height: 16px; }
            `}</style>
        </div>
    );
}
