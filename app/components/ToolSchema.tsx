interface ToolSchemaProps {
    name: string;
    description: string;
    url: string;
    category: string;
}

export default function ToolSchema({ name, description, url, category }: ToolSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": name,
        "description": description,
        "url": url,
        "applicationCategory": "DeveloperApplication",
        "applicationSubCategory": category,
        "operatingSystem": "Web Browser",
        "browserRequirements": "Requires JavaScript",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "provider": {
            "@type": "Organization",
            "name": "DailyDevTools",
            "url": "https://dailydev.tools"
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
