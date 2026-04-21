'use client'

import React from 'react'
import SectionScroller from './Scroller'

interface PullQuoteProps {
    id: string
    title: string
    quote: string
    attribution?: string
    role?: string
    variant?: 'center' | 'left'
}

const PullQuote: React.FC<PullQuoteProps> = ({
    id,
    title,
    quote,
    attribution,
    role,
    variant = 'center'
}) => {
    const alignmentClasses = variant === 'center' ? 'text-center items-center' : 'text-left items-start'

    return (
        <section className="relative w-full min-h-[60vh] bg-white-pure flex flex-col border-b border-black-pure overflow-hidden">
            <div className="flex h-16 border-b border-black-pure items-center px-6 justify-between bg-white-pure z-30 sticky top-0">
                <div className="flex items-center gap-4">
                    <span className="text-[11px] font-bold tracking-tight text-black-pure">{id}</span>
                    <div className="h-4 w-[1px] bg-neutral-200" />
                    <h2 className="text-[11px] text-neutral-500 uppercase tracking-wide">{title}</h2>
                </div>
            </div>

            <div className={`flex-1 flex flex-col justify-center px-8 lg:px-24 py-20 bg-neutral-50 ${alignmentClasses}`}>
                <div className="relative max-w-5xl">
                    <span className="absolute -top-12 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 font-race text-8xl text-black-pure opacity-5 leading-none select-none">
                        "
                    </span>

                    <h2 className="font-race text-4xl md:text-6xl lg:text-7xl text-black-pure uppercase leading-[0.9] mb-12 tracking-tighter">
                        {quote}
                    </h2>

                    {(attribution || role) && (
                        <div className={`flex flex-col gap-1 ${variant === 'center' ? 'items-center' : 'items-start'}`}>
                            <div className="h-[1px] w-12 bg-black-pure mb-4" />
                            {attribution && (
                                <p className="text-sm font-bold text-black-pure uppercase tracking-widest">
                                    {attribution}
                                </p>
                            )}
                            {role && (
                                <p className="text-[10px] font-bold text-primary-500 uppercase tracking-tight">
                                    {role}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="z-30 bg-white-pure border-t border-black-pure">
                <SectionScroller
                    items={[title, id, "OFFICIAL_STATEMENT"]}
                    variant={3}
                />
            </div>
        </section>
    )
}

export default PullQuote