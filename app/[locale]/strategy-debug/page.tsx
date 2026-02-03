import { execSync } from 'child_process';
import path from 'path';

export async function generateMetadata() {
    return {
        title: 'Strategy Debug - DailyDevTools',
        description: 'Internal debug page',
        robots: {
            index: false,
            follow: false,
        }
    };
}


export default function StrategyDebug() {
    let content = '';
    try {
        const filePath = path.join(process.cwd(), 'strategy.md');
        // Try to unzip the word/document.xml content
        // -p pipes content to stdout
        content = execSync(`unzip -p "${filePath}" word/document.xml`, { encoding: 'utf-8' });
    } catch (e: any) {
        content = 'Error reading/unzipping file: ' + e.message;
    }

    return (
        <div style={{ padding: 40, whiteSpace: 'pre-wrap', fontFamily: 'monospace', color: 'white', background: 'black' }}>
            <h1>Strategy Document (Extracted XML)</h1>
            <hr />
            {content}
        </div>
    );
}
