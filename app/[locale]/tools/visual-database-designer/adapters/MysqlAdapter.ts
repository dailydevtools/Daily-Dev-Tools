
import { DatabaseAdapter } from './DatabaseAdapter';
import { InternalSchema, Table, Column, Relation } from '../core/InternalModel';
import { parseMysqlSQL } from '../utils/sqlParser';

export class MysqlAdapter implements DatabaseAdapter {
    id: 'mysql' = 'mysql'; // Updated to match interface literal if needed, or string
    label = 'MySQL';

    canParse(input: string): boolean {
        return /CREATE TABLE/i.test(input) && /(`|INT|VARCHAR|TEXT)/i.test(input);
    }

    // --- GENERATION LOGIC ---

    generate(schema: InternalSchema): string {
        const tablesSql = Object.values(schema.tables)
            .map(table => this.generateTable(table))
            .join('\n\n');

        const relationsSql = schema.relations
            .map(rel => this.generateRelation(rel))
            .join('\n');

        return `${tablesSql}\n\n${relationsSql}`.trim();
    }

    private generateTable(table: Table): string {
        const columns = Object.values(table.columns)
            .map(col => this.generateColumn(col))
            .join(',\n  ');

        const primaryKeys = Object.values(table.columns)
            .filter(col => col.primaryKey && col.type !== 'increments') // Increments handle their own PK in some dialects, but standard SQL usually explicit
            .map(col => `\`${col.name}\``);

        let pkClause = '';
        if (primaryKeys.length > 0) {
            pkClause = `,\n  PRIMARY KEY (${primaryKeys.join(', ')})`;
        }

        return `CREATE TABLE \`${table.name}\` (\n  ${columns}${pkClause}\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`;
    }

    private generateColumn(col: Column): string {
        let type = '';

        switch (col.type) {
            case 'increments': type = 'INT AUTO_INCREMENT PRIMARY KEY'; break;
            case 'string': type = 'VARCHAR(255)'; break;
            case 'text': type = 'TEXT'; break;
            case 'number': type = 'INT'; break;
            case 'boolean': type = 'TINYINT(1)'; break;
            case 'date': type = 'DATETIME'; break;
            case 'uuid': type = 'CHAR(36)'; break; // MySQL 5.7+ doesn't have native UUID
            case 'json': type = 'JSON'; break;
            default: type = 'VARCHAR(255)';
        }

        let parts = [`\`${col.name}\``, type];

        if (!col.nullable && col.type !== 'increments') parts.push('NOT NULL');
        if (col.unique && col.type !== 'increments') parts.push('UNIQUE');
        if (col.defaultValue) parts.push(`DEFAULT ${col.defaultValue}`);

        return parts.join(' ');
    }

    private generateRelation(rel: Relation): string {
        return `-- Relation: ${rel.fromTable}.${rel.fromColumn} -> ${rel.toTable}.${rel.toColumn} (${rel.type})`;
        // MySQL FKs are usually generating inside CREATE TABLE or ALTER TABLE.
        // For MVP, simple comments or ALTER TABLE statements
        // return `ALTER TABLE \`${rel.fromTable}\` ADD CONSTRAINT ...`;
    }

    // --- PARSING LOGIC (Placeholder for now) ---

    parse(input: string): InternalSchema {
        try {
            return parseMysqlSQL(input);
        } catch (e) {
            console.error('Failed to parse MySQL SQL', e);
            throw new Error('Failed to parse SQL. Ensure it contains valid CREATE TABLE statements.');
        }
    }

    getDataTypes(): { value: string; label: string; group?: string }[] {
        return [
            { value: 'increments', label: 'INT AUTO_INCREMENT' },
            { value: 'string', label: 'VARCHAR(255)' },
            { value: 'text', label: 'TEXT' },
            { value: 'number', label: 'INT' },
            { value: 'boolean', label: 'TINYINT(1)' },
            { value: 'date', label: 'DATETIME' },
            { value: 'uuid', label: 'CHAR(36)' },
            { value: 'json', label: 'JSON' },
        ];
    }
}
