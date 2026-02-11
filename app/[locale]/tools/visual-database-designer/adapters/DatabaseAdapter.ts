import { InternalSchema } from '../core/InternalModel';

export interface DatabaseAdapter {
    id: 'postgresql' | 'mysql' | 'mongodb' | 'prisma';
    label: string;

    /**
     * Returns true if this adapter can parse the given input string
     */
    canParse(input: string): boolean;

    /**
     * Converts external string format to Internal Schema
     */
    parse(input: string): InternalSchema;

    /**
     * Converts Internal Schema to external string format
     */
    generate(schema: InternalSchema): string;

    /**
     * Returns specific data types for the UI dropdowns
     * Maps internal types to display labels
     */
    getDataTypes(): { value: string; label: string; group?: string }[];
}
