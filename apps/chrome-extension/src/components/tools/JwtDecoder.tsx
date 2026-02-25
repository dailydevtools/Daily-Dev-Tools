import { useState, useCallback } from 'react';
import { decodeJwt, getExpirationText } from '@dailydevtools/core-utils';
import ActionButton from '../ActionButton';
import CopyButton from '../CopyButton';

export default function JwtDecoder() {
    const [input, setInput] = useState('');
    const [header, setHeader] = useState('');
    const [payload, setPayload] = useState('');
    const [error, setError] = useState('');
    const [expInfo, setExpInfo] = useState<{ text: string; expired: boolean } | null>(null);

    const handleDecode = useCallback(() => {
        if (!input.trim()) {
            setError('Please enter a JWT token');
            setHeader('');
            setPayload('');
            setExpInfo(null);
            return;
        }

        const result = decodeJwt(input);

        if (result.success) {
            setHeader(JSON.stringify(result.header, null, 2));
            setPayload(JSON.stringify(result.payload, null, 2));
            setError('');

            if (result.payload?.exp) {
                setExpInfo({
                    text: getExpirationText(result.payload.exp),
                    expired: result.isExpired || false,
                });
            } else {
                setExpInfo(null);
            }
        } else {
            setError(result.error || 'Invalid JWT');
            setHeader('');
            setPayload('');
            setExpInfo(null);
        }
    }, [input]);

    return (
        <div className="tool-container">
            <div className="tool-section">
                <label className="section-label">JWT Token</label>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    rows={4}
                />
            </div>

            <div className="actions-row">
                <ActionButton onClick={handleDecode} primary>Decode</ActionButton>
            </div>

            {error && <div className="error-message">{error}</div>}

            {expInfo && (
                <div className={`exp-badge ${expInfo.expired ? 'expired' : 'valid'}`}>
                    {expInfo.text}
                </div>
            )}

            {header && (
                <div className="tool-section">
                    <div className="section-header">
                        <label className="section-label">Header</label>
                        <CopyButton text={header} />
                    </div>
                    <textarea value={header} readOnly rows={4} />
                </div>
            )}

            {payload && (
                <div className="tool-section">
                    <div className="section-header">
                        <label className="section-label">Payload</label>
                        <CopyButton text={payload} />
                    </div>
                    <textarea value={payload} readOnly rows={8} />
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
        }

        .error-message {
          padding: 8px 12px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 6px;
          color: var(--error);
          font-size: 12px;
        }

        .exp-badge {
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
        }

        .exp-badge.valid {
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.3);
          color: var(--success);
        }

        .exp-badge.expired {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: var(--error);
        }
      `}</style>
        </div>
    );
}
