export interface ToolFAQ {
  q: string;
  a: string;
}

export interface ToolSEOData {
  about: string;
  howTo: string[];
  faq: ToolFAQ[];
}

export const toolSEOContent: Record<string, ToolSEOData> = {
  "json-formatter": {
    about: "JSON (JavaScript Object Notation) is the standard data interchange format for APIs, config files, and web apps. A JSON formatter takes raw, unreadable JSON strings and adds proper indentation, line breaks, and syntax highlighting so you can quickly understand data structures. DailyDevTools' JSON Formatter validates your JSON in real-time, highlights syntax errors with precise line numbers, and supports tree-view navigation for deeply nested objects — all without sending your data to any server.",
    howTo: [
      "Paste your JSON string into the left panel, or click Upload to load a .json file from disk",
      "The formatter validates instantly — errors appear as red underlines with the exact line and character position",
      "Use the indent selector to choose 2 or 4 spaces, then click Format to apply",
      "Switch to Tree view to explore nested objects visually, or Convert to export as CSV, YAML, or XML"
    ],
    faq: [
      { q: "Is my JSON data sent to any server?", a: "No. DailyDevTools' JSON Formatter runs entirely in your browser. Your data never leaves your device, making it safe for sensitive API responses, tokens, and internal configs." },
      { q: "Can it fix broken JSON?", a: "Yes. The formatter includes an Auto-repair feature that fixes common issues like trailing commas, missing quotes around keys, and single-quoted strings." },
      { q: "What's the maximum JSON size it handles?", a: "The formatter handles most real-world payloads. Very large files (50MB+) may slow down the editor, but there is no hard size cap." }
    ]
  },
  "base64-encoder": {
    about: "Base64 is a binary-to-text encoding scheme that represents binary data using 64 printable ASCII characters. It is widely used to embed binary data — images, files, certificates — into text formats like JSON, XML, HTML, and email headers. DailyDevTools' Base64 Encoder/Decoder converts text and binary data to and from Base64 instantly in your browser, supporting both standard and URL-safe Base64 variants with no server involved.",
    howTo: [
      "Type or paste your text in the input field, or switch to File mode to upload any binary file",
      "Click Encode to convert your input to Base64, or paste an existing Base64 string and click Decode",
      "Toggle URL-safe mode to use - and _ instead of + and / for safe use in URLs and filenames",
      "Click Copy to copy the result directly to your clipboard"
    ],
    faq: [
      { q: "What is the difference between Base64 and URL-safe Base64?", a: "Standard Base64 uses + and / characters, which are special in URLs. URL-safe Base64 replaces them with - and _ so the encoded string can be used directly in URLs without percent-encoding." },
      { q: "Can I encode binary files, not just text?", a: "Yes. Use File mode to upload any file (image, PDF, binary) and get its Base64 representation, which you can embed in HTML, CSS data URIs, or JSON payloads." },
      { q: "Does Base64 compress or encrypt data?", a: "Neither. Base64 only encodes binary to ASCII text — it increases size by about 33% and provides no security. For encryption, use AES-256 or similar algorithms." }
    ]
  },
  "jwt-decoder": {
    about: "JSON Web Tokens (JWTs) are compact, URL-safe tokens used for authentication and data exchange in modern web apps. A JWT has three Base64URL-encoded parts: the header (algorithm), payload (claims), and signature. DailyDevTools' JWT Decoder instantly splits and decodes all three parts, displays human-readable timestamps, checks token expiry, and highlights the algorithm used — without ever sending your token to a server.",
    howTo: [
      "Paste your JWT token (the string starting with 'eyJ...') into the input field",
      "The decoder instantly shows the decoded Header, Payload, and Signature in separate panels",
      "Check the Expiry indicator to see if the token is still valid based on the 'exp' claim",
      "Hover over any timestamp field to see the human-readable UTC date and time"
    ],
    faq: [
      { q: "Is it safe to paste my JWT here?", a: "Yes. The decoder runs entirely in your browser — your token is never sent to any server. However, for production secrets or admin tokens, always prefer a local tool." },
      { q: "Can this verify the JWT signature?", a: "The decoder shows all decoded fields but does not verify the cryptographic signature, as that requires the secret key. Use it for inspecting token contents and expiry, not for security validation." },
      { q: "What does Token Expired mean?", a: "JWTs include an 'exp' claim — a Unix timestamp after which the token is no longer valid. The decoder compares this against the current time and flags expired tokens in red." }
    ]
  },
  "regex-tester": {
    about: "Regular expressions (regex) are powerful pattern-matching sequences used in text processing, input validation, search-and-replace, and data extraction. Regex syntax can be difficult to debug without visual feedback. DailyDevTools' Regex Tester highlights all matches in real-time as you type, shows capture groups, supports all JavaScript regex flags (g, i, m, s, u), and explains what each part of your pattern does in plain English.",
    howTo: [
      "Enter your regex pattern in the Pattern field (without wrapping slashes)",
      "Select the flags you need: g for global, i for case-insensitive, m for multiline",
      "Paste your test string in the Test area — all matches are highlighted instantly",
      "Review the Matches panel to see each match, its index, and any named capture groups"
    ],
    faq: [
      { q: "Which regex flavour does this use?", a: "The tester uses JavaScript's built-in RegExp engine following the ECMAScript specification. Most patterns are portable across languages, but some features like lookbehind may differ." },
      { q: "How do I match a literal dot or special character?", a: "Escape special regex characters with a backslash. For a literal dot use \\., for a dollar sign use \\$. The tester shows real-time errors for invalid patterns." },
      { q: "Can I test named capture groups?", a: "Yes. Use the (?<name>...) syntax. Named groups appear in the Matches panel labeled by their group name, making complex patterns much easier to understand and debug." }
    ]
  },
  "uuid-generator": {
    about: "A UUID (Universally Unique Identifier), also called GUID, is a 128-bit label used to uniquely identify resources across systems. The probability of generating a duplicate UUID is negligibly small, making them ideal for database primary keys, session tokens, file names, and distributed systems. DailyDevTools generates cryptographically secure UUID v4 values using your browser's built-in Web Crypto API — no server, no tracking.",
    howTo: [
      "Click Generate to instantly create a UUID v4",
      "Use Bulk Generate to create up to 100 UUIDs at once, one per line",
      "Toggle Uppercase to switch between lowercase and uppercase output",
      "Click Copy to copy to clipboard, or Download to save the list as a .txt file"
    ],
    faq: [
      { q: "What is UUID v4?", a: "UUID v4 is randomly generated — 122 bits of randomness with 6 fixed bits for the version and variant markers. It requires no coordination between systems and is the most widely used UUID version." },
      { q: "Are these UUIDs cryptographically secure?", a: "Yes. The generator uses crypto.randomUUID() or the Web Crypto API, which provides cryptographically strong random values suitable for security-sensitive identifiers." },
      { q: "What is the difference between UUID and GUID?", a: "They are the same thing. GUID (Globally Unique Identifier) is Microsoft's term for the same 128-bit identifier format described in RFC 4122 as UUID." }
    ]
  },
  "password-generator": {
    about: "A strong, random password is your first line of defense against unauthorized access. DailyDevTools' Password Generator creates cryptographically random passwords using your browser's Web Crypto API — not a weak pseudorandom number generator. Configure the length (8–128 characters), character sets (uppercase, lowercase, numbers, symbols), and optionally exclude visually ambiguous characters like 0/O and 1/l for passwords that need to be typed manually.",
    howTo: [
      "Set your desired password length using the slider — 12+ characters is recommended, 20+ for sensitive accounts",
      "Check the character sets to include: uppercase, lowercase, numbers, and symbols",
      "Enable 'Exclude ambiguous characters' to avoid confusion between 0/O or 1/l when typing manually",
      "Click Generate or the refresh icon to create a new password. Click Copy to copy it instantly."
    ],
    faq: [
      { q: "How random are these passwords?", a: "The generator uses window.crypto.getRandomValues(), a cryptographically secure pseudorandom number generator (CSPRNG) built into all modern browsers — the same source used by security software." },
      { q: "How long should my password be?", a: "NIST recommends at least 12 characters for general use and 16+ for sensitive accounts. For maximum security, use 20+ characters with all character types enabled." },
      { q: "Are generated passwords stored anywhere?", a: "No. Passwords are generated in your browser's memory and never sent to any server. Each generation is completely independent — nothing is logged or retained." }
    ]
  },
  "hash-generator": {
    about: "A cryptographic hash function takes any input and produces a fixed-length output (the hash) that uniquely represents that data. Even a single character change produces a completely different hash. This makes hashes essential for verifying file integrity, storing passwords, and creating digital fingerprints. DailyDevTools supports MD5, SHA-1, SHA-256, SHA-384, SHA-512, and SHA-3, all computed locally using the Web Crypto API.",
    howTo: [
      "Type or paste your text in the input field, or switch to File mode to hash a file",
      "Select your algorithm from the dropdown: MD5, SHA-1, SHA-256, SHA-512, or SHA-3",
      "The hash updates instantly as you type — no button click needed",
      "Click Copy to copy the hex-encoded hash, or toggle to Base64 output format"
    ],
    faq: [
      { q: "What is the difference between MD5, SHA-1, and SHA-256?", a: "MD5 and SHA-1 are cryptographically broken for security purposes — use them only for checksums, not passwords or signatures. SHA-256 and above are current standards recommended for all security-sensitive hashing." },
      { q: "Can I reverse a hash to get the original text?", a: "No. Hash functions are one-way by design. There is no algorithm to reverse a hash. Attackers use precomputed rainbow tables against weak inputs, which is why password hashing always needs a salt." },
      { q: "Can I hash a file to verify its integrity?", a: "Yes. Switch to File mode, upload any file, and compare the hash against the checksum published by the software vendor to verify the download is authentic and unmodified." }
    ]
  },
  "qr-generator": {
    about: "QR codes (Quick Response codes) are two-dimensional barcodes that store URLs, text, contact information, WiFi credentials, and more, and are scannable by any modern smartphone camera. DailyDevTools' QR Code Generator creates high-quality QR codes instantly in your browser — configure error correction level, set a custom size, pick foreground and background colors, and download as PNG or SVG.",
    howTo: [
      "Type or paste the URL, text, or any data you want to encode into the input field",
      "The QR code generates instantly. Use the size slider to adjust dimensions (100–1000px)",
      "Choose an error correction level: L (7%), M (15%), Q (25%), or H (30% damage tolerance)",
      "Click Download PNG or Download SVG to save for print or digital use"
    ],
    faq: [
      { q: "What is error correction level and which should I use?", a: "Error correction lets QR codes be read even when partially damaged or obscured. Use L for clean digital screens, H for printed materials that may wear. M is a good default for most uses." },
      { q: "What is the maximum data a QR code can hold?", a: "A QR code can hold up to 3KB of data — roughly 7,000 numeric or 4,000 alphanumeric characters. Shorter URLs produce simpler, faster-scanning codes." },
      { q: "Can I add a logo to the center of the QR code?", a: "Yes, using the Logo option. Keep the logo under 25% of the QR code area and set error correction to H so the code remains fully scannable despite the covered modules." }
    ]
  },
  "curl-converter": {
    about: "cURL is the standard command-line tool developers use to test HTTP requests. Manually translating cURL commands into Python, JavaScript, Go, or other languages is tedious and error-prone. DailyDevTools' cURL Converter automatically parses your full cURL command — including headers, authentication, request body, cookies, and query parameters — and generates idiomatic code in 15+ programming languages instantly.",
    howTo: [
      "Copy your cURL command from your browser's DevTools Network tab (right-click a request → Copy as cURL)",
      "Paste it into the input field on the left",
      "Select your target language from the dropdown: Python, JavaScript, Go, PHP, Ruby, Java, and more",
      "Copy the generated code and paste it directly into your project or script"
    ],
    faq: [
      { q: "Which languages does the converter support?", a: "The converter supports Python (requests), JavaScript (fetch, axios), TypeScript, Go, PHP (curl, Guzzle), Ruby (Net::HTTP), Java (OkHttp), C#, Rust, Swift, Kotlin, R, Dart, and more." },
      { q: "Does it handle authentication headers?", a: "Yes. Bearer tokens, Basic Auth, and API keys in headers or query parameters are all recognized and included in the generated code using the correct format for each language." },
      { q: "What if my cURL command has multipart form data or file uploads?", a: "Multipart form data and file uploads are fully supported. The converter generates the correct multipart body construction for each target language." }
    ]
  },
  "url-encoder": {
    about: "URL encoding (percent-encoding) converts characters not allowed in URLs into a % followed by two hexadecimal digits — for example, a space becomes %20 and & becomes %26. This is essential when passing data in query parameters, as unencoded special characters break the URL structure. DailyDevTools' URL Encoder/Decoder handles both directions, supports full URL or component-only encoding, and processes multiple values at once.",
    howTo: [
      "Paste your text or URL into the input field",
      "Click Encode to percent-encode special characters, or Decode to convert %xx codes back to readable text",
      "Use Component mode to encode only a query value, preserving characters like ://, ?, &, and =",
      "Click Copy to copy the result to your clipboard"
    ],
    faq: [
      { q: "What is the difference between encodeURI and encodeURIComponent?", a: "encodeURI encodes a full URL and preserves characters that have meaning in URL structure (/, ?, &, =). encodeURIComponent encodes a single value. Use Component mode for query parameter values." },
      { q: "Why does a space sometimes become + and sometimes %20?", a: "In form data (application/x-www-form-urlencoded), spaces are encoded as +. In URL paths they must be %20. Both are valid in their respective contexts." },
      { q: "Can I encode or decode multiple URLs at once?", a: "Yes. Paste multiple URLs or values on separate lines. The encoder processes each line independently and preserves the line-by-line structure in the output." }
    ]
  },
  "sql-formatter": {
    about: "Raw SQL queries pasted from logs, APIs, or ORMs are often a single unreadable line. DailyDevTools' SQL Formatter applies consistent indentation, capitalization, and newlines to make complex queries readable in seconds. It supports multiple SQL dialects including PostgreSQL, MySQL, SQLite, Microsoft SQL Server, and BigQuery, and can minify SQL for production use or copy queries for documentation.",
    howTo: [
      "Paste your SQL query — minified, logged, or raw — into the input panel",
      "Select your SQL dialect from the dropdown (PostgreSQL, MySQL, SQLite, etc.)",
      "Click Format to apply indentation and capitalization, or Minify to compress the query",
      "Use Copy to copy the formatted query or Download to save it as a .sql file"
    ],
    faq: [
      { q: "Which SQL dialects does the formatter support?", a: "The formatter supports PostgreSQL, MySQL, MariaDB, SQLite, Microsoft SQL Server (T-SQL), BigQuery, and ANSI SQL, automatically adjusting syntax conventions for each dialect." },
      { q: "Does it validate SQL syntax?", a: "The formatter applies formatting rules for the selected dialect and surfaces obvious syntax issues, but it does not execute the query or check against a live database schema." },
      { q: "Can it format stored procedures and CTEs?", a: "Yes. Complex queries including CTEs (WITH clauses), subqueries, JOINs, stored procedures, and window functions are all handled correctly with proper indentation." }
    ]
  },
  "timestamp-converter": {
    about: "Unix timestamps are integers counting seconds (or milliseconds) since January 1, 1970 UTC. They appear everywhere in logs, APIs, and databases but are unreadable to humans. DailyDevTools' Timestamp Converter instantly converts Unix timestamps to human-readable dates and times, converts dates back to timestamps, and handles both second and millisecond precision — with support for any timezone.",
    howTo: [
      "Paste a Unix timestamp (seconds or milliseconds) into the input field",
      "The converter auto-detects whether it is seconds or milliseconds based on the magnitude",
      "Select a timezone to see the equivalent local time in any region",
      "Or pick a date and time using the date picker to convert it to a Unix timestamp"
    ],
    faq: [
      { q: "What is a Unix timestamp?", a: "A Unix timestamp is the number of seconds elapsed since the Unix epoch: January 1, 1970 at 00:00:00 UTC. It is a universal way to represent a point in time without timezone ambiguity." },
      { q: "How do I know if my timestamp is in seconds or milliseconds?", a: "A 10-digit timestamp is in seconds (e.g., 1700000000). A 13-digit timestamp is in milliseconds (e.g., 1700000000000). The converter auto-detects this based on the value's magnitude." },
      { q: "What is the maximum date a Unix timestamp can represent?", a: "A 32-bit Unix timestamp overflows on January 19, 2038 (the Year 2038 problem). Modern systems use 64-bit timestamps which won't overflow for billions of years." }
    ]
  },
  "text-diff": {
    about: "Comparing two versions of text manually is slow and error-prone. DailyDevTools' Text Diff Checker highlights every addition, deletion, and unchanged line between two text blocks using a side-by-side or unified diff view. It works for any text — code, prose, configuration files, JSON, SQL, or log output — and runs entirely in your browser so sensitive content never leaves your device.",
    howTo: [
      "Paste your original text in the left panel and the modified text in the right panel",
      "Differences are highlighted instantly: green for additions, red for deletions",
      "Switch between side-by-side view and unified diff view using the toggle",
      "Use the character-level diff toggle to highlight individual changed characters within lines"
    ],
    faq: [
      { q: "Can I compare code files, not just plain text?", a: "Yes. The diff tool handles any text content — source code, JSON, YAML, SQL, Markdown, or prose. Paste the raw file contents directly into each panel." },
      { q: "Does it ignore whitespace differences?", a: "Yes. Enable the 'Ignore whitespace' option to focus on meaningful content changes rather than formatting differences like added spaces or indentation changes." },
      { q: "Can I use this to compare JSON objects?", a: "Yes. Paste the raw JSON strings into each panel. For structured JSON comparison that shows nested field-level differences, use the JSON Diff tool instead." }
    ]
  },
  "markdown-editor": {
    about: "Markdown is a lightweight markup language used for documentation, README files, blog posts, and notes. DailyDevTools' Markdown Editor provides a split-pane view with your Markdown source on the left and a live rendered preview on the right. It supports GitHub Flavored Markdown (GFM) including tables, task lists, code blocks with syntax highlighting, and strikethrough — all rendered instantly as you type.",
    howTo: [
      "Type or paste your Markdown text in the left editor panel",
      "The rendered HTML preview updates in real-time on the right as you type",
      "Use the toolbar shortcuts for bold, italic, links, images, code blocks, and tables",
      "Click Download to save as a .md file, or Copy HTML to get the rendered HTML output"
    ],
    faq: [
      { q: "Does this support GitHub Flavored Markdown?", a: "Yes. Tables, task lists (- [ ] and - [x]), fenced code blocks with language hints for syntax highlighting, strikethrough (~~text~~), and autolinks are all supported." },
      { q: "Can I export my Markdown as HTML?", a: "Yes. Click 'Copy HTML' to get the rendered HTML, which you can paste into any website or email editor. You can also download the source as a .md file." },
      { q: "Does the editor support keyboard shortcuts?", a: "Yes. Standard shortcuts work: Ctrl+B for bold, Ctrl+I for italic, Ctrl+K for a link. Tab indents code blocks, and Ctrl+Z undoes changes." }
    ]
  },
  "case-converter": {
    about: "Switching between naming conventions is one of the most repetitive tasks in programming. DailyDevTools' Case Converter transforms text between camelCase, PascalCase, snake_case, kebab-case, SCREAMING_SNAKE_CASE, Title Case, and plain lowercase/uppercase in one click. It correctly handles acronyms, multi-word phrases, and mixed input — paste any text and get all formats instantly.",
    howTo: [
      "Type or paste any text into the input field — mixed case, spaces, hyphens, or underscores all work",
      "Click the target case format: camelCase, PascalCase, snake_case, kebab-case, UPPER_SNAKE, etc.",
      "The converted text appears instantly and is auto-selected for easy copying",
      "Click Copy to copy the result to your clipboard"
    ],
    faq: [
      { q: "What is the difference between camelCase and PascalCase?", a: "camelCase starts with a lowercase letter (myVariableName). PascalCase starts with an uppercase letter (MyClassName). Both capitalize the first letter of each subsequent word." },
      { q: "How does it handle acronyms like 'API' or 'URL'?", a: "The converter treats sequences of uppercase letters as a single word. 'myAPIKey' in camelCase becomes 'my_api_key' in snake_case, correctly lowercasing the acronym." },
      { q: "Can I convert multiple lines at once?", a: "Yes. Paste multiple lines and each line is converted independently, preserving the line structure in the output." }
    ]
  },

  "code-editor": {
    about: "A code editor in your browser lets you write, view, and format code without installing any software. DailyDevTools' Code Editor supports syntax highlighting for 50+ languages, auto-indentation, bracket matching, and instant formatting — making it ideal for quick edits, reviewing snippets, sharing code, or working on a device where your regular IDE isn't available. Everything runs in your browser with no account required.",
    howTo: [
      "Select your programming language from the dropdown to enable syntax highlighting",
      "Type or paste your code into the editor — bracket matching and auto-indent work immediately",
      "Click Format to apply language-appropriate formatting (indentation, spacing)",
      "Use Copy to copy the code to your clipboard, or Download to save it as a file"
    ],
    faq: [
      { q: "Which programming languages does the editor support?", a: "The editor supports syntax highlighting for 50+ languages including JavaScript, TypeScript, Python, Go, Rust, Java, C, C++, PHP, Ruby, SQL, HTML, CSS, YAML, JSON, and more." },
      { q: "Can I use this as a temporary scratchpad?", a: "Yes. The editor is perfect for writing throwaway scripts, reviewing code shared via chat, or formatting a snippet quickly. Your content stays in your browser tab and is not saved to any server." },
      { q: "Does it support themes or dark mode?", a: "Yes. The editor respects your system theme preference and supports both light and dark modes automatically, with proper contrast for syntax highlighting in both modes." }
    ]
  },
  "css-minifier": {
    about: "CSS minification removes whitespace, comments, and redundant code from stylesheets to reduce file size, which directly improves page load speed and Core Web Vitals scores. DailyDevTools' CSS Minifier compresses your CSS instantly in your browser — no uploads, no server round-trips. It also handles beautifying minified CSS back to readable form for debugging third-party stylesheets.",
    howTo: [
      "Paste your CSS code into the input panel",
      "Click Minify to remove all whitespace and comments and reduce file size",
      "Review the size reduction stats shown below the output (original vs. minified bytes)",
      "Click Beautify to expand already-minified CSS back into readable, indented code"
    ],
    faq: [
      { q: "Does minifying CSS break anything?", a: "No. CSS minification only removes characters that browsers ignore — whitespace, comments, and redundant semicolons. The rendered output is identical to the original." },
      { q: "How much file size reduction can I expect?", a: "Most CSS files see a 20–40% size reduction from minification. Files with many comments or verbose formatting can see 50%+ reduction." },
      { q: "Should I minify CSS manually or use a build tool?", a: "For production projects, use a build tool like Vite, webpack, or PostCSS to minify automatically. This tool is ideal for quick one-off minification, inspecting third-party CSS, or projects without a build pipeline." }
    ]
  },
  "color-converter": {
    about: "Colors in web development are expressed in multiple formats: Hex (#ff6b35), RGB (rgb(255,107,53)), HSL (hsl(18,100%,60%)), and CMYK for print. Each format is used in different contexts — designers often think in HSL, CSS uses Hex and RGB, and print workflows need CMYK. DailyDevTools' Color Converter instantly translates between all four formats and shows a live preview so you can confirm the color visually.",
    howTo: [
      "Enter a color value in any format: #ff6b35, rgb(255,107,53), hsl(18,100%,60%), or cmyk(0,58,79,0)",
      "The converter instantly shows the equivalent values in all other formats",
      "Click the color preview swatch to open a color picker and select any color visually",
      "Click any converted value to copy it directly to your clipboard"
    ],
    faq: [
      { q: "What is the difference between RGB and HSL?", a: "RGB describes color by mixing red, green, and blue light (0–255 each). HSL describes color by hue (0–360°), saturation (0–100%), and lightness (0–100%), which is more intuitive for adjusting colors." },
      { q: "When should I use CMYK instead of RGB?", a: "CMYK is used for print design — printers use Cyan, Magenta, Yellow, and Black inks. RGB is for screens. Always convert to CMYK before sending files to a print shop." },
      { q: "What is the Hex format and why does CSS use it?", a: "Hex format encodes RGB values as two-digit hexadecimal numbers (#RRGGBB). CSS adopted it for its conciseness. Shorthand like #f60 is equivalent to #ff6600." }
    ]
  },
  "lorem-ipsum": {
    about: "Lorem Ipsum is dummy placeholder text used by designers and developers to fill layouts when real content is not yet available. It allows you to focus on visual design and layout without being distracted by meaningful text. DailyDevTools' Lorem Ipsum Generator creates customizable placeholder text — choose the number of paragraphs, sentences, or words, and optionally start with the classic 'Lorem ipsum dolor sit amet...' opening.",
    howTo: [
      "Select the output unit: paragraphs, sentences, or words",
      "Set the quantity using the number input",
      "Toggle 'Start with Lorem ipsum' to begin with the classic opening phrase or generate fully random text",
      "Click Generate, then Copy to paste the placeholder text into your design or document"
    ],
    faq: [
      { q: "Where does Lorem Ipsum text come from?", a: "Lorem Ipsum is derived from 'de Finibus Bonorum et Malorum' by Cicero, written in 45 BC. The standard passage has been used as placeholder text since the 1500s and popularized in desktop publishing by Aldus PageMaker." },
      { q: "Why use Lorem Ipsum instead of real text?", a: "Placeholder text prevents readers from being distracted by content meaning during design review. It also prevents premature feedback on copy before the layout is finalized." },
      { q: "Can I generate Lorem Ipsum in different languages?", a: "This generator produces the standard Latin Lorem Ipsum. For language-specific placeholder text, the generator can produce random English words that mimic the rhythm without the Latin." }
    ]
  },
  "image-base64": {
    about: "Converting images to Base64 lets you embed them directly into HTML, CSS, JavaScript, or JSON without a separate file request. This is useful for inlining small icons in data URIs, embedding images in email templates, or sending images in API payloads. DailyDevTools' Image to Base64 converter processes images entirely in your browser — your images never leave your device.",
    howTo: [
      "Click Upload or drag and drop any image file (PNG, JPG, GIF, SVG, WebP) into the drop zone",
      "The Base64 encoded string appears instantly in the output panel",
      "Copy the raw Base64 string, or use the pre-formatted data URI (data:image/png;base64,...) ready to paste into CSS or HTML",
      "Toggle between HTML img tag output, CSS background-image output, or raw Base64"
    ],
    faq: [
      { q: "What is a data URI and when should I use it?", a: "A data URI embeds the image data directly in the URL string (data:image/png;base64,...) so the browser doesn't make a separate HTTP request. Best for small icons and logos — avoid for large images as it increases HTML size." },
      { q: "Does converting an image to Base64 increase its size?", a: "Yes. Base64 encoding increases the data size by approximately 33%. A 10KB image becomes roughly 13KB as a Base64 string, which is why this technique is best reserved for small images." },
      { q: "Which image formats are supported?", a: "All common image formats are supported: PNG, JPEG, GIF, WebP, SVG, BMP, and ICO. The output data URI will use the correct MIME type for each format." }
    ]
  },
  "word-counter": {
    about: "Whether you are writing a blog post, academic essay, tweet, or SEO meta description, knowing your word and character count is essential. DailyDevTools' Word Counter counts words, characters (with and without spaces), sentences, paragraphs, and estimates reading time — all in real-time as you type. It also highlights the top keywords by frequency, helping you check keyword density for SEO.",
    howTo: [
      "Type or paste your text into the editor — counts update instantly as you type",
      "Check the stats panel for word count, character count, sentence count, and paragraph count",
      "View the estimated reading time (based on 200 words per minute average)",
      "Scroll down to the Keyword Frequency table to see the most common words in your text"
    ],
    faq: [
      { q: "How is reading time calculated?", a: "Reading time is estimated at 200 words per minute, which is the average adult silent reading speed. Technical content is typically read slower (150 wpm) and simple content faster (250 wpm)." },
      { q: "Does it count hyphenated words as one or two words?", a: "Hyphenated words (like 'state-of-the-art') are counted as one word, matching the convention used by most word processors including Microsoft Word and Google Docs." },
      { q: "Can I use this to check Twitter or LinkedIn character limits?", a: "Yes. The character counter shows count with and without spaces. Twitter's 280-character limit counts all characters including spaces, punctuation, and URLs (which count as 23 characters regardless of length)." }
    ]
  },
  "slug-generator": {
    about: "A URL slug is the part of a web address that identifies a specific page — for example, 'how-to-generate-url-slugs' in 'example.com/blog/how-to-generate-url-slugs'. Good slugs are lowercase, use hyphens instead of spaces, remove special characters, and are concise. DailyDevTools' Slug Generator converts any title or text into a clean, SEO-friendly URL slug instantly.",
    howTo: [
      "Type or paste your page title or text into the input field",
      "The slug is generated instantly: spaces become hyphens, uppercase becomes lowercase, special characters are removed",
      "Toggle 'Remove stop words' to omit common words (a, the, and, or) for shorter slugs",
      "Click Copy to copy the slug to your clipboard"
    ],
    faq: [
      { q: "Why should slugs use hyphens instead of underscores?", a: "Google treats hyphens as word separators in URLs, so 'my-page' ranks for 'my' and 'page' separately. Underscores join words, so 'my_page' is treated as one word 'mypage'. Always use hyphens for SEO." },
      { q: "Should slugs include stop words like 'the' and 'and'?", a: "Generally no — removing stop words makes URLs shorter and cleaner. However, if a stop word is essential to the meaning or keyword phrase, keep it. 'the-dark-knight' may be better than 'dark-knight'." },
      { q: "Does the slug generator handle accented characters?", a: "Yes. Accented characters (é, ü, ñ, etc.) are automatically converted to their ASCII equivalents (e, u, n) so slugs remain URL-safe without percent-encoding." }
    ]
  },
  "gradient-generator": {
    about: "CSS gradients let you create smooth color transitions without image files, making designs lighter and infinitely scalable. DailyDevTools' CSS Gradient Generator lets you create linear, radial, and conic gradients with a visual editor — add color stops, adjust angles, change positions — and copies the exact CSS code to paste into your stylesheet. No design software needed.",
    howTo: [
      "Choose gradient type: Linear (angled), Radial (circular), or Conic (rotating)",
      "Click the gradient bar to add color stops, then click each stop to change its color and opacity",
      "Drag stops along the bar to adjust their position, or set the angle for linear gradients",
      "Click Copy CSS to copy the complete CSS gradient property to your clipboard"
    ],
    faq: [
      { q: "What is the difference between linear, radial, and conic gradients?", a: "Linear gradients transition along a straight line at a specified angle. Radial gradients radiate outward from a center point. Conic gradients rotate around a center point like a color wheel or pie chart." },
      { q: "How do I create a transparent gradient?", a: "Set the opacity of a color stop to 0, or use rgba() with an alpha of 0. For example, fading from blue to transparent uses stops: rgba(0,0,255,1) → rgba(0,0,255,0)." },
      { q: "Are CSS gradients supported in all browsers?", a: "Yes. CSS gradients are supported in all modern browsers. The generator outputs standard CSS without vendor prefixes, which is all that's needed for Chrome, Firefox, Safari, and Edge." }
    ]
  },
  "image-compressor": {
    about: "Large images are the most common cause of slow web pages. DailyDevTools' Image Compressor reduces the file size of PNG, JPEG, and WebP images directly in your browser using advanced compression algorithms — no files are ever uploaded to a server. Reducing image sizes by 50–80% dramatically improves page load time, Google PageSpeed scores, and Core Web Vitals.",
    howTo: [
      "Click Upload or drag and drop one or multiple images into the drop zone",
      "Use the quality slider (1–100) to control the compression level — 75–85 is the sweet spot for most images",
      "Compare the original and compressed file sizes shown for each image",
      "Click Download to save the compressed images, or Download All as a ZIP file"
    ],
    faq: [
      { q: "Is lossy or lossless compression better?", a: "JPEG compression is always lossy (some quality is lost). PNG can be compressed losslessly (same quality, smaller file). For photos, lossy JPEG at 80% quality is usually indistinguishable from the original at half the file size." },
      { q: "What quality setting should I use?", a: "For web images, a quality setting of 75–85 is the sweet spot — visually identical to the original but 40–70% smaller. For hero images or photography, use 85+. For thumbnails, 60–70 is fine." },
      { q: "Can I compress multiple images at once?", a: "Yes. Drag and drop multiple images at once. Each is compressed independently with your chosen settings, and you can download all compressed images as a single ZIP file." }
    ]
  },
  "device-info": {
    about: "When debugging responsive design issues or cross-browser bugs, knowing the exact screen resolution, pixel ratio, browser version, and operating system is critical. DailyDevTools' Device Information tool displays your complete browser and device environment — screen size, viewport dimensions, device pixel ratio, color depth, user agent string, connection type, and more — with a single click.",
    howTo: [
      "Open the tool — your device information is displayed automatically",
      "View screen resolution, viewport size, and device pixel ratio in the Screen section",
      "Copy your user agent string from the Browser section for bug reports",
      "Use the Network section to see your connection type (4G, WiFi, etc.) if supported by your browser"
    ],
    faq: [
      { q: "What is the device pixel ratio?", a: "Device pixel ratio (DPR) is the ratio of physical pixels to CSS pixels. A DPR of 2 (Retina displays) means 4 physical pixels for every 1 CSS pixel, resulting in sharper images on high-density screens." },
      { q: "What is the difference between screen resolution and viewport size?", a: "Screen resolution is the total pixel count of your display (e.g., 2560×1440). Viewport size is the usable browser window area in CSS pixels, which changes when you resize the window or zoom in/out." },
      { q: "Why does my screen show different dimensions than expected?", a: "High-DPI screens report a logical resolution divided by the device pixel ratio. A 2560×1440 Retina screen with DPR 2 reports a logical resolution of 1280×720 to CSS." }
    ]
  },
  "random-generator": {
    about: "Need a random number for a game, a coin flip for a decision, or a random item picked from a list? DailyDevTools' Random Generator covers all these cases — generate random integers in any range, simulate dice rolls (d4, d6, d8, d10, d12, d20), flip a coin, or paste a list and pick a random item. All randomness uses your browser's cryptographic random source for true unpredictability.",
    howTo: [
      "Select the generator type: Number, Dice, Coin, or List Picker",
      "For numbers, set your minimum and maximum range and click Generate",
      "For dice, choose your dice type and the number of dice to roll simultaneously",
      "For lists, paste your items (one per line) and click Pick to select a random item"
    ],
    faq: [
      { q: "Is this truly random or pseudorandom?", a: "DailyDevTools uses the Web Crypto API (crypto.getRandomValues()) for all random generation. This is a cryptographically secure pseudorandom number generator (CSPRNG), suitable for security-sensitive applications." },
      { q: "Can I pick multiple unique random items from a list?", a: "Yes. Enable 'No repeats' mode when picking from a list to ensure each item can only be selected once — useful for raffles, random ordering, or drawing without replacement." },
      { q: "What dice types are supported?", a: "All standard tabletop RPG dice are supported: d4, d6, d8, d10, d12, d20, and d100 (percentile). You can also roll multiple dice of the same type and see the total and individual results." }
    ]
  },
  "unit-converter": {
    about: "Unit conversion errors have caused engineering failures, medical mistakes, and even spacecraft crashes. DailyDevTools' Unit Converter handles length, weight, temperature, area, volume, speed, data storage, and more — with instant conversion between all units in each category. It supports both metric (SI) and imperial systems, and updates all equivalent values simultaneously as you type.",
    howTo: [
      "Select the measurement category: Length, Weight, Temperature, Volume, Speed, etc.",
      "Type a value in any unit field — all other units update instantly",
      "Switch between metric and imperial display modes using the toggle",
      "Click any result value to copy it to your clipboard"
    ],
    faq: [
      { q: "Which unit categories are supported?", a: "The converter covers length (mm to miles), weight (mg to tons), temperature (Celsius, Fahrenheit, Kelvin), area, volume, speed, digital storage (bytes to terabytes), pressure, and energy." },
      { q: "How accurate is temperature conversion?", a: "Temperature conversion uses the exact mathematical formulas: Fahrenheit = (Celsius × 9/5) + 32. The converter displays up to 6 decimal places of precision." },
      { q: "Can I convert cooking measurements like cups and tablespoons?", a: "Yes. The volume category includes cooking measurements (teaspoon, tablespoon, cup, pint, quart, gallon) alongside metric units (mL, L) and scientific units (cubic meter)." }
    ]
  },
  "pomodoro-timer": {
    about: "The Pomodoro Technique is a time management method that breaks work into 25-minute focused sessions (called Pomodoros) separated by short 5-minute breaks, with a longer 15–30 minute break after every four sessions. DailyDevTools' Pomodoro Timer implements the full cycle with audio alerts, desktop notifications, and customizable durations — helping you maintain focus and prevent burnout.",
    howTo: [
      "Click Start to begin your 25-minute Pomodoro work session",
      "When the timer ends, a notification and sound alert you to take a 5-minute break",
      "After four Pomodoros, take a longer 15–30 minute break to recharge",
      "Customize work and break durations in Settings to match your focus rhythm"
    ],
    faq: [
      { q: "What is the Pomodoro Technique?", a: "Developed by Francesco Cirillo in the late 1980s, the Pomodoro Technique uses a kitchen timer (shaped like a tomato — pomodoro in Italian) to break work into intervals. Regular breaks improve mental agility and reduce mental fatigue." },
      { q: "Can I customize the session lengths?", a: "Yes. While the classic technique uses 25/5/15 minute intervals, you can adjust work session length, short break length, and long break length in Settings to fit your personal focus pattern." },
      { q: "Will the timer work if I switch browser tabs?", a: "Yes. The timer continues running in the background. Browser notifications will alert you when a session ends, even if the tab is not active. Make sure to allow notifications when prompted." }
    ]
  },
  "yt-thumbnail": {
    about: "YouTube video thumbnails are the primary factor determining whether someone clicks on a video. DailyDevTools' YouTube Thumbnail Downloader lets you fetch the thumbnail of any YouTube video in all available resolutions — from low-quality 120×90px previews to maximum quality 1280×720px images — in a single step. Useful for content creators, researchers, and designers.",
    howTo: [
      "Paste the full YouTube video URL (or just the video ID) into the input field",
      "All available thumbnail resolutions are displayed instantly",
      "Click any resolution to preview it, then click Download to save the image",
      "Right-click the thumbnail and select Save image as to save directly"
    ],
    faq: [
      { q: "What thumbnail resolutions are available?", a: "YouTube stores thumbnails in several resolutions: maxresdefault (1280×720, not always available), hqdefault (480×360), mqdefault (320×180), sddefault (640×480), and default (120×90)." },
      { q: "Is downloading YouTube thumbnails legal?", a: "Thumbnails are generally used for personal reference, research, or commentary. For commercial use or redistribution, check the copyright status of the specific image, as thumbnails may contain copyrighted artwork or photography." },
      { q: "Why is the maxresdefault thumbnail not available for some videos?", a: "Not all videos have a maximum resolution thumbnail. Older videos or those uploaded before YouTube's HD support may only have standard definition thumbnails available." }
    ]
  },
  "my-ip": {
    about: "Your public IP address is the address that websites, servers, and APIs see when you make a request from your device. It is assigned by your ISP and can change over time (dynamic IP) or stay fixed (static IP). DailyDevTools' What Is My IP tool shows your current public IPv4 and IPv6 addresses, your approximate geographic location, ISP name, and connection details — instantly, with no software needed.",
    howTo: [
      "Open the tool — your public IP address is detected and displayed automatically",
      "View your IPv4 address, and IPv6 address if your network supports it",
      "See your approximate city, country, and ISP name from geolocation data",
      "Click Copy to copy your IP address to the clipboard for use in server configurations or bug reports"
    ],
    faq: [
      { q: "What is the difference between a public and private IP address?", a: "Your private IP (like 192.168.1.x) is assigned by your router and only visible within your local network. Your public IP is assigned by your ISP and is visible to the internet. This tool shows your public IP." },
      { q: "Can websites track me using my IP address?", a: "Your IP address reveals your approximate location (usually city-level) and ISP, but not your exact address or identity. Using a VPN replaces your real IP with the VPN server's IP address." },
      { q: "Why does my IP location show the wrong city?", a: "IP geolocation is approximate. Large ISPs may route traffic through a data center in a different city than your actual location, causing the displayed location to differ by tens to hundreds of miles." }
    ]
  },
  "keycode-info": {
    about: "JavaScript keyboard event handling requires knowing the exact key codes, key values, and event properties for each keystroke. DailyDevTools' Keycode Info tool shows you every property of a keyboard event in real-time as you press any key — including event.key, event.code, event.keyCode, event.which, event.charCode, and modifier key states — making it the fastest way to debug keyboard interactions.",
    howTo: [
      "Click inside the key detection area to focus it",
      "Press any key — the tool immediately shows all properties of the keyboard event",
      "View event.key (the logical key value), event.code (the physical key location), and event.keyCode (the legacy numeric code)",
      "See which modifier keys were held: Ctrl, Shift, Alt, Meta (⌘ on Mac)"
    ],
    faq: [
      { q: "What is the difference between event.key and event.keyCode?", a: "event.key returns a human-readable string like 'Enter', 'ArrowUp', or 'a'. event.keyCode is a legacy numeric code (13 for Enter, 38 for ArrowUp). Modern code should use event.key; keyCode is deprecated." },
      { q: "What is event.code vs event.key?", a: "event.code identifies the physical key location on the keyboard ('KeyA', 'ShiftLeft') regardless of layout. event.key returns the character produced ('a' or 'A'). Use code for game controls, key for text input." },
      { q: "Why do some keys show different values on Mac vs Windows?", a: "The Meta key is ⌘ Command on Mac and ⊞ Windows key on Windows. Function keys and some special keys may produce different event.key values across operating systems and keyboard layouts." }
    ]
  },
  "signature-generator": {
    about: "Digital signatures are needed for documents, emails, contracts, and forms in the increasingly paperless workplace. DailyDevTools' Signature Generator provides a smooth canvas where you draw your signature with a mouse, trackpad, or touchscreen — then download it as a transparent PNG, SVG, or JPEG. No plugins, no accounts, and your signature image never touches any server.",
    howTo: [
      "Draw your signature on the canvas using your mouse, trackpad, or touchscreen",
      "Use the pen size slider to adjust stroke width, and pick a pen color (black, blue, or custom)",
      "Click Clear to start over, or Undo to remove the last stroke",
      "Click Download PNG to save your signature with a transparent background, ready to overlay on documents"
    ],
    faq: [
      { q: "Is my signature stored or transmitted anywhere?", a: "No. Your signature is drawn entirely on an HTML5 canvas in your browser. It is never uploaded, stored, or transmitted to any server. The downloaded image exists only on your device." },
      { q: "Can I use the downloaded signature on PDF documents?", a: "Yes. Download as a transparent PNG and insert it into PDF editors like Adobe Acrobat, Preview (Mac), or online PDF tools. The transparent background allows it to overlay cleanly on white document pages." },
      { q: "Is a drawn digital signature legally binding?", a: "In many jurisdictions, electronic signatures are legally binding under laws like the US ESIGN Act and EU eIDAS regulation. However, for high-value legal documents, use a certified e-signature service that provides an audit trail." }
    ]
  },
  "screen-recorder": {
    about: "Screen recording is essential for creating tutorials, reporting bugs, demonstrating features, or capturing UI tests. DailyDevTools' Screen Recorder uses the browser's built-in Screen Capture API to record your entire screen, a specific window, or just a browser tab — with optional audio from your microphone or system. The video is processed locally and downloaded directly to your device.",
    howTo: [
      "Click Start Recording and choose what to capture: entire screen, application window, or browser tab",
      "Allow microphone access if you want to include audio commentary",
      "Click Stop Recording when finished — the video processes instantly in your browser",
      "Click Download to save the recording as a WebM video file compatible with all major video editors"
    ],
    faq: [
      { q: "What video format does the recorder produce?", a: "The recorder outputs WebM format, which is supported by Chrome, Firefox, and Edge natively. Convert to MP4 using a free tool like Handbrake or Cloudconvert if you need broader compatibility." },
      { q: "Can I record with audio?", a: "Yes. You can record with microphone audio (your voice) by allowing microphone access. System audio (sounds from apps) recording depends on your OS — it works on Windows and some Linux configurations." },
      { q: "Is there a time limit on recordings?", a: "There is no hard time limit imposed by the tool. The practical limit is your browser's available memory. For very long recordings, break them into shorter segments to avoid memory issues." }
    ]
  },

  "credit-card-validator": {
    about: "The Luhn algorithm is a simple checksum formula used to validate identification numbers, particularly credit and debit card numbers. DailyDevTools' Credit Card Validator checks whether a card number passes the Luhn check, identifies the card network (Visa, Mastercard, Amex, Discover, etc.), and formats the number correctly — all locally in your browser. It is useful for form validation logic, payment integration testing, and generating test card numbers.",
    howTo: [
      "Type or paste a credit card number into the input field",
      "The tool instantly shows whether the number passes the Luhn algorithm check",
      "The detected card network (Visa, Mastercard, Amex, Discover, JCB, etc.) is displayed automatically",
      "Use the Test Numbers generator to get valid test card numbers for development environments"
    ],
    faq: [
      { q: "Does the Luhn check mean a card is real and active?", a: "No. The Luhn algorithm only checks mathematical validity of the number format. A number can pass the Luhn check but be a fake, expired, or cancelled card. Real validation requires a payment processor API." },
      { q: "How does card network detection work?", a: "Card networks are identified by their IIN (Issuer Identification Number) — the first 4–6 digits. Visa starts with 4, Mastercard with 51–55 or 2221–2720, Amex with 34 or 37, and Discover with 6011 or 65." },
      { q: "Is it safe to enter real card numbers here?", a: "The tool runs entirely in your browser and sends no data to any server. However, as a general security practice, avoid entering real payment card numbers into any third-party tool unless absolutely necessary." }
    ]
  },
  "password-manager": {
    about: "DailyDevTools' Local Password Manager stores your passwords directly in your browser's localStorage, encrypted with AES-256 using a master password you provide. Unlike cloud-based password managers, nothing is ever synced to a server — your vault exists only on your device. It is ideal for developers who need a quick, private place to store credentials during a project without installing additional software.",
    howTo: [
      "Set a master password on first use — this password encrypts your entire vault with AES-256",
      "Click Add Entry and fill in the site name, username, and password",
      "Use the built-in password generator to create a strong random password for new entries",
      "Click the copy icon next to any password to copy it to your clipboard without revealing it on screen"
    ],
    faq: [
      { q: "Where are my passwords stored?", a: "Passwords are stored in your browser's localStorage, encrypted with AES-256. They never leave your device. The vault is tied to this browser and device — it does not sync across devices." },
      { q: "What happens if I forget my master password?", a: "There is no password recovery mechanism by design. If you forget your master password, the encrypted vault cannot be decrypted. Write your master password down and store it securely offline." },
      { q: "How is this different from a full password manager like 1Password?", a: "This is a lightweight, zero-server tool for temporary or local use. Full password managers offer cross-device sync, browser extensions, automatic form filling, and breach monitoring. For serious use, invest in a dedicated password manager." }
    ]
  },
  "deep-link-tester": {
    about: "Deep links are URLs that open a specific screen or state within a mobile app, bypassing the home screen (e.g., myapp://product/123 or https://example.com/app/product/123 for Universal Links). DailyDevTools' Deep Link Tester lets you construct, validate, and launch deep links directly from your browser, making mobile development debugging significantly faster.",
    howTo: [
      "Enter your deep link URL (custom scheme like myapp:// or a Universal Link/App Link)",
      "Click Launch to attempt to open the link — your mobile device or emulator must be connected or the app installed",
      "Use the URL builder to construct deep links by filling in scheme, host, path, and query parameters",
      "Check the parsed URL breakdown to verify each component of your link is correctly structured"
    ],
    faq: [
      { q: "What is the difference between a custom scheme deep link and a Universal Link?", a: "Custom scheme links (myapp://path) always open the app if installed but show an error if not. Universal Links (https://example.com/path) fall back to the website if the app is not installed, providing a better user experience." },
      { q: "Can I test deep links without a physical device?", a: "You can validate URL structure and test Universal Links in a browser. Custom scheme links require the app to be installed on a device or emulator. Use Android Studio's adb or Xcode's Simulator for device testing." },
      { q: "What are deferred deep links?", a: "Deferred deep links take users to a specific in-app screen even if they do not have the app installed — they are directed to the app store first, and upon first launch after installation, the original deep link destination opens. These require a third-party SDK." }
    ]
  },
  "image-converter": {
    about: "WebP is Google's modern image format that provides 25–34% smaller file sizes than PNG and JPEG at equivalent visual quality. Converting your images to WebP is one of the easiest ways to improve page load speed and pass Google PageSpeed Insights recommendations. DailyDevTools' Image Converter converts PNG and JPEG images to WebP locally in your browser — no file uploads, complete privacy.",
    howTo: [
      "Click Upload or drag and drop PNG or JPEG images into the drop zone",
      "Adjust the quality slider to balance file size and image quality (80–90 is recommended for most images)",
      "Compare the original and WebP file sizes shown for each image",
      "Click Download WebP to save the converted image, or Download All as a ZIP"
    ],
    faq: [
      { q: "How much smaller are WebP files compared to JPEG and PNG?", a: "WebP lossy images are typically 25–34% smaller than JPEG at equivalent quality. WebP lossless is around 26% smaller than PNG. For a site with many images, this translates to significant bandwidth savings." },
      { q: "Is WebP supported in all browsers?", a: "Yes. WebP is supported in Chrome, Firefox, Safari (since version 14), Edge, and Opera — covering over 95% of global browser usage. For the remaining browsers, serve JPEG as a fallback using the HTML picture element." },
      { q: "Does converting to WebP affect image quality?", a: "At quality settings of 80+, WebP images are visually indistinguishable from the original JPEG or PNG to most viewers. Lower quality settings produce more visible artifacts but dramatically smaller files." }
    ]
  },
  "json-converter": {
    about: "JSON and CSV are the two most common data formats for APIs and spreadsheets respectively, but they have different structures: JSON supports nesting and arrays while CSV is flat. DailyDevTools' JSON to CSV Converter handles both directions — flatten a nested JSON array into a CSV table, or convert a CSV file back into a structured JSON array — with live preview and instant download.",
    howTo: [
      "Paste your JSON array (or CSV data) into the input panel",
      "Click JSON to CSV to flatten the data into a spreadsheet-compatible format",
      "Or click CSV to JSON to convert tabular CSV data into a structured JSON array",
      "Preview the output, then click Download or Copy to use the converted data"
    ],
    faq: [
      { q: "Does it handle nested JSON objects?", a: "Yes. Nested objects are flattened using dot notation (e.g., user.address.city becomes a column header 'user.address.city'). Arrays of objects within the data are handled based on your flattening configuration." },
      { q: "What happens to special characters in CSV data?", a: "Values containing commas, newlines, or quotation marks are automatically wrapped in double quotes and escaped per the RFC 4180 CSV standard, ensuring the output opens correctly in Excel and Google Sheets." },
      { q: "Can I convert JSON from an API response directly?", a: "Yes. Paste the raw JSON array from any API response. The converter handles common API response structures and lets you preview the column structure before downloading." }
    ]
  },
  "bmi-calculator": {
    about: "Body Mass Index (BMI) is a measurement calculated from height and weight that provides a rough indicator of body composition and is used by healthcare providers to screen for weight-related health risks. DailyDevTools' BMI Calculator instantly computes your BMI from metric (kg/cm) or imperial (lbs/ft) measurements and displays your BMI category: underweight, healthy weight, overweight, or obese.",
    howTo: [
      "Select your unit system: metric (kg and cm) or imperial (lbs and feet/inches)",
      "Enter your height and weight",
      "Your BMI is calculated instantly and displayed alongside your BMI category",
      "Review the BMI scale chart to see where your value falls relative to the standard ranges"
    ],
    faq: [
      { q: "What are the BMI categories?", a: "Under 18.5: Underweight. 18.5–24.9: Healthy weight. 25.0–29.9: Overweight. 30.0 and above: Obese. These are the categories defined by the World Health Organization (WHO)." },
      { q: "Is BMI an accurate measure of health?", a: "BMI is a screening tool, not a diagnostic measurement. It does not account for muscle mass, bone density, age, or fat distribution. Athletes often have high BMIs due to muscle. Always consult a healthcare provider for a complete health assessment." },
      { q: "Is BMI the same for adults and children?", a: "No. Child and teen BMI (age 2–19) is interpreted using age- and sex-specific percentile charts, not fixed cutoffs, because body composition changes significantly during growth." }
    ]
  },

  "dns-lookup": {
    about: "DNS (Domain Name System) is the internet's phonebook — it translates human-readable domain names into IP addresses that computers use to communicate. DailyDevTools' DNS Lookup tool queries live DNS records for any domain and returns all record types: A (IPv4), AAAA (IPv6), CNAME, MX (mail servers), TXT (SPF/DKIM/verification), NS (nameservers), and SOA — useful for debugging email delivery, verifying DNS propagation, and configuring domains.",
    howTo: [
      "Enter any domain name (e.g., example.com) in the input field",
      "Select the record type to query: A, AAAA, CNAME, MX, TXT, NS, or ALL",
      "Click Lookup — results appear within seconds, queried from live DNS servers",
      "Use the TTL column to see how long each record is cached by resolvers"
    ],
    faq: [
      { q: "Why do DNS changes take time to propagate?", a: "DNS records are cached by resolvers worldwide according to their TTL (Time To Live) value. A TTL of 3600 means resolvers cache the old record for up to 1 hour before checking for updates. Lowering TTL before a migration speeds up propagation." },
      { q: "What is a CNAME record?", a: "A CNAME (Canonical Name) record is an alias — it points a domain or subdomain to another domain name rather than an IP address. For example, www.example.com → example.com. The final destination must have an A record." },
      { q: "How do I verify my SPF and DKIM records?", a: "SPF is stored as a TXT record on your root domain. DKIM is stored as a TXT record at a selector subdomain (e.g., google._domainkey.example.com). Query TXT records for your domain to inspect both." }
    ]
  },
  "age-calculator": {
    about: "Calculating someone's exact age — in years, months, and days — from a birth date is surprisingly complex due to varying month lengths and leap years. DailyDevTools' Age Calculator gives you the precise age from any birthdate to today (or any target date), and also shows the next birthday countdown, age in total days, and age in other units like weeks and hours.",
    howTo: [
      "Enter the date of birth using the date picker",
      "The age is calculated instantly: years, months, and remaining days",
      "Optionally set a custom 'as of' date to calculate age at a specific point in time",
      "See additional details: total days lived, next birthday date, and day of the week you were born"
    ],
    faq: [
      { q: "How is age calculated for people born on February 29?", a: "For leap day birthdays, age increments on March 1 in non-leap years, which is the convention used in most countries. The calculator handles this edge case correctly." },
      { q: "Can I calculate the age of something other than a person?", a: "Yes. The calculator works for any date — use it to find the age of a company, a building, a domain registration, or any historical event." },
      { q: "What is the most accurate way to express age?", a: "The most precise expression is years + months + days (e.g., 28 years, 4 months, 12 days). For legal purposes, age is typically just the number of completed years." }
    ]
  },
  "loan-calculator": {
    about: "A loan calculator helps you understand the true cost of borrowing by computing your monthly payment, total interest paid, and total repayment amount from the loan principal, annual interest rate, and term. DailyDevTools' Loan Calculator uses the standard amortization formula and also generates a full amortization schedule showing how each payment splits between principal and interest over the loan term.",
    howTo: [
      "Enter the loan amount (principal), annual interest rate, and loan term in months or years",
      "Your monthly payment is calculated instantly using the standard amortization formula",
      "Review the summary: total amount paid and total interest paid over the full term",
      "Expand the Amortization Schedule to see a month-by-month breakdown of each payment"
    ],
    faq: [
      { q: "What is amortization?", a: "Amortization is the process of spreading loan repayments over time. Early payments are mostly interest; later payments are mostly principal. An amortization schedule shows this exact split for every payment in the loan term." },
      { q: "Does the calculator include fees, insurance, or taxes?", a: "No. The calculator computes purely the principal and interest payment. Your actual monthly payment may be higher if your lender requires escrow for property taxes, insurance (PMI, homeowners), or origination fees." },
      { q: "What is the effect of making extra principal payments?", a: "Extra principal payments reduce the outstanding balance faster, which reduces the total interest paid and shortens the loan term. Even small additional monthly payments can save thousands in interest on a long-term mortgage." }
    ]
  },
  "discount-calculator": {
    about: "Whether you're shopping, pricing products, or analyzing a sale, a discount calculator quickly finds the sale price from an original price and percentage off, or the percentage saved from two prices. DailyDevTools' Discount Calculator handles all three directions: find sale price, find discount percentage, or find the original price — and shows savings in both dollar amount and percentage.",
    howTo: [
      "Enter the original price and the discount percentage to find the sale price and amount saved",
      "Or enter the original price and sale price to find the discount percentage",
      "Or enter the sale price and discount percentage to reverse-calculate the original price",
      "Results update instantly as you type"
    ],
    faq: [
      { q: "How do I calculate 30% off a price?", a: "Multiply the original price by 0.30 to get the discount amount, then subtract from the original. Example: 30% off $80 = $80 × 0.30 = $24 discount → sale price of $56." },
      { q: "What is the formula for discount percentage?", a: "Discount % = ((Original Price − Sale Price) / Original Price) × 100. For example: original $100, sale $75 → (($100 − $75) / $100) × 100 = 25% discount." },
      { q: "Can I calculate stacked discounts (discount on a discount)?", a: "Stacked discounts are multiplicative, not additive. A 20% discount followed by another 10% off is not 30% off — it's 1 − (0.80 × 0.90) = 28% total discount. The calculator handles stacked discounts in sequence mode." }
    ]
  },
  "interest-calculator": {
    about: "Understanding how interest grows your savings or increases your debt is fundamental to personal finance. DailyDevTools' Interest Calculator handles both simple interest (I = P × r × t) and compound interest with configurable compounding frequency (daily, monthly, quarterly, annually) and shows a year-by-year growth chart so you can visualize the power of compounding over time.",
    howTo: [
      "Enter the principal amount, annual interest rate, and time period",
      "Choose interest type: Simple (flat rate) or Compound",
      "For compound interest, select the compounding frequency: daily, monthly, quarterly, or annually",
      "View total interest earned, final balance, and the year-by-year growth table"
    ],
    faq: [
      { q: "What is the difference between simple and compound interest?", a: "Simple interest is calculated only on the original principal. Compound interest is calculated on the principal plus accumulated interest — interest earns interest. Over long periods, compound interest grows exponentially faster." },
      { q: "What is the Rule of 72?", a: "The Rule of 72 estimates how long it takes to double an investment: divide 72 by the annual interest rate. At 8% annual return, an investment doubles in approximately 72 ÷ 8 = 9 years." },
      { q: "What is APR vs APY?", a: "APR (Annual Percentage Rate) is the simple annual rate. APY (Annual Percentage Yield) includes the effect of compounding within the year. A 12% APR compounded monthly equals a 12.68% APY." }
    ]
  },
  "html-encoder": {
    about: "HTML special characters like <, >, &, and \" must be encoded as HTML entities (&lt;, &gt;, &amp;, &quot;) to display correctly in browsers and prevent Cross-Site Scripting (XSS) attacks. DailyDevTools' HTML Encoder/Decoder instantly converts text containing HTML special characters to safe entity-encoded HTML, and decodes encoded HTML back to readable text.",
    howTo: [
      "Paste your text or HTML into the input field",
      "Click Encode to convert characters like <, >, &, \", and ' to their HTML entity equivalents",
      "Click Decode to convert HTML entities (&amp;, &lt;, &#39;, etc.) back to their original characters",
      "Use the output for safely rendering user input in HTML pages or escaping content for attributes"
    ],
    faq: [
      { q: "Why do I need to encode HTML characters?", a: "Unencoded user input inserted into HTML can break page structure or enable XSS attacks. If a user enters <script>alert('xss')</script>, without encoding, the browser executes it. Encoding turns < into &lt; — harmless text." },
      { q: "What is the difference between HTML encoding and URL encoding?", a: "HTML encoding converts characters to HTML entities (&amp;, &lt;) for safe display in HTML. URL encoding converts characters to percent-encoded sequences (%26, %3C) for safe use in URLs. They serve different contexts." },
      { q: "Which characters need to be HTML encoded?", a: "The five essential characters: & (→ &amp;), < (→ &lt;), > (→ &gt;), \" (→ &quot;), ' (→ &#39; or &apos;). Encoding all non-ASCII characters is optional but recommended for international text in older systems." }
    ]
  },
  "list-sorter": {
    about: "Sorting, deduplicating, shuffling, and transforming lists of text is a common task when cleaning data, preparing CSV imports, or managing configuration. DailyDevTools' List Sorter accepts any newline-separated list and can sort alphabetically (A–Z or Z–A), numerically, by length, or randomly — and remove duplicates, trim whitespace, filter empty lines, and reverse the order with one click.",
    howTo: [
      "Paste your list of items, one per line, into the input field",
      "Click Sort A–Z, Sort Z–A, Sort Numerically, or Shuffle to reorder the list",
      "Toggle Remove Duplicates to eliminate repeated entries",
      "Click Copy to copy the processed list to your clipboard"
    ],
    faq: [
      { q: "Does the sorter handle case-insensitive sorting?", a: "Yes. Toggle 'Case insensitive' to sort 'Apple', 'banana', 'Cherry' as if they were all the same case, producing a natural alphabetical sort regardless of capitalization." },
      { q: "Can I remove blank lines and trim whitespace?", a: "Yes. Enable 'Remove empty lines' to delete blank entries and 'Trim whitespace' to remove leading and trailing spaces from each item — useful when cleaning pasted data from spreadsheets." },
      { q: "Can I sort a numbered list and keep the numbers?", a: "The sorter can strip leading numbers before sorting and optionally renumber the items sequentially after sorting — useful for reordering prioritized lists without manually renumbering." }
    ]
  },
  "box-shadow": {
    about: "CSS box shadows add depth and elevation to UI elements but the syntax (offset-x, offset-y, blur-radius, spread-radius, color) is hard to write from memory. DailyDevTools' CSS Box Shadow Generator provides a visual editor with live preview — adjust each parameter with sliders, add multiple layered shadows, pick colors with opacity, and copy the exact CSS property ready to paste into your stylesheet.",
    howTo: [
      "Adjust the horizontal offset, vertical offset, blur radius, and spread radius using the sliders",
      "Click the color swatch to choose the shadow color and opacity",
      "Toggle Inset to create an inner shadow effect instead of an outer drop shadow",
      "Click Add Layer to add multiple stacked shadows for more complex effects, then Copy CSS"
    ],
    faq: [
      { q: "What do the four box-shadow values mean?", a: "The syntax is: box-shadow: [h-offset] [v-offset] [blur] [spread] [color]. H-offset moves the shadow left/right, v-offset up/down, blur controls softness, spread controls size, and negative spread shrinks the shadow." },
      { q: "How do I create a Material Design-style elevation shadow?", a: "Material Design elevations use soft, layered shadows. For example, elevation-2 uses: box-shadow: 0 2px 4px rgba(0,0,0,0.14), 0 3px 4px rgba(0,0,0,0.12), 0 1px 5px rgba(0,0,0,0.20). The generator's multi-layer mode handles this." },
      { q: "What is the difference between box-shadow and drop-shadow filter?", a: "box-shadow creates a rectangular shadow matching the element's border-box. The CSS filter: drop-shadow() follows the element's actual shape (including transparency), making it better for icons and irregular shapes." }
    ]
  },
  "date-diff": {
    about: "Calculating the exact number of days, weeks, months, or years between two dates is tricky because months have different lengths and leap years add complexity. DailyDevTools' Date Difference Calculator handles all this automatically — enter any two dates and instantly get the difference in days, weeks, months, years, hours, and minutes. Useful for project planning, deadline tracking, and age calculations.",
    howTo: [
      "Select the start date and end date using the date pickers",
      "The difference is calculated instantly in days, weeks, months, and years",
      "Toggle 'Exclude weekends' to count only business days between the two dates",
      "Click Swap Dates to reverse the calculation direction"
    ],
    faq: [
      { q: "How are months calculated when months have different lengths?", a: "Month differences count complete calendar months. From January 31 to March 31 is 2 months exactly. From January 31 to March 28 is 1 month and 28 days, not quite 2 months." },
      { q: "Can I calculate business days excluding weekends and holidays?", a: "Yes. Toggle 'Exclude weekends' to count only Monday–Friday. Custom holiday exclusion can be added by entering specific holiday dates to skip in the advanced options." },
      { q: "What is the maximum date range the calculator supports?", a: "The calculator handles any date range supported by JavaScript's Date object — from the year 100 to year 275,760. For historical dates before 1582, note that the Gregorian calendar was not yet in effect." }
    ]
  },
  "sql-to-json": {
    about: "Converting SQL query results or table data into JSON is a common task when building APIs, migrating data, or integrating systems. DailyDevTools' SQL to JSON converter takes SQL INSERT statements, CREATE TABLE schemas, or tabular result sets and converts them into clean, structured JSON arrays — and converts JSON arrays back into SQL INSERT statements for seeding databases.",
    howTo: [
      "Paste your SQL INSERT statements or table data into the input panel",
      "Click SQL to JSON to convert the records into a JSON array",
      "Or paste a JSON array and click JSON to SQL to generate INSERT statements",
      "Select your SQL dialect (MySQL, PostgreSQL, SQLite) for correct quoting and syntax"
    ],
    faq: [
      { q: "What SQL formats are supported for input?", a: "The converter handles SQL INSERT statements (INSERT INTO table VALUES ...), SELECT result sets pasted as tab-delimited text, and CREATE TABLE schemas for generating matching JSON structure." },
      { q: "How are NULL values handled?", a: "SQL NULL values are converted to JSON null. JSON null values convert back to SQL NULL. Empty strings remain empty strings in both directions." },
      { q: "Can this convert a whole database export?", a: "For large database exports, use your database's native JSON export feature (PostgreSQL's json_agg, MySQL's JSON_ARRAYAGG, etc.) or a purpose-built migration tool. This converter is designed for small to medium datasets." }
    ]
  },
  "keyword-density": {
    about: "Keyword density is the percentage of times a target keyword appears in a piece of content relative to the total word count. SEO best practice suggests a keyword density of 1–3% — enough to signal relevance without triggering keyword stuffing penalties. DailyDevTools' Keyword Density Analyzer calculates density for every word and phrase in your content, highlighting overuse and gaps.",
    howTo: [
      "Paste your article, blog post, or web page content into the text area",
      "The analyzer immediately shows keyword frequency and density percentage for all significant words",
      "Search for a specific keyword to see its exact density and all occurrences highlighted in the text",
      "Use the 2-word and 3-word phrase analysis to check for key phrase density too"
    ],
    faq: [
      { q: "What is the ideal keyword density for SEO?", a: "Google does not specify a target keyword density, but SEO practitioners generally aim for 1–3% for primary keywords. Higher densities can look unnatural and may be flagged as keyword stuffing, hurting rankings." },
      { q: "Does keyword density still matter for SEO in 2024?", a: "Keyword density is less important than it once was — Google now understands semantic relevance and related terms. Focus on covering a topic comprehensively rather than hitting exact density targets. Natural language wins." },
      { q: "Should I count stop words in density calculations?", a: "No. Stop words (the, a, and, is, of) are excluded from keyword density analysis because they appear in all content and are not meaningful for SEO. The analyzer skips stop words automatically." }
    ]
  },
  "json-diff": {
    about: "When debugging API changes or reviewing configuration updates, comparing two JSON objects field-by-field is far more useful than a plain text diff. DailyDevTools' JSON Diff tool performs a structural comparison of two JSON objects or arrays, highlighting added keys (green), removed keys (red), and changed values (yellow) — even in deeply nested structures — with a clean tree view.",
    howTo: [
      "Paste the original JSON in the left panel and the modified JSON in the right panel",
      "The diff highlights added, removed, and changed fields instantly",
      "Expand or collapse nested objects to focus on the changed sections",
      "Use 'Show only differences' to hide unchanged fields and focus on what changed"
    ],
    faq: [
      { q: "How is JSON Diff different from Text Diff for JSON?", a: "Text Diff compares raw strings line by line and is sensitive to key ordering and whitespace. JSON Diff parses both objects structurally, so it correctly identifies changed values even if key order differs between the two JSON objects." },
      { q: "Does it handle JSON arrays?", a: "Yes. Arrays are compared element-by-element by index. Array items that are objects are compared recursively. If array lengths differ, the extra elements are shown as added or removed." },
      { q: "Can I paste minified JSON?", a: "Yes. The tool auto-formats both inputs before comparing, so minified JSON, pretty-printed JSON, and JSON with inconsistent whitespace all compare correctly." }
    ]
  },
  "cipher-tools": {
    about: "Classical ciphers are foundational to understanding modern cryptography and are widely used in CTF (Capture The Flag) competitions and computer science education. DailyDevTools' Cipher Tools provides encoding and decoding for Caesar cipher, ROT13, Atbash, Vigenère cipher, Morse code, and more — with explanations of how each cipher works, useful for learning and puzzle-solving.",
    howTo: [
      "Select the cipher type from the dropdown: Caesar, ROT13, Atbash, Vigenère, Morse, etc.",
      "Enter your plaintext in the input field",
      "For ciphers requiring a key (like Caesar shift or Vigenère), enter the key value",
      "Click Encode to encrypt, or Decode/Decode to reverse the cipher"
    ],
    faq: [
      { q: "What is ROT13 and when is it used?", a: "ROT13 is a Caesar cipher with a shift of 13. Because the alphabet has 26 letters, applying ROT13 twice returns the original text — making encode and decode the same operation. It's used to obscure spoilers and puzzle answers online." },
      { q: "Are these ciphers secure for protecting sensitive data?", a: "No. Classical ciphers like Caesar, Atbash, and Vigenère are trivially breakable with modern computers and should never be used for real security. For actual encryption, use AES-256 or similar modern algorithms." },
      { q: "What is a Vigenère cipher?", a: "The Vigenère cipher uses a repeating keyword to apply different Caesar shifts to each letter of the message. It was considered unbreakable for centuries but was eventually cracked using the Kasiski examination method." }
    ]
  },
  "token-generator": {
    about: "Secure random tokens are used for API keys, session identifiers, password reset links, CSRF tokens, and invite codes. DailyDevTools' Token Generator creates cryptographically secure random tokens in multiple formats — hex, Base64, alphanumeric, or custom character sets — at any length, using the Web Crypto API for true randomness. All generation happens locally in your browser.",
    howTo: [
      "Set the desired token length in bytes or characters",
      "Choose the output format: hexadecimal, Base64, Base64 URL-safe, or alphanumeric",
      "Click Generate to create a new token — or generate multiple tokens at once with Bulk mode",
      "Click Copy to copy the token to your clipboard"
    ],
    faq: [
      { q: "How long should an API key or session token be?", a: "For session tokens and CSRF tokens, 128 bits (16 bytes, 32 hex chars) provides sufficient entropy. For API keys meant to be remembered or typed, 32 bytes (64 hex chars) is a safe standard used by Stripe, GitHub, and others." },
      { q: "What is the difference between a token in hex vs Base64?", a: "Both represent the same random bytes. Hex uses 2 characters per byte (0–9, a–f), making a 16-byte token 32 characters. Base64 uses ~1.33 characters per byte, so 16 bytes becomes 24 characters. Base64 is more compact." },
      { q: "Are these tokens suitable for password reset links?", a: "Yes. A 32-byte cryptographically secure token in URL-safe Base64 format is appropriate for password reset links. Store a hash of the token in your database and expire it after 1 hour." }
    ]
  },
  "favicon-generator": {
    about: "A favicon is the small icon displayed in browser tabs, bookmarks, and browser history. Modern websites need favicon files in multiple sizes (16×16, 32×32, 180×180 for Apple Touch, 192×192 for Android) and formats (ICO, PNG). DailyDevTools' Favicon Generator creates all required sizes from a single image or emoji input, downloadable as a ZIP with an HTML snippet ready to paste into your head tag.",
    howTo: [
      "Upload a square PNG or SVG image, or type an emoji to use as your favicon",
      "Preview how your favicon will look in a browser tab, bookmarks bar, and on mobile home screens",
      "Click Generate to create all required favicon sizes (16, 32, 48, 64, 180, 192, 512 px)",
      "Download the ZIP containing all favicon files and copy the HTML link tags into your site's head"
    ],
    faq: [
      { q: "What is the best image to use as a favicon source?", a: "Use a square image with a simple, recognizable design that remains legible at 16×16 pixels. Complex logos lose detail at small sizes. A single letterform or simple icon works best." },
      { q: "What HTML tags do I need for favicons?", a: "At minimum: <link rel='icon' href='/favicon.ico'>. For full cross-platform support, also add apple-touch-icon (180px PNG) for iOS, and manifest.json with 192px and 512px icons for Android PWAs." },
      { q: "Do I still need a .ico file?", a: "Yes, for legacy browser compatibility. The .ico format supports multiple resolutions in a single file. Modern browsers prefer PNG or SVG, but older browsers and Windows taskbar pinning still rely on favicon.ico." }
    ]
  },
  "robots-generator": {
    about: "A robots.txt file tells search engine crawlers which pages of your site should not be indexed or visited. It's the standard mechanism for blocking crawlers from admin pages, duplicate content, staging environments, or large binary files. DailyDevTools' Robots.txt Generator provides a visual builder to create rules for specific crawlers (Googlebot, Bingbot, GPTBot, etc.) without memorizing the syntax.",
    howTo: [
      "Add crawl rules using the rule builder: select a user agent and enter the Allow or Disallow path",
      "Add a Sitemap directive pointing to your sitemap.xml URL",
      "Set a Crawl-delay if your server has limited resources and needs to throttle crawlers",
      "Preview the generated robots.txt and click Copy or Download to save it"
    ],
    faq: [
      { q: "Does robots.txt actually prevent Google from indexing a page?", a: "Disallowing a URL in robots.txt prevents Googlebot from crawling it, but if other sites link to that URL, Google may still index it without visiting the page. To truly prevent indexing, use a noindex meta tag or X-Robots-Tag HTTP header." },
      { q: "What is the difference between Disallow and noindex?", a: "Disallow in robots.txt blocks the crawler from fetching the page at all. noindex is a directive in the page itself (or HTTP header) telling crawlers not to index the page but still allowing them to crawl it." },
      { q: "How do I block AI scrapers like GPTBot?", a: "Add a specific rule for AI crawlers: User-agent: GPTBot, followed by Disallow: /. Other AI bots to consider blocking: CCBot, anthropic-ai, Google-Extended, and PerplexityBot." }
    ]
  },
  "grid-generator": {
    about: "CSS Grid is a powerful two-dimensional layout system that makes complex web layouts far easier than float or flexbox approaches. DailyDevTools' CSS Grid Generator provides a visual drag-and-drop interface to define columns, rows, gaps, and named areas — then instantly generates the complete CSS grid-template and child placement code ready to paste into your stylesheet.",
    howTo: [
      "Set the number of columns and rows for your grid layout",
      "Click and drag across cells to create named grid areas (header, sidebar, main, footer)",
      "Adjust column widths using fr units, px, %, or auto in the column template editor",
      "Copy the generated CSS — both the container (grid-template) and child (grid-area) rules"
    ],
    faq: [
      { q: "What is the difference between fr units and percentages in CSS Grid?", a: "fr (fraction unit) distributes available space after fixed-size columns are accounted for. Percentages are calculated from the parent width including gaps. Use fr for flexible, proportional columns and px for fixed-size sidebars." },
      { q: "When should I use CSS Grid vs Flexbox?", a: "Use CSS Grid for two-dimensional layouts (rows and columns together). Use Flexbox for one-dimensional layouts (a row of buttons, a column of list items). They can be combined — Grid for the page layout, Flexbox within each grid area." },
      { q: "What is a grid-template-area?", a: "Named grid areas let you place elements by name instead of line numbers. Define areas in the container with grid-template-areas: 'header header' 'sidebar main', then place elements with grid-area: header in child CSS." }
    ]
  },
  "hmac-generator": {
    about: "HMAC (Hash-based Message Authentication Code) provides message integrity and authenticity by combining a cryptographic hash function with a secret key. HMACs are used to sign API requests (AWS Signature, Stripe webhooks), verify webhook payloads, and authenticate JWT tokens. DailyDevTools' HMAC Generator computes HMAC-SHA256, HMAC-SHA512, HMAC-SHA1, and HMAC-MD5 using the Web Crypto API.",
    howTo: [
      "Enter the message you want to authenticate in the Message field",
      "Enter your secret key in the Key field — this is the shared secret between sender and receiver",
      "Select the hash algorithm: HMAC-SHA256 (recommended), SHA512, SHA1, or MD5",
      "The HMAC signature is generated instantly and displayed in both hex and Base64 formats"
    ],
    faq: [
      { q: "What makes HMAC more secure than a plain hash?", a: "A plain hash can be forged — anyone can compute the hash of any message. An HMAC requires knowing the secret key to produce a valid authentication code. Without the key, you cannot compute or verify the HMAC." },
      { q: "Which algorithm should I use for HMAC?", a: "Use HMAC-SHA256 as the default — it is the industry standard used by AWS, Stripe, GitHub webhooks, and most modern APIs. HMAC-SHA512 provides stronger security at a small performance cost. Avoid HMAC-MD5 and HMAC-SHA1 for new systems." },
      { q: "How do I verify an incoming webhook signature with HMAC?", a: "Compute the HMAC of the raw request body using your shared secret. Compare it byte-by-byte (using a timing-safe comparison) against the signature provided in the webhook header. If they match, the payload is authentic." }
    ]
  },
  "http-status": {
    about: "HTTP status codes are 3-digit numbers that web servers return to indicate the result of a request. Knowing what 404, 500, 301, 401, 403, and 429 mean — and when to use each — is essential for API development and debugging. DailyDevTools' HTTP Status Code Reference provides a searchable list of all standard status codes with descriptions, common causes, and suggested fixes.",
    howTo: [
      "Search for any status code (e.g., 404) or keyword (e.g., 'unauthorized') in the search box",
      "Browse codes by category: 1xx Informational, 2xx Success, 3xx Redirection, 4xx Client Error, 5xx Server Error",
      "Click any status code to expand its full description, common causes, and how to resolve it",
      "Use the code as a quick reference when debugging API responses in your applications"
    ],
    faq: [
      { q: "What is the difference between 401 and 403?", a: "401 Unauthorized means the request lacks valid authentication credentials — the user is not logged in or the token is invalid. 403 Forbidden means the server understood the request but refuses to authorize it — the user is authenticated but lacks permission." },
      { q: "When should an API return 404 vs 400?", a: "Return 404 when a requested resource genuinely does not exist (GET /users/999 where user 999 doesn't exist). Return 400 for malformed requests with invalid parameters or missing required fields." },
      { q: "What is the difference between 301 and 302 redirects?", a: "301 Moved Permanently tells browsers and crawlers to permanently update their records — they cache the redirect. 302 Found is a temporary redirect that should be rechecked on each request. SEO link equity passes through 301s but not reliably through 302s." }
    ]
  },
  "week-number": {
    about: "ISO week numbers provide a standardized way to refer to a specific week in a year — useful in project planning, fiscal reporting, and scheduling systems. DailyDevTools' Week Number tool shows the current ISO week number, lets you look up the week number of any date, and lists all weeks in a year with their date ranges — bridging the gap between calendar dates and week-based planning.",
    howTo: [
      "Open the tool to see the current ISO week number and date range for this week",
      "Enter any date to look up its week number",
      "Browse the full-year calendar table showing all 52 (or 53) weeks and their start/end dates",
      "Use the year selector to view week numbers for past or future years"
    ],
    faq: [
      { q: "What is an ISO week number?", a: "ISO 8601 defines weeks as starting on Monday. Week 1 is the week containing the year's first Thursday (or equivalently, the week containing January 4). This means January 1 can be in week 52 or 53 of the previous year." },
      { q: "Why might January 1 be in week 52?", a: "If January 1 falls on a Friday, Saturday, or Sunday, it belongs to the last week of the previous year under ISO 8601, because that week's Thursday falls in the previous year." },
      { q: "Do all countries use the same week numbering system?", a: "No. ISO 8601 (Monday start, Thursday rule) is used in Europe and most of the world. The US commonly starts weeks on Sunday, which produces different week numbers. Always specify which system you are using in international projects." }
    ]
  },
  "text-tools": {
    about: "Text manipulation tasks like reversing a string, counting vowels, removing duplicate lines, or extracting email addresses from a block of text come up constantly in development. DailyDevTools' Text Tools consolidates the most common text operations in one place — reverse, sort lines, remove duplicates, extract emails/URLs, change line endings, and more — all running instantly in your browser.",
    howTo: [
      "Paste your text into the input area",
      "Choose an operation from the toolbar: Reverse, Sort Lines, Remove Duplicates, Extract Emails, etc.",
      "The processed output appears instantly in the output panel",
      "Chain multiple operations by clicking additional tools in sequence"
    ],
    faq: [
      { q: "Can I extract all URLs from a block of text?", a: "Yes. The Extract URLs operation uses a regex pattern to find all URLs in the input text and returns them as a list, one per line — useful for processing web scraped content or log files." },
      { q: "What line ending formats does it support?", a: "The tool can convert between Windows (CRLF, \\r\\n), Unix/Mac (LF, \\n), and old Mac (CR, \\r) line endings. This fixes issues with files that show as one long line or display strange characters in some editors." },
      { q: "Can I remove extra blank lines from text?", a: "Yes. The 'Remove blank lines' operation removes all empty lines. 'Condense blank lines' reduces multiple consecutive blank lines to a single blank line — useful for cleaning up pasted content from PDFs or emails." }
    ]
  },
  "url-parser": {
    about: "A URL has multiple components — scheme, username, password, hostname, port, path, query parameters, and fragment — and parsing them correctly in code requires careful handling of encoding and special cases. DailyDevTools' URL Parser breaks any URL into all its individual components with a clear visual breakdown, and lets you build URLs from parts by filling in each component separately.",
    howTo: [
      "Paste any URL into the input field — it is parsed instantly into all components",
      "Review each component: protocol, hostname, port, pathname, search params, and hash",
      "Expand the Query Parameters section to see each parameter name and value decoded",
      "Use the URL Builder to compose a URL by filling in each field separately"
    ],
    faq: [
      { q: "What are the components of a URL?", a: "A full URL has: scheme (https), authority (user:pass@host:port), path (/path/to/page), query string (?key=value&key2=value2), and fragment (#section). Not all components are required in every URL." },
      { q: "How do I parse query parameters in JavaScript?", a: "Use the built-in URLSearchParams API: const params = new URLSearchParams(window.location.search); then params.get('key') to get a value. This handles percent-decoding automatically." },
      { q: "What is the fragment (#hash) part of a URL used for?", a: "The fragment identifies a section within a document (like #introduction on a page). Browsers scroll to the matching id attribute. Fragments are not sent to the server — they are processed client-side only." }
    ]
  },
  "markdown-table": {
    about: "Markdown tables require precise pipe and dash alignment that is tedious to write by hand. DailyDevTools' Markdown Table Generator provides a spreadsheet-like interface where you add rows and columns, enter data, and set alignment — then generates perfectly formatted Markdown table syntax. It also converts CSV data to a Markdown table in one click.",
    howTo: [
      "Use the + buttons to add columns and rows to your table",
      "Type your content into each cell — the table updates live",
      "Set column alignment: left, center, or right using the alignment buttons in the header row",
      "Click Copy Markdown to copy the formatted table, or paste CSV data to convert it automatically"
    ],
    faq: [
      { q: "Does Markdown table syntax work in all Markdown renderers?", a: "Markdown tables are part of GitHub Flavored Markdown (GFM) and are supported by GitHub, GitLab, Notion, Obsidian, VS Code preview, and most blogging platforms. They are not part of the original CommonMark specification." },
      { q: "Can I import CSV data to create a table?", a: "Yes. Paste any CSV data into the CSV Import field and click Convert — the tool creates a Markdown table with the first row as headers." },
      { q: "Is the alignment of pipes important in Markdown tables?", a: "No. Markdown parsers do not require pipe alignment — it only affects human readability of the raw source. Aligned pipes are conventional in documentation, but a table with ragged pipes renders identically." }
    ]
  },
  "whatsapp-link": {
    about: "WhatsApp's click-to-chat feature lets you create links that open a WhatsApp conversation with a pre-filled message — without the recipient needing to be in your contacts. This is widely used for customer support buttons, business cards, and marketing campaigns. DailyDevTools' WhatsApp Link Generator creates properly formatted wa.me links with optional pre-filled message text.",
    howTo: [
      "Enter the phone number in international format (e.g., +1 555 123 4567 — include country code, no dashes)",
      "Optionally enter a pre-filled message that will appear in the chat box when the link is opened",
      "The link is generated instantly: https://wa.me/15551234567?text=Hello",
      "Click Copy or use the QR code to share the link"
    ],
    faq: [
      { q: "Does the person need to have my number saved to use a WhatsApp link?", a: "No. WhatsApp click-to-chat links open a conversation with any number without requiring the recipient to be saved in contacts — that is the primary use case for business customer support links." },
      { q: "What format should the phone number be in?", a: "Use international format without spaces, dashes, or parentheses: country code + area code + number. For a US number (555) 123-4567, use 15551234567. The leading + is optional in the URL." },
      { q: "Can I use WhatsApp links for business?", a: "Yes. WhatsApp Business API allows high-volume messaging, but for simple click-to-chat links on a website or business card, the free wa.me URL format works without any WhatsApp Business account." }
    ]
  },
  "paypal-link": {
    about: "PayPal.me links let you request money from anyone by sharing a simple URL like paypal.me/yourusername/25. They're used by freelancers, small businesses, creators, and individuals to collect payments without invoices or integrations. DailyDevTools' PayPal Link Generator creates properly formatted payment request URLs with the specified amount and currency.",
    howTo: [
      "Enter your PayPal.me username (the part after paypal.me/)",
      "Enter the payment amount and select the currency",
      "Optionally add a note or description for the payment",
      "Click Generate to create your payment link, then Copy or share via QR code"
    ],
    faq: [
      { q: "Do I need a PayPal Business account for PayPal.me?", a: "No. PayPal.me is available to any verified personal or business PayPal account. You just need to set up your PayPal.me username at paypal.me once, then you can share payment links immediately." },
      { q: "What currencies can I request payment in?", a: "PayPal.me links can specify any currency that PayPal supports: USD, EUR, GBP, CAD, AUD, JPY, and many more. The payer's PayPal account handles currency conversion if needed." },
      { q: "Are there fees for receiving PayPal.me payments?", a: "PayPal charges a transaction fee for receiving money: typically 2.9% + $0.30 per transaction for domestic payments in the US. Business accounts and international transfers may have different fee structures." }
    ]
  },
  "svg-to-png": {
    about: "SVG (Scalable Vector Graphics) is perfect for logos and icons on the web, but many applications — social media, email clients, older software — do not support SVG and require PNG. DailyDevTools' SVG to PNG converter renders your SVG at any resolution in the browser and exports it as a high-quality PNG — useful for preparing graphics for different contexts without Photoshop or Illustrator.",
    howTo: [
      "Upload an SVG file or paste SVG code directly into the input field",
      "Set your desired output width and height in pixels",
      "Preview the rendered PNG in the preview panel",
      "Click Download PNG to save the converted image"
    ],
    faq: [
      { q: "Does the converter preserve transparency?", a: "Yes. SVG transparent backgrounds are preserved as PNG transparency (alpha channel). If you need a solid background, use the background color picker to set a fill color before converting." },
      { q: "What resolution should I export at?", a: "For web use, export at 1× or 2× your display size. For print, use 300 DPI or higher. Since SVG is vector-based, you can export at any size without quality loss — the converter renders at your specified pixel dimensions." },
      { q: "Why might my SVG render differently than expected?", a: "SVG files may use fonts, external resources, or CSS that may not render correctly in browser-based conversion. Embed all fonts and resources, and prefer self-contained SVGs with inline styles for best results." }
    ]
  },
  "prime-factors": {
    about: "Prime factorization expresses any integer as a product of prime numbers (e.g., 360 = 2³ × 3² × 5). It underlies many areas of mathematics and computer science including cryptography (RSA encryption relies on the difficulty of factoring large numbers), greatest common divisors, and fraction simplification. DailyDevTools' Prime Factorization tool instantly factors any integer and shows the result in both exponential and expanded form.",
    howTo: [
      "Enter any positive integer in the input field",
      "The prime factorization is computed instantly and displayed in exponential notation (2³ × 3 × 5)",
      "View the factor tree diagram showing how the number breaks down step by step",
      "Use the GCD and LCM tools below to find the greatest common divisor or least common multiple of two numbers"
    ],
    faq: [
      { q: "What is a prime number?", a: "A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself. The first primes are 2, 3, 5, 7, 11, 13, 17, 19, 23, 29. By the Fundamental Theorem of Arithmetic, every integer greater than 1 has a unique prime factorization." },
      { q: "Why is prime factorization important in cryptography?", a: "RSA encryption relies on the fact that multiplying two large primes is fast, but factoring the product back into its primes is computationally infeasible for large numbers. A 2048-bit RSA key uses primes with 300+ digits." },
      { q: "How do I find the GCD using prime factorization?", a: "The GCD is the product of all prime factors common to both numbers, each taken with the smallest exponent. For example, GCD(12, 18) — factors are 2² × 3 and 2 × 3² — GCD = 2¹ × 3¹ = 6." }
    ]
  },
  "iban-validator": {
    about: "IBAN (International Bank Account Number) is a standardized format for identifying bank accounts across international borders, used by 77+ countries. It consists of a country code, check digits, and the local account number. DailyDevTools' IBAN Validator checks the structure and checksum of any IBAN, identifies the country and bank, and formats the number in both electronic and paper-friendly formats.",
    howTo: [
      "Enter the IBAN number (with or without spaces) in the input field",
      "The validator checks the format, length, and MOD-97 checksum instantly",
      "View the parsed components: country code, check digits, bank code, branch code, and account number",
      "See the country flag and name for the bank account's country"
    ],
    faq: [
      { q: "How does IBAN validation work?", a: "IBAN validation uses the MOD-97 algorithm: move the first four characters to the end, convert letters to numbers (A=10, B=11...), then check that the resulting number mod 97 equals 1. A valid IBAN always passes this check." },
      { q: "What countries use IBAN?", a: "IBAN is mandatory in the EU and used in 77+ countries including the UK, Switzerland, Norway, and most of the Middle East. The US, Canada, and Australia do not use IBAN — they use routing numbers, sort codes, and BSB numbers respectively." },
      { q: "What is the difference between IBAN and SWIFT/BIC?", a: "IBAN identifies a specific bank account (the recipient). SWIFT/BIC (Bank Identifier Code) identifies the bank itself. International wire transfers typically require both: IBAN to identify the account and BIC to route to the correct bank." }
    ]
  },

  "ascii-converter": {
    about: "ASCII (American Standard Code for Information Interchange) maps 128 characters — letters, digits, punctuation, and control characters — to numeric codes from 0 to 127. Understanding ASCII is fundamental to text encoding, binary data processing, and low-level programming. DailyDevTools' ASCII Converter converts text to ASCII codes (decimal, hex, binary, octal) and back, supporting both ASCII and Unicode code points.",
    howTo: [
      "Type or paste text to convert it to ASCII decimal codes (space-separated or one per line)",
      "Or paste a list of ASCII decimal codes to convert back to text",
      "Toggle between decimal, hexadecimal, binary, and octal output formats",
      "Use the Unicode mode to go beyond ASCII and convert any character to its Unicode code point"
    ],
    faq: [
      { q: "What is the ASCII code for common characters?", a: "Space=32, A=65, a=97, 0=48, newline=10, tab=9. The uppercase alphabet runs from 65 (A) to 90 (Z). Lowercase from 97 (a) to 122 (z). Digits from 48 (0) to 57 (9)." },
      { q: "What is the difference between ASCII and Unicode?", a: "ASCII covers 128 characters (English letters, digits, basic punctuation). Unicode covers 143,000+ characters covering all human writing systems and emoji. UTF-8 encoding is backward-compatible with ASCII for the first 128 code points." },
      { q: "What are control characters in ASCII?", a: "Control characters (codes 0–31 and 127) are non-printable characters for controlling devices and text formatting: LF (10) is a newline, CR (13) is a carriage return, ESC (27) is the escape key, DEL (127) deletes." }
    ]
  },
  "utm-builder": {
    about: "UTM parameters are tags appended to URLs to track marketing campaign performance in Google Analytics and other analytics platforms. The five UTM parameters — utm_source, utm_medium, utm_campaign, utm_term, and utm_content — tell analytics tools exactly where traffic came from. DailyDevTools' UTM Builder generates properly encoded campaign URLs and previews how they will appear in your analytics dashboard.",
    howTo: [
      "Enter your destination URL (the page you want to track traffic to)",
      "Fill in utm_source (where traffic comes from: google, newsletter, twitter), utm_medium (the channel: cpc, email, social), and utm_campaign (your campaign name)",
      "Optionally add utm_term (for paid search keywords) and utm_content (for A/B test variants)",
      "Click Generate to create the full tracking URL, then Copy or shorten with a URL shortener"
    ],
    faq: [
      { q: "Are UTM parameters case sensitive?", a: "Yes. Google Analytics treats UTM values as case-sensitive: utm_source=Google and utm_source=google appear as two separate sources. Establish a consistent naming convention (all lowercase is recommended) and stick to it." },
      { q: "Do UTM parameters hurt SEO?", a: "No, if used correctly. URLs with UTM parameters should not be canonicalized or indexed. Google Analytics strips UTM parameters from the URL in reports. Use rel=canonical or parameter exclusion in Google Search Console to prevent duplicate indexing." },
      { q: "What should I use for utm_medium?", a: "Follow Google's recommended medium values for consistency: cpc (paid search), email, social, referral, organic (don't tag organic — it's detected automatically), display (banner ads), affiliate." }
    ]
  },
  "meta-tags": {
    about: "HTML meta tags in the head section control how your page appears in search results and when shared on social media. The title tag, meta description, Open Graph tags (og:title, og:image), and Twitter Card tags determine your click-through rate from search and your link preview on social platforms. DailyDevTools' Meta Tags Preview shows how your tags will look in Google search results, Facebook, Twitter/X, and LinkedIn.",
    howTo: [
      "Enter your page URL or manually fill in the title, description, and image URL fields",
      "Preview how your page appears in Google search results (title + URL + description snippet)",
      "Check the social media previews: Facebook link card, Twitter/X card, and LinkedIn post",
      "Copy the complete HTML meta tag block to paste into your page's head section"
    ],
    faq: [
      { q: "What is the ideal meta description length?", a: "Google truncates meta descriptions at approximately 155–160 characters on desktop and 120 characters on mobile. Write your most important information in the first 120 characters. Descriptions longer than 160 characters are cut off with an ellipsis." },
      { q: "What happens if I don't set Open Graph tags?", a: "Without OG tags, social media platforms try to infer the title, description, and image from the page content, often with poor results — a random image, the wrong title, or no preview at all. Always set og:title, og:description, and og:image." },
      { q: "Do meta keywords still affect SEO?", a: "No. Google has ignored the meta keywords tag since 2009, and Bing also gives it no weight. Focus on title tags, meta descriptions, and quality content rather than keyword stuffing in meta tags." }
    ]
  },
  "og-generator": {
    about: "Open Graph (OG) tags are HTML meta tags in the head section that control how URLs are displayed when shared on Facebook, LinkedIn, Slack, WhatsApp, and other platforms. Without proper OG tags, link previews show random content or no image at all. DailyDevTools' Open Graph Generator builds the complete og: meta tag set — og:title, og:description, og:image, og:type, og:url — with a live preview.",
    howTo: [
      "Fill in your page title, description, image URL, and page type (website, article, product)",
      "Preview how the link will appear when shared on Facebook and LinkedIn",
      "Set og:image to a 1200×630px image for optimal display across all platforms",
      "Copy the generated meta tag block and paste it between your page's head tags"
    ],
    faq: [
      { q: "What size should my Open Graph image be?", a: "The recommended og:image size is 1200×630 pixels (1.91:1 aspect ratio). Images smaller than 600px wide may not display. Facebook requires images to be under 8MB. JPG and PNG are the safest formats for cross-platform support." },
      { q: "How quickly do social platforms update their cache after I change OG tags?", a: "Facebook caches links and may show old previews for days. Force a refresh using Facebook's Sharing Debugger tool (developers.facebook.com/tools/debug). Twitter has its own Card Validator. LinkedIn refreshes within 7 days." },
      { q: "Do I need separate OG tags and Twitter Card tags?", a: "Twitter Card tags (twitter:title, twitter:image) are separate from OG tags, but Twitter also reads OG tags as a fallback. Setting both gives maximum compatibility. Many sites set OG tags and omit Twitter-specific tags, relying on the fallback." }
    ]
  },
  "twitter-card": {
    about: "Twitter Cards are meta tags that control how URLs appear when shared on Twitter/X — showing a rich preview card with image, title, and description instead of a plain URL. There are four card types: summary, summary_large_image, app, and player. DailyDevTools' Twitter Card Generator creates the correct meta tags and shows a live preview of how your link will look when tweeted.",
    howTo: [
      "Select your card type: Summary (small image) or Summary Large Image (full-width banner)",
      "Fill in the title, description, and image URL",
      "Optionally add your Twitter handle to the twitter:site and twitter:creator fields",
      "Preview the card and copy the HTML meta tags to your page's head section"
    ],
    faq: [
      { q: "What is the difference between summary and summary_large_image card types?", a: "summary shows a thumbnail image to the left of the text (ideal for articles and product pages). summary_large_image shows a full-width image above the text (better for visual content like blog posts and news articles)." },
      { q: "How do I validate my Twitter Card is set up correctly?", a: "Use Twitter's Card Validator tool at developer.twitter.com/en/docs/twitter-for-websites/cards/guides/troubleshooting-cards. Enter your page URL to see if Twitter can fetch and render your card correctly." },
      { q: "What image dimensions work best for Twitter Cards?", a: "For summary_large_image, use a 1200×628 or 2:1 ratio image with a minimum size of 300×157 pixels. Twitter enforces a 5MB maximum file size. PNG and JPG are both supported." }
    ]
  },
  "aspect-ratio": {
    about: "Maintaining correct aspect ratios is critical for responsive design — a 16:9 video that appears distorted, or a product image that stretches on mobile, hurts user experience. DailyDevTools' Aspect Ratio Calculator finds the ratio for any two dimensions, calculates missing width or height for a given ratio, and covers common ratios for video (16:9, 4:3), photo (3:2), square (1:1), and social media formats.",
    howTo: [
      "Enter width and height to calculate the simplified aspect ratio",
      "Or enter a ratio (e.g., 16:9) and one dimension to calculate the other",
      "Browse the quick-reference table of common aspect ratios with real-world examples",
      "Use the CSS padding-top hack calculator to create ratio-locked containers in CSS"
    ],
    faq: [
      { q: "What are the most common aspect ratios for web and video?", a: "16:9 is the standard for HD video and widescreen monitors. 4:3 is older TV and camera format. 1:1 is square (Instagram posts). 9:16 is vertical video (TikTok, Stories). 3:2 is standard photography. 21:9 is ultrawide cinema." },
      { q: "How do I maintain aspect ratio in CSS?", a: "Modern CSS: use aspect-ratio: 16/9; on the element. Legacy approach: use a container with padding-top: 56.25% (for 16:9) and position: relative, with the child absolutely positioned inside it." },
      { q: "Why do social media platforms crop images to specific ratios?", a: "Platforms enforce aspect ratios to ensure consistent display in timelines and grids. Facebook feed images are cropped to 1.91:1. Instagram square posts are 1:1. Twitter/X cards are 2:1. Always design images to the platform's required ratio." }
    ]
  },
  "css-cursor": {
    about: "CSS provides 30+ cursor property values that control what the mouse cursor looks like when hovering over an element. Choosing the right cursor communicates affordance — users expect a pointer on clickable elements, a text cursor on editable fields, and a grab cursor on draggable items. DailyDevTools' CSS Cursor reference shows a live interactive demo of every cursor value with its CSS syntax.",
    howTo: [
      "Hover over any cursor swatch to see the cursor change in real-time",
      "Click a cursor name to copy its CSS syntax (cursor: pointer;) to your clipboard",
      "Browse by category: General, Link, Status, Selection, Drag, Resize, and Zoom cursors",
      "Use the custom cursor section to generate CSS for a custom cursor from an image URL"
    ],
    faq: [
      { q: "Which cursor should I use for clickable elements?", a: "Use cursor: pointer for links and buttons. Avoid overusing pointer on non-interactive elements — it misleads users. Use cursor: default for non-interactive elements and cursor: not-allowed for disabled controls." },
      { q: "Can I use a custom image as a CSS cursor?", a: "Yes. Use cursor: url('/path/to/cursor.cur'), auto; The url() can point to a .cur, .png, or .svg file. Include a fallback keyword (auto or pointer) after the comma in case the custom cursor fails to load." },
      { q: "What is cursor: none used for?", a: "cursor: none hides the system cursor entirely. It is used in interactive art installations, custom cursor implementations with JavaScript, and immersive web experiences where a custom animated cursor replaces the default." }
    ]
  },
  "css-triangle": {
    about: "Pure CSS triangles and arrows are created by manipulating borders on elements with zero width and height — a classic CSS trick for tooltips, dropdown arrows, breadcrumb shapes, and decorative elements without SVG or image files. DailyDevTools' CSS Triangle Generator lets you configure direction, size, and color visually and copies the complete CSS instantly.",
    howTo: [
      "Select the triangle direction: up, down, left, right, or diagonal",
      "Adjust the size using the width and height sliders",
      "Pick the triangle color using the color picker",
      "Copy the CSS (which uses border manipulation to create the triangle) into your stylesheet"
    ],
    faq: [
      { q: "How do CSS triangles work?", a: "Triangles use an element with zero width and height but thick borders. A transparent top, left, and right border with a colored bottom border creates a downward-pointing triangle. The border corners create diagonal lines that form the triangle shape." },
      { q: "Should I use CSS triangles or SVG for arrows?", a: "CSS triangles work well for simple decorative arrows in UI components. SVG is better when you need scaling at multiple sizes, accessibility (title/desc elements), or animation. For tooltips and small UI indicators, CSS triangles are perfectly fine." },
      { q: "Can I make a right-angle triangle with CSS?", a: "Yes. Use different border widths for adjacent sides: a large bottom border and smaller left border creates a right-angle triangle pointing up-right. The generator handles all standard triangle orientations including diagonal variants." }
    ]
  },
  "percentage-calculator": {
    about: "Percentage calculations come up constantly — tip calculations, test scores, price increases, sales tax, discount amounts, and budget allocations. DailyDevTools' Percentage Calculator handles all common percentage problems: What is X% of Y? X is what percent of Y? What is the percentage change from X to Y? — all solved instantly without needing to remember formulas.",
    howTo: [
      "Select the calculation type: Percentage of a number, Percentage change, or What percent is X of Y",
      "Enter the values in the input fields",
      "The result appears instantly with the formula used clearly shown",
      "Use the Percentage Change calculator to compare before and after values"
    ],
    faq: [
      { q: "How do I calculate a percentage of a number?", a: "Multiply the number by the percentage divided by 100. For 15% of 200: 200 × (15/100) = 30. Or multiply by the decimal: 200 × 0.15 = 30." },
      { q: "How do I calculate percentage increase or decrease?", a: "Percentage change = ((New Value − Old Value) / Old Value) × 100. For a price that went from $80 to $100: (($100 − $80) / $80) × 100 = 25% increase." },
      { q: "How do I find the original price before a percentage was added?", a: "If a price of $115 includes a 15% markup, the original is: $115 / 1.15 = $100. Divide the final amount by (1 + percentage/100) to reverse a percentage increase." }
    ]
  },
  "vat-calculator": {
    about: "VAT (Value Added Tax) is a consumption tax applied at each stage of production in the EU and 160+ countries worldwide. Calculating VAT correctly is essential for invoicing, pricing products for international markets, and financial reporting. DailyDevTools' VAT Calculator handles both directions: add VAT to a net price to get the gross price, or extract the VAT amount from a gross price.",
    howTo: [
      "Enter the amount and the VAT rate percentage (e.g., 20% for UK standard rate)",
      "Choose direction: Add VAT (net to gross) or Remove VAT (gross to net)",
      "View the breakdown: net amount, VAT amount, and gross amount",
      "Use the multi-rate calculator to compare VAT amounts across different countries or rates"
    ],
    faq: [
      { q: "What is the difference between VAT and sales tax?", a: "Sales tax (used in the US) is only charged at the final point of sale to the consumer. VAT is charged at every stage of production and distribution, but businesses reclaim the VAT they paid on inputs. The end consumer pays the same total tax in both systems." },
      { q: "How do I remove VAT from a price?", a: "Divide the gross price by (1 + VAT rate/100). For a £120 price including 20% VAT: £120 / 1.20 = £100 net price, and £20 VAT. Never subtract the percentage directly (that gives a wrong answer)." },
      { q: "What are common VAT rates around the world?", a: "UK: 20% standard, 5% reduced, 0% zero-rated. EU countries range from 17% (Luxembourg) to 27% (Hungary). Australia: 10% GST. Canada: 5% GST federal plus provincial taxes. The US has no federal VAT." }
    ]
  },
  "stopwatch": {
    about: "A precise browser-based stopwatch is useful for timing code performance, measuring task duration, tracking exercise intervals, and general timekeeping. DailyDevTools' Stopwatch provides millisecond precision, lap time recording with split analysis, and a clear display — all without installing any app. Results are exportable for logging.",
    howTo: [
      "Click Start to begin timing — the stopwatch counts in hours:minutes:seconds.milliseconds",
      "Click Lap to record a split time without stopping the main timer",
      "Click Stop to pause, then Start again to resume from the same time",
      "Click Reset to clear all times, or Export to save your lap times as a CSV"
    ],
    faq: [
      { q: "How accurate is a browser-based stopwatch?", a: "Modern browsers have millisecond accuracy for timing using the performance.now() API, which provides sub-millisecond resolution. However, JavaScript execution timing can add a few milliseconds of jitter during heavy page loads." },
      { q: "Will the stopwatch continue running if I switch browser tabs?", a: "Yes. The timer continues counting even when the tab is in the background, as it uses the system clock rather than counting animation frames." },
      { q: "Can I time multiple things simultaneously?", a: "The stopwatch tracks one elapsed time with multiple lap points. For timing multiple independent things simultaneously, open the tool in multiple browser tabs — each tab runs its own independent timer." }
    ]
  },
  "text-to-speech": {
    about: "Text to speech (TTS) converts written text into spoken audio using the browser's built-in Web Speech API. It is useful for proofreading (hearing errors you miss when reading), creating voice-overs for quick demos, accessibility testing, and language learning. DailyDevTools' Text to Speech tool supports multiple voices, adjustable speech rate, pitch, and volume — all processing locally without any server.",
    howTo: [
      "Type or paste your text into the input area",
      "Select a voice from the dropdown — available voices depend on your operating system and browser",
      "Adjust the rate (speed), pitch, and volume using the sliders",
      "Click Speak to start playback. Click Pause to pause, Resume to continue, or Stop to end"
    ],
    faq: [
      { q: "Which voices are available for text-to-speech?", a: "Available voices come from your operating system's TTS engine and are different on Windows, Mac, and Linux. Chrome also offers high-quality Google TTS voices when online. Most systems include multiple English accents plus other language voices." },
      { q: "Can I download the spoken audio as an MP3 or WAV?", a: "Browser Web Speech API does not expose an audio download option in all browsers. For downloadable TTS audio, use a dedicated TTS service like AWS Polly, Google Cloud TTS, or ElevenLabs which provide audio file exports." },
      { q: "What is the maximum text length for text-to-speech?", a: "Browser TTS works best on short to medium passages. Very long texts may be silently truncated by some browsers. For long documents, the tool automatically splits text into chunks and speaks them sequentially." }
    ]
  },
  "speech-to-text": {
    about: "Speech recognition converts spoken audio from your microphone into written text using the browser's Web Speech Recognition API. DailyDevTools' Speech to Text tool provides real-time transcription with language selection — useful for drafting content hands-free, creating meeting notes, transcribing recorded material, or building voice-controlled apps. Processing happens in the browser without uploading audio.",
    howTo: [
      "Allow microphone access when prompted by your browser",
      "Select your speaking language from the language dropdown",
      "Click Start Listening and speak clearly — text appears in real-time as you speak",
      "Click Stop to end the session. Click Copy to copy your transcribed text"
    ],
    faq: [
      { q: "Which browsers support speech recognition?", a: "The Web Speech Recognition API is supported in Chrome and Edge with high quality. Firefox and Safari have limited or no support. For Firefox users, the Chrome browser is recommended for this feature." },
      { q: "Is my audio sent to Google's servers?", a: "Yes, when using the Web Speech Recognition API in Chrome, audio is processed by Google's speech recognition service. This is a limitation of the browser API. For fully offline speech recognition, use a local solution like Whisper (OpenAI)." },
      { q: "How accurate is browser speech recognition?", a: "Chrome's speech recognition powered by Google's engine is highly accurate for clear speech in supported languages. Accuracy varies with microphone quality, background noise, accents, and technical jargon." }
    ]
  },
  "vibration-tester": {
    about: "The Vibration API lets web applications trigger haptic feedback on mobile devices. DailyDevTools' Vibration Tester lets you test patterns and durations directly in your browser, making it easy to design and test vibration feedback for mobile web apps and PWAs before writing the implementation code. Works on Android browsers; iOS Safari does not support the Vibration API.",
    howTo: [
      "Open the tool on a mobile Android device",
      "Click Single Vibration to trigger a simple pulse with adjustable duration",
      "Use Pattern mode to define a vibrate/pause pattern (e.g., 200ms on, 100ms off, 300ms on)",
      "Click Test Pattern to feel the haptic feedback and adjust until it feels right"
    ],
    faq: [
      { q: "Does vibration work on iPhone/iOS?", a: "No. Apple's Safari and all browsers on iOS do not implement the Web Vibration API. Haptic feedback on iOS web apps requires native app code or a PWA with specific entitlements." },
      { q: "What is the Vibration API syntax?", a: "navigator.vibrate(duration) for a single pulse in milliseconds. navigator.vibrate([on, off, on, off]) for a pattern alternating between vibration and pause. navigator.vibrate(0) stops any ongoing vibration." },
      { q: "Can I control vibration intensity from the web?", a: "No. The Web Vibration API only controls pattern and duration, not intensity. Intensity control requires native mobile app APIs." }
    ]
  },
  "chmod-calculator": {
    about: "Unix file permissions use an octal (base-8) number or symbolic notation to define read (r=4), write (w=2), and execute (x=1) access for the owner, group, and others. Remembering what chmod 755 or 644 means requires experience. DailyDevTools' chmod Calculator translates between octal codes, symbolic notation (rwxr-xr--), and plain English descriptions — instantly.",
    howTo: [
      "Enter an octal code (e.g., 755, 644, 777) to see the permissions it represents",
      "Or toggle the read/write/execute checkboxes for owner, group, and others to build permissions visually",
      "See the equivalent symbolic notation (rwxr-xr-x) and what each group can do in plain English",
      "Copy the chmod command (chmod 755 filename) ready to run in your terminal"
    ],
    faq: [
      { q: "What does chmod 755 mean?", a: "chmod 755 means: Owner has read (4) + write (2) + execute (1) = 7. Group has read (4) + execute (1) = 5. Others have read (4) + execute (1) = 5. Common for web server directories and executable scripts." },
      { q: "What is chmod 644 used for?", a: "644 means owner can read and write (6), group and others can only read (4). This is the standard permission for web files like HTML, CSS, and JS — the server can read them, but no one can accidentally execute or overwrite them." },
      { q: "What does the execute bit mean for directories?", a: "For directories, the execute bit means 'can enter this directory' (traverse permission). Without execute on a directory, users cannot cd into it or access files inside it, even if they have read permission on the directory itself." }
    ]
  },
  "crontab-generator": {
    about: "Cron is a Unix time-based job scheduler that runs commands at specified intervals. The crontab syntax (minute hour day month weekday) is compact but unintuitive to write from memory. DailyDevTools' Crontab Generator provides a visual schedule builder — select run frequency, specific times, days, and it generates the correct cron expression with a human-readable description and a preview of the next 5 run times.",
    howTo: [
      "Select a common preset (every minute, hourly, daily, weekly, monthly) or use Custom",
      "In Custom mode, set the minute, hour, day of month, month, and day of week fields",
      "The human-readable description shows exactly when the job will run",
      "Copy the cron expression to paste into your crontab (run crontab -e to edit)"
    ],
    faq: [
      { q: "What is the crontab syntax format?", a: "Five space-separated fields: minute (0-59), hour (0-23), day of month (1-31), month (1-12), day of week (0-7, 0 and 7 are Sunday). An asterisk (*) means 'every'. Example: 0 9 * * 1-5 runs at 9:00 AM every weekday." },
      { q: "How do I run a cron job every 15 minutes?", a: "Use */15 in the minute field: */15 * * * * /path/to/script. The slash notation means 'every N units'. */15 means every 15 minutes. */2 in the hour field means every 2 hours." },
      { q: "What is the difference between cron and crontab?", a: "Cron is the daemon (background service) that executes scheduled jobs. Crontab (cron table) is the configuration file listing the jobs and their schedules. Each user has their own crontab, managed with the crontab -e command." }
    ]
  },
  "htpasswd-generator": {
    about: "The .htpasswd file is used by Apache web servers to store usernames and hashed passwords for HTTP Basic Authentication — protecting directories, staging environments, or internal tools without a full authentication system. DailyDevTools' htpasswd Generator creates .htpasswd entries using MD5-APR, SHA1, or bcrypt hashing directly in your browser, with no server involved.",
    howTo: [
      "Enter the username and password for the account you want to create",
      "Select the hash algorithm: bcrypt (most secure), MD5-APR (widely compatible), or SHA1",
      "Click Generate to create the htpasswd entry in the correct format (username:hash)",
      "Copy the entry and append it to your .htpasswd file on your server"
    ],
    faq: [
      { q: "Which hash algorithm should I use for .htpasswd?", a: "Use bcrypt whenever your Apache version supports it (2.4+). It is the most secure option due to its computational cost, which makes brute-force attacks impractical. MD5-APR is the default and widely supported. Avoid plain SHA1 and crypt for new setups." },
      { q: "How do I protect a directory with .htpasswd?", a: "Add an .htaccess file to the directory with: AuthType Basic, AuthName 'Protected Area', AuthUserFile /path/to/.htpasswd, Require valid-user. Place the .htpasswd file outside the web root for security." },
      { q: "Can multiple users be in one .htpasswd file?", a: "Yes. Each line in the .htpasswd file represents one user: username:hashedpassword. Add multiple lines (one per user) to allow multiple users to authenticate. Generate each user's entry separately and append them to the file." }
    ]
  },
  "subnet-calculator": {
    about: "IP subnet calculation is essential for network design, cloud infrastructure configuration, and firewall rules. A subnet calculator takes an IP address and CIDR notation (like 192.168.1.0/24) and returns the network address, broadcast address, usable host range, subnet mask, wildcard mask, and total host count. DailyDevTools' Subnet Calculator handles both IPv4 and IPv6 subnets.",
    howTo: [
      "Enter an IP address with CIDR prefix (e.g., 192.168.1.0/24) or enter IP and subnet mask separately",
      "The calculator instantly shows network address, broadcast address, first and last usable hosts",
      "View the subnet mask in both dotted decimal and CIDR notation",
      "Use the subnet divider to split a network into smaller subnets of a specified size"
    ],
    faq: [
      { q: "What does /24 mean in IP notation?", a: "/24 means the first 24 bits of the IP address are the network portion, leaving 8 bits for host addresses. A /24 network has 256 total addresses (2^8), with 254 usable host addresses (subtracting network and broadcast addresses)." },
      { q: "What is the difference between a public and private IP range?", a: "Private IP ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) are reserved for internal networks and not routable on the internet. Public IPs are assigned by ISPs and are globally reachable." },
      { q: "What is a CIDR block?", a: "CIDR (Classless Inter-Domain Routing) notation represents an IP address range using an IP address followed by a slash and the prefix length (/24, /16, etc.). A /24 block covers 256 addresses. A /16 covers 65,536." }
    ]
  },
  "mac-generator": {
    about: "MAC (Media Access Control) addresses are 48-bit hardware identifiers assigned to network interfaces. They are used in network configuration, virtual machine setup, testing network software, and bypassing certain MAC-based access controls. DailyDevTools' MAC Address Generator creates random IEEE 802.3 compliant MAC addresses in standard formats (XX:XX:XX:XX:XX:XX) with options for specific OUI prefixes.",
    howTo: [
      "Click Generate to create a random MAC address",
      "Select the format: colon-separated (aa:bb:cc:dd:ee:ff), hyphen-separated (aa-bb-cc-dd-ee-ff), or no delimiter",
      "Toggle 'Locally Administered' to set the locally administered bit, or 'Unicast/Multicast' to control the group bit",
      "Use Bulk Generate to create multiple MAC addresses at once for test environments"
    ],
    faq: [
      { q: "What is a MAC address used for?", a: "MAC addresses identify network interface cards at the Data Link Layer (Layer 2). They are used by routers to track devices on a local network, by DHCP servers to assign consistent IPs, and in network access control (NAC) policies." },
      { q: "What is a locally administered MAC address?", a: "MAC addresses have a bit that indicates whether they are globally unique (assigned by IEEE to manufacturers) or locally administered (assigned by a network administrator). Locally administered addresses are used for VMs, VPNs, and testing." },
      { q: "What is an OUI in a MAC address?", a: "The first three bytes of a MAC address are the OUI (Organizationally Unique Identifier) assigned to the network device manufacturer. You can look up which company made a device by checking its OUI against the IEEE registry." }
    ]
  },
  "timezone-converter": {
    about: "Scheduling meetings across time zones, reading server logs in UTC, or coordinating deployments internationally all require reliable time zone conversion. DailyDevTools' Timezone Converter converts any date and time between all IANA timezone zones — covering all cities and regional time zones including DST transitions — and shows multiple zones simultaneously for meeting planning.",
    howTo: [
      "Select your source timezone and enter the date and time to convert",
      "Add one or more target timezones using the Add Timezone button",
      "All equivalent times update instantly, correctly applying DST rules for each zone",
      "Use the Meeting Planner view to find overlapping business hours across multiple locations"
    ],
    faq: [
      { q: "What is UTC and why is it used for servers?", a: "UTC (Coordinated Universal Time) is the global time standard — it has no timezone offset and does not observe daylight saving time. Servers log in UTC to avoid ambiguity during DST transitions and make log correlation across regions reliable." },
      { q: "What is the difference between UTC and GMT?", a: "UTC and GMT are practically equivalent for everyday use — both have 0 offset from the prime meridian. UTC is the modern standard maintained by atomic clocks, while GMT is a historical timezone. Technically, UTC is more precise." },
      { q: "How does daylight saving time affect timezone conversion?", a: "DST shifts clocks forward in spring and back in autumn in many regions. The offset between two time zones can change by 1 hour when one observes DST and the other doesn't (or observes it on different dates). Always use IANA timezone names (America/New_York, not EST) for correct DST handling." }
    ]
  },
  "email-validator": {
    about: "Email validation ensures addresses are correctly formatted and deliverable before sending campaigns, completing registrations, or importing contact lists. DailyDevTools' Email Validator checks email format against RFC 5321/5322 rules, detects common typos (gogle.com, yahooo.com), identifies disposable email providers, and validates MX records — distinguishing between syntax validation and actual deliverability.",
    howTo: [
      "Enter an email address in the input field",
      "The tool instantly checks format validity: correct structure, valid TLD, no illegal characters",
      "View the MX record check to see if the domain can receive email",
      "Use Bulk Validate to paste a list of emails and get a valid/invalid breakdown"
    ],
    faq: [
      { q: "Does validating an email address guarantee delivery?", a: "No. Format and MX validation cannot guarantee delivery. An address can be syntactically valid with working MX records but still bounce if the specific mailbox doesn't exist. The only way to confirm deliverability is to send a test email." },
      { q: "What is a disposable email address?", a: "Disposable (temporary) emails from services like Mailinator, Guerrilla Mail, and 10 Minute Mail are used to bypass registration requirements. The validator flags known disposable domain providers to help prevent fake signups." },
      { q: "What makes an email address technically valid?", a: "A valid email has a local part (before @), an @ symbol, a domain with at least one dot, and a valid TLD. The local part allows letters, digits, and certain special characters. Quoted strings and IP address literals are technically valid but rarely used." }
    ]
  },
  "password-strength": {
    about: "A strong password is long, unpredictable, and avoids common patterns — but 'strong' is hard to define without a scoring system. DailyDevTools' Password Strength Checker evaluates passwords using the zxcvbn algorithm, which estimates crack time based on pattern matching, dictionary attacks, and common password databases — giving you a realistic assessment rather than just checking for uppercase letters.",
    howTo: [
      "Type a password into the input field — the strength meter updates in real-time",
      "View the estimated crack time for different attack scenarios (offline fast hash, online throttled)",
      "Read the specific warnings about what makes the password weak (common words, patterns, repeated characters)",
      "Click Suggestions to see specific improvements recommended for your password"
    ],
    faq: [
      { q: "What makes a password strong?", a: "Length is the most important factor — a 20-character random password is vastly stronger than an 8-character complex password. Avoid dictionary words, names, dates, keyboard patterns (qwerty), and common substitutions (@ for a, 3 for e)." },
      { q: "How is password crack time calculated?", a: "Crack time estimates assume an attacker uses optimized hardware for offline attacks (billions of guesses per second for fast hashes like MD5, thousands per second for bcrypt). Modern GPUs can test 10 billion MD5 passwords per second." },
      { q: "What is the zxcvbn algorithm?", a: "zxcvbn is an open-source password strength estimator developed by Dropbox. Instead of simple rules (has uppercase? has number?), it uses pattern matching against common passwords, names, dictionary words, and keyboard patterns to estimate real-world attack resistance." }
    ]
  },
  "roman-numerals": {
    about: "Roman numerals use seven letters (I, V, X, L, C, D, M) to represent numbers and are still used today for clock faces, chapter numbers, movie release years, Olympic games, and formal documents. DailyDevTools' Roman Numeral Converter converts any integer (1–3,999) to Roman numerals and any valid Roman numeral string back to an integer — with subtractive notation (IV = 4, IX = 9) handled correctly.",
    howTo: [
      "Enter an integer (1–3,999) to convert to Roman numerals",
      "Or enter a Roman numeral string (e.g., MCMXCIX) to convert to an integer",
      "The converter handles subtractive notation automatically (IV=4, IX=9, XL=40, XC=90, CD=400, CM=900)",
      "Browse the reference table showing all Roman numeral values"
    ],
    faq: [
      { q: "Why is 4 written as IV and not IIII in Roman numerals?", a: "IV (4) uses the subtractive principle — I before V means 5 minus 1. This notation emerged in medieval Europe for efficiency. Both IIII and IV have been historically used; modern convention (and this converter) uses IV." },
      { q: "What is the largest number in Roman numerals?", a: "Standard Roman numerals go up to 3,999 (MMMCMXCIX). There is no single symbol for 4,000 or higher in the standard system. Ancient Romans used vinculum (bar over a numeral) to multiply by 1,000, but this is rarely used today." },
      { q: "How do you write the current year in Roman numerals?", a: "For 2024: MM (2000) + XXIV (24) = MMXXIV. The converter can convert any year to Roman numerals instantly." }
    ]
  },
  "margin-calculator": {
    about: "Profit margin measures what percentage of revenue is kept as profit after costs. Gross margin, operating margin, and net margin are the three key metrics every business tracks. DailyDevTools' Margin Calculator computes profit margin from cost and revenue, or reverse-calculates the selling price needed to achieve a target margin — essential for pricing products, quoting freelance rates, and evaluating business profitability.",
    howTo: [
      "Enter cost and revenue to calculate gross profit margin and markup percentage",
      "Or enter cost and target margin percentage to find the required selling price",
      "Toggle between Margin (% of revenue) and Markup (% of cost) calculations",
      "View the breakdown: cost, profit amount, revenue, and margin percentage"
    ],
    faq: [
      { q: "What is the difference between profit margin and markup?", a: "Margin is profit as a percentage of revenue: (Revenue − Cost) / Revenue. Markup is profit as a percentage of cost: (Revenue − Cost) / Cost. A 50% markup produces a 33% margin, not 50%. They measure the same profit from different bases." },
      { q: "What is a good profit margin?", a: "It varies widely by industry. Software/SaaS: 70–90%+ gross margin. Retail: 20–50%. Restaurants: 3–9% net margin. Consulting and services: 15–40% net. Compare against industry benchmarks rather than a universal standard." },
      { q: "How do I calculate a 30% margin on a product?", a: "If cost is $70 and you want a 30% margin: Selling Price = Cost / (1 − Margin) = $70 / 0.70 = $100. The margin is 30% of the $100 revenue ($30 profit). Don't add 30% to the cost ($70 × 1.30 = $91) — that gives 23% margin, not 30%." }
    ]
  },
  "roi-calculator": {
    about: "Return on Investment (ROI) is a key performance metric that measures the profitability of an investment relative to its cost. DailyDevTools' ROI Calculator computes simple ROI, annualized ROI, and net profit from initial investment and final value — used for evaluating business decisions, marketing spend effectiveness, real estate investments, and comparing multiple investment options.",
    howTo: [
      "Enter the initial investment amount and the final return amount",
      "For annualized ROI, enter the investment duration in months or years",
      "View the net profit, simple ROI percentage, and annualized ROI",
      "Use the Comparison mode to evaluate multiple investments side by side"
    ],
    faq: [
      { q: "What is the ROI formula?", a: "ROI = ((Final Value − Initial Investment) / Initial Investment) × 100. For a $10,000 investment that returns $13,000: (($13,000 − $10,000) / $10,000) × 100 = 30% ROI." },
      { q: "What is annualized ROI and why does it matter?", a: "Annualized ROI converts returns to a per-year rate for fair comparison between investments of different durations. A 30% ROI over 3 years is approximately 9.1% per year, not 10% (because of compounding). Use CAGR formula: (Final/Initial)^(1/years) − 1." },
      { q: "What is a good ROI?", a: "The stock market historically returns about 7–10% annualized ROI (inflation-adjusted). A good ROI depends on the risk profile — a 5% risk-free savings account ROI may be better than a 10% ROI in a very risky investment." }
    ]
  },
  "fuel-calculator": {
    about: "Calculating fuel costs for road trips, fleet management, or comparing the running costs of different vehicles requires knowing distance, fuel efficiency, and price per liter or gallon. DailyDevTools' Fuel Cost Calculator handles both metric (liters/100km) and imperial (MPG) systems and computes total fuel needed, total cost, and cost per kilometer or mile for any journey.",
    howTo: [
      "Enter the trip distance in km or miles",
      "Enter your vehicle's fuel efficiency in L/100km or MPG",
      "Enter the current fuel price per liter or gallon",
      "View the total fuel needed and total trip cost instantly"
    ],
    faq: [
      { q: "How do I convert MPG to L/100km?", a: "To convert UK MPG to L/100km: divide 282.5 by MPG. To convert US MPG: divide 235.2 by MPG. Example: 30 US MPG = 235.2 / 30 = 7.84 L/100km. The calculator handles both conversions automatically." },
      { q: "Does fuel efficiency change on highways vs city driving?", a: "Yes significantly. Highway driving at steady speeds is typically 20–30% more efficient than stop-and-go city driving. Vehicle fuel ratings usually show both city and highway figures — use the combined figure for mixed driving." },
      { q: "How do I calculate the cost per mile or kilometer?", a: "Cost per km = (L/100km × fuel price) / 100. For a car using 8L/100km with fuel at $1.80/L: (8 × $1.80) / 100 = $0.144 per km. Alternatively, cost per km = fuel cost per liter × consumption rate." }
    ]
  },
  "pretty-print-url": {
    about: "Long URLs with query parameters and percent-encoded characters are nearly unreadable. DailyDevTools' Pretty Print URL tool parses any URL and displays it in a structured, human-friendly format — breaking out each query parameter on its own line with decoded values, making it easy to inspect UTM tags, API query strings, tracking parameters, and complex redirect chains.",
    howTo: [
      "Paste any URL into the input field — even very long encoded URLs",
      "The tool breaks it into components: scheme, host, path, and each query parameter decoded",
      "Click any parameter name or value to copy it individually",
      "Use the Edit mode to modify parameters and reconstruct the URL"
    ],
    faq: [
      { q: "Why are URLs hard to read with many parameters?", a: "Query parameters are joined by & with values percent-encoded (spaces become %20, & in values becomes %26). A URL like ?utm_source=google&q=hello%20world%20test becomes instantly readable when each parameter is on its own decoded line." },
      { q: "Can I use this to debug UTM parameters?", a: "Yes. This is one of the primary use cases — paste a tracking URL and instantly see all UTM parameters (utm_source, utm_medium, utm_campaign, utm_term, utm_content) decoded and labeled clearly." },
      { q: "Can I edit the URL parameters and copy the updated URL?", a: "Yes. Switch to Edit mode to modify, add, or delete individual parameters. The reconstructed URL with your changes is shown at the top, properly encoded and ready to copy." }
    ]
  },
  "mock-data-generator": {
    about: "Building and testing applications requires realistic fake data — names, email addresses, phone numbers, addresses, dates, and more. Hardcoding test data leads to brittle tests, and real user data cannot be used for development due to privacy regulations. DailyDevTools' Mock Data Generator creates configurable sets of fake but realistic-looking data in JSON, CSV, or SQL format, ready for database seeding and API testing.",
    howTo: [
      "Select the fields you need: name, email, phone, address, date, UUID, lorem ipsum, numbers, etc.",
      "Set the number of records to generate (1–1000)",
      "Choose the output format: JSON array, CSV, or SQL INSERT statements",
      "Click Generate and then Download or Copy the mock dataset"
    ],
    faq: [
      { q: "Is the generated data truly random and private?", a: "Yes. All data is generated locally in your browser using random algorithms. No real people's data is used. The names, emails, and addresses are entirely fictional and generated on-demand." },
      { q: "Can I use mock data for GDPR compliance testing?", a: "Yes. Using fictional mock data instead of real user data for development and testing is a core GDPR compliance practice — it eliminates the risk of exposing real personal data in non-production environments." },
      { q: "What is the difference between mock data and seed data?", a: "Seed data is a fixed, deterministic dataset loaded once to initialize a database (e.g., admin user, default categories). Mock data is randomly generated for testing different scenarios. Both are important — seeds for consistent setup, mocks for varied test cases." }
    ]
  },
  "cron-generator": {
    about: "Cron expressions schedule automated tasks in Linux, cloud functions (AWS Lambda, Google Cloud Scheduler), CI/CD pipelines, and application frameworks (Spring, Quartz). DailyDevTools' Cron Expression Generator builds valid cron expressions for any schedule — with support for both standard 5-field Unix cron and extended 6-field expressions (with seconds) used by Spring and AWS EventBridge.",
    howTo: [
      "Select a preset schedule or choose Custom to build manually",
      "Set each field: seconds (optional), minutes, hours, day of month, month, day of week",
      "Read the human-readable description to confirm the schedule is correct",
      "Preview the next 10 execution times to verify timing before deployment"
    ],
    faq: [
      { q: "What is the difference between crontab and Spring/Quartz cron?", a: "Standard Unix cron uses 5 fields: minute hour day month weekday. Spring and Quartz use 6 fields with seconds as the first field: second minute hour day month weekday. AWS EventBridge uses a slightly different 6-field format." },
      { q: "How do I run a job on the last day of every month?", a: "In standard cron: 0 0 28-31 * * paired with a script that checks if tomorrow is month 1. Some cron implementations support the L (last) special character: 0 0 L * * for the last day of the month." },
      { q: "What does '*/5' mean in a cron expression?", a: "The */ step syntax means 'every N units starting from the minimum value'. */5 in the minutes field means every 5 minutes (0, 5, 10, 15...55). */2 in the hours field means every 2 hours (0, 2, 4...22)." }
    ]
  },
  "css-clip-path": {
    about: "CSS clip-path creates complex shapes by clipping elements to polygons, circles, ellipses, and inset rectangles — used for hero section shapes, image masks, creative card designs, and geometric layouts. Writing clip-path polygon coordinates by hand is practically impossible. DailyDevTools' CSS Clip-Path Generator provides a drag-and-drop point editor with live preview and instant CSS output.",
    howTo: [
      "Select a shape preset: circle, ellipse, polygon, or inset rectangle",
      "Drag the control points on the preview to reshape the clipping path",
      "The live preview shows the clip-path applied to an example element in real-time",
      "Click Copy CSS to get the clip-path property value ready to paste into your stylesheet"
    ],
    faq: [
      { q: "What is CSS clip-path used for?", a: "clip-path hides parts of an element outside the defined shape. Common uses: diagonal section dividers, circular image masks, hexagonal card grids, creative hero shapes, and SVG-style geometric effects without SVG markup." },
      { q: "Is clip-path well supported across browsers?", a: "Yes. clip-path with basic shapes (circle, ellipse, polygon, inset) is supported in all modern browsers. The path() function using SVG path strings has slightly lower support. Always test in Safari as it has historically had some quirks." },
      { q: "What is the difference between clip-path and mask?", a: "clip-path applies a shape mask where only the defined area is visible. CSS mask is more powerful — it uses an image or gradient to control which parts show (grayscale mask where white is visible, black is hidden). Use clip-path for shapes, mask for gradient and image-based effects." }
    ]
  },
  "meta-generator": {
    about: "HTML meta tags in the document head control how search engines index your page, how browsers render it, and how it appears when shared. Beyond og:title and description, there are viewport, charset, theme-color, canonical, robots, and many other important tags. DailyDevTools' Meta Tag Generator creates a complete, production-ready head section with all recommended meta tags for any website.",
    howTo: [
      "Fill in your page title, description, keywords, author, and canonical URL",
      "Set social media tags: Open Graph title, description, image for Facebook/LinkedIn",
      "Add Twitter Card settings, viewport configuration, and robots directives",
      "Click Copy HTML to get the complete head meta tag block ready to paste into your page"
    ],
    faq: [
      { q: "What are the most important meta tags for SEO?", a: "The most impactful: title tag (in head, not a meta tag), meta description (affects CTR but not ranking directly), canonical URL (prevents duplicate content penalties), and Open Graph tags (improves click-through from social). Viewport meta is essential for mobile." },
      { q: "What does the robots meta tag do?", a: "The robots meta tag (or X-Robots-Tag HTTP header) controls crawler behavior per page. Common values: index/noindex (whether to index the page), follow/nofollow (whether to follow links). Use noindex for duplicate content, admin pages, and thank-you pages." },
      { q: "Should I use the meta keywords tag?", a: "No. Meta keywords have been ignored by Google since 2009 and give no SEO benefit. They may even help competitors identify your target keywords. Omit them entirely from your meta tag setup." }
    ]
  },
  "api-docs": {
    about: "Good API documentation is essential for developer adoption and reducing support burden. DailyDevTools' API Docs viewer lets you render and explore OpenAPI (Swagger) 2.0, 3.0, and 3.1 specifications in a clean, interactive interface — paste your JSON or YAML spec and instantly get a navigable reference with request/response examples, parameter descriptions, and authentication details.",
    howTo: [
      "Paste your OpenAPI/Swagger JSON or YAML specification into the input panel",
      "Browse the automatically generated endpoint list grouped by tags",
      "Click any endpoint to expand the full documentation: parameters, request body, response schemas, and examples",
      "Use the Try It Out feature to make test API calls directly from the documentation"
    ],
    faq: [
      { q: "What OpenAPI versions are supported?", a: "The viewer supports OpenAPI/Swagger 2.0, OpenAPI 3.0, and OpenAPI 3.1 in both JSON and YAML formats. Older Swagger 1.x specifications are not supported." },
      { q: "Can I use this to test API endpoints?", a: "Yes. Enable the 'Try It Out' mode to send real HTTP requests to the API endpoints documented in your spec. Configure a base URL and authentication headers before testing." },
      { q: "What is the difference between Swagger and OpenAPI?", a: "OpenAPI is the current name of the specification standard (formerly called the Swagger Specification). Swagger now refers to the tooling ecosystem (Swagger Editor, Swagger UI, Swagger Codegen) built by SmartBear around the OpenAPI Specification." }
    ]
  },
  "visual-database-designer": {
    about: "Designing a database schema visually is far more productive than writing DDL SQL by hand. DailyDevTools' Visual Database Designer lets you create tables, define columns with types and constraints, draw relationships (one-to-one, one-to-many, many-to-many), and generate the complete CREATE TABLE SQL for PostgreSQL, MySQL, or SQLite — all in an interactive drag-and-drop canvas.",
    howTo: [
      "Click Add Table to create a new table and give it a name",
      "Add columns by clicking the + button on each table: set name, data type, and constraints (PK, FK, NOT NULL, UNIQUE)",
      "Draw relationships by dragging from a column to the primary key of another table",
      "Click Export SQL to generate the complete DDL script with CREATE TABLE statements and foreign key constraints"
    ],
    faq: [
      { q: "What database dialects are supported for SQL export?", a: "The designer exports SQL for PostgreSQL, MySQL/MariaDB, and SQLite. Each uses slightly different syntax for data types, auto-increment (SERIAL vs AUTO_INCREMENT vs INTEGER PRIMARY KEY), and foreign key definitions." },
      { q: "Can I import an existing database schema?", a: "Yes. Paste an existing CREATE TABLE SQL script and the designer will parse it and render the visual diagram automatically — useful for visualizing and editing inherited database schemas." },
      { q: "What is the difference between a one-to-many and many-to-many relationship?", a: "One-to-many: one record in table A relates to many records in table B (one customer → many orders). Many-to-many: many records in A relate to many in B (many students ↔ many courses). Many-to-many requires a junction table (enrollments) with foreign keys to both tables." }
    ]
  }
};
