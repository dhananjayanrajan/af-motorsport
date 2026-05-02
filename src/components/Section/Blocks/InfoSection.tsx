// components/Section/Blocks/InfoSection.tsx
"use client"

import { motion, useInView } from 'motion/react'
import React, { useEffect, useRef, useState } from 'react'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'

export interface InfoCard {
    id: string
    label: string
    value: string
    icon?: React.ReactNode
    emphasis?: 'low' | 'medium' | 'high'
    href?: string
}

interface InfoSectionProps {
    id: string
    title: string
    subtitle: string
    cards: InfoCard[]
    columns?: 2 | 3 | 4
    headerVariant?: 1 | 2 | 3
    footerVariant?: 1 | 2 | 3
    background?: React.ReactNode
}

const emphasisColors = {
    low: {
        border: 'border-black-pure/10',
        bg: 'bg-white-pure',
        text: 'text-black-pure/60',
        accent: 'bg-black-pure/10',
        accentLine: 'bg-black-pure/20',
        glow: 'shadow-none',
        labelText: 'text-black-pure/30',
        iconColor: 'text-black-pure/15',
    },
    medium: {
        border: 'border-black-pure',
        bg: 'bg-white-pure',
        text: 'text-black-pure',
        accent: 'bg-primary-500',
        accentLine: 'bg-primary-500',
        glow: 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]',
        labelText: 'text-black-pure/40',
        iconColor: 'text-black-pure/20',
    },
    high: {
        border: 'border-black-pure',
        bg: 'bg-black-pure',
        text: 'text-white-pure',
        accent: 'bg-primary-500',
        accentLine: 'bg-primary-500',
        glow: 'shadow-[8px_8px_0px_0px_var(--primary-500)]',
        labelText: 'text-white-pure/40',
        iconColor: 'text-primary-500',
    },
}

function useCountUp(end: string, isInView: boolean): string {
    const numericMatch = end.match(/^[\d,.]+/)
    const suffix = numericMatch ? end.slice(numericMatch[0].length) : ''
    const targetNumber = numericMatch ? parseFloat(numericMatch[0].replace(/,/g, '')) : NaN

    const [displayValue, setDisplayValue] = useState('0')

    useEffect(() => {
        if (!isInView || isNaN(targetNumber)) {
            setDisplayValue(end)
            return
        }

        let startTime: number | null = null
        const duration = 1500

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 4)
            const current = Math.round(targetNumber * eased)

            setDisplayValue(current.toLocaleString() + suffix)

            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }

        requestAnimationFrame(animate)
    }, [end, isInView, targetNumber, suffix])

    return displayValue
}

