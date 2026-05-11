"use client"
import React, { useState } from 'react';

interface SectionFooterProps {
    variant?: 1 | 2 | 3 | 4 | 5
    links?: Array<{ label: string; href: string }>
    metadata?: string
}

const SectionFooter: React.FC<SectionFooterProps> = ({
    variant = 1,
    links = [],
    metadata
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        if (isLoading) return;
        setIsLoading(true);
        setTimeout(() => { window.location.href = href; }, 400);
    };

    const containerBase = "w-full relative z-10 isolate border-t border-zinc-200 transition-all duration-300";

    switch (variant) {
        case 1:
            return (
                <footer className={`${containerBase} bg-white py-12 px-8`}>
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                        <nav className="flex flex-wrap gap-x-10 gap-y-2">
                            {links.map((link, idx) => (
                                <a key={idx} href={link.href} onClick={(e) => handleLinkClick(e, link.href)}
                                    className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400 hover:text-black transition-colors">
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                        {metadata && <span className="text-[10px] text-zinc-300 font-light tracking-widest">{metadata}</span>}
                    </div>
                </footer>
            );
        case 2:
            return (
                <footer className={`${containerBase} bg-[#f9f9f9] py-16`}>
                    <div className="flex flex-col items-center gap-10">
                        <div className="h-12 w-[1px] bg-zinc-300" />
                        <nav className="flex flex-col items-center gap-4">
                            {links.map((link, idx) => (
                                <a key={idx} href={link.href} onClick={(e) => handleLinkClick(e, link.href)}
                                    className="text-sm font-light text-zinc-500 hover:text-blue-600 transition-colors">
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                        {metadata && <span className="text-[9px] text-zinc-400 uppercase tracking-[0.3em]">{metadata}</span>}
                    </div>
                </footer>
            );
        case 3:
            return (
                <footer className={`${containerBase} bg-white py-8`}>
                    <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {links.map((link, idx) => (
                            <a key={idx} href={link.href} onClick={(e) => handleLinkClick(e, link.href)}
                                className="p-6 border border-zinc-100 bg-zinc-50/50 hover:bg-white hover:shadow-sm transition-all text-xs font-semibold text-zinc-600">
                                {link.label}
                            </a>
                        ))}
                        {metadata && (
                            <div className="p-6 flex items-center text-[10px] text-zinc-300 uppercase font-bold tracking-tighter">
                                {metadata}
                            </div>
                        )}
                    </div>
                </footer>
            );
        case 4:
            return (
                <footer className={`${containerBase} bg-[#111] text-white py-20`}>
                    <div className="max-w-5xl mx-auto px-10">
                        <nav className="grid grid-cols-2 gap-y-6 mb-20">
                            {links.map((link, idx) => (
                                <a key={idx} href={link.href} onClick={(e) => handleLinkClick(e, link.href)}
                                    className="text-lg font-light opacity-40 hover:opacity-100 transition-opacity">
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                        <div className="pt-8 border-t border-white/10 flex justify-between items-center">
                            <div className="flex gap-4">
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                                <div className="w-2 h-2 rounded-full bg-zinc-800" />
                            </div>
                            {metadata && <span className="text-[10px] opacity-20 uppercase tracking-widest">{metadata}</span>}
                        </div>
                    </div>
                </footer>
            );
        case 5:
            return (
                <footer className={`${containerBase} bg-white py-12`}>
                    <div className="max-w-7xl mx-auto px-8 flex flex-col gap-12">
                        <div className="flex flex-wrap gap-1">
                            {links.map((link, idx) => (
                                <React.Fragment key={idx}>
                                    <a href={link.href} onClick={(e) => handleLinkClick(e, link.href)}
                                        className="text-[10px] font-bold uppercase text-zinc-900 hover:bg-zinc-900 hover:text-white px-3 py-1 transition-colors">
                                        {link.label}
                                    </a>
                                    {idx < links.length - 1 && <span className="text-zinc-200">/</span>}
                                </React.Fragment>
                            ))}
                        </div>
                        {metadata && (
                            <div className="text-[9px] font-medium text-zinc-400 border-l-2 border-zinc-100 pl-4">
                                {metadata}
                            </div>
                        )}
                    </div>
                </footer>
            );
        default:
            return (
                <footer className={`${containerBase} bg-white py-12 px-8`}>
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                        <nav className="flex flex-wrap gap-x-10 gap-y-2">
                            {links.map((link, idx) => (
                                <a key={idx} href={link.href} onClick={(e) => handleLinkClick(e, link.href)}
                                    className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400 hover:text-black transition-colors">
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                        {metadata && <span className="text-[10px] text-zinc-300 font-light tracking-widest">{metadata}</span>}
                    </div>
                </footer>
            );
    }
}

export default SectionFooter;