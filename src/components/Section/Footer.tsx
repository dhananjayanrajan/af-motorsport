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
            <footer className="w-full border-t-2 border-black-pure bg-black-pure p-8 flex flex-wrap gap-4">
                {links.map((c) => (
                    <button
                        key={c.id}
                        onClick={() => router.push(`/series/${c.slug}`)}
                        className="flex-1 min-w-[120px] bg-secondary-500 p-4 font-black uppercase text-black-pure border-2 border-black-pure hover:bg-white-pure transition-colors duration-100 outline-none focus:bg-white-pure active:bg-primary-500"
                    >
                        {c.basics?.identifiers?.abbreviation || 'VIEW'}
                    </button>
                ))}
            </footer>
        )
    }

    if (variant === 3) {
        return (
            <footer className="w-full border-t-2 border-black-pure flex">
                <div className="flex-1 p-8 bg-primary-500 border-r-2 border-black-pure">
                    <p className="font-black uppercase text-black-pure">Active Session</p>
                </div>
                <div className="w-24 bg-black-pure flex items-center justify-center group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <div className="w-6 h-6 border-t-2 border-l-2 border-white-pure rotate-45 group-hover:border-primary-500" />
                </div>
            </footer>
        )
    }

    return (
        <footer className="w-full border-t-2 border-black-pure bg-white-pure flex items-stretch h-16">
            <div className="w-1/2 bg-secondary-500 border-r-2 border-black-pure" />
            <div className="w-1/4 bg-primary-500 border-r-2 border-black-pure" />
            <div className="w-1/4 bg-black-pure" />
        </footer>
    )
}

export default SectionFooter