import { InternalSchema, Table, Column, Index, DataType } from '../core/InternalModel';
import { DatabaseAdapter } from './DatabaseAdapter';
import { parsePostgresSQL } from '../utils/sqlParser';

export class PostgresAdapter implements DatabaseAdapter {
    id = 'postgresql' as const;
    label = 'PostgreSQL';

    canParse(input: string): boolean {
        // Simple heuristic: check for CREATE TABLE and Postgres specific types or keywords
        return /CREATE\s+TABLE/i.test(input) && (/TEXT/i.test(input) || /SERIAL/i.test(input) || /UUID/i.test(input));
    }

    parse(input: string): InternalSchema {
        try {
            return parsePostgresSQL(input);
        } catch (e) {
            console.error('Failed to parse SQL', e);
            throw new Error('Failed to parse SQL. Ensure it contains valid CREATE TABLE statements.');
        }
    }

    generate(schema: InternalSchema): string {
        const lines: string[] = [];

        // 1. Extensions (if needed)
        // Check if any UUID type exists
        const hasUuid = Object.values(schema.tables).some(table =>
            Object.values(table.columns).some(col => col.type === 'uuid')
        );

        if (hasUuid) {
            lines.push('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
            lines.push('');
        }

        // 2. Tables
        for (const table of Object.values(schema.tables)) {
            lines.push(`CREATE TABLE "${table.name}" (`);

            const columnDefs: string[] = [];
            const primaryKeys: string[] = [];

            for (const col of Object.values(table.columns)) {
                let def = `  "${col.name}" ${this.mapTypeToSql(col)}`;

                if (!col.nullable) {
                    def += ' NOT NULL';
                }

                if (col.defaultValue) {
                    def += ` DEFAULT ${col.defaultValue}`;
                }

                if (col.unique) {
                    def += ' UNIQUE';
                }

                if (col.primaryKey) {
                    primaryKeys.push(`"${col.name}"`);
                }

                columnDefs.push(def);
            }

            // Add Primary Key constraint
            if (primaryKeys.length > 0) {
                columnDefs.push(`  PRIMARY KEY (${primaryKeys.join(', ')})`);
            }

            lines.push(columnDefs.join(',\n'));
            lines.push(');');

            // Comments
            if (table.comment) {
                lines.push(`COMMENT ON TABLE "${table.name}" IS '${this.escapeString(table.comment)}';`);
            }

            for (const col of Object.values(table.columns)) {
                if (col.comment) {
                    lines.push(`COMMENT ON COLUMN "${table.name}"."${col.name}" IS '${this.escapeString(col.comment)}';`);
                }
            }

            lines.push('');
        }

        // 3. Foreign Keys (Relations)
        for (const rel of schema.relations) {
            const fromTable = schema.tables[rel.fromTable];
            const toTable = schema.tables[rel.toTable];
            const fromCol = fromTable.columns[rel.fromColumn];
            const toCol = toTable.columns[rel.toColumn];

            if (!fromTable || !toTable || !fromCol || !toCol) continue;

            let constraint = `ALTER TABLE "${fromTable.name}" ADD FOREIGN KEY ("${fromCol.name}") REFERENCES "${toTable.name}" ("${toCol.name}")`;

            if (rel.onDelete && rel.onDelete !== 'NO ACTION') {
                constraint += ` ON DELETE ${rel.onDelete}`;
            }
            if (rel.onUpdate && rel.onUpdate !== 'NO ACTION') {
                constraint += ` ON UPDATE ${rel.onUpdate}`;
            }

            lines.push(constraint + ';');
        }

        return lines.join('\n');
    }

    getDataTypes() {
        return [
            { value: 'string', label: 'VARCHAR(255)', group: 'String' },
            { value: 'text', label: 'TEXT', group: 'String' },
            { value: 'number', label: 'INTEGER', group: 'Number' },
            { value: 'increments', label: 'SERIAL (Auto Increment)', group: 'Number' },
            { value: 'boolean', label: 'BOOLEAN', group: 'Boolean' },
            { value: 'date', label: 'TIMESTAMP', group: 'Date/Time' },
            { value: 'json', label: 'JSONB', group: 'JSON' },
            { value: 'uuid', label: 'UUID', group: 'Other' },
        ];
    }

    private mapTypeToSql(col: Column): string {
        if (col.rawType) return col.rawType;

        switch (col.type) {
            case 'string': return `VARCHAR(${col.length || 255})`;
            case 'text': return 'TEXT';
            case 'number': return col.autoIncrement ? 'SERIAL' : 'INTEGER';
            case 'increments': return 'SERIAL';
            case 'boolean': return 'BOOLEAN';
            case 'date': return 'TIMESTAMP';
            case 'json': return 'JSONB';
            case 'uuid': return 'UUID';
            case 'binary': return 'BYTEA';
            default: return 'VARCHAR(255)';
        }
    }

    private escapeString(str: string): string {
        return str.replace(/'/g, "''");
    }
}
