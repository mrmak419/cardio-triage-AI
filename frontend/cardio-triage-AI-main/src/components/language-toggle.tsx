"use client"

import * as React from "react"
import { MonitorSmartphone, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage, Language } from "@/components/language-provider"

export function LanguageToggle() {
    const { setLanguage, language } = useLanguage()

    const labels = {
        en: "English",
        kn: "ಕನ್ನಡ",
        hi: "हिंदी"
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <Globe className="h-4 w-4" />
                    <span className="hidden md:inline-block">{labels[language]}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("en")}>
                    English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("kn")}>
                    ಕನ್ನಡ (Kannada)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("hi")}>
                    हिंदी (Hindi)
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
