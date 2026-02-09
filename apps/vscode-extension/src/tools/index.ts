import { ToolExecutionService } from '../services/tool-execution-service';
import { JsonFormatterTool } from './json-formatter';
import { Base64Tool } from './base64-tool';
import { JwtTool } from './jwt-tool';
import { UuidGeneratorTool } from './uuid-generator';
import { CurlConverterTool } from './curl-converter';

export function registerAllTools() {
    const service = ToolExecutionService.getInstance();

    service.registerTool(new JsonFormatterTool());
    service.registerTool(new Base64Tool());
    service.registerTool(new JwtTool());
    service.registerTool(new UuidGeneratorTool());
    service.registerTool(new CurlConverterTool());
}
