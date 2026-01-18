import AdUnit from "../components/AdUnit";
import Link from "next/link";
import ScrollToTop from "../components/ScrollToTop";

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <ScrollToTop />
            <div style={{ flex: 1, display: 'flex', paddingTop: 80 }}>
                {/* Left Sidebar Ad */}
                <aside className="ad-sidebar ad-sidebar-left">
                    {/* <AdUnit slot="sidebar_left" className="h-[600px]" />
                    <div style={{ fontSize: 10, color: 'var(--muted-text)', marginTop: 12, textAlign: 'center' }}>Ad Space</div> */}
                </aside>

                {/* Content */}
                <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                    {children}
                </main>

                {/* Right Sidebar Ad */}
                <aside className="ad-sidebar ad-sidebar-right">
                    {/* <AdUnit slot="sidebar_right" className="h-[600px]" />
                    <div style={{ fontSize: 10, color: 'var(--muted-text)', marginTop: 12, textAlign: 'center' }}>Ad Space</div> */}
                </aside>
            </div>

            {/* Global Footer */}
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', width: '100%' }}>
                {/* <AdUnit slot="tool_footer" /> */}
            </div>
        </div>
    );
}
