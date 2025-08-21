import fs from "fs";
import Groq from "groq-sdk";
import { BackendResponse } from "../types.js";

export async function generateGroq(
  prompt: string,
  system: string
): Promise<BackendResponse> {
  const config: any = fs.existsSync("config.json")
    ? JSON.parse(fs.readFileSync("config.json", "utf-8"))
    : {};

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

  let parsed: BackendResponse;
  try {
    parsed = JSON.parse(buffer);
  } catch (e) {
    throw new Error("❌ Failed to parse Groq output as JSON:\n" + buffer);
  }

  return parsed;
}
