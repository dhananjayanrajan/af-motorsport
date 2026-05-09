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
            <div className="group relative overflow-hidden bg-white-pure border-2 border-black-pure z-1">
                <div className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr] min-h-[140px]">
                    <div className="bg-black-pure flex flex-col justify-between p-4 group-hover:bg-primary-500 transition-colors duration-700">
                        <div className="w-full aspect-square border-2 border-white-pure group-hover:border-black-pure group-hover:rotate-45 transition-all duration-500" />
                        <div className="flex flex-col gap-1.5">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-[2px] w-full bg-white-pure group-hover:bg-black-pure transition-colors" />
                            ))}
                        </div>
                    </div>
                    <div className="p-6 md:p-10 flex items-center relative overflow-hidden bg-white-pure">
                        <p className={`${pBase} text-black-pure z-10 group-hover:translate-x-6 transition-transform duration-500`}>
                            {text}
                        </p>
                        <div className="absolute inset-0 bg-secondary-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />
                        <div className="absolute top-0 right-0 w-2 h-full bg-black-pure group-hover:w-8 transition-all duration-500" />
                    </div>
                </div>
            </div>
        )
    }

    if (variant === 3) {
        return (
            <div className="group relative z-1">
                <div className="absolute inset-0 border-2 border-black-pure translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300" />
                <div className="relative border-2 border-black-pure bg-white-pure p-6 md:p-12 transition-colors duration-500">
                    <div className="mb-8 flex items-center justify-between">
                        <div className="flex gap-1">
                            <div className="h-4 w-4 bg-black-pure group-hover:bg-primary-500 transition-colors" />
                            <div className="h-4 w-4 bg-black-pure group-hover:bg-secondary-500 transition-colors" />
                            <div className="h-4 w-4 bg-black-pure group-hover:bg-primary-500 transition-colors" />
                        </div>
                        <div className="h-[2px] w-12 bg-black-pure group-hover:w-24 transition-all duration-700" />
                    </div>
                    <p className={`${pBase} text-black-pure group-hover:text-primary-500 transition-colors duration-500`}>
                        {text}
                    </p>
                </div>
            </div>
        )
    }

    if (variant === 4) {
        return (
            <div className="group border-2 border-black-pure bg-white-pure hover:bg-black-pure transition-colors duration-700 z-1">
                <div className="p-8 md:p-16 relative overflow-hidden">
                    <div className="flex flex-col gap-6">
                        <div className="w-12 h-1 bg-black-pure group-hover:bg-primary-500 group-hover:w-full transition-all duration-700" />
                        <p className={`${pBase} text-black-pure group-hover:text-white-pure relative z-10 transition-colors duration-500`}>
                            {text}
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    if (variant === 5) {
        return (
            <div className="group grid grid-cols-1 md:grid-cols-[1fr_100px] border-2 border-black-pure bg-white-pure z-1">
                <div className="p-6 md:p-12 flex items-center bg-white-pure transition-colors duration-500">
                    <p className={`${pBase} text-black-pure group-hover:translate-y-[-4px] transition-transform duration-500`}>
                        {text}
                    </p>
                </div>
                <div className="border-t-2 md:border-t-0 md:border-l-2 border-black-pure p-8 flex items-center justify-center bg-secondary-500 hover:bg-black-pure transition-colors duration-500 cursor-pointer">
                    <div className="text-xl md:text-xl font-black text-white-pure group-hover:scale-150 group-hover:rotate-180 transition-all duration-700">
                        →
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="group relative pt-12 px-6 pb-8 md:pt-16 md:px-10 md:pb-10 border-2 border-black-pure bg-white-pure hover:translate-x-1 hover:translate-y-1 transition-all duration-300 z-1">
            <div className="absolute top-0 left-0 w-full h-8 md:h-10 border-b-2 border-black-pure bg-black-pure flex items-center justify-between px-4">
                <div className="flex gap-2">
                    <div className="h-2 w-2 bg-white-pure group-hover:bg-primary-500 transition-colors" />
                    <div className="h-2 w-2 bg-white-pure group-hover:bg-secondary-500 transition-colors" />
                </div>
                <div className="text-[10px] font-mono text-white-pure">
                    Details
                </div>
            </div>
            <p className={`${pBase} text-black-pure group-hover:text-primary-500 transition-colors duration-500`}>
                {text}
            </p>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-black-pure translate-x-[1px] translate-y-[1px] group-hover:scale-0 transition-transform duration-500" />
        </div>
    )
}

export default SectionDescription