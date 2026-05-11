"use client"

import { Form as FormType } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { FormRenderer } from './FormRenderer'

interface FloatingChatBotProps {
    form: FormType
}

export const FloatingChatBot: React.FC<FloatingChatBotProps> = ({ form }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black-pure/20 backdrop-blur-sm z-[999]"
                    />
                )}
            </AnimatePresence>

            <div className="fixed bottom-6 left-6 z-[1000] flex flex-col items-start font-mono">
                <style jsx global>{`
                    .chat-scroll::-webkit-scrollbar {
                        width: 6px;
                    }
                    .chat-scroll::-webkit-scrollbar-track {
                        background: transparent;
                        border-left: 1px solid #000;
                    }
                    .chat-scroll::-webkit-scrollbar-thumb {
                        background: #000;
                    }
                    .chat-scroll {
                        scrollbar-width: thin;
                        scrollbar-color: #000 transparent;
                    }
                `}</style>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 40, x: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 40, x: -20 }}
                            transition={{ type: "spring", damping: 20, stiffness: 300 }}
                            className="mb-6 w-[400px] max-w-[calc(100vw-3rem)] h-[550px] max-h-[80vh] flex flex-col bg-white-pure border-2 border-black-pure shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="bg-black-pure p-4 flex justify-between items-center shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="size-2 bg-primary-500 rounded-full" />
                                    <span className="text-white-pure text-[11px] font-black uppercase tracking-[0.2em]">
                                        Contact Support
                                    </span>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="group flex items-center gap-2 text-white-pure hover:text-secondary-500 transition-colors"
                                >
                                    <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity uppercase">Close</span>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto chat-scroll p-8 bg-white-pure">
                                <div className="relative mb-10 pb-4 border-b border-black-pure/10">
                                    <span className="absolute -top-2 -left-2 text-[40px] opacity-5 select-none font-black">?</span>
                                    <p className="text-black-pure text-[12px] font-black uppercase leading-relaxed tracking-wide">
                                        Please fill out the form below and we will get back to you as soon as possible.
                                    </p>
                                </div>

                                <div className="pb-4">
                                    <FormRenderer form={form} />
                                </div>
                            </div>

                            <div className="bg-black-pure/5 px-4 py-2 border-t border-black-pure flex justify-between items-center shrink-0">
                                <span className="text-[8px] font-black uppercase opacity-40">Ready to help</span>
                                <span className="text-[8px] font-black uppercase opacity-40">AF Motorsport</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    whileHover={{ scale: 1.05, translateZ: 0 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "relative size-16 flex items-center justify-center border-2 border-black-pure transition-all duration-500 group",
                        isOpen
                            ? "bg-black-pure text-white-pure rotate-90 shadow-none"
                            : "bg-primary-500 text-black-pure shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                    )}
                >
                    <div className="absolute inset-0 border border-white-pure/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {isOpen ? (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    ) : (
                        <div className="flex flex-col gap-1 items-center">
                            <div className="w-6 h-0.5 bg-black-pure" />
                            <div className="w-4 h-0.5 bg-black-pure self-start" />
                            <div className="w-6 h-0.5 bg-black-pure" />
                        </div>
                    )}
                </motion.button>
            </div>
        </>
    )
}