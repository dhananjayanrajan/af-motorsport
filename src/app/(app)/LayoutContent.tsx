"use client"

import LoadingSection from '@/components/Section/Blocks/LoadingSection'
import { useEffect, useState } from 'react'

export default function LayoutContent({ children }: { children: React.ReactNode }) {
    const [isReady, setIsReady] = useState(false)
    const [shouldShowLoader, setShouldShowLoader] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const sessionLoaded = sessionStorage.getItem('page-initial-loaded')

        if (sessionLoaded) {
            setIsReady(true)
            setShouldShowLoader(false)
        } else {
            setShouldShowLoader(true)
        }
    }, [])

    const handleComplete = () => {
        sessionStorage.setItem('page-initial-loaded', 'true')
        setIsReady(true)
    }

    if (!mounted) {
        return (
            <div style={{ opacity: 0 }}>
                {children}
            </div>
        )
    }

    return (
        <>
            {shouldShowLoader && (
                <LoadingSection onComplete={handleComplete} />
            )}
            <div
                style={{
                    opacity: isReady ? 1 : 0,
                    visibility: isReady ? 'visible' : 'hidden',
                    transition: 'opacity 800ms ease-in-out',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh'
                }}
            >
                {children}
            </div>
        </>
    )
}