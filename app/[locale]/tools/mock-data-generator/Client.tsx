"use client";

import { useState, useRef } from "react";
import { Database, Plus, Trash2, Download, Copy, RefreshCw, ArrowUp } from "lucide-react";
import ToolPageHeader from "../../../components/ToolPageHeader";
import { useTranslations } from "next-intl";
import { LiquidCard } from "../../../components/ui/LiquidCard";
import { LiquidButton } from "../../../components/ui/LiquidButton";
import { LiquidInput } from "../../../components/ui/LiquidInput";
import LiquidSelect from "../../../components/ui/LiquidSelect";
import LiquidTabs from "../../../components/ui/LiquidTabs";
import { toast } from "sonner";
import { generateRandomData } from "./utils";
import CreditCard from "../../../components/CreditCard";

interface Field {
    id: string;
    name: string;
    type: string;
}

const FIELD_TYPES = [
    { value: 'firstName', label: 'First Name' },
    { value: 'lastName', label: 'Last Name' },
    { value: 'fullName', label: 'Full Name' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone Number' },
    { value: 'address', label: 'Address' },
    { value: 'city', label: 'City' },
    { value: 'country', label: 'Country' },
    { value: 'company', label: 'Company' },
    { value: 'jobTitle', label: 'Job Title' },
    { value: 'uuid', label: 'UUID' },
    { value: 'boolean', label: 'Boolean' },
    { value: 'date', label: 'Date (Past)' },
    { value: 'amount', label: 'Money Amount' },
];

export default function MockDataGeneratorClient() {
    const t = useTranslations('MockDataGenerator');
    const tTools = useTranslations('Tools');

    const [fields, setFields] = useState<Field[]>([
        { id: '1', name: 'id', type: 'uuid' },
        { id: '2', name: 'name', type: 'fullName' },
        { id: '3', name: 'email', type: 'email' },
    ]);
    const [count, setCount] = useState(10);
    const [format, setFormat] = useState('json');
    const [preview, setPreview] = useState('');
    const previewRef = useRef<HTMLTextAreaElement>(null);

    const scrollToTop = () => {
        if (previewRef.current) {
            previewRef.current.scrollTop = 0;
        }
    };

    const addField = () => {
        setFields([...fields, {
            id: Math.random().toString(36).substr(2, 9),
            name: `field_${fields.length + 1}`,
            type: 'firstName'
        }]);
    };

    const removeField = (id: string) => {
        setFields(fields.filter(f => f.id !== id));
    };

    const updateField = (id: string, key: keyof Field, value: string) => {
        setFields(fields.map(f => f.id === id ? { ...f, [key]: value } : f));
    };

    const generateData = () => {
        const data = Array.from({ length: count }).map(() => {
            const row: Record<string, any> = {};
            fields.forEach(field => {
                row[field.name] = generateRandomData(field.type);
            });
            return row;
        });

        if (format === 'json') {
            setPreview(JSON.stringify(data, null, 2));
        } else {
            // CSV conversion
            if (data.length === 0) {
                setPreview('');
                return;
            }
            const headers = fields.map(f => f.name).join(',');
            const rows = data.map(row =>
                fields.map(f => {
                    const val = row[f.name];
                    return typeof val === 'string' && val.includes(',') ? `"${val}"` : val;
                }).join(',')
            );
            setPreview([headers, ...rows].join('\n'));
        }
    };

    const copyToClipboard = () => {
        if (!preview) return;
        navigator.clipboard.writeText(preview);
        toast.success(t('copied'));
    };

    const downloadData = () => {
        if (!preview) return;
        const blob = new Blob([preview], { type: format === 'json' ? 'application/json' : 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `mock_data.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <main className="relative min-h-screen">
            <div className="relative z-10 pt-6 pb-16 px-6">
                <div className="max-w-[1000px] mx-auto">
                    <ToolPageHeader
                        title={t('name')}
                        description={t('description')}
                        icon={<Database size={28} className="text-[#fb923c]" />}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Configuration Panel */}
                        <div className="lg:col-span-1 space-y-6">
                            <LiquidCard className="p-6">
                                <h3 className="font-semibold text-lg mb-4 text-[var(--foreground)]">{t('settings')}</h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block mb-2 text-sm text-[var(--muted-text)]">{t('rowCount')}</label>
                                        <LiquidInput
                                            type="number"
                                            min="1"
                                            max="1000"
                                            value={count}
                                            onChange={(e) => setCount(Math.min(1000, Math.max(1, Number(e.target.value))))}
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm text-[var(--muted-text)]">{t('format')}</label>
                                        <div className="w-full">
                                            <LiquidTabs
                                                tabs={['json', 'csv']}
                                                activeTab={format}
                                                onChange={setFormat}
                                                labels={{ json: 'JSON', csv: 'CSV' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <LiquidButton onClick={generateData} className="w-full">
                                            <RefreshCw size={18} className="mr-2" />
                                            {t('generate')}
                                        </LiquidButton>
                                    </div>
                                </div>
                            </LiquidCard>

                            <LiquidCard className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-semibold text-lg text-[var(--foreground)]">{t('fields')}</h3>
                                    <button
                                        onClick={addField}
                                        className="p-2 hover:bg-neutral-100 dark:hover:bg-white/10 rounded-lg text-orange-500 transition-colors"
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>
                                <div className="space-y-3 pr-2">
                                    {fields.map((field) => (
                                        <div key={field.id} className="p-3 bg-neutral-50 dark:bg-white/5 rounded-xl border border-[var(--border-color)] group">
                                            <div className="flex gap-2 mb-2">
                                                <input
                                                    type="text"
                                                    value={field.name}
                                                    onChange={(e) => updateField(field.id, 'name', e.target.value)}
                                                    className="flex-1 bg-transparent border border-transparent hover:border-[var(--border-color)] focus:border-orange-500 rounded px-2 py-1 text-sm outline-none text-[var(--foreground)] font-mono"
                                                    placeholder="Field Name"
                                                />
                                                <button
                                                    onClick={() => removeField(field.id)}
                                                    className="text-red-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <LiquidSelect
                                                value={field.type}
                                                onChange={(val) => updateField(field.id, 'type', val)}
                                                options={FIELD_TYPES}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </LiquidCard>
                        </div>

                        {/* Preview Panel */}
                        <div className="lg:col-span-2">
                            <LiquidCard className="h-full min-h-[500px] flex flex-col p-0 overflow-hidden">
                                <div className="flex justify-between items-center p-4 border-b border-[var(--border-color)] bg-neutral-50/50 dark:bg-white/5">
                                    <h3 className="font-semibold text-[var(--foreground)]">{t('preview')}</h3>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={scrollToTop}
                                            disabled={!preview}
                                            className="p-2 hover:bg-neutral-200 dark:hover:bg-white/10 rounded-lg text-[var(--muted-text)] hover:text-[var(--foreground)] disabled:opacity-50 transition-colors"
                                            title="Scroll to Top"
                                        >
                                            <ArrowUp size={18} />
                                        </button>
                                        <button
                                            onClick={copyToClipboard}
                                            disabled={!preview}
                                            className="p-2 hover:bg-neutral-200 dark:hover:bg-white/10 rounded-lg text-[var(--muted-text)] hover:text-[var(--foreground)] disabled:opacity-50 transition-colors"
                                            title={t('copy')}
                                        >
                                            <Copy size={18} />
                                        </button>
                                        <button
                                            onClick={downloadData}
                                            disabled={!preview}
                                            className="p-2 hover:bg-neutral-200 dark:hover:bg-white/10 rounded-lg text-[var(--muted-text)] hover:text-[var(--foreground)] disabled:opacity-50 transition-colors"
                                            title={t('download')}
                                        >
                                            <Download size={18} />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-1 relative">
                                    <textarea
                                        ref={previewRef}
                                        readOnly
                                        value={preview}
                                        className="w-full h-full p-4 bg-transparent resize-none outline-none font-mono text-xs md:text-sm text-[var(--foreground)]"
                                        placeholder={t('placeholder')}
                                    />
                                    {!preview && (
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="text-[var(--muted-text)] opacity-50 text-center">
                                                <Database size={48} className="mx-auto mb-4 opacity-50" />
                                                <p>{t('placeholder')}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </LiquidCard>
                        </div>
                    </div>

                    <CreditCard
                        name="Himanshi Gangwar"
                        username="himanshig25"
                        github="https://github.com/himanshig25"
                        linkedin="https://www.linkedin.com/in/himanshi-gangwar-6b851637a/"
                    />
                </div>
            </div>
        </main>
    );
}
