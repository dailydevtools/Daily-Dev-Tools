import AdUnit from "../components/AdUnit";
import RelatedTools from "../components/RelatedTools";
import ShareButton from "../components/ShareButton";
import Breadcrumb from "../components/Breadcrumb";
import ScrollToTop from "../components/ScrollToTop";

export default function ToolsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <ScrollToTop />
            {/* Main Grid Layout: Left Ad | Content | Right Ad */}
            <div style={{ flex: 1, display: 'flex', paddingTop: 64 }}> {/* Add padding for fixed header */}

                {/* Left Sidebar Ad */}
                <aside className="ad-sidebar ad-sidebar-left">
                    {/* <AdUnit slot="sidebar_left" className="h-[600px]" />
                    <div style={{ fontSize: 10, color: '#374151', marginTop: 12, textAlign: 'center' }}>Ad Space</div> */}
                </aside>

                {/* Tool Content */}
                <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ maxWidth: 1000, margin: '0 auto', width: '100%', padding: '24px 24px 0' }}>
                        <Breadcrumb />
                    </div>
                    {children}

                    {/* Engagement Section (Share + Related) */}
                    <section style={{ maxWidth: 1000, margin: '0 auto', width: '100%', padding: '0 24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 60, marginBottom: 20 }}>
                            <ShareButton />
                        </div>
                        <RelatedTools />
                    </section>
                </main>

                {/* Right Sidebar Ad */}
                <aside className="ad-sidebar ad-sidebar-right">
                    {/* <AdUnit slot="sidebar_right" className="h-[600px]" />
                    <div style={{ fontSize: 10, color: '#374151', marginTop: 12, textAlign: 'center' }}>Ad Space</div> */}
                </aside>

            </div>

            {/* Global Tool Footer */}
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', width: '100%' }}>
                {/* <AdUnit slot="tool_footer" /> */}
            </div>
        </div>
    );
}
