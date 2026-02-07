import { useState, useEffect, ReactNode } from 'react';
import ToolTabs from '../components/ToolTabs';
import JsonFormatter from '../components/tools/JsonFormatter';
import Base64Tool from '../components/tools/Base64Tool';
import UrlEncoder from '../components/tools/UrlEncoder';
import JwtDecoder from '../components/tools/JwtDecoder';
import { JsonIcon, Base64Icon, UrlIcon, JwtIcon, WrenchIcon, ExternalLinkIcon } from '../components/icons';

type Tool = 'json' | 'base64' | 'url' | 'jwt';

const TOOLS: { id: Tool; label: string; icon: ReactNode }[] = [
    { id: 'json', label: 'JSON', icon: <JsonIcon /> },
    { id: 'base64', label: 'Base64', icon: <Base64Icon /> },
    { id: 'url', label: 'URL', icon: <UrlIcon /> },
    { id: 'jwt', label: 'JWT', icon: <JwtIcon /> },
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
                    <span className="logo-icon"><WrenchIcon /></span>
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
                    href="https://dailydev.tools"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                >
                    <ExternalLinkIcon /> Open in DailyDev.Tools
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
          background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .logo-icon {
          display: flex;
          align-items: center;
          color: var(--accent);
        }

        .logo-text {
          font-weight: 600;
          font-size: 14px;
          background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
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
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--accent);
          text-decoration: none;
          font-size: 12px;
          font-weight: 500;
          transition: all 0.2s;
        }

        .footer-link:hover {
          color: var(--accent-hover);
          gap: 8px;
        }
      `}</style>
        </div>
    );
}
