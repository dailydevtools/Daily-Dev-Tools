// Case Converter Utilities

export type CaseType = 'camel' | 'snake' | 'kebab' | 'pascal' | 'upper' | 'lower' | 'title' | 'constant';

export interface CaseResult {
    success: boolean;
    output?: string;
    error?: string;
}

export function convertCase(text: string, targetCase: CaseType): CaseResult {
    try {
        const words = splitIntoWords(text);
        let output: string;

        switch (targetCase) {
            case 'camel':
                output = toCamelCase(words);
                break;
            case 'snake':
                output = toSnakeCase(words);
                break;
            case 'kebab':
                output = toKebabCase(words);
                break;
            case 'pascal':
                output = toPascalCase(words);
                break;
            case 'upper':
                output = text.toUpperCase();
                break;
            case 'lower':
                output = text.toLowerCase();
                break;
            case 'title':
                output = toTitleCase(words);
                break;
            case 'constant':
                output = toConstantCase(words);
                break;
            default:
                return { success: false, error: 'Unknown case type' };
        }

        return { success: true, output };
    } catch (err) {
        return { success: false, error: err instanceof Error ? err.message : 'Conversion failed' };
    }
}

function splitIntoWords(text: string): string[] {
    // Handle camelCase, PascalCase, snake_case, kebab-case, spaces
    return text
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/[_\-]+/g, ' ')
        .split(/\s+/)
        .filter(w => w.length > 0)
        .map(w => w.toLowerCase());
}

function capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function toCamelCase(words: string[]): string {
    return words.map((w, i) => i === 0 ? w : capitalize(w)).join('');
}

function toSnakeCase(words: string[]): string {
    return words.join('_');
}

function toKebabCase(words: string[]): string {
    return words.join('-');
}

function toPascalCase(words: string[]): string {
    return words.map(capitalize).join('');
}

function toTitleCase(words: string[]): string {
    return words.map(capitalize).join(' ');
}

function toConstantCase(words: string[]): string {
    return words.join('_').toUpperCase();
}

export function getAllCases(text: string): Record<CaseType, string> {
    const cases: CaseType[] = ['camel', 'snake', 'kebab', 'pascal', 'upper', 'lower', 'title', 'constant'];
    const result: Record<string, string> = {};
    cases.forEach(c => {
        const res = convertCase(text, c);
        result[c] = res.output || '';
    });
    return result as Record<CaseType, string>;
}
