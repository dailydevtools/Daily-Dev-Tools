"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UuidGeneratorTool = void 0;
const crypto_1 = require("crypto");
class UuidGeneratorTool {
    id = 'uuid-generator';
    name = 'UUID Generator';
    description = 'Generate one or more v4 UUIDs.';
    category = 'Generator';
    async execute(input) {
        try {
            // If input text is a number, generate that many. Default to 1.
            const count = parseInt(input.text.trim()) || 1;
            const uuids = Array.from({ length: Math.min(count, 100) }, () => (0, crypto_1.randomUUID)());
            return { success: true, value: uuids.join('\n') };
        }
        catch (error) {
            return { success: false, value: '', error: `UUID Error: ${error.message}` };
        }
    }
}
exports.UuidGeneratorTool = UuidGeneratorTool;
//# sourceMappingURL=uuid-generator.js.map