"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle } from "lucide-react"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
    complaint: z.string().min(5, {
        message: "Chief complaint must be at least 5 characters.",
    }),
    symptoms: z.array(z.string()).refine((value) => value.length > 0, {
        message: "Select at least one symptom.",
    }),
    hr: z.coerce.number()
        .min(30, { message: "HR too low (<30)" })
        .max(300, { message: "HR too high (>300)" }),
    bp: z.string().regex(/^\d{2,3}\/\d{2,3}$/, {
        message: "Format must be Systolic/Diastolic (e.g., 120/80)",
    }),
    spo2: z.coerce.number()
        .min(50, { message: "SpO2 too low (<50%)" })
        .max(100, { message: "SpO2 max is 100%" }),
})

interface SymptomFormProps {
    onSubmit: (data: z.infer<typeof formSchema>) => void
    isProcessing: boolean
}

import { useLanguage } from "@/components/language-provider"

export function SymptomForm({ onSubmit, isProcessing }: SymptomFormProps) {
    const { t } = useLanguage()
    const commonSymptoms = [
        "Chest Pain", "Shortness of Breath", "Palpitations",
        "Dizziness", "Nausea", "Diaphoresis (Sweating)",
        "Left Arm Pain", "Jaw Pain"
    ]

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            complaint: "",
            symptoms: [],
            hr: 0,
            bp: "",
            spo2: 0,
        },
    })

    function handleSubmit(values: z.infer<typeof formSchema>) {
        onSubmit(values)
    }

    return (
        <Card className="w-full h-full border-none shadow-none bg-transparent">
            <CardHeader className="px-0 pt-0">
                <CardTitle>{t('intake.form')}</CardTitle>
                <CardDescription>{t('intake.desc')}</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">

                        <FormField
                            control={form.control}
                            name="complaint"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t('chief.complaint')}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t('intake.placeholder.comp')} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="symptoms"
                            render={() => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel className="text-base">{t('intake.symptoms.label')}</FormLabel>
                                        <FormDescription>
                                            {t('intake.symptoms.desc')}
                                        </FormDescription>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {commonSymptoms.map((symptom) => (
                                            <FormField
                                                key={symptom}
                                                control={form.control}
                                                name="symptoms"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem
                                                            key={symptom}
                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(symptom)}
                                                                    onCheckedChange={(checked) => {
                                                                        return checked
                                                                            ? field.onChange([...field.value, symptom])
                                                                            : field.onChange(
                                                                                field.value?.filter(
                                                                                    (value) => value !== symptom
                                                                                )
                                                                            )
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                {t(`symptom.${symptom}`)}
                                                            </FormLabel>
                                                        </FormItem>
                                                    )
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="hr"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('intake.hr')}</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input type="number" placeholder="--" {...field} className="pr-8" />
                                                <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">bpm</span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="bp"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('intake.bp')}</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input placeholder="120/80" {...field} className="pr-8" />
                                                <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">mmHg</span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="spo2"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('intake.spo2')}</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input type="number" placeholder="--" {...field} className="pr-8" />
                                                <span className="absolute right-3 top-2.5 text-xs text-muted-foreground">%</span>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                            {isProcessing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {t('intake.analyzing')}
                                </>
                            ) : (
                                t('run.analysis')
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
