import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';

const GIS_URL = 'https://accounts.google.com/gsi/client';

// Scope for creating and managing files created by this app
const SCOPES = 'https://www.googleapis.com/auth/drive.file';

interface UseGoogleDriveConfig {
    clientId?: string;
}

export function useGoogleDrive({ clientId }: UseGoogleDriveConfig = {}) {
    const [isReady, setIsReady] = useState(false);
    const [tokenClient, setTokenClient] = useState<any>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    // Load Scripts
    useEffect(() => {
        if (!clientId) return;

        const loadScripts = async () => {
            try {
                await new Promise((resolve) => {
                    if (window.google?.accounts) return resolve(true);
                    const script = document.createElement('script');
                    script.src = GIS_URL;
                    script.onload = resolve;
                    script.defer = true;
                    document.body.appendChild(script);
                });

                // Initialize GIS Token Client
                const client = window.google.accounts.oauth2.initTokenClient({
                    client_id: clientId,
                    scope: SCOPES,
                    callback: (response: any) => {
                        if (response.error) {
                            console.error(response);
                            toast.error('Google Auth Failed');
                            return;
                        }
                        setAccessToken(response.access_token);
                    },
                });

                setTokenClient(client);
                setIsReady(true);
            } catch (err) {
                console.error('Failed to load Google scripts', err);
            }
        };

        loadScripts();
    }, [clientId]);

    const login = useCallback(() => {
        if (!tokenClient) return;
        tokenClient.requestAccessToken();
    }, [tokenClient]);

    // Helper to find or create a folder
    const ensureFolder = async (name: string, parentId?: string) => {
        if (!accessToken) throw new Error("No access token");

        // Search for folder
        const q = `mimeType='application/vnd.google-apps.folder' and name='${name}' and '${parentId || 'root'}' in parents and compromised=false and trashed=false`;
        const searchRes = await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name)`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const searchData = await searchRes.json();

        if (searchData.files && searchData.files.length > 0) {
            return searchData.files[0].id;
        }

        // Create folder if not found
        const metadata = {
            name: name,
            mimeType: 'application/vnd.google-apps.folder',
            parents: parentId ? [parentId] : undefined
        };

        const createRes = await fetch('https://www.googleapis.com/drive/v3/files', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(metadata)
        });
        const createData = await createRes.json();
        return createData.id;
    }

    const uploadFile = useCallback(async (blob: Blob, name: string, toolName?: string) => {
        if (!accessToken) {
            toast.error('Not authenticated with Google');
            return null;
        }

        setIsUploading(true);
        const toastId = toast.loading('Saving to Drive...');

        try {
            // 1. Ensure "DailyDevTools" folder exists
            const rootFolderId = await ensureFolder('DailyDevTools');

            // 2. Ensure Tool folder exists if provided
            let parentFolderId = rootFolderId;
            if (toolName) {
                parentFolderId = await ensureFolder(toolName, rootFolderId);
            }

            // 3. Upload file
            const metadata = {
                name: name,
                mimeType: blob.type,
                parents: [parentFolderId]
            };

            const form = new FormData();
            form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
            form.append('file', blob);

            const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: form,
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error.message);
            }

            toast.success('Saved to Google Drive!', { id: toastId });
            return data;

        } catch (err: any) {
            console.error('Upload Error:', err);
            toast.error(`Upload Failed: ${err.message}`, { id: toastId });
            return null;
        } finally {
            setIsUploading(false);
        }
    }, [accessToken]);

    return {
        isReady,
        isAuthenticated: !!accessToken,
        login,
        uploadFile,
        isUploading
    };
}

declare global {
    interface Window {
        google: any;
    }
}
