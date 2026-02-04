// cURL Parser - Extract structured data from cURL commands via API
import { HTTPMethod, HeaderParam, QueryParam, RequestBody } from './apiDocsTypes';

export interface ParsedCurl {
    method: HTTPMethod;
    fullUrl: string;
    path: string;
    headers: HeaderParam[];
    queryParams: QueryParam[];
    requestBody?: RequestBody;
}

export async function parseCurl(curl: string): Promise<ParsedCurl> {
    try {
        const response = await fetch('/api/curl-parse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ curl }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to parse cURL');
        }

        const data = await response.json();
        return data.result as ParsedCurl;
    } catch (error: any) {
        throw new Error(`Failed to parse cURL: ${error.message}`);
    }
}

// Validate if a string looks like a cURL command
export function isValidCurl(input: string): boolean {
    const trimmed = input.trim();
    return trimmed.startsWith('curl ') || trimmed.startsWith('curl\t') || trimmed === 'curl';
}
