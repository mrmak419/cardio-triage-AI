"use client"

import * as React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Activity, AlertCircle, CheckCircle2, Siren, User, Wifi, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import useSWR from 'swr'
import { useLanguage } from "@/components/language-provider"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"

// ✅ Type Definition matching the Python Backend
interface Patient {
    id: string
    name: string
    status: 'critical' | 'elevated' | 'stable' | 'processing'
    arrivalTime: string
    symptoms: string[]
}

// ✅ Connect directly to FastAPI
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function Sidebar() {
    const { t } = useLanguage()
    
    // ✅ Point to Python Backend
    const { data: patients, error, isLoading } = useSWR<Patient[]>('https://cardio-backend-ayaan.azurewebsites.net/patients', fetcher, {
        refreshInterval: 2000, // Poll every 2 seconds for real-time feel
        revalidateOnFocus: true,
    })

    const isConnected = !error

    const sortPatients = (list: Patient[] = []) => {
        const priority: Record<string, number> = {
            'red': 3,       // Match backend color codes
            'critical': 3,
            'yellow': 2,
            'elevated': 2,
            'green': 1,
            'stable': 1,
        }

        return [...list].sort((a, b) => {
            const scoreA = priority[a.status] || 0
            const scoreB = priority[b.status] || 0
            return scoreB - scoreA // Descending order (Red first)
        })
    }

    const sortedPatients = React.useMemo(() => sortPatients(patients), [patients])

    return (
        <div className="w-80 h-screen border-r bg-sidebar border-sidebar-border fixed left-0 top-0 flex flex-col z-40 shadow-xl">
            {/* Header */}
            <div className="p-4 border-b border-sidebar-border flex flex-col gap-1 bg-sidebar-accent/5">
                <div className="flex items-center gap-2">
                    {isConnected ? (
                        <Activity className="h-5 w-5 text-primary animate-pulse" />
                    ) : (
                        <Wifi className="h-5 w-5 text-muted-foreground" />
                    )}
                    <h2 className="font-bold text-lg tracking-tight text-sidebar-foreground">{t('app.title')}</h2>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground uppercase">
                    <span>
                        {t('sidebar.status')}: <span className={isConnected ? "text-green-500" : "text-red-500"}>
                            {isConnected ? t('status.online') : t('status.offline')}
                        </span>
                    </span>
                    <span>{patients?.length || 0} Cases</span>
                </div>
            </div>

            <div className="p-3 border-b border-sidebar-border bg-sidebar-accent/10">
                <h3 className="text-xs font-semibold text-sidebar-foreground uppercase tracking-wider">
                    {t('live.feed')}
                </h3>
            </div>

            <ScrollArea className="flex-1 p-3">
                <div className="space-y-3">
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground space-y-2">
                            <Loader2 className="h-6 w-6 animate-spin" />
                            <span className="text-xs">Syncing Azure Database...</span>
                        </div>
                    )}

                    {error && (
                        <div className="p-3 rounded border border-destructive/20 bg-destructive/10 text-destructive text-xs text-center">
                            Connecting to Cloud...
                        </div>
                    )}

                    <LayoutGroup>
                        <AnimatePresence mode="popLayout">
                            {sortedPatients.map((patient) => (
                                <motion.div
                                    key={patient.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                >
                                    <PatientCard patient={patient} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </LayoutGroup>
                </div>
            </ScrollArea>
        </div>
    )
}

function PatientCard({ patient }: { patient: Patient }) {
    // Map backend colors (red/yellow/green) to UI classes
    const getStatusColor = (status: string) => {
        if (status.includes('red') || status.includes('critical')) return 'border-red-500/50 bg-red-500/10 text-red-500';
        if (status.includes('yellow') || status.includes('elevated')) return 'border-yellow-500/50 bg-yellow-500/10 text-yellow-500';
        if (status.includes('green') || status.includes('stable')) return 'border-green-500/50 bg-green-500/10 text-green-500';
        return 'border-sidebar-border bg-sidebar-accent/50 text-muted-foreground';
    }

    const getIcon = (status: string) => {
        if (status.includes('red') || status.includes('critical')) return <Siren className="h-3.5 w-3.5" />;
        if (status.includes('yellow') || status.includes('elevated')) return <AlertCircle className="h-3.5 w-3.5" />;
        if (status.includes('green') || status.includes('stable')) return <CheckCircle2 className="h-3.5 w-3.5" />;
        return <User className="h-3.5 w-3.5" />;
    }

    return (
        <div className={cn(
            "group relative flex flex-col gap-1.5 rounded-md border p-2.5 text-sm transition-all hover:bg-sidebar-accent cursor-pointer hover:shadow-lg hover:border-sidebar-ring/50",
            getStatusColor(patient.status).split(' ')[0]
        )}>
            <div className="flex items-center justify-between">
                <span className="font-semibold text-sidebar-foreground">{patient.name}</span>
                <span className="text-[10px] text-muted-foreground font-mono">{patient.arrivalTime}</span>
            </div>

            <div className="flex flex-wrap gap-1">
                {patient.symptoms.slice(0, 3).map(s => (
                    <Badge key={s} variant="outline" className="text-[9px] px-1 py-0 h-4 border-sidebar-border text-muted-foreground">
                        {s}
                    </Badge>
                ))}
            </div>

            <div className={cn(
                "flex items-center gap-1.5 text-[10px] font-bold uppercase mt-1 px-1.5 py-0.5 rounded w-fit",
                getStatusColor(patient.status)
            )}>
                {getIcon(patient.status)}
                {patient.status.toUpperCase()}
            </div>
        </div>
    )
}