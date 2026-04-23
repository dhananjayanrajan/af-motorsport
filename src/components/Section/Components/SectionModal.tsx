"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'

interface DetailStat {
    label: string
    val: string | number
    color: string
}

interface SectionModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    description: string
    imageUrl: string
    idCode: string
    stats: DetailStat[]
    buttonLabel: string
    onAction?: () => void
    infoLabel?: string
}

const SectionModal: React.FC<SectionModalProps> = ({
    isOpen,
    onClose,
    title,
    description,
    imageUrl,
    idCode,
    stats,
    buttonLabel,
    onAction,
    infoLabel = "Core Data"
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [isOpen])

    if (!isOpen) return null

    const buttonBase = "font-mono font-semibold uppercase tracking-wider transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95"

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-12 overflow-hidden animate-in fade-in duration-300">
            <div 
                className="absolute inset-0 bg-foreground/80 backdrop-blur-sm transition-opacity duration-300" 
                onClick={onClose} 
            />
            <div className="relative w-full max-w-6xl h-full max-h-[700px] bg-card flex flex-col md:flex-row overflow-hidden border border-foreground shadow-2xl rounded-lg animate-in zoom-in-95 duration-300">
                <div className="relative w-full md:w-5/12 h-48 md:h-full bg-primary border-b md:border-b-0 md:border-r border-foreground overflow-hidden shrink-0">
                    <Image
                        src={imageUrl || `https://picsum.photos/seed/modal/1200/1200`}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        priority
                    />
                    <div className="absolute bottom-4 left-4 bg-foreground/90 backdrop-blur-sm text-background px-4 sm:px-6 py-2 sm:py-3 font-mono text-xs sm:text-sm font-semibold uppercase rounded-md">
                        {idCode} // Origin Stamp
                    </div>
                </div>
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex items-stretch border-b border-foreground h-14 sm:h-16 shrink-0">
                        <div className="flex-1 flex items-center px-6 sm:px-8 bg-secondary">
                            <span className="font-mono text-xs sm:text-sm font-semibold uppercase text-secondary-foreground">
                                {infoLabel}
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-14 sm:w-16 h-full flex items-center justify-center bg-foreground text-background hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground active:scale-95 transition-all duration-300 outline-none border-l border-foreground"
                        >
                            <span className="font-semibold text-sm uppercase">X</span>
                        </button>
                    </div>
                    <div className="flex-1 p-6 sm:p-8 md:p-12 flex flex-col overflow-hidden">
                        <div className="mb-6">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-foreground leading-none mb-4">
                                {title}
                            </h3>
                            <div className="p-4 bg-background border border-border rounded-md">
                                <p className="text-xs sm:text-sm font-mono leading-tight uppercase font-semibold text-muted-foreground line-clamp-3">
                                    {description}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-px bg-foreground border border-foreground rounded-md mb-6 overflow-hidden">
                            {stats.map((stat, i) => (
                                <div key={i} className="bg-card p-3 sm:p-4 flex flex-col gap-2 group hover:bg-accent/50 transition-colors duration-300">
                                    <span className="text-xs sm:text-sm font-mono font-semibold uppercase text-muted-foreground">
                                        {stat.label}
                                    </span>
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className={`w-2 h-2 sm:w-3 sm:h-3 ${stat.color} border border-foreground rounded-sm`} />
                                        <p className="text-sm sm:text-base font-bold uppercase text-foreground">
                                            {stat.val}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-auto flex gap-px bg-foreground border border-foreground rounded-md overflow-hidden shrink-0">
                            <button
                                onClick={onAction}
                                className={`${buttonBase} flex-1 h-14 sm:h-16 bg-primary text-primary-foreground hover:bg-foreground hover:text-background focus:bg-foreground focus:text-background focus:ring-primary active:bg-secondary active:text-secondary-foreground`}
                            >
                                {buttonLabel}
                            </button>
                            <div className="w-14 sm:w-16 h-14 sm:h-16 bg-background flex items-center justify-center">
                                <div className="w-5 h-5 sm:w-6 sm:h-6 border border-foreground flex items-center justify-center rounded-full">
                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-foreground animate-pulse rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-2 w-full flex shrink-0">
                        <div className="flex-1 bg-primary" />
                        <div className="flex-1 bg-secondary" />
                        <div className="flex-1 bg-foreground" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SectionModal
