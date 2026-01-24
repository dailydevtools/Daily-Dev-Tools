import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['en', 'es', 'ja', 'zh', 'fr', 'de', 'it', 'pt', 'ru', 'ko', 'ar', 'hi', 'id', 'tr', 'vi', 'th', 'nl', 'pl', 'bn', 'uk', 'he', 'ms', 'el', 'ro', 'sv', 'da', 'no', 'cs', 'hu'];

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: locales,

    // Used when no locale matches
    defaultLocale: 'en'
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);
