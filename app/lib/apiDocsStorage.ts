// IndexedDB Storage Layer for API Documentation Builder
import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { APICollection } from './apiDocsTypes';

interface APIDocsDB extends DBSchema {
    collections: {
        key: string;
        value: APICollection;
        indexes: { 'by-name': string; 'by-updated': number };
    };
}

const DB_NAME = 'api-docs-builder';
const DB_VERSION = 1;

let dbInstance: IDBPDatabase<APIDocsDB> | null = null;

async function getDB(): Promise<IDBPDatabase<APIDocsDB>> {
    if (dbInstance) return dbInstance;

    dbInstance = await openDB<APIDocsDB>(DB_NAME, DB_VERSION, {
        upgrade(db) {
            const store = db.createObjectStore('collections', { keyPath: 'id' });
            store.createIndex('by-name', 'name');
            store.createIndex('by-updated', 'updatedAt');
        },
    });

    return dbInstance;
}

export async function getAllCollections(): Promise<APICollection[]> {
    const db = await getDB();
    const collections = await db.getAll('collections');
    return collections.sort((a, b) => b.updatedAt - a.updatedAt);
}

export async function getCollection(id: string): Promise<APICollection | undefined> {
    const db = await getDB();
    return db.get('collections', id);
}

export async function saveCollection(collection: APICollection): Promise<void> {
    const db = await getDB();
    await db.put('collections', collection);
}

export async function deleteCollection(id: string): Promise<void> {
    const db = await getDB();
    await db.delete('collections', id);
}

export function generateId(): string {
    return crypto.randomUUID();
}

// Create a new empty collection
export function createEmptyCollection(name: string, baseUrl: string): APICollection {
    const now = Date.now();
    return {
        id: generateId(),
        name,
        baseUrl,
        authType: 'none',
        endpoints: [],
        createdAt: now,
        updatedAt: now,
    };
}
