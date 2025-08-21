import fs from "fs";
import os from "os";

export function loadSystemPrompt(): string {
  const prompt = fs.readFileSync("system.prompt", "utf-8");
  return prompt.replace("{distro}", os.version()).replace("{arch}", os.arch());
}
