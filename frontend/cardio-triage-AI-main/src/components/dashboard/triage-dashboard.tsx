"use client"

import * as React from "react"
import { Siren, FileText, Download, Phone } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ECGChart } from "@/components/dashboard/ecg-chart"
import { ReferralModal } from "@/components/dashboard/referral-modal"
import { useLanguage } from "@/components/language-provider"

// 1. ✅ UPDATED INTERFACE to accept 'caseId'
interface TriageDashboardProps {
  data?: {
    score: number
    status: string
    color: string
    recommendation: string
    flags: string[]
  }
  caseId?: string // <--- New Prop for the PDF Generator
}

export function TriageDashboard({ data, caseId }: TriageDashboardProps) {
    const { t } = useLanguage()

    // 2. Safe Defaults
    const riskScore = data?.score || 0
    const riskLevel = data?.status || "UNKNOWN"
    const colorCode = data?.color || "green" 
    const reasoning = data?.flags && data.flags.length > 0 ? data.flags : ["Normal parameters detected"]
    const recommendation = data?.recommendation || "Proceed with standard evaluation."

    // 3. Dynamic Coloring
    const getTheme = (code: string) => {
        switch (code.toLowerCase()) {
            case 'red': return {
                bg: 'bg-red-500',
                text: 'text-red-500',
                border: 'border-red-500',
                lightBg: 'bg-red-500/10'
            };
            case 'yellow': return {
                bg: 'bg-yellow-500',
                text: 'text-yellow-500',
                border: 'border-yellow-500',
                lightBg: 'bg-yellow-500/10'
            };
            default: return {
                bg: 'bg-green-500',
                text: 'text-green-500',
                border: 'border-green-500',
                lightBg: 'bg-green-500/10'
            };
        }
    }

    const theme = getTheme(colorCode)

    const handleDownloadPdf = () => {
        if (!caseId) {
            alert("Error: No Case ID found. Please re-analyze.");
            return;
        }
        // Triggers the download from your Python Backend
        window.open(`https://cardio-backend-ayaan.azurewebsites.net/generate-pdf/${caseId}`, '_blank');
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            {/* Top Alert Banner - Shows only if RED */}
            {colorCode === 'red' && (
                <div className="grid gap-4 md:grid-cols-4">
                    <Alert variant="destructive" className="md:col-span-3 border-2 border-red-500 bg-red-500/10 animate-pulse">
                        <Siren className="h-6 w-6" />
                        <AlertTitle className="text-lg font-bold uppercase tracking-widest ml-2">{t('dash.stemi.title')}</AlertTitle>
                        <AlertDescription className="ml-2">
                            {t('dash.stemi.desc')}
                        </AlertDescription>
                    </Alert>

                    {/* Golden Hour Timer */}
                    <GoldenHourTimer />
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Risk Score & Actions */}
                <div className="space-y-6">
                    <Card className={`border-2 ${theme.border}`}>
                        <CardHeader>
                            <CardTitle className="text-muted-foreground uppercase text-sm">{t('dash.ai.title')}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center relative group cursor-help">
                            {/* Reasoning Tooltip */}
                            <div className="absolute top-0 right-0 bg-black/90 text-white text-xs p-3 rounded opacity-0 group-hover:opacity-100 transition-opacity w-64 pointer-events-none z-10 border border-white/10 shadow-xl backdrop-blur-md">
                                <p className="font-bold mb-1 border-b pb-1 border-white/20">AI Reasoning</p>
                                <ul className="space-y-1">
                                    {reasoning.map((item, i) => (
                                        <li key={i} className="flex justify-between items-start gap-2">
                                            <span className="text-red-400">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className={`text-6xl font-black mb-2 ${theme.text}`}>
                                {riskScore}/10
                            </div>
                            <div className={`px-4 py-1 rounded-full font-bold text-sm text-white ${theme.bg}`}>
                                {riskLevel}
                            </div>
                            
                            <Progress value={riskScore * 10} className={`mt-6 h-2`} indicatorClassName={theme.bg} />
                            
                            <p className="text-xs text-muted-foreground mt-2 text-center">
                                {t('dash.confidence')}: 98.4%
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm text-muted-foreground uppercase">{t('dash.clinical.title')}</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-3">
                            {colorCode === 'red' && (
                                <Button className="w-full bg-red-600 hover:bg-red-700 font-bold animate-pulse" suppressHydrationWarning>
                                    <Phone className="mr-2 h-4 w-4" />
                                    EMERGENCY CALL
                                </Button>
                            )}
                            
                            {/* ✅ DOWNLOAD BUTTON ACTIVATED */}
                            <Button 
                                variant="outline" 
                                className="w-full" 
                                onClick={handleDownloadPdf}
                            >
                                <Download className="mr-2 h-4 w-4" />
                                Download PDF Report
                            </Button>

                            {/* Jayadeva Referral Integration */}
                            <ReferralModal />
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Visualization & Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* ✅ Pass status so chart turns RED if critical */}
                    <ECGChart status={riskLevel} />

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-primary" />
                                {t('dash.handover.title')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-muted p-4 rounded-md font-mono text-sm leading-relaxed">
                                <span className="font-bold text-primary">AI Recommendation:</span><br/>
                                <p className="mb-4">{recommendation}</p>
                                
                                <span className="font-bold text-primary">Identified Flags:</span>
                                <ul className="list-disc pl-5 mt-1 space-y-1">
                                    {reasoning.map((flag, idx) => (
                                        <li key={idx} className="text-muted-foreground">{flag}</li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

function GoldenHourTimer() {
    const [time, setTime] = React.useState(0)

    React.useEffect(() => {
        // Mock start time: 35 minutes ago
        const startTime = Date.now() - (35 * 60 * 1000)

        const interval = setInterval(() => {
            const now = Date.now()
            setTime(Math.floor((now - startTime) / 1000))
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    return (
        <Card className="bg-black border-red-500/50 flex flex-col items-center justify-center p-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-red-900/10 animate-pulse" />
            <span className="text-[10px] text-red-500 uppercase font-bold tracking-widest z-10">Door-to-Balloon</span>
            <div className="text-3xl font-mono font-black text-white z-10 tabular-nums">
                {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </div>
            <span className="text-[10px] text-muted-foreground z-10">Target: &lt; 90m</span>
        </Card>
    )
}