import fs from "fs";
import path from "path";
import os from "os";

// Assuming this file is in src/
const PROJECT_ROOT = path.resolve(new URL(import.meta.url).pathname, "../../");

export function loadSystemPrompt(): string {
  const promptPath = path.join(PROJECT_ROOT, "system.prompt");
  if (!fs.existsSync(promptPath)) {
    throw new Error("❌ system.prompt not found in project folder");
  }
  const prompt = fs.readFileSync(promptPath, "utf-8");

  return prompt
    .replace("{distro}", os.version())
    .replace("{arch}", os.arch())
    .replace("{cwd}", process.cwd()); // <-- add current working directory dynamically
}
