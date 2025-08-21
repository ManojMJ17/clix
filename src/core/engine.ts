import { oraPromise } from "ora";
import fs from "fs";
import { generate as generateOllama } from "../backends/ollama.js";
import path from "path";
import { generateGroq } from "../backends/groq.js";
import { generateHF } from "../backends/hf.js";

const engineFunctionMap = {
  ollama: generateOllama,
  groq: generateGroq,
  huggingface: generateHF,
};

export async function loadSystemPrompt() {
  const promptPath = path.resolve("system.prompt");
  if (fs.existsSync(promptPath)) {
    return fs.readFileSync(promptPath, "utf-8");
  }
  return "You are an AI that outputs Linux commands in JSON."; // fallback
}

export async function startEngine(
  prompt: string,
  system: string,
  showOra = true
) {
  let config: any = {};
  if (fs.existsSync("config.json")) {
    config = JSON.parse(fs.readFileSync("config.json", "utf-8"));
  }

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
