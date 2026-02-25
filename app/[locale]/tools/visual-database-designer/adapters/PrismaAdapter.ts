
import { DatabaseAdapter } from './DatabaseAdapter';
import { InternalSchema, Table, Column, Relation, DataType } from '../core/InternalModel';
import { nanoid } from 'nanoid';

export class PrismaAdapter implements DatabaseAdapter {
    id: 'prisma' = 'prisma'; // Or string if broader
    label = 'Prisma';

    canParse(input: string): boolean {
        return /model\s+\w+\s+\{/i.test(input) || /datasource\s+db/i.test(input);
    }

    // --- GENERATION LOGIC ---

    generate(schema: InternalSchema): string {
        const models = Object.values(schema.tables)
            .map(table => this.generateModel(table))
            .join('\n\n');

        // Can we generate relations here? Prisma relations are defined on fields.
        // My generateModel logic needs to be smart about relations.
        // It should look into schema.relations to add the relation fields.

        const header = `datasource db {
  provider = "${schema.meta.database || 'postgresql'}"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
`;

        return `${header}\n${models}`;
    }

    private generateModel(table: Table): string {
        const columns = Object.values(table.columns)
            .map(col => this.generateField(col))
            .join('\n  ');

        // TODO: Handle Relations (requires looking up relations where this table is involved)
        // For MVP, simple fields.

        return `model ${table.name} {\n  ${columns}\n}`;
    }

    private generateField(col: Column): string {
        let type = '';
        let attributes = '';

        switch (col.type) {
            case 'increments':
                type = 'Int';
                attributes = '@id @default(autoincrement())';
                break;
            case 'string': case 'text': case 'varchar': case 'char': type = 'String'; break;
            case 'Int': case 'number': case 'integer': type = 'Int'; break;
            case 'BigInt': case 'bigint': type = 'BigInt'; break;
            case 'Float': case 'float': case 'real': type = 'Float'; break;
            case 'Decimal': case 'decimal': case 'numeric': type = 'Decimal'; break;
            case 'Boolean': case 'boolean': type = 'Boolean'; break;
            case 'DateTime': case 'date': case 'datetime': case 'timestamp': type = 'DateTime'; break;
            case 'Json': case 'json': case 'jsonb': type = 'Json'; break;
            case 'Bytes': case 'binary': case 'blob': type = 'Bytes'; break;
            case 'uuid':
                type = 'String';
                attributes = '@default(uuid())';
                if (col.primaryKey) attributes += ' @id';
                break;
            case 'Unsupported': type = 'Unsupported("...")'; break;
            default: type = 'String';
        }

        if (col.primaryKey && col.type !== 'increments' && col.type !== 'uuid') {
            if (!attributes.includes('@id')) attributes += ' @id';
        }

        if (col.unique && col.type !== 'increments' && !attributes.includes('@unique')) {
            attributes += ' @unique';
        }

        if (col.nullable) {
            type += '?';
        }

        if (col.isArray) {
            type += '[]';
        }

        if (col.defaultValue && !attributes.includes('@default')) {
            if (col.type === 'Boolean' || col.type === 'boolean') attributes += ` @default(${col.defaultValue})`;
            else if (col.type === 'Int' || col.type === 'number' || col.type === 'BigInt' || col.type === 'Float' || col.type === 'Decimal') attributes += ` @default(${col.defaultValue})`;
            else attributes += ` @default("${col.defaultValue}")`;
        }

        return `${col.name} ${type} ${attributes}`.trim();
    }

    // --- PARSING LOGIC ---

    parse(input: string): InternalSchema {
        const tables: Record<string, Table> = {};

        // Remove comments
        const cleanInput = input.replace(/\/\/.*$/gm, '').trim();

        const modelRegex = /model\s+(\w+)\s+\{([\s\S]*?)\}/g;
        let match;

        let xPos = 0;
        let yPos = 0;
        const GAP = 300;

        while ((match = modelRegex.exec(cleanInput)) !== null) {
            const tableName = match[1];
            const content = match[2];

            const tableId = nanoid();
            const cols: Record<string, Column> = {};

            const lines = content.split('\n').map(l => l.trim()).filter(Boolean);

            lines.forEach(line => {
                if (line.startsWith('@@')) return;

                const parts = line.split(/\s+/);
                if (parts.length < 2) return;

                const name = parts[0];
                const rawType = parts[1];
                const rest = parts.slice(2).join(' ');

                const colId = nanoid();
                let type: DataType = 'string';

                // Map Prisma types to ISM
                if (rawType.startsWith('Int')) type = 'Int';
                if (rawType.startsWith('BigInt')) type = 'BigInt';
                if (rawType.startsWith('Float')) type = 'Float';
                if (rawType.startsWith('Decimal')) type = 'Decimal';
                if (rawType.startsWith('String')) type = 'string';
                if (rawType.startsWith('Boolean')) type = 'Boolean';
                if (rawType.startsWith('DateTime')) type = 'DateTime';
                if (rawType.startsWith('Json')) type = 'Json';
                if (rawType.startsWith('Bytes')) type = 'Bytes';
                if (rawType.startsWith('Unsupported')) type = 'Unsupported';

                // Check attributes for refinements
                if (rest.includes('@id')) {
                    if (rawType === 'Int' && rest.includes('autoincrement()')) type = 'increments';
                    else if (rest.includes('uuid()')) type = 'uuid';
                }

                cols[colId] = {
                    id: colId,
                    name,
                    type,
                    nullable: rawType.includes('?'),
                    primaryKey: rest.includes('@id'),
                    unique: rest.includes('@unique'),
                    defaultValue: rest.match(/@default\(([^)]+)\)/)?.[1]
                };
            });

            tables[tableId] = {
                id: tableId,
                name: tableName,
                columns: cols,
                indices: [],
                position: { x: xPos, y: yPos }
            };

            xPos += GAP;
            if (xPos > 900) { xPos = 0; yPos += GAP; }
        }

        return {
            tables,
            relations: [],
            meta: {
                version: '1.0.0',
                name: 'Imported Prisma Schema',
                database: 'postgresql',
                createdAt: Date.now(),
                updatedAt: Date.now()
            }
        };
    }

    getDataTypes(): { value: string; label: string; group?: string }[] {
        return [
            { value: 'String', label: 'String', group: 'Scalar' },
            { value: 'Int', label: 'Int', group: 'Scalar' },
            { value: 'BigInt', label: 'BigInt', group: 'Scalar' },
            { value: 'Float', label: 'Float', group: 'Scalar' },
            { value: 'Decimal', label: 'Decimal', group: 'Scalar' },
            { value: 'Boolean', label: 'Boolean', group: 'Scalar' },
            { value: 'DateTime', label: 'DateTime', group: 'Scalar' },
            { value: 'Json', label: 'Json', group: 'Scalar' },
            { value: 'Bytes', label: 'Bytes', group: 'Scalar' },
            { value: 'increments', label: 'Int @id @default(autoincrement())', group: 'Special' },
            { value: 'uuid', label: 'String @id @default(uuid())', group: 'Special' },
            { value: 'Unsupported', label: 'Unsupported', group: 'Special' },
        ];
    }
}
