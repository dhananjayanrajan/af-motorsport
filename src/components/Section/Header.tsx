"use client"
import { Championship } from '@/payload-types'
import React from 'react'

interface SectionHeaderProps {
    title: string
    subtitle: string
    variant?: 1 | 2 | 3
    championships?: Championship[]
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, variant = 1, championships = [] }) => {
    const total = championships?.length ?? 0
    const heading = "text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-normal"

    if (variant === 2) {
        return (
            <header className="w-full bg-foreground border-b border-border flex flex-col md:flex-row items-stretch rounded-t-lg overflow-hidden">
                <div className="p-8 border-b md:border-b-0 md:border-r border-white/20 bg-primary flex-1">
                    <h1 className={`${heading} text-primary-foreground`}>{title || 'Directory'}</h1>
                </div>
                <div className="p-8 flex-1 bg-background">
                    <h2 className={`${heading} text-foreground opacity-60`}>{subtitle || 'Sub-Directory'}</h2>
                </div>
                <div className="w-24 bg-secondary flex items-center justify-center border-l border-border font-semibold text-2xl text-secondary-foreground">
                    {total}
                </div>
            </header>
        )
    }

    if (variant === 3) {
        return (
            <header className="w-full border-b border-border bg-background grid grid-cols-1 md:grid-cols-4 rounded-t-lg overflow-hidden">
                <div className="col-span-1 md:col-span-3 p-8 border-b md:border-b-0 md:border-r border-border">
                    <h1 className={`${heading} text-foreground`}>{title || 'Primary View'}</h1>
                </div>
                <div className="p-8 bg-primary flex items-center justify-between">
                    <span className="font-mono font-semibold text-primary-foreground">Total</span>
                    <span className="font-semibold text-2xl text-primary-foreground">{total}</span>
                </div>
            </header>
        )
    }

    return (
        <header className="w-full bg-background border-b border-border flex items-stretch rounded-t-lg overflow-hidden">
            <div className="w-16 md:w-24 bg-primary border-r border-border flex items-center justify-center font-semibold text-primary-foreground">
                {total}
            </div>
            <div className="p-8 flex-1">
                <h1 className={`${heading} text-foreground`}>{title || 'Main Section'}</h1>
                <p className="font-mono text-base font-semibold text-secondary mt-2">{subtitle || 'Supporting Detail'}</p>
            </div>
        </header>
    )
}

export default SectionHeader