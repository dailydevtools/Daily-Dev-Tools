import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const { hostname } = request.nextUrl;
    const host = request.headers.get('host');

    // Redirect to www.dailydev.tools if hostname is dailydev.tools
    // This only runs in production environment where we expect the actual domain
    if (process.env.NODE_ENV === 'production' && host === 'dailydev.tools') {
        return NextResponse.redirect(`https://www.dailydev.tools${request.nextUrl.pathname}${request.nextUrl.search}`, 301);
    }

    return intlMiddleware(request);
}

export const config = {
    // Match only internationalized pathnames
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
