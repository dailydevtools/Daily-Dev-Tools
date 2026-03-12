import { useState, useEffect } from 'react';

export default function WordCounter() {
    const [text, setText] = useState('');
    const [stats, setStats] = useState({
        words: 0,
        chars: 0,
        charsNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
    });

    useEffect(() => {
        const analyzeText = () => {
             if (!text) {
                 setStats({ words: 0, chars: 0, charsNoSpaces: 0, sentences: 0, paragraphs: 0 });
                 return;
             }
     
             const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
             const chars = text.length;
             const charsNoSpaces = text.replace(/\s/g, '').length;
             const sentences = text.split(/[.!?]+/).filter(Boolean).length;
             const paragraphs = text.split(/\n\n+/).filter(Boolean).length;
     
             setStats({ words, chars, charsNoSpaces, sentences, paragraphs });
         };
         analyzeText();
    }, [text]);

    return (
        <div className="tool-container">
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-value text-orange">{stats.words}</div>
                    <div className="stat-label">Words</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value text-yellow">{stats.chars}</div>
                    <div className="stat-label">Characters</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value text-green">{stats.sentences}</div>
                    <div className="stat-label">Sentences</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value text-blue">{stats.paragraphs}</div>
                    <div className="stat-label">Paragraphs</div>
                </div>
            </div>

            <div className="tool-section">
                <label className="section-label">Text Input</label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste text here..."
                    className="text-input textarea"
                    spellCheck={false}
                />
            </div>

            <style>{`
                .tool-container { display: flex; flex-direction: column; gap: 16px; }
                .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
                .stat-card { background: var(--bg-tertiary); padding: 12px; border-radius: 8px; text-align: center; border: 1px solid var(--border-color); }
                .stat-value { font-size: 24px; font-weight: 700; margin-bottom: 4px; }
                .stat-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted); }
                .text-orange { color: #fb923c; } .text-yellow { color: #facc15; } .text-green { color: #4ade80; } .text-blue { color: #60a5fa; }
                .tool-section { display: flex; flex-direction: column; gap: 8px; }
                .section-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-secondary); }
                .text-input { padding: 10px 12px; font-size: 13px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-tertiary); color: var(--text-primary); width: 100%; border-sizing: border-box; }
                .textarea { min-height: 150px; resize: vertical; }
                .text-input:focus { outline: none; border-color: var(--accent); }
            `}</style>
        </div>
    );
}
