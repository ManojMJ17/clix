import { Ollama } from "ollama";
import fs from "fs";
import { loadConfig } from "../config.js";

export async function generate(prompt: string, system: string) {
  // Load config.json if it exists
  let config = loadConfig();

  // Fallbacks if config doesn’t have values
  const host = config.host || "http://localhost:11434";
  const model = config.model || "llama3";

  // Create Ollama client
  const ollama = new Ollama({ host });

  // Send request to Ollama
  const response = await ollama.chat({
    model,
    messages: [
      { role: "system", content: system },
      { role: "user", content: prompt },
    ],
    format: "json",
    stream: true,
  });

  // Collect the streamed response
  let buffer = "";
  for await (const part of response) {
    if (part.message) {
      buffer += part.message.content;
    }
  }

  let parsed;
  try {
    parsed = JSON.parse(buffer);
  } catch (e) {
    throw new Error("❌ Failed to parse Ollama output as JSON:\n" + buffer);
  }

  return parsed;
}
