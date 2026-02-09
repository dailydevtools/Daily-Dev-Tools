import { ITool, ToolInput, ToolOutput, ToolRegistry } from '../types/tool';

export class ToolExecutionService {
    private static instance: ToolExecutionService;
    private registry: ToolRegistry = {};

    private constructor() { }

    public static getInstance(): ToolExecutionService {
        if (!ToolExecutionService.instance) {
            ToolExecutionService.instance = new ToolExecutionService();
        }
        return ToolExecutionService.instance;
    }

    public registerTool(tool: ITool): void {
        this.registry[tool.id] = tool;
    }

    public getTool(id: string): ITool | undefined {
        return this.registry[id];
    }

    public async executeTool(id: string, input: ToolInput): Promise<ToolOutput> {
        const tool = this.getTool(id);
        if (!tool) {
            return { success: false, value: '', error: `Tool with id ${id} not found.` };
        }

        try {
            return await tool.execute(input);
        } catch (error: any) {
            return { success: false, value: '', error: error.message || 'An unknown error occurred during tool execution.' };
        }
    }

    public getAllTools(): ITool[] {
        return Object.values(this.registry);
    }
}
