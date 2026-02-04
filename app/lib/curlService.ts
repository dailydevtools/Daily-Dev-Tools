// Client-side curl service that calls the API route
// The actual conversion happens server-side because curlconverter requires Node.js fs module

export type TargetLanguage =
    | 'python' | 'javascript' | 'node' | 'node-request' | 'php' | 'go' | 'rust' | 'java' | 'dart' | 'csharp' | 'swift' | 'ansible' | 'elixir' | 'kotlin' | 'matlab' | 'r' | 'ruby' | 'json';

export const convertCurl = async (curl: string, language: TargetLanguage): Promise<string> => {
    try {
        const response = await fetch('/api/curl-convert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ curl, language }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Conversion failed');
        }

        const data = await response.json();
        return data.result;
    } catch (e: any) {
        return `Error parsing CURL command:\n${e.message}`;
    }
};

// Synchronous version for compatibility - returns a placeholder while loading
// Use convertCurl (async) for actual conversion
export const convertCurlSync = (curl: string, language: TargetLanguage): string => {
    // This is a fallback - actual conversion should use the async version
    return '// Loading...';
};
