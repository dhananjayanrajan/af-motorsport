"use client"
import React from 'react';

interface SectionFooterProps {
    variant?: 1 | 2 | 3 | 4 | 5
    links?: Array<{ label: string; href: string }>
}

const SectionFooter: React.FC<SectionFooterProps> = ({
    variant = 1,
    links = [],
}) => {
    const textStyle = "text-xs font-black uppercase tracking-[0.2em]"

    if (variant === 2) {
        return (
            <footer className="w-full border-t-8 border-black-pure bg-primary-500 grid grid-cols-1 md:grid-cols-4 group z-1">
                <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 border-b md:border-b-0 md:border-r-8 border-black-pure bg-white-pure">
                    {links.map((link, idx) => (
                        <a key={idx} href={link.href} className={`${textStyle} p-8 border-r border-black-pure last:border-r-0 hover:bg-primary-500 hover:text-white-pure transition-all duration-300 flex items-center justify-center text-center text-black-pure`}>
                            {link.label}
                        </a>
                    ))}
                </div>
                <div className="p-8 bg-black-pure flex items-center justify-center overflow-hidden">
                    <div className="flex gap-3 group-hover:scale-110 transition-transform duration-500">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-4 h-4 bg-primary-500" style={{ animationDelay: `${i * 150}ms` }} />
                        ))}
                    </div>
                </div>
            </footer>
        )
    }

    if (variant === 3) {
        return (
            <footer className="w-full bg-white-pure flex items-stretch min-h-[100px] border-t border-black-pure group z-1">
                <div className="flex-1 p-8 flex items-center bg-white-pure border-r border-black-pure">
                    <div className="flex flex-wrap gap-8">
                        {links.map((link, idx) => (
                            <a key={idx} href={link.href} className={`${textStyle} text-black-pure hover:text-primary-500 transition-colors relative group/link`}>
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 group-hover/link:w-full transition-all" />
                            </a>
                        ))}
                    </div>
                </div>
                <div className="hidden lg:flex flex-1 items-center px-10 gap-1 bg-white-pure z-1">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="flex-1 h-1 bg-black-pure group-hover:h-8 group-hover:bg-secondary-500 transition-all duration-500" style={{ transitionDelay: `${i * 30}ms` }} />
                    ))}
                </div>
                <div className="w-24 bg-secondary-500 flex items-center justify-center group-hover:bg-black-pure transition-colors duration-500">
                    <div className="w-6 h-6 border-2 border-white-pure border-t-white-pure animate-spin" />
                </div>
            </footer>
        )
    }

    if (variant === 4) {
        return (
            <footer className="w-full py-16 px-10 bg-black-pure relative group overflow-hidden z-1">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500" />
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
                        {links.map((link, idx) => (
                            <a key={idx} href={link.href} className={`${textStyle} text-white-pure hover:text-secondary-500 transition-colors`}>
                                {link.label}
                            </a>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black text-white-pure uppercase tracking-[0.4em]">Status: Active</span>
                        <div className="flex gap-1.5">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-1.5 h-6 bg-primary-500 group-hover:bg-white-pure transition-colors" style={{ transitionDelay: `${i * 100}ms` }} />
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        )
    }

    if (variant === 5) {
        return (
            <footer className="w-full bg-white-pure border-t border-black-pure z-1">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">
                    <div className="p-12 flex items-center justify-center md:justify-start bg-white-pure">
                        <div className="flex flex-wrap gap-10">
                            {links.map((l, i) => (
                                <a key={i} href={l.href} className={`${textStyle} text-black-pure hover:text-primary-500 transition-colors`}>{l.label}</a>
                            ))}
                        </div>
                    </div>
                    <div className="p-1 border-l border-black-pure bg-white-pure flex flex-col">
                        <div className="flex-1 p-8 flex items-center justify-center group">
                            <div className="w-full max-w-xs space-y-4">
                                <div className="flex justify-between text-[9px] font-black text-black-pure uppercase">
                                    <span>System Load</span>
                                    <span>99%</span>
                                </div>
                                <div className="h-1 bg-black-pure overflow-hidden">
                                    <div className="h-full bg-primary-500 w-1/4 group-hover:w-full transition-all duration-[2000ms] ease-in-out" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }

    return (
        <footer className="w-full h-24 flex items-stretch border-t-2 border-black-pure bg-white-pure group z-1">
            <div className="w-24 bg-primary-500 flex items-center justify-center relative overflow-hidden">
                <div className="w-8 h-8 border-4 border-white-pure border-t-white-pure rotate-45 group-hover:rotate-[225deg] transition-transform duration-700" />
            </div>
            <div className="flex-1 flex items-center px-12 bg-white-pure">
                <div className="flex gap-10">
                    {links.map((link, idx) => (
                        <a key={idx} href={link.href} className={`${textStyle} text-black-pure hover:text-primary-500 transition-colors relative`}>
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
            <div className="px-12 bg-secondary-500 flex items-center border-l-2 border-black-pure">
                <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 bg-black-pure animate-bounce [animation-duration:0.8s]" />
                    <div className="w-2.5 h-2.5 bg-black-pure animate-bounce [animation-duration:0.8s] [animation-delay:0.2s]" />
                    <div className="w-2.5 h-2.5 bg-black-pure animate-bounce [animation-duration:0.8s] [animation-delay:0.4s]" />
                </div>
            </div>
        </footer>
    )
}

export default SectionFooter