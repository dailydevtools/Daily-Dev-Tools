import yaml from 'js-yaml';
import { OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';
import { APICollection, APIEndpoint, AuthType, AuthConfig, HTTPMethod } from './apiDocsTypes';
import { generateId } from './apiDocsStorage';

// Union type for supported specs
type OpenAPISpec = OpenAPIV3.Document | OpenAPIV3_1.Document;

export function parseOpenApi(content: string): OpenAPISpec {
    try {
        const trimmed = content.trim();
        // Simple heuristic: if it starts with { it's likely JSON, otherwise try YAML
        if (trimmed.startsWith('{')) {
            return JSON.parse(content) as OpenAPISpec;
        } else {
            return yaml.load(content) as OpenAPISpec;
        }
    } catch (e: any) {
        throw new Error(`Failed to parse spec: ${e.message}`);
    }
}

export function convertOpenApiToCollection(spec: OpenAPISpec, nameOverride?: string): APICollection {
    const info = spec.info;
    const servers = spec.servers ?? [];
    const baseUrl = servers[0]?.url || 'https://api.example.com';

    // Determine Auth
    let authType: AuthType = 'none';
    let authConfig: AuthConfig | undefined = undefined;

    const components = spec.components;
    if (components?.securitySchemes) {
        const schemeKey = Object.keys(components.securitySchemes)[0];
        const scheme = components.securitySchemes[schemeKey];

        if (isSecuritySchemeObject(scheme)) {
            if (scheme.type === 'http' && scheme.scheme === 'bearer') {
                authType = 'bearer';
            } else if (scheme.type === 'apiKey') {
                authType = 'api-key';
                authConfig = {
                    keyName: scheme.name,
                    keyLocation: scheme.in as 'header' | 'query',
                };
            } else if (scheme.type === 'http' && scheme.scheme === 'basic') {
                authType = 'basic';
            }
        }
    }

    const endpoints: APIEndpoint[] = [];
    // Only map standard HTTP methods
    const methods = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'] as const;

    if (spec.paths) {
        Object.entries(spec.paths).forEach(([path, pathItem]) => {
            if (!pathItem) return;

            methods.forEach(method => {
                const operation = (pathItem as any)[method];
                if (!operation) return;

                const op = operation as OpenAPIV3.OperationObject;

                // Headers
                const headers = (op.parameters || [])
                    .filter((p: any) => p.in === 'header')
                    .map((p: any) => ({
                        key: p.name,
                        value: '',
                        description: p.description,
                        required: p.required || false,
                    }));

                // Query Params
                const queryParams = (op.parameters || [])
                    .filter((p: any) => p.in === 'query')
                    .map((p: any) => ({
                        key: p.name,
                        value: '',
                        description: p.description,
                        required: p.required || false,
                    }));

                // Request Body (simplified)
                let requestBody;
                if (op.requestBody && 'content' in op.requestBody) {
                    const content = op.requestBody.content;
                    const jsonContent = content['application/json'];
                    if (jsonContent && jsonContent.schema) {
                        // Basic example generation would go here, for now empty object or example if exists
                        requestBody = {
                            contentType: 'application/json',
                            example: JSON.stringify(jsonContent.example || {}, null, 2),
                        };
                    }
                }

                endpoints.push({
                    id: generateId(),
                    name: op.summary || op.operationId || `${method.toUpperCase()} ${path}`,
                    description: op.description,
                    method: method.toUpperCase() as HTTPMethod,
                    path,
                    headers,
                    queryParams,
                    requestBody,
                    originalCurl: '', // We don't have this from import
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                });
            });
        });
    }

    return {
        id: generateId(),
        name: nameOverride || info.title || 'Imported Collection',
        description: info.description,
        baseUrl,
        authType,
        authConfig,
        endpoints,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    };
}

function isSecuritySchemeObject(obj: any): obj is OpenAPIV3.SecuritySchemeObject {
    return obj && typeof obj === 'object' && 'type' in obj;
}
