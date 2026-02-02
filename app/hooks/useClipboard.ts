import { useState, useCallback } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface UseClipboardOptions {
    timeout?: number;
    withToast?: boolean;
}

export function useClipboard({ timeout = 2000, withToast = true }: UseClipboardOptions = {}) {
    const [isCopied, setIsCopied] = useState(false);
    const t = useTranslations('ToolPage.common');

    const copy = useCallback((text: string) => {
        if (!navigator?.clipboard) {
            console.warn("Clipboard API not available");
            return;
        }

        navigator.clipboard.writeText(text).then(() => {
            setIsCopied(true);
            if (withToast) {
                toast.success(t('copied'));
            }
            setTimeout(() => setIsCopied(false), timeout);
        }).catch((err) => {
            console.error("Failed to copy:", err);
            if (withToast) {
                toast.error("Failed to copy");
            }
        });
    }, [timeout, withToast, t]);

    return { isCopied, copy };
}
