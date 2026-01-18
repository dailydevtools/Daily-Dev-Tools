import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service - DailyDevTools',
    description: 'Terms of Service for using DailyDevTools.',
};

export default function TermsPage() {
    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 24px' }}>
            <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24, color: 'var(--title-color)' }}>Terms of Service</h1>
            <div className="prose">
                <p>Last updated: {new Date().toLocaleDateString()}</p>

                <h2>1. Acceptance of Terms</h2>
                <p>
                    By accessing and using DailyDevTools, you accept and agree to be bound by the terms and provision of this agreement.
                </p>

                <h2>2. Use License</h2>
                <p>
                    DailyDevTools is free to use for personal and commercial purposes. You may not:
                </p>
                <ul>
                    <li>Attempt to reverse engineer or scrape significant portions of the site.</li>
                    <li>Use the website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website.</li>
                </ul>

                <h2>3. Disclaimer</h2>
                <p>
                    The tools on DailyDevTools are provided "as is". We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties.
                    Further, we do not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the tools.
                    Always verify important data processing results.
                </p>

                <h2>4. Limitations</h2>
                <p>
                    In no event shall DailyDevTools or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit)
                    arising out of the use or inability to use the tools on DailyDevTools.
                </p>

                <h2>5. Revisions</h2>
                <p>
                    The materials appearing on DailyDevTools could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete, or current.
                </p>
            </div>
        </div>
    );
}
