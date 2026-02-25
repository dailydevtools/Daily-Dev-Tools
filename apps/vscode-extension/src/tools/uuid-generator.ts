import { ITool, ToolInput, ToolOutput, ToolCategory } from '../types/tool';
import { randomUUID } from 'crypto';

export class UuidGeneratorTool implements ITool {
    readonly id = 'uuid-generator';
    readonly name = 'UUID Generator';
    readonly description = 'Generate one or more v4 UUIDs.';
    readonly category: ToolCategory = 'Generator';

    async execute(input: ToolInput): Promise<ToolOutput> {
        try {
            // If input text is a number, generate that many. Default to 1.
            const count = parseInt(input.text.trim()) || 1;
            const uuids = Array.from({ length: Math.min(count, 100) }, () => randomUUID());
            return { success: true, value: uuids.join('\n') };
        } catch (error: any) {
            return { success: false, value: '', error: `UUID Error: ${error.message}` };
        }
    }
}
