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
exports.EditorService = exports.OutputType = void 0;
const vscode = __importStar(require("vscode"));
var OutputType;
(function (OutputType) {
    OutputType["Replace"] = "replace";
    OutputType["Insert"] = "insert";
    OutputType["Clipboard"] = "clipboard";
    OutputType["NewTab"] = "newTab";
})(OutputType || (exports.OutputType = OutputType = {}));
class EditorService {
    static async getSelectedText() {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return undefined;
        }
        const selection = editor.selection;
        return editor.document.getText(selection);
    }
    static async getFullText() {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return undefined;
        }
        return editor.document.getText();
    }
    static async applyOutput(text, type) {
        const editor = vscode.window.activeTextEditor;
        switch (type) {
            case OutputType.Replace:
                if (editor) {
                    await editor.edit((editBuilder) => {
                        editBuilder.replace(editor.selection, text);
                    });
                }
                break;
            case OutputType.Insert:
                if (editor) {
                    await editor.edit((editBuilder) => {
                        editBuilder.insert(editor.selection.active, text);
                    });
                }
                break;
            case OutputType.Clipboard:
                await vscode.env.clipboard.writeText(text);
                vscode.window.showInformationMessage('Copied to clipboard!');
                break;
            case OutputType.NewTab:
                const doc = await vscode.workspace.openTextDocument({ content: text });
                await vscode.window.showTextDocument(doc);
                break;
        }
    }
}
exports.EditorService = EditorService;
//# sourceMappingURL=editor-service.js.map