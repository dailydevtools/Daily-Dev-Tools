/**
 * Base64 encoding/decoding utilities
 */

export interface Base64Result {
    success: boolean;
    output: string;
    error?: string;
}

/**
 * Encode text to Base64
 */
export function encodeBase64(input: string): Base64Result {
    try {
        const output = btoa(unescape(encodeURIComponent(input)));
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
 * Decode Base64 to text
 */
export function decodeBase64(input: string): Base64Result {
    try {
        const output = decodeURIComponent(escape(atob(input.trim())));
        return { success: true, output };
    } catch (e) {
        return {
            success: false,
            output: '',
            error: e instanceof Error ? e.message : 'Invalid Base64 string',
        };
    }
}

/**
 * Check if a string is valid Base64
 */
export function isValidBase64(input: string): boolean {
    try {
        atob(input.trim());
        return true;
    } catch {
        return false;
    }
}
