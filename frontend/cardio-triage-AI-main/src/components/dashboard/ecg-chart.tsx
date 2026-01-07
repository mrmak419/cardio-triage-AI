"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Zap } from "lucide-react"

// Accept 'status' prop to change color dynamically
export function ECGChart({ status = "stable" }: { status?: string }) {
    
    // Determine visuals based on status
    const isCritical = status.toLowerCase().includes("red") || status.toLowerCase().includes("critical")
    const colorClass = isCritical ? "stroke-red-500" : "stroke-green-500"
    const textClass = isCritical ? "text-red-500" : "text-green-500"
    const shadowClass = isCritical ? "shadow-[0_0_15px_rgba(239,68,68,0.5)]" : "shadow-[0_0_15px_rgba(34,197,94,0.5)]"
    const bgBorder = isCritical ? "border-red-500/30" : "border-green-500/30"

    // Simulate different stats based on risk
    const bpm = isCritical ? "145" : "88"
    const pr = isCritical ? "0.04" : "0.08"
    const qrs = isCritical ? "0.12" : "0.09"

    return (
        <Card className={`col-span-2 bg-black overflow-hidden border-2 ${bgBorder} transition-colors duration-500`}>
            <CardHeader className="pb-2 border-b border-white/10 bg-white/5">
                <CardTitle className="text-xs font-mono uppercase tracking-widest text-muted-foreground flex justify-between items-center">
                    <span className="flex items-center gap-2">
                        <Activity className={`h-4 w-4 ${textClass}`} />
                        Lead II Telemetry
                    </span>
                    <div className="flex items-center gap-2">
                        <span className={`h-2 w-2 rounded-full animate-pulse ${isCritical ? "bg-red-500" : "bg-green-500"}`} />
                        <span className="text-white font-bold">LIVE</span>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 relative">
                
                {/* 1. The Monitor Screen Area */}
                <div className="relative h-[200px] flex items-center justify-center bg-black/50 overflow-hidden">
                    
                    {/* Grid Background (Medical Look) */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none" 
                        style={{ 
                        backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`, 
                        backgroundSize: '20px 20px' 
                        }} 
                    />

                    {/* The Animated Line (SVG) */}
                    <div className="absolute inset-0 flex items-center">
                        <svg 
                            viewBox="0 0 500 100" 
                            className={`w-full h-full drop-shadow-md ${shadowClass}`}
                            preserveAspectRatio="none"
                        >
                            {/* This path draws 4 heartbeats */}
                            <path
                                d="M0,50 L20,50 L30,50 L35,45 L40,55 L45,50 L60,50 L65,20 L70,80 L75,50 L90,50 L100,50 
                                   M100,50 L120,50 L130,50 L135,45 L140,55 L145,50 L160,50 L165,20 L170,80 L175,50 L190,50 L200,50
                                   M200,50 L220,50 L230,50 L235,45 L240,55 L245,50 L260,50 L265,20 L270,80 L275,50 L290,50 L300,50
                                   M300,50 L320,50 L330,50 L335,45 L340,55 L345,50 L360,50 L365,20 L370,80 L375,50 L390,50 L400,50"
                                fill="none"
                                strokeWidth="2"
                                className={`${colorClass} animate-ecg-slide`} 
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    {/* Gradient Overlay for "Scanning" effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/90 z-10" />
                </div>

                {/* 2. The Stats Footer */}
                <div className="grid grid-cols-4 gap-4 p-4 text-center text-xs font-mono text-muted-foreground bg-white/5 border-t border-white/10">
                    <div className={textClass}>
                        <span className="block text-2xl font-black">{bpm}</span>
                        BPM
                    </div>
                    <div>
                        <span className="block text-lg font-bold text-white">{pr}</span>
                        PR INT
                    </div>
                    <div>
                        <span className="block text-lg font-bold text-white">{qrs}</span>
                        QRS DUR
                    </div>
                    <div>
                        <span className="block text-lg font-bold text-white">0.42</span>
                        QTc
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}