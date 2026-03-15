import { useRef, useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ExternalLinkIcon, ZapIcon } from './icons';
import ToolIcon from './ToolIcon';

interface Tool {
  id: string;
  label: string;
  iconName: string;
  isExternal?: boolean;
  externalUrl?: string;
}

interface ToolTabsProps {
  tools: Tool[];
  activeTool: string;
  onChange: (id: any) => void;
}

export default function ToolTabs({ tools, activeTool, onChange }: ToolTabsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [tools]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -150 : 150;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="carousel-container">
      {showLeftArrow && (
        <button className="carousel-btn left" onClick={() => scroll('left')}>
          <ChevronLeftIcon />
        </button>
      )}

      <div className="tool-tabs" ref={scrollContainerRef} onScroll={checkScroll}>
        {tools.map((tool) => (
          <button
            key={tool.id}
            className={`tool-tab ${activeTool === tool.id ? 'active' : ''}`}
            onClick={() => {
              if (tool.isExternal && tool.externalUrl) {
                window.open(tool.externalUrl, '_blank');
              } else {
                onChange(tool.id);
              }
            }}
          >
            <div className="tab-icon-wrapper">
              <span className="tab-icon">
                <ToolIcon name={tool.iconName} size={16} />
              </span>
              {tool.isExternal ? (
                <span className="tool-badge external" title="Opens in new tab">
                  <ExternalLinkIcon size={8} />
                </span>
              ) : (
                <span className="tool-badge native" title="Built-in tool">
                  <ZapIcon size={8} />
                </span>
              )}
            </div>
            <span className="tab-label">{tool.label}</span>
          </button>
        ))}
      </div>

      {showRightArrow && (
        <button className="carousel-btn right" onClick={() => scroll('right')}>
          <ChevronRightIcon />
        </button>
      )}

      <style>{`
        .carousel-container {
          position: relative;
          display: flex;
          align-items: center;
          background: var(--bg-primary);
          border-bottom: 1px solid var(--border-color);
        }

        .carousel-btn {
          position: absolute;
          z-index: 10;
          height: 100%;
          background: var(--bg-primary);
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s;
        }

        .carousel-btn:hover {
          color: var(--accent);
        }

        .carousel-btn.left {
          left: 0;
          background: linear-gradient(90deg, var(--bg-primary) 70%, transparent);
          padding: 0 12px 0 4px;
        }

        .carousel-btn.right {
          right: 0;
          background: linear-gradient(270deg, var(--bg-primary) 70%, transparent);
          padding: 0 4px 0 12px;
        }

        .tool-tabs {
          display: flex;
          padding: 8px;
          gap: 4px;
          overflow-x: auto;
          scrollbar-width: none;
          flex: 1;
          scroll-behavior: smooth;
        }

        .tool-tabs::-webkit-scrollbar {
          display: none;
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
          background: transparent;
          border: none;
          cursor: pointer;
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

        .tab-icon-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tool-badge {
          position: absolute;
          top: -3px;
          right: -3px;
          background: var(--bg-primary);
          border-radius: 4px;
          padding: 1.5px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-color);
          box-shadow: 0 1px 3px rgba(0,0,0,0.15);
          transition: all 0.2s;
        }

        .tool-badge.external {
          color: var(--text-muted);
        }

        .tool-badge.native {
          color: #fbbf24; /* Amber/Yellow for native */
          background: rgba(251, 191, 36, 0.05);
        }

        .tool-tab.active .tool-badge.external {
          color: var(--accent);
          border-color: rgba(249, 115, 22, 0.2);
        }

        .tool-tab.active .tool-badge.native {
          color: #fbbf24;
          border-color: rgba(251, 191, 36, 0.3);
          background: rgba(251, 191, 36, 0.1);
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
