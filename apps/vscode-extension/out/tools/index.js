"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAllTools = registerAllTools;
const tool_execution_service_1 = require("../services/tool-execution-service");
const json_formatter_1 = require("./json-formatter");
const base64_tool_1 = require("./base64-tool");
const jwt_tool_1 = require("./jwt-tool");
const uuid_generator_1 = require("./uuid-generator");
const curl_converter_1 = require("./curl-converter");
function registerAllTools() {
    const service = tool_execution_service_1.ToolExecutionService.getInstance();
    service.registerTool(new json_formatter_1.JsonFormatterTool());
    service.registerTool(new base64_tool_1.Base64Tool());
    service.registerTool(new jwt_tool_1.JwtTool());
    service.registerTool(new uuid_generator_1.UuidGeneratorTool());
    service.registerTool(new curl_converter_1.CurlConverterTool());
}
//# sourceMappingURL=index.js.map