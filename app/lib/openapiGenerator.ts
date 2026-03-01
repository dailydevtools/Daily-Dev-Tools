import { OpenAPIV3 } from 'openapi-types';
import { APICollection, APIEndpoint } from './apiDocsTypes';

export function generateOpenAPISpec(collection: APICollection): OpenAPIV3.Document {
    const paths: OpenAPIV3.PathsObject = {};

    collection.endpoints.forEach((endpoint) => {
        // Normalize path params from :param to {param}
        const normalizedPath = endpoint.path.replace(/:([a-zA-Z0-9_]+)/g, '{$1}');

        if (!paths[normalizedPath]) {
            paths[normalizedPath] = {};
        }

        const operation: OpenAPIV3.OperationObject = {
            summary: endpoint.name,
            description: endpoint.description,
            responses: {
                // Default response if none provided
                '200': {
                    description: 'Successful response',
                }
            },
        };

        // Add parameters
        const parameters: OpenAPIV3.ParameterObject[] = [];

        // Header params
        endpoint.headers.forEach(h => {
            parameters.push({
                name: h.key,
                in: 'header',
                required: h.required,
                description: h.description,
                schema: { type: 'string', default: h.value } // Use current value as default/example
            });
        });

        // Query params
        endpoint.queryParams.forEach(q => {
            parameters.push({
                name: q.key,
                in: 'query',
                required: q.required,
                description: q.description,
                schema: { type: 'string', default: q.value }
            });
        });

        // Path parameters extraction (simple regex based)
        const pathParams = normalizedPath.match(/\{([^}]+)\}/g);
        if (pathParams) {
            pathParams.forEach(param => {
                const name = param.replace(/[{}]/g, '');
                // Check if already added (unlikely but good safety)
                if (!parameters.find(p => p.name === name && p.in === 'path')) {
                    parameters.push({
                        name,
                        in: 'path',
                        required: true,
                        schema: { type: 'string' }
                    });
                }
            });
        }

        if (parameters.length > 0) {
            operation.parameters = parameters;
        }

        // Request Body
        if (endpoint.requestBody) {
            operation.requestBody = {
                content: {
                    [endpoint.requestBody.contentType]: {
                        schema: {
                            type: 'object', // Simplified, optimally would parse JSON
                            example: tryParseJson(endpoint.requestBody.example)
                        }
                    }
                }
            };
        }

        // Example Response
        if (endpoint.exampleResponse) {
            operation.responses[String(endpoint.exampleResponse.statusCode)] = {
                description: endpoint.exampleResponse.description || 'Response',
                content: {
                    [endpoint.exampleResponse.contentType]: {
                        schema: {
                            type: 'object',
                            example: tryParseJson(endpoint.exampleResponse.body)
                        }
                    }
                }
            }
        }

        // Assign operation to path
        const method = endpoint.method.toLowerCase() as OpenAPIV3.HttpMethods;
        paths[normalizedPath][method] = operation;
    });

    const spec: OpenAPIV3.Document = {
        openapi: '3.0.0',
        info: {
            title: collection.name,
            description: collection.description,
            version: '1.0.0',
        },
        servers: [
            {
                url: collection.baseUrl,
            },
        ],
        paths,
    };

    return spec;
}

function tryParseJson(str: string): any {
    try {
        return JSON.parse(str);
    } catch {
        return str;
    }
}
