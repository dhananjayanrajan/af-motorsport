"use client"

import React, { useEffect } from 'react'

interface SectionScrollerProps {
    items: string[]
    delimiter?: React.ReactNode
    velocity?: number
    backgroundColor?: string
    textColor?: string
    variant?: 1 | 2 | 3 | 4 | 5
}

const SectionScroller: React.FC<SectionScrollerProps> = ({
    items,
    delimiter = <span className="text-black-pure px-4">/</span>,
    velocity = 40,
    backgroundColor = "bg-secondary",
    textColor = "text-black-pure",
    variant = 1
}) => {
    useEffect(() => {
        const styleId = 'section-scroller-keyframes'
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style')
            style.id = styleId
            style.innerHTML = `
                @keyframes marquee_forward {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-25%); }
                }
                @keyframes marquee_reverse {
                    0% { transform: translateX(-25%); }
                    100% { transform: translateX(0); }
                }
                .animate-marquee-forward {
                    animation: marquee_forward linear infinite;
                }
                .animate-marquee-backward {
                    animation: marquee_reverse linear infinite;
                }
            `
            document.head.appendChild(style)
        }
    }, [])

    const renderGroup = (groupIndex: number, currentTextColor: string) => (
        <div key={groupIndex} className="flex items-center">
            {items.map((item, i) => (
                <React.Fragment key={i}>
                    <span className={`text-sm font-black ${currentTextColor} tracking-[0.4em] font-mono uppercase px-8`}>
                        {item}
                    </span>
                    {delimiter}
                </React.Fragment>
            ))}
        </div>
    )

    if (variant === 2) {
        return (
            <div className="w-full bg-black-pure border-y-2 border-black-pure overflow-hidden shrink-0 h-14 flex items-center">
                <div className="flex whitespace-nowrap animate-marquee-backward" style={{ animationDuration: `${velocity * 1.2}s` }}>
                    {[...Array(4)].map((_, i) => renderGroup(i, "text-white-pure"))}
                </div>
            </div>
        )
    }

    if (variant === 3) {
        return (
            <div className="w-full bg-primary border-y-2 border-black-pure overflow-hidden shrink-0 h-20 flex items-center">
                <div className="flex whitespace-nowrap animate-marquee-forward rotate-1 scale-110" style={{ animationDuration: `${velocity * 0.8}s` }}>
                    {[...Array(4)].map((_, i) => renderGroup(i, "text-black-pure"))}
                </div>
            </div>
        )
    }

    if (variant === 4) {
        return (
            <div className="w-full bg-white-50 border-y-2 border-black-pure overflow-hidden shrink-0 h-16 flex items-center">
                <div className="flex whitespace-nowrap animate-marquee-forward" style={{ animationDuration: `${velocity}s` }}>
                    {[...Array(4)].map((_, i) => renderGroup(i, "text-black-pure"))}
                </div>
            </div>
        )
    }

    if (variant === 5) {
        return (
            <div className="w-full bg-tertiary-500 border-y-4 border-black-pure overflow-hidden shrink-0 h-24 flex items-center italic">
                <div className="flex whitespace-nowrap animate-marquee-forward scale-y-150" style={{ animationDuration: `${velocity * 1.5}s` }}>
                    {[...Array(4)].map((_, i) => renderGroup(i, "text-black-pure"))}
                </div>
            </div>
        )
    }

    return (
        <div className={`w-full ${backgroundColor} border-y-2 border-black-pure overflow-hidden shrink-0 h-16 flex items-center`}>
            <div className={`flex whitespace-nowrap animate-marquee-forward`} style={{ animationDuration: `${velocity}s` }}>
                {[...Array(4)].map((_, i) => renderGroup(i, textColor))}
            </div>
        </div>
    )
}

export default SectionScroller