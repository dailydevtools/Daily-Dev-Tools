// UUID v4 Generator using Web Crypto API

export interface UuidResult {
    success: boolean;
    uuid?: string;
    error?: string;
}

export function generateUUID(): UuidResult {
    try {
        const uuid = crypto.randomUUID();
        return { success: true, uuid };
    } catch {
        // Fallback for older browsers
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
        return { success: true, uuid };
    }
}

export function generateMultipleUUIDs(count: number): string[] {
    const uuids: string[] = [];
    for (let i = 0; i < count; i++) {
        const result = generateUUID();
        if (result.uuid) uuids.push(result.uuid);
    }
    return uuids;
}
