import type { Metadata } from 'next';
import { Shield, Zap, Code, Heart } from 'lucide-react';

export const metadata: Metadata = {
    title: 'About DailyDevTools - Our Mission',
    description: 'Learn about DailyDevTools and our mission to build fast, private, and free developer tools that run entirely in your browser.',
};

export default function AboutPage() {
    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
                <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, marginBottom: 24, color: 'var(--title-color)', lineHeight: 1.1 }}>
                    Tools that respect your <span className="gradient-text">Privacy</span>
                </h1>
                <p style={{ color: 'var(--muted-text)', fontSize: 18, maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
                    DailyDevTools was built with a simple mission: proper developer tools shouldn't require a server round-trip.
                </p>
            </div>

            <div style={{ display: 'grid', gap: 40 }}>
                <section className="glass-card" style={{ padding: 32, borderRadius: 24, border: '1px solid var(--border-color)' }}>
                    <div className="icon-box-primary" style={{ width: 48, height: 48, marginBottom: 20 }}>
                        <Shield size={24} />
                    </div>
                    <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: 'var(--title-color)' }}>100% Client-Side</h2>
                    <p style={{ color: 'var(--foreground)', lineHeight: 1.7 }}>
                        When you paste your JSON, SQL, or identifying data into DailyDevTools, it <strong>never leaves your browser</strong>.
                        We use modern JavaScript APIs to process everything on your device. This means your data is safe, secure,
                        and never logged on our servers (because we don't even see it).
                    </p>
                </section>

                <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
                    <div className="glass-card" style={{ padding: 24, borderRadius: 20, border: '1px solid var(--border-color)' }}>
                        <Zap size={24} style={{ color: '#fb923c', marginBottom: 16 }} />
                        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: 'var(--title-color)' }}>Lightning Fast</h3>
                        <p style={{ color: 'var(--muted-text)', fontSize: 14, lineHeight: 1.6 }}>
                            No network latency. Results appear instantly as you type because the computation happens locally.
                        </p>
                    </div>
                    <div className="glass-card" style={{ padding: 24, borderRadius: 20, border: '1px solid var(--border-color)' }}>
                        <Heart size={24} style={{ color: '#fb923c', marginBottom: 16 }} />
                        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: 'var(--title-color)' }}>Always Free</h3>
                        <p style={{ color: 'var(--muted-text)', fontSize: 14, lineHeight: 1.6 }}>
                            We believe basic utilities should be accessible to everyone. No paywalls, no "pro" plans for basic features.
                        </p>
                    </div>
                </section>

                <section className="glass-card" style={{ padding: 32, borderRadius: 24, border: '1px solid var(--border-color)', textAlign: 'center' }}>
                    <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: 'var(--title-color)' }}>Open Source at Heart</h2>
                    <p style={{ color: 'var(--foreground)', lineHeight: 1.7, marginBottom: 24 }}>
                        We love the developer community. If you have suggestions or want to report a bug, reach out to us.
                    </p>
                    <a href="https://github.com/sohanpaliyal" target="_blank" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <Code size={18} />
                        View on GitHub
                    </a>
                </section>
            </div>
        </div>
    );
}
