import { useState, useEffect } from 'react';
import { Plus, Upload, X, Copy, Download, Trash2, Info, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSchemaStore } from '../store/SchemaStore';
import LiquidSelect from '../../../../components/ui/LiquidSelect';
import { LiquidButton } from '../../../../components/ui/LiquidButton';
import CopyButton from '../../../../components/ui/CopyButton';
import { toast } from 'sonner';

export default function Sidebar() {
    const { schema, addTable, activeAdapterId, setAdapter, generateCode, importFromSql, getAvailableAdapters, clearSchema } = useSchemaStore();
    const adapters = getAvailableAdapters();
    const t = useTranslations('VisualDatabaseDesigner');
    const [showImport, setShowImport] = useState(false);
    const [importSql, setImportSql] = useState('');
    const [error, setError] = useState('');

    // Fix Hydration mismatch: Only render code on client
    const [code, setCode] = useState('');

    useEffect(() => {
        setCode(generateCode());
    }, [generateCode, activeAdapterId, schema]);

    const handleAddTable = () => {
        addTable('new_table', { x: Math.random() * 400 + 100, y: Math.random() * 400 + 100 });
    };

    const handleImport = () => {
        try {
            setError('');
            importFromSql(importSql);
            setShowImport(false);
            setImportSql('');
            toast.success('Schema imported successfully');
        } catch (e: any) {
            setError(e.message || 'Failed to parse SQL');
            toast.error('Import failed');
        }
    };

    const handleDownload = () => {
        const element = document.createElement('a');
        const file = new Blob([code], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        const adapter = adapters.find(a => a.id === activeAdapterId);
        const ext = activeAdapterId === 'prisma' ? 'prisma' : activeAdapterId === 'mongodb' ? 'js' : 'sql';
        element.download = `schema.${ext}`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        toast.success('Schema downloaded');
    };

    const handleClearAll = () => {
        if (confirm('Are you sure you want to clear the entire schema? This cannot be undone.')) {
            clearSchema();
            toast.success('Schema cleared');
        }
    };

    return (
        <div className="w-80 h-full bg-white dark:bg-[#1e1e1e] border-l border-slate-200 dark:border-white/10 flex flex-col relative z-20 shadow-lg">
            {/* Import Modal Overlay */}
            {showImport && (
                <div className="absolute inset-x-4 top-20 z-50 bg-white dark:bg-[#1e1e1e] p-5 flex flex-col rounded-xl shadow-2xl border border-slate-200 dark:border-white/10 ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                            <Upload className="w-4 h-4 text-orange-500" />
                            {t('import.title')}
                        </h3>
                        <button onClick={() => setShowImport(false)} className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-white p-1 rounded-md hover:bg-slate-100 dark:hover:bg-white/5">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <textarea
                        value={importSql}
                        onChange={(e) => setImportSql(e.target.value)}
                        placeholder={t('import.placeholder')}
                        className="min-h-[200px] flex-1 bg-slate-50 dark:bg-[#121212] p-3 rounded-lg text-xs text-slate-600 dark:text-gray-300 font-mono border border-slate-200 dark:border-white/10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none resize-none mb-4 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/10"
                    />

                    {error && <p className="text-red-500 text-xs mb-3 bg-red-50 dark:bg-red-900/10 p-2 rounded border border-red-100 dark:border-red-900/20">{error}</p>}

                    <LiquidButton
                        onClick={handleImport}
                        className="w-full !py-2.5"
                    >
                        <Upload className="w-4 h-4" /> {t('import.button')}
                    </LiquidButton>
                </div>
            )}

            {/* Toolbar - Scrollable if content is too tall */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/10">
                <div className="p-4 space-y-6">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                {t('sidebar.title')}
                            </h2>
                            <button
                                onClick={handleClearAll}
                                className="text-slate-400 hover:text-red-500 transition-colors p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/10"
                                title={t('sidebar.clearAll')}
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Value Proposition / Guide */}
                        <div className="space-y-3">
                            <div className="p-3 bg-gradient-to-br from-orange-50/80 to-orange-100/30 dark:from-orange-500/10 dark:to-orange-500/5 border border-orange-200/50 dark:border-orange-500/20 rounded-xl shadow-sm">
                                <h3 className="text-[10px] font-bold text-orange-700 dark:text-orange-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                                    <Sparkles className="w-3 h-3" />
                                    Why use this?
                                </h3>
                                <ul className="space-y-1.5 text-[10px] text-slate-600 dark:text-slate-400 leading-tight">
                                    <li className="flex gap-2">
                                        <div className="mt-1 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                                        <span><strong>Rapid Prototyping:</strong> Plan architectures visually.</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <div className="mt-1 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                                        <span><strong>Database Portability:</strong> Export to PG, MySQL, or Mongo.</span>
                                    </li>
                                    <li className="flex gap-2">
                                        <div className="mt-1 w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                                        <span><strong>Instant ORM:</strong> Generate Prisma schemas.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">{t('sidebar.targetDatabase')}</label>
                        <LiquidSelect
                            value={activeAdapterId}
                            onChange={(val) => setAdapter(val as any)}
                            options={adapters.map(a => ({ value: a.id, label: a.label }))}
                            placeholder={t('sidebar.targetDatabase')}
                            variant="default"
                        />
                    </div>

                    <div className="flex gap-2">
                        <LiquidButton
                            onClick={handleAddTable}
                            className="flex-1 !py-2.5 !px-3"
                        >
                            <Plus className="w-4 h-4" /> {t('sidebar.addTable')}
                        </LiquidButton>
                        <button
                            onClick={() => setShowImport(true)}
                            className="bg-slate-100 dark:bg-[#2d2d2d] hover:bg-slate-200 dark:hover:bg-[#3d3d3d] text-slate-600 dark:text-gray-300 font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center transition-all shadow-sm border border-slate-200 dark:border-white/5 active:scale-95 flex items-center gap-2"
                            title={t('sidebar.importSql')}
                        >
                            <Upload className="w-4 h-4" />
                            <span className="text-[12px]">Import</span>
                        </button>
                    </div>

                    {/* Draggable Fields */}
                    <div>
                        <label className="block text-xs font-medium text-slate-500 dark:text-gray-400 mb-3 uppercase tracking-wide flex items-center gap-2">
                            <div className="w-1 h-3 bg-orange-500 rounded-full" />
                            {t('sidebar.fields')}
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { type: 'string', color: 'bg-green-500' },
                                { type: 'number', color: 'bg-blue-500' },
                                { type: 'boolean', color: 'bg-purple-500' },
                                { type: 'date', color: 'bg-yellow-500' },
                                { type: 'text', color: 'bg-emerald-500' },
                                { type: 'uuid', color: 'bg-orange-500' }
                            ].map(({ type, color }) => (
                                <div
                                    key={type}
                                    draggable
                                    onDragStart={(e) => {
                                        e.dataTransfer.setData('application/reactflow/type', type);
                                        e.dataTransfer.effectAllowed = 'copy';
                                    }}
                                    className="cursor-grab active:cursor-grabbing bg-slate-50 dark:bg-[#2d2d2d] hover:bg-slate-100 dark:hover:bg-[#3d3d3d] border border-slate-200 dark:border-white/5 rounded-lg px-2.5 py-2 text-[11px] font-medium text-slate-600 dark:text-gray-300 flex items-center gap-2 transition-all shadow-sm select-none hover:shadow hover:border-orange-200 dark:hover:border-orange-500/20 active:scale-95"
                                >
                                    <div className={`w-1.5 h-1.5 rounded-full ${color}`} />
                                    <span className="capitalize">{type}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Code Preview - Better proportioned */}
            <div className="flex-[1.2] flex flex-col p-4 bg-slate-100/30 dark:bg-black/40 border-t border-slate-200 dark:border-white/10 min-h-[250px] shadow-[0_-4px_12px_rgba(0,0,0,0.02)]">
                <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-3 bg-green-500 rounded-full" />
                        <h3 className="text-[11px] font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">{t('sidebar.generatedSql')}</h3>
                    </div>
                    <div className="flex items-center gap-1">
                        <CopyButton
                            text={code}
                            className="!min-w-[32px] !min-h-[32px] !p-1.5 hover:bg-white dark:hover:bg-white/5 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                            iconSize={14}
                        />
                        <button
                            onClick={handleDownload}
                            className="p-1.5 text-slate-500 hover:text-orange-500 transition-colors rounded-md hover:bg-white dark:hover:bg-white/5"
                            title={t('sidebar.download')}
                        >
                            <Download className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
                <div className="flex-1 overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 shadow-inner bg-white dark:bg-[#0a0a0a]">
                    <pre className="h-full w-full p-4 text-[12px] text-slate-600 dark:text-green-500 font-mono overflow-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/20 whitespace-pre-wrap leading-relaxed">
                        {code || '-- No tables yet'}
                    </pre>
                </div>
            </div>
        </div>
    );
}
