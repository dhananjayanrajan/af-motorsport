"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface SectionCTAProps {
    label: string
    path?: string
    description?: string
    onClick?: () => void
    buttonBgColor?: string
    buttonTextColor?: string
    variant?: 1 | 2 | 3 | 4 | 5
    infoLabel?: string
    directoryLabel?: string
    proceedLabel?: string
}

const SectionCTA: React.FC<SectionCTAProps> = ({
    label,
    path,
    description,
    onClick,
    variant = 1,
    infoLabel = "DETAILS",
    directoryLabel = "PATH",
    proceedLabel = "CONTINUE"
}) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const textBase = "font-bold uppercase tracking-tight"

    const handleAction = async () => {
        if (isLoading) return

        setIsLoading(true)

        try {
            if (onClick) {
                await onClick()
            } else if (path) {
                router.push(path)
            }
        } catch (error) {
            setIsLoading(false)
        }
    }

    if (!path && !onClick) return null

    const LoadingOverlay = () => (
        <div className="absolute inset-0 bg-black-pure flex items-center justify-center z-50">
            <div className="flex gap-1">
                <div className="w-2 h-2 bg-white-pure animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-white-pure animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-white-pure animate-bounce" />
            </div>
        </div>
    )

    if (variant === 2) {
        return (
            <div className="w-full mt-12 bg-white-pure z-1 relative">
                <div className="flex items-center bg-black-pure px-4 py-2 w-fit border-t-2 border-l-2 border-r-2 border-black-pure z-1 relative">
                    <span className="text-[10px] font-bold text-white-pure z-1 relative">{directoryLabel}: {path}</span>
                </div>
                <button
                    onClick={handleAction}
                    disabled={isLoading}
                    className="w-full grid grid-cols-1 md:grid-cols-[1fr_200px] border-2 border-black-pure bg-white-pure group z-1 relative overflow-hidden cursor-pointer disabled:cursor-wait"
                >
                    {isLoading && <LoadingOverlay />}
                    <div className="absolute inset-0 bg-primary-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-1" />
                    <div className="p-8 text-left border-b-2 md:border-b-0 md:border-r-2 border-black-pure z-1 relative group-hover:bg-primary-500 transition-colors duration-500">
                        <h2 className={`${textBase} text-2xl text-black-pure mb-2 z-1 relative`}>{label}</h2>
                        {description && <p className="text-sm font-medium text-black-pure z-1 relative">{description}</p>}
                    </div>
                    <div className="flex items-center justify-center py-6 md:py-0 z-1 relative group-hover:bg-primary-500 transition-colors duration-500">
                        <span className={`${textBase} text-black-pure z-1 relative font-black`}>{proceedLabel}</span>
                    </div>
                </button>
            </div>
        )
    }

    if (variant === 3) {
        return (
            <div className="w-full mt-16 p-2 bg-black-pure z-1 relative">
                <button
                    onClick={handleAction}
                    disabled={isLoading}
                    className="w-full group border-2 border-white-pure bg-white-pure p-1 z-1 relative overflow-hidden cursor-pointer disabled:cursor-wait"
                >
                    {isLoading && <LoadingOverlay />}
                    <div className="absolute inset-0 bg-primary-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-1" />
                    <div className="border-2 border-black-pure p-8 flex flex-col md:flex-row items-center justify-between gap-6 z-1 relative">
                        <div className="text-left flex-1 z-1 relative">
                            <h2 className={`${textBase} text-2xl text-black-pure z-1 relative`}>{label}</h2>
                            <p className="text-sm font-medium text-black-pure z-1 relative">{description}</p>
                        </div>
                        <div className="bg-black-pure border-2 border-black-pure px-8 py-3 z-1 relative group-hover:scale-105 transition-transform duration-200">
                            <span className={`${textBase} text-white-pure z-1 relative`}>{proceedLabel}</span>
                        </div>
                    </div>
                </button>
            </div>
        )
    }

    if (variant === 4) {
        return (
            <button
                onClick={handleAction}
                disabled={isLoading}
                className="w-full mt-12 grid grid-cols-1 md:grid-cols-[250px_1fr] border-4 border-black-pure bg-white-pure group text-left z-1 relative overflow-hidden cursor-pointer disabled:cursor-wait active:scale-[0.99] transition-transform duration-100"
            >
                {isLoading && <LoadingOverlay />}
                <div className="absolute inset-0 bg-secondary-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out z-1" />
                <div className="bg-secondary-500 p-8 flex flex-col justify-between border-b-4 md:border-b-0 md:border-r-4 border-black-pure z-1 relative">
                    <span className="text-xs font-bold text-black-pure border-b-2 border-black-pure pb-1 z-1 relative">{infoLabel}</span>
                    <span className="text-xs font-bold text-black-pure mt-4 z-1 relative">{path}</span>
                </div>
                <div className="p-8 flex flex-col justify-between z-1 relative">
                    <div className="z-1 relative">
                        <h2 className={`${textBase} text-2xl text-black-pure mb-2 z-1 relative`}>{label}</h2>
                        <p className="text-sm font-medium text-black-pure z-1 relative">{description}</p>
                    </div>
                    <div className="mt-8 flex items-center gap-4 z-1 relative">
                        <div className="h-[2px] flex-1 bg-black-pure z-1 relative group-hover:bg-white-pure transition-colors" />
                        <span className={`${textBase} text-black-pure z-1 relative group-hover:translate-x-2 transition-transform`}>{proceedLabel}</span>
                    </div>
                </div>
            </button>
        )
    }

    if (variant === 5) {
        return (
            <button
                onClick={handleAction}
                disabled={isLoading}
                className="w-full mt-12 py-12 flex flex-col items-center bg-neutral-100 border-y-4 border-black-pure group z-1 relative overflow-hidden cursor-pointer disabled:cursor-wait"
            >
                {isLoading && <LoadingOverlay />}
                <div className="absolute inset-0 bg-primary-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-1" />
                <div className="text-center max-w-xl px-6 z-1 relative">
                    <h2 className={`${textBase} text-3xl mb-4 text-black-pure z-1 relative group-hover:tracking-widest transition-all duration-300`}>{label}</h2>
                    <p className="text-sm font-medium text-black-pure mb-8 z-1 relative">{description}</p>
                    <div className="inline-flex items-center gap-4 bg-black-pure px-10 py-4 z-1 relative group-hover:bg-white-pure transition-colors duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[4px_4px_0px_0px_var(--primary-500)]">
                        <span className={`${textBase} text-white-pure group-hover:text-black-pure z-1 relative`}>{proceedLabel}</span>
                    </div>
                </div>
            </button>
        )
    }

    return (
        <button
            onClick={handleAction}
            disabled={isLoading}
            className="w-full mt-12 border-4 border-black-pure bg-white-pure group flex flex-col md:flex-row items-stretch overflow-hidden z-1 relative cursor-pointer disabled:cursor-wait hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-200"
        >
            {isLoading && <LoadingOverlay />}
            <div className="absolute inset-0 bg-primary-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-1" />
            <div className="flex-1 p-8 text-left z-1 relative">
                <h2 className={`${textBase} text-3xl text-black-pure mb-2 z-1 relative`}>{label}</h2>
                <p className="text-sm font-medium text-black-pure z-1 relative">{description}</p>
            </div>
            <div className="bg-black-pure md:w-[250px] flex items-center justify-center p-6 z-1 relative group-hover:translate-x-2 transition-transform duration-300">
                <span className={`${textBase} text-white-pure z-1 relative`}>{proceedLabel}</span>
            </div>
        </button>
    )
}

export default SectionCTA