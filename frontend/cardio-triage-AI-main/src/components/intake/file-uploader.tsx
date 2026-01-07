"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { UploadCloud, FileHeart, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/language-provider"

interface FileUploaderProps {
    onFileSelect: (file: File) => void
}

export function FileUploader({ onFileSelect }: FileUploaderProps) {
    const { t } = useLanguage()
    const [dragActive, setDragActive] = React.useState(false)
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0])
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0])
        }
    }

    // ✅ FIXED: No more setTimeout, no more fake text. Just Real Logic.
    const handleFile = (file: File) => {
        setSelectedFile(file)
        onFileSelect(file) // Immediately tell the parent page
    }

    const removeFile = (e: React.MouseEvent) => {
        e.stopPropagation()
        setSelectedFile(null)
        if (inputRef.current) {
            inputRef.current.value = ""
        }
        // Tell parent the file is gone (optional, depending on logic)
    }

    return (
        <div className="w-full space-y-4">
            <div
                className={cn(
                    "relative h-64 w-full rounded-xl border-2 border-dashed transition-all duration-200 ease-in-out flex flex-col items-center justify-center p-6 text-center cursor-pointer overflow-hidden group",
                    dragActive
                        ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(var(--primary),0.3)]"
                        : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/5",
                    selectedFile ? "border-green-500/50 bg-green-500/5" : ""
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
            >
                <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={handleChange}
                />

                <AnimatePresence mode="wait">
                    {!selectedFile ? (
                        <motion.div
                            key="prompt"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-col items-center gap-4 pointer-events-none"
                        >
                            <div className="p-4 rounded-full bg-background border shadow-sm group-hover:scale-110 transition-transform duration-300">
                                <UploadCloud className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <div className="space-y-1">
                                <p className="text-lg font-medium text-foreground">
                                    {t('upload.drop')}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {t('upload.supports')}
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="file"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="relative flex flex-col items-center gap-4 w-full max-w-xs"
                        >
                            <div className="absolute top-0 right-0 -mt-10 -mr-10">
                                <button onClick={removeFile} className="p-2 hover:bg-secondary rounded-full transition-colors">
                                    <X className="h-5 w-5 text-muted-foreground" />
                                </button>
                            </div>

                            <div className="p-4 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                                <FileHeart className="h-10 w-10" />
                            </div>
                            <div className="space-y-1 text-center w-full">
                                <p className="text-sm font-medium text-foreground truncate px-4">
                                    {selectedFile.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                            
                            <div className="text-xs text-green-500 font-medium flex items-center gap-1">
                                {t('upload.ready')}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {dragActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-primary/10 backdrop-blur-[2px] flex items-center justify-center font-bold text-xl text-primary border-4 border-primary rounded-xl"
                    >
                        {t('upload.dropzone')}
                    </motion.div>
                )}
            </div>
        </div>
    )
}