import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="footer">
            <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 16px' }}>
                <div className="footer-content">
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
                        <Image src="/project_logo.png" alt="DailyDevTools Logo" width={36} height={36} />
                        <span style={{ fontWeight: 600, color: 'var(--title-color)' }}>DailyDevTools</span>
                    </Link>
                    <p style={{ color: 'var(--muted-text)', fontSize: 13, textAlign: 'center' }}>
                        Built with ❤️ by{' '}
                        <a href="https://sohanpaliyal.github.io" target="_blank" style={{ color: '#fb923c', textDecoration: 'none' }}>
                            Sohan Paliyal
                        </a>
                    </p>
                    <div className="footer-links">
                        <Link href="/#tools" style={{ color: 'var(--muted-text)', textDecoration: 'none' }}>All Tools</Link>
                        <Link href="/blog" style={{ color: 'var(--muted-text)', textDecoration: 'none' }}>Blog</Link>
                        <Link href="/about" style={{ color: 'var(--muted-text)', textDecoration: 'none' }}>About</Link>
                        <Link href="/privacy" style={{ color: 'var(--muted-text)', textDecoration: 'none' }}>Privacy</Link>
                        <Link href="/terms" style={{ color: 'var(--muted-text)', textDecoration: 'none' }}>Terms</Link>
                        <a href="https://github.com/sohanpaliyal" target="_blank" style={{ color: 'var(--muted-text)', textDecoration: 'none' }}>GitHub</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
