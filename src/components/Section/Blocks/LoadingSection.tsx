"use client"

import { motion } from 'motion/react'

const LoadingSection = () => {
    return (
        <div className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-black-pure pointer-events-auto overflow-hidden">
            <div className="absolute inset-0 overflow-hidden opacity-20">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ x: '-100%', y: `${Math.random() * 100}%` }}
                        animate={{ x: '200%' }}
                        transition={{
                            duration: 0.5 + Math.random() * 0.5,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 2
                        }}
                        className="absolute h-[1px] w-64 bg-primary-500"
                    />
                ))}
            </div>

            <div className="relative z-10 flex flex-col items-center gap-12">
                <div className="flex gap-4 p-4 border-4 border-white-pure/10 bg-black-pure/50 backdrop-blur-md">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex flex-col gap-2">
                            <motion.div
                                animate={{
                                    backgroundColor: i < 5 ? ['#1a1a1a', '#ff0000', '#ff0000'] : '#1a1a1a'
                                }}
                                transition={{ delay: i * 0.2, duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                                className="size-8 rounded-full border-2 border-black-pure shadow-inner"
                            />
                            <motion.div
                                animate={{
                                    backgroundColor: i < 5 ? ['#1a1a1a', '#ff0000', '#ff0000'] : '#1a1a1a'
                                }}
                                transition={{ delay: i * 0.2, duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                                className="size-8 rounded-full border-2 border-black-pure shadow-inner"
                            />
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center">
                    <div className="flex items-end gap-1 mb-2">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 4 }}
                                animate={{
                                    height: [4, 40, 4],
                                    backgroundColor: i > 15 ? '#ff0000' : '#f5ff00'
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 0.3,
                                    delay: i * 0.02,
                                    ease: "easeInOut"
                                }}
                                className="w-2 bg-primary-500"
                            />
                        ))}
                    </div>
                    <span className="font-race text-white-pure text-2xl italic tracking-widest animate-pulse">
                        WARMING_TIRES...
                    </span>
                </div>
            </div>

            <motion.div
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                transition={{ duration: 0.8, ease: [0.8, 0, 0.1, 1], delay: 2.5 }}
                className="absolute inset-0 bg-primary-500 z-50 origin-top"
            />
        </div>
    )
}

export default LoadingSection