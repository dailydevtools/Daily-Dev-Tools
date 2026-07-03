import RelatedTools from "../../components/RelatedTools";
import ShareButton from "../../components/ShareButton";
import Breadcrumb from "../../components/Breadcrumb";
import ScrollToTop from "../../components/ScrollToTop";
import RecentToolsTracker from "../../components/RecentToolsTracker";
import Comments from "../../components/Comments";
import ToolSchemaWrapper from "../../components/ToolSchemaWrapper";
import ToolSEOContent from "../../components/ToolSEOContent";
import ChromeExtensionBanner from "../../components/ChromeExtensionBanner";

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

            <div className="flex-1 flex pt-24">
                <main className="flex-1 min-w-0 flex flex-col">
                    {/* Breadcrumb + share row */}
                    <div className="max-w-[1200px] mx-auto w-full px-4 pt-6 flex justify-between items-center">
                        <Breadcrumb />
                        <ShareButton />
                    </div>

                    {/* The tool UI itself */}
                    {children}

                    {/* Chrome extension CTA */}
                    <ChromeExtensionBanner />

                    {/* SEO content: About / How to use / FAQ — only for tools with content */}
                    <ToolSEOContent />

                    {/* Comments + related tools */}
                    <section className="max-w-[1200px] mx-auto w-full px-6 pb-16">
                        <Comments />
                        <RelatedTools />
                    </section>
                </main>
            </div>
        </div>
    );
}
