interface ActionButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    primary?: boolean;
    disabled?: boolean;
}

export default function ActionButton({ children, onClick, primary, disabled }: ActionButtonProps) {
    return (
        <>
            <button
                className={`action-button ${primary ? 'primary' : ''}`}
                onClick={onClick}
                disabled={disabled}
            >
                {children}
            </button>

            <style>{`
                .action-button {
                    padding: 8px 16px;
                    font-size: 12px;
                    font-weight: 600;
                    border-radius: 8px;
                    background: var(--bg-tertiary);
                    color: var(--text-primary);
                    border: 1px solid var(--border-color);
                    transition: all 0.2s;
                }
                .action-button:hover:not(:disabled) {
                    background: var(--bg-secondary);
                    border-color: var(--accent);
                }
                .action-button.primary {
                    background: var(--accent);
                    border-color: var(--accent);
                    color: white;
                }
                .action-button.primary:hover:not(:disabled) {
                    background: var(--accent-hover);
                }
            `}</style>
        </>
    );
}
