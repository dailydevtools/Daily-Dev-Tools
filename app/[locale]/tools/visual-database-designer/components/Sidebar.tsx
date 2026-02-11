import { useState, useEffect } from 'react';
import { Plus, Upload, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSchemaStore } from '../store/SchemaStore';
import { DatabaseAdapter } from '../adapters/DatabaseAdapter';
import { PostgresAdapter } from '../adapters/PostgresAdapter';
import LiquidSelect from '../../../../components/ui/LiquidSelect'; // Import reusable select

// Adapters are now fetched from store

export default function Sidebar() {
    const { addTable, activeAdapterId, setAdapter, generateCode, importFromSql, getAvailableAdapters } = useSchemaStore();
    const adapters = getAvailableAdapters();
    const t = useTranslations('VisualDatabaseDesigner');
    const [showImport, setShowImport] = useState(false);
    const [importSql, setImportSql] = useState('');
    const [error, setError] = useState('');

    // Fix Hydration mismatch: Only render code on client
    const [code, setCode] = useState('');

    useEffect(() => {
        setCode(generateCode());
    }, [generateCode, activeAdapterId]);

    const handleAddTable = () => {
        addTable('new_table', { x: Math.random() * 400 + 100, y: Math.random() * 400 + 100 });
    };

    const handleImport = () => {
        try {
            setError('');
            importFromSql(importSql);
            setShowImport(false);
            setImportSql('');
        } catch (e) {
            setError('Failed to parse SQL. Checking console for details.');
        }
    };

    return (
        <div className="w-80 h-full bg-white dark:bg-[#1e1e1e] border-l border-slate-200 dark:border-white/10 flex flex-col relative z-20 shadow-lg">
            {/* Import Modal Overlay */}
            {showImport && (
                <div className="absolute inset-x-4 top-20 z-50 bg-white dark:bg-[#1e1e1e] p-4 flex flex-col rounded-xl shadow-2xl border border-slate-200 dark:border-white/10 ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-800 dark:text-white">{t('import.title')}</h3>
                        <button onClick={() => setShowImport(false)} className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <textarea
                        value={importSql}
                        onChange={(e) => setImportSql(e.target.value)}
                        placeholder={t('import.placeholder')}
                        className="min-h-[200px] flex-1 bg-slate-50 dark:bg-[#121212] p-3 rounded-lg text-xs text-slate-600 dark:text-gray-300 font-mono border border-slate-200 dark:border-white/10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none resize-none mb-4"
                    />

                    {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

                    <button
                        onClick={handleImport}
                        className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                        <Upload className="w-4 h-4" /> {t('import.button')}
                    </button>
                </div>
            )}

            {/* Toolbar */}
            <div className="p-4 border-b border-slate-200 dark:border-white/10 flex-shrink-0">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{t('sidebar.title')}</h2>

                <div className="mb-4">
                    <label className="block text-xs font-medium text-slate-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">{t('sidebar.targetDatabase')}</label>
                    <div className="relative">
                        <LiquidSelect
                            value={activeAdapterId}
                            onChange={(val) => setAdapter(val as any)}
                            options={adapters.map(a => ({ value: a.id, label: a.label }))}
                            placeholder={t('sidebar.targetDatabase')}
                            variant="default"
                        />
                    </div>
                </div>

                <div className="flex gap-2 mb-4">
                    <button
                        onClick={handleAddTable}
                        className="flex-1 bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
                    >
                        <Plus className="w-4 h-4" /> {t('sidebar.addTable')}
                    </button>
                    <button
                        onClick={() => setShowImport(true)}
                        className="bg-slate-100 dark:bg-[#2d2d2d] hover:bg-slate-200 dark:hover:bg-[#3d3d3d] text-slate-600 dark:text-gray-300 font-semibold py-2.5 px-3 rounded-lg flex items-center justify-center transition-colors shadow-sm border border-slate-200 dark:border-white/5"
                        title={t('sidebar.importSql')}
                    >
                        <Upload className="w-4 h-4" />
                    </button>
                </div>

                {/* Draggable Fields */}
                <div className="mb-2">
                    <label className="block text-xs font-medium text-slate-500 dark:text-gray-400 mb-2 uppercase tracking-wide">{t('sidebar.fields')}</label>
                    <div className="grid grid-cols-2 gap-2">
                        {['string', 'number', 'boolean', 'date', 'text', 'uuid'].map((type) => (
                            <div
                                key={type}
                                draggable
                                onDragStart={(e) => {
                                    e.dataTransfer.setData('application/reactflow/type', type);
                                    e.dataTransfer.effectAllowed = 'copy';
                                }}
                                className="cursor-grab active:cursor-grabbing bg-slate-50 dark:bg-[#2d2d2d] hover:bg-slate-100 dark:hover:bg-[#3d3d3d] border border-slate-200 dark:border-white/5 rounded-md px-2 py-1.5 text-xs text-slate-600 dark:text-gray-300 flex items-center gap-2 transition-colors select-none"
                            >
                                <div className={`w-2 h-2 rounded-full ${type === 'string' ? 'bg-green-500' :
                                    type === 'number' ? 'bg-blue-500' :
                                        type === 'boolean' ? 'bg-purple-500' :
                                            type === 'date' ? 'bg-yellow-500' :
                                                type === 'uuid' ? 'bg-orange-500' :
                                                    'bg-gray-500'
                                    }`} />
                                <span className="capitalize">{type}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Code Preview */}
            <div className="flex-1 flex flex-col p-4 overflow-hidden bg-slate-50/50 dark:bg-black/20">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wide">{t('sidebar.generatedSql')}</h3>
                </div>
                <pre className="flex-1 bg-white dark:bg-[#121212] p-3 rounded-lg text-xs text-slate-600 dark:text-green-400 font-mono overflow-auto border border-slate-200 dark:border-white/10 shadow-sm leading-relaxed scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/10">
                    {code}
                </pre>
            </div>
        </div >
    );
}
