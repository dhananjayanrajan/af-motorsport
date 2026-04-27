"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

interface CoverSectionProps {
    id: string
    image?: string
}

const CoverSection: React.FC<CoverSectionProps> = ({
    id,
    image,
}) => {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

    const fallbackImage = `https://picsum.photos/seed/${id}/1920/1080`
    const safeImage = image || fallbackImage

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    })

    const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
    const imageFilter = useTransform(
        scrollYProgress,
        [0, 0.5],
        ['grayscale(100%) contrast(120%)', 'grayscale(100%) contrast(150%) brightness(0.5)']
    )

    useEffect(() => {
        setIsLoaded(true)
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    return (
        <section
            ref={sectionRef}
            id={id}
            className="relative w-full h-screen bg-black-pure overflow-hidden border-b-4 border-white-pure"
        >
            <motion.div
                className="absolute inset-0 z-0"
                style={{
                    scale: imageScale,
                    filter: imageFilter
                }}
            >
                <motion.img
                    src={safeImage}
                    alt=""
                    className="w-full h-full object-cover"
                    initial={{ x: '10%', opacity: 0 }}
                    animate={isLoaded ? { x: '0%', opacity: 1 } : {}}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    onError={(e) => {
                        const target = e.target as HTMLImageElement
                        if (target.src !== fallbackImage) target.src = fallbackImage
                    }}
                    style={{
                        x: mousePos.x * -0.5,
                        y: mousePos.y * -0.5,
                    }}
                />
            </motion.div>

            <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <div className="absolute inset-0 z-[2] grid grid-cols-4 md:grid-cols-12 h-full w-full pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="border-r border-white-pure/20 h-full w-full relative">
                        <div className="absolute top-0 left-0 w-2 h-2 bg-white-pure opacity-40" />
                    </div>
                ))}
            </div>

            <div className="absolute inset-0 z-[3] flex flex-col justify-between pointer-events-none p-4 md:p-8">
                <div className="w-full flex justify-between items-start">
                    <div className="w-16 h-16 border-t-4 border-l-4 border-white-pure" />
                    <div className="w-16 h-16 border-t-4 border-r-4 border-white-pure" />
                </div>
                <div className="w-full flex justify-between items-end">
                    <div className="w-16 h-16 border-b-4 border-l-4 border-white-pure" />
                    <div className="w-32 h-4 bg-white-pure" />
                </div>
            </div>

            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[80vh] border-2 border-white-pure/30 z-[4] pointer-events-none"
                style={{
                    x: mousePos.x,
                    y: mousePos.y,
                }}
            />

            <motion.div
                className="absolute inset-0 bg-white-pure z-[10] origin-left"
                initial={{ scaleX: 1 }}
                animate={isLoaded ? { scaleX: 0 } : {}}
                transition={{ duration: 1, ease: [0.85, 0, 0.15, 1], delay: 0.2 }}
            />
        </section>
    )
}

export default CoverSection