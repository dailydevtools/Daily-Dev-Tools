import { InternalSchema, Table, Column, Index, DataType } from '../core/InternalModel';
import { nanoid } from 'nanoid';

export const parsePostgresSQL = (sql: string): InternalSchema => {
    const tables: Record<string, Table> = {};
    const relations: any[] = [];

    // Normalize input
    const cleanSql = sql
        .replace(/\/\*[\s\S]*?\*\//g, '') // remove multi-line comments
        .replace(/--.*/g, '') // remove single-line comments
        .trim();

    // Split by statements (rough split by semicolon)
    const statements = cleanSql.split(';').map(s => s.trim()).filter(Boolean);

    let currentTable: Table | null = null;
    let xPos = 0;
    let yPos = 0;
    const GAP = 300;
    const COLUMNS_PER_ROW = 3;

    for (const stmt of statements) {
        // CREATE TABLE
        const createTableMatch = stmt.match(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?["`]?([a-zA-Z0-9_]+)["`]?/i);

        if (createTableMatch) {
            const tableName = createTableMatch[1];
            const id = nanoid();

            currentTable = {
                id,
                name: tableName,
                columns: {},
                indices: [],
                position: { x: xPos, y: yPos }
            };

            // Layout logic: simple grid
            xPos += GAP;
            if (xPos > GAP * COLUMNS_PER_ROW) {
                xPos = 0;
                yPos += GAP;
            }

            // Extract content inside parentheses
            // This is a naive regex approach. A real parser (e.g. pg-query-parser) is better but heavy.
            // Helper to split by comma obeying parentheses
            const splitByComma = (str: string): string[] => {
                const result: string[] = [];
                let current = '';
                let depth = 0;
                let inQuote = false;

                for (let i = 0; i < str.length; i++) {
                    const char = str[i];
                    if (char === '"' || char === '`' || char === "'") {
                        // Simple quote toggle - simplistic but often enough for simple SQL
                        inQuote = !inQuote;
                    }

                    if (!inQuote) {
                        if (char === '(') depth++;
                        if (char === ')') depth--;
                    }

                    if (char === ',' && depth === 0 && !inQuote) {
                        result.push(current.trim());
                        current = '';
                    } else {
                        current += char;
                    }
                }
                if (current.trim()) result.push(current.trim());
                return result;
            };

            const contentMatch = stmt.match(/\(([\s\S]*)\)/);
            if (contentMatch) {
                // Remove the outer parens match and just take the inner content
                // Actually the regex capture group 1 gives us the inner content.
                // But wait, if the table definition ends with ); the regex `\(([\s\S]*)\)` is greedy and might catch the LAST closing paren.
                // It should be fine for a single standard CREATE TABLE.

                // Let's rely on the capture group 1.
                const innerContent = contentMatch[1];
                const lines = splitByComma(innerContent);

                for (const line of lines) {
                    if (!line) continue;

                    // Check for Primary Key constraint at table level
                    if (/PRIMARY\s+KEY/i.test(line) && /^\s*PRIMARY\s+KEY\s*\(/.test(line)) {
                        const pkMatch = line.match(/\((.*?)\)/);
                        if (pkMatch) {
                            const pkCols = pkMatch[1].split(',').map(c => c.trim().replace(/["`]/g, ''));
                            pkCols.forEach(pkColName => {
                                const col = Object.values(currentTable!.columns).find(c => c.name === pkColName);
                                if (col) col.primaryKey = true;
                            });
                        }
                        continue;
                    }

                    // Check for Foreign Key constraint at table level
                    if (/FOREIGN\s+KEY/i.test(line)) {
                        // Parse later or handled here? 
                        // Let's try to handle basic FKs: FOREIGN KEY ("userId") REFERENCES "users"("id")
                        const fkMatch = line.match(/FOREIGN\s+KEY\s*\((.*?)\)\s*REFERENCES\s+["`]?(\w+)["`]?\s*\((.*?)\)/i);
                        if (fkMatch && currentTable) {
                            const fromColName = fkMatch[1].replace(/["`]/g, '');
                            const toTableName = fkMatch[2];
                            const toColName = fkMatch[3].replace(/["`]/g, '');

                            // We need to resolve fromColId. We might not find it if defined after?
                            // Actually we can store the relation loosely and resolve IDs later or just use names for now?
                            // The InternalModel uses IDs. We have to resolve them effectively.
                            // For now, let's store a raw relation object and link up IDs after parsing all tables.
                            relations.push({
                                fromTable: currentTable.name, // temporal
                                fromColumn: fromColName, // temporal
                                toTable: toTableName, // temporal
                                toColumn: toColName // temporal
                            });
                        }
                        continue;
                    }

                    // Column Definition
                    // "id" SERIAL PRIMARY KEY
                    // "name" VARCHAR(255) NOT NULL
                    const colParts = line.split(/\s+/);
                    const colName = colParts[0].replace(/["`]/g, '');
                    const rawType = colParts.slice(1).join(' ').toUpperCase(); // Rough type + constraints

                    // Heuristic Type Inference
                    let type: DataType = 'string';
                    if (rawType.includes('INT') || rawType.includes('SERIAL') || rawType.includes('DECIMAL') || rawType.includes('NUMERIC')) type = 'number';
                    if (rawType.includes('BOOL')) type = 'boolean';
                    if (rawType.includes('TIME') || rawType.includes('DATE')) type = 'date';
                    if (rawType.includes('JSON')) type = 'json';
                    if (rawType.includes('UUID')) type = 'uuid';
                    if (rawType.includes('SERIAL')) type = 'increments';

                    const colId = nanoid();
                    currentTable.columns[colId] = {
                        id: colId,
                        name: colName,
                        type,
                        nullable: !rawType.includes('NOT NULL'),
                        primaryKey: rawType.includes('PRIMARY KEY'),
                        unique: rawType.includes('UNIQUE'),
                        rawType: rawType.split(' ')[0] // Keep first part as raw type e.g. VARCHAR(255)
                    };
                }
            }

            tables[id] = currentTable;
        }
    }

    // Post-process relations to link IDs
    const finalRelations: any[] = [];
    relations.forEach(rel => {
        // Find table IDs
        const fromTableEntry = Object.entries(tables).find(([_, t]) => t.name === rel.fromTable);
        const toTableEntry = Object.entries(tables).find(([_, t]) => t.name === rel.toTable);

        if (fromTableEntry && toTableEntry) {
            const [fromTableId, fromTable] = fromTableEntry;
            const [toTableId, toTable] = toTableEntry;

            const fromCol = Object.values(fromTable.columns).find(c => c.name === rel.fromColumn);
            const toCol = Object.values(toTable.columns).find(c => c.name === rel.toColumn);

            if (fromCol && toCol) {
                finalRelations.push({
                    id: nanoid(),
                    fromTable: fromTableId,
                    fromColumn: fromCol.id,
                    toTable: toTableId,
                    toColumn: toCol.id,
                    type: '1:n'
                });
            }
        }
    });

    return {
        tables,
        relations: finalRelations,
        meta: {
            version: '1.0.0',
            name: 'Imported Schema',
            database: 'postgresql',
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
    };
};

export const parseMysqlSQL = (sql: string): InternalSchema => {
    const tables: Record<string, Table> = {};
    const relations: any[] = [];

    // Normalize input
    const cleanSql = sql
        .replace(/\/\*[\s\S]*?\*\//g, '') // remove multi-line comments
        .replace(/--.*/g, '') // remove single-line comments
        .replace(/#.*/g, '') // remove MySQL hash comments
        .trim();

    // Split by statements (rough split by semicolon)
    const statements = cleanSql.split(';').map(s => s.trim()).filter(Boolean);

    let currentTable: Table | null = null;
    let xPos = 0;
    let yPos = 0;
    const GAP = 300;
    const COLUMNS_PER_ROW = 3;

    for (const stmt of statements) {
        // CREATE TABLE including backticks
        const createTableMatch = stmt.match(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?["`]?([a-zA-Z0-9_]+)["`]?/i);

        if (createTableMatch) {
            const tableName = createTableMatch[1];
            const id = nanoid();

            currentTable = {
                id,
                name: tableName,
                columns: {},
                indices: [],
                position: { x: xPos, y: yPos }
            };

            // Layout logic: simple grid
            xPos += GAP;
            if (xPos > GAP * COLUMNS_PER_ROW) {
                xPos = 0;
                yPos += GAP;
            }

            // Extract content inside parentheses
            const splitByComma = (str: string): string[] => {
                const result: string[] = [];
                let current = '';
                let depth = 0;
                let inQuote = false;
                let quoteChar = '';

                for (let i = 0; i < str.length; i++) {
                    const char = str[i];
                    if ((char === '"' || char === '`' || char === "'") && (!inQuote || char === quoteChar)) {
                        inQuote = !inQuote;
                        if (inQuote) quoteChar = char;
                    }

                    if (!inQuote) {
                        if (char === '(') depth++;
                        if (char === ')') depth--;
                    }

                    if (char === ',' && depth === 0 && !inQuote) {
                        result.push(current.trim());
                        current = '';
                    } else {
                        current += char;
                    }
                }
                if (current.trim()) result.push(current.trim());
                return result;
            };

            const contentMatch = stmt.match(/\(([\s\S]*)\)/);
            if (contentMatch) {
                // Determine inner content more robustly by finding the last closing parenthesis that matches the first opening one
                // For now, regex capture is acceptable for simple schemas
                const innerContent = contentMatch[1];
                const lines = splitByComma(innerContent);

                for (const line of lines) {
                    if (!line) continue;

                    // Check for Primary Key constraint at table level
                    if (/PRIMARY\s+KEY/i.test(line) && /^\s*PRIMARY\s+KEY\s*\(/.test(line)) {
                        const pkMatch = line.match(/\((.*?)\)/);
                        if (pkMatch) {
                            const pkCols = pkMatch[1].split(',').map(c => c.trim().replace(/["`]/g, ''));
                            pkCols.forEach(pkColName => {
                                const col = Object.values(currentTable!.columns).find(c => c.name === pkColName);
                                if (col) col.primaryKey = true;
                            });
                        }
                        continue;
                    }

                    // Check for Foreign Key constraint at table level
                    if (/FOREIGN\s+KEY/i.test(line)) {
                        const fkMatch = line.match(/FOREIGN\s+KEY\s*\((.*?)\)\s*REFERENCES\s+["`]?(\w+)["`]?\s*\((.*?)\)/i);
                        if (fkMatch && currentTable) {
                            const fromColName = fkMatch[1].replace(/["`]/g, '');
                            const toTableName = fkMatch[2];
                            const toColName = fkMatch[3].replace(/["`]/g, '');

                            relations.push({
                                fromTable: currentTable.name,
                                fromColumn: fromColName,
                                toTable: toTableName,
                                toColumn: toColName
                            });
                        }
                        continue;
                    }

                    // Skip KEY/INDEX lines which are common in MySQL dump
                    if (/^\s*(KEY|INDEX|UNIQUE KEY)\s+/i.test(line)) {
                        continue;
                    }

                    // Column Definition
                    const colParts = line.split(/\s+/);
                    const colName = colParts[0].replace(/["`]/g, '');
                    const rawType = colParts.slice(1).join(' ').toUpperCase();

                    // Heuristic Type Inference for MySQL
                    let type: DataType = 'string';
                    if (rawType.includes('INT') || rawType.includes('DECIMAL') || rawType.includes('NUMERIC') || rawType.includes('FLOAT') || rawType.includes('DOUBLE')) type = 'number';
                    if (rawType.includes('BOOL') || rawType.includes('TINYINT(1)')) type = 'boolean';
                    if (rawType.includes('TIME') || rawType.includes('DATE') || rawType.includes('YEAR')) type = 'date';
                    if (rawType.includes('JSON')) type = 'json';
                    if (rawType.includes('CHAR(36)') || rawType.includes('UUID')) type = 'uuid';
                    if (rawType.includes('AUTO_INCREMENT')) type = 'increments';
                    // Text overrides string if explicit TEXT type
                    if (rawType.includes('TEXT') || rawType.includes('BLOB')) type = 'text';

                    const colId = nanoid();
                    currentTable.columns[colId] = {
                        id: colId,
                        name: colName,
                        type,
                        nullable: !rawType.includes('NOT NULL'),
                        primaryKey: rawType.includes('PRIMARY KEY'),
                        unique: rawType.includes('UNIQUE'),
                        rawType: rawType.split(' ')[0]
                    };
                }
            }

            tables[id] = currentTable;
        }
    }

    // Post-process relations to link IDs
    const finalRelations: any[] = [];
    relations.forEach(rel => {
        const fromTableEntry = Object.entries(tables).find(([_, t]) => t.name === rel.fromTable);
        const toTableEntry = Object.entries(tables).find(([_, t]) => t.name === rel.toTable);

        if (fromTableEntry && toTableEntry) {
            const [fromTableId, fromTable] = fromTableEntry;
            const [toTableId, toTable] = toTableEntry;

            const fromCol = Object.values(fromTable.columns).find(c => c.name === rel.fromColumn);
            const toCol = Object.values(toTable.columns).find(c => c.name === rel.toColumn);

            if (fromCol && toCol) {
                finalRelations.push({
                    id: nanoid(),
                    fromTable: fromTableId,
                    fromColumn: fromCol.id,
                    toTable: toTableId,
                    toColumn: toCol.id,
                    type: '1:n'
                });
            }
        }
    });

    return {
        tables,
        relations: finalRelations,
        meta: {
            version: '1.0.0',
            name: 'Imported MySQL Schema',
            database: 'mysql',
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
    };
};
