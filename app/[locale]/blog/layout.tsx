import AdUnit from "../../components/AdUnit";
import Link from "next/link";
import ScrollToTop from "../../components/ScrollToTop";

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <ScrollToTop />
            <div className="flex-1 flex pt-20">
                {/* Left Sidebar Ad */}
                <aside className="ad-sidebar ad-sidebar-left">
                    {/* <AdUnit slot="sidebar_left" className="h-[600px]" />
                    <div className="text-[10px] text-[var(--muted-text)] mt-3 text-center">Ad Space</div> */}
                </aside>

                {/* Content */}
                <main className="flex-1 min-w-0 flex flex-col">
                    {children}
                </main>

                {/* Right Sidebar Ad */}
                <aside className="ad-sidebar ad-sidebar-right">
                    {/* <AdUnit slot="sidebar_right" className="h-[600px]" />
                    <div className="text-[10px] text-[var(--muted-text)] mt-3 text-center">Ad Space</div> */}
                </aside>
            </div>

            {/* Global Footer */}
            <div className="max-w-[1200px] mx-auto px-6 w-full">
                {/* <AdUnit slot="tool_footer" /> */}
            </div>
        </div>
    );
}
