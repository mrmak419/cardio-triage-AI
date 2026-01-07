"use client"

import * as React from "react"

export type Language = 'en' | 'kn' | 'hi'

interface LanguageProviderProps {
    children: React.ReactNode
}

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
}

const translations = {
    en: {
        "app.title": "CardioTriage AI",
        "live.feed": "Live Feed",
        "intake.form": "Clinical Intake Form",
        "chief.complaint": "Chief Complaint",
        "run.analysis": "Run Triage Analysis",
        "status.online": "ONLINE",
        "status.offline": "OFFLINE",
        "sidebar.status": "Status",
        "header.mission": "Mission Control",
        "header.id": "ID",
        "cases": "Cases",
        "guide.title": "Emergency First Aid",
        "guide.chestpain": "Chest Pain (Heart Attack?)",
        "guide.action.aspirin": "Chew 325mg Aspirin immediately.",
        "guide.action.ambulance": "Call Ambulance (108/911).",
        "guide.action.calm": "Stay calm, sit down, do not walk.",
        "guide.cpr": "Cardiac Arrest (CPR Protocol)",
        "guide.cpr.step1": "Check Scene: Ensure safely. Tap & Shout.",
        "guide.cpr.step2": "Call 108/911: Point to someone & call ambulance.",
        "guide.cpr.step3": "Position: Flat on back on firm surface.",
        "guide.cpr.step4": "Hands: Heel of hand in center of chest. Interlock fingers.",
        "guide.cpr.step5": "Push: HARD & FAST (100-120bpm, >2 inches). Allow recoil.",
        "guide.cpr.continue": "Continue until help arrives.",
        "guide.action.aed": "Send someone to find an AED.",

        // Intake Form
        "intake.desc": "Enter patient reported symptoms and vital signs. Real-time validation active.",
        "intake.placeholder.comp": "e.g. Severe retrosternal chest pain...",
        "intake.symptoms.label": "Associated Symptoms",
        "intake.symptoms.desc": "Select all that apply.",
        "intake.hr": "Heart Rate",
        "intake.bp": "BP",
        "intake.spo2": "SpO2",
        "intake.analyzing": "Analyzing Vitals...",
        "symptom.Chest Pain": "Chest Pain",
        "symptom.Shortness of Breath": "Shortness of Breath",
        "symptom.Palpitations": "Palpitations",
        "symptom.Dizziness": "Dizziness",
        "symptom.Nausea": "Nausea",
        "symptom.Diaphoresis (Sweating)": "Diaphoresis (Sweating)",
        "symptom.Left Arm Pain": "Left Arm Pain",
        "symptom.Jaw Pain": "Jaw Pain",

        // File Uploader
        "upload.drop": "Drop ECG Strip or Patient File",
        "upload.supports": "Supports PDF, PNG, JPG (Max 50MB)",
        "upload.ready": "File Ready for Analysis",
        "upload.dropzone": "DROP TO UPLOAD",

        // Dashboard
        "dash.stemi.title": "STEMI Alert Criteria Met",
        "dash.stemi.desc": "Immediate Catheterization Lab Activation Recommended. High probability of acute occlusion.",
        "dash.ai.title": "AI Risk Assessment",
        "dash.priority": "PRIORITY",
        "dash.confidence": "Confidence Level",
        "dash.clinical.title": "Clinical Decision Support",
        "dash.action.page": "Page On-Call Cardiologist",
        "dash.action.cath": "Transfer to Cath Lab",
        "dash.handover.title": "Doctor's Handover Note",
        "dash.summary": "Summary",
        "dash.ecg": "ECG Findings",
        "dash.vitals": "Vitals",
        "dash.rec": "Recommendation",

        // Scanning
        "scan.title": "AI Analysis Active",
        "scan.step1": "Digitizing ECG Waveform...",
        "scan.step2": "Analyzing ST Segments...",
        "scan.step3": "Correlating Clinical Symptoms...",
        "scan.step4": "Calculating Triage Priority...",

        // Healthy Heart Guide
        "health.title": "Healthy Heart Guide",
        "health.diet.title": "🥗 Daily Diet (Low Cost)",
        "health.diet.desc": "DASH/Mediterranean: High fiber, low sodium. Eat seasonal fruits/veg.",
        "health.exercise.title": "🏃‍♂️ Active Lifestyle",
        "health.exercise.desc": "Goal: 150 mins moderate aerobic activity per week.",
        "health.vitals.title": "📊 Regular Vitals",
        "health.vitals.desc": "Monitor BP (Target <120/80) & Cholesterol regularly.",
        "health.lifestyle.title": "🧘 Habits",
        "health.lifestyle.desc": "Sleep 7-8 hours. Stress management. No smoking/alcohol."
    },
    kn: {
        "app.title": "ಕಾರ್ಡಿಯೋ ಟ್ರೈಯೇಜ್ ಎಐ",
        "live.feed": "ನೇರ ಪ್ರಸಾರ",
        "status.online": "ಆನ್‌ಲೈನ್",
        "status.offline": "ಆಫ್‌ಲೈನ್",
        "sidebar.status": "ಸ್ಥಿತಿ",
        "header.mission": "ಮಿಷನ್ ಕಂಟ್ರೋಲ್",
        "header.id": "ಐಡಿ",
        "cases": "ಪ್ರಕರಣಗಳು",
        "scan.step1": "ECG ತರಂಗರೂಪವನ್ನು ಡಿಜಿಟಲೀಕರಿಸಲಾಗುತ್ತಿದೆ...",
        "scan.step2": "ST ಭಾಗಗಳನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
        "scan.step3": "ಕ್ಲಿನಿಕಲ್ ಲಕ್ಷಣಗಳನ್ನು ಹೋಲಿಸಲಾಗುತ್ತಿದೆ...",
        "scan.step4": "ಟ್ರೈಯೇಜ್ ಆದ್ಯತೆಯನ್ನು ಲೆಕ್ಕಹಾಕಲಾಗುತ್ತಿದೆ...",

        // Healthy Heart Guide
        "health.title": "ಆರೋಗ್ಯಕರ ಹೃದಯ ಮಾರ್ಗಸೂಚಿ",
        "health.diet.title": "🥗 ದೈನಂದಿನ ಆಹಾರ (ಕಡಿಮೆ ಖರ್ಚು)",
        "health.diet.desc": "DASH ಡಯಟ್: ಹೆಚ್ಚು ನಾರಿನಂಶ, ಕಡಿಮೆ ಉಪ್ಪು. ಹಣ್ಣು/ತರಕಾರಿ ಸೇವಿಸಿ.",
        "health.exercise.title": "🏃‍♂️ ಸಕ್ರಿಯ ಜೀವನಶೈಲಿ",
        "health.exercise.desc": "ಗುರಿ: ವಾರಕ್ಕೆ 150 ನಿಮಿಷ ಸಾಧಾರಣ ವ್ಯಾಯಾಮ.",
        "health.vitals.title": "📊 ನಿಯಮಿತ ತಪಾಸಣೆ",
        "health.vitals.desc": "BP (<120/80) ಮತ್ತು ಕೊಲೆಸ್ಟ್ರಾಲ್ ಪರೀಕ್ಷಿಸಿ.",
        "health.lifestyle.title": "🧘 ಅಭ್ಯಾಸಗಳು",
        "health.lifestyle.desc": "7-8 ಗಂಟೆ ನಿದ್ರಿಸಿ. ಒತ್ತಡ ನಿರ್ವಹಣೆ. ಧೂಮಪಾನ/ಮದ್ಯಪಾನ ಬೇಡ.",

        "intake.form": "ದವಾಖಾನೆ ನೋಂದಣಿ ನಮೂನೆ",
        "chief.complaint": "ಮುಖ್ಯ ದೂರು",
        "run.analysis": "ವಿಶ್ಲೇಷಣೆ ನಡೆಸಿ",
        "guide.title": "ತುರ್ತು ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ",
        "guide.chestpain": "ಎದೆ ನೋವು (ಹೃದಯಾಘಾತ?)",
        "guide.action.aspirin": "ತಕ್ಷಣ 325mg ಆಸ್ಪಿರಿನ್ ಮಾತ್ರೆ ಅಗಿಯಿರಿ.",
        "guide.action.ambulance": "ಆಂಬ್ಯುಲೆನ್ಸ್‌ಗೆ ಕರೆ ಮಾಡಿ (108/911).",
        "guide.action.calm": "ಶಾಂತವಾಗಿರಿ, ಕುಳಿತುಕೊಳ್ಳಿ, ನಡೆಯಬೇಡಿ.",
        "guide.cpr": "ಹೃದಯ ಸ್ತಂಭನ (ಸಿಪಿಆರ್ ಪ್ರೋಟೋಕಾಲ್)",
        "guide.cpr.step1": "ಸ್ಥಳವನ್ನು ಪರಿಶೀಲಿಸಿ: ಸುರಕ್ಷಿತವಾಗಿದೆ ಎಂದು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
        "guide.cpr.step2": "108 ಕರೆ ಮಾಡಿ: ಆಂಬ್ಯುಲೆನ್ಸ್‌ಗೆ ಕರೆ ಮಾಡಿ.",
        "guide.cpr.step3": "ಸ್ಥಾನ: ಗಟ್ಟಿಯಾದ ಮೇಲ್ಮೈಯಲ್ಲಿ ಬೆನ್ನಿನ ಮೇಲೆ ಮಲಗಿಸಿ.",
        "guide.cpr.step4": "ಕೈಗಳು: ಎದೆಯ ಮಧ್ಯದಲ್ಲಿ ಒಂದು ಕೈಯ ಹಿಮ್ಮಡಿ ಇರಿಸಿ.",
        "guide.cpr.step5": "ಒತ್ತಿರಿ: ಜೋರಾಗಿ ಮತ್ತು ವೇಗವಾಗಿ (ನಿಮಿಷಕ್ಕೆ 100-120).",
        "guide.cpr.continue": "ಸಹಾಯ ಬರುವವರೆಗೆ ಮುಂದುವರಿಸಿ.",
        "guide.action.aed": "ಯಾರನ್ನಾದರೂ AED ತರಲು ಕಳುಹಿಸಿ.",

        // Intake Form
        "intake.desc": "ರೋಗಿಯ ಲಕ್ಷಣಗಳು ಮತ್ತು ಪ್ರಮುಖ ಚಿಹ್ನೆಗಳನ್ನು ನಮೂದಿಸಿ. ನೈಜ-ಸಮಯದ ಪರಿಶೀಲನೆ ಸಕ್ರಿಯವಾಗಿದೆ.",
        "intake.placeholder.comp": "ಉದಾ. ತೀವ್ರ ಎದೆ ನೋವು...",
        "intake.symptoms.label": "ಸಂಬಂಧಿತ ಲಕ್ಷಣಗಳು",
        "intake.symptoms.desc": "ಅನ್ವಯವಾಗುವ ಎಲ್ಲವನ್ನೂ ಆಯ್ಕೆಮಾಡಿ.",
        "intake.hr": "ಹೃದಯ ಬಡಿತ",
        "intake.bp": "ರಕ್ತದೊತ್ತಡ",
        "intake.spo2": "ಆಮ್ಲಜನಕ ಮಟ್ಟ (SpO2)",
        "intake.analyzing": "ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
        "symptom.Chest Pain": "ಎದೆ ನೋವು",
        "symptom.Shortness of Breath": "ಉಸಿರಾಟದ ತೊಂದರೆ",
        "symptom.Palpitations": "ಎದೆಬಡಿತ",
        "symptom.Dizziness": "ತಲೆತಿರುಗುವಿಕೆ",
        "symptom.Nausea": "ವಾಕರಿಕೆ",
        "symptom.Diaphoresis (Sweating)": "ಅತಿಯಾದ ಬೆವರುವಿಕೆ",
        "symptom.Left Arm Pain": "ಎಡಗೈ ನೋವು",
        "symptom.Jaw Pain": "ದವಡೆ ನೋವು",

        // File Uploader
        "upload.drop": "ECG ಪಟ್ಟಿ ಅಥವಾ ರೋಗಿಯ ಫೈಲ್ ಇಲ್ಲಿ ಹಾಕಿ",
        "upload.supports": "PDF, PNG, JPG ಬೆಂಬಲಿಸುತ್ತದೆ (Max 50MB)",
        "upload.ready": "ಫೈಲ್ ವಿಶ್ಲೇಷಣೆಗೆ ಸಿದ್ಧವಾಗಿದೆ",
        "upload.dropzone": "ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಬಿಡಿ",

        // Dashboard
        "dash.stemi.title": "STEMI ಎಚ್ಚರಿಕೆ ಮಾನದಂಡ ಪೂರೈಸಿದೆ",
        "dash.stemi.desc": "ತಕ್ಷಣದ ಕ್ಯಾತಿಟೆರೈಸೇಶನ್ ಲ್ಯಾಬ್ ಸಕ್ರಿಯಗೊಳಿಸುವಿಕೆ ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ.",
        "dash.ai.title": "AI ಅಪಾಯದ ಮೌಲ್ಯಮಾಪನ",
        "dash.priority": "ಆದ್ಯತೆ",
        "dash.confidence": "ವಿಶ್ವಾಸಾರ್ಹ ಮಟ್ಟ",
        "dash.clinical.title": "ವೈದ್ಯಕೀಯ ನಿರ್ಧಾರ ಬೆಂಬಲ",
        "dash.action.page": "ನಿಯೋಜಿತ ಹೃದ್ರೋಗ ತಜ್ಞರಿಗೆ ಕರೆ ಮಾಡಿ",
        "dash.action.cath": "ಕ್ಯಾಥ್ ಲ್ಯಾಬ್‌ಗೆ ವರ್ಗಾಯಿಸಿ",
        "dash.handover.title": "ವೈದ್ಯರ ಹಸ್ತಾಂತರ ಟಿಪ್ಪಣಿ",
        "dash.summary": "ಸಾರಾಂಶ",
        "dash.ecg": "ECG ಫಲಿತಾಂಶಗಳು",
        "dash.vitals": "ಪ್ರಮುಖ ಚಿಹ್ನೆಗಳು",
        "dash.rec": "ಶಿಫಾರಸು",

        // Scanning
        "scan.title": "AI ವಿಶ್ಲೇಷಣೆ ಸಕ್ರಿಯವಾಗಿದೆ",
    },
    hi: {
        "app.title": "कार्डियो ट्राइएज एआई",
        "live.feed": "सीधा प्रसारण",
        "status.online": "ऑनलाइन",
        "status.offline": "ऑफ़लाइन",
        "sidebar.status": "स्थिति",
        "header.mission": "मिशन कंट्रोल",
        "header.id": "आईडी",
        "cases": "मामले",
        "scan.step1": "ईसीजी तरंग को डिजिटाइज़ किया जा रहा है...",
        "scan.step2": "S-T सेगमेंट का विश्लेषण...",
        "scan.step3": "नैदानिक लक्षणों का मिलान...",
        "scan.step4": "ट्राइएज प्राथमिकता की गणना...",

        // Healthy Heart Guide
        "health.title": "स्वस्थ हृदय गाइड",
        "health.diet.title": "🥗 दैनिक आहार (कम खर्च)",
        "health.diet.desc": "DASH आहार: उच्च फाइबर, कम नमक। मौसमी फल/सब्जियां खाएं।",
        "health.exercise.title": "🏃‍♂️ सक्रिय जीवनशैली",
        "health.exercise.desc": "लक्ष्य: प्रति सप्ताह 150 मिनट व्यायाम।",
        "health.vitals.title": "📊 नियमित जांच",
        "health.vitals.desc": "BP (<120/80) और कोलेस्ट्रॉल की निगरानी करें।",
        "health.lifestyle.title": "🧘 आदतें",
        "health.lifestyle.desc": "7-8 घंटे सोएं। तनाव प्रबंधन। नो स्मोकिंग/अल्कोहल।",

        "intake.form": "नैदानिक सेवन प्रपत्र",
        "chief.complaint": "मुख्य शिकायत",
        "run.analysis": "विश्लेषण चलाएं",
        "guide.title": "आपातकालीन प्राथमिक चिकित्सा",
        "guide.chestpain": "छाती में दर्द (दिल का दौरा?)",
        "guide.action.aspirin": "तुरंत 325mg एस्पिरिन चबाएं।",
        "guide.action.ambulance": "एम्बुलेंस को कॉल करें (108/911)।",
        "guide.action.calm": "शांत रहें, बैठ जाएं, चलें नहीं।",
        "guide.cpr": "कार्डियक अरेस्ट (सीपीआर प्रोटोकॉल)",
        "guide.cpr.step1": "दृश्य जाँचें: सुरक्षा सुनिश्चित करें।",
        "guide.cpr.step2": "108 कॉल करें: एम्बुलेंस बुलाएं।",
        "guide.cpr.step3": "स्थिति: पीठ के बल सख्त सतह पर लिटाएं।",
        "guide.cpr.step4": "हाथ: छाती के केंद्र में हाथ रखें।",
        "guide.cpr.step5": "दबाएं: जोर से और तेजी से (100-120/मिनट)।",
        "guide.cpr.continue": "मदद आने तक जारी रखें।",
        "guide.action.aed": "किसी को एईडी खोजने भेजें।",

        // Intake Form
        "intake.desc": "रोगी के लक्षण और महत्वपूर्ण संकेत दर्ज करें। रीयल-टाइम सत्यापन सक्रिय।",
        "intake.placeholder.comp": "जैसे: गंभीर सीने में दर्द...",
        "intake.symptoms.label": "संबंधित लक्षण",
        "intake.symptoms.desc": "जो भी लागू हो, उसे चुनें।",
        "intake.hr": "हृदय दर",
        "intake.bp": "रक्तचाप",
        "intake.spo2": "SpO2",
        "intake.analyzing": "विश्लेषण जारी...",
        "symptom.Chest Pain": "छाती में दर्द",
        "symptom.Shortness of Breath": "सांस की तकलीफ",
        "symptom.Palpitations": "धड़कन",
        "symptom.Dizziness": "चक्कर आना",
        "symptom.Nausea": "जी मिचलाना",
        "symptom.Diaphoresis (Sweating)": "अधिक पसीना आना",
        "symptom.Left Arm Pain": "बाएं हाथ में दर्द",
        "symptom.Jaw Pain": "जबड़े में दर्द",

        // File Uploader
        "upload.drop": "ईसीजी स्ट्रिप या रोगी फ़ाइल यहां छोड़ें",
        "upload.supports": "PDF, PNG, JPG का समर्थन करता है (Max 50MB)",
        "upload.ready": "फ़ाइल विश्लेषण के लिए तैयार है",
        "upload.dropzone": "अपलोड करने के लिए छोड़ें",

        // Dashboard
        "dash.stemi.title": "STEMI चेतावनी मानदंड मिले",
        "dash.stemi.desc": "तत्काल कैथीटेराइजेशन लैब सक्रियण की सिफारिश की गई।",
        "dash.ai.title": "AI जोखिम मूल्यांकन",
        "dash.priority": "प्राथमिकता",
        "dash.confidence": "विश्वास स्तर",
        "dash.clinical.title": "नैदानिक निर्णय समर्थन",
        "dash.action.page": "हृदय रोग विशेषज्ञ को पेज करें",
        "dash.action.cath": "कैथ लैब में स्थानांतरण",
        "dash.handover.title": "डॉक्टर का हैंडओवर नोट",
        "dash.summary": "सारांश",
        "dash.ecg": "ईसीजी निष्कर्ष",
        "dash.vitals": "महत्वपूर्ण संकेत",
        "dash.rec": "सिफारिश",

        // Scanning
        "scan.title": "AI विश्लेषण सक्रिय"
    }
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: LanguageProviderProps) {
    const [language, setLanguage] = React.useState<Language>('en')

    const t = (key: string) => {
        return translations[language][key as keyof typeof translations['en']] || key
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => {
    const context = React.useContext(LanguageContext)
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider")
    }
    return context
}
