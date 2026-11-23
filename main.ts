// dumbest-agent-20261124 v1 — "The Dumbest Thing Your Agent Did Today"
// Writes the single entry line (entry.txt, next to this file) to /output/entry.txt.
// Node 22. Resolves entry.txt relative to this script file, never process.cwd().

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const line = readFileSync(join(here, "entry.txt"), "utf8").trimEnd();

if (line.length < 1 || line.length > 200) {
  throw new Error(`entry line must be 1-200 characters, got ${line.length}`);
}
if (!line.trim()) {
  throw new Error("entry line must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, line, "utf8");

// Read-back check: what the grader sees must be byte-identical to the entry.
const written = readFileSync(outPath, "utf8");
if (written !== line) {
  throw new Error("read-back mismatch: output differs from entry.txt");
}
