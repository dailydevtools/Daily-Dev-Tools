import * as vscode from 'vscode';

export enum OutputType {
    Replace = 'replace',
    Insert = 'insert',
    Clipboard = 'clipboard',
    NewTab = 'newTab'
}

export class EditorService {
    public static async getSelectedText(): Promise<string | undefined> {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return undefined;
        }
        const selection = editor.selection;
        return editor.document.getText(selection);
    }

    public static async getFullText(): Promise<string | undefined> {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return undefined;
        }
        return editor.document.getText();
    }

    public static async applyOutput(text: string, type: OutputType): Promise<void> {
        const editor = vscode.window.activeTextEditor;

        switch (type) {
            case OutputType.Replace:
                if (editor) {
                    await editor.edit((editBuilder: vscode.TextEditorEdit) => {
                        editBuilder.replace(editor.selection, text);
                    });
                }
                break;
            case OutputType.Insert:
                if (editor) {
                    await editor.edit((editBuilder: vscode.TextEditorEdit) => {
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
