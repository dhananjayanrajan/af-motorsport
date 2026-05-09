"use client"
import React from 'react'

interface SectionCTAProps {
    label: string
    path: string
    description?: string
    onClick?: () => void
    buttonBgColor?: string
    buttonTextColor?: string
    variant?: 1 | 2 | 3 | 4 | 5
    infoLabel?: string
    directoryLabel?: string
    proceedLabel?: string
}

const SectionCTA: React.FC<SectionCTAProps> = ({
    label,
    path,
    description,
    onClick,
    buttonBgColor = "bg-black-pure",
    buttonTextColor = "text-white-pure",
    variant = 1,
    infoLabel = "",
    directoryLabel = "",
    proceedLabel = ""
}) => {
    const textBase = "font-black uppercase tracking-tighter"

    if (variant === 2) {
        return (
            <div className="w-full mt-20 group relative z-1">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-black-pure px-2 py-1 border-l-2 border-black-pure bg-white-pure">
                        {directoryLabel} {path}
                    </span>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary-500" />
                        <div className="w-2 h-2 bg-secondary-500" />
                        <div className="w-2 h-2 bg-black-pure" />
                    </div>
                </div>
                <button
                    onClick={onClick}
                    className="w-full grid grid-cols-1 md:grid-cols-[1fr_120px] items-stretch border-2 border-black-pure hover:shadow-[12px_12px_0px_0px_var(--primary-500)] transition-all duration-300 active:translate-x-1 active:translate-y-1 active:shadow-none"
                >
                    <div className="bg-white-pure p-6 md:p-8 text-left border-b-2 md:border-b-0 md:border-r-2 border-black-pure">
                        <h2 className={`${textBase} text-xl text-black-pure mb-3 break-words`}>{label}</h2>
                        {description && <p className="text-sm font-bold text-black-pure leading-none max-w-2xl break-words">{description}</p>}
                    </div>
                    <div className="bg-black-pure flex items-center justify-center group-hover:bg-primary-500 transition-colors duration-300 py-6 md:py-0">
                        <svg className="w-12 h-12 text-white-pure group-hover:text-black-pure group-hover:rotate-45 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeWidth={3} d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                    </div>
                </button>
            </div>
        )
    }

    if (variant === 3) {
        return (
            <div className="mt-20 border-t-4 border-black-pure pt-12 relative group overflow-hidden bg-white-pure z-1">
                <div className="absolute top-0 right-0 h-full w-1/3 bg-primary-500 -skew-x-12 translate-x-full group-hover:translate-x-1/2 transition-transform duration-1000" />
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 relative z-10">
                    <div className="max-w-xl">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <div className="w-4 h-4 bg-black-pure" />
                            <span className="text-xs font-black text-primary-500 underline decoration-2">{proceedLabel}</span>
                        </div>
                        <p className="text-lg font-black text-black-pure leading-none mb-6 break-words">{description}</p>
                    </div>
                    <button
                        onClick={onClick}
                        className={`${textBase} text-xl bg-black-pure text-white-pure px-8 py-6 hover:bg-primary-500 hover:text-black-pure transition-all flex items-center gap-6 self-start md:self-end`}
                    >
                        {label}
                        <span className="block w-8 h-[2px] bg-white-pure group-hover:w-16 group-hover:bg-black-pure transition-all duration-500" />
                    </button>
                </div>
            </div>
        )
    }

    if (variant === 4) {
        return (
            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_350px] border-4 border-black-pure bg-white-pure gap-1 z-1">
                <div className="bg-white-pure p-8 flex flex-col justify-between">
                    <div className="mb-10">
                        <div className="flex items-center gap-1 mb-6">
                            {[...Array(4)].map((_, i) => <div key={i} className="w-1.5 h-6 bg-secondary-500" />)}
                            <span className="ml-2 text-xs font-black text-black-pure">{infoLabel}</span>
                        </div>
                        <p className="text-xl font-black text-black-pure leading-none uppercase break-words">{description}</p>
                    </div>
                    <div className="h-2 w-full bg-white-pure relative overflow-hidden border border-black-pure">
                        <div className="absolute inset-y-0 left-0 bg-secondary-500 w-1/4 group-hover:w-full transition-all duration-700" />
                    </div>
                </div>
                <button
                    onClick={onClick}
                    className="bg-secondary-500 p-8 flex flex-col items-start justify-between group/btn hover:bg-primary-500 transition-colors duration-300 min-h-[250px]"
                >
                    <span className="text-[10px] font-black bg-black-pure text-white-pure px-2 py-0.5 mb-8">{path}</span>
                    <div className="w-full">
                        <h2 className={`${textBase} text-xl text-black-pure mb-4 break-words`}>{label}</h2>
                        <div className="flex gap-2">
                            <div className="flex-1 h-10 border-2 border-black-pure flex items-center justify-center group-hover/btn:bg-black-pure group-hover/btn:text-primary-500 transition-colors text-xs font-black">
                                {label}
                            </div>
                        </div>
                    </div>
                </button>
            </div>
        )
    }

    if (variant === 5) {
        return (
            <div className="mt-20 flex flex-col items-center bg-white-pure z-1">
                <div className="grid grid-cols-3 gap-1 w-12 mb-6">
                    {[...Array(9)].map((_, i) => (
                        <div key={i} className="w-3 h-3 bg-black-pure group-hover:bg-primary-500 transition-colors" />
                    ))}
                </div>
                <div className="text-center max-w-lg px-4">
                    <span className="text-[10px] font-black text-primary-500 mb-2 block tracking-[0.2em]">{path}</span>
                    <h2 className={`${textBase} text-xl mb-4 text-black-pure border-b-4 border-black-pure inline-block`}>{label}</h2>
                    <p className="text-sm font-bold text-black-pure mb-10 leading-none break-words">{description}</p>
                </div>
                <button
                    onClick={onClick}
                    className={`${textBase} text-sm relative px-12 py-5 bg-white-pure border-2 border-black-pure overflow-hidden group/btn hover:translate-x-1 hover:translate-y-1 transition-all`}
                >
                    <span className="relative z-10 text-black-pure group-hover/btn:text-white-pure transition-colors">
                        {label}
                    </span>
                    <div className="absolute inset-0 bg-black-pure translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                </button>
            </div>
        )
    }

    return (
        <div className="mt-20 border-[12px] border-black-pure bg-white-pure group z-1">
            <div className="p-6 md:p-12 flex flex-col md:flex-row items-stretch md:items-center gap-12 border-2 border-black-pure m-2 bg-white-pure">
                <div className="flex-1 space-y-4">
                    <div className="flex gap-2">
                        <div className="w-12 h-2 bg-primary-500" />
                        <div className="w-4 h-2 bg-black-pure" />
                    </div>
                    <h2 className={`${textBase} text-xl md:text-xl text-black-pure leading-none break-words`}>{label}</h2>
                    <p className="text-sm font-bold text-black-pure max-w-xl break-words uppercase">{description}</p>
                </div>
                <button
                    onClick={onClick}
                    className="shrink-0 aspect-square w-24 md:w-32 bg-primary-500 border-4 border-black-pure flex items-center justify-center hover:bg-black-pure transition-all duration-300 group/icon"
                >
                    <div className="relative w-10 h-10">
                        <span className="absolute inset-0 border-t-4 border-r-4 border-black-pure group-hover/icon:border-primary-500 transition-colors" />
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-black-pure group-hover/icon:bg-primary-500 group-hover/icon:translate-y-[-18px] transition-all" />
                    </div>
                </button>
            </div>
        </div>
    )
}

export default SectionCTA