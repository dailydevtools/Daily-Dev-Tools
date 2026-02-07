/**
 * JWT decoding utilities
 */

export interface JwtHeader {
    alg: string;
    typ?: string;
    [key: string]: any;
}

export interface JwtPayload {
    iss?: string;
    sub?: string;
    aud?: string | string[];
    exp?: number;
    nbf?: number;
    iat?: number;
    jti?: string;
    [key: string]: any;
}

export interface JwtDecodeResult {
    success: boolean;
    header?: JwtHeader;
    payload?: JwtPayload;
    signature?: string;
    error?: string;
    isExpired?: boolean;
    expiresAt?: Date;
}

/**
 * Decode a JWT token
 */
export function decodeJwt(token: string): JwtDecodeResult {
    try {
        const parts = token.trim().split('.');

        if (parts.length !== 3) {
            return {
                success: false,
                error: 'Invalid JWT format. Expected 3 parts separated by dots.',
            };
        }

        const [headerB64, payloadB64, signature] = parts;

        const header = JSON.parse(base64UrlDecode(headerB64)) as JwtHeader;
        const payload = JSON.parse(base64UrlDecode(payloadB64)) as JwtPayload;

        const result: JwtDecodeResult = {
            success: true,
            header,
            payload,
            signature,
        };

        // Check expiration
        if (payload.exp) {
            const expiresAt = new Date(payload.exp * 1000);
            result.expiresAt = expiresAt;
            result.isExpired = expiresAt < new Date();
        }

        return result;
    } catch (e) {
        return {
            success: false,
            error: e instanceof Error ? e.message : 'Failed to decode JWT',
        };
    }
}

/**
 * Decode Base64Url to string
 */
function base64UrlDecode(str: string): string {
    // Replace URL-safe characters
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');

    // Add padding if needed
    const padding = base64.length % 4;
    if (padding) {
        base64 += '='.repeat(4 - padding);
    }

    return decodeURIComponent(
        atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
    );
}

/**
 * Get human-readable time until/since expiration
 */
export function getExpirationText(exp: number): string {
    const now = Date.now();
    const expMs = exp * 1000;
    const diff = expMs - now;

    const seconds = Math.abs(Math.floor(diff / 1000));
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const prefix = diff < 0 ? 'Expired' : 'Expires in';
    const suffix = diff < 0 ? 'ago' : '';

    if (days > 0) return `${prefix} ${days} day${days > 1 ? 's' : ''} ${suffix}`.trim();
    if (hours > 0) return `${prefix} ${hours} hour${hours > 1 ? 's' : ''} ${suffix}`.trim();
    if (minutes > 0) return `${prefix} ${minutes} minute${minutes > 1 ? 's' : ''} ${suffix}`.trim();
    return `${prefix} ${seconds} second${seconds > 1 ? 's' : ''} ${suffix}`.trim();
}
