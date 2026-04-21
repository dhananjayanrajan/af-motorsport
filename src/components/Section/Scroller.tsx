"use client"

import React, { useEffect, useRef, useState } from 'react'

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
    backgroundColor = "bg-secondary-500",
    textColor = "text-black-pure",
    variant = 1
}) => {
    const [isScrollingDown, setIsScrollingDown] = useState(true)
    const lastScrollY = useRef(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            if (currentScrollY > lastScrollY.current) {
                setIsScrollingDown(true)
            } else {
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
            `
            document.head.appendChild(style)
        }
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const animationClass = isScrollingDown ? "animate-marquee-forward" : "animate-marquee-backward"

    const renderGroup = (groupIndex: number, currentTextColor: string) => (
        <div key={groupIndex} className="flex items-center">
            {items.map((item, i) => (
                <React.Fragment key={i}>
                    <span className={`text-base font-black ${currentTextColor} tracking-normal font-mono uppercase px-8 whitespace-nowrap`}>
                        {item}
                    </span>
                    {delimiter}
                </React.Fragment>
            ))}
        </div>
    )

    const getVariantStyles = () => {
        switch (variant) {
            case 2: return { bg: "bg-black-pure", text: "text-white-pure", h: "h-14" }
            case 3: return { bg: "bg-primary-500", text: "text-black-pure", h: "h-20" }
            case 4: return { bg: "bg-white-pure", text: "text-black-pure", h: "h-16" }
            case 5: return { bg: "bg-secondary-500", text: "text-black-pure", h: "h-24" }
            default: return { bg: backgroundColor, text: textColor, h: "h-16" }
        }
    }

    const styles = getVariantStyles()

    return (
        <div className={`w-full ${styles.bg} border-y-4 border-black-pure overflow-hidden shrink-0 ${styles.h} flex items-center`}>
            <div className={`flex whitespace-nowrap ${animationClass}`} style={{ animationDuration: `${velocity}s` }}>
                {[...Array(4)].map((_, i) => renderGroup(i, styles.text))}
            </div>
        </div>
    )
}

export default SectionScroller