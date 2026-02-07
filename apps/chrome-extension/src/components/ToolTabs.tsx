interface Tool {
    id: string;
    label: string;
    icon: string;
}

interface ToolTabsProps {
    tools: Tool[];
    activeTool: string;
    onChange: (id: any) => void;
}

export default function ToolTabs({ tools, activeTool, onChange }: ToolTabsProps) {
    return (
        <div className="tool-tabs">
            {tools.map((tool) => (
                <button
                    key={tool.id}
                    className={`tool-tab ${activeTool === tool.id ? 'active' : ''}`}
                    onClick={() => onChange(tool.id)}
                >
                    <span className="tab-icon">{tool.icon}</span>
                    <span className="tab-label">{tool.label}</span>
                </button>
            ))}

            <style>{`
        .tool-tabs {
          display: flex;
          padding: 8px;
          gap: 4px;
          background: var(--bg-primary);
          border-bottom: 1px solid var(--border-color);
        }

        .tool-tab {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 8px 4px;
          border-radius: 8px;
          transition: all 0.2s;
          color: var(--text-muted);
        }

        .tool-tab:hover {
          background: var(--bg-tertiary);
          color: var(--text-secondary);
        }

        .tool-tab.active {
          background: var(--bg-tertiary);
          color: var(--accent);
        }

        .tab-icon {
          font-size: 16px;
        }

        .tab-label {
          font-size: 10px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      `}</style>
        </div>
    );
}
