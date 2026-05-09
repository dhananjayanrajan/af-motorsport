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
    const textBase = "font-black uppercase tracking-tighter leading-[0.9] text-xl md:text-xl"

    if (variant === 2) {
        return (
            <div className="group relative overflow-hidden bg-white-pure border-2 border-black-pure hover:translate-x-1 hover:translate-y-1 transition-all duration-300 z-1">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_200px]">
                    <div className="p-4 md:p-6 border-b-2 md:border-b-0 md:border-r-2 border-black-pure flex flex-col justify-between min-h-[300px] bg-white-pure">
                        <div className="flex items-start justify-between mb-8">
                            <span className="text-xs font-black bg-black-pure text-white-pure px-2 py-1 uppercase">{label}</span>
                            <div className="flex gap-1">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="w-4 h-4 border-2 border-black-pure group-hover:bg-primary-500 transition-colors" style={{ transitionDelay: `${i * 100}ms` }} />
                                ))}
                            </div>
                        </div>
                        <h2 className={textBase}>
                            <div className="group-hover:translate-x-2 transition-transform duration-500 text-black-pure">{lineOne}</div>
                            <div className="relative inline-block text-black-pure group-hover:translate-x-6 transition-transform duration-500 py-1">
                                {highlight}
                                <div className="absolute inset-0 bg-primary-500 -z-10 group-hover:scale-x-110 transition-transform origin-left" />
                            </div>
                            <div className="group-hover:-translate-y-1 transition-transform duration-700 text-black-pure">{lineTwo}</div>
                        </h2>
                    </div>
                    <div className="bg-secondary-500 p-6 flex flex-col items-center justify-center relative overflow-hidden group-hover:bg-primary-500 transition-colors duration-700">
                        <div className="relative z-10 font-black text-xl text-black-pure group-hover:rotate-180 transition-transform duration-1000">
                            +
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (variant === 3) {
        return (
            <div className="group grid grid-cols-1 md:grid-cols-12 border-2 border-black-pure bg-white-pure z-1">
                <div className="md:col-span-1 bg-black-pure flex md:flex-col items-center justify-center p-3 gap-4">
                    <span className="md:[writing-mode:vertical-lr] md:rotate-180 font-black text-white-pure tracking-[0.3em] text-xs uppercase">{label}</span>
                    <div className="hidden md:block h-24 w-[2px] bg-white-pure" />
                </div>
                <div className="md:col-span-11 p-6 md:p-10 relative overflow-hidden bg-white-pure">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500 -translate-y-12 translate-x-12 rotate-45 group-hover:scale-[15] group-hover:rotate-0 transition-transform duration-[1s] ease-in-out -z-0" />
                    <h2 className={`${textBase} relative z-10 text-black-pure`}>
                        <span className="block mb-2 group-hover:italic transition-all duration-500">{highlight}</span>
                        <div className="flex items-center gap-4">
                            <div className="h-[2px] w-0 group-hover:w-16 bg-secondary-500 transition-all duration-700" />
                            <span className="text-black-pure">{lineOne}</span>
                        </div>
                        <span className="block mt-2 text-black-pure">{lineTwo}</span>
                    </h2>
                </div>
            </div>
        )
    }

    if (variant === 4) {
        return (
            <div className="group bg-black-pure p-1 hover:p-0 transition-all duration-500 z-1">
                <div className="bg-white-pure border-2 border-black-pure p-6 md:p-12 relative overflow-hidden">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between border-b-2 border-black-pure pb-4">
                            <div className="w-6 h-6 bg-primary-500 group-hover:rounded-full transition-all duration-700" />
                            <span className="text-xs font-black tracking-widest text-black-pure uppercase">{label}</span>
                        </div>
                        <h2 className={textBase}>
                            <span className="inline-block bg-black-pure text-white-pure px-3 py-1 group-hover:bg-primary-500 group-hover:text-black-pure transition-colors duration-300">{lineOne}</span>
                            <div className="flex flex-col md:flex-row md:items-baseline gap-2 mt-4">
                                <span className="text-secondary-500 group-hover:text-primary-500 transition-colors duration-500">{highlight}</span>
                                <span className="text-sm font-bold text-black-pure uppercase tracking-normal">{lineTwo}</span>
                            </div>
                        </h2>
                    </div>
                    <div className="mt-8 flex justify-end">
                        <div className="w-10 h-10 border-2 border-black-pure flex items-center justify-center group-hover:bg-black-pure group-hover:text-white-pure transition-all duration-500">
                            <span className="text-lg">→</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (variant === 5) {
        return (
            <div className="group flex flex-col items-center text-center py-12 md:py-20 px-6 bg-white-pure border-2 border-black-pure relative overflow-hidden z-1">
                <div className="absolute top-0 left-0 w-full h-1 bg-black-pure group-hover:h-4 transition-all duration-500" />
                <span className="mb-8 text-xs font-black tracking-[0.5em] text-black-pure uppercase">{label}</span>
                <h2 className={`${textBase} flex flex-col items-center gap-2`}>
                    <span className="relative inline-block text-black-pure">
                        {lineOne}
                        <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-black-pure scale-x-100 group-hover:scale-x-0 transition-transform duration-500" />
                    </span>
                    <span className="bg-primary-500 px-4 py-1 text-black-pure group-hover:bg-secondary-500 group-hover:text-white-pure transition-all duration-500 transform group-hover:-rotate-2">
                        {highlight}
                    </span>
                    <span className="text-black-pure">
                        {lineTwo}
                    </span>
                </h2>
                <div className="mt-12 flex gap-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="w-8 h-8 border-2 border-black-pure flex items-center justify-center text-xs font-black hover:bg-primary-500 transition-all cursor-crosshair">
                            0{i}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="group relative bg-white-pure p-8 md:p-12 border-2 border-black-pure overflow-hidden z-1">
            <div className="absolute top-0 left-0 w-full h-full bg-primary-500 translate-y-full group-hover:translate-y-[95%] transition-transform duration-700 ease-in-out" />
            <div className="relative z-10">
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-10 h-10 bg-black-pure flex items-center justify-center text-white-pure text-sm font-black group-hover:rotate-45 transition-transform duration-500">
                        {label.charAt(0)}
                    </div>
                    <div className="h-[2px] flex-1 bg-black-pure" />
                    <span className="font-black text-xs uppercase tracking-widest text-black-pure">{label}</span>
                </div>
                <h2 className={textBase}>
                    <div className="group-hover:translate-x-4 transition-transform duration-500 flex items-center gap-3 text-black-pure">
                        <span className="text-primary-500">■</span> {lineOne}
                    </div>
                    <div className="relative inline-block my-4">
                        <span className="relative z-10 px-2 text-black-pure group-hover:text-white-pure transition-colors duration-300">
                            {highlight}
                        </span>
                        <div className="absolute inset-0 bg-black-pure scale-y-0 group-hover:scale-y-100 transition-transform duration-400 origin-bottom" />
                    </div>
                    <div className="text-black-pure group-hover:text-primary-500 transition-all duration-700 text-sm md:text-xl font-normal lowercase italic">
                        {lineTwo}
                    </div>
                </h2>
            </div>
        </div>
    )
}

export default SectionTitle