"use client"
import React from 'react';

interface SectionFooterProps {
    variant?: 1 | 2 | 3
    links?: Array<{ label: string; href: string }>
    onScrollTop?: () => void
}

const SectionFooter: React.FC<SectionFooterProps> = ({
    variant = 1,
    links = [],
    onScrollTop
}) => {
    const buttonBase = "font-mono font-black uppercase tracking-widest transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary-500"

    if (variant === 2) {
        return (
            <footer className="w-full border-t-2 border-black-pure bg-white-pure p-6 sm:p-8 flex flex-wrap gap-4">
                {links.map((link, idx) => (
                    <a
                        key={idx}
                        href={link.href}
                        className={`${buttonBase} flex-1 min-w-[120px] border-2 border-black-pure bg-white-pure p-4 text-[10px] text-black-pure hover:bg-primary-500 hover:border-black-pure transition-all duration-300 text-center relative overflow-hidden group`}
                    >
                        <span className="relative z-10">{link.label}</span>
                        <div className="absolute bottom-0 left-0 h-0.5 w-full bg-black-pure scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </a>
                ))}
            </footer>
        )
    }

    if (variant === 3) {
        return (
            <footer className="w-full border-t-2 border-black-pure flex overflow-hidden">
                <div className="flex-1 p-6 sm:p-8 bg-primary-500 border-r-2 border-black-pure flex items-center justify-between group">
                    <p className="font-black uppercase tracking-widest text-[10px] text-black-pure">ACTIVE SESSION</p>
                    <div className="flex gap-1">
                        <div className="size-2 bg-black-pure animate-pulse" />
                        <div className="size-2 bg-black-pure animate-pulse delay-100" />
                        <div className="size-2 bg-black-pure animate-pulse delay-200" />
                    </div>
                </div>
                <button
                    onClick={onScrollTop}
                    className="w-20 sm:w-24 bg-black-pure flex items-center justify-center group cursor-pointer outline-none hover:bg-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 transition-all duration-300 relative overflow-hidden"
                    aria-label="Scroll to top"
                >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-l-2 border-white-pure rotate-45 group-hover:border-black-pure transition-colors duration-300 relative z-10" />
                    <div className="absolute inset-0 bg-primary-500 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
            </footer>
        )
    }

    return (
        <footer className="w-full border-t-2 border-black-pure bg-white-pure flex items-stretch h-12 sm:h-14 md:h-16 overflow-hidden">
            <div className="w-1/2 bg-secondary-500 border-r-2 border-black-pure relative overflow-hidden group">
                <div className="absolute inset-0 bg-black-pure transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </div>
            <div className="w-1/4 bg-primary-500 border-r-2 border-black-pure relative overflow-hidden group">
                <div className="absolute inset-0 bg-black-pure transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </div>
            <div className="w-1/4 bg-black-pure relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
        </footer>
    )
}

export default SectionFooter