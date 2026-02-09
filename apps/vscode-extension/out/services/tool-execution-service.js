"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolExecutionService = void 0;
class ToolExecutionService {
    static instance;
    registry = {};
    constructor() { }
    static getInstance() {
        if (!ToolExecutionService.instance) {
            ToolExecutionService.instance = new ToolExecutionService();
        }
        return ToolExecutionService.instance;
    }
    registerTool(tool) {
        this.registry[tool.id] = tool;
    }
    getTool(id) {
        return this.registry[id];
    }
    async executeTool(id, input) {
        const tool = this.getTool(id);
        if (!tool) {
            return { success: false, value: '', error: `Tool with id ${id} not found.` };
        }
        try {
            return await tool.execute(input);
        }
        catch (error) {
            return { success: false, value: '', error: error.message || 'An unknown error occurred during tool execution.' };
        }
    }
    getAllTools() {
        return Object.values(this.registry);
    }
}
exports.ToolExecutionService = ToolExecutionService;
//# sourceMappingURL=tool-execution-service.js.map