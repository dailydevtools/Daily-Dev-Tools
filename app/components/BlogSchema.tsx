interface BlogSchemaProps {
    title: string;
    description: string;
    url: string;
    datePublished: string;
    author?: string;
}

export default function BlogSchema({ title, description, url, datePublished, author = "Sohan Paliyal" }: BlogSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "description": description,
        "url": url,
        "datePublished": datePublished,
        "dateModified": datePublished,
        "author": {
            "@type": "Person",
            "name": author,
            "url": "https://sohanpaliyal.github.io"
        },
        "publisher": {
            "@type": "Organization",
            "name": "DailyDevTools",
            "url": "https://www.dailydev.tools",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.dailydev.tools/icon-512.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
