# CardioTriage AI
**Advanced Emergency Cardiac Triage System**

![Status](https://img.shields.io/badge/Status-Beta-purple) ![Stack](https://img.shields.io/badge/Stack-FARM-green) ![UI](https://img.shields.io/badge/UI-Mission%20Control-red)

## 🏥 Overview
CardioTriage AI is a life-critical application designed to assist medical professionals in rapidly prioritizing emergency cardiac cases. Built with a **"Clinical High-Contrast"** aesthetic, the interface functions as a "Mission Control" for the ER, ensuring high-risk patients (STEMI, Arrhythmias) are impossible to miss.

> **Note**: This repository contains the **Frontend UI Layer** of the application. It is architected to consume APIs from a Python (FastAPI) backend.

## ✨ Key Features

### 1. Mission Control Interface
- **Permanent Dark Mode**: Optimized for low-light clinical environments.
- **Live Patient Feed**: Real-time sidebar tracking incoming emergency cases.
- **High-Fidelity Animations**: Framer Motion powered pulse and scanning effects.

### 2. Rapid Intake Module
- **Drag-and-Drop Uploader**: Instant analysis of digitized ECG strips (PDF/PNG).
- **Clinical Form**: Fast-entry fields for Chief Complaint, Vitals (HR, BP, SpO2), and Symptoms.

### 3. AI Analysis Engine (Simulation)
- **Visual Scanning**: High-tech visualization of the "Analysis" phase.
- **Triage Logic**: Automatic risk stratification into **Critical (Red)**, **Elevated (Yellow)**, or **Stable (Green)**.

### 4. Decision Support Dashboard
- **Risk Score**: AI-generated confidence score (0-10).
- **Visual Evidence**: Interactive ECG waveform rendering using `Recharts`.
- **Actionable Insights**: Generated handover notes and immediate action buttons (e.g., "Page Cardiologist").

### 5. Advanced Capabilities
- **Wearable Integration**: Ingests data from smartwatches (Apple/Fitbit) for pre-arrival risk assessment.
- **Multilingual Support**: Interface available in English, Hindi, and Kannada for localized care.
- **Role-Based Access**: Secure views for Nurses (Intake) vs Doctors (Diagnosis).

## 🛠️ Tech Stack
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Shadcn/UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Motion**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/)

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+** (Runtime Environment)
- **Python 3.10+** (For Backend / Analysis Engine)
- **Git** (Version Control)
- **VS Code** (Recommended Editor)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/koushikmahadev3-eng/cardio-triage-AI.git
   cd deep-sojourner
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open Application**
   Visit `http://localhost:3000` in your browser.

## 🤝 Contributing
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License
Distributed under the MIT License.
