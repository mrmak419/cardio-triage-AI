from fastapi import FastAPI, UploadFile, File, Form, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import json
import datetime
import time 
import dns.resolver 
from motor.motor_asyncio import AsyncIOMotorClient
import ai_engine 
from fastapi.responses import StreamingResponse
import pdf_engine

load_dotenv()

app = FastAPI()

# ==========================================
# 🔧 THE DNS FIX (Bypass Router)
# ==========================================
dns.resolver.default_resolver = dns.resolver.Resolver(configure=False)
dns.resolver.default_resolver.nameservers = ['8.8.8.8']

# DATABASE CONNECTION
MONGO_URI = os.getenv("MONGO_URI")
try:
    client = AsyncIOMotorClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    db = client.triage_db
    patients_collection = db.patients
    print("🔹 Database Client Initialized (Lazy Connection)")
except Exception as e:
    print(f"❌ Database Config Error: {e}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# 🚑 BACKGROUND ALERT SYSTEM
# ==========================================
def send_critical_alert(case_id: str, score: int):
    """
    Simulates sending an urgent notification (SMS/Pager/Email) 
    to the On-Call Doctor. Run in background to avoid UI lag.
    """
    print(f"\n[ALERT SYSTEM] ⏳ Connecting to Pager System for Case {case_id}...")
    time.sleep(2) # Simulate network delay (e.g., sending email)
    print(f"🚨 [ALERT SYSTEM] ⚠️ EMERGENCY PAGE SENT TO DR. SMITH!")
    print(f"   - Patient ID: {case_id}")
    print(f"   - Risk Score: {score}/10")
    print(f"   - Status: IMMEDIATE ATTENTION REQUIRED\n")

@app.get("/")
def home():
    return {"message": "Triage AI Backend Online", "db_status": "Connected"}

@app.get("/patients")
async def get_patients():
    """Fetch recent patients for the Sidebar"""
    patients = []
    try:
        cursor = patients_collection.find().sort("timestamp", -1).limit(20)
        async for document in cursor:
            patients.append({
                "id": str(document["_id"]),
                "name": document.get("case_id", "Unknown"),
                "status": document.get("risk_level", "stable").lower(),
                "arrivalTime": document.get("time_string", "--:--"),
                "symptoms": document.get("symptoms", [])
            })
    except Exception as e:
        print(f"❌ DB Fetch Error: {e}")
        return []
    return patients

@app.post("/analyze")
async def analyze_patient(
    background_tasks: BackgroundTasks, # <--- NEW: Allows running tasks after return
    file: UploadFile = File(...), 
    data: str = Form(...) 
):
    try:
        # 1. Parse Data
        patient_data = json.loads(data)
        
        # 2. Generate Case ID
        case_id = f"CASE-{datetime.datetime.now().strftime('%H%M%S')}"
        time_string = datetime.datetime.now().strftime("%H:%M")

        # 3. Scan & Analyze
        extracted_text = ai_engine.scan_lab_report(file.file)
        analysis = ai_engine.calculate_risk_score(extracted_text, patient_data)

        # 4. SAVE TO DATABASE
        try:
            db_record = {
                "case_id": case_id,
                "timestamp": datetime.datetime.now(),
                "time_string": time_string,
                "symptoms": patient_data.get("symptoms", []),
                "vitals": {
                    "bp": patient_data.get("bp"),
                    "hr": patient_data.get("hr"),
                    "spo2": patient_data.get("spo2")
                },
                "risk_score": analysis["score"],
                "risk_level": analysis["color"], 
                "ai_analysis": analysis
            }
            await patients_collection.insert_one(db_record)
            print(f"✅ Saved Patient {case_id} to Database")
        except Exception as db_e:
            print(f"⚠️ Warning: DB Error: {db_e}")

        # 5. 🚑 CHECK FOR CRITICAL ALERT
        # If status is RED or score is high, trigger the background pager
        if analysis["color"] == "red" or analysis["score"] >= 6:
            print(f"⚠️ CRITICAL STATUS DETECTED: Triggering Doctor Alert...")
            background_tasks.add_task(send_critical_alert, case_id, analysis["score"])

        return {
            "success": True,
            "analysis": analysis,
            "case_id": case_id
        }

    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get("/generate-pdf/{case_id}")
async def generate_pdf(case_id: str):
    """
    Finds a patient in the DB and returns a downloadable PDF.
    """
    # 1. Find the patient in MongoDB
    patient = await patients_collection.find_one({"case_id": case_id})
    
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    # 2. Generate PDF
    pdf_buffer = pdf_engine.create_referral_pdf(patient)

    # 3. Return as a file download
    filename = f"Referral_{case_id}.pdf"
    return StreamingResponse(
        pdf_buffer, 
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )    

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)