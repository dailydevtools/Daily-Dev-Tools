# Chrome Extension Deployment Guide

This guide details how to build, package, and publish the **DailyDevTools** extension to the Chrome Web Store.

## 1. Prerequisites

- **Google Account**: You need a Google account.
- **Developer Account**: You must register as a Chrome Web Store Developer ($5 one-time fee).
  - [Register here](https://chrome.google.com/webstore/devconsole/register)

## 2. Prepare the Build

Ensure you have the latest code and dependencies installed.

```bash
# Navigate to extension directory
cd apps/chrome-extension

# Run the production build
npm run build
```

This creates a `dist` folder containing the compiled extension.

## 3. Package for Upload

Chrome Web Store accepts a `.zip` file of the `dist` directory.

```bash
# Zip the dist folder contents
cd dist
zip -r ../daily-dev-tools-extension.zip .
cd ..
```

> **Note**: The zip file must contain `manifest.json` at the root, not inside a nested folder.

## 4. Prepare Store Assets

We have already generated the necessary assets:

- **Manifest**: `dist/manifest.json` (Valid V3 manifest)
- **Privacy Policy**: `PRIVACY_POLICY.md` (Host this text on a public URL, e.g., GitHub Gist or your website)
- **Store Description**: `STORE_LISTING.md`
- **Screenshots**: Generated promo images in your artifacts folder.

## 5. Upload to Chrome Web Store

1.  Go to the [Developer Dashboard](https://chrome.google.com/webstore/devconsole).
2.  Click **+ New Item**.
3.  Upload the `daily-dev-tools-extension.zip` file.

## 6. Fill Listing Details

Once uploaded, you will be taken to the store listing editor.

### Store Listing Tab
- **Description**: Copy/paste from `STORE_LISTING.md`.
- **Category**: Select **Developer Tools**.
- **Language**: English.
- **Graphic Assets**:
    - **Store Icon (128x128)**: Upload `public/icons/icon-128.png`.
    - **Screenshots**: Upload the generated screenshots (1280x800).
    - **Marquee Promo Tile (440x280)**: *Optional but recommended found in screenshots.*

### Privacy Tab
- **Privacy Policy**: Paste the link to your hosted Privacy Policy.
- **Permissions Justification**:
    - `storage`: "To save user preferences like the last used tool."
    - `sidePanel`: "To display the tools interface in the browser side panel."
- **Data Usage**:
    - Check "No" for "Does your extension collect any user data?" (as per our policy).

## 7. Submit for Review

1.  Click **Save draft**.
2.  Click **Submit for review**.

Reviews typically take 24-48 hours. You will receive an email when it's published.

## 8. Updates

To update the extension later:
1.  Bump the version in `manifest.json` (e.g., `1.0.0` -> `1.0.1`).
2.  Run `npm run build`.
3.  Zip the new `dist` folder.
4.  Go to Dashboard > Select Item > **Package** > **Upload new package**.
