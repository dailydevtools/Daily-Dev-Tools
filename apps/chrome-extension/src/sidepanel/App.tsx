import { useState, useEffect } from 'react';
import ToolTabs from '../components/ToolTabs';
import JsonFormatter from '../components/tools/JsonFormatter';
import Base64Tool from '../components/tools/Base64Tool';
import UrlEncoder from '../components/tools/UrlEncoder';
import JwtDecoder from '../components/tools/JwtDecoder';

type Tool = 'json' | 'base64' | 'url' | 'jwt';

const TOOLS: { id: Tool; label: string; icon: string }[] = [
    { id: 'json', label: 'JSON', icon: '{ }' },
    { id: 'base64', label: 'Base64', icon: '🔐' },
    { id: 'url', label: 'URL', icon: '🔗' },
    { id: 'jwt', label: 'JWT', icon: '🎫' },
];

export default function App() {
    const [activeTool, setActiveTool] = useState<Tool>('json');

    // Restore last used tool from storage
    useEffect(() => {
        chrome.storage.local.get(['lastTool'], (result) => {
            if (result.lastTool && TOOLS.some(t => t.id === result.lastTool)) {
                setActiveTool(result.lastTool);
            }
        });
    }, []);

    // Save last used tool to storage
    const handleToolChange = (tool: Tool) => {
        setActiveTool(tool);
        chrome.storage.local.set({ lastTool: tool });
    };

    const renderTool = () => {
        switch (activeTool) {
            case 'json':
                return <JsonFormatter />;
            case 'base64':
                return <Base64Tool />;
            case 'url':
                return <UrlEncoder />;
            case 'jwt':
                return <JwtDecoder />;
            default:
                return <JsonFormatter />;
        }
    };

    return (
        <div className="app">
            <header className="header">
                <div className="logo">
                    <span className="logo-icon">🔧</span>
                    <span className="logo-text">DailyDevTools</span>
                </div>
            </header>

            <ToolTabs
                tools={TOOLS}
                activeTool={activeTool}
                onChange={handleToolChange}
            />

            <main className="main">
                {renderTool()}
            </main>

            <footer className="footer">
                <a
                    href="https://dailydevtools.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                >
                    ⚡ Open in DailyDevTools.com
                </a>
            </footer>

            <style>{`
        .app {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .header {
          padding: 12px 16px;
          border-bottom: 1px solid var(--border-color);
          background: var(--bg-secondary);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .logo-icon {
          font-size: 18px;
        }

        .logo-text {
          font-weight: 600;
          font-size: 14px;
          color: var(--text-primary);
        }

        .main {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
        }

        .footer {
          padding: 12px 16px;
          border-top: 1px solid var(--border-color);
          background: var(--bg-secondary);
          text-align: center;
        }

        .footer-link {
          color: var(--accent);
          text-decoration: none;
          font-size: 12px;
          font-weight: 500;
          transition: color 0.2s;
        }

        .footer-link:hover {
          color: var(--accent-hover);
        }
      `}</style>
        </div>
    );
}
