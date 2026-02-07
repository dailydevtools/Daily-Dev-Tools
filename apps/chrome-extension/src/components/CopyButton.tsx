import { useState } from 'react';

interface CopyButtonProps {
    text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <>
            <button className="copy-button" onClick={handleCopy}>
                {copied ? '✓ Copied' : '📋 Copy'}
            </button>

            <style>{`
        .copy-button {
          padding: 4px 8px;
          font-size: 11px;
          font-weight: 500;
          border-radius: 4px;
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          border: 1px solid var(--border-color);
          transition: all 0.2s;
        }

        .copy-button:hover {
          color: var(--accent);
          border-color: var(--accent);
        }
      `}</style>
        </>
    );
}
