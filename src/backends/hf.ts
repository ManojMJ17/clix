import { InferenceClient, InferenceClientError } from "@huggingface/inference";
import type { Backend, BackendResponse } from "../types.js";
import fs from "fs";

export async function generateHF(
  prompt: string,
  system: string
): Promise<BackendResponse> {
  let config: any = {};
  if (fs.existsSync("config.json")) {
    config = JSON.parse(fs.readFileSync("config.json", "utf-8"));
  }

  const apiKey = config.apiKey;
  if (!apiKey) throw new Error("❌ Hugging Face API key not set!");

  const model = config.model || "meta-llama/Meta-Llama-3-8B-Instruct";

  const hf = new InferenceClient(apiKey);

  try {
    const response = await hf.chatCompletion({
      model,
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt },
      ],
      max_tokens: 300,
    });

    let output = response.choices[0]?.message?.content || "";

    output = output.replace(/```json|```/g, ""); // remove fences
    output = output.replace(/\/\/.*$/gm, ""); // remove JS comments
    output = output.replace(/,\s*([}\]])/g, "$1"); // trailing commas
    output = output.replace(/[\u0000-\u001F]+/g, ""); // control chars

    const match = output.match(/\{[\s\S]*\}/);
    if (!match)
      throw new Error("❌ No JSON object found in response:\n" + output);

    let parsed: any;
    try {
      parsed = JSON.parse(match[0]);
    } catch (err) {
      throw new Error(
        "❌ Failed to parse Hugging Face output as JSON:\n" + output
      );
    }

    // ✅ Normalize into BackendResponse
    const backendResponse: BackendResponse = {
      setupCommands:
        parsed.setupCommands ||
        parsed.commands?.map((c: any) =>
          [c.command, ...(c.options || [])].join(" ")
        ) ||
        [],
      desiredCommand:
        parsed.desiredCommand || (parsed.command ? parsed.command : ""),
      nonInteractive: parsed.nonInteractive ?? false,
      safetyLevel: parsed.safetyLevel || "safe",
      assistantMessage:
        parsed.assistantMessage ||
        parsed.explanation ||
        "No explanation provided.",
    };

    return backendResponse;
  } catch (error) {
    if (error instanceof InferenceClientError) {
      throw new Error("❌ Hugging Face API Error: " + error.message);
    } else {
      throw error;
    }
  }
}
