"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { HeartPulse, Phone, AlertTriangle, Pill, Activity } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function FirstAidModal() {
    const { t } = useLanguage()

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" className="gap-2 animate-pulse font-bold shadow-lg shadow-red-500/20">
                    <HeartPulse className="h-4 w-4" />
                    {t('guide.title')}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] border-l-4 border-l-red-500 bg-background/95 backdrop-blur">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-red-500">
                        <AlertTriangle className="h-5 w-5" />
                        {t('guide.title')}
                    </DialogTitle>
                    <DialogDescription>
                        Immediate actions for suspected cardiac events.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Protocol 1: Chest Pain */}
                    <div className="space-y-3 p-4 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20">
                        <h4 className="font-bold text-red-700 dark:text-red-400 flex items-center gap-2">
                            <HeartPulse className="h-4 w-4" />
                            {t('guide.chestpain')}
                        </h4>
                        <ul className="space-y-2 text-sm text-foreground/90">
                            <li className="flex items-start gap-2">
                                <Phone className="h-4 w-4 text-red-500 mt-0.5" />
                                <span className="font-semibold">{t('guide.action.ambulance')}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <Pill className="h-4 w-4 text-blue-500 mt-0.5" />
                                <span>{t('guide.action.aspirin')}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="h-4 w-4 text-center font-bold text-green-500">✓</span>
                                <span>{t('guide.action.calm')}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Protocol 2: CPR */}
                    {/* Protocol 2: CPR */}
                    <div className="space-y-3 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-100 dark:border-yellow-500/20">
                        <h4 className="font-bold text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
                            <Activity className="h-4 w-4" />
                            {t('guide.cpr')}
                        </h4>
                        <div className="space-y-3 px-1">
                            {/* Step 1 */}
                            <div className="flex gap-3 text-sm">
                                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600 dark:bg-red-900/50 dark:text-red-400">1</div>
                                <p className="font-medium text-foreground/90 pt-0.5">{t('guide.cpr.step1')}</p>
                            </div>
                            {/* Step 2 */}
                            <div className="flex gap-3 text-sm">
                                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600 dark:bg-red-900/50 dark:text-red-400">2</div>
                                <p className="font-medium text-foreground/90 pt-0.5">{t('guide.cpr.step2')}</p>
                            </div>
                            {/* Step 3 */}
                            <div className="flex gap-3 text-sm">
                                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600 dark:bg-red-900/50 dark:text-red-400">3</div>
                                <p className="font-medium text-foreground/90 pt-0.5">{t('guide.cpr.step3')}</p>
                            </div>
                            {/* Step 4 */}
                            <div className="flex gap-3 text-sm">
                                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600 dark:bg-red-900/50 dark:text-red-400">4</div>
                                <p className="font-medium text-foreground/90 pt-0.5">{t('guide.cpr.step4')}</p>
                            </div>
                            {/* Step 5 */}
                            <div className="flex gap-3 text-sm">
                                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600 dark:bg-red-900/50 dark:text-red-400">5</div>
                                <p className="font-medium text-foreground/90 pt-0.5">{t('guide.cpr.step5')}</p>
                            </div>

                            <div className="border-t border-yellow-200 dark:border-yellow-900 pt-2 mt-2 space-y-2">
                                <div className="flex gap-2 text-sm items-center">
                                    <span className="font-bold text-red-500 pl-1">!</span>
                                    <span className="text-muted-foreground italic text-xs">{t('guide.cpr.continue')}</span>
                                </div>
                                <div className="flex gap-2 text-sm items-center">
                                    <span className="font-bold text-blue-500 pl-1">⚡</span>
                                    <span className="font-medium">{t('guide.action.aed')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}


