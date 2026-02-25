import { useState, useEffect, ReactNode } from 'react';
import ToolTabs from '../components/ToolTabs';
import JsonFormatter from '../components/tools/JsonFormatter';
import Base64Tool from '../components/tools/Base64Tool';
import UrlEncoder from '../components/tools/UrlEncoder';
import JwtDecoder from '../components/tools/JwtDecoder';
import UuidGenerator from '../components/tools/UuidGenerator';
import HashGenerator from '../components/tools/HashGenerator';
import TimestampTool from '../components/tools/TimestampTool';
import CaseConverter from '../components/tools/CaseConverter';
import ColorConverter from '../components/tools/ColorConverter';
import LoremIpsum from '../components/tools/LoremIpsum';
import RegexTester from '../components/tools/RegexTester';
import {
    JsonIcon, Base64Icon, UrlIcon, JwtIcon, ExternalLinkIcon,
    UuidIcon, HashIcon, ClockIcon, CaseIcon, ColorIcon, TextIcon, RegexIcon, CoffeeIcon
} from '../components/icons';

type Tool = 'json' | 'base64' | 'url' | 'jwt' | 'uuid' | 'hash' | 'timestamp' | 'case' | 'color' | 'lorem' | 'regex';

const TOOLS: { id: Tool; label: string; icon: ReactNode }[] = [
    { id: 'json', label: 'JSON', icon: <JsonIcon /> },
    { id: 'base64', label: 'Base64', icon: <Base64Icon /> },
    { id: 'url', label: 'URL', icon: <UrlIcon /> },
    { id: 'jwt', label: 'JWT', icon: <JwtIcon /> },
    { id: 'uuid', label: 'UUID', icon: <UuidIcon /> },
    { id: 'hash', label: 'Hash', icon: <HashIcon /> },
    { id: 'timestamp', label: 'Time', icon: <ClockIcon /> },
    { id: 'case', label: 'Case', icon: <CaseIcon /> },
    { id: 'color', label: 'Color', icon: <ColorIcon /> },
    { id: 'lorem', label: 'Lorem', icon: <TextIcon /> },
    { id: 'regex', label: 'Regex', icon: <RegexIcon /> },
];

export default function App() {
    const [activeTool, setActiveTool] = useState<Tool>('json');

    useEffect(() => {
        chrome.storage.local.get(['lastTool'], (result) => {
            if (result.lastTool && TOOLS.some(t => t.id === result.lastTool)) {
                setActiveTool(result.lastTool);
            }
        });
    }, []);

    const handleToolChange = (tool: Tool) => {
        setActiveTool(tool);
        chrome.storage.local.set({ lastTool: tool });
    };

    const renderTool = () => {
        switch (activeTool) {
            case 'json': return <JsonFormatter />;
            case 'base64': return <Base64Tool />;
            case 'url': return <UrlEncoder />;
            case 'jwt': return <JwtDecoder />;
            case 'uuid': return <UuidGenerator />;
            case 'hash': return <HashGenerator />;
            case 'timestamp': return <TimestampTool />;
            case 'case': return <CaseConverter />;
            case 'color': return <ColorConverter />;
            case 'lorem': return <LoremIpsum />;
            case 'regex': return <RegexTester />;
            default: return <JsonFormatter />;
        }
    };

    return (
        <div className="app">
            <header className="header">
                <div className="logo">
                    <img src="/logo.webp" alt="DailyDevTools" className="logo-img" />
                    <span className="logo-text">DailyDevTools</span>
                </div>
            </header>

            <ToolTabs tools={TOOLS} activeTool={activeTool} onChange={handleToolChange} />

            <main className="main">{renderTool()}</main>

            <footer className="footer">
                <a href="https://dailydev.tools/en" target="_blank" rel="noopener noreferrer" className="footer-link">
                    <ExternalLinkIcon /> DailyDev.Tools
                </a>
                <a href="https://buymeacoffee.com/sohanpaliyal" target="_blank" rel="noopener noreferrer" className="coffee-link" title="Buy me a coffee">
                    <CoffeeIcon />
                </a>
            </footer>

            <style>{`
                .app { display: flex; flex-direction: column; min-height: 100vh; }
                .header { padding: 12px 16px; border-bottom: 1px solid var(--border-color); background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%); }
                .logo { display: flex; align-items: center; gap: 8px; }
                .logo-img { width: 32px; height: 32px; border-radius: 6px; }
                .logo-text { font-weight: 600; font-size: 14px; background: linear-gradient(135deg, var(--text-primary) 0%, var(--accent) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
                .main { flex: 1; padding: 16px; overflow-y: auto; }
                .footer { padding: 12px 16px; border-top: 1px solid var(--border-color); background: var(--bg-secondary); display: flex; justify-content: center; align-items: center; gap: 16px; }
                .footer-link { display: inline-flex; align-items: center; gap: 6px; color: var(--accent); text-decoration: none; font-size: 12px; font-weight: 500; transition: all 0.2s; }
                .footer-link:hover { color: var(--accent-hover); }
                .coffee-link { color: var(--text-muted); transition: all 0.2s; display: flex; align-items: center; }
                .coffee-link:hover { color: #FFDD00; }
            `}</style>
        </div>
    );
}
