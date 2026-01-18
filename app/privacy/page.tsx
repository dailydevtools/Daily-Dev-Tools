import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy - DailyDevTools',
    description: 'Privacy Policy for DailyDevTools. We process your data locally in your browser.',
};

export default function PrivacyPage() {
    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 24px' }}>
            <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24, color: 'var(--title-color)' }}>Privacy Policy</h1>
            <div className="prose">
                <p>Last updated: {new Date().toLocaleDateString()}</p>

                <h2>1. Introduction</h2>
                <p>
                    Welcome to DailyDevTools. We respect your privacy and are committed to protecting your personal data.
                    This privacy policy will inform you as to how we look after your personal data when you visit our website
                    and tell you about your privacy rights.
                </p>

                <h2>2. How Our Tools Work (Local Processing)</h2>
                <p>
                    <strong>Most importantly:</strong> The tools on DailyDevTools run entirely in your browser (client-side).
                    When you paste data (like JSON, Code, or Images) into our tools, that data <strong>never leaves your device</strong>.
                    It is processed locally by your web browser and is not sent to our servers.
                </p>

                <h2>3. Data We Collect</h2>
                <p>
                    Since our tools run locally, we do not collect, store, or transmit the content you generate or format using our tools.
                </p>
                <p>
                    However, we do collect anonymous usage statistics to improve our service:
                </p>
                <ul>
                    <li><strong>Analytics:</strong> We use Google Analytics to understand how visitors interact with our website. This includes data such as pages visited, time spent on the site, and basic device information (e.g., screen size, browser type). This data is anonymized and does not identify you personally.</li>
                </ul>

                <h2>4. Cookies</h2>
                <p>
                    We use cookies primarily for analytical purposes (Google Analytics) and to save your local preferences (like "Recent Tools" or "Favorites").
                    You can choose to disable cookies through your browser settings, though this may affect your ability to save preferences.
                </p>

                <h2>5. Third-Party Links</h2>
                <p>
                    Our website may include links to third-party websites, plug-ins, and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
                </p>

                <h2>6. Changes to This Policy</h2>
                <p>
                    We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.
                </p>

                <h2>7. Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please contact us via our GitHub or social media channels linked in the footer.
                </p>
            </div>
        </div>
    );
}
