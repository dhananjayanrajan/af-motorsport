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
    const textStyle = "text-base font-black uppercase tracking-tighter"

    if (variant === 2) {
        return (
            <footer className="w-full border-t-4 border-black-pure bg-primary-500 grid grid-cols-1 md:grid-cols-4 group z-1">
                <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 border-b md:border-b-0 md:border-r-4 border-black-pure bg-white-pure">
                    {links.map((link, idx) => (
                        <a key={idx} href={link.href} className={`${textStyle} p-6 border-r border-black-pure last:border-r-0 hover:bg-black-pure hover:text-white-pure transition-all duration-300 flex items-center justify-center text-center`}>
                            {link.label}
                        </a>
                    ))}
                </div>
                <div className="p-6 bg-secondary-500 flex items-center justify-center overflow-hidden">
                    <div className="flex gap-2 group-hover:rotate-180 transition-transform duration-700">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-3 h-3 bg-black-pure animate-bounce" style={{ animationDelay: `${i * 100}ms` }} />
                        ))}
                    </div>
                </div>
            </footer>
        )
    }

    if (variant === 3) {
        return (
            <footer className="w-full border-t-2 border-black-pure bg-neutral-100 flex items-stretch h-24 overflow-hidden group z-1">
                <div className="flex-1 p-6 flex flex-col justify-center border-r-2 border-black-pure relative overflow-hidden">
                    <div className="absolute inset-0 bg-secondary-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <div className="relative z-10 flex gap-6">
                        {links.map((link, idx) => (
                            <a key={idx} href={link.href} className={textStyle}>
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
                <div className="flex flex-[2] border-r-2 border-black-pure items-center px-10 gap-2 bg-black-pure">
                    {[...Array(15)].map((_, i) => (
                        <div key={i} className="flex-1 h-8 bg-primary-500/20 group-hover:bg-primary-500 transition-all duration-300" style={{ transitionDelay: `${i * 20}ms` }} />
                    ))}
                </div>
                <div className="w-24 bg-primary-500 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-black-pure border-t-transparent rounded-full animate-spin" />
                </div>
            </footer>
        )
    }

    if (variant === 4) {
        return (
            <footer className="w-full py-12 px-8 border-t-8 border-black-pure bg-secondary-500 relative group overflow-hidden z-1">
                <div className="absolute top-0 right-0 w-64 h-full bg-primary-500 -skew-x-12 translate-x-32 group-hover:translate-x-12 transition-transform duration-1000" />
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                    <div className="flex flex-wrap gap-x-8 gap-y-2">
                        {links.map((link, idx) => (
                            <a key={idx} href={link.href} className={`${textStyle} text-black-pure hover:underline decoration-white-pure decoration-4`}>
                                {link.label}
                            </a>
                        ))}
                    </div>
                    <div className="flex gap-1">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="w-2 h-12 bg-black-pure group-hover:scale-y-150 transition-transform" style={{ transitionDelay: `${i * 50}ms` }} />
                        ))}
                    </div>
                </div>
            </footer>
        )
    }

    if (variant === 5) {
        return (
            <footer className="w-full bg-black-pure text-white-pure p-1 z-1">
                <div className="border border-white-pure/20 grid grid-cols-1 md:grid-cols-2">
                    <div className="p-8 border-b md:border-b-0 md:border-r border-white-pure/20 group hover:bg-secondary-500 hover:text-black-pure transition-colors">
                        <div className="flex flex-wrap gap-6">
                            {links.map((l, i) => (
                                <a key={i} href={l.href} className={textStyle}>{l.label}</a>
                            ))}
                        </div>
                    </div>
                    <div className="p-8 bg-neutral-900 flex items-center justify-center overflow-hidden">
                        <div className="w-full h-2 bg-neutral-800 relative">
                            <div className="absolute inset-y-0 left-0 bg-primary-500 w-1/3 group-hover:w-full transition-all duration-1000" />
                        </div>
                    </div>
                </div>
            </footer>
        )
    }

    return (
        <footer className="w-full h-20 flex border-t-4 border-black-pure bg-white-pure group z-1">
            <div className="w-20 bg-primary-500 border-r-4 border-black-pure flex items-center justify-center">
                <div className="w-4 h-4 bg-black-pure animate-spin" />
            </div>
            <div className="flex-1 flex items-center px-10">
                <div className="flex gap-8">
                    {links.map((link, idx) => (
                        <a key={idx} href={link.href} className={`${textStyle} hover:text-secondary-500 transition-colors`}>
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
            <div className="px-10 border-l-4 border-black-pure bg-black-pure flex items-center gap-4">
                <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary-500 animate-ping" />
                    <div className="w-2 h-2 bg-secondary-500 animate-ping [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-primary-500 animate-ping [animation-delay:0.4s]" />
                </div>
            </div>
        </footer>
    )
}

export default SectionFooter