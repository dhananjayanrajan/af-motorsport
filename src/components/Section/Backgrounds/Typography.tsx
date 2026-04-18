"use client"

import React from 'react'

interface TypographicBackgroundProps {
    zIndex?: string
    opacity?: string
}

const TypographicBackground: React.FC<TypographicBackgroundProps> = ({
    zIndex = "z-0",
    opacity = "opacity-[0.06]",
}) => {
    const glyphs = ["O", "I", "X", "L", "■", "▲"]

    return (
        <div className={`absolute inset-0 ${zIndex} ${opacity} pointer-events-none overflow-hidden`}>
            <div className="grid grid-cols-6 h-full w-full">
                {[...Array(48)].map((_, i) => (
                    <div
                        key={i}
                        className="border border-black-400 flex items-center justify-center text-[15vw] font-black leading-none select-none h-32"
                    >
                        <span className={i % 2 === 0 ? "text-primary" : "text-black-400"}>
                            {glyphs[i % glyphs.length]}
                        </span>
                        <div className="absolute inset-0 flex flex-col justify-center px-4 opacity-20">
                            <div className="w-full h-px bg-black-400 mb-2" />
                            <div className="w-1/2 h-px bg-black-400" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TypographicBackground