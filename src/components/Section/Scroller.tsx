'use client'

import React, { useEffect, useRef, useState } from 'react'

interface SectionScrollerProps {
    items: string[]
    delimiter?: React.ReactNode
    velocity?: number
    variant?: 1 | 2 | 3 | 4 | 5
}

const SectionScroller: React.FC<SectionScrollerProps> = ({
    items,
    delimiter = <span className="text-white-pure px-6 opacity-30">✦</span>,
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

        const styleId = 'section-scroller-keyframes'
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style')
            style.id = styleId
            style.innerHTML = `
                @keyframes marquee_forward {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes marquee_reverse {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                .animate-marquee-forward {
                    animation: marquee_forward linear infinite;
                }
                .animate-marquee-backward {
                    animation: marquee_reverse linear infinite;
                }
                .scroller-pause {
                    animation-play-state: paused !important;
                }
            `
            document.head.appendChild(style)
        }
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const animationClass = isScrollingDown ? "animate-marquee-forward" : "animate-marquee-backward"

    const getVariantStyles = () => {
        switch (variant) {
            case 2: return { bg: "bg-black-pure", text: "text-primary-500", h: "h-12 md:h-14" }
            case 3: return { bg: "bg-secondary-500", text: "text-black-pure", h: "h-16 md:h-20" }
            case 4: return { bg: "bg-white-pure", text: "text-tertiary-500", h: "h-14 md:h-16" }
            case 5: return { bg: "bg-tertiary-500", text: "text-white-pure", h: "h-20 md:h-24" }
            default: return { bg: "bg-primary-500", text: "text-black-pure", h: "h-12 md:h-16" }
        }
    }

    const styles = getVariantStyles()

    const renderGroup = (groupIndex: number) => (
        <div key={groupIndex} className="flex items-center">
            {items.map((item, i) => (
                <React.Fragment key={i}>
                    <span className={`text-sm md:text-base font-black tracking-wide font-mono uppercase px-6 md:px-8 whitespace-nowrap ${styles.text} hover:scale-110 transition-transform duration-300 cursor-default`}>
                        {item}
                    </span>
                    {delimiter}
                </React.Fragment>
            ))}
        </div>
    )

    return (
        <div className={`w-full ${styles.bg} overflow-hidden shrink-0 ${styles.h} flex items-center relative group`}>
            <div className={`absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r ${styles.bg} to-transparent z-10 pointer-events-none`} />
            <div className={`absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l ${styles.bg} to-transparent z-10 pointer-events-none`} />
            <div className={`flex whitespace-nowrap ${animationClass} group-hover:scroller-pause`} style={{ animationDuration: `${velocity}s` }}>
                {[...Array(4)].map((_, i) => renderGroup(i))}
            </div>
        </div>
    )
}

export default SectionScroller