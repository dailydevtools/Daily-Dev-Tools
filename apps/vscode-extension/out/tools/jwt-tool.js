"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtTool = void 0;
class JwtTool {
    id = 'jwt-tool';
    name = 'JWT Decoder';
    description = 'Decode JSON Web Tokens (JWT) to view header and payload.';
    category = 'Transformation';
    async execute(input) {
        try {
            const parts = input.text.trim().split('.');
            if (parts.length < 2 || parts.length > 3) {
                return { success: false, value: input.text, error: 'Invalid JWT format. Expected 2 or 3 parts separated by dots.' };
            }
            const decodePart = (part) => {
                try {
                    return JSON.parse(Buffer.from(part, 'base64').toString('utf-8'));
                }
                catch (e) {
                    return `Error decoding part: ${part}`;
                }
            };
            const header = decodePart(parts[0]);
            const payload = decodePart(parts[1]);
            const result = {
                header,
                payload,
                signaturePresent: parts.length === 3
            };
            return { success: true, value: JSON.stringify(result, null, 4) };
        }
        catch (error) {
            return { success: false, value: input.text, error: `JWT Error: ${error.message}` };
        }
    }
}
exports.JwtTool = JwtTool;
//# sourceMappingURL=jwt-tool.js.map