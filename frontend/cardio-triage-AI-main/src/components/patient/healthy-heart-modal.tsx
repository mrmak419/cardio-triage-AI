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
import { Heart, Apple, Footprints, Moon, Activity } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function HealthyHeartModal() {
    const { t } = useLanguage()

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 text-green-600 border-green-200 hover:bg-green-50 dark:hover:bg-green-900/20" suppressHydrationWarning>
                    <Heart className="h-4 w-4 fill-green-100" />
                    <span className="hidden md:inline">{t('health.title')}</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] border-l-4 border-l-green-500">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-green-600">
                        <Heart className="h-5 w-5 fill-green-500" />
                        {t('health.title')}
                    </DialogTitle>
                    <DialogDescription>
                        Simple, zero-cost changes for a longer life.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Diet */}
                    <div className="flex gap-4 items-start p-4 rounded-lg bg-green-50 dark:bg-green-500/10">
                        <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-full shrink-0">
                            <Apple className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-foreground">{t('health.diet.title')}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                                {t('health.diet.desc')}
                            </p>
                        </div>
                    </div>

                    {/* Exercise */}
                    <div className="flex gap-4 items-start p-4 rounded-lg bg-blue-50 dark:bg-blue-500/10">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-full shrink-0">
                            <Footprints className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-foreground">{t('health.exercise.title')}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                                {t('health.exercise.desc')}
                            </p>
                        </div>
                    </div>

                    {/* Vitals */}
                    <div className="flex gap-4 items-start p-4 rounded-lg bg-orange-50 dark:bg-orange-500/10">
                        <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-full shrink-0">
                            <Activity className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-foreground">{t('health.vitals.title')}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                                {t('health.vitals.desc')}
                            </p>
                        </div>
                    </div>

                    {/* Lifestyle */}
                    <div className="flex gap-4 items-start p-4 rounded-lg bg-purple-50 dark:bg-purple-500/10">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-full shrink-0">
                            <Moon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <h4 className="font-bold text-foreground">{t('health.lifestyle.title')}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                                {t('health.lifestyle.desc')}
                            </p>
                        </div>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    )
}
