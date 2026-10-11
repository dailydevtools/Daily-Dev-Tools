import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['en', 'es', 'ja', 'zh', 'fr', 'de', 'it', 'pt', 'ru', 'ko', 'ar', 'hi', 'id', 'tr', 'vi', 'th', 'nl', 'pl', 'bn', 'uk', 'he', 'ms', 'el', 'ro', 'sv', 'da', 'no', 'cs', 'hu'];

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: locales,

    // Used when no locale matches
    defaultLocale: 'en',

    // Stable URLs: language preferences must not redirect canonical English URLs.
    localeDetection: false,

    // The default locale is served without a prefix (e.g. "/tools" not "/en/tools"),
    // so the homepage responds 200 at the exact root URL instead of redirecting —
    // required for Google's HTML-tag site verification, which doesn't follow redirects.
    localePrefix: 'as-needed'
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);
