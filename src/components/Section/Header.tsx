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
    const heading = "text-xl md:text-3xl font-black uppercase tracking-normal"

    if (variant === 2) {
        return (
            <header className="w-full bg-black-pure border-b-2 border-black-pure flex flex-col md:flex-row items-stretch">
                <div className="p-8 border-b-2 md:border-b-0 md:border-r-2 border-white-pure/20 bg-primary-500 flex-1">
                    <h1 className={`${heading} text-black-pure`}>{title || 'DIRECTORY'}</h1>
                </div>
                <div className="p-8 flex-1 bg-white-pure">
                    <h2 className={`${heading} text-black-pure opacity-40`}>{subtitle || 'SUB-DIRECTORY'}</h2>
                </div>
                <div className="w-24 bg-secondary-500 flex items-center justify-center border-l-2 border-black-pure font-black text-2xl text-black-pure">
                    {total}
                </div>
            </header>
        )
    }

    if (variant === 3) {
        return (
            <header className="w-full border-b-2 border-black-pure bg-white-pure grid grid-cols-1 md:grid-cols-4">
                <div className="col-span-1 md:col-span-3 p-8 border-b-2 md:border-b-0 md:border-r-2 border-black-pure">
                    <h1 className={`${heading} text-black-pure`}>{title || 'PRIMARY VIEW'}</h1>
                </div>
                <div className="p-8 bg-primary-500 flex items-center justify-between">
                    <span className="font-mono font-black text-black-pure">TOTAL</span>
                    <span className="font-black text-2xl text-black-pure">{total}</span>
                </div>
            </header>
        )
    }

    return (
        <header className="w-full bg-white-pure border-b-2 border-black-pure flex items-stretch">
            <div className="w-16 md:w-24 bg-primary-500 border-r-2 border-black-pure flex items-center justify-center font-black text-black-pure">
                {total}
            </div>
            <div className="p-8 flex-1">
                <h1 className={`${heading} text-black-pure`}>{title || 'MAIN SECTION'}</h1>
                <p className="font-mono text-sm font-black text-secondary-500 mt-2">{subtitle || 'SUPPORTING DETAIL'}</p>
            </div>
        </header>
    )
}

export default SectionHeader