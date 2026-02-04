import { NextRequest, NextResponse } from 'next/server';
import { parseCustomCurl } from '@/app/lib/customCurlParser';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { curl } = body;

        if (!curl || typeof curl !== 'string') {
            return NextResponse.json(
                { error: 'Missing or invalid curl command' },
                { status: 400 }
            );
        }

        const parsed = parseCustomCurl(curl);

        // Parse URL to extract path
        let path = '/';
        try {
            const urlObj = new URL(parsed.url);
            path = urlObj.pathname || '/';
        } catch {
            const match = parsed.url?.match(/https?:\/\/[^\/]+\/([^?]*)?/);
            path = match?.[1] ? `/${match[1]}` : '/';
        }

        // Convert headers to array format
        const headers = Object.entries(parsed.headers).map(([key, value]) => ({
            key,
            value,
            required: false,
        }));

        // Convert query params to array format
        const queryParams = Object.entries(parsed.queries || {}).map(([key, value]) => ({
            key,
            value,
            required: false,
        }));

        // Extract request body
        let requestBody;
        if (parsed.data) {
            const contentType = parsed.headers['Content-Type'] || 'application/json';
            let bodyContent = parsed.data;

            // Try to prettify JSON
            try {
                const jsonData = JSON.parse(parsed.data);
                bodyContent = JSON.stringify(jsonData, null, 2);
            } catch {
                // Keep as-is if not JSON
            }

            requestBody = {
                contentType,
                example: bodyContent,
            };
        }

        const result = {
            method: parsed.method,
            fullUrl: parsed.url,
            path,
            headers,
            queryParams,
            requestBody,
        };

        return NextResponse.json({ result });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to parse curl command' },
            { status: 500 }
        );
    }
}
