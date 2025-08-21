import fs from "fs";
import path from "path";
import os from "os";
import { Config } from "./types.js";
import chalk from "chalk";

const CONFIG_FILE = path.join(os.homedir(), ".clix_config.json");

const DEFAULT_CONFIG: Config = {
  backend: "ollama",
  apiKey: "",
  model: "codellama",
};

export function loadConfig(): Config {
  if (!fs.existsSync(CONFIG_FILE)) {
    return DEFAULT_CONFIG;
  }
  return JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8")) as Config;
}

export function saveConfig(config: Config): void {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), "utf-8");
}

export function showConfig(): void {
  const config = loadConfig();

  console.log(chalk.bold("\n⚙️  Current Configuration:\n"));
  console.log(chalk.green("Backend:"), config.backend);
  console.log(chalk.blue("Model:"), config.model);
  if (config.host) {
    console.log(chalk.cyan("Host:"), config.host);
  }

  let apiKey = config.apiKey;
  if (apiKey) {
    const masked =
      apiKey.length > 10
        ? `${apiKey.slice(0, 5)}*****${apiKey.slice(-5)}`
        : `${apiKey.slice(0, 2)}***`;
    console.log(chalk.yellow("API Key:"), masked);
  } else {
    console.log(chalk.red("API Key:"), "Not set");
  }
  console.log("");
}
