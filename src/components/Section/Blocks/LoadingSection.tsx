"use client"

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

const LoadingSection = () => {
    const [mounted, setMounted] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setMounted(true)
        setIsVisible(true)
        const timer = setTimeout(() => {
            setIsVisible(false)
        }, 2500)
        return () => clearTimeout(timer)
    }, [])

    if (!mounted) return null

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.9, ease: [0.9, 0, 0.1, 1] }}
                    className="fixed inset-0 z-[9999999] flex flex-col items-center justify-center bg-[var(--black-pure)] pointer-events-auto"
                    style={{ height: '100vh', width: '100vw' }}
                >
                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(30)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: '-100%', y: `${Math.random() * 100}%` }}
                                animate={{ x: '200%' }}
                                transition={{
                                    duration: 0.2 + Math.random() * 0.3,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: Math.random() * 0.5
                                }}
                                className="absolute h-[3px] w-[400px] bg-[var(--primary-500)] opacity-40 shadow-[0_0_15px_var(--primary-500)]"
                            />
                        ))}
                    </div>

                    <div className="relative z-[10] flex flex-col items-center justify-center w-full h-full">
                        <div className="flex gap-6 mb-24">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex flex-col gap-4">
                                    <motion.div
                                        animate={{
                                            backgroundColor: ['var(--black-400)', 'var(--primary-500)', 'var(--primary-500)', 'var(--black-400)'],
                                            boxShadow: ['0 0 0px transparent', '0 0 40px var(--primary-500)', '0 0 40px var(--primary-500)', '0 0 0px transparent']
                                        }}
                                        transition={{ delay: i * 0.3, duration: 0.6, times: [0, 0.2, 0.8, 1], repeat: Infinity }}
                                        className="size-16 rounded-full border-4 border-[var(--black-pure)]"
                                    />
                                    <motion.div
                                        animate={{
                                            backgroundColor: ['var(--black-400)', 'var(--primary-500)', 'var(--primary-500)', 'var(--black-400)'],
                                            boxShadow: ['0 0 0px transparent', '0 0 40px var(--primary-500)', '0 0 40px var(--primary-500)', '0 0 0px transparent']
                                        }}
                                        transition={{ delay: i * 0.3, duration: 0.6, times: [0, 0.2, 0.8, 1], repeat: Infinity }}
                                        className="size-16 rounded-full border-4 border-[var(--black-pure)]"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="w-full max-w-4xl px-12">
                            <div className="flex items-end gap-2 h-32">
                                {[...Array(40)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 10 }}
                                        animate={{
                                            height: [10, Math.random() * 100 + 20, 10],
                                            backgroundColor: i > 32 ? 'var(--error)' : i > 24 ? 'var(--warning)' : 'var(--success)'
                                        }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 0.12,
                                            delay: i * 0.008
                                        }}
                                        className="flex-grow rounded-t-md"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ delay: 2.3, duration: 0.15 }}
                        className="absolute inset-0 bg-[var(--white-pure)] z-[99999999] pointer-events-none"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default LoadingSection