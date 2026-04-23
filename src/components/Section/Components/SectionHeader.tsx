"use client"
import React from 'react'
import WeaveBackground from '../Backgrounds/WeaveBackground'

interface SectionHeaderProps {
    title: string
    subtitle: string
    variant?: 1 | 2 | 3
    metadata?: string
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    subtitle,
    variant = 1,
    metadata
}) => {
    const baseStyles = {
        heading: "font-black uppercase tracking-tighter leading-none",
        subheading: "font-mono font-black uppercase tracking-widest",
        metadata: "font-mono font-black text-center"
    }

    if (variant === 2) {
        return (
            <header className="w-full border-2 border-black-pure flex flex-col md:flex-row items-stretch overflow-hidden transition-all duration-300 group">

                <div className="p-6 sm:p-8 border-b md:border-b-0 md:border-r-2 border-black-pure bg-primary-500 flex-1 relative overflow-hidden">
                    <div className="absolute -top-8 -right-8 size-20 bg-black-pure rotate-45 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-500" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="size-2 bg-black-pure animate-pulse" />
                            <span className="text-[10px] font-mono font-black text-black-pure/60 uppercase tracking-widest">ACTIVE</span>
                        </div>
                        <h1 className={`${baseStyles.heading} text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black-pure`}>
                            {title}
                        </h1>
                    </div>
                </div>
                <div className="p-6 sm:p-8 flex-1 bg-white-pure relative overflow-hidden">
                    <div className="absolute -bottom-8 -left-8 size-20 bg-secondary-500 rotate-45 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-500" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-0.5 bg-black-pure" />
                            <span className="text-[10px] font-mono font-black text-black-pure/40 uppercase tracking-widest">DESIGNATION</span>
                        </div>
                        <h2 className={`${baseStyles.heading} text-xl sm:text-2xl md:text-3xl text-black-pure opacity-60`}>
                            {subtitle}
                        </h2>
                    </div>
                </div>
                {metadata && (
                    <div className="w-20 sm:w-24 bg-secondary-500 flex flex-col items-center justify-center border-l-2 border-black-pure relative overflow-hidden group/counter">
                        <div className="absolute inset-0 bg-black-pure transform -translate-y-full group-hover/counter:translate-y-0 transition-transform duration-500" />
                        <div className="relative z-10 text-center">
                            <span className="text-[8px] font-mono font-black text-black-pure/60 uppercase">COUNT</span>
                            <span className={`${baseStyles.metadata} text-lg sm:text-xl md:text-2xl text-black-pure block font-black`}>
                                {metadata}
                            </span>
                        </div>
                    </div>
                )}
            </header>
        )
    }

    if (variant === 3) {
        return (
            <header className="w-full border-2 border-black-pure bg-white-pure grid grid-cols-1 md:grid-cols-4 overflow-hidden group">

                <WeaveBackground opacity={0.2} />

                <div className="col-span-1 md:col-span-3 p-6 sm:p-8 border-b md:border-b-0 md:border-r-2 border-black-pure relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    <div className="flex items-start gap-4">
                        <div className="size-8 bg-primary-500 border border-black-pure flex items-center justify-center shrink-0 mt-1">
                            <div className="size-1.5 bg-black-pure rotate-45" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] font-mono font-black text-primary-500 tracking-widest uppercase">// HEADER</span>
                                <div className="size-1.5 bg-primary-500 animate-pulse" />
                            </div>
                            <h1 className={`${baseStyles.heading} text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black-pure`}>
                                {title}
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="p-6 sm:p-8 bg-primary-500 flex flex-col justify-center relative overflow-hidden group/right">
                    <div className="absolute inset-0 bg-black-pure transform -translate-x-full group-hover/right:translate-x-0 transition-transform duration-500" />
                    <div className="relative z-10">
                        <span className={`${baseStyles.subheading} text-[10px] text-black-pure/60 block mb-1`}>TOTAL UNITS</span>
                        <div className="flex items-baseline gap-2">
                            <span className={`${baseStyles.metadata} text-2xl sm:text-3xl text-black-pure font-black`}>
                                {metadata || '0'}
                            </span>
                            <span className="text-[10px] font-mono font-black text-black-pure/40 uppercase">RECORDS</span>
                        </div>
                    </div>
                </div>
            </header>
        )
    }

    return (
        <header className="w-full border-2 border-black-pure bg-white-pure flex items-stretch overflow-hidden group">
            <div className="w-16 sm:w-20 md:w-24 bg-primary-500 border-r-2 border-black-pure flex flex-col items-center justify-center relative overflow-hidden group/counter">
                <div className="absolute inset-0 bg-black-pure transform -translate-y-full group-hover/counter:translate-y-0 transition-transform duration-500" />
                <div className="relative z-10 text-center">
                    <span className="text-[8px] font-mono font-black text-black-pure/60 uppercase tracking-widest">NO.</span>
                    <span className={`font-mono font-black text-xl sm:text-2xl md:text-3xl text-black-pure block`}>
                        {metadata || '00'}
                    </span>
                </div>
            </div>
            <div className="p-6 sm:p-8 flex-1 relative overflow-hidden">
                <div className="absolute -top-8 -right-8 size-16 bg-secondary-500 rotate-45 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-500" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="flex gap-1">
                            <div className="size-2 bg-primary-500" />
                            <div className="size-2 bg-secondary-500" />
                            <div className="size-2 bg-black-pure" />
                        </div>
                        <p className={`${baseStyles.subheading} text-[10px] sm:text-xs text-black-pure/40`}>
                            {subtitle}
                        </p>
                    </div>
                    <h1 className={`${baseStyles.heading} text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-black-pure`}>
                        {title}
                    </h1>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-full bg-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
        </header>
    )
}

export default SectionHeader