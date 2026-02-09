export type ToolCategory = 'Transformation' | 'Generator' | 'Security' | 'Verification';

export interface ToolInput {
    text: string;
    filePath?: string;
    selectionRange?: { startLine: number; startChar: number; endLine: number; endChar: number };
}

export interface ToolOutput {
    success: boolean;
    value: string;
    error?: string;
}

export interface ITool {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly category: ToolCategory;

    execute(input: ToolInput): Promise<ToolOutput>;
}

export interface ToolRegistry {
    [id: string]: ITool;
}
