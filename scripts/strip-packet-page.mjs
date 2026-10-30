import { rm } from 'node:fs/promises';
import { join } from 'node:path';

const distDir = new URL('../dist', import.meta.url).pathname;
await rm(join(distDir, 'packet'), { recursive: true, force: true });
