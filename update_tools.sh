#!/bin/bash
TARGET_DIR="/Users/sohanram/Documents/test-projects/quickdevtools/app/tools"

echo "Starting bulk update in $TARGET_DIR"

find "$TARGET_DIR" -name "page.tsx" -mindepth 2 | while read file; do
    # 1. Remove the Navbar block (from "{/* Navbar */}" to "</nav>")
    perl -i -0777 -pe 's/\{\/\* Navbar \*\/\}[\s\S]*?<\/nav>//g' "$file"

    # 2. Remove "paddingTop: 100," (with comma)
    perl -i -pe 's/paddingTop: 100,\s*//g' "$file"
    
    # 3. Remove "paddingTop: 100" (without comma, if at end of props)
    perl -i -pe 's/paddingTop: 100//g' "$file"
done

echo "Done updating all tool pages."
