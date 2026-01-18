import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CommandPalette from "./components/CommandPalette";
import BackToTop from "./components/BackToTop";
import RecentToolsTracker from "./components/RecentToolsTracker";
import { ThemeProvider } from "./components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const siteUrl = "https://dailydev.tools";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DailyDevTools - Free Online Developer Tools",
    template: "%s | DailyDevTools",
  },
  description: "90+ free online tools for everyone. Formatters, converters, generators, and utilities. Fast, private, and no registration required.",
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
    locale: "en_US",
    url: siteUrl,
    siteName: "DailyDevTools",
    title: "DailyDevTools - Free Online Developer Tools",
    description: "90+ free online developer tools. Fast, private, and no registration required.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DailyDevTools - Free Online Developer Tools",
      },
      // ...
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DailyDevTools - Free Online Developer Tools",
    description: "90+ free online developer tools. Fast, private, and no registration required.",
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
    canonical: siteUrl,
  },
  category: "technology",
  icons: {
    icon: '/project_logo.png',
    shortcut: '/project_logo.png',
    apple: '/project_logo.png',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

import FeedbackForm from "./components/FeedbackForm";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Script from "next/script";

// ... imports ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" suppressHydrationWarning>
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
        <ThemeProvider>
          <CommandPalette />
          <BackToTop />
          <FeedbackForm />
          <RecentToolsTracker />
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html >
  );
}
