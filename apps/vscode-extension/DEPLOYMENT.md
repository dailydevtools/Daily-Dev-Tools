# Deployment Guide for DailyDevTools VS Code Extension

## Prerequisites
- [VSCE (Visual Studio Code Extensions CLI)](https://github.com/microsoft/vscode-vsce)
- A [Visual Studio Marketplace Publisher Account](https://marketplace.visualstudio.com/manage)

## 1. Packaging
To create a standard `.vsix` file for manual testing or distribution:

```bash
cd apps/vscode-extension
npx vsce package
```

This will generate a `dailydevtools-vscode-0.0.1.vsix` file in the directory.

## 2. Installing Locally
You can install the `.vsix` file directly in VS Code:
1. Go to the Extensions view.
2. Click the "..." menu.
3. Select "Install from VSIX...".
4. Choose the generated file.

## 3. Publishing to Marketplace

### Login
First, login with your Personal Access Token (PAT):
```bash
npx vsce login <publisher-id>
```

### Publish
To publish a new version to the marketplace:
```bash
npx vsce publish
```

## 4. Automated Release
I have set up a GitHub Action at `.github/workflows/vscode-deploy.yml`.

To deploy automatically:
1.  **Add Secret**: Go to your GitHub Repository -> Settings -> Secrets and variables -> Actions. Add a new repository secret named `VSCE_PAT` with your marketplace Personal Access Token.
2.  **Tag Release**: Push a tag starting with `v` (e.g., `v0.0.1`).
    ```bash
    git tag v0.0.1
    git push origin v0.0.1
    ```
This will trigger the workflow to build and publish the extension.
