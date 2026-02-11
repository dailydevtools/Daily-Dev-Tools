import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { InternalSchema, Table, Column, Relation } from '../core/InternalModel';
import { PostgresAdapter } from '../adapters/PostgresAdapter';
import { MysqlAdapter } from '../adapters/MysqlAdapter';
import { PrismaAdapter } from '../adapters/PrismaAdapter';
import { MongoAdapter } from '../adapters/MongoAdapter';
import { DatabaseAdapter } from '../adapters/DatabaseAdapter';
import { nanoid } from 'nanoid';

// Helper to ensure unique table names
const getUniqueName = (baseName: string, existingNames: string[]): string => {
    const name = baseName.trim();
    if (!existingNames.includes(name)) return name;

    let counter = 1;
    while (existingNames.includes(`${name}_${counter}`)) {
        counter++;
    }
    return `${name}_${counter}`;
};

interface SchemaState {
    schema: InternalSchema;
    activeAdapterId: DatabaseAdapter['id'];

    // Actions
    addTable: (name: string, position: { x: number; y: number }) => void;
    updateTable: (id: string, updates: Partial<Table>) => void;
    removeTable: (id: string) => void;

    addColumn: (tableId: string, name: string, type?: Column['type']) => void;
    updateColumn: (tableId: string, columnId: string, updates: Partial<Column>) => void;
    removeColumn: (tableId: string, columnId: string) => void;

    addRelation: (relation: Omit<Relation, 'id'>) => void;
    removeRelation: (id: string) => void;

    setAdapter: (id: DatabaseAdapter['id']) => void;
    importSchema: (schema: InternalSchema) => void;
    importFromSql: (sql: string) => void;

    // Computed
    generateCode: () => string;
    getAvailableTypes: () => { value: string; label: string; group?: string }[];
    getAvailableAdapters: () => DatabaseAdapter[];
}

const adapters: Record<string, DatabaseAdapter> = {
    postgresql: new PostgresAdapter(),
    mysql: new MysqlAdapter(),
    prisma: new PrismaAdapter(),
    mongodb: new MongoAdapter(),
};

const INITIAL_SCHEMA: InternalSchema = {
    tables: {},
    relations: [],
    meta: {
        version: '1.0.0',
        name: 'Untitled Schema',
        database: 'postgresql',
        createdAt: Date.now(),
        updatedAt: Date.now()
    }
};

export const useSchemaStore = create<SchemaState>()(
    persist(
        (set, get) => ({
            schema: INITIAL_SCHEMA,
            activeAdapterId: 'postgresql',

            addTable: (name, position) => set((state) => {
                const id = nanoid();

                // Ensure unique name using helper
                const existingNames = Object.values(state.schema.tables).map(t => t.name);
                const finalName = getUniqueName(name, existingNames);

                return {
                    schema: {
                        ...state.schema,
                        tables: {
                            ...state.schema.tables,
                            [id]: {
                                id,
                                name: finalName,
                                position,
                                columns: {
                                    [nanoid()]: {
                                        id: nanoid(),
                                        name: 'id',
                                        type: 'increments',
                                        nullable: false,
                                        primaryKey: true,
                                        unique: true
                                    }
                                },
                                indices: []
                            }
                        }
                    }
                };
            }),

            updateTable: (id, updates) => set((state) => {
                // If name is being updated, check for uniqueness using helper
                if (updates.name) {
                    const existingNames = Object.values(state.schema.tables)
                        .filter(t => t.id !== id) // Exclude self
                        .map(t => t.name);

                    updates.name = getUniqueName(updates.name, existingNames);
                }

                return {
                    schema: {
                        ...state.schema,
                        tables: {
                            ...state.schema.tables,
                            [id]: { ...state.schema.tables[id], ...updates }
                        }
                    }
                };
            }),

            removeTable: (id) => set((state) => {
                const { [id]: removed, ...remainingTables } = state.schema.tables;
                return {
                    schema: {
                        ...state.schema,
                        tables: remainingTables,
                        // Also remove relations connected to this table
                        relations: state.schema.relations.filter(r => r.fromTable !== id && r.toTable !== id)
                    }
                };
            }),

            addColumn: (tableId, name, type = 'string') => set((state) => {
                const table = state.schema.tables[tableId];
                if (!table) return state;

                const colId = nanoid();
                return {
                    schema: {
                        ...state.schema,
                        tables: {
                            ...state.schema.tables,
                            [tableId]: {
                                ...table,
                                columns: {
                                    ...table.columns,
                                    [colId]: {
                                        id: colId,
                                        name,
                                        type,
                                        nullable: true,
                                        primaryKey: false,
                                        unique: false
                                    }
                                }
                            }
                        }
                    }
                };
            }),

            updateColumn: (tableId, columnId, updates) => set((state) => {
                const table = state.schema.tables[tableId];
                if (!table || !table.columns[columnId]) return state;

                return {
                    schema: {
                        ...state.schema,
                        tables: {
                            ...state.schema.tables,
                            [tableId]: {
                                ...table,
                                columns: {
                                    ...table.columns,
                                    [columnId]: { ...table.columns[columnId], ...updates }
                                }
                            }
                        }
                    }
                };
            }),

            removeColumn: (tableId, columnId) => set((state) => {
                const table = state.schema.tables[tableId];
                if (!table) return state;

                const { [columnId]: removed, ...remainingCols } = table.columns;
                return {
                    schema: {
                        ...state.schema,
                        tables: {
                            ...state.schema.tables,
                            [tableId]: { ...table, columns: remainingCols }
                        }
                    }
                };
            }),

            addRelation: (relation) => set((state) => ({
                schema: {
                    ...state.schema,
                    relations: [...state.schema.relations, { ...relation, id: nanoid() }]
                }
            })),

            removeRelation: (id) => set((state) => ({
                schema: {
                    ...state.schema,
                    relations: state.schema.relations.filter(r => r.id !== id)
                }
            })),

            setAdapter: (id) => set({ activeAdapterId: id }),

            importSchema: (schema) => set({ schema }),

            importFromSql: (sql) => {
                const state = get();
                const adapter = adapters[state.activeAdapterId];
                if (adapter) {
                    const schema = adapter.parse(sql);
                    set({ schema });
                }
            },

            generateCode: () => {
                const state = get();
                const adapter = adapters[state.activeAdapterId];
                if (!adapter) return '-- Adapter not found';
                return adapter.generate(state.schema);
            },

            getAvailableTypes: () => {
                const state = get();
                const adapter = adapters[state.activeAdapterId];
                return adapter ? adapter.getDataTypes() : [];
            },

            getAvailableAdapters: () => Object.values(adapters)
        }),
        {
            name: 'visual-db-designer-storage',
        }
    )
);
