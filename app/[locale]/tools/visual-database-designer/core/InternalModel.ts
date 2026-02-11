
export type DataType =
    | 'string'    // VARCHAR, TEXT
    | 'number'    // INT, DECIMAL, FLOAT
    | 'boolean'   // BOOLEAN, TINYINT(1)
    | 'date'      // DATETIME, TIMESTAMP
    | 'json'      // JSON, JSONB
    | 'uuid'      // UUID
    | 'increments' // SERIAL, AUTO_INCREMENT
    | 'text'      // TEXT, LONGTEXT
    | 'binary';   // BLOB, BYTEA

export interface InternalSchema {
    tables: Record<string, Table>;
    relations: Relation[];
    meta: SchemaMeta;
}

export interface SchemaMeta {
    version: string;
    name: string;
    database: 'postgresql' | 'mysql' | 'mongodb' | 'prisma';
    createdAt: number;
    updatedAt: number;
}

export interface Table {
    id: string;
    name: string;
    columns: Record<string, Column>;
    indices: Index[];
    position: { x: number; y: number };
    comment?: string;
}

export interface Column {
    id: string;
    name: string;
    type: DataType;
    nullable: boolean;
    primaryKey: boolean;
    unique: boolean;
    autoIncrement?: boolean;
    defaultValue?: string;
    rawType?: string; // e.g. "VARCHAR(255)" for specific DBs preservation
    comment?: string;
    length?: number; // for varchar
    scale?: number; // for decimals
    precision?: number; // for decimals
}

export interface Index {
    id: string;
    name: string;
    columns: string[]; // Column IDs
    unique: boolean;
}

export interface Relation {
    id: string;
    name?: string;
    fromTable: string; // Table ID
    fromColumn: string; // Column ID
    toTable: string; // Table ID
    toColumn: string; // Column ID
    type: '1:1' | '1:n' | 'n:m';
    onDelete?: 'CASCADE' | 'SET NULL' | 'RESTRICT' | 'NO ACTION';
    onUpdate?: 'CASCADE' | 'SET NULL' | 'RESTRICT' | 'NO ACTION';
}
