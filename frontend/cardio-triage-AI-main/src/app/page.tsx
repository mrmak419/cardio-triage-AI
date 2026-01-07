"use client"

import * as React from "react"
import { Sidebar } from "@/components/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { FileUploader } from "@/components/intake/file-uploader"
import { useLanguage } from "@/components/language-provider"
import { SymptomForm } from "@/components/intake/symptom-form"
import { ScanningView } from "@/components/analysis/scanning-view"
import { TriageDashboard } from "@/components/dashboard/triage-dashboard"
import { FirstAidModal } from "@/components/patient/first-aid-modal"
import { HealthyHeartModal } from "@/components/patient/healthy-heart-modal"

export default function Home() {
  const { t } = useLanguage()
  const [view, setView] = React.useState<'intake' | 'analysis' | 'results'>('intake')
  
  // State for File and Processing
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
  const [analysisResult, setAnalysisResult] = React.useState<any>(null)
  const [isProcessing, setIsProcessing] = React.useState(false)

  // ✅ FIXED: Now matches the Backend API perfectly
  const handleIntakeSubmit = async (vitalsData: any) => {
    if (!selectedFile) {
      alert("Please upload an ECG or Lab Report first!")
      return
    }

    setIsProcessing(true) // Lock the submit button

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      
      // ✅ CRITICAL MATCH: The backend expects 'data', not 'symptoms'
      formData.append('data', JSON.stringify(vitalsData)) 

      // Switch to scanning view immediately
      setView('analysis') 

      // Send to Backend
      const response = await fetch('https://cardio-backend-ayaan.azurewebsites.net/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Server Error Detail:", errorText)
        throw new Error(`Server error: ${response.status}`)
      }

      const result = await response.json()
      console.log("✅ Backend Response:", result)
      
      // Save data and show dashboard
      setAnalysisResult(result)
      
      // Small delay to let the scanning animation finish smoothly
      setTimeout(() => {
        setView('results')
      }, 2000)

    } catch (error) {
      console.error("❌ Connection Failed:", error)
      alert("Connection Error. Is the backend running?")
      setView('intake') // Go back so they can try again
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="ml-80 flex-1 flex flex-col min-h-screen">
        <header className="h-14 border-b px-6 flex items-center justify-between bg-muted/20 backdrop-blur sticky top-0 z-10">
          <h1 className="font-semibold text-lg flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            {t('header.mission')}
          </h1>
          <div className="flex items-center gap-4">
            <HealthyHeartModal />
            <FirstAidModal />
            <div className="text-xs text-muted-foreground font-mono">{t('header.id')}: DOC-8821</div>
            <LanguageToggle />
            <ModeToggle />
          </div>
        </header>

        <div className="flex-1 p-6 space-y-8 container max-w-7xl mx-auto">
          {view === 'intake' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm ring-2 ring-primary/20">1</span>
                  <h2 className="text-xl font-semibold">Upload ECG Strip</h2>
                </div>
                <FileUploader onFileSelect={(f) => setSelectedFile(f)} />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm ring-2 ring-primary/20">2</span>
                  <h2 className="text-xl font-semibold">Clinical Presentation</h2>
                </div>
                {/* Pass the loading state here so the button spins */}
                <SymptomForm onSubmit={handleIntakeSubmit} isProcessing={isProcessing} />
              </div>
            </div>
          )}

          {view === 'analysis' && (
            <div className="h-[600px]">
              <ScanningView />
            </div>
          )}

          {view === 'results' && (
            // Pass the AI result to the dashboard
            <TriageDashboard 
                data={analysisResult?.analysis} 
                caseId={analysisResult?.case_id} 
            />
          )}
        </div>
      </main>
    </div>
  )
}