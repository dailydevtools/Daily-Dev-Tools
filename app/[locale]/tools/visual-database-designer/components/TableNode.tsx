import { memo, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Trash2, Key, Database, Plus, Fingerprint, Copy } from 'lucide-react';
import { useSchemaStore } from '../store/SchemaStore';
import { Column } from '../core/InternalModel';
import LiquidSelect from '../../../../components/ui/LiquidSelect';

// Custom Node Props Interface
type TableNodeProps = NodeProps & {
    data: {
        id: string;
        name: string;
        columns: Record<string, Column>;
    };
};

const DataTypeColor = (type: string) => {
    const lowType = type.toLowerCase();

    // Strings
    if (['string', 'text', 'char', 'varchar', 'tinytext', 'mediumtext', 'longtext', 'xml', 'json', 'jsonb', 'bytes'].includes(lowType)) {
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
    }

    // Numbers
    if (['number', 'int', 'integer', 'bigint', 'smallint', 'mediumint', 'tinyint', 'float', 'double', 'decimal', 'numeric', 'real', 'double precision', 'decimal128', 'long'].includes(lowType)) {
        return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
    }

    // Auto-increments
    if (['increments', 'serial', 'bigserial', 'smallserial'].includes(lowType)) {
        return 'text-blue-800 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/40 font-bold';
    }

    // Booleans
    if (['boolean'].includes(lowType)) {
        return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30';
    }

    // Date/Time
    if (['date', 'datetime', 'time', 'timestamp', 'timestamptz', 'interval', 'year'].includes(lowType)) {
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
    }

    // Special
    if (['uuid', 'objectid', 'inet', 'cidr', 'unsupported'].includes(lowType)) {
        return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30';
    }

    return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800';
}

