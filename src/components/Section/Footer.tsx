"use client"
import { Championship } from '@/payload-types'
import { useRouter } from 'next/navigation'
import React from 'react'

interface SectionFooterProps {
    variant?: 1 | 2 | 3
    championships?: Championship[]
}

const SectionFooter: React.FC<SectionFooterProps> = ({ variant = 1, championships = [] }) => {
    const router = useRouter()
    const links = championships?.slice(0, 3) ?? []

    if (variant === 2) {
        return (
            <footer className="w-full border-t border-border bg-foreground p-8 flex flex-wrap gap-4 rounded-t-lg">
                {links.map((c) => (
                    <button
                        key={c.id}
                        onClick={() => router.push(`/series/${c.slug}`)}
                        className="flex-1 min-w-[120px] bg-secondary p-4 font-semibold uppercase text-secondary-foreground border border-secondary hover:bg-background hover:text-foreground transition-colors duration-300 outline-none focus:bg-background active:bg-primary rounded-md"
                    >
                        {c.basics?.identifiers?.abbreviation || 'View'}
                    </button>
                ))}
            </footer>
        )
    }

    if (variant === 3) {
        return (
            <footer className="w-full border-t border-border flex rounded-t-lg overflow-hidden">
                <div className="flex-1 p-8 bg-primary border-r border-border">
                    <p className="font-semibold uppercase text-primary-foreground">Active Session</p>
                </div>
                <div
                    className="w-24 bg-foreground flex items-center justify-center group cursor-pointer"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <div className="w-6 h-6 border-t-2 border-l-2 border-background rotate-45 group-hover:border-primary transition-colors" />
                </div>
            </footer>
        )
    }

    return (
        <footer className="w-full border-t border-border bg-background flex items-stretch h-16 rounded-t-lg overflow-hidden">
            <div className="w-1/2 bg-secondary border-r border-border" />
            <div className="w-1/4 bg-primary border-r border-border" />
            <div className="w-1/4 bg-foreground" />
        </footer>
    )
}

export default SectionFooter