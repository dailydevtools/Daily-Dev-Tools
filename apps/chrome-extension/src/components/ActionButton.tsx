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
          padding: 10px 18px;
          font-size: 12px;
          font-weight: 600;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          color: var(--text-primary);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .action-button:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-1px);
        }

        .action-button.primary {
          background: linear-gradient(135deg, var(--accent) 0%, #fb923c 100%);
          border: none;
          color: white;
          box-shadow: 
            0 4px 16px rgba(249, 115, 22, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .action-button.primary:hover:not(:disabled) {
          background: linear-gradient(135deg, #fb923c 0%, var(--accent) 100%);
          box-shadow: 
            0 6px 20px rgba(249, 115, 22, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .action-button:active:not(:disabled) {
          transform: translateY(0);
        }
      `}</style>
    </>
  );
}
