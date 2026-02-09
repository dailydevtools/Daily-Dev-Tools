import { ITool, ToolInput, ToolOutput, ToolCategory } from '../types/tool';

export class Base64Tool implements ITool {
    readonly id = 'base64-tool';
    readonly name = 'Base64 Encode / Decode';
    readonly description = 'Encode or decode text to/from Base64.';
    readonly category: ToolCategory = 'Transformation';

    // This is a simple implementation, a real one would ideally handle multiple modes
    // For now, it detects if it should encode or decode based on content or user choice (defaulting to toggle for MVP simplicity)
    async execute(input: ToolInput): Promise<ToolOutput> {
        try {
            // Check if it's base64
            const isBase64 = /^[A-Za-z0-9+/]*={0,2}$/.test(input.text.trim()) && input.text.trim().length % 4 === 0;

            if (isBase64) {
                // Try decoding
                const decoded = Buffer.from(input.text, 'base64').toString('utf-8');
                return { success: true, value: decoded };
            } else {
                // Encode
                const encoded = Buffer.from(input.text, 'utf-8').toString('base64');
                return { success: true, value: encoded };
            }
        } catch (error: any) {
            return { success: false, value: input.text, error: `Base64 Error: ${error.message}` };
        }
    }
}
