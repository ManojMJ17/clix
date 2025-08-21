#!/usr/bin/env node

import { loadSystemPrompt, startEngine } from "../core/engine.js";

import { Command } from "commander";

import { handleExecution } from "../core/executor.js";
import { configure } from "./configure.js";
import { showConfig } from "../config.js";

const program = new Command();

program.name("clix").description("AI-powered Linux Command Helper");

program
  .command("configure")
  .description("Setup backend and API keys")
  .action(configure);

program
  .command("showconfig")
  .description("Show current Configuration")
  .action(() => {
    showConfig();
  });

program
  .argument("[query]", "Natural language query to generate command")
  .action(async (query) => {
    if (!query) {
      console.log("\n⚡ Usage:");
      console.log("   clix showconfig      → Check current Configurations");
      console.log("   clix configure       → Setup backend & API keys");
      console.log(
        '   clix "install vlc"   → Ask AI to generate Linux command\n'
      );
      return;
    }

    const systemPrompt = await loadSystemPrompt();
    const result = await startEngine(query, systemPrompt);
    await handleExecution(result);
  });

program.parseAsync(process.argv);
