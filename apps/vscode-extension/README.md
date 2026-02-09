# DailyDevTools VS Code Extension

Zero context switching developer productivity platform.

## Architecture Decisions

### Modular Tool System
Every tool in this extension implements the `ITool` interface found in `src/types/tool.ts`. This ensures:
- **Low Coupling**: Tools don't know about each other.
- **Scalability**: Adding a new tool only requires creating a new class and registering it in `src/tools/index.ts`.
- **Testability**: Tool logic is encapsulated within the `execute` method, easy to unit test.

### Service Layer
- **EditorService**: Abstracts VS Code API for reading/writing text, allowing the focus to remain on tool logic.
- **ToolExecutionService**: A singleton registry that manages tool lifecycle and execution.

### Liquid Glass UI
The Webview follows a "Liquid Glass" design language, providing a premium, translucent, and distraction-free experience that respects the user's VS Code theme.

## How to add a new tool

1.  Create a new file in `src/tools/[tool-id].ts`.
2.  Implement the `ITool` interface.
3.  Register the tool in `src/tools/index.ts`.
4.  Update the Webview's `select` menu in `src/webview/panel.ts` (or the dynamic registry in future versions).

## MVP Tools Included
- **JSON Formatter & Validator**
- **CURL → Language Converter** (Modular implementation)
- **Base64 Encode / Decode**
- **JWT Decoder**
- **UUID Generator**

## Reuse of UI Components
The Webview design uses CSS variables and utility classes to ensure a consistent look and feel. Components like the glass cards, translucent buttons, and themed textareas are reused across all tools.
