import inquirer from "inquirer";
import fs from "fs";

export async function configure() {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "backend",
      message: "Choose your backend:",
      choices: ["ollama", "groq", "huggingface"],
    },
  ]);

  let config: any = { backend: answers.backend };

  if (answers.backend === "ollama") {
    const ollamaAns = await inquirer.prompt([
      {
        type: "input",
        name: "host",
        message: "Enter Ollama host (IP + port, e.g., http://localhost:11434):",
        default: "http://localhost:11434",
      },
      {
        type: "input",
        name: "model",
        message: "Enter Ollama model name (e.g., llama3, codellama):",
        default: "llama3",
      },
    ]);
    config.host = ollamaAns.host;
    config.model = ollamaAns.model;
    config.apiKey = "";
  } else if (answers.backend === "groq") {
    const groqAns = await inquirer.prompt([
      {
        type: "password",
        name: "apiKey",
        message: "Enter your Groq API Key:",
      },
      {
        type: "input",
        name: "model",
        message: "Enter your Groq Model (llama-3.1-8b-instant):",
        default: "llama-3.1-8b-instant",
      },
    ]);
    config.apiKey = groqAns.apiKey;
    config.model = groqAns.model;
    config.host = "";
  } else if (answers.backend === "huggingface") {
    const hfAns = await inquirer.prompt([
      {
        type: "password",
        name: "apiKey",
        message: "Enter your Hugging Face API Key:",
      },
      {
        type: "input",
        name: "model",
        message:
          "Enter your Hugging Face Model (meta-llama/Meta-Llama-3-8B-Instruct)",
        default: "meta-llama/Meta-Llama-3-8B-Instruct",
      },
    ]);
    config.apiKey = hfAns.apiKey;
    config.model = hfAns.model;
    config.host = "";
  }

  fs.writeFileSync("config.json", JSON.stringify(config, null, 2));
  console.log("✅ Configuration saved to config.json");
}
