"use client"
import React from 'react'

interface SectionTitleProps {
    label: string
    lineOne: string
    lineTwo: string
    highlight: string
    variant?: 1 | 2 | 3 | 4 | 5
}

const SectionTitle: React.FC<SectionTitleProps> = ({
    label,
    lineOne,
    lineTwo,
    highlight,
    variant = 1
}) => {
    const textBase = "font-black uppercase tracking-tighter leading-[0.9] text-2xl"

    if (variant === 2) {
        return (
            <div className="group grid grid-cols-[1fr_auto] gap-0 border-2 border-black-pure">
                <div className="p-4 border-r-2 border-black-pure bg-white-pure group-hover:bg-primary-500 transition-colors duration-500">
                    <h2 className={textBase}>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs tracking-[0.4em] font-bold opacity-30">{label}</span>
                        </div>
                        <div className="mb-1">{lineOne}</div>
                        <div className="bg-black-pure text-white-pure px-1 inline-block mb-1 group-hover:bg-secondary-500 group-hover:text-black-pure transition-colors">{highlight}</div>
                        <div>{lineTwo}</div>
                    </h2>
                </div>
                <div className="w-12 flex items-center justify-center bg-black-pure overflow-hidden">
                    <div className="flex flex-col gap-1 group-hover:animate-bounce">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-2 h-2 bg-primary-500 rounded-full" />
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    if (variant === 3) {
        return (
            <div className="group relative border-4 border-black-pure p-0 overflow-hidden">
                <div className="bg-black-pure p-2 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-white-pure tracking-widest">{label}</span>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary-500" />
                        <div className="w-2 h-2 bg-secondary-500" />
                    </div>
                </div>
                <div className="p-6 bg-white-pure relative">
                    <h2 className={`${textBase} text-black-pure relative z-10`}>
                        <span className="block italic text-primary-500 group-hover:not-italic transition-all">{highlight}</span>
                        <span className="block group-hover:translate-x-4 transition-transform">{lineOne}</span>
                        <span className="block opacity-20 group-hover:opacity-100 transition-opacity">{lineTwo}</span>
                    </h2>
                    <div className="absolute top-0 right-0 w-full h-full bg-neutral-100 translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                </div>
            </div>
        )
    }

    if (variant === 4) {
        return (
            <div className="group grid grid-cols-[60px_1fr] border-b-8 border-black-pure">
                <div className="bg-primary-500 flex items-center justify-center border-r-2 border-black-pure">
                    <span className="font-black -rotate-90 text-sm">0{variant}</span>
                </div>
                <div className="p-6 bg-white-pure group-hover:bg-neutral-50 transition-colors">
                    <p className="text-[10px] font-black mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-black-pure" /> {label}
                    </p>
                    <h2 className={textBase}>
                        <span className="text-secondary-500 underline decoration-black-pure decoration-2 underline-offset-4">{highlight}</span>
                        <div className="mt-2 flex flex-col">
                            <span>{lineOne}</span>
                            <span>{lineTwo}</span>
                        </div>
                    </h2>
                </div>
            </div>
        )
    }

    if (variant === 5) {
        return (
            <div className="group border-2 border-black-pure p-1 hover:p-2 transition-all duration-300">
                <div className="border border-black-pure p-6 flex flex-col gap-6">
                    <div className="flex justify-between items-start">
                        <div className="h-px flex-1 bg-black-pure/20 mt-2" />
                        <span className="px-4 text-xs font-black italic">{label}</span>
                    </div>
                    <h2 className={textBase}>
                        <div className="flex gap-2 items-baseline">
                            <span className="text-primary-500">{highlight}</span>
                            <span className="text-sm opacity-40">{lineOne}</span>
                        </div>
                        <div className="group-hover:tracking-widest transition-all duration-500">{lineTwo}</div>
                    </h2>
                </div>
            </div>
        )
    }

    return (
        <div className="group relative pt-10 px-6 border-2 border-black-pure bg-white-pure hover:shadow-[8px_8px_0px_#000] transition-all">
            <div className="absolute top-0 left-0 w-full h-8 bg-black-pure flex items-center px-4">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-1" />
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1" />
                <div className="w-2 h-2 bg-green-500 rounded-full" />
            </div>
            <h2 className={`${textBase} py-6`}>
                <span className="block text-primary-500 group-hover:translate-x-2 transition-transform">{highlight}</span>
                <span className="block border-b-4 border-secondary-500 w-fit">{lineOne}</span>
                <span className="block opacity-30">{lineTwo}</span>
            </h2>
            <div className="absolute bottom-2 right-2 text-[10px] font-black">{label}</div>
        </div>
    )
}

export default SectionTitle