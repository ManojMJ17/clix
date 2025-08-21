import inquirer from "inquirer";
import { execSync, ExecSyncOptions } from "child_process";
import { BackendResponse } from "../types.js";

export async function handleExecution(response: BackendResponse) {
  const setupCommand = response.setupCommands || ""; // safe fallback

  console.log("\n⚡ Setup command:", setupCommand ? setupCommand : "None");
  console.log("🎯 Desired command:", response.desiredCommand);
  console.log("ℹ️  Explanation:", response.assistantMessage);

  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "Choose an option:",
      choices: [
        { name: "Run both (setup + desired)", value: "a" },
        { name: "Run only setup", value: "s" },
        { name: "Run only desired", value: "d" },
        { name: "Quit", value: "q" },
      ],
    },
  ]);

  if (choice === "q") return;

  const options: ExecSyncOptions = { stdio: "inherit", shell: "/bin/bash" };

  async function confirmAndRun(cmd: any) {
    if (!cmd) return; // nothing to run

    const { confirm } = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirm",
        message: `▶ Run: ${cmd}?`,
        default: false,
      },
    ]);

    if (confirm) {
      try {
        execSync(cmd, options);
      } catch (err) {
        console.error("❌ Error running command:", (err as Error).message);
      }
    } else {
      console.log(`⏩ Skipped: ${cmd}`);
    }
  }

  if (choice === "a") {
    if (setupCommand) await confirmAndRun(setupCommand);
    await confirmAndRun(response.desiredCommand);
  } else if (choice === "s") {
    if (setupCommand) await confirmAndRun(setupCommand);
  } else if (choice === "d") {
    await confirmAndRun(response.desiredCommand);
  }
}
