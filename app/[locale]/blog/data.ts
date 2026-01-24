export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  blocks: { type: 'h2' | 'h3' | 'p' | 'ul' | 'pre'; key: string }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "json-formatting-best-practices",
    title: "JSON Formatting: Best Practices for Developers",
    excerpt: "Learn why proper JSON formatting matters for debugging and how to automate it in your workflow.",
    category: "Development",
    date: "Jan 15, 2026",
    readTime: "5 min read",
    blocks: [{"type": "h2", "key": "block_1"}, {"type": "p", "key": "block_2"}, {"type": "h3", "key": "block_3"}, {"type": "p", "key": "block_4"}, {"type": "h3", "key": "block_5"}, {"type": "p", "key": "block_6"}, {"type": "h3", "key": "block_7"}, {"type": "p", "key": "block_8"}],
  },
  {
    slug: "mastering-regex",
    title: "Mastering Regular Expressions: A visual guide",
    excerpt: "Regex doesn't have to be scary. We break down common patterns for email validation, URLs, and more.",
    category: "Tutorial",
    date: "Jan 12, 2026",
    readTime: "8 min read",
    blocks: [{"type": "h2", "key": "block_1"}, {"type": "p", "key": "block_2"}, {"type": "h3", "key": "block_3"}, {"type": "ul", "key": "block_4"}, {"type": "p", "key": "block_5"}],
  },
  {
    slug: "cron-job-scheduling",
    title: "Cron Jobs Demystified: How to Schedule Tasks",
    excerpt: "Understand the 5-star syntax of Cron and how to schedule backups, emails, and scripts on Linux.",
    category: "DevOps",
    date: "Jan 10, 2026",
    readTime: "6 min read",
    blocks: [{"type": "h2", "key": "block_1"}, {"type": "p", "key": "block_2"}, {"type": "p", "key": "block_3"}, {"type": "pre", "key": "block_4"}, {"type": "h3", "key": "block_5"}, {"type": "p", "key": "block_6"}, {"type": "p", "key": "block_7"}],
  },
  {
    slug: "secure-password-storage-local",
    title: "Why Local Password Managers Are Safer (KeyPass Alternative)",
    excerpt: "Cloud breaches are common. Learn why storing passwords locally with AES-256 encryption is the safest bet for personal security.",
    category: "Security",
    date: "Jan 18, 2026",
    readTime: "7 min read",
    blocks: [{"type": "h2", "key": "block_1"}, {"type": "p", "key": "block_2"}, {"type": "h2", "key": "block_3"}, {"type": "p", "key": "block_4"}, {"type": "h3", "key": "block_5"}, {"type": "ul", "key": "block_6"}, {"type": "p", "key": "block_7"}],
  },
];
