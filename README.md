# 🐧 clix — AI-Powered Linux Command Helper

**clix** is an AI-powered CLI tool that helps Linux users translate natural language queries (like  
`delete all .tmp files older than 30 days`) into the exact shell command — with explanations, safe execution, and multiple AI backends.

✨ Perfect for beginners who struggle with commands, and a productivity booster for pros.

## 🎥 Demo

https://github.com/user-attachments/assets/a3f94600-ab59-4996-91d6-aa991fb3a631




---

## 🚀 Features

- 🔎 Natural Language → Linux Command  
- 🤖 AI Modes: Ollama (local), Hugging Face / Groq (cloud), Offline JSON fallback  
- 🛡️ Safe Execution (preview before run)  
- 📖 Command Explanations (learn as you go)  
- ⚡ Auto-Run Option (instant execution)  
- 🌍 Cross-Platform (Linux, WSL, macOS)  
- 🛠️ Customizable (add your own commands)  

---

## 📦 Installation

```bash
# Clone this repo
git clone https://github.com/yourusername/linux-command-helper.git
cd linux-command-helper

# Install dependencies
npm install

# Meke sure everything running perfect
npm run build

# Link the CLI globally
npm link

# Run!
clix "show current working directory"
