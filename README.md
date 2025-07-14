# 🎓 EduNiteX — AI + Education = Limitless Learning  
**_Powered by [Intel's OpenVINO](https://docs.openvino.ai/latest/index.html)_**

👨‍💻 _By Team CodeTech_  

**Team Members**
- Mukul Sharma *(Team Leader)*
- Anagh Miglani


---

## 🚀 Overview

_EduNiteX_ is a unified AI-powered web application that enhances classroom learning through intelligent support for both students and teachers. It brings together real-time classroom insights, doubt-solving tools, 3D learning models, and workflow tracking into one interactive platform.

---

## ❓ Problem Statement

Modern classrooms struggle to provide interactive, personalized, and tech-enabled support. Students hesitate to ask doubts, while teachers lack tools to assess real-time understanding. Existing tools are fragmented, and there's no single platform that brings it all together — EduNiteX fills this gap.

---

## 🌟 Features

- _AI-Powered Class Analysis_

  - Real-time student engagement tracking via facial recognition.
  - Personalized feedback for students and insights dashboard for teachers.
  - Speech-based topic detection during live classes.

- _Smart Quiz Generator_

  - AI-generated quizzes from text or PDF input.
  - Instant result and feedback.

- _AI Answer Sheet Evaluator_

  - Upload Q&A PDFs and get AI-evaluated responses with marks, suggestions, and feedback.

- _Learn via 3D Models_

  - Generate interactive 3D explainers using text or PDFs in English, Hindi, or Hinglish.
  - Immersive, voice-guided models for better conceptual clarity.

- _Student Workflow Tracker_
  - Add syllabus, deadlines, and study goals.
  - Gemini AI generates personalized plans and suggestions.
  - Real-time progress dashboard.

---

## 🔧 Tech Stack

### 🖥 Frontend

- React.js
- Tailwind CSS

### 🧠 Backend

- Node.js
- Express.js
- Flask

### 🧬 AI Libraries and Models
__Make sure to use Python 3.10.* and install dependencies from [requirements.txt](https://github.com/mukul-sharma-tech/EduniteX/blob/main/AI/requirements.txt) inside a virtual environment for best compatibility__

- OpenVino-Dev  
  - handwritten-english-recognition-0001 (*For assignment checker, mainly trained on American English*)  
    [**OpenVINO / Open Model Zoo**]  
  - emotions-recognition-retail-0003 (*For emotion detection during virtual class & 3D virtual oral exam*)  
    [**OpenVINO / Open Model Zoo**]  
  - noise-suppression-poconetlike-0001 (*For noise suppression during speech detection*)  
    [**OpenVINO / Open Model Zoo**]  
  - quartznet-15x5-en (*For speech detection, __optimized for OpenVINO__, works best with American/neutral accents*)

- International Speech Rec (Google-based)  
  - Uses Google Speech Recognition API (*Better suited for Indian or other non-American accents; fallback when quartznet struggles*)

- OpenCV
- SciKit-Image
- google-generativeai
  - gemini-1.5-flash (*for small AI tasks*)
 

### 📡 Real-Time Communication

- WebRTC
- Socket.io

### 🗃 Database

- SupaBase

---

## 🛠 How It Works

### 1. Pre-Class Setup

- Teachers upload syllabus & notes before session.

### 2. Live Session

- AI monitors engagement and detects topics via speech recognition.

### 3. Smart Responses

- Confused students get custom prompts.
- Teachers see analytics dashboards live.

### 4. Tools Access

- Quiz generation, AI-based evaluation, 3D explainers, and workflow planner are all available in-app.

## 🌐 Deployment

[Link](https://edunite-x.vercel.app/) to live demo  

## Code Structure

All major features are developed under the main branch, including:

- AI quiz generator
- 3D learning explainers
- Assignment solver & evaluator
- Real-time video calling with AI
- Facial engagement analysis
- Speech-driven topic detection

## 🤝 Contributing

Feel free to open issues or pull requests. Let's improve education with AI, together.
<p align="center">
  <img src="https://img.shields.io/badge/Python-3.10-blue?logo=python&logoColor=white" alt="Python 3.10" />
  <img src="https://img.shields.io/badge/OpenVINO-optimized-critical?logo=intel&logoColor=white" alt="OpenVINO" />
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white" alt="React 18.2.0" />
  <img src="https://img.shields.io/badge/Flask-2.3.2-black?logo=flask&logoColor=white" alt="Flask 2.3.2" />
  <img src="https://img.shields.io/badge/Supabase-2.28.0-3ECF8E?logo=supabase&logoColor=white" alt="Supabase 2.28.0" />
  <img src="https://img.shields.io/badge/Node.js-20.2.0-339933?logo=node.js&logoColor=white" alt="Node.js 20.2.0" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.3.3-blue?logo=tailwind-css&logoColor=white" alt="Tailwind CSS 3.3.3" />
  <img src="https://img.shields.io/badge/OpenCV-4.8.0-6aa0f8?logo=opencv&logoColor=white" alt="OpenCV 4.8.0" />
  <img src="https://img.shields.io/badge/Socket.io-4.7.1-black?logo=socket.io&logoColor=white" alt="Socket.io 4.7.1" />
  <img src="https://img.shields.io/badge/WebRTC-1.0-orange?logo=webrtc&logoColor=white" alt="WebRTC 1.0" />
</p>
---
