"use client"

import React from 'react'

interface TechnicalBackgroundProps {
    zIndex?: string
    opacity?: string
}

const TechnicalBackground: React.FC<TechnicalBackgroundProps> = ({
    zIndex = "z-0",
    opacity = "opacity-[0.14]"
}) => {
    return (
        <div className={`absolute inset-0 ${zIndex} ${opacity} pointer-events-none overflow-hidden bg-background`}>
            <div className="grid grid-cols-[repeat(16,1fr)] h-full w-full">
                {[...Array(128)].map((_, i) => (
                    <div key={i} className="aspect-square border-[0.5px] border-black-400 flex items-center justify-center h-16">
                        {i % 8 === 0 ? (
                            <div className="w-2 h-2 bg-primary rotate-45" />
                        ) : i % 5 === 0 ? (
                            <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        ) : i % 13 === 0 ? (
                            <div className="w-3 h-0.5 bg-black-400" />
                        ) : (
                            <div className="w-1 h-1 bg-black-400 opacity-10" />
                        )}
                    </div>
                ))}
            </div>
            <div className="absolute inset-0 border-[20px] border-black-400 pointer-events-none mix-blend-overlay opacity-50" />
        </div>
    )
}

export default TechnicalBackground