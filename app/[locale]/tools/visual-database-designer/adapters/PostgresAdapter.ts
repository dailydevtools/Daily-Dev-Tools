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
            { value: 'smallint', label: 'SMALLINT', group: 'Numeric' },
            { value: 'integer', label: 'INTEGER', group: 'Numeric' },
            { value: 'bigint', label: 'BIGINT', group: 'Numeric' },
            { value: 'decimal', label: 'DECIMAL', group: 'Numeric' },
            { value: 'numeric', label: 'NUMERIC', group: 'Numeric' },
            { value: 'real', label: 'REAL', group: 'Numeric' },
            { value: 'double precision', label: 'DOUBLE PRECISION', group: 'Numeric' },
            { value: 'serial', label: 'SERIAL', group: 'Numeric' },
            { value: 'bigserial', label: 'BIGSERIAL', group: 'Numeric' },
            { value: 'char', label: 'CHAR', group: 'Character' },
            { value: 'varchar', label: 'VARCHAR(255)', group: 'Character' },
            { value: 'text', label: 'TEXT', group: 'Character' },
            { value: 'boolean', label: 'BOOLEAN', group: 'Boolean' },
            { value: 'date', label: 'DATE', group: 'Date/Time' },
            { value: 'time', label: 'TIME', group: 'Date/Time' },
            { value: 'timestamp', label: 'TIMESTAMP', group: 'Date/Time' },
            { value: 'timestamptz', label: 'TIMESTAMPTZ', group: 'Date/Time' },
            { value: 'interval', label: 'INTERVAL', group: 'Date/Time' },
            { value: 'json', label: 'JSON', group: 'JSON' },
            { value: 'jsonb', label: 'JSONB', group: 'JSON' },
            { value: 'uuid', label: 'UUID', group: 'Special' },
            { value: 'xml', label: 'XML', group: 'Special' },
            { value: 'inet', label: 'INET', group: 'Special' },
            { value: 'cidr', label: 'CIDR', group: 'Special' },
        ];
    }

    private mapTypeToSql(col: Column): string {
        if (col.rawType) return col.rawType;

        let type = '';
        switch (col.type) {
            case 'smallint': type = 'SMALLINT'; break;
            case 'integer': type = 'INTEGER'; break;
            case 'bigint': type = 'BIGINT'; break;
            case 'decimal': type = `DECIMAL(${col.precision || 10}, ${col.scale || 2})`; break;
            case 'numeric': type = `NUMERIC(${col.precision || 10}, ${col.scale || 2})`; break;
            case 'real': type = 'REAL'; break;
            case 'double precision': type = 'DOUBLE PRECISION'; break;
            case 'serial': type = 'SERIAL'; break;
            case 'bigserial': type = 'BIGSERIAL'; break;
            case 'char': type = `CHAR(${col.length || 1})`; break;
            case 'varchar': type = `VARCHAR(${col.length || 255})`; break;
            case 'string': type = `VARCHAR(${col.length || 255})`; break;
            case 'text': type = 'TEXT'; break;
            case 'boolean': type = 'BOOLEAN'; break;
            case 'date': type = 'DATE'; break;
            case 'time': type = 'TIME'; break;
            case 'timestamp': type = 'TIMESTAMP'; break;
            case 'timestamptz': type = 'TIMESTAMPTZ'; break;
            case 'interval': type = 'INTERVAL'; break;
            case 'json': type = 'JSON'; break;
            case 'jsonb': type = 'JSONB'; break;
            case 'uuid': type = 'UUID'; break;
            case 'xml': type = 'XML'; break;
            case 'inet': type = 'INET'; break;
            case 'cidr': type = 'CIDR'; break;
            case 'increments': type = 'SERIAL'; break;
            case 'number': type = col.autoIncrement ? 'SERIAL' : 'INTEGER'; break;
            default: type = 'VARCHAR(255)';
        }

        if (col.isArray) {
            type += '[]';
        }

        return type;
    }

    private escapeString(str: string): string {
        return str.replace(/'/g, "''");
    }
}
