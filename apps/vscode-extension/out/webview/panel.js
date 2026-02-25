"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyDevToolsPanel = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const tool_execution_service_1 = require("../services/tool-execution-service");
const editor_service_1 = require("../services/editor-service");
class DailyDevToolsPanel {
    static currentPanel;
    _panel;
    _extensionUri;
    _disposables = [];
    constructor(panel, extensionUri) {
        this._panel = panel;
        this._extensionUri = extensionUri;
        this._update();
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
        this._panel.webview.onDidReceiveMessage(async (message) => {
            switch (message.command) {
                case 'executeTool':
                    const result = await tool_execution_service_1.ToolExecutionService.getInstance().executeTool(message.toolId, { text: message.text });
                    this._panel.webview.postMessage({ command: 'toolResult', result });
                    break;
                case 'applyOutput':
                    await editor_service_1.EditorService.applyOutput(message.text, message.outputType);
                    break;
            }
        }, null, this._disposables);
    }
    static createOrShow(extensionUri) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;
        if (DailyDevToolsPanel.currentPanel) {
            DailyDevToolsPanel.currentPanel._panel.reveal(column);
            return;
        }
        const panel = vscode.window.createWebviewPanel('dailyDevTools', 'DailyDevTools', column || vscode.ViewColumn.One, {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.file(path.join(extensionUri.fsPath, 'src', 'webview', 'ui'))]
        });
        DailyDevToolsPanel.currentPanel = new DailyDevToolsPanel(panel, extensionUri);
    }
    _update() {
        this._panel.webview.html = this._getHtmlForWebview();
    }
    _getHtmlForWebview() {
        // In a real extension, we would read the HTML file and replace placeholder paths
        // For brevity in this generation, I'll provide a simplified embedded version
        // that still demonstrates the "Liquid Glass" design.
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DailyDevTools</title>
    <style>
        :root {
            --glass-bg: rgba(255, 255, 255, 0.05);
            --glass-border: rgba(255, 255, 255, 0.1);
            --glass-blur: blur(12px);
            --accent: #007acc;
            --text: var(--vscode-editor-foreground);
        }

        body {
            background: transparent;
            color: var(--text);
            font-family: var(--vscode-font-family);
            margin: 0;
            padding: 20px;
            overflow-x: hidden;
        }

        .container {
            display: flex;
            flex-direction: column;
            gap: 20px;
            max-width: 800px;
            margin: 0 auto;
        }

        .glass-card {
            background: var(--glass-bg);
            backdrop-filter: var(--glass-blur);
            -webkit-backdrop-filter: var(--glass-blur);
            border: 1px solid var(--glass-border);
            border-radius: 12px;
            padding: 24px;
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        }

        h1 {
            font-size: 1.5rem;
            margin: 0 0 16px 0;
            background: linear-gradient(45deg, #fff, #aaa);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        select, textarea {
            width: 100%;
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid var(--glass-border);
            border-radius: 8px;
            color: #fff;
            padding: 12px;
            margin-bottom: 16px;
            font-family: var(--vscode-editor-font-family);
            resize: none;
            box-sizing: border-box; /* Ensure padding doesn't affect width */
        }

        .button-group {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }

        button {
            background: var(--accent);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            transition: transform 0.2s, opacity 0.2s;
        }

        button:hover {
            opacity: 0.9;
            transform: translateY(-1px);
        }

        .result-area {
            margin-top: 20px;
            padding: 16px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 8px;
            white-space: pre-wrap;
            font-family: monospace;
            border: 1px solid var(--glass-border);
        }

        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid var(--glass-border);
            text-align: center;
            font-size: 0.9em;
            display: flex;
            justify-content: center;
            gap: 20px;
        }

        .footer a {
            color: var(--accent);
            text-decoration: none;
            opacity: 0.8;
            transition: opacity 0.2s;
        }

        .footer a:hover {
            opacity: 1;
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="glass-card">
            <h1>DailyDevTools</h1>
            <select id="toolSelect">
                <option value="json-formatter">JSON Formatter</option>
                <option value="base64-tool">Base64 Tool</option>
                <option value="jwt-tool">JWT Decoder</option>
                <option value="uuid-generator">UUID Generator</option>
                <option value="curl-converter">CURL Converter</option>
            </select>
            <textarea id="inputArea" rows="10" placeholder="Paste your input here..."></textarea>
            <div class="button-group">
                <button id="runBtn">Run Tool</button>
            </div>
            <div id="resultOutput" class="result-area" style="display: none;"></div>
            <div id="outputActions" class="button-group" style="display: none; margin-top: 10px;">
                <button onclick="applyOutput('replace')">Replace Selection</button>
                <button onclick="applyOutput('clipboard')">Copy to Clipboard</button>
                <button onclick="applyOutput('newTab')">Open in New Tab</button>
            </div>
        </div>

        <div class="footer">
            <a href="https://www.dailydev.tools">www.dailydev.tools</a>
            <a href="https://buymeacoffee.com/dailydevtools">☕ Buy me a coffee</a>
        </div>
    </div>

    <script>
        const vscode = acquireVsCodeApi();
        const runBtn = document.getElementById('runBtn');
        const toolSelect = document.getElementById('toolSelect');
        const inputArea = document.getElementById('inputArea');
        const resultOutput = document.getElementById('resultOutput');
        const outputActions = document.getElementById('outputActions');

        runBtn.addEventListener('click', () => {
            const toolId = toolSelect.value;
            const text = inputArea.value;
            vscode.postMessage({
                command: 'executeTool',
                toolId,
                text
            });
        });

        window.addEventListener('message', event => {
            const message = event.data;
            if (message.command === 'toolResult') {
                const result = message.result;
                resultOutput.textContent = result.success ? result.value : 'Error: ' + result.error;
                resultOutput.style.display = 'block';
                outputActions.style.display = 'block';
            }
        });

        function applyOutput(type) {
            vscode.postMessage({
                command: 'applyOutput',
                text: resultOutput.textContent,
                outputType: type
            });
        }
    </script>
</body>
</html>
        `;
    }
    dispose() {
        DailyDevToolsPanel.currentPanel = undefined;
        this._panel.dispose();
        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }
}
exports.DailyDevToolsPanel = DailyDevToolsPanel;
//# sourceMappingURL=panel.js.map