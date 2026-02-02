"use client";

import { Check, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useClipboard } from "../../hooks/useClipboard";
import { LiquidButton } from "./LiquidButton";
import { useTranslations } from "next-intl";

interface CopyButtonProps {
    text: string;
    className?: string;
    iconSize?: number;
    variant?: 'icon' | 'liquid';
    label?: string; // Optional label override
    buttonVariant?: 'primary' | 'secondary' | 'ghost'; // For LiquidButton
}

export default function CopyButton({
    text,
    className = "",
    iconSize = 16,
    variant = 'icon',
    label,
    buttonVariant = 'secondary'
}: CopyButtonProps) {
    const { copy, isCopied } = useClipboard();
    const t = useTranslations('ToolPage.common');

    if (variant === 'liquid') {
        return (
            <LiquidButton
                variant={buttonVariant}
                className={className}
                onClick={() => copy(text)}
            >
                {isCopied ? <Check size={iconSize} /> : <Copy size={iconSize} />}
                {label ?? (isCopied ? t('copied') : t('copy'))}
            </LiquidButton>
        );
    }

    return (
        <button
            onClick={() => copy(text)}
            className={`relative flex items-center justify-center transition-all hover:bg-white/10 p-2.5 min-w-[44px] min-h-[44px] rounded-lg ${className}`}
            aria-label={t('copy')}
        >
            <AnimatePresence mode="wait" initial={false}>
                {isCopied ? (
                    <motion.div
                        key="check"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Check size={iconSize} className="text-green-500" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="copy"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Copy size={iconSize} className="text-[var(--muted-text)] group-hover:text-[var(--title-color)]" />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
}
