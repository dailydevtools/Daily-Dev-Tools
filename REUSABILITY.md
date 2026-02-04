# Reusability Improvement Plan

This document outlines components, logic, and hooks identified for extraction to improve code maintainability and consistency across the QuickDevTools project.

## 1. Custom Hooks
Create a `app/hooks` directory to store these.

### `useClipboard`
- **Current Status**: Repeated logic in multiple tools (e.g., `password-generator`).
- **Functionality**: Accepts text, copies to clipboard, triggers a toast notification.
- **Benefits**: Centralizes clipboard logic and toast messaging.

### `useDebounce`
- **Current Status**: Manual `setTimeout` in `qr-generator`.
- **Functionality**: Returns a debounced value after a delay.
- **Benefits**: Prevents excessive API calls or expensive re-renders in `useEffect`.

### `useDownload`
- **Current Status**: Manual element creation in `qr-generator`.
- **Functionality**: Handles file download from a URL or Blob.
- **Benefits**: Simplifies download actions across image/file tools.

## 2. UI Components
Refactor or create these in `app/components/ui` or `app/components/common`.

### `CopyButton`
- **Current Status**: `LiquidButton` with copy logic is repeated.
- **Structure**: A button that takes `text` as a prop and uses `useClipboard`. Changes state momentarily to "Copied!".
- **Benefits**: Drop-in "Copy" functionality for any tool.

### `ColorPicker`
- **Current Status**: Inline JSX in `qr-generator`. Likely needed for other color tools.
- **Structure**: A container with a visual color box (input type="color") and a text input for the hex code.
- **Benefits**: Consistent look and feel for color selection.

## 3. Implementation Order
- [x] Setup `app/hooks` directory.
- [x] Implement `useClipboard`.
- [x] Implement `CopyButton` (consumes `useClipboard`).
- [x] Implement `useDebounce`.
- [x] Implement `useDownload`.
- [x] Implement `ColorPicker`.
- [x] Refactor existing tools (`password-generator`, `qr-generator`, etc.) to use these new items.
