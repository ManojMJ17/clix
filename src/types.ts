export type BackendResult = {
  command: string;
  explanation?: string;
};

export interface Backend {
  name: string;
  isAvailable?(): Promise<boolean>; // optional for real backends later
  generateCommand(prompt: string): Promise<string>;
}

export interface BackendResponse {
  setupCommands: string[];
  desiredCommand: string;
  nonInteractive: boolean;
  safetyLevel: "delete" | "overwrite" | "safe";
  assistantMessage: string;
}

export interface Config {
  backend: "ollama" | "groq" | "huggingface";
  apiKey: string;
  model: string;
  host?: string;
}

/**
 * Custom error type for consistent error handling across the app
 */
export class AppError extends Error {
  constructor(
    message: string,
    public code:
      | "CONFIG_ERROR"
      | "NETWORK_ERROR"
      | "PARSING_ERROR"
      | "EXECUTION_ERROR"
  ) {
    super(message);
    this.name = "AppError";
  }
}
