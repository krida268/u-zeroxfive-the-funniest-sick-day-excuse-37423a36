import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The Funniest Sick-Day Excuse — one line, under 200 characters.
// A smart-lock update gone wrong: the only creature the door still
// recognises is the cat, so the human is the one locked in.
const ENTRY =
  "My smart lock updated overnight and now it only recognises my cat, so I'm locked inside until she decides to let me out.";

// Gate self-check: 1-200 characters, a single line, no trailing newline.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} characters, gate is 1-200`);
}
if (ENTRY.includes("\n") || ENTRY.trim() !== ENTRY) {
  throw new Error("entry must be exactly one line with no surrounding whitespace");
}

const outDir = process.argv[2] ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
// Read back and confirm the file on disk is byte-identical to the entry.
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) {
  throw new Error("read-back mismatch: entry.txt does not match the entry");
}
console.log(`wrote ${ENTRY.length} characters to ${outPath}`);
