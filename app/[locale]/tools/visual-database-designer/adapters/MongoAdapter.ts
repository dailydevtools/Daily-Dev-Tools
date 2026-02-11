
import { DatabaseAdapter } from './DatabaseAdapter';
import { InternalSchema, Table, Column, Relation, DataType } from '../core/InternalModel';

export class MongoAdapter implements DatabaseAdapter {
    id: 'mongodb' = 'mongodb';
    label = 'MongoDB (Mongoose)';

    canParse(input: string): boolean {
        return /new\s+Schema\s*\(|mongoose\.model/i.test(input);
    }

    // --- GENERATION LOGIC ---

    generate(schema: InternalSchema): string {
        const schemas = Object.values(schema.tables)
            .map(table => this.generateMongooseSchema(table))
            .join('\n\n');

        return `import mongoose, { Schema, Document } from 'mongoose';\n\n${schemas}`;
    }

    private generateMongooseSchema(table: Table): string {
        const fields = Object.values(table.columns)
            .filter(col => col.name !== '_id') // Mongoose adds _id by default
            .map(col => this.generateField(col))
            .join(',\n  ');

        const schemaName = `${table.name}Schema`;
        const modelName = table.name.charAt(0).toUpperCase() + table.name.slice(1);

        return `const ${schemaName} = new Schema({\n  ${fields}\n}, {\n  timestamps: true\n});\n\nexport const ${modelName} = mongoose.model('${modelName}', ${schemaName});`;
    }

    private generateField(col: Column): string {
        let type = '';

        // Mongoose Types
        switch (col.type) {
            case 'string': type = 'String'; break;
            case 'text': type = 'String'; break;
            case 'number': type = 'Number'; break;
            case 'boolean': type = 'Boolean'; break;
            case 'date': type = 'Date'; break;
            case 'uuid': type = 'String'; break;
            case 'json': type = 'Schema.Types.Mixed'; break;
            case 'increments': return `// ${col.name}: Mongoose handles _id automatically`;
            default: type = 'String';
        }

        // Build definition object if it has constraints
        const props: string[] = [`type: ${type}`];

        if (!col.nullable) props.push('required: true');
        if (col.unique) props.push('unique: true');
        if (col.defaultValue) {
            const def = col.type === 'string' ? `'${col.defaultValue}'` : col.defaultValue;
            props.push(`default: ${def}`);
        }

        return `${col.name}: { ${props.join(', ')} }`;
    }

    // --- PARSING LOGIC (Placeholder) ---

    parse(input: string): InternalSchema {
        throw new Error('MongoDB Parsing not implemented yet');
        // Parsing JS/TS code is complex. Feature for next iteration.
    }

    getDataTypes(): { value: string; label: string; group?: string }[] {
        return [
            { value: 'string', label: 'String', group: 'Scalar' },
            { value: 'number', label: 'Number', group: 'Scalar' },
            { value: 'boolean', label: 'Boolean', group: 'Scalar' },
            { value: 'date', label: 'Date', group: 'Scalar' },
            { value: 'json', label: 'Mixed / Object', group: 'Complex' },
            { value: 'uuid', label: 'String (UUID)', group: 'Scalar' },
        ];
    }
}
