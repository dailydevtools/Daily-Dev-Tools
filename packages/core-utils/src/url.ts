/**
 * URL encoding/decoding utilities
 */

export interface UrlResult {
    success: boolean;
    output: string;
    error?: string;
}

/**
 * Encode string for URL
 */
export function encodeUrl(input: string): UrlResult {
    try {
        const output = encodeURIComponent(input);
        return { success: true, output };
    } catch (e) {
        return {
            success: false,
            output: '',
            error: e instanceof Error ? e.message : 'Failed to encode',
        };
    }
}

/**
 * Decode URL-encoded string
 */
export function decodeUrl(input: string): UrlResult {
    try {
        const output = decodeURIComponent(input);
        return { success: true, output };
    } catch (e) {
        return {
            success: false,
            output: '',
            error: e instanceof Error ? e.message : 'Invalid URL-encoded string',
        };
    }
}

/**
 * Encode entire URL (preserving structure)
 */
export function encodeFullUrl(input: string): UrlResult {
    try {
        const output = encodeURI(input);
        return { success: true, output };
    } catch (e) {
        return {
            success: false,
            output: '',
            error: e instanceof Error ? e.message : 'Failed to encode URL',
        };
    }
}

/**
 * Decode entire URL
 */
export function decodeFullUrl(input: string): UrlResult {
    try {
        const output = decodeURI(input);
        return { success: true, output };
    } catch (e) {
        return {
            success: false,
            output: '',
            error: e instanceof Error ? e.message : 'Invalid URL',
        };
    }
}
