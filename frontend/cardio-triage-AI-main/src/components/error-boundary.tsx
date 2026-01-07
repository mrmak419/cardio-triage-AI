"use client"

import * as React from "react"
import { AlertTriangle, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ErrorBoundaryProps {
    children: React.ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
    error: Error | null
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo)
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null })
        window.location.reload()
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 text-center space-y-4">
                    <div className="p-4 rounded-full bg-red-500/10 text-red-500 animate-pulse">
                        <AlertTriangle className="h-12 w-12" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">System Critical Failure</h1>
                    <p className="text-muted-foreground max-w-md">
                        The application encountered an unexpected error.
                        <br />
                        <span className="text-xs font-mono bg-muted p-1 rounded mt-2 inline-block">
                            {this.state.error?.message || "Unknown Error"}
                        </span>
                    </p>
                    <div className="pt-4">
                        <Button variant="default" size="lg" onClick={this.handleReset} className="gap-2">
                            <RefreshCcw className="h-4 w-4" />
                            Reboot System
                        </Button>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}
