
export type DataType =
    // Generic
    | 'string' | 'number' | 'boolean' | 'date' | 'json' | 'uuid' | 'increments' | 'text' | 'binary'
    // PostgreSQL Specific
    | 'smallint' | 'integer' | 'bigint' | 'decimal' | 'numeric' | 'real' | 'double precision' | 'smallserial' | 'serial' | 'bigserial'
    | 'char' | 'varchar' | 'time' | 'timestamp' | 'timestamptz' | 'interval' | 'jsonb' | 'xml' | 'inet' | 'cidr'
    // MySQL Specific
    | 'tinyint' | 'mediumint' | 'float' | 'double' | 'tinytext' | 'mediumtext' | 'longtext'
    | 'datetime' | 'year' | 'varbinary' | 'tinyblob' | 'blob' | 'mediumblob' | 'longblob' | 'enum' | 'set'
    // MongoDB Specific
    | 'double' | 'int' | 'long' | 'decimal128' | 'objectId' | 'array' | 'object' | 'null' | 'regex' | 'javascript' | 'timestamp' | 'minKey' | 'maxKey'
    // Prisma Specific
    | 'Int' | 'BigInt' | 'Float' | 'Decimal' | 'Boolean' | 'DateTime' | 'Json' | 'Bytes' | 'Unsupported';

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
    isArray?: boolean; // for array types (e.g. PG TEXT[])
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
