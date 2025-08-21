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
# Clone this repo
git clone https://github.com/ManojMJ17/clix.git
cd clix

# Install dependencies
npm install

# Meke sure everything running perfect
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
