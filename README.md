# 🐧 clix — AI-Powered Linux Command Helper  

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)  
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)  
[![Platform](https://img.shields.io/badge/platform-Linux%20%7C%20WSL%20%7C%20macOS-blue.svg)]()  

`clix` is an **AI-powered CLI tool** that helps Linux users translate **natural language queries** (like *"delete all .tmp files older than 30 days"*) into the **exact shell command** — with explanations, safe execution, and multiple AI backends.  

✨ Perfect for beginners who struggle with commands, and a productivity booster for pros.  

---

## 🚀 Features  
- 🔎 **Natural Language → Linux Command**  
- 🤖 **AI Modes**: Ollama (local), Hugging Face / Groq (cloud), Offline JSON fallback  
- 🛡️ **Safe Execution** (preview before run)  
- 📖 **Command Explanations** (learn as you go)  
- ⚡ **Auto-Run Option** (instant execution)  
- 🌍 **Cross-Platform** (Linux, WSL, macOS)  
- 🛠️ **Customizable** (add your own commands)  

---

## 📦 Installation  

```bash
# Clone this repo
git clone https://github.com/yourusername/linux-command-helper.git
cd linux-command-helper

# Install dependencies
npm install

# Link the CLI globally
npm link

# Run!
clix "show current working directory"
