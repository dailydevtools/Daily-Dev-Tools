"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { LiquidButton } from "../../../../components/ui/LiquidButton";
import { LiquidInput } from "../../../../components/ui/LiquidInput";
import LiquidSelect from "../../../../components/ui/LiquidSelect";
import { APICollection, AuthType } from "../../../../lib/apiDocsTypes";
import { createEmptyCollection } from "../../../../lib/apiDocsStorage";

interface Props {
    collection: APICollection | null;
    onSave: (collection: APICollection) => void;
    onClose: () => void;
}

export default function CollectionEditor({ collection, onSave, onClose }: Props) {
    const t = useTranslations('APIDocs');

    const authTypeOptions = [
        { value: 'none', label: t('authNone') },
        { value: 'bearer', label: t('authBearer') },
        { value: 'api-key', label: t('authApiKey') },
        { value: 'basic', label: t('authBasic') },
    ];

    const [name, setName] = useState(collection?.name || '');
    const [baseUrl, setBaseUrl] = useState(collection?.baseUrl || 'https://api.example.com');
    const [description, setDescription] = useState(collection?.description || '');
    const [authType, setAuthType] = useState<AuthType>(collection?.authType || 'none');
    const [error, setError] = useState('');

    const isEditing = !!collection;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!name.trim()) {
            setError(t('collectionNameRequired'));
            return;
        }

        if (!baseUrl.trim()) {
            setError(t('baseUrlRequired'));
            return;
        }

        // Validate URL format
        try {
            new URL(baseUrl);
        } catch {
            setError(t('invalidUrl'));
            return;
        }

        const now = Date.now();
        const updatedCollection: APICollection = collection
            ? {
                ...collection,
                name: name.trim(),
                baseUrl: baseUrl.trim(),
                description: description.trim() || undefined,
                authType,
                updatedAt: now,
            }
            : {
                ...createEmptyCollection(name.trim(), baseUrl.trim()),
                description: description.trim() || undefined,
                authType,
            };

        onSave(updatedCollection);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200] p-4">
            <div className="bg-white dark:bg-neutral-900 border border-[var(--border-color)] rounded-2xl w-full max-w-lg shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-[var(--border-color)]">
                    <h2 className="text-lg font-semibold">
                        {isEditing ? t('editCollection') : t('createCollection')}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-[var(--bg-color)] rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1.5">
                            {t('collectionName')} <span className="text-red-500">*</span>
                        </label>
                        <LiquidInput
                            value={name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                            placeholder={t('collectionNamePlaceholder')}
                            autoFocus
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1.5">
                            {t('baseUrl')} <span className="text-red-500">*</span>
                        </label>
                        <LiquidInput
                            value={baseUrl}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBaseUrl(e.target.value)}
                            placeholder={t('baseUrlPlaceholder')}
                        />
                        <p className="text-xs text-[var(--muted-text)] mt-1">
                            {t('baseUrlHelp')}
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1.5">
                            {t('descriptionLabel')}
                        </label>
                        <LiquidInput
                            value={description}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                            placeholder={t('descriptionPlaceholder')}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1.5">
                            {t('authType')}
                        </label>
                        <LiquidSelect
                            value={authType}
                            onChange={(val) => setAuthType(val as AuthType)}
                            options={authTypeOptions}
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-500 bg-red-500/10 px-3 py-2 rounded-lg">
                            {error}
                        </p>
                    )}

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-2">
                        <LiquidButton
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                        >
                            {t('cancel')}
                        </LiquidButton>
                        <LiquidButton type="submit">
                            {isEditing ? t('saveChanges') : t('createCollection')}
                        </LiquidButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
