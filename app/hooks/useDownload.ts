import { useCallback } from "react";

export function useDownload() {
    const download = useCallback((url: string, filename: string) => {
        if (!url) return;

        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }, []);

    return { download };
}
