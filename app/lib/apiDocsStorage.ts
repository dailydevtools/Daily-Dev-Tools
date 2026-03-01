// IndexedDB Storage Layer for API Documentation Builder
import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { APICollection, RequestHistoryItem, SavedRequestExample } from './apiDocsTypes';

interface APIDocsDB extends DBSchema {
    collections: {
        key: string;
        value: APICollection;
        indexes: { 'by-name': string; 'by-updated': number };
    };
    history: {
        key: string;
        value: RequestHistoryItem;
        indexes: { 'by-endpoint': string; 'by-created': number };
    };
    examples: {
        key: string;
        value: SavedRequestExample;
        indexes: { 'by-endpoint': string };
    };
}

const DB_NAME = 'api-docs-builder';
const DB_VERSION = 2;

let dbInstance: IDBPDatabase<APIDocsDB> | null = null;

async function getDB(): Promise<IDBPDatabase<APIDocsDB>> {
    if (dbInstance) return dbInstance;

    dbInstance = await openDB<APIDocsDB>(DB_NAME, DB_VERSION, {
        upgrade(db, oldVersion, newVersion, transaction) {
            if (oldVersion < 1) {
                const store = db.createObjectStore('collections', { keyPath: 'id' });
                store.createIndex('by-name', 'name');
                store.createIndex('by-updated', 'updatedAt');
            }
            if (oldVersion < 2) {
                const historyStore = db.createObjectStore('history', { keyPath: 'id' });
                historyStore.createIndex('by-endpoint', 'endpointId');
                historyStore.createIndex('by-created', 'createdAt');

                const examplesStore = db.createObjectStore('examples', { keyPath: 'id' });
                examplesStore.createIndex('by-endpoint', 'endpointId');
            }
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

// History CRUD
export async function addRequestHistory(item: RequestHistoryItem): Promise<void> {
    const db = await getDB();
    await db.put('history', item);

    // Optional: Limit history per endpoint or globally? 
    // For now, let's keep it simple. Maybe clean up old later.
}

export async function getRequestHistory(endpointId: string): Promise<RequestHistoryItem[]> {
    const db = await getDB();
    const history = await db.getAllFromIndex('history', 'by-endpoint', endpointId);
    return history.sort((a, b) => b.createdAt - a.createdAt).slice(0, 50); // Return last 50
}

export async function clearRequestHistory(endpointId: string): Promise<void> {
    const db = await getDB();
    // This is a bit inefficient without a range delete, but idb wrapper makes it okayish
    const keys = await db.getAllKeysFromIndex('history', 'by-endpoint', endpointId);
    const tx = db.transaction('history', 'readwrite');
    await Promise.all(keys.map(key => tx.store.delete(key)));
    await tx.done;
}

// Examples CRUD
export async function saveExample(example: SavedRequestExample): Promise<void> {
    const db = await getDB();
    await db.put('examples', example);
}

export async function getExamples(endpointId: string): Promise<SavedRequestExample[]> {
    const db = await getDB();
    return db.getAllFromIndex('examples', 'by-endpoint', endpointId);
}

export async function deleteExample(id: string): Promise<void> {
    const db = await getDB();
    await db.delete('examples', id);
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
