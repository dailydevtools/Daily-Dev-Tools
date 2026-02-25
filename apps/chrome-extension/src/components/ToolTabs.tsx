import { ReactNode } from 'react';

interface Tool {
  id: string;
  label: string;
  icon: ReactNode;
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
          overflow-x: auto;
          scrollbar-width: thin;
          scrollbar-color: var(--border-color) transparent;
        }

        .tool-tabs::-webkit-scrollbar {
          height: 4px;
        }

        .tool-tabs::-webkit-scrollbar-track {
          background: transparent;
        }

        .tool-tabs::-webkit-scrollbar-thumb {
          background: var(--border-color);
          border-radius: 2px;
        }

        .tool-tab {
          flex: 0 0 auto;
          min-width: 52px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 10px 8px;
          border-radius: 10px;
          transition: all 0.2s ease;
          color: var(--text-muted);
          position: relative;
          overflow: hidden;
        }

        .tool-tab::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--accent) 0%, #fb923c 100%);
          opacity: 0;
          transition: opacity 0.2s;
        }

        .tool-tab:hover {
          background: var(--bg-tertiary);
          color: var(--text-secondary);
        }

        .tool-tab.active {
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(251, 146, 60, 0.1) 100%);
          color: var(--accent);
          box-shadow: inset 0 0 0 1px rgba(249, 115, 22, 0.3);
        }

        .tool-tab.active .tab-icon {
          transform: scale(1.1);
        }

        .tab-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          transition: transform 0.2s ease;
        }

        .tab-label {
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      `}</style>
    </div>
  );
}
