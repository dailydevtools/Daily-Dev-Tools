// API Documentation Builder - Type Definitions

export interface APICollection {
    id: string;
    name: string;
    description?: string;
    baseUrl: string;
    authType: AuthType;
    authConfig?: AuthConfig;
    endpoints: APIEndpoint[];
    createdAt: number;
    updatedAt: number;
}

export type AuthType = 'none' | 'bearer' | 'api-key' | 'basic';

export interface AuthConfig {
    tokenPrefix?: string;
    headerName?: string;
    keyName?: string;
    keyLocation?: 'header' | 'query';
    username?: string;
    password?: string;
}

export interface APIEndpoint {
    id: string;
    name: string;
    description?: string;
    method: HTTPMethod;
    path: string;
    headers: HeaderParam[];
    queryParams: QueryParam[];
    requestBody?: RequestBody;
    exampleResponse?: ExampleResponse;
    originalCurl: string;
    createdAt: number;
    updatedAt: number;
}

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

export interface HeaderParam {
    key: string;
    value: string;
    description?: string;
    required: boolean;
}

export interface QueryParam {
    key: string;
    value: string;
    description?: string;
    required: boolean;
}

export interface RequestBody {
    contentType: string;
    example: string;
}

export interface ExampleResponse {
    statusCode: number;
    contentType: string;
    body: string;
    description?: string;
}
