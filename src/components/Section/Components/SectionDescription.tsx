"use client"
import React from 'react'

interface SectionDescriptionProps {
    text: string
    variant?: 1 | 2 | 3 | 4 | 5
}

const SectionDescription: React.FC<SectionDescriptionProps> = ({ text, variant = 1 }) => {
    const pBase = "text-xs md:text-xl font-black leading-[1.1] uppercase tracking-tighter"

    if (variant === 2) {
        return (
            <div className="group relative overflow-hidden bg-white-pure border-[1px] border-black-pure">
                <div className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr] min-h-[140px]">
                    <div className="bg-black-pure flex flex-col justify-between p-4 group-hover:bg-primary-500 transition-colors duration-700">
                        <div className="w-full aspect-square border-[1px] border-white-pure group-hover:border-black-pure group-hover:rotate-45 transition-all duration-500" />
                        <div className="flex flex-col gap-1.5">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-[2px] w-full bg-white-pure group-hover:bg-black-pure transition-colors" />
                            ))}
                        </div>
                    </div>
                    <div className="p-6 md:p-10 flex items-center relative overflow-hidden">
                        <p className={`${pBase} text-black-pure z-10 group-hover:translate-x-6 transition-transform duration-500`}>
                            {text}
                        </p>
                        <div className="absolute inset-0 bg-secondary-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />
                        <div className="absolute top-0 right-0 w-2 h-full bg-tertiary-500 group-hover:w-8 transition-all duration-500" />
                    </div>
                </div>
            </div>
        )
    }

    if (variant === 3) {
        return (
            <div className="group relative">
                <div className="absolute inset-0 border-[1px] border-black-pure translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300" />
                <div className="relative border-[1px] border-black-pure bg-white-pure p-6 md:p-12 hover:bg-neutral-50 transition-colors duration-500">
                    <div className="mb-8 flex items-center justify-between">
                        <div className="flex gap-1">
                            <div className="h-4 w-4 bg-black-pure group-hover:bg-tertiary-500 transition-colors" />
                            <div className="h-4 w-4 bg-black-pure group-hover:bg-secondary-500 transition-colors" />
                            <div className="h-4 w-4 bg-black-pure group-hover:bg-primary-500 transition-colors" />
                        </div>
                        <div className="h-[1px] w-12 bg-black-pure group-hover:w-24 transition-all duration-700" />
                    </div>
                    <p className={`${pBase} text-black-pure group-hover:text-tertiary-600 transition-colors duration-500`}>
                        {text}
                    </p>
                </div>
            </div>
        )
    }

    if (variant === 4) {
        return (
            <div className="group border-[1px] border-black-pure bg-white-pure hover:bg-black-pure transition-colors duration-700">
                <div className="p-8 md:p-16 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                        <div className="absolute inset-0 bg-[radial-gradient(circle,var(--black-pure)_1px,transparent_1px)] [background-size:20px_20px] group-hover:scale-150 transition-transform duration-1000" />
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="w-12 h-1 bg-black-pure group-hover:bg-primary-500 group-hover:w-full transition-all duration-700" />
                        <p className={`${pBase} text-black-pure group-hover:text-white-pure relative z-10 transition-colors duration-500`}>
                            {text}
                        </p>
                    </div>
                    <div className="absolute bottom-4 right-4 text-xs font-black text-black-pure group-hover:text-white-pure opacity-20 group-hover:opacity-100 transition-all">
                        // 00.DESC
                    </div>
                </div>
            </div>
        )
    }

    if (variant === 5) {
        return (
            <div className="group grid grid-cols-1 md:grid-cols-[1fr_100px] border-[1px] border-black-pure bg-white-pure">
                <div className="p-6 md:p-12 flex items-center bg-white-pure group-hover:bg-neutral-100 transition-colors duration-500">
                    <p className={`${pBase} text-black-pure group-hover:translate-y-[-4px] transition-transform duration-500`}>
                        {text}
                    </p>
                </div>
                <div className="border-t-[1px] md:border-t-0 md:border-l-[1px] border-black-pure p-8 flex items-center justify-center bg-secondary-800 hover:bg-black-pure transition-colors duration-500 cursor-pointer">
                    <div className="text-xl md:text-xl font-black text-white-pure group-hover:scale-150 group-hover:rotate-180 transition-all duration-700">
                        →
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="group relative pt-12 px-6 pb-8 md:pt-16 md:px-10 md:pb-10 border-[1px] border-black-pure bg-white-pure shadow-[8px_8px_0px_var(--black-pure)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-8 md:h-10 border-b-[1px] border-black-pure bg-black-pure flex items-center justify-between px-4">
                <div className="flex gap-2">
                    <div className="h-2 w-2 rounded-full bg-white-pure group-hover:bg-primary-500 transition-colors" />
                    <div className="h-2 w-2 rounded-full bg-white-pure group-hover:bg-secondary-500 transition-colors" />
                </div>
                <div className="text-[10px] font-mono text-white-pure opacity-40 group-hover:opacity-100 transition-opacity">
                    SYSTEM_v2.0
                </div>
            </div>
            <p className={`${pBase} text-black-pure group-hover:text-primary-700 transition-colors duration-500`}>
                {text}
            </p>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-black-pure translate-x-[1px] translate-y-[1px] clip-path-triangle group-hover:scale-0 transition-transform duration-500" />
        </div>
    )
}

export default SectionDescription