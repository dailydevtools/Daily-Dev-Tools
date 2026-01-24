import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../globals-new.css";
import CommandPalette from "../components/CommandPalette";
import BackToTop from "../components/BackToTop";
import RecentToolsTracker from "../components/RecentToolsTracker";
import { ThemeProvider } from "../components/ThemeProvider";
import FeedbackForm from "../components/FeedbackForm";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Script from "next/script";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-inter",
});

const siteUrl = "https://dailydev.tools";

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getMessages({ locale });
    const messages = t as any; // Type assertion since getMessages returns AbstractIntlMessages

    const title = messages.Metadata?.title || "DailyDevTools - Free Online Developer Tools";
    const description = messages.Metadata?.description || "90+ free online tools for everyone. Formatters, converters, generators, and utilities. Fast, private, and no registration required.";

    return {
        metadataBase: new URL(siteUrl),
        title: {
            default: title,
            template: "%s | DailyDevTools",
        },
        description: description,
        keywords: [
            "developer tools",
            "online tools",
            "json formatter",
            "base64 encoder",
            "url encoder",
            "uuid generator",
            "hash generator",
            "regex tester",
            "free tools",
            "web tools",
            "coding tools",
        ],
        authors: [{ name: "Sohan Paliyal", url: "https://sohanpaliyal.github.io" }],
        creator: "Sohan Paliyal",
        publisher: "DailyDevTools",
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
        openGraph: {
            type: "website",
            locale: locale === 'en' ? 'en_US' : 'es_ES',
            url: `${siteUrl}/${locale}`,
            siteName: "DailyDevTools",
            title: title,
            description: description,
            images: [
                {
                    url: "/og-image.png",
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: title,
            description: description,
            images: ["/og-image.png"],
            creator: "@sohanpaliyal",
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        alternates: {
            canonical: `${siteUrl}/${locale}`,
            languages: {
                'en': `${siteUrl}/en`,
                'es': `${siteUrl}/es`,
            },
        },
        category: "technology",
        icons: {
            icon: '/project_logo.png',
            shortcut: '/project_logo.png',
            apple: '/project_logo.png',
        },
    };
}

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    ],
    width: "device-width",
    initialScale: 1,
};

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    const gaId = process.env.NEXT_PUBLIC_GA_ID;

    return (
        <html lang={locale} suppressHydrationWarning>
            <head>
                <link rel="manifest" href="/manifest.json" />
            </head>
            <body className={`${inter.variable} font-sans`} suppressHydrationWarning>
                {gaId && (
                    <>
                        <Script
                            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                            strategy="afterInteractive"
                        />
                        <Script id="google-analytics" strategy="afterInteractive">
                            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
                        </Script>
                    </>
                )}
                <NextIntlClientProvider messages={messages}>
                    <ThemeProvider>
                        <CommandPalette />
                        <BackToTop />
                        <FeedbackForm />
                        <RecentToolsTracker />
                        <Header />
                        {children}
                        <Footer />
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
