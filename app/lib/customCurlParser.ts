// Custom cURL parser that doesn't rely on native tree-sitter bindings
// This is a pure JavaScript implementation for parsing cURL commands

export interface ParsedCurl {
    method: string;
    url: string;
    headers: Record<string, string>;
    data?: string;
    queries?: Record<string, string>;
}

export function parseCustomCurl(curlCommand: string): ParsedCurl {
    const result: ParsedCurl = {
        method: 'GET',
        url: '',
        headers: {},
        queries: {},
    };

    // Normalize the command - remove newlines and extra spaces
    let cmd = curlCommand
        .replace(/\\\n/g, ' ')  // Handle line continuations
        .replace(/\n/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    // Remove 'curl' prefix
    if (cmd.toLowerCase().startsWith('curl ')) {
        cmd = cmd.substring(5).trim();
    }

    // Tokenize the command, respecting quotes
    const tokens: string[] = [];
    let current = '';
    let inSingleQuote = false;
    let inDoubleQuote = false;
    let escaped = false;

    for (let i = 0; i < cmd.length; i++) {
        const char = cmd[i];

        if (escaped) {
            current += char;
            escaped = false;
            continue;
        }

        if (char === '\\') {
            escaped = true;
            continue;
        }

        if (char === "'" && !inDoubleQuote) {
            inSingleQuote = !inSingleQuote;
            continue;
        }

        if (char === '"' && !inSingleQuote) {
            inDoubleQuote = !inDoubleQuote;
            continue;
        }

        if (char === ' ' && !inSingleQuote && !inDoubleQuote) {
            if (current) {
                tokens.push(current);
                current = '';
            }
            continue;
        }

        current += char;
    }

    if (current) {
        tokens.push(current);
    }

    // Parse tokens
    let i = 0;
    while (i < tokens.length) {
        const token = tokens[i];

        // Method flags
        if (token === '-X' || token === '--request') {
            result.method = tokens[++i]?.toUpperCase() || 'GET';
        }
        // Header flags
        else if (token === '-H' || token === '--header') {
            const header = tokens[++i];
            if (header) {
                const colonIndex = header.indexOf(':');
                if (colonIndex > 0) {
                    const key = header.substring(0, colonIndex).trim();
                    const value = header.substring(colonIndex + 1).trim();
                    result.headers[key] = value;
                }
            }
        }
        // Data flags
        else if (token === '-d' || token === '--data' || token === '--data-raw' || token === '--data-binary') {
            result.data = tokens[++i];
            // If sending data, default to POST unless explicitly set
            if (result.method === 'GET') {
                result.method = 'POST';
            }
        }
        // URL detection (not a flag)
        else if (!token.startsWith('-') && !result.url) {
            result.url = token;
        }

        i++;
    }

    // Parse query parameters from URL
    if (result.url) {
        try {
            const urlObj = new URL(result.url);
            urlObj.searchParams.forEach((value, key) => {
                result.queries![key] = value;
            });
        } catch {
            // If URL parsing fails, try to extract query string manually
            const qIndex = result.url.indexOf('?');
            if (qIndex > 0) {
                const queryString = result.url.substring(qIndex + 1);
                queryString.split('&').forEach(pair => {
                    const [key, value] = pair.split('=');
                    if (key) {
                        result.queries![decodeURIComponent(key)] = value ? decodeURIComponent(value) : '';
                    }
                });
            }
        }
    }

    return result;
}

// Code generators for different languages
export function generatePython(parsed: ParsedCurl): string {
    const lines: string[] = ['import requests', ''];

    let code = `response = requests.${parsed.method.toLowerCase()}(\n`;
    code += `    "${parsed.url}"`;

    if (Object.keys(parsed.headers).length > 0) {
        code += `,\n    headers=${JSON.stringify(parsed.headers, null, 4).replace(/\n/g, '\n    ')}`;
    }

    if (parsed.data) {
        try {
            const jsonData = JSON.parse(parsed.data);
            code += `,\n    json=${JSON.stringify(jsonData, null, 4).replace(/\n/g, '\n    ')}`;
        } catch {
            code += `,\n    data="${parsed.data.replace(/"/g, '\\"')}"`;
        }
    }

    code += '\n)';
    lines.push(code);
    lines.push('', 'print(response.json())');

    return lines.join('\n');
}

export function generateJavaScript(parsed: ParsedCurl): string {
    const options: Record<string, any> = {
        method: parsed.method,
    };

    if (Object.keys(parsed.headers).length > 0) {
        options.headers = parsed.headers;
    }

    if (parsed.data) {
        try {
            JSON.parse(parsed.data);
            options.body = 'JSON.stringify(data)';
        } catch {
            options.body = parsed.data;
        }
    }

    const lines: string[] = [];

    if (parsed.data) {
        try {
            const jsonData = JSON.parse(parsed.data);
            lines.push(`const data = ${JSON.stringify(jsonData, null, 2)};`);
            lines.push('');
        } catch {
            // Not JSON data
        }
    }

    lines.push(`fetch("${parsed.url}", {`);
    lines.push(`  method: "${parsed.method}",`);

    if (Object.keys(parsed.headers).length > 0) {
        lines.push(`  headers: ${JSON.stringify(parsed.headers, null, 2).replace(/\n/g, '\n  ')},`);
    }

    if (parsed.data) {
        try {
            JSON.parse(parsed.data);
            lines.push(`  body: JSON.stringify(data),`);
        } catch {
            lines.push(`  body: "${parsed.data.replace(/"/g, '\\"')}",`);
        }
    }

    lines.push(`})`);
    lines.push(`  .then(response => response.json())`);
    lines.push(`  .then(data => console.log(data))`);
    lines.push(`  .catch(error => console.error("Error:", error));`);

    return lines.join('\n');
}

export function generateNode(parsed: ParsedCurl): string {
    return generateJavaScript(parsed);
}

export function generateGo(parsed: ParsedCurl): string {
    const lines: string[] = [
        'package main',
        '',
        'import (',
        '    "fmt"',
        '    "io/ioutil"',
        '    "net/http"',
    ];

    if (parsed.data) {
        lines.push('    "bytes"');
    }

    lines.push(')');
    lines.push('');
    lines.push('func main() {');

    if (parsed.data) {
        lines.push(`    data := []byte(\`${parsed.data}\`)`);
        lines.push(`    req, _ := http.NewRequest("${parsed.method}", "${parsed.url}", bytes.NewBuffer(data))`);
    } else {
        lines.push(`    req, _ := http.NewRequest("${parsed.method}", "${parsed.url}", nil)`);
    }

    for (const [key, value] of Object.entries(parsed.headers)) {
        lines.push(`    req.Header.Set("${key}", "${value}")`);
    }

    lines.push('');
    lines.push('    client := &http.Client{}');
    lines.push('    resp, _ := client.Do(req)');
    lines.push('    defer resp.Body.Close()');
    lines.push('');
    lines.push('    body, _ := ioutil.ReadAll(resp.Body)');
    lines.push('    fmt.Println(string(body))');
    lines.push('}');

    return lines.join('\n');
}

export function generatePhp(parsed: ParsedCurl): string {
    const lines: string[] = ['<?php', '', '$ch = curl_init();', ''];

    lines.push(`curl_setopt($ch, CURLOPT_URL, "${parsed.url}");`);
    lines.push('curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);');

    if (parsed.method !== 'GET') {
        lines.push(`curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "${parsed.method}");`);
    }

    if (Object.keys(parsed.headers).length > 0) {
        lines.push('curl_setopt($ch, CURLOPT_HTTPHEADER, [');
        for (const [key, value] of Object.entries(parsed.headers)) {
            lines.push(`    "${key}: ${value}",`);
        }
        lines.push(']);');
    }

    if (parsed.data) {
        lines.push(`curl_setopt($ch, CURLOPT_POSTFIELDS, '${parsed.data.replace(/'/g, "\\'")}');`);
    }

    lines.push('');
    lines.push('$response = curl_exec($ch);');
    lines.push('curl_close($ch);');
    lines.push('');
    lines.push('echo $response;');
    lines.push('?>');

    return lines.join('\n');
}

export function generateJava(parsed: ParsedCurl): string {
    const lines: string[] = [
        'import java.net.http.HttpClient;',
        'import java.net.http.HttpRequest;',
        'import java.net.http.HttpResponse;',
        'import java.net.URI;',
        '',
        'public class Main {',
        '    public static void main(String[] args) throws Exception {',
        '        HttpClient client = HttpClient.newHttpClient();',
        '',
    ];

    lines.push(`        HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()`);
    lines.push(`            .uri(URI.create("${parsed.url}"))`);

    for (const [key, value] of Object.entries(parsed.headers)) {
        lines.push(`            .header("${key}", "${value}")`);
    }

    if (parsed.data) {
        lines.push(`            .method("${parsed.method}", HttpRequest.BodyPublishers.ofString("${parsed.data.replace(/"/g, '\\"')}"))`);
    } else {
        lines.push(`            .method("${parsed.method}", HttpRequest.BodyPublishers.noBody())`);
    }

    lines.push('            .build();');
    lines.push('');
    lines.push('        HttpResponse<String> response = client.send(requestBuilder, HttpResponse.BodyHandlers.ofString());');
    lines.push('        System.out.println(response.body());');
    lines.push('    }');
    lines.push('}');

    return lines.join('\n');
}

export function generateRuby(parsed: ParsedCurl): string {
    const lines: string[] = [
        "require 'net/http'",
        "require 'uri'",
        "require 'json'",
        '',
        `uri = URI.parse("${parsed.url}")`,
        '',
    ];

    lines.push(`http = Net::HTTP.new(uri.host, uri.port)`);
    lines.push('http.use_ssl = uri.scheme == "https"');
    lines.push('');
    lines.push(`request = Net::HTTP::${parsed.method.charAt(0) + parsed.method.slice(1).toLowerCase()}.new(uri.request_uri)`);

    for (const [key, value] of Object.entries(parsed.headers)) {
        lines.push(`request["${key}"] = "${value}"`);
    }

    if (parsed.data) {
        lines.push(`request.body = '${parsed.data.replace(/'/g, "\\'")}'`);
    }

    lines.push('');
    lines.push('response = http.request(request)');
    lines.push('puts response.body');

    return lines.join('\n');
}

export function generateRust(parsed: ParsedCurl): string {
    const lines: string[] = [
        'use reqwest::header::{HeaderMap, HeaderValue};',
        '',
        '#[tokio::main]',
        'async fn main() -> Result<(), Box<dyn std::error::Error>> {',
        '    let client = reqwest::Client::new();',
        '',
    ];

    if (Object.keys(parsed.headers).length > 0) {
        lines.push('    let mut headers = HeaderMap::new();');
        for (const [key, value] of Object.entries(parsed.headers)) {
            lines.push(`    headers.insert("${key}", HeaderValue::from_static("${value}"));`);
        }
        lines.push('');
    }

    lines.push(`    let response = client`);
    lines.push(`        .${parsed.method.toLowerCase()}("${parsed.url}")`);

    if (Object.keys(parsed.headers).length > 0) {
        lines.push('        .headers(headers)');
    }

    if (parsed.data) {
        lines.push(`        .body("${parsed.data.replace(/"/g, '\\"')}")`);
    }

    lines.push('        .send()');
    lines.push('        .await?');
    lines.push('        .text()');
    lines.push('        .await?;');
    lines.push('');
    lines.push('    println!("{}", response);');
    lines.push('    Ok(())');
    lines.push('}');

    return lines.join('\n');
}

export function generateDart(parsed: ParsedCurl): string {
    const lines: string[] = [
        "import 'package:http/http.dart' as http;",
        '',
        'void main() async {',
    ];

    lines.push(`  final url = Uri.parse("${parsed.url}");`);

    if (Object.keys(parsed.headers).length > 0) {
        lines.push('  final headers = {');
        for (const [key, value] of Object.entries(parsed.headers)) {
            lines.push(`    "${key}": "${value}",`);
        }
        lines.push('  };');
    }

    if (parsed.data) {
        lines.push(`  final body = '${parsed.data.replace(/'/g, "\\'")}';`);
    }

    lines.push('');
    lines.push(`  final response = await http.${parsed.method.toLowerCase()}(`);
    lines.push('    url,');

    if (Object.keys(parsed.headers).length > 0) {
        lines.push('    headers: headers,');
    }

    if (parsed.data) {
        lines.push('    body: body,');
    }

    lines.push('  );');
    lines.push('');
    lines.push('  print(response.body);');
    lines.push('}');

    return lines.join('\n');
}

export function generateSwift(parsed: ParsedCurl): string {
    const lines: string[] = [
        'import Foundation',
        '',
        `let url = URL(string: "${parsed.url}")!`,
        'var request = URLRequest(url: url)',
        `request.httpMethod = "${parsed.method}"`,
        '',
    ];

    for (const [key, value] of Object.entries(parsed.headers)) {
        lines.push(`request.setValue("${value}", forHTTPHeaderField: "${key}")`);
    }

    if (parsed.data) {
        lines.push(`request.httpBody = "${parsed.data.replace(/"/g, '\\"')}".data(using: .utf8)`);
    }

    lines.push('');
    lines.push('let task = URLSession.shared.dataTask(with: request) { data, response, error in');
    lines.push('    if let data = data {');
    lines.push('        print(String(data: data, encoding: .utf8) ?? "")');
    lines.push('    }');
    lines.push('}');
    lines.push('task.resume()');

    return lines.join('\n');
}

export function generateJson(parsed: ParsedCurl): string {
    return JSON.stringify({
        method: parsed.method,
        url: parsed.url,
        headers: parsed.headers,
        data: parsed.data ? (() => { try { return JSON.parse(parsed.data!); } catch { return parsed.data; } })() : undefined,
        queries: parsed.queries,
    }, null, 2);
}

// Main conversion function
export type TargetLanguage =
    | 'python' | 'javascript' | 'node' | 'go' | 'php'
    | 'java' | 'ruby' | 'rust' | 'dart' | 'swift' | 'json';

export function convertCurlToCode(curlCommand: string, language: TargetLanguage): string {
    const parsed = parseCustomCurl(curlCommand);

    switch (language) {
        case 'python': return generatePython(parsed);
        case 'javascript': return generateJavaScript(parsed);
        case 'node': return generateNode(parsed);
        case 'go': return generateGo(parsed);
        case 'php': return generatePhp(parsed);
        case 'java': return generateJava(parsed);
        case 'ruby': return generateRuby(parsed);
        case 'rust': return generateRust(parsed);
        case 'dart': return generateDart(parsed);
        case 'swift': return generateSwift(parsed);
        case 'json': return generateJson(parsed);
        default: return generatePython(parsed);
    }
}
