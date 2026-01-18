export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML string for simplicity in this MVP
  date: string;
  readTime: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "json-formatting-best-practices",
    title: "JSON Formatting: Best Practices for Developers",
    excerpt: "Learn why proper JSON formatting matters for debugging and how to automate it in your workflow.",
    category: "Development",
    date: "Jan 15, 2026",
    readTime: "5 min read",
    content: `
      <h2>Why JSON Formatting Matters</h2>
      <p>JSON (JavaScript Object Notation) is the language of the web. But raw JSON returned from APIs is often a minified mess. formatting it makes it readable, debuggable, and safe.</p>
      
      <h3>1. Readability is King</h3>
      <p>When you're debugging a 5000-line API response, indentation saves lives. Our <a href="/tools/json-formatter">JSON Formatter</a> uses 2-space or 4-space indentation to make structure clear.</p>

      <h3>2. Validation</h3>
      <p>A single missing comma can break your app. Always validate your JSON before committing it to config files.</p>

      <h3>Conclusion</h3>
      <p>Don't waste time manually checking brackets. Use automated tools.</p>
    `
  },
  {
    slug: "mastering-regex",
    title: "Mastering Regular Expressions: A visual guide",
    excerpt: "Regex doesn't have to be scary. We break down common patterns for email validation, URLs, and more.",
    category: "Tutorial",
    date: "Jan 12, 2026",
    readTime: "8 min read",
    content: `
      <h2>Regex Explained</h2>
      <p>Regular expressions are powerful but confusing. let's visualize them.</p>
      
      <h3>Common Patterns</h3>
      <ul>
        <li><strong>Email:</strong> <code>^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$</code></li>
        <li><strong>Phone:</strong> <code>^\\+?[1-9]\\d{1,14}$</code></li>
      </ul>

      <p>Test these patterns instantly with our <a href="/tools/regex-tester">Regex Tester</a>.</p>
    `
  },
  {
    slug: "cron-job-scheduling",
    title: "Cron Jobs Demystified: How to Schedule Tasks",
    excerpt: "Understand the 5-star syntax of Cron and how to schedule backups, emails, and scripts on Linux.",
    category: "DevOps",
    date: "Jan 10, 2026",
    readTime: "6 min read",
    content: `
      <h2>The 5 Stars of Cron</h2>
      <p>Minute, Hour, Day of Month, Month, Day of Week. That's all it is.</p>
      
      <pre><code>* * * * * command_to_run</code></pre>
      
      <h3>Examples</h3>
      <p>Run every day at midnight: <code>0 0 * * *</code></p>
      <p>Run every 15 minutes: <code>*/15 * * * *</code></p>
      
      <p>Need help? Use our <a href="/tools/cron-generator">Cron Generator</a> to build expressions visually.</p>
    `
  },
  {
    slug: "secure-password-storage-local",
    title: "Why Local Password Managers Are Safer (KeyPass Alternative)",
    excerpt: "Cloud breaches are common. Learn why storing passwords locally with AES-256 encryption is the safest bet for personal security.",
    category: "Security",
    date: "Jan 18, 2026",
    readTime: "7 min read",
    content: `
      <h2>The Problem with Cloud Vaults</h2>
      <p>LastPass, Okta, and other giants have suffered breaches. When your vault is online, it's a target.</p>
      
      <h2>The Solution: Local Encryption</h2>
      <p>Our new <strong><a href="/tools/password-manager">Local Password Manager</a></strong> runs entirely in your browser. It uses <strong>AES-GCM 256-bit encryption</strong> derived from your master password using PBKDF2.</p>
      
      <h3>How it works</h3>
      <ul>
        <li><strong>Zero Knowledge:</strong> We never see your password. It never leaves your device.</li>
        <li><strong>Offline Storage:</strong> Your encrypted vault is stored in your browser's LocalStorage.</li>
        <li><strong>Exportable:</strong> You can export/backup your raw encrypted data anytime.</li>
      </ul>
      
      <p>Stop trusting the cloud with your master keys. <a href="/tools/password-manager">Try the Local Password Manager</a> today.</p>
    `
  }
];