const TableNode = ({ id, data, selected }: TableNodeProps) => {
    const { updateTable, removeTable, addColumn, removeColumn, updateColumn, getAvailableTypes, duplicateTable } = useSchemaStore();
    const t = useTranslations('VisualDatabaseDesigner.table');

    // Local state for table name to avoid premature validation/renaming while typing
    const [tableName, setTableName] = useState(data.name);

    // Sync local state if external data changes (e.g. undo/redo)
    useEffect(() => {
        setTableName(data.name);
    }, [data.name]);

    const handleTableNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTableName(e.target.value);
    };

    const handleTableNameSubmit = () => {
        if (tableName.trim() !== data.name && tableName.trim() !== '') {
            updateTable(id, { name: tableName.trim() });
        } else if (tableName.trim() === '') {
            // Revert if empty
            setTableName(data.name);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            (e.target as HTMLInputElement).blur();
        }
    };

    const handleUpdateColumnName = (colId: string, e: React.ChangeEvent<HTMLInputElement>) => {
        // ...
        updateColumn(id, colId, { name: e.target.value });
    };

    const availableTypes = getAvailableTypes();
    const typeOptions = availableTypes.map(t => ({
        value: t.value,
        label: t.label
    }));

    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const type = e.dataTransfer.getData('application/reactflow/type');
        if (type) {
            addColumn(id, `new_${type}`, type as any);
        }
    };

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
      min-w-[260px] rounded-xl shadow-sm transition-all duration-200 font-sans
      bg-white dark:bg-[#1e1e1e] 
      border-[1.5px]
      ${selected || isDragOver
                    ? 'border-orange-500 ring-4 ring-orange-500/10 shadow-xl'
                    : 'border-slate-200 dark:border-white/10 shadow-md hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-500/50'}
      ${isDragOver ? 'bg-orange-50 dark:bg-orange-900/10' : ''}
    `}>
            {/* Header */}
            <div className="px-3 py-2.5 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/5 rounded-t-xl">
                <div className="flex items-center gap-2 flex-1">
                    <div className="p-1.5 rounded-md bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400">
                        <Database className="w-3.5 h-3.5" />
                    </div>
                    <input
                        type="text"
                        value={tableName}
                        onChange={handleTableNameChange}
                        onBlur={handleTableNameSubmit}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:bg-white dark:focus:bg-black/20 rounded px-1.5 py-0.5 w-full transition-colors font-heading"
                        placeholder={t('tableNamePlaceholder')}
                    />
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => duplicateTable(id)}
                        className="text-slate-400 hover:text-orange-500 transition-colors p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-white/5"
                        title="Duplicate Table"
                    >
                        <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                        onClick={() => removeTable(id)}
                        className="text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 transition-colors p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-white/5"
                        title={t('deleteTable')}
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>

            {/* Columns */}
            <div className="p-2 space-y-0.5">
                {Object.values(data.columns).map((col: Column) => (
                    <div key={col.id} className="group relative flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                        {/* Connection Handles - Perfectly centered on border (-13px) */}
                        <Handle
                            type="target"
                            position={Position.Left}
                            id={`${col.id}-left`}
                            style={{
                                left: -13,
                                width: 10,
                                height: 10,
                                background: '#f97316',
                                border: '2px solid white',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: 50
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity !rounded-full shadow-sm"
                        />

                        {/* Constraints Group */}
                        <div className="flex items-center gap-1">
                            {/* Primary Key Toggle */}
                            <button
                                onClick={() => updateColumn(id, col.id, { primaryKey: !col.primaryKey, nullable: false, unique: true })}
                                className={`transition-all hover:scale-110 ${col.primaryKey ? 'text-orange-500' : 'text-slate-300 dark:text-slate-600 hover:text-slate-400'}`}
                                title={t('primaryKey')}
                            >
                                <Key className="w-3.5 h-3.5" />
                            </button>

                            {/* Unique Toggle */}
                            <button
                                onClick={() => updateColumn(id, col.id, { unique: !col.unique })}
                                className={`transition-all hover:scale-110 ${col.unique ? 'text-blue-500' : 'text-slate-300 dark:text-slate-600 hover:text-slate-400'}`}
                                title="Unique"
                            >
                                <Fingerprint className="w-3.5 h-3.5" />
                            </button>

                            {/* Required Toggle */}
                            <button
                                onClick={() => updateColumn(id, col.id, { nullable: !col.nullable })}
                                className={`transition-all hover:scale-110 ${!col.nullable ? 'text-red-500' : 'text-slate-300 dark:text-slate-600 hover:text-slate-400'}`}
                                title="Required"
                            >
                                <div className="text-[10px] font-bold leading-none select-none">*</div>
                            </button>
                        </div>

                        {/* Column Name */}
                        <input
                            type="text"
                            value={col.name}
                            onChange={(e) => handleUpdateColumnName(col.id, e)}
                            className={`
                bg-transparent text-xs font-medium focus:outline-none rounded px-1 flex-1 min-w-0 transition-colors
                ${col.primaryKey ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}
                focus:bg-white dark:focus:bg-black/20
              `}
                            placeholder={t('columnPlaceholder')}
                        />

                        {/* Type Selector */}
                        <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full transition-colors ${DataTypeColor(col.type).split(' ').find(c => c.startsWith('bg-'))}`} />
                            <div className="w-[110px]">
                                <LiquidSelect
                                    value={col.type}
                                    onChange={(val) => updateColumn(id, col.id, { type: val as any })}
                                    options={typeOptions}
                                    variant="ghost"
                                    className="!h-6 !text-[10px]"
                                />
                            </div>
                        </div>

                        {/* Delete Column */}
                        <button
                            onClick={() => removeColumn(id, col.id)}
                            className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-all p-1"
                            title={t('deleteColumn')}
                        >
                            <Trash2 className="w-3 h-3" />
                        </button>

                        <Handle
                            type="source"
                            position={Position.Right}
                            id={`${col.id}-right`}
                            style={{
                                right: -13,
                                width: 10,
                                height: 10,
                                background: '#f97316',
                                border: '2px solid white',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                zIndex: 50
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity !rounded-full shadow-sm"
                        />
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="p-2 border-t border-slate-100 dark:border-white/5">
                <button
                    onClick={() => addColumn(id, 'new_column')}
                    className="w-full py-1.5 text-xs font-medium text-slate-500 hover:text-orange-600 dark:text-slate-400 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/10 rounded-md transition-colors flex items-center justify-center gap-1.5"
                >
                    <Plus className="w-3.5 h-3.5" /> {t('addColumn')}
                </button>
            </div>
        </div>
    );
};

export default memo(TableNode);
