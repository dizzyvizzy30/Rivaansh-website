import { readdirSync, readFileSync, statSync } from 'node:fs';
import { relative, resolve } from 'node:path';

const root = resolve('src');
const allowedExtensions = new Set(['.astro', '.css', '.js', '.json', '.md', '.mjs', '.ts', '.tsx']);
const forbidden = /\u2014|&mdash;|&#8212;|&#x2014;/i;
const failures = [];

const extensionOf = (path) => path.slice(path.lastIndexOf('.'));

function inspect(path) {
  if (statSync(path).isDirectory()) {
    readdirSync(path).forEach((entry) => inspect(resolve(path, entry)));
    return;
  }
  if (!allowedExtensions.has(extensionOf(path))) return;

  readFileSync(path, 'utf8').split(/\r?\n/).forEach((line, index) => {
    if (forbidden.test(line)) failures.push(`${relative(process.cwd(), path)}:${index + 1}`);
  });
}

inspect(root);

if (failures.length) {
  console.error(`Em dash characters or entities are not allowed:\n${failures.join('\n')}`);
  process.exit(1);
}

console.log('Copy check passed: no em dashes.');
