"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Activity, BrainCircuit, HeartPulse, ScanLine } from "lucide-react"

import { useLanguage } from "@/components/language-provider"

export function ScanningView() {
    const { t } = useLanguage()
    const [step, setStep] = React.useState(0)

    const steps = [
        t('scan.step1'),
        t('scan.step2'),
        t('scan.step3'),
        t('scan.step4')
    ]

    React.useEffect(() => {
        const interval = setInterval(() => {
            setStep(prev => (prev < steps.length - 1 ? prev + 1 : prev))
        }, 800)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="h-full flex flex-col items-center justify-center relative overflow-hidden bg-black/20 rounded-xl border border-white/5">
            {/* Background Grid Animation */}
            <div className="absolute inset-0 z-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
                <motion.div
                    className="absolute inset-0 bg-primary/10"
                    initial={{ y: "-100%" }}
                    animate={{ y: "100%" }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
            </div>

            <div className="z-10 flex flex-col items-center gap-8">
                <div className="relative">
                    {/* Central Pulse */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="relative z-10 p-6 rounded-full bg-primary/10 border-2 border-primary"
                    >
                        <BrainCircuit className="h-12 w-12 text-primary" />
                    </motion.div>

                    {/* Orbital Rings */}
                    <motion.div
                        className="absolute inset-0 -m-4 border border-dashed border-primary/30 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute inset-0 -m-8 border border-primary/20 rounded-full"
                        animate={{ rotate: -360, scale: [1, 1.05, 1] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    />
                </div>

                <div className="space-y-2 text-center">
                    <h2 className="text-2xl font-bold tracking-widest uppercase flex items-center gap-2">
                        <ScanLine className="h-6 w-6 animate-pulse text-primary" />
                        {t('scan.title')}
                    </h2>
                    <div className="h-6 overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={step}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                className="text-primary/70 font-mono"
                            >
                                {steps[step]}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Helper for AnimatePresence import which was missed in above block logic if used directly
import { AnimatePresence } from "framer-motion"
