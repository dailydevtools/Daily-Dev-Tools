/**
 * JSON utilities for parsing, formatting, and validating JSON
 */

export interface JsonFormatResult {
    success: boolean;
    output: string;
    error?: string;
}

/**
 * Format JSON with indentation
 */
export function formatJson(input: string, indent: number = 2): JsonFormatResult {
    try {
        const parsed = JSON.parse(input);
        return {
            success: true,
            output: JSON.stringify(parsed, null, indent),
        };
    } catch (e) {
        return {
            success: false,
            output: '',
            error: e instanceof Error ? e.message : 'Invalid JSON',
        };
    }
}

/**
 * Minify JSON by removing whitespace
 */
export function minifyJson(input: string): JsonFormatResult {
    try {
        const parsed = JSON.parse(input);
        return {
            success: true,
            output: JSON.stringify(parsed),
        };
    } catch (e) {
        return {
            success: false,
            output: '',
            error: e instanceof Error ? e.message : 'Invalid JSON',
        };
    }
}

/**
 * Validate JSON and return parsed result
 */
export function validateJson(input: string): { valid: boolean; error?: string; data?: any } {
    try {
        const data = JSON.parse(input);
        return { valid: true, data };
    } catch (e) {
        return {
            valid: false,
            error: e instanceof Error ? e.message : 'Invalid JSON',
        };
    }
}

/**
 * Get JSON stats
 */
export function getJsonStats(input: string): { size: number; items: number; depth: number } | null {
    try {
        const data = JSON.parse(input);
        return {
            size: new Blob([input]).size,
            items: countItems(data),
            depth: getDepth(data),
        };
    } catch {
        return null;
    }
}

function countItems(obj: any): number {
    if (typeof obj !== 'object' || obj === null) return 0;
    if (Array.isArray(obj)) {
        return obj.reduce((acc, item) => acc + 1 + countItems(item), 0);
    }
    return Object.keys(obj).reduce((acc, key) => acc + 1 + countItems(obj[key]), 0);
}

function getDepth(obj: any, current: number = 0): number {
    if (typeof obj !== 'object' || obj === null) return current;
    if (Array.isArray(obj)) {
        return Math.max(current + 1, ...obj.map(item => getDepth(item, current + 1)));
    }
    return Math.max(current + 1, ...Object.values(obj).map(val => getDepth(val, current + 1)));
}
