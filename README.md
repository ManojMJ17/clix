🐧 clix — AI-Powered Linux Command Helper

clix is an AI-powered CLI tool that helps Linux users translate natural language queries (like "delete all .tmp files older than 30 days") into the exact shell command — with explanations, safe execution, and multiple AI backends.

✨ Perfect for beginners who struggle with commands, and a productivity booster for pros.

🚀 Features

🔎 Natural Language to Linux Command — Just type clix "your request"

🤖 AI Modes:

Local Mode → Uses Ollama (if installed)

Cloud Mode → Works with APIs like Groq or Hugging Face (future-ready)

Offline Mode → Falls back to a local JSON database of common commands

🛡️ Safe Execution — Preview commands before running

📖 Command Explanations — Learn what each command does

⚡ Auto-Run Option — Execute instantly if confident

🌍 Cross-Platform — Works on Linux, WSL, and macOS

🛠️ Customizable — Extend with your own commands

📦 Installation
# Clone this repo
git clone https://github.com/yourusername/linux-command-helper.git
cd linux-command-helper

# Install dependencies
npm install

# Link the CLI globally
npm link

# Run!
clix "show current working directory"

💡 Usage Examples
# Find the largest files in home directory
clix "find the largest files in my home directory and show top 5"

# Count how many .txt files are in my home directory
clix "count how many .txt files are in my home directory"

# Show system uptime
clix "show system uptime"

# Search for the word ERROR in all .log files in home directory
clix "search for the word ERROR inside all .log files in my home directory"

🧩 Architecture

Input Layer → User enters a natural language prompt

AI Engine Selector

Checks for Ollama → If installed, runs locally

Else checks for API key (Groq / Hugging Face)

Else falls back to Offline JSON database

Command Builder → Returns Linux command + explanation

Executor →

Preview Mode

Auto-Run Mode (optional)

📹 Demo

👉 Example usage:

┌──(manoj㉿kali)-[~]
└─$ clix "count how many .txt files are in my home directory"
✔ Retrieving command... count how many .txt files are in my home directory

🎯 Desired command: find $HOME -type f -name '*.txt' | wc -l
ℹ  Explanation: This command finds all .txt files inside your home directory and counts them.
✔ Running...
▶ 12

🎯 Future Enhancements

✅ Add Groq API integration

✅ Add Hugging Face API integration

🔐 Add command sandboxing for extra safety

📝 Save command history & suggestions

🌐 Multi-language support (e.g., Hindi, Spanish queries)

🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to open a PR or Issue.

📜 License

MIT License © 2025 Manoj Kumar
