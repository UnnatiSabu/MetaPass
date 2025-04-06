# MetaPass
**Closing the app doesn't mean opening yourself up**

A **privacy-first Android plugin** designed to empower users with full control over their personal data, monitors camera, microphone, and location access for apps, clears cookies and cache, and provides a privacy score for each app. It also detects malware behaviors and alerts users through a clean, easy-to-use interface powered by an LLM (Mistral) on the backend. 
While Android offers "Allow only while using the app" permissions, **PrivacyGuard goes a step further** by:
- Tracking behavior even after permissions are granted
- Automatically revoking access when risks are detected
- Providing real-time privacy scores and explanations
- Offering system-level privacy without rooting the device

## 🚀 Features

- 🧹 **Deletes cookies and app cache** to minimize tracking
- 📊 **Privacy Score Generator**: Each app gets a score based on its behavior and permission usage
- 🛡️ **Malware Behavior Detection** using LLM-powered analysis
- 💬 **Feedback System** that explains risks in natural language
- 🧠 **Mistral LLM via Ollama integration** for privacy interpretation and adaptive risk scoring

## 🛠 Tech Stack

- **Platform**: Android (Plugin)
- **LLM Backend**: Mistral via Ollama
- **Frontend**: React Native (Android SDK)
- **Backend**: Node JS, Express JS
- **Databases and APIs**: Mongo DB, POSTMAN, Mistral API

## 🏢 Enterprise & OEM Use Case

PrivacyGuard can be optionally embedded as a **system app** for:
- OEMs who want to ship privacy-first devices
- Enterprises that manage employee devices securely
- Institutions needing compliance with data security standards

## 📷 Screenshots
![WhatsApp Image 2025-04-06 at 06 13 00_97d2a738](https://github.com/user-attachments/assets/bfd6e1fa-da1a-4900-9b06-1e2c14d8ce6f)

## 🚧 Installation

Coming soon! 
For now, clone the repo and run on Android Studio:

```bash
git clone https://github.com/your-repo/MetPass.git
cd MetaPass
cd backend
npm install
nodemon server.js


