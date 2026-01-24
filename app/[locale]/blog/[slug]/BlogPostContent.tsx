import { useTranslations } from 'next-intl';

export type BlockType = 'h2' | 'h3' | 'p' | 'ul' | 'pre';

export interface ContentBlock {
    type: BlockType;
    key: string; // The translation key
    data?: any; // For special blocks like lists or code
}

interface BlogPostContentProps {
    slug: string;
    blocks: ContentBlock[];
}

export default function BlogPostContent({ slug, blocks }: BlogPostContentProps) {
    const t = useTranslations(`BlogContent.${slug}`);

    return (
        <div className="text-lg leading-[1.8] text-[var(--foreground)]">
            {blocks.map((block, index) => {
                const content = t.raw(block.key); // Use raw to allow inner HTML (like links)

                switch (block.type) {
                    case 'h2':
                        return (
                            <h2
                                key={index}
                                className="text-[28px] font-bold text-[var(--title-color)] mt-12 mb-6"
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        );
                    case 'h3':
                        return (
                            <h3
                                key={index}
                                className="text-[22px] font-semibold text-[var(--title-color)] mt-8 mb-4"
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        );
                    case 'p':
                        return (
                            <p
                                key={index}
                                className="mb-6 text-[var(--foreground)]"
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        );
                    case 'ul':
                        // For lists, we expect the translation to be an array or string containing <li>
                        return (
                            <ul
                                key={index}
                                className="list-disc pl-6 mb-6 text-[var(--foreground)]"
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        );
                    case 'pre':
                        return (
                            <pre key={index} className="bg-[var(--card-bg)] p-5 rounded-xl overflow-x-auto mb-8 border border-[var(--border-color)]">
                                <code className="bg-transparent p-0 text-[var(--foreground)] border-none">
                                    {content}
                                </code>
                            </pre>
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );
}
