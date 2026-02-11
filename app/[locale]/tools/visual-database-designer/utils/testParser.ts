
import { parsePostgresSQL } from './sqlParser';

const sql = `
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255),
  full_name VARCHAR(255),
  created_at TIMESTAMP
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  slug VARCHAR(255),
  price DECIMAL(10,2),
  stock INTEGER,
  category_id INTEGER
);
`;

const result = parsePostgresSQL(sql);
console.log(JSON.stringify(result, null, 2));
