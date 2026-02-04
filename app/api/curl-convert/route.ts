import { NextRequest, NextResponse } from 'next/server';
import { convertCurlToCode, TargetLanguage } from '@/app/lib/customCurlParser';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { curl, language } = body;

        if (!curl || typeof curl !== 'string') {
            return NextResponse.json(
                { error: 'Missing or invalid curl command' },
                { status: 400 }
            );
        }

        const targetLang = (language || 'python') as TargetLanguage;
        const result = convertCurlToCode(curl, targetLang);

        return NextResponse.json({ result });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Failed to convert curl command' },
            { status: 500 }
        );
    }
}
