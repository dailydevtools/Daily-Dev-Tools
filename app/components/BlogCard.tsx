import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
}

export default function BlogCard({ post }: { post: BlogPost }) {
    const t = useTranslations('Blog');

    return (
        <Link
            href={`/blog/${post.slug}`}
            className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[20px] transition-all duration-300 text-[var(--foreground)] hover:bg-[var(--card-hover-bg)] hover:border-[#f9731666] hover:-translate-y-1 flex flex-col h-full no-underline overflow-hidden"
        >
            <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#f973161a] border border-[#f9731633] rounded-full text-[13px] text-[#fb923c]">{post.category}</span>
                    <div className="flex items-center gap-1.5 text-xs text-[var(--muted-text)]">
                        <Calendar size={14} />
                        {post.date}
                    </div>
                </div>

                <h3 className="text-xl font-bold text-[var(--title-color)] mb-3 leading-snug">
                    {post.title}
                </h3>

                <p className="text-[var(--muted-text)] text-[15px] leading-relaxed mb-6 flex-1">
                    {post.excerpt}
                </p>

                <div className="flex items-center justify-between border-t border-[var(--border-color)] pt-4 mt-auto">
                    <div className="flex items-center gap-1.5 text-[13px] text-[var(--muted-text)]">
                        <Clock size={14} />
                        {post.readTime}
                    </div>
                    <div className="flex items-center gap-2 text-[#fb923c] text-sm font-medium">
                        {t('readMore')}
                        <ArrowRight size={16} />
                    </div>
                </div>
            </div>
        </Link>
    );
}
