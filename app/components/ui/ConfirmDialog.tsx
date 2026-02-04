"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, Info, CheckCircle } from "lucide-react";

// Types
interface ConfirmDialogOptions {
    title: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "danger" | "warning" | "info" | "success";
    onConfirm?: () => void | Promise<void>;
    onCancel?: () => void;
}

interface ConfirmDialogContextType {
    confirm: (options: ConfirmDialogOptions) => Promise<boolean>;
    alert: (options: Omit<ConfirmDialogOptions, "cancelText" | "onCancel">) => Promise<void>;
}

const ConfirmDialogContext = createContext<ConfirmDialogContextType | null>(null);

// Hook to use the confirm dialog
export function useConfirmDialog() {
    const context = useContext(ConfirmDialogContext);
    if (!context) {
        throw new Error("useConfirmDialog must be used within a ConfirmDialogProvider");
    }
    return context;
}

// Provider component
export function ConfirmDialogProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState<ConfirmDialogOptions | null>(null);
    const [resolvePromise, setResolvePromise] = useState<((value: boolean) => void) | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isAlertMode, setIsAlertMode] = useState(false);

    const confirm = useCallback((opts: ConfirmDialogOptions): Promise<boolean> => {
        return new Promise((resolve) => {
            setOptions(opts);
            setIsAlertMode(false);
            setIsOpen(true);
            setResolvePromise(() => resolve);
        });
    }, []);

    const alert = useCallback((opts: Omit<ConfirmDialogOptions, "cancelText" | "onCancel">): Promise<void> => {
        return new Promise((resolve) => {
            setOptions({ ...opts, cancelText: undefined });
            setIsAlertMode(true);
            setIsOpen(true);
            setResolvePromise(() => () => resolve());
        });
    }, []);

    const handleConfirm = async () => {
        if (options?.onConfirm) {
            setIsLoading(true);
            try {
                await options.onConfirm();
            } finally {
                setIsLoading(false);
            }
        }
        setIsOpen(false);
        resolvePromise?.(true);
        setOptions(null);
        setResolvePromise(null);
    };

    const handleCancel = () => {
        options?.onCancel?.();
        setIsOpen(false);
        resolvePromise?.(false);
        setOptions(null);
        setResolvePromise(null);
    };

    const getVariantStyles = () => {
        switch (options?.variant) {
            case "danger":
                return {
                    icon: <AlertTriangle size={24} />,
                    iconBg: "bg-red-500/10",
                    iconColor: "text-red-500",
                    buttonBg: "bg-red-500 hover:bg-red-600",
                };
            case "warning":
                return {
                    icon: <AlertTriangle size={24} />,
                    iconBg: "bg-amber-500/10",
                    iconColor: "text-amber-500",
                    buttonBg: "bg-amber-500 hover:bg-amber-600",
                };
            case "success":
                return {
                    icon: <CheckCircle size={24} />,
                    iconBg: "bg-green-500/10",
                    iconColor: "text-green-500",
                    buttonBg: "bg-green-500 hover:bg-green-600",
                };
            case "info":
            default:
                return {
                    icon: <Info size={24} />,
                    iconBg: "bg-blue-500/10",
                    iconColor: "text-blue-500",
                    buttonBg: "bg-blue-500 hover:bg-blue-600",
                };
        }
    };

    const variantStyles = getVariantStyles();

    return (
        <ConfirmDialogContext.Provider value={{ confirm, alert }}>
            {children}
            <AnimatePresence>
                {isOpen && options && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[300] p-4"
                        onClick={handleCancel}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-neutral-900 border border-[var(--border-color)] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
                        >
                            {/* Header */}
                            <div className="p-6 pb-0">
                                <div className="flex items-start gap-4">
                                    <div className={`w-12 h-12 rounded-xl ${variantStyles.iconBg} ${variantStyles.iconColor} flex items-center justify-center shrink-0`}>
                                        {variantStyles.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h2 className="text-lg font-semibold text-[var(--title-color)] mb-1">
                                            {options.title}
                                        </h2>
                                        {options.description && (
                                            <p className="text-sm text-[var(--muted-text)]">
                                                {options.description}
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        onClick={handleCancel}
                                        className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[var(--muted-text)] transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="p-6 pt-6 flex gap-3 justify-end">
                                {!isAlertMode && (
                                    <button
                                        onClick={handleCancel}
                                        disabled={isLoading}
                                        className="px-4 py-2 text-sm font-medium rounded-lg border border-[var(--border-color)] text-[var(--foreground)] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors disabled:opacity-50"
                                    >
                                        {options.cancelText || "Cancel"}
                                    </button>
                                )}
                                <button
                                    onClick={handleConfirm}
                                    disabled={isLoading}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg text-white transition-colors disabled:opacity-50 flex items-center gap-2 ${variantStyles.buttonBg}`}
                                >
                                    {isLoading && (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    )}
                                    {options.confirmText || "Confirm"}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </ConfirmDialogContext.Provider>
    );
}
