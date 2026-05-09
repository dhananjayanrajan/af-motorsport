"use client"
import React, { useEffect, useRef, useState } from 'react'

interface SectionScrollerProps {
    items: string[]
    delimiter?: React.ReactNode
    velocity?: number
    variant?: 1 | 2 | 3 | 4 | 5
}

const SectionScroller: React.FC<SectionScrollerProps> = ({
    items,
    delimiter = <div className="w-12 h-px bg-black-pure mx-4" />,
    velocity = 30,
    variant = 1
}) => {
    const [isScrollingDown, setIsScrollingDown] = useState(true)
    const lastScrollY = useRef(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            if (currentScrollY > lastScrollY.current) {
                setIsScrollingDown(true)
            } else if (currentScrollY < lastScrollY.current) {
                setIsScrollingDown(false)
            }
            lastScrollY.current = currentScrollY
        }

        window.addEventListener("scroll", handleScroll, { passive: true })

        const styleId = 'section-scroller-keyframes-overhaul'
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style')
            style.id = styleId
            style.innerHTML = `
                @keyframes marquee_forward { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                @keyframes marquee_reverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
                .animate-marquee-forward { animation: marquee_forward linear infinite; }
                .animate-marquee-backward { animation: marquee_reverse linear infinite; }
                .scroller-pause { animation-play-state: paused !important; }
            `
            document.head.appendChild(style)
        }

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const animationClass = isScrollingDown ? "animate-marquee-forward" : "animate-marquee-backward"
    const textBase = "font-black uppercase tracking-tighter text-base"

    if (variant === 2) {
        return (
            <div className="w-full bg-black-pure border-y-4 border-black-pure h-16 flex items-center relative overflow-hidden group">
                <div className={`flex items-center whitespace-nowrap ${animationClass} group-hover:scroller-pause`} style={{ animationDuration: `${velocity}s` }}>
                    {[...Array(4)].map((_, idx) => (
                        <div key={idx} className="flex items-center">
                            {items.map((item, i) => (
                                <div key={i} className="flex items-center group/item">
                                    <span className={`${textBase} text-primary-500 px-6 border-x border-white-pure group-hover/item:bg-white-pure group-hover/item:text-black-pure transition-colors cursor-default py-2`}>
                                        {item}
                                    </span>
                                    <div className="flex gap-1 px-4">
                                        <div className="w-1 h-1 bg-secondary-500" />
                                        <div className="w-1 h-1 bg-secondary-500" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (variant === 3) {
        return (
            <div className="w-full bg-secondary-500 border-y-2 border-black-pure h-20 flex items-center relative overflow-hidden group">
                <div className={`flex items-center whitespace-nowrap relative z-10 ${animationClass} group-hover:scroller-pause`} style={{ animationDuration: `${velocity}s` }}>
                    {[...Array(4)].map((_, idx) => (
                        <div key={idx} className="flex items-center">
                            {items.map((item, i) => (
                                <div key={i} className="flex items-center">
                                    <span className={`${textBase} text-black-pure px-8 group-hover:not-italic transition-all`}>
                                        {item}
                                    </span>
                                    <span className="text-2xl font-black text-black-pure">/</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (variant === 4) {
        return (
            <div className="w-full bg-white-pure border-y-8 border-black-pure h-16 flex items-center relative overflow-hidden group">
                <div className={`flex items-center whitespace-nowrap ${animationClass} group-hover:scroller-pause`} style={{ animationDuration: `${velocity}s` }}>
                    {[...Array(4)].map((_, idx) => (
                        <div key={idx} className="flex items-center">
                            {items.map((item, i) => (
                                <div key={i} className="flex items-center">
                                    <div className="w-8 h-8 bg-black-pure flex items-center justify-center mr-4">
                                        <span className="text-[10px] font-black text-white-pure">{i + 1}</span>
                                    </div>
                                    <span className={`${textBase} text-black-pure mr-8`}>{item}</span>
                                    <div className="w-2 h-2 bg-primary-500 rotate-45 mr-8" />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (variant === 5) {
        return (
            <div className="w-full bg-black-pure border-y-2 border-primary-500 h-24 flex items-center relative overflow-hidden group">
                <div className={`flex items-center whitespace-nowrap ${animationClass} group-hover:scroller-pause`} style={{ animationDuration: `${velocity}s` }}>
                    {[...Array(4)].map((_, idx) => (
                        <div key={idx} className="flex items-center">
                            {items.map((item, i) => (
                                <div key={i} className="flex items-center px-10 group/item">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-primary-500 mb-1 group-hover/item:opacity-100 transition-opacity">{item}</span>
                                        <span className={`${textBase} text-2xl text-white-pure group-hover/item:text-primary-500 transition-colors`}>{item}</span>
                                    </div>
                                    <div className="ml-10 h-12 w-px bg-white-pure rotate-12" />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="w-full bg-primary-500 border-y-2 border-black-pure h-14 flex items-center relative overflow-hidden group">
            <div className={`flex items-center whitespace-nowrap ${animationClass} group-hover:scroller-pause`} style={{ animationDuration: `${velocity}s` }}>
                {[...Array(4)].map((_, idx) => (
                    <div key={idx} className="flex items-center">
                        {items.map((item, i) => (
                            <React.Fragment key={i}>
                                <span className={`${textBase} text-black-pure px-10 hover:bg-black-pure hover:text-white-pure transition-colors py-4 cursor-crosshair`}>
                                    {item}
                                </span>
                                {delimiter}
                            </React.Fragment>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SectionScroller