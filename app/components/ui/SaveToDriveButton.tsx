"use client";

import { useGoogleDrive } from "../../hooks/useGoogleDrive";
import { LiquidButton } from "./LiquidButton";
interface SaveToDriveButtonProps {
    blob: Blob | null;
    filename: string;
    clientId?: string;
    toolName?: string; // e.g. "JSON Formatter"
    className?: string;
}

export function SaveToDriveButton({ blob, filename, clientId, toolName, className }: SaveToDriveButtonProps) {
    const cId = clientId || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    const { isReady, isAuthenticated, login, uploadFile, isUploading } = useGoogleDrive({
        clientId: cId
    });

    if (!cId) return null;

    const handleClick = () => {
        if (!blob) return;
        if (!isAuthenticated) {
            login();
        } else {
            uploadFile(blob, filename, toolName || "Uncategorized");
        }
    };

    const label = isUploading ? "Uploading..." : "Save to Google Drive";

    // If "icon" variant is requested (for toolbars)
    if (className?.includes("!p-0")) {
        return (
            <button
                onClick={handleClick}
                disabled={!blob || isUploading || !isReady}
                className={`${className} flex items-center justify-center`} // Ensure centering
                title={label}
            >
                <img src="/google-drive-icon.png" alt="Google Drive" width={16} height={16} className={isAuthenticated ? "" : "opacity-80 grayscale hover:grayscale-0 transition-all"} />
            </button>
        );
    }

    return (
        <div className="flex flex-col gap-2 w-full">
            <LiquidButton
                onClick={handleClick}
                disabled={!blob || isUploading || !isReady}
                variant="secondary"
                className={`group ${className}`}
            >
                <div className="relative w-[18px] h-[18px]">
                    <img src="/google-drive-icon.png" alt="Google Drive" width={18} height={18} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain" />
                </div>
                {label}
            </LiquidButton>

            {!isAuthenticated && (
                <p className="text-[10px] text-[var(--muted-text)] text-center opacity-70">
                    We only create a file you request. We never read or modify your Drive.
                </p>
            )}
        </div>
    );
}
