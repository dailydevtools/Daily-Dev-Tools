import * as vscode from 'vscode';
import { registerAllTools } from './tools';
import { DailyDevToolsPanel } from './webview/panel';

export function activate(context: vscode.ExtensionContext) {
    console.log('DailyDevTools extension is now active!');

    // Register all modular tools
    registerAllTools();

    let disposable = vscode.commands.registerCommand('dailydevtools.openDashboard', () => {
        DailyDevToolsPanel.createOrShow(context.extensionUri);
    });

    context.subscriptions.push(disposable);
}

export function deactivate() { }