const CardItem: React.FC<{ card: InfoCard; index: number }> = ({ card, index }) => {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-80px' })
    const displayValue = useCountUp(card.value, isInView)
    const colors = emphasisColors[card.emphasis || 'medium']
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        setMousePos({
            x: (e.clientX - rect.left) / rect.width - 0.5,
            y: (e.clientY - rect.top) / rect.height - 0.5,
        })
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
        setMousePos({ x: 0, y: 0 })
    }

    const content = (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className={`relative flex flex-col p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8 border-2 ${colors.border} ${colors.bg} transition-all duration-500 ${colors.glow} overflow-hidden cursor-default`}
            style={{
                transform: isHovered
                    ? `perspective(1000px) rotateX(${mousePos.y * -6}deg) rotateY(${mousePos.x * 6}deg) translateY(-4px)`
                    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
                transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
        >
            <div className="absolute top-0 right-0 w-16 xs:w-20 h-16 xs:h-20 pointer-events-none overflow-hidden">
                <div className={`absolute top-0 right-0 w-0 h-0 border-l-[20px] border-b-[20px] border-l-transparent ${colors.border} opacity-20`} />
            </div>

            <div className="relative z-10 flex flex-col gap-3 xs:gap-4 sm:gap-5">
                <div className="flex items-start justify-between gap-2 xs:gap-3">
                    <div className="flex flex-col gap-0.5 xs:gap-1">
                        <span className={`text-xs font-mono font-black uppercase tracking-widest leading-none ${colors.labelText}`}>
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className={`text-xs font-black uppercase tracking-widest leading-tight ${colors.labelText}`}>
                            {card.label}
                        </span>
                    </div>
                    {card.icon && (
                        <motion.div
                            animate={isHovered ? { rotate: 15, scale: 1.1 } : { rotate: 0, scale: 1 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className={`shrink-0 ${colors.iconColor} transition-colors duration-300`}
                            style={{ color: isHovered && card.emphasis === 'high' ? 'var(--primary-500)' : undefined }}
                        >
                            {card.icon}
                        </motion.div>
                    )}
                </div>

                <div className="flex items-baseline gap-1">
                    <motion.span
                        className={`text-xl xs:text-2xl sm:text-2xl md:text-2xl lg:text-2xl font-black tabular-nums leading-none tracking-tight ${colors.text} transition-colors duration-300`}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ duration: 0.6, delay: index * 0.06 + 0.3 }}
                    >
                        {displayValue}
                    </motion.span>
                </div>

                <div className="flex items-center gap-1 xs:gap-1.5 mt-0.5 xs:mt-1">
                    <motion.div
                        className={`h-[3px] rounded-full ${colors.accentLine}`}
                        initial={{ width: 16 }}
                        animate={isHovered ? { width: 40 } : { width: 16 }}
                        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    />
                    <motion.div
                        className={`h-[3px] rounded-full ${colors.accentLine}`}
                        initial={{ width: 6 }}
                        animate={isHovered ? { width: 12 } : { width: 6 }}
                        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.08 }}
                        style={{ opacity: 0.5 }}
                    />
                    <motion.div
                        className={`h-[3px] rounded-full ${colors.accentLine}`}
                        initial={{ width: 3 }}
                        animate={isHovered ? { width: 6 } : { width: 3 }}
                        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.14 }}
                        style={{ opacity: 0.25 }}
                    />
                </div>
            </div>

            <motion.div
                className={`absolute bottom-0 left-0 h-1 ${colors.accent}`}
                initial={{ width: '0%' }}
                animate={isInView ? { width: '100%' } : { width: '0%' }}
                transition={{ duration: 1.4, delay: index * 0.08 + 0.5, ease: [0.23, 1, 0.32, 1] }}
            />

            <div className="absolute bottom-2 xs:bottom-3 right-2 xs:right-3 pointer-events-none">
                <span className={`text-xl xs:text-2xl font-black italic leading-none tracking-tighter ${card.emphasis === 'high' ? 'text-white-pure' : 'text-black-pure'}`} style={{ opacity: 0.02 }}>
                    {String(index + 1).padStart(2, '0')}
                </span>
            </div>
        </motion.div>
    )

    if (card.href) {
        return (
            <a key={card.id} href={card.href} className="block group/link outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
                {content}
            </a>
        )
    }

    return <React.Fragment key={card.id}>{content}</React.Fragment>
}

const InfoSection: React.FC<InfoSectionProps> = ({
    id,
    title,
    subtitle,
    cards = [],
    columns = 3,
    headerVariant = 1,
    footerVariant = 1,
    background,
}) => {
    const gridCols = {
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    }

    if (cards.length === 0) return null

    return (
        <section id={id} className="relative w-full bg-white-pure border-t-2 border-black-pure overflow-hidden">
            {background}

            <SectionHeader
                title={title}
                subtitle={subtitle}
                variant={headerVariant}
                metadata={String(cards.length).padStart(2, '0')}
            />

            <div className="container py-12 md:py-20 lg:py-24">
                <div className={`grid ${gridCols[columns]} gap-4 md:gap-6`}>
                    {cards.map((card, idx) => (
                        <CardItem key={card.id} card={card} index={idx} />
                    ))}
                </div>
            </div>

            <SectionFooter variant={footerVariant} />
        </section>
    )
}

export default InfoSection