import { useState, useEffect, ReactNode } from 'react';
import LiquidTabs from '../components/LiquidTabs';
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

            <LiquidTabs
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
          padding: 14px 16px;
          background: linear-gradient(180deg, rgba(20, 20, 20, 0.95) 0%, rgba(10, 10, 10, 0.9) 100%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-icon {
          display: flex;
          align-items: center;
          color: var(--accent);
          filter: drop-shadow(0 0 8px rgba(249, 115, 22, 0.5));
        }

        .logo-text {
          font-weight: 700;
          font-size: 15px;
          background: linear-gradient(135deg, #ffffff 0%, var(--accent) 100%);
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
          padding: 14px 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          background: linear-gradient(180deg, rgba(10, 10, 10, 0.9) 0%, rgba(5, 5, 5, 0.95) 100%);
          text-align: center;
        }

        .footer-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--text-muted);
          text-decoration: none;
          font-size: 11px;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          transition: all 0.2s ease;
        }

        .footer-link:hover {
          color: var(--accent);
          border-color: rgba(249, 115, 22, 0.3);
          background: rgba(249, 115, 22, 0.1);
        }
      `}</style>
        </div>
    );
}
