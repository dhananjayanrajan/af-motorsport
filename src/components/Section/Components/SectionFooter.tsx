"use client"
import React from 'react'

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
    const buttonBase = "font-mono font-semibold uppercase tracking-wider transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"

    if (variant === 2) {
        return (
            <footer className="w-full border-t border-border bg-foreground p-6 sm:p-8 flex flex-wrap gap-4 rounded-t-lg">
                {links.map((link, idx) => (
                    <a
                        key={idx}
                        href={link.href}
                        className={`${buttonBase} flex-1 min-w-[120px] bg-secondary p-4 text-sm text-secondary-foreground border border-secondary hover:bg-background hover:text-foreground focus:bg-background focus:ring-2 focus:ring-primary active:bg-primary active:scale-95 transition-all duration-300 rounded-md text-center`}
                    >
                        {link.label}
                    </a>
                ))}
            </footer>
        )
    }

    if (variant === 3) {
        return (
            <footer className="w-full border-t border-border flex rounded-t-lg overflow-hidden">
                <div className="flex-1 p-6 sm:p-8 bg-primary border-r border-border">
                    <p className="font-semibold uppercase tracking-wide text-sm text-primary-foreground">Active Session</p>
                </div>
                <button
                    onClick={onScrollTop}
                    className="w-20 sm:w-24 bg-foreground flex items-center justify-center group cursor-pointer outline-none hover:bg-primary focus:bg-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-95 transition-all duration-300"
                    aria-label="Scroll to top"
                >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-l-2 border-background rotate-45 group-hover:border-primary-foreground transition-colors duration-300" />
                </button>
            </footer>
        )
    }

    return (
        <footer className="w-full border-t border-border bg-background flex items-stretch h-12 sm:h-14 md:h-16 rounded-t-lg overflow-hidden">
            <div className="w-1/2 bg-secondary border-r border-border hover:bg-secondary/80 transition-colors duration-300" />
            <div className="w-1/4 bg-primary border-r border-border hover:bg-primary/90 transition-colors duration-300" />
            <div className="w-1/4 bg-foreground hover:bg-foreground/90 transition-colors duration-300" />
        </footer>
    )
}

export default SectionFooter
