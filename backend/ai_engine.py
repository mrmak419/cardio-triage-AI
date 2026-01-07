import json
import os
from dotenv import load_dotenv  # <--- IMPORT THIS
from azure.ai.formrecognizer import DocumentAnalysisClient
from azure.core.credentials import AzureKeyCredential
from azure.ai.translation.text import TextTranslationClient
from azure.ai.translation.text.models import InputTextItem

# FORCE LOAD .ENV
load_dotenv() 

# LOAD STANDARDS
try:
    with open("standards.json", "r") as f:
        STANDARDS = json.load(f)
except FileNotFoundError:
    STANDARDS = {
        "vitals": {"bp_systolic": {"critical": 180}, "heart_rate": {"tachycardia": 120}},
        "keywords": {"critical": ["troponin positive"]}
    }

# ==========================================
# CONFIGURATION
# ==========================================
# We remove the "default" fallback so we know if it fails
DOC_ENDPOINT = os.getenv("AZURE_DOC_ENDPOINT")
DOC_KEY = os.getenv("AZURE_DOC_KEY")
TRANS_KEY = os.getenv("AZURE_TRANS_KEY")
TRANS_REGION = os.getenv("AZURE_TRANS_REGION", "eastus")
TRANS_ENDPOINT = os.getenv("AZURE_TRANS_ENDPOINT", "https://api.cognitive.microsofttranslator.com/")

def scan_lab_report(file_stream):
    """Uploads file stream to Azure Document Intelligence"""
    print(f"🔹 Connecting to Azure Endpoint: {DOC_ENDPOINT}") # Debug Print
    
    if not DOC_ENDPOINT or "YOUR_RESOURCE" in DOC_ENDPOINT:
        return "Error: Azure Keys not found. Check .env file."

    try:
        client = DocumentAnalysisClient(endpoint=DOC_ENDPOINT, credential=AzureKeyCredential(DOC_KEY))
        
        # Use 'prebuilt-read' model for OCR
        poller = client.begin_analyze_document("prebuilt-read", document=file_stream)
        result = poller.result()
        
        full_text = " ".join([line.content for page in result.pages for line in page.lines])
        print("✅ Azure Scan Complete!")
        return full_text
    except Exception as e:
        print(f"❌ Azure Error: {e}")
        return ""

def calculate_risk_score(extracted_text, patient_vitals):
    print(f"\n🔍 DEBUG - RAW DATA RECEIVED: {patient_vitals}") # <--- DEBUG PRINT
    
    risk_score = 0
    flags = []
    
    if not extracted_text:
        extracted_text = ""
    text_lower = extracted_text.lower()
    
    # 1. Analyze Vitals
    try:
        # Parse BP
        bp_raw = patient_vitals.get('bp', '0/0')
        print(f"🔍 DEBUG - BP RAW: {bp_raw}") # <--- DEBUG PRINT
        
        bp_val = str(bp_raw)
        if "/" in bp_val:
            systolic = int(bp_val.split('/')[0])
        else:
            systolic = int(bp_val) if bp_val and bp_val.strip() else 0
    except Exception as e:
        print(f"❌ BP PARSING ERROR: {e}")
        systolic = 0
    
    print(f"🔍 DEBUG - SYSTOLIC DETECTED: {systolic}") # <--- DEBUG PRINT

    # Parse HR and SpO2
    try:
        hr = int(patient_vitals.get('hr', 0))
        spo2 = int(patient_vitals.get('spo2', 100))
        print(f"🔍 DEBUG - HR: {hr}, SpO2: {spo2}") # <--- DEBUG PRINT
    except:
        hr = 0
        spo2 = 100

    # BP Logic
    if systolic > STANDARDS['vitals']['bp_systolic']['critical']:
        print("⚠️ TRIGGER: Critical BP")
        risk_score += 4
        flags.append(f"Critical BP ({systolic})")
    elif systolic > STANDARDS['vitals']['bp_systolic']['high']:
        print("⚠️ TRIGGER: High BP")
        risk_score += 2
        flags.append(f"High BP ({systolic})")

    # HR Logic
    if hr > STANDARDS['vitals']['heart_rate']['tachycardia']:
        print("⚠️ TRIGGER: Tachycardia")
        risk_score += 3
        flags.append(f"Tachycardia (HR: {hr})")

    # SpO2 Logic
    if spo2 < STANDARDS['vitals']['spo2']['critical']:
        print("⚠️ TRIGGER: Hypoxia")
        risk_score += 4
        flags.append(f"Critical Hypoxia (SpO2: {spo2}%)")

    # 2. Analyze Report Text
    if extracted_text:
        print(f"🔍 DEBUG - TEXT LENGTH: {len(extracted_text)}")
        for word in STANDARDS['keywords']['critical']:
            if word in text_lower:
                print(f"⚠️ TRIGGER: Found keyword '{word}'")
                risk_score += 5
                flags.append(f"CRITICAL FINDING: {word.title()}")

    print(f"🔍 DEBUG - FINAL SCORE: {risk_score}") # <--- DEBUG PRINT

    # 3. Final Verdict
    if risk_score >= 6:
        status = "RED (CRITICAL)"
        color_code = "red"
        recommendation = "Immediate Medical Attention Required. Doctor Notified."
    elif risk_score >= 3:
        status = "YELLOW (ELEVATED)"
        color_code = "yellow"
        recommendation = "Consultation Recommended within 24 hours."
    else:
        status = "GREEN (STABLE)"
        color_code = "green"
        recommendation = "Routine Checkup. No immediate danger detected."
        
    return {
        "score": risk_score,
        "status": status,
        "color": color_code,
        "recommendation": recommendation,
        "flags": flags
    }