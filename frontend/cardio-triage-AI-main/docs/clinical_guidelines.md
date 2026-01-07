# CardioTriage AI - Clinical Knowledge Base
**Version**: 1.0.0
**Standards**: AHA/ACC Guidelines (2024 Update)
**Compliance**: HIPAA/GDPR Compliant Architecture

## 1. Triage Classification Thresholds

### 🔴 Critical (Color Code: Red)
**Immediate Intervention Required (<10 mins)**
- **ECG Findings**: 
  - ST-Segment Elevation > 1mm in 2 contiguous leads (STEMI).
  - New Left Bundle Branch Block (LBBB).
  - Sustained Ventricular Tachycardia (VT).
  - High-grade AV Block (Mobitz II / 3rd Degree).
- **Vitals**:
  - Heart Rate: >140 bpm or <40 bpm (symptomatic).
  - Systolic BP: <90 mmHg (Shock).
  - SpO2: <90% on Room Air.
- **Symptoms**: Crushing chest pain radiating to jaw/arm + Diaphoresis.

### 🟡 Urgent (Color Code: Yellow)
**Evaluated within 30 mins**
- **ECG Findings**: 
  - ST Depression > 0.5mm.
  - T-wave inversion (suggestive of Ischemia/NSTEMI).
  - Atrial Fibrillation with RVR (>110 bpm).
- **Vitals**:
  - Heart Rate: 110-140 bpm.
  - Systolic BP: >180 mmHg (Hypertensive Urgency).
  - SpO2: 90-94% on Room Air.
- **Symptoms**: Shortness of breath, Palpitations, Atypical chest pain.

### 🟢 Stable (Color Code: Green)
**Evaluated within 60-120 mins**
- **ECG Findings**: Normal Sinus Rhythm (NSR), Sinus Tachycardia < 110 bpm.
- **Vitals**: Stable within normal limits.
- **Symptoms**: Non-cardiac chest pain (sharp, reproducible), Anxiety.

## 2. IoT & Wearable Integration Protocols
- **Apple Watch / Fitbit / Garmin**:
  - **Data Points**: Heart Rate Variability (HRV), Resting HR, Atrial Fibrillation History.
  - **Protocol**: If device detected AFib within last 24h -> Upgrade Risk to **Yellow (Urgent)** regardless of current ECG, to rule out paroxysmal events.

## 3. Data Privacy & RBAC
- **Lab Technician**: Input Access Only. Cannot view patient history.
- **Nurse**: Input + Triage View. Cannot override AI Risk Score.
- **Doctor**: Full Access + Override Authority + Final Diagnosis Entry.
