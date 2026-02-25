"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base64Tool = void 0;
class Base64Tool {
    id = 'base64-tool';
    name = 'Base64 Encode / Decode';
    description = 'Encode or decode text to/from Base64.';
    category = 'Transformation';
    // This is a simple implementation, a real one would ideally handle multiple modes
    // For now, it detects if it should encode or decode based on content or user choice (defaulting to toggle for MVP simplicity)
    async execute(input) {
        try {
            // Check if it's base64
            const isBase64 = /^[A-Za-z0-9+/]*={0,2}$/.test(input.text.trim()) && input.text.trim().length % 4 === 0;
            if (isBase64) {
                // Try decoding
                const decoded = Buffer.from(input.text, 'base64').toString('utf-8');
                return { success: true, value: decoded };
            }
            else {
                // Encode
                const encoded = Buffer.from(input.text, 'utf-8').toString('base64');
                return { success: true, value: encoded };
            }
        }
        catch (error) {
            return { success: false, value: input.text, error: `Base64 Error: ${error.message}` };
        }
    }
}
exports.Base64Tool = Base64Tool;
//# sourceMappingURL=base64-tool.js.map