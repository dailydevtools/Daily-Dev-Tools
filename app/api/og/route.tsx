/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { tools } from '@/app/data/tools';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const toolId = searchParams.get('id');
    const titleParam = searchParams.get('title');
    const descParam = searchParams.get('description');

    const tool = tools.find((t) => t.id === toolId);
    const name = titleParam || tool?.name || 'Developer Tool';
    const description = descParam || tool?.description || 'Free online developer tool';

    // Clean description for display (truncate if too long)
    const displayDesc = description.length > 160 ? description.substring(0, 157) + '...' : description;

    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#0a0a0a',
                    backgroundImage: 'radial-gradient(circle at 25px 25px, #171717 2%, transparent 0%), radial-gradient(circle at 75px 75px, #171717 2%, transparent 0%)',
                    backgroundSize: '100px 100px',
                    color: 'white',
                    fontFamily: 'sans-serif',
                    textAlign: 'center',
                    padding: '40px',
                    position: 'relative',
                }}
            >
                {/* Background Glows */}
                <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'rgba(249, 115, 22, 0.1)', filter: 'blur(100px)' }}></div>
                <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'rgba(234, 179, 8, 0.1)', filter: 'blur(100px)' }}></div>

                {/* Content */}
                <div style={{ zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '40px',
                        padding: '20px',
                        borderRadius: '24px',
                        background: 'rgba(249, 115, 22, 0.1)',
                        border: '2px solid rgba(249, 115, 22, 0.2)',
                        color: '#fb923c'
                    }}>
                        {/* Generic Tool Icon (Wrench/Code hybrid) */}
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                        </svg>
                    </div>

                    <h1 style={{
                        fontSize: '72px',
                        fontWeight: '900',
                        margin: '0 0 24px 0',
                        color: 'white',
                        lineHeight: 1.1,
                        textShadow: '0 4px 30px rgba(0,0,0,0.5)'
                    }}>
                        {name}
                    </h1>

                    <p style={{
                        fontSize: '32px',
                        color: '#d1d5db',
                        maxWidth: '900px',
                        marginTop: 0,
                        lineHeight: 1.5,
                        textWrap: 'balance' as any
                    }}>
                        {displayDesc}
                    </p>
                </div>

                {/* Footer */}
                <div style={{ position: 'absolute', bottom: '50px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {/* We use an absolute URL for the logo or an SVG directly to avoid fetch issues in some environments */}
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                        <polyline points="2 17 12 22 22 17"></polyline>
                        <polyline points="2 12 12 17 22 12"></polyline>
                    </svg>
                    <span style={{ fontSize: '28px', fontWeight: '700', color: 'white', letterSpacing: '0.02em' }}>DailyDevTools</span>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        },
    );
}
