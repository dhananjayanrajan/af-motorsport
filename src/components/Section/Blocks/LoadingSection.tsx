"use client"

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

const LoadingSection = ({ onComplete }: { onComplete: () => void }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isVisible, setIsVisible] = useState(true)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted || !canvasRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const COLS = 12
        const duration = 0.9
        const stagger = 0.05
        const holdTime = 0.1
        let startTime: number | null = null
        let animationFrameId: number

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        window.addEventListener('resize', resize)
        resize()

        const render = (time: number) => {
            if (!startTime) startTime = time
            const elapsed = (time - startTime) / 1000

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Start with a solid black canvas
            ctx.fillStyle = '#000000'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            const colWidth = Math.ceil(canvas.width / COLS)
            let allFinished = true

            for (let i = 0; i < COLS; i++) {
                const columnDelay = (i * stagger) + holdTime
                const columnElapsed = elapsed - columnDelay
                const progress = Math.max(0, Math.min(1, columnElapsed / duration))

                if (progress < 1) allFinished = false

                // Smooth ease-out-expo for fluid motion
                const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)

                const direction = i % 2 === 0 ? 1 : -1
                const yPos = direction === 1
                    ? -canvas.height + (ease * canvas.height)
                    : canvas.height - (ease * canvas.height)

                // White rectangles sliding in
                ctx.fillStyle = i % 2 === 0 ? '#FFFFFF' : '#FBFBFB'
                ctx.fillRect(i * colWidth, yPos, colWidth + 1, canvas.height)
            }

            if (allFinished && elapsed > (duration + (COLS * stagger) + holdTime)) {
                onComplete()
                // Small delay before removing canvas to ensure opacity transition is underway
                setTimeout(() => setIsVisible(false), 50)
                return
            }

            animationFrameId = requestAnimationFrame(render)
        }

        animationFrameId = requestAnimationFrame(render)

        return () => {
            window.removeEventListener('resize', resize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [mounted, onComplete])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="loader-container"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.45, 0, 0.55, 1] }}
                    className="fixed inset-0 z-[9999] bg-black pointer-events-none overflow-hidden"
                >
                    <canvas
                        ref={canvasRef}
                        className="block w-full h-full"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default LoadingSection