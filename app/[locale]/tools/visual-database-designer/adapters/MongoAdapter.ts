
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
            case 'number': case 'int': case 'long': type = 'Number'; break;
            case 'double': type = 'Number'; break;
            case 'decimal128': type = 'Schema.Types.Decimal128'; break;
            case 'boolean': type = 'Boolean'; break;
            case 'date': type = 'Date'; break;
            case 'timestamp': type = 'Schema.Types.Date'; break; // Or use a specific timestamp plugin
            case 'objectId': type = 'Schema.Types.ObjectId'; break;
            case 'array': type = '[Schema.Types.Mixed]'; break;
            case 'object': type = 'Schema.Types.Mixed'; break;
            case 'json': type = 'Schema.Types.Mixed'; break;
            case 'binary': type = 'Buffer'; break;
            case 'null': type = 'Schema.Types.Mixed'; break;
            case 'regex': type = 'Schema.Types.Mixed'; break;
            case 'javascript': type = 'String'; break;
            case 'uuid': type = 'String'; break;
            default: type = 'String';
        }

        // Build definition object if it has constraints
        const props: string[] = [`type: ${type}`];

        if (!col.nullable) props.push('required: true');
        if (col.unique) props.push('unique: true');
        if (col.defaultValue) {
            const def = (col.type === 'string' || col.type === 'text') ? `'${col.defaultValue}'` : col.defaultValue;
            props.push(`default: ${def}`);
        }

        return `${col.name}: { ${props.join(', ')} }`;
    }

    // --- PARSING LOGIC (Placeholder) ---

    parse(input: string): InternalSchema {
        throw new Error('MongoDB Parsing not implemented yet');
    }

    getDataTypes(): { value: string; label: string; group?: string }[] {
        return [
            { value: 'string', label: 'String', group: 'Basic' },
            { value: 'boolean', label: 'Boolean', group: 'Basic' },
            { value: 'double', label: 'Double', group: 'Basic' },
            { value: 'int', label: 'Int32', group: 'Basic' },
            { value: 'long', label: 'Int64', group: 'Basic' },
            { value: 'decimal128', label: 'Decimal128', group: 'Basic' },
            { value: 'date', label: 'Date', group: 'Date/Time' },
            { value: 'timestamp', label: 'Timestamp', group: 'Date/Time' },
            { value: 'object', label: 'Object', group: 'Object/Array' },
            { value: 'array', label: 'Array', group: 'Object/Array' },
            { value: 'objectId', label: 'ObjectId', group: 'Special' },
            { value: 'null', label: 'Null', group: 'Special' },
            { value: 'binary', label: 'Binary', group: 'Special' },
            { value: 'regex', label: 'Regex', group: 'Special' },
            { value: 'javascript', label: 'JavaScript', group: 'Special' },
            { value: 'minKey', label: 'MinKey', group: 'Special' },
            { value: 'maxKey', label: 'MaxKey', group: 'Special' },
        ];
    }
}
