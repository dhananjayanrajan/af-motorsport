"use client"
import Image from 'next/image'
import React, { useEffect } from 'react'

interface DetailStat {
    label: string
    val: string | number
    color: string
}

interface SectionSidebarProps {
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

const SectionSidebar: React.FC<SectionSidebarProps> = ({
    isOpen,
    onClose,
    title,
    description,
    imageUrl,
    idCode,
    stats,
    buttonLabel,
    onAction,
    infoLabel = "System Log"
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [isOpen])

    const buttonBase = "font-mono font-semibold uppercase tracking-wider transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary active:scale-95"

    return (
        <>
            <div
                className={`fixed inset-0 z-[110] bg-foreground/80 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />
            <aside className={`fixed top-0 right-0 z-[120] w-full md:w-[440px] h-full bg-card transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} shadow-2xl`}>
                <div className="flex flex-col h-full">
                    <div className="relative h-64 sm:h-72 shrink-0 overflow-hidden bg-foreground">
                        <Image
                            src={imageUrl || `https://picsum.photos/seed/sidebar/800/800`}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-105"
                            priority
                        />
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-10 h-10 sm:w-12 sm:h-12 bg-foreground/90 backdrop-blur-sm text-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground active:scale-95 transition-all duration-300 outline-none rounded-full"
                        >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="absolute bottom-4 left-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-mono font-semibold rounded-md">
                            {idCode || 'REF'}
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10">
                        <div className="mb-6 sm:mb-8">
                            <span className="text-xs sm:text-sm font-mono font-semibold text-secondary uppercase mb-2 block">
                                {infoLabel}
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-bold uppercase leading-tight text-foreground">
                                {title}
                            </h3>
                        </div>
                        <div className="mb-8 sm:mb-12">
                            <p className="text-sm sm:text-base font-mono leading-relaxed uppercase font-medium text-muted-foreground">
                                {description}
                            </p>
                        </div>
                        <div className="space-y-4 sm:space-y-6">
                            {stats.map((stat, i) => (
                                <div key={i} className="flex items-center justify-between border-b border-border pb-3 sm:pb-4 group hover:bg-accent/50 transition-colors duration-300 px-2">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className={`w-1.5 h-4 sm:w-2 sm:h-6 ${stat.color} rounded-sm`} />
                                        <span className="text-xs sm:text-sm font-mono font-semibold uppercase text-muted-foreground">
                                            {stat.label}
                                        </span>
                                    </div>
                                    <p className="text-lg sm:text-xl font-bold uppercase text-foreground">
                                        {stat.val}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="p-6 sm:p-8 bg-card border-t border-border shrink-0">
                        <button
                            onClick={onAction}
                            className={`${buttonBase} w-full h-14 sm:h-16 bg-foreground text-background hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground active:bg-secondary active:text-secondary-foreground rounded-md`}
                        >
                            {buttonLabel}
                        </button>
                    </div>
                    <div className="h-2 w-full flex shrink-0">
                        <div className="flex-1 bg-primary" />
                        <div className="flex-1 bg-secondary" />
                        <div className="flex-1 bg-foreground" />
                    </div>
                </div>
            </aside>
        </>
    )
}

export default SectionSidebar
