"use client"

import { Form as FormType } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { FormRenderer } from './FormRenderer'

interface UtilityStackProps {
    form: FormType
}

const UtilityAction = ({
    href,
    icon,
    label,
    description
}: {
    href: string,
    icon: React.ReactNode,
    label: string,
    description: string
}) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className="group relative flex items-center justify-end"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, x: 15, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 15, scale: 0.95 }}
                        className="absolute right-16 w-48 p-4 bg-white-pure border-2 border-black-pure shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] pointer-events-none z-[10001] hidden md:block"
                    >
                        <p className="text-black-pure font-mono text-[11px] font-black uppercase tracking-[0.1em] mb-1">
                            {label}
                        </p>
                        <p className="text-black-pure font-mono text-[9px] uppercase leading-tight opacity-80">
                            {description}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            <a
                href={href}
                target={href.startsWith('http') ? "_blank" : undefined}
                rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
                className="flex items-center justify-center size-12 bg-white-pure border-2 border-black-pure text-black-pure transition-all duration-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:bg-primary-500 hover:translate-x-[2px] hover:translate-y-[2px]"
            >
                <div className="size-5 flex items-center justify-center">
                    {icon}
                </div>
            </a>
        </div>
    )
}

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const toggleVisible = () => setVisible(window.scrollY > 300)
        window.addEventListener('scroll', toggleVisible)
        return () => window.removeEventListener('scroll', toggleVisible)
    }, [])

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        mass: 1
                    }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex items-center justify-center size-12 bg-black-pure border-2 border-black-pure text-white-pure hover:bg-secondary-500 transition-all duration-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M18 15l-6-6-6 6" />
                    </svg>
                </motion.button>
            )}
        </AnimatePresence>
    )
}

export const UtilityStack: React.FC<UtilityStackProps> = ({ form }) => {
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

            <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end gap-4 font-mono">
                <style jsx global>{`
                    .chat-scroll::-webkit-scrollbar {
                        width: 4px;
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
                            initial={{ opacity: 0, scale: 0.95, y: 40, x: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 40, x: 20 }}
                            transition={{ type: "spring", damping: 20, stiffness: 300 }}
                            className="mb-2 w-[calc(100vw-3rem)] sm:w-[350px] h-[70vh] sm:h-[480px] flex flex-col bg-white-pure border-2 border-black-pure shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="bg-black-pure p-3 flex justify-between items-center shrink-0">
                                <div className="flex items-center gap-2">
                                    <div className="size-1.5 bg-primary-500 rounded-full" />
                                    <span className="text-white-pure text-[10px] font-black uppercase tracking-[0.1em]">
                                        Contact Support
                                    </span>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="group flex items-center gap-2 text-white-pure hover:text-secondary-500 transition-colors"
                                >
                                    <span className="text-[8px] opacity-0 group-hover:opacity-100 transition-opacity uppercase">Close</span>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto chat-scroll p-4 sm:p-6 bg-white-pure">
                                <div className="relative mb-6 pb-3 border-b border-black-pure/10">
                                    <span className="absolute -top-1 -left-1 text-[30px] opacity-5 select-none font-black">?</span>
                                    <p className="text-black-pure text-[11px] font-black uppercase leading-relaxed tracking-wide">
                                        Please fill out the form below and we will get back to you as soon as possible.
                                    </p>
                                </div>
                                <div className="pb-2">
                                    <FormRenderer form={form} />
                                </div>
                            </div>

                            <div className="bg-black-pure/5 px-3 py-1.5 border-t border-black-pure flex justify-between items-center shrink-0">
                                <span className="text-[7px] font-black uppercase opacity-40">Ready to help</span>
                                <span className="text-[7px] font-black uppercase opacity-40">AF Motorsport</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex flex-col items-end gap-4">
                    <AnimatePresence>
                        {!isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="flex flex-col items-end gap-4"
                            >
                                <UtilityAction
                                    href="https://wa.me/91XXXXXXXXXX"
                                    label="Direct Chat"
                                    description="Start a secure conversation with our support team instantly."
                                    icon={(
                                        <svg viewBox="0 0 24 24" className="size-full fill-current" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .006 5.408 0 12.045c0 2.121.554 4.191 1.605 6.01L0 24l6.132-1.61a11.816 11.816 0 005.915 1.587h.005c6.635 0 12.043-5.409 12.048-12.047a11.77 11.77 0 00-3.489-8.452" />
                                        </svg>
                                    )}
                                />
                                <UtilityAction
                                    href="mailto:contact@afmotorsport.com"
                                    label="Send Mail"
                                    description="Formulate an inquiry and transmit it to our primary headquarters."
                                    icon={(
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                            <polyline points="22,6 12,13 2,6" />
                                        </svg>
                                    )}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.button
                        whileHover={{ scale: 1.05, translateZ: 0 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(!isOpen)}
                        className={cn(
                            "relative size-12 flex items-center justify-center border-2 border-black-pure transition-all duration-500 group",
                            isOpen
                                ? "bg-black-pure text-white-pure rotate-90 shadow-none"
                                : "bg-primary-500 text-black-pure shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                        )}
                    >
                        <div className="absolute inset-0 border border-white-pure/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {isOpen ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        ) : (
                            <div className="flex flex-col gap-0.5 items-center">
                                <div className="w-5 h-0.5 bg-black-pure" />
                                <div className="w-3 h-0.5 bg-black-pure self-start" />
                                <div className="w-5 h-0.5 bg-black-pure" />
                            </div>
                        )}
                    </motion.button>

                    <ScrollToTop />
                </div>
            </div>
        </>
    )
}