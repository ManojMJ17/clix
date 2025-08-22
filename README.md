# 🐧 clix — AI-Powered Linux Command Helper

**clix** is an AI-powered CLI tool that helps Linux users translate natural language queries (like  
`delete all .tmp files older than 30 days`) into the exact shell command — with explanations, safe execution, and multiple AI backends.

✨ Perfect for beginners who struggle with commands, and a productivity booster for pros.

## 🎥 Demo
https://github.com/user-attachments/assets/a3f94600-ab59-4996-91d6-aa991fb3a631

---

## 🚀 Features

- 🔎 Natural Language → Linux Command  
- 🤖 AI Modes: Ollama (local), Hugging Face / Groq (cloud) 
- 🛡️ Safe Execution (preview before run)  
- 📖 Command Explanations (learn as you go)  
- ⚡ Auto-Run Option (instant execution)  
- 🌍 Cross-Platform (Linux, WSL, macOS) 

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/ManojMJ17/clix.git
cd clix

# Install dependencies
npm install

# Build the project
npm run build

# Link the CLI globally
npm link
```

## ⚙️ Configuration

```bash
# Launch clix
clix

# Set up or modify configuration
clix configure

# View current configuration
clix show config
```

## 💡 Usage Examples
```bash
# Show current working directory
clix "show current working directory"

# Find the 5 largest files in home directory
clix "find the largest files in my home directory and show top 5"

# Count all .txt files in home directory
clix "count how many .txt files are in my home directory"

# Display system uptime
clix "show system uptime"

# Search for the word ERROR in all .log files in home directory
clix "search for the word ERROR inside all .log files in my home directory"

```

---

## 🛠️ Project Workflow / Architecture

1. **User Input**  
   - User types a natural language query into `clix`.  
   - Example:  
     ```bash
     clix "find all .png files modified in the last 7 days"
     ```

2. **Backend Selection**  
   - `clix` automatically checks available backends in this order:  
     1. **Ollama (local AI)** → Runs locally if installed (privacy-first).  
     2. **Cloud AI (Hugging Face / Groq)** → Used if API keys are configured.  
     3. **Offline Mode** → Falls back to local JSON command database.  

3. **Command Generation**  
   - The selected backend generates the corresponding Linux command.  

4. **Explanation & Preview**  
   - The tool shows the suggested command with an explanation.  
   - Example:  
     ```bash
     ⚡ Suggested Command: find ~/ -name "*.png" -mtime -7
     ℹ️ Explanation: This finds all PNG files modified in the last 7 days.
     ```

5. **Execution Options**  
   - User can choose to:  
     - ✅ Run the command immediately  
     - 📋 Copy the command only  
     - ❌ Cancel without running  

6. **Result Display**  
   - If executed, the command runs and displays output in the terminal.
  
flowchart TD
  A[User types natural-language query] --> B{Select_AI_Engine}
  B -->|Ollama_Available| C[Ollama Local LLM]
  B -->|Cloud_API| D[Groq or Hugging Face]
  B -->|Offline_Mode| E[JSON Fallback]

  C --> F[Command Builder]
  D --> F
  E --> F

  F --> G[Show Command and Explanation]
  G --> H{Execution_Mode}
  H -->|Preview| I[Display Command Only]
  H -->|Auto_Run| J[Execute in Shell]
