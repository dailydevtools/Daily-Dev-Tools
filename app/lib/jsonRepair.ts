/**
 * Extremely basic JSON repair implementation.
 * For production use, consider using a library like 'json-repair' or 'json5'.
 */
export function repairJSON(jsonString: string): string {
    let fixed = jsonString;

    // Remove single line comments //
    fixed = fixed.replace(/\/\/.*$/gm, '');

    // Remove multi-line comments /* ... */
    fixed = fixed.replace(/\/\*[\s\S]*?\*\//g, '');

    // Replace single quotes with double quotes (basic heuristic, might break if string contains quotes)
    // accessible mainly for keys
    fixed = fixed.replace(/'/g, '"');

    // Remove trailing commas
    fixed = fixed.replace(/,\s*([\]}])/g, '$1');

    // Add quotes to unquoted keys (simple alphanumeric keys)
    // Matches { key: ... } -> { "key": ... }
    fixed = fixed.replace(/([{,]\s*)([a-zA-Z0-9_]+)(\s*:)/g, '$1"$2"$3');

    return fixed;
}
