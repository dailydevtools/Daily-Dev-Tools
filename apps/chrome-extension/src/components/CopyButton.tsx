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
            <button className={`copy-button ${copied ? 'copied' : ''}`} onClick={handleCopy}>
                {copied ? 'Copied!' : 'Copy'}
            </button>

            <style>{`
        .copy-button {
          padding: 5px 10px;
          font-size: 10px;
          font-weight: 600;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          color: var(--text-secondary);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.2s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .copy-button:hover {
          color: var(--accent);
          border-color: rgba(249, 115, 22, 0.3);
          background: rgba(249, 115, 22, 0.1);
        }

        .copy-button.copied {
          color: var(--success);
          border-color: rgba(34, 197, 94, 0.3);
          background: rgba(34, 197, 94, 0.1);
        }
      `}</style>
        </>
    );
}
