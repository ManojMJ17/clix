import fs from "fs";
import Groq from "groq-sdk";
import { BackendResponse } from "../types.js";
import { loadConfig } from "../config.js";

export async function generateGroq(
  prompt: string,
  system: string
): Promise<BackendResponse> {
  const config = loadConfig();

  const model = config.model || "llama-3.1-8b-instant";

  const groqApiKey = config.apiKey;

  if (!groqApiKey) throw new Error("❌ Groq API key not set!");

  const groq = new Groq({ apiKey: groqApiKey });

  const response = await groq.chat.completions.create({
    messages: [
      { role: "system", content: system },
      { role: "user", content: prompt },
    ],
    response_format: { type: "json_object" },
    model,
    temperature: 0,
    stream: true,
  });

  let buffer = "";
  for await (const part of response) {
    buffer += part.choices[0]?.delta?.content || "";
  }

  function normalizeBackendResponse(parsed: any): BackendResponse {
    return {
      setupCommands: parsed?.setupCommands || [],
      desiredCommand: parsed?.desiredCommand || "",
      nonInteractive: parsed?.nonInteractive ?? false,
      safetyLevel: parsed?.safetyLevel || "safe",
      assistantMessage: parsed?.assistantMessage || "No explanation provided.",
    };
  }

  let parsed: any = {};
  try {
    parsed = JSON.parse(buffer);
  } catch (e) {
    console.warn("⚠ Failed to parse response as JSON, using fallback:", buffer);
  }
  return normalizeBackendResponse(parsed);
}
