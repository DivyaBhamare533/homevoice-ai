# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:
# 🏠 HomeVoice AI

> An AI-powered voice-enabled real estate search platform built using React and AWS Serverless services.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![AWS](https://img.shields.io/badge/AWS-Serverless-FF9900?logo=amazonaws)
![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?logo=vite)
![License](https://img.shields.io/badge/Status-Completed-success)

---

## 📌 Overview

HomeVoice AI is a modern real estate platform that allows users to search for properties using **natural voice commands**. It combines AI-inspired interactions with AWS serverless architecture to deliver a fast and interactive property discovery experience.

Users can:
- 🎤 Search properties using voice
- 🤖 Interact with an AI chatbot
- 🏡 View detailed property information
- 📍 Explore property locations on Google Maps
- 💰 Calculate EMIs instantly
- ⚖️ Compare multiple properties side by side
- 📞 Contact property agents directly

---

## ✨ Features

### 🎙️ Voice Search
- Browser Speech Recognition API
- Natural language property search
- Voice feedback using Speech Synthesis

### 🤖 AI Chat Assistant
- Answers property-related queries
- Suggests available properties
- Provides quick assistance

### 🏡 Property Listings
- Property images
- Price
- City
- BHK
- Rating
- Parking & Lift availability
- Nearby hospital information

### 📊 Property Comparison
- Compare two properties side by side
- Compare:
  - Price
  - City
  - BHK
  - Rating
  - Lift
  - Parking
  - AI Recommendation
  - Hospital
  - Agent Details

### 💰 EMI Calculator
- Instant EMI estimation
- Adjustable loan amount
- Interest rate
- Loan tenure

### 📞 Contact Agent
- Agent details
- One-click Call Agent button
- Phone number integration

### 📍 Google Maps Integration
- Property location preview
- Latitude & Longitude support

### 📜 Search History
- Stores recent searches
- One-click search reuse

---

# 🏗️ AWS Architecture

```
React (Vite)
       │
       ▼
Amazon API Gateway
       │
       ▼
AWS Lambda
       │
       ▼
Amazon DynamoDB
       │
       ▼
Amazon S3
(Property Images)
```

---

# 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3

### AWS Cloud
- AWS Lambda
- Amazon API Gateway
- Amazon DynamoDB
- Amazon S3

### APIs
- Web Speech API
- Speech Synthesis API
- Google Maps

---

# 📂 Project Structure

```
HomeVoiceAI/
│
├── public/
├── src/
│   ├── components/
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/DivyaBhamare533/homevoice-ai.git
```

## Install Dependencies

```bash
npm install
```

## Run

```bash
npm run dev
```

---

# 📸 Screenshots

> Add screenshots here after deployment.

Example:

```
Home Page

Voice Search

Property Details

Compare Properties

EMI Calculator

Chatbot
```

---

# 🎯 Future Enhancements

- ❤️ Favorite Properties
- 📧 Email Agent
- 🧠 AI Property Recommendations
- 🔍 Advanced Filters
- ☁️ User Authentication
- 📱 Progressive Web App (PWA)

---

# 👩‍💻 Developer

**Divya Bhamare**

B.Tech Computer Engineering

- 🌐 Portfolio: https://divya-portfolio-blue.vercel.app/
- 💼 LinkedIn: *(Add your LinkedIn URL)*
- 🐙 GitHub: https://github.com/DivyaBhamare533

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
