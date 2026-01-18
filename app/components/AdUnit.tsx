"use client";

import { useEffect, useRef } from 'react';

// This is a placeholder for Google AdSense or Carbon Ads
// To enable, replace with actual ad script integration
export default function AdUnit({ slot, format = 'auto', className = '' }: { slot?: string, format?: string, className?: string }) {
    const adRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // In a real implementation, you might push to (window.adsbygoogle = window.adsbygoogle || []).push({});
        // or insert a script tag here.
        console.log("Ad unit mounted");
    }, []);

    return (
        <div className={`ad-container ${className}`} style={{ margin: '32px 0', textAlign: 'center' }}>
            <div
                ref={adRef}
                style={{
                    background: 'var(--card-bg)',
                    border: '1px dashed var(--border-color)',
                    borderRadius: 12,
                    padding: 24,
                    minHeight: 120,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}
            >
                <span style={{ fontSize: 12, color: 'var(--muted-text)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Advertisement</span>
                <div style={{ color: 'var(--muted-text)', fontSize: 14 }}>
                    Ad Space (Slot: {slot || 'default'})
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted-text)', marginTop: 4 }}>
                    Optimize for revenue here
                </div>
            </div>
        </div>
    );
}
