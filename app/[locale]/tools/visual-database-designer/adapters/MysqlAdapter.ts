
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
            case 'tinyint': type = 'TINYINT'; break;
            case 'smallint': type = 'SMALLINT'; break;
            case 'mediumint': type = 'MEDIUMINT'; break;
            case 'integer': case 'number': type = 'INT'; break;
            case 'bigint': type = 'BIGINT'; break;
            case 'float': type = 'FLOAT'; break;
            case 'double': type = 'DOUBLE'; break;
            case 'decimal': type = `DECIMAL(${col.precision || 10}, ${col.scale || 2})`; break;
            case 'char': type = `CHAR(${col.length || 1})`; break;
            case 'varchar': case 'string': type = `VARCHAR(${col.length || 255})`; break;
            case 'tinytext': type = 'TINYTEXT'; break;
            case 'text': type = 'TEXT'; break;
            case 'mediumtext': type = 'MEDIUMTEXT'; break;
            case 'longtext': type = 'LONGTEXT'; break;
            case 'date': type = 'DATE'; break;
            case 'time': type = 'TIME'; break;
            case 'datetime': type = 'DATETIME'; break;
            case 'timestamp': type = 'TIMESTAMP'; break;
            case 'year': type = 'YEAR'; break;
            case 'binary': type = `BINARY(${col.length || 1})`; break;
            case 'varbinary': type = `VARBINARY(${col.length || 255})`; break;
            case 'tinyblob': type = 'TINYBLOB'; break;
            case 'blob': type = 'BLOB'; break;
            case 'mediumblob': type = 'MEDIUMBLOB'; break;
            case 'longblob': type = 'LONGBLOB'; break;
            case 'boolean': type = 'TINYINT(1)'; break;
            case 'uuid': type = 'CHAR(36)'; break;
            case 'json': type = 'JSON'; break;
            case 'increments': type = 'INT AUTO_INCREMENT'; break;
            case 'enum': type = 'ENUM(...)'; break;
            case 'set': type = 'SET(...)'; break;
            default: type = 'VARCHAR(255)';
        }

        if (col.autoIncrement || col.type === 'increments') {
            if (!type.includes('AUTO_INCREMENT')) type += ' AUTO_INCREMENT';
        }

        let parts = [`\`${col.name}\``, type];

        if (!col.nullable) parts.push('NOT NULL');
        if (col.unique) parts.push('UNIQUE');
        if (col.defaultValue) {
            if (typeof col.defaultValue === 'string' && !['CURRENT_TIMESTAMP', 'NULL'].includes(col.defaultValue.toUpperCase())) {
                parts.push(`DEFAULT '${col.defaultValue}'`);
            } else {
                parts.push(`DEFAULT ${col.defaultValue}`);
            }
        }

        return parts.join(' ');
    }

    private generateRelation(rel: Relation): string {
        return `-- Relation: ${rel.fromTable}.${rel.fromColumn} -> ${rel.toTable}.${rel.toColumn} (${rel.type})`;
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
            { value: 'tinyint', label: 'TINYINT', group: 'Numeric' },
            { value: 'smallint', label: 'SMALLINT', group: 'Numeric' },
            { value: 'integer', label: 'INT', group: 'Numeric' },
            { value: 'bigint', label: 'BIGINT', group: 'Numeric' },
            { value: 'float', label: 'FLOAT', group: 'Numeric' },
            { value: 'double', label: 'DOUBLE', group: 'Numeric' },
            { value: 'decimal', label: 'DECIMAL', group: 'Numeric' },
            { value: 'increments', label: 'INT AUTO_INCREMENT', group: 'Numeric' },
            { value: 'char', label: 'CHAR', group: 'String' },
            { value: 'varchar', label: 'VARCHAR', group: 'String' },
            { value: 'tinytext', label: 'TINYTEXT', group: 'String' },
            { value: 'text', label: 'TEXT', group: 'String' },
            { value: 'mediumtext', label: 'MEDIUMTEXT', group: 'String' },
            { value: 'longtext', label: 'LONGTEXT', group: 'String' },
            { value: 'date', label: 'DATE', group: 'Date/Time' },
            { value: 'time', label: 'TIME', group: 'Date/Time' },
            { value: 'datetime', label: 'DATETIME', group: 'Date/Time' },
            { value: 'timestamp', label: 'TIMESTAMP', group: 'Date/Time' },
            { value: 'year', label: 'YEAR', group: 'Date/Time' },
            { value: 'binary', label: 'BINARY', group: 'Binary' },
            { value: 'varbinary', label: 'VARBINARY', group: 'Binary' },
            { value: 'blob', label: 'BLOB', group: 'Binary' },
            { value: 'json', label: 'JSON', group: 'Other' },
            { value: 'enum', label: 'ENUM', group: 'Other' },
            { value: 'set', label: 'SET', group: 'Other' },
        ];
    }
}
