import { oraPromise } from "ora";
import fs from "fs";
import { generate as generateOllama } from "../backends/ollama.js";
import path from "path";
import { generateGroq } from "../backends/groq.js";
import { generateHF } from "../backends/hf.js";
import { fileURLToPath } from "url";
import { loadConfig } from "../config.js";

const engineFunctionMap = {
  ollama: generateOllama,
  groq: generateGroq,
  huggingface: generateHF,
};
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadSystemPrompt(): Promise<string> {
  // Absolute path to project root
  const projectRoot = path.resolve(__dirname, "../../"); // adjust if engine.ts is deeper
  const promptPath = path.join(projectRoot, "system.prompt");

  if (fs.existsSync(promptPath)) {
    return fs.readFileSync(promptPath, "utf-8");
  }

  // Fallback if not found
  return "You are an AI that outputs Linux commands in JSON.";
}

export async function startEngine(
  prompt: string,
  system: string,
  showOra = true
) {
  const config = loadConfig();

  // Default to ollama if not specified
  const backend = (config.backend || "ollama").toLowerCase();
  const generateFn =
    engineFunctionMap[backend as keyof typeof engineFunctionMap];

  if (!generateFn) {
    throw new Error(`❌ Unsupported backend: ${backend}`);
  }

  const promise = generateFn(prompt, system);

  if (showOra) {
    return oraPromise(promise, {
      text: truncate(`Retrieving command... ${prompt}`, 75),
    });
  } else {
    return await promise;
  }
}

function truncate(input: string, length: number) {
  if (input.length > length) {
    return input.substring(0, length).replace(/\n/g, " ") + "...";
  }
  return input;
}
