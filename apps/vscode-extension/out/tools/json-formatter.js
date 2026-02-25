"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonFormatterTool = void 0;
class JsonFormatterTool {
    id = 'json-formatter';
    name = 'JSON Formatter & Validator';
    description = 'Format and validate JSON strings.';
    category = 'Transformation';
    async execute(input) {
        try {
            const parsed = JSON.parse(input.text);
            const formatted = JSON.stringify(parsed, null, 4);
            return { success: true, value: formatted };
        }
        catch (error) {
            return { success: false, value: input.text, error: `Invalid JSON: ${error.message}` };
        }
    }
}
exports.JsonFormatterTool = JsonFormatterTool;
//# sourceMappingURL=json-formatter.js.map