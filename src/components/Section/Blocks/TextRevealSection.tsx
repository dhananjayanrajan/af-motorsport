"use client"

import { motion, MotionValue, useScroll, useTransform } from 'motion/react'
import React, { useRef } from 'react'
import SectionScroller from '../Components/SectionScroller'

interface TextRevealSectionProps {
    id: string
    title: string
    subtitle: string
    content: string | {
        root: {
            type: string
            children: {
                type: any
                version: number
                [k: string]: unknown
            }[]
            direction: ('ltr' | 'rtl') | null
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
            indent: number
            version: number
        }
        [k: string]: unknown
    } | null | undefined
    headerVariant?: 1 | 2 | 3
    footerVariant?: 1 | 2 | 3
    background?: React.ReactNode
}

function extractPlainText(content: TextRevealSectionProps['content']): string {
    if (!content) return ''
    if (typeof content === 'string') return content
    if (typeof content === 'object' && 'root' in content && content.root?.children) {
        const parts: string[] = []
        for (const child of content.root.children) {
            if ((child as any)?.children) {
                for (const c of (child as any).children) {
                    if (c?.text) parts.push(c.text)
                }
            }
        }
        return parts.join(' ').replace(/\s+/g, ' ').trim()
    }
    return ''
}

const Word: React.FC<{
    word: string
    index: number
    totalWords: number
    scrollYProgress: MotionValue<number>
}> = ({ word, index, totalWords, scrollYProgress }) => {
    if (word.match(/^\s+$/)) {
        return <span>{word}</span>
    }

    const progressStart = index / totalWords
    const progressEnd = (index + 1) / totalWords
    const wordProgress = useTransform(
        scrollYProgress,
        [progressStart * 0.8, progressEnd * 1.2],
        [0, 1]
    )
    const opacity = useTransform(wordProgress, [0, 0.4, 1], [0.06, 0.5, 1])
    const y = useTransform(wordProgress, [0, 1], [16, 0])

    return (
        <motion.span
            style={{ opacity, y }}
            className="inline-block"
        >
            {word}
        </motion.span>
    )
}

const ParagraphReveal: React.FC<{ words: string[]; paragraphIndex: number }> = ({ words, paragraphIndex }) => {
    const ref = useRef<HTMLParagraphElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start 75%', 'start 15%'],
    })

    const textSizeClass = words.length > 200
        ? 'text-xl md:text-2xl'
        : words.length > 100
            ? 'text-2xl md:text-3xl'
            : 'text-3xl md:text-3xl'

    return (
        <p ref={ref} className={`${textSizeClass} font-medium leading-relaxed tracking-normal`}>
            {words.map((word, index) => (
                <Word
                    key={index}
                    word={word}
                    index={index}
                    totalWords={words.length}
                    scrollYProgress={scrollYProgress}
                />
            ))}
        </p>
    )
}

const TextRevealSection: React.FC<TextRevealSectionProps> = ({
    id,
    title,
    subtitle,
    content,
    background,
}) => {
    const plainText = extractPlainText(content)
    const sectionRef = useRef<HTMLElement>(null)
    const paragraphs = plainText ? plainText.split(/\n{2,}/).filter(p => p.trim().length > 0) : []
    const scrollerItems = title ? [title, subtitle] : [subtitle]

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end'],
    })

    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
    const progressBarWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

    if (!plainText || paragraphs.length === 0) return null

    return (
        <section id={id} ref={sectionRef} className="relative w-full bg-white-pure border-t-2 border-black-pure overflow-hidden">
            {background && (
                <motion.div className="absolute inset-0 pointer-events-none" style={{ y: backgroundY, opacity: 0.03 }}>
                    {background}
                </motion.div>
            )}

            <div className="sticky top-0 z-50">
                <motion.div
                    className="h-1 bg-primary-500"
                    style={{ width: progressBarWidth }}
                />
            </div>

            <div className="sticky top-1 z-40">
                <SectionScroller
                    items={scrollerItems}
                    variant={1}
                    velocity={20}
                />
            </div>

            <div className="relative z-10 w-full">
                {paragraphs.map((paragraph, pIndex) => {
                    const words = paragraph.split(/(\s+)/)
                    return (
                        <div key={pIndex} className="min-h-screen flex items-center px-6 md:px-12 lg:px-24 py-24 md:py-32">
                            <div className="w-full max-w-6xl mx-auto">
                                <div className="flex items-start gap-4 md:gap-10">
                                    <div className="hidden md:flex flex-col items-center gap-6 shrink-0 pt-3">
                                        <span className="text-sm font-mono font-black text-black-pure/15 tabular-nums leading-none">
                                            {String(pIndex + 1).padStart(2, '0')}
                                        </span>
                                        <div className="w-px h-24 bg-black-pure/5" />
                                    </div>
                                    <div className="flex-1">
                                        <ParagraphReveal words={words} paragraphIndex={pIndex} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default TextRevealSection