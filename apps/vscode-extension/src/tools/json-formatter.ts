import { ITool, ToolInput, ToolOutput, ToolCategory } from '../types/tool';

export class JsonFormatterTool implements ITool {
    readonly id = 'json-formatter';
    readonly name = 'JSON Formatter & Validator';
    readonly description = 'Format and validate JSON strings.';
    readonly category: ToolCategory = 'Transformation';

    async execute(input: ToolInput): Promise<ToolOutput> {
        try {
            const parsed = JSON.parse(input.text);
            const formatted = JSON.stringify(parsed, null, 4);
            return { success: true, value: formatted };
        } catch (error: any) {
            return { success: false, value: input.text, error: `Invalid JSON: ${error.message}` };
        }
    }
}
