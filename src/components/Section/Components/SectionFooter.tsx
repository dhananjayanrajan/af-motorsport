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
    const textStyle = "text-base font-black uppercase tracking-tighter"

    if (variant === 2) {
        return (
            <footer className="w-full border-t-4 border-black-pure bg-white-pure grid grid-cols-1 md:grid-cols-4 group">
                <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 border-b md:border-b-0 md:border-r-4 border-black-pure">
                    {links.map((link, idx) => (
                        <a key={idx} href={link.href} className={`${textStyle} p-6 border-r border-black-pure last:border-r-0 hover:bg-primary-500 hover:text-black-pure transition-all duration-300 flex items-center justify-center text-center`}>
                            {link.label}
                        </a>
                    ))}
                </div>
                <button onClick={onScrollTop} className="p-6 bg-black-pure text-white-pure hover:bg-secondary-500 hover:text-black-pure transition-colors duration-500 flex items-center justify-between">
                    <span className={textStyle}>TOP</span>
                    <div className="w-4 h-4 border-t-2 border-l-2 border-current rotate-45" />
                </button>
            </footer>
        )
    }

    if (variant === 3) {
        return (
            <footer className="w-full border-t-2 border-black-pure bg-neutral-100 flex items-stretch h-24 overflow-hidden group">
                <div className="flex-1 p-6 flex flex-col justify-center border-r-2 border-black-pure relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <div className="relative z-10">
                        <span className="text-[10px] font-black opacity-40 block">STATUS</span>
                        <span className={textStyle}>SYSTEM_STABLE_03</span>
                    </div>
                </div>
                <div className="hidden md:flex flex-[2] border-r-2 border-black-pure items-center px-10 gap-2">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="flex-1 h-1 bg-black-pure/10 group-hover:bg-black-pure transition-all" style={{ transitionDelay: `${i * 30}ms` }} />
                    ))}
                </div>
                <button onClick={onScrollTop} className="w-24 bg-white-pure hover:bg-black-pure hover:text-white-pure transition-all duration-300 flex items-center justify-center group/btn">
                    <span className="text-2xl group-hover:-translate-y-2 transition-transform">↑</span>
                </button>
            </footer>
        )
    }

    if (variant === 4) {
        return (
            <footer className="w-full py-12 px-8 border-t-8 border-black-pure bg-white-pure relative group">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <div className="w-8 h-8 bg-black-pure flex items-center justify-center text-primary-500 font-black text-xs">F</div>
                            <div className="w-8 h-8 bg-primary-500 border-2 border-black-pure" />
                        </div>
                        <div className="flex flex-wrap gap-x-8 gap-y-2">
                            {links.map((link, idx) => (
                                <a key={idx} href={link.href} className={`${textStyle} text-black-pure/40 hover:text-black-pure hover:underline decoration-primary-500 decoration-4`}>
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                    <button onClick={onScrollTop} className={`${textStyle} border-4 border-black-pure px-8 py-4 bg-secondary-500 shadow-[6px_6px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all`}>
                        Return to Index
                    </button>
                </div>
            </footer>
        )
    }

    if (variant === 5) {
        return (
            <footer className="w-full bg-black-pure text-white-pure p-1">
                <div className="border border-white-pure/20 grid grid-cols-1 md:grid-cols-3">
                    <div className="p-8 border-b md:border-b-0 md:border-r border-white-pure/20 group hover:bg-primary-500 hover:text-black-pure transition-colors">
                        <span className="text-[10px] font-bold block mb-4 opacity-40 group-hover:opacity-100">NAVIGATION</span>
                        <div className="flex flex-col gap-2">
                            {links.slice(0, 2).map((l, i) => (
                                <a key={i} href={l.href} className={textStyle}>{l.label}</a>
                            ))}
                        </div>
                    </div>
                    <div className="p-8 border-b md:border-b-0 md:border-r border-white-pure/20 flex flex-col justify-between">
                        <div className="flex gap-1">
                            {[...Array(4)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-primary-500" />)}
                        </div>
                        <span className={`${textStyle} text-xs opacity-50`}>Build_v.2.6.0_Final</span>
                    </div>
                    <button onClick={onScrollTop} className="p-8 group bg-neutral-900 hover:bg-white-pure hover:text-black-pure transition-all duration-500 flex items-center justify-between">
                        <span className={textStyle}>Elevate</span>
                        <span className="text-2xl font-black">^</span>
                    </button>
                </div>
            </footer>
        )
    }

    return (
        <footer className="w-full h-20 flex border-t-4 border-black-pure bg-white-pure group">
            <div className="w-20 bg-primary-500 border-r-4 border-black-pure flex items-center justify-center">
                <div className="w-4 h-4 bg-black-pure animate-spin" />
            </div>
            <div className="flex-1 flex items-center px-10">
                <span className={textStyle}>End of Protocol</span>
            </div>
            <div className="hidden md:flex items-stretch border-l-4 border-black-pure">
                {links.map((link, idx) => (
                    <a key={idx} href={link.href} className={`${textStyle} px-8 flex items-center border-r-4 border-black-pure last:border-r-0 hover:bg-secondary-500 transition-colors`}>
                        {link.label}
                    </a>
                ))}
            </div>
        </footer>
    )
}

export default SectionFooter