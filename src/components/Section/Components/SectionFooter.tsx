// SectionFooter.tsx
"use client"
import React from 'react';

interface SectionFooterProps {
    variant?: 1 | 2 | 3 | 4 | 5
    links?: Array<{ label: string; href: string }>
    onScrollTop?: () => void
}

const SectionFooter: React.FC<SectionFooterProps> = ({
    variant = 1,
    links = [],
    onScrollTop
}) => {
    const buttonBase = "font-bold transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary-500"

    if (variant === 2) {
        return (
            <footer className="w-full border-t border-black-pure bg-white-pure p-6 flex flex-wrap gap-4">
                {links.map((link, idx) => (
                    <a
                        key={idx}
                        href={link.href}
                        className={`${buttonBase} flex-1 min-w-[120px] border border-black-pure bg-white-pure p-4 text-base text-black-pure hover:bg-primary-500 hover:border-black-pure transition-all duration-300 text-center relative overflow-hidden group`}
                    >
                        <span className="relative z-10">{link.label}</span>
                        <div className="absolute bottom-0 left-0 h-0.5 w-full bg-black-pure transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100" />
                    </a>
                ))}
            </footer>
        )
    }

    if (variant === 3) {
        return (
            <footer className="w-full border-t border-black-pure flex overflow-hidden">
                <div className="flex-1 p-6 bg-primary-500 border-r border-black-pure flex items-center justify-between transition-all duration-300 hover:bg-black-pure group">
                    <p className="font-bold text-base text-black-pure transition-colors duration-300 group-hover:text-white-pure">ACTIVE SESSION</p>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 bg-black-pure transition-all duration-300 group-hover:bg-white-pure" />
                        <div className="w-2 h-2 bg-black-pure transition-all duration-300 group-hover:bg-white-pure delay-75" />
                        <div className="w-2 h-2 bg-black-pure transition-all duration-300 group-hover:bg-white-pure delay-150" />
                    </div>
                </div>
                <button
                    onClick={onScrollTop}
                    className="w-20 bg-black-pure flex items-center justify-center transition-all duration-300 hover:bg-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500 relative overflow-hidden group"
                >
                    <div className="w-5 h-5 border-t-2 border-l-2 border-white-pure rotate-45 transition-all duration-300 group-hover:border-black-pure relative z-10" />
                    <div className="absolute inset-0 bg-primary-500 transition-transform duration-500 -translate-y-full group-hover:translate-y-0" />
                </button>
            </footer>
        )
    }

    if (variant === 4) {
        return (
            <footer className="w-full border-t border-black-pure bg-white-pure p-6 flex flex-col gap-4">
                <div className="flex flex-wrap gap-4 justify-center">
                    {links.slice(0, 3).map((link, idx) => (
                        <a
                            key={idx}
                            href={link.href}
                            className={`${buttonBase} px-6 py-2 text-base text-black-pure/60 hover:text-primary-500 transition-colors duration-300`}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
                <div className="flex justify-center gap-2 pt-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-1.5 h-1.5 bg-black-pure/20 transition-all duration-300 hover:bg-primary-500 hover:w-3" />
                    ))}
                </div>
            </footer>
        )
    }

    if (variant === 5) {
        return (
            <footer className="w-full border-t border-black-pure flex items-stretch h-16">
                <div className="flex-1 bg-white-pure flex items-center px-6 transition-all duration-300 hover:bg-primary-500 group">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary-500 transition-all duration-300 group-hover:bg-black-pure" />
                        <span className="text-base text-black-pure/60 transition-colors duration-300 group-hover:text-black-pure">SYSTEM ONLINE</span>
                    </div>
                </div>
                <div className="w-px bg-black-pure" />
                <div className="flex-1 bg-white-pure flex items-center justify-end px-6 transition-all duration-300 hover:bg-secondary-500 group">
                    <div className="flex items-center gap-3">
                        <span className="text-base text-black-pure/60 transition-colors duration-300 group-hover:text-black-pure">v2.0.1</span>
                        <div className="w-2 h-2 bg-secondary-500 transition-all duration-300 group-hover:bg-black-pure" />
                    </div>
                </div>
                <button
                    onClick={onScrollTop}
                    className="w-16 bg-black-pure flex items-center justify-center transition-all duration-300 hover:bg-primary-500 group"
                >
                    <div className="w-2 h-2 bg-white-pure transition-all duration-300 group-hover:bg-black-pure group-hover:rotate-45" />
                </button>
            </footer>
        )
    }

    return (
        <footer className="w-full border-t border-black-pure bg-white-pure flex items-stretch h-16 overflow-hidden">
            <div className="flex-1 bg-secondary-500 border-r border-black-pure relative overflow-hidden transition-all duration-300 hover:flex-[2] group">
                <div className="absolute inset-0 bg-black-pure transition-transform duration-500 -translate-x-full group-hover:translate-x-0" />
            </div>
            <div className="flex-1 bg-primary-500 border-r border-black-pure relative overflow-hidden transition-all duration-300 hover:flex-[2] group">
                <div className="absolute inset-0 bg-black-pure transition-transform duration-500 -translate-y-full group-hover:translate-y-0" />
            </div>
            <div className="flex-1 bg-black-pure relative overflow-hidden transition-all duration-300 hover:flex-[2] group">
                <div className="absolute inset-0 bg-primary-500 transition-transform duration-500 scale-x-0 group-hover:scale-x-100 origin-left" />
            </div>
        </footer>
    )
}

export default SectionFooter