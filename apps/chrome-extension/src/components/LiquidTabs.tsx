import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Tool {
    id: string;
    label: string;
    icon: ReactNode;
}

interface LiquidTabsProps {
    tools: Tool[];
    activeTool: string;
    onChange: (id: any) => void;
}

export default function LiquidTabs({ tools, activeTool, onChange }: LiquidTabsProps) {
    return (
        <div className="liquid-tabs">
            <div className="tabs-container">
                {tools.map((tool) => (
                    <button
                        key={tool.id}
                        className={`tab-button ${activeTool === tool.id ? 'active' : ''}`}
                        onClick={() => onChange(tool.id)}
                    >
                        {activeTool === tool.id && (
                            <motion.div
                                layoutId="active-tab-pill"
                                className="active-pill"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                        )}
                        <span className="tab-icon">{tool.icon}</span>
                        <span className="tab-label">{tool.label}</span>
                    </button>
                ))}
            </div>

            <style>{`
        .liquid-tabs {
          padding: 10px;
          background: linear-gradient(180deg, rgba(20, 20, 20, 0.8) 0%, rgba(10, 10, 10, 0.9) 100%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .tabs-container {
          display: flex;
          gap: 4px;
          padding: 4px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: 
            0 4px 24px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .tab-button {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 10px 8px;
          border-radius: 10px;
          position: relative;
          transition: all 0.2s ease;
          color: rgba(255, 255, 255, 0.4);
          z-index: 1;
        }

        .tab-button:hover {
          color: rgba(255, 255, 255, 0.7);
        }

        .tab-button.active {
          color: white;
        }

        .active-pill {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.9) 0%, rgba(251, 146, 60, 0.8) 100%);
          border-radius: 10px;
          z-index: -1;
          box-shadow: 
            0 4px 16px rgba(249, 115, 22, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.1) inset;
        }

        .tab-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          transition: transform 0.2s ease;
        }

        .tab-button.active .tab-icon {
          transform: scale(1.1);
        }

        .tab-label {
          font-size: 9px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      `}</style>
        </div>
    );
}
