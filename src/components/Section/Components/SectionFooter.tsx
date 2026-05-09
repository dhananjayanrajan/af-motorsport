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
            <footer className="w-full border-t-8 border-slate-900 bg-primary-500 grid grid-cols-1 md:grid-cols-4 group">
                <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 border-b md:border-b-0 md:border-r-8 border-slate-900 bg-white">
                    {links.map((link, idx) => (
                        <a key={idx} href={link.href} className={`${textStyle} p-8 border-r border-slate-100 last:border-r-0 hover:bg-primary-500 hover:text-white transition-all duration-300 flex items-center justify-center text-center`}>
                            {link.label}
                        </a>
                    ))}
                </div>
                <div className="p-8 bg-slate-900 flex items-center justify-center overflow-hidden">
                    <div className="flex gap-3 group-hover:scale-110 transition-transform duration-500">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-4 h-4 rounded-full bg-primary-500 animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
                        ))}
                    </div>
                </div>
            </footer>
        )
    }

    if (variant === 3) {
        return (
            <footer className="w-full bg-slate-50 flex items-stretch min-h-[100px] border-t border-slate-200 group">
                <div className="flex-1 p-8 flex items-center bg-white border-r border-slate-200">
                    <div className="flex flex-wrap gap-8">
                        {links.map((link, idx) => (
                            <a key={idx} href={link.href} className={`${textStyle} text-slate-400 hover:text-primary-600 transition-colors relative group/link`}>
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 group-hover/link:w-full transition-all" />
                            </a>
                        ))}
                    </div>
                </div>
                <div className="hidden lg:flex flex-1 items-center px-10 gap-1 bg-slate-50">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="flex-1 h-1 bg-slate-200 group-hover:h-8 group-hover:bg-secondary-400 transition-all duration-500" style={{ transitionDelay: `${i * 30}ms` }} />
                    ))}
                </div>
                <div className="w-24 bg-secondary-500 flex items-center justify-center group-hover:bg-slate-900 transition-colors duration-500">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
            </footer>
        )
    }

    if (variant === 4) {
        return (
            <footer className="w-full py-16 px-10 bg-slate-900 relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500" />
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
                        {links.map((link, idx) => (
                            <a key={idx} href={link.href} className={`${textStyle} text-white hover:text-secondary-400 transition-colors`}>
                                {link.label}
                            </a>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Status: Active</span>
                        <div className="flex gap-1.5">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-1.5 h-6 bg-primary-500 rounded-full group-hover:bg-white transition-colors" style={{ transitionDelay: `${i * 100}ms` }} />
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        )
    }

    if (variant === 5) {
        return (
            <footer className="w-full bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">
                    <div className="p-12 flex items-center justify-center md:justify-start">
                        <div className="flex flex-wrap gap-10">
                            {links.map((l, i) => (
                                <a key={i} href={l.href} className={`${textStyle} text-slate-900 hover:opacity-50 transition-opacity`}>{l.label}</a>
                            ))}
                        </div>
                    </div>
                    <div className="p-1 border-l border-slate-100 bg-slate-50 flex flex-col">
                        <div className="flex-1 p-8 flex items-center justify-center group">
                            <div className="w-full max-w-xs space-y-4">
                                <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase">
                                    <span>System Load</span>
                                    <span>99%</span>
                                </div>
                                <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary-600 w-1/4 group-hover:w-full transition-all duration-[2000ms] ease-in-out" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }

    return (
        <footer className="w-full h-24 flex items-stretch border-t-2 border-slate-900 bg-white group">
            <div className="w-24 bg-primary-600 flex items-center justify-center relative overflow-hidden">
                <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-sm rotate-45 group-hover:rotate-[225deg] transition-transform duration-700" />
            </div>
            <div className="flex-1 flex items-center px-12">
                <div className="flex gap-10">
                    {links.map((link, idx) => (
                        <a key={idx} href={link.href} className={`${textStyle} text-slate-900 hover:text-primary-600 transition-colors relative`}>
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
            <div className="px-12 bg-secondary-500 flex items-center border-l-2 border-slate-900">
                <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 bg-slate-900 rounded-full animate-bounce [animation-duration:0.8s]" />
                    <div className="w-2.5 h-2.5 bg-slate-900 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.2s]" />
                    <div className="w-2.5 h-2.5 bg-slate-900 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.4s]" />
                </div>
            </div>
        </footer>
    )
}

export default SectionFooter