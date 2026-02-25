// Timestamp Converter Utilities

export interface TimestampResult {
    success: boolean;
    output?: string | number;
    error?: string;
}

export function unixToDate(timestamp: number): TimestampResult {
    try {
        // Handle seconds vs milliseconds
        const ts = timestamp > 9999999999 ? timestamp : timestamp * 1000;
        const date = new Date(ts);
        if (isNaN(date.getTime())) {
            return { success: false, error: 'Invalid timestamp' };
        }
        return { success: true, output: date.toISOString() };
    } catch (err) {
        return { success: false, error: err instanceof Error ? err.message : 'Conversion failed' };
    }
}

export function dateToUnix(dateString: string): TimestampResult {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return { success: false, error: 'Invalid date string' };
        }
        return { success: true, output: Math.floor(date.getTime() / 1000) };
    } catch (err) {
        return { success: false, error: err instanceof Error ? err.message : 'Conversion failed' };
    }
}

export function getCurrentTimestamp(): { unix: number; iso: string; local: string } {
    const now = new Date();
    return {
        unix: Math.floor(now.getTime() / 1000),
        iso: now.toISOString(),
        local: now.toLocaleString(),
    };
}

export function formatDate(date: Date | string | number, format: 'iso' | 'local' | 'utc' | 'relative' = 'iso'): string {
    const d = date instanceof Date ? date : new Date(typeof date === 'number' && date < 9999999999 ? date * 1000 : date);

    switch (format) {
        case 'iso': return d.toISOString();
        case 'local': return d.toLocaleString();
        case 'utc': return d.toUTCString();
        case 'relative': return getRelativeTime(d);
        default: return d.toISOString();
    }
}

function getRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) return `${diffSecs} seconds ago`;
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 30) return `${diffDays} days ago`;
    return date.toLocaleDateString();
}
