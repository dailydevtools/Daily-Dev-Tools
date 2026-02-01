import AdUnit from "../../components/AdUnit";
import RelatedTools from "../../components/RelatedTools";
import ShareButton from "../../components/ShareButton";
import Breadcrumb from "../../components/Breadcrumb";
import ScrollToTop from "../../components/ScrollToTop";
import RecentToolsTracker from "../../components/RecentToolsTracker";
import Comments from "../../components/Comments";
import ToolSchemaWrapper from "../../components/ToolSchemaWrapper";

export default function ToolsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <ToolSchemaWrapper />
            <RecentToolsTracker />
            <ScrollToTop />
            {/* Main Grid Layout: Left Ad | Content | Right Ad */}
            <div className="flex-1 flex pt-24"> {/* Add padding for fixed header */}

                {/* Left Sidebar Ad */}
                <aside className="hidden xl:hidden min-[1400px]:flex w-[160px] shrink-0 pt-[120px] h-screen sticky top-0 flex-col items-center border-r border-[var(--border-color)]">
                    {/* <AdUnit slot="sidebar_left" className="h-[600px]" />
                    <div className="text-[10px] text-[#374151] mt-3 text-center">Ad Space</div> */}
                </aside>

                {/* Tool Content */}
                <main className="flex-1 min-w-0 flex flex-col">
                    <div className="max-w-[1200px] mx-auto w-full px-2 pt-6 flex justify-between items-center">
                        <Breadcrumb />
                        <ShareButton />
                    </div>
                    {children}

                    {/* Engagement Section (Share + Related) */}
                    <section className="max-w-[1200px] mx-auto w-full px-6">
                        <div className="mt-[60px] mb-5">
                            {/* ShareButton moved to top */}
                        </div>
                        <Comments />
                        <RelatedTools />
                    </section>
                </main>

                {/* Right Sidebar Ad */}
                <aside className="hidden xl:hidden min-[1400px]:flex w-[160px] shrink-0 pt-[120px] h-screen sticky top-0 flex-col items-center border-l border-[var(--border-color)]">
                    {/* <AdUnit slot="sidebar_right" className="h-[600px]" />
                    <div className="text-[10px] text-[#374151] mt-3 text-center">Ad Space</div> */}
                </aside>

            </div>

            {/* Global Tool Footer */}
            <div className="max-w-[1200px] mx-auto px-6 w-full">
                {/* <AdUnit slot="tool_footer" /> */}
            </div>
        </div>
    );
}
