"use client"
import React, { useState } from 'react';

interface SectionFooterProps {
    variant?: 1 | 2 | 3 | 4 | 5
    links?: Array<{ label: string; href: string }>
}

const SectionFooter: React.FC<SectionFooterProps> = ({
    variant = 1,
    links = [],
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const textStyle = "text-[11px] font-bold uppercase tracking-wider";

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        if (isLoading) return;
        setIsLoading(true);
        setTimeout(() => { window.location.href = href; }, 600);
    };

    if (variant === 2) {
        return (
            <footer className="w-full border-t-2 border-black-pure bg-white-pure grid grid-cols-1 md:grid-cols-[1fr_200px] z-1 relative">
                <div className="grid grid-cols-2 md:grid-cols-4 bg-white-pure z-1 relative">
                    {links.map((link, idx) => (
                        <a key={idx} href={link.href} onClick={(e) => handleLinkClick(e, link.href)}
                            className={`${textStyle} p-6 border-r-2 border-b-2 md:border-b-0 border-black-pure hover:bg-black-pure hover:text-white-pure transition-colors duration-200 flex items-center justify-center text-black-pure z-1 relative cursor-pointer`}>
                            {link.label}
                        </a>
                    ))}
                </div>
                <div className="bg-primary-500 p-6 flex items-center justify-between border-t-2 md:border-t-0 md:border-l-2 border-black-pure z-1 relative group overflow-hidden">
                    <div className="absolute inset-0 bg-black-pure -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-1" />
                    <span className="font-black text-[10px] text-black-pure group-hover:text-white-pure z-1 relative">© 2026</span>
                    <div className="flex gap-1 z-1 relative">
                        {[...Array(3)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-black-pure group-hover:bg-primary-500 z-1 relative" />)}
                    </div>
                </div>
            </footer>
        )
    }

    if (variant === 3) {
        return (
            <footer className="w-full bg-white-pure border-t-2 border-black-pure group z-1 relative">
                <div className="flex flex-col md:flex-row items-stretch min-h-[60px] z-1 relative">
                    <div className="flex-1 p-6 flex flex-wrap items-center gap-8 bg-white-pure z-1 relative">
                        {links.map((link, idx) => (
                            <a key={idx} href={link.href} onClick={(e) => handleLinkClick(e, link.href)}
                                className={`${textStyle} text-black-pure hover:text-primary-500 transition-colors z-1 relative cursor-pointer`}>
                                {link.label}
                            </a>
                        ))}
                    </div>
                    <div className="md:w-56 bg-secondary-500 p-6 border-t-2 md:border-t-0 md:border-l-2 border-black-pure flex items-center justify-between group-hover:bg-black-pure transition-colors duration-300 z-1 relative cursor-pointer">
                        <span className="font-black text-[10px] text-black-pure group-hover:text-white-pure z-1 relative">UP</span>
                        <div className="w-3 h-3 bg-black-pure group-hover:bg-primary-500 z-1 relative" />
                    </div>
                </div>
            </footer>
        )
    }

    if (variant === 4) {
        return (
            <footer className="w-full bg-black-pure p-8 md:p-12 z-1 relative group overflow-hidden">
                <div className="absolute inset-0 bg-secondary-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 z-1" />
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 z-1 relative">
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                        {links.map((link, idx) => (
                            <a key={idx} href={link.href} onClick={(e) => handleLinkClick(e, link.href)}
                                className={`${textStyle} text-white-pure group-hover:text-black-pure transition-colors z-1 relative cursor-pointer`}>
                                {link.label}
                            </a>
                        ))}
                    </div>
                    <span className="text-[9px] font-black text-primary-500 group-hover:text-black-pure z-1 relative tracking-[0.3em]">VERSION 1.0.4</span>
                </div>
            </footer>
        )
    }

    return (
        <footer className="w-full border-t-2 border-black-pure bg-white-pure flex flex-col md:flex-row items-stretch overflow-hidden z-1 relative group">
            <div className="absolute inset-0 bg-primary-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 z-1" />
            <div className="p-6 md:p-8 flex-1 flex flex-wrap gap-8 items-center z-1 relative bg-white-pure group-hover:bg-transparent transition-colors duration-300">
                {links.map((link, idx) => (
                    <a key={idx} href={link.href} onClick={(e) => handleLinkClick(e, link.href)}
                        className={`${textStyle} text-black-pure z-1 relative cursor-pointer`}>
                        {link.label}
                    </a>
                ))}
            </div>
            <div className="bg-black-pure p-6 md:w-48 flex items-center justify-center border-t-2 md:border-t-0 md:border-l-2 border-black-pure z-1 relative">
                <span className="text-white-pure font-black text-[10px] tracking-widest z-1 relative">FINISH</span>
            </div>
        </footer>
    )
}

export default SectionFooter;