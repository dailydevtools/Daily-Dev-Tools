// Regex Tester Utilities

export interface RegexMatch {
    match: string;
    index: number;
    groups?: Record<string, string>;
}

export interface RegexResult {
    success: boolean;
    isValid: boolean;
    matches?: RegexMatch[];
    matchCount?: number;
    error?: string;
}

export function testRegex(pattern: string, testString: string, flags: string = 'g'): RegexResult {
    try {
        const regex = new RegExp(pattern, flags);
        const allMatches: RegexMatch[] = [];

        if (flags.includes('g')) {
            let match;
            while ((match = regex.exec(testString)) !== null) {
                allMatches.push({
                    match: match[0],
                    index: match.index,
                    groups: match.groups,
                });
                // Prevent infinite loops with zero-width matches
                if (match.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
            }
        } else {
            const match = regex.exec(testString);
            if (match) {
                allMatches.push({
                    match: match[0],
                    index: match.index,
                    groups: match.groups,
                });
            }
        }

        return {
            success: true,
            isValid: true,
            matches: allMatches,
            matchCount: allMatches.length,
        };
    } catch (err) {
        return {
            success: false,
            isValid: false,
            error: err instanceof Error ? err.message : 'Invalid regex pattern',
        };
    }
}

export function validateRegex(pattern: string): { valid: boolean; error?: string } {
    try {
        new RegExp(pattern);
        return { valid: true };
    } catch (err) {
        return { valid: false, error: err instanceof Error ? err.message : 'Invalid pattern' };
    }
}

export function escapeRegex(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export const COMMON_PATTERNS: Record<string, { pattern: string; description: string }> = {
    email: { pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', description: 'Email address' },
    url: { pattern: 'https?:\\/\\/[\\w\\-._~:/?#[\\]@!$&\'()*+,;=]+', description: 'URL' },
    phone: { pattern: '\\+?\\d{1,4}[-.\\s]?\\(?\\d{1,3}\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}', description: 'Phone number' },
    ipv4: { pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', description: 'IPv4 address' },
    date: { pattern: '\\d{4}-\\d{2}-\\d{2}', description: 'Date (YYYY-MM-DD)' },
    hex: { pattern: '#?[0-9A-Fa-f]{6}', description: 'HEX color' },
};
