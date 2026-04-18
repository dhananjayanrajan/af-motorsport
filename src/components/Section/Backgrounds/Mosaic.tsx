"use client"

import React from 'react'

interface MosaicBackgroundProps {
    primaryColor?: string
    secondaryColor?: string
    tertiaryColor?: string
    zIndex?: string
    opacity?: string
}

const MosaicBackground: React.FC<MosaicBackgroundProps> = ({
    primaryColor = "bg-primary",
    secondaryColor = "bg-secondary",
    tertiaryColor = "bg-tertiary-500",
    zIndex = "z-0",
    opacity = "opacity-20",
}) => {
    return (
        <div className={`absolute inset-0 ${zIndex} ${opacity} pointer-events-none overflow-hidden`}>
            <div className="grid grid-cols-12 w-full h-full">
                {[...Array(96)].map((_, i) => {
                    const variant = (i + Math.floor(i / 12)) % 4
                    return (
                        <div key={i} className="aspect-square border-[0.5px] border-black-400 relative overflow-hidden h-16">
                            {variant === 0 && (
                                <div className={`absolute inset-0 ${primaryColor} [clip-path:polygon(0_0,100%_0,0_100%)]`} />
                            )}
                            {variant === 1 && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className={`w-full h-full rounded-full ${secondaryColor} scale-[1.1] translate-x-1/2 translate-y-1/2`} />
                                </div>
                            )}
                            {variant === 2 && (
                                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                                    <div className={tertiaryColor} />
                                    <div className="bg-transparent" />
                                    <div className="bg-transparent" />
                                    <div className="bg-black-400" />
                                </div>
                            )}
                            {variant === 3 && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-px h-full bg-black-400 rotate-45" />
                                    <div className="w-full h-px bg-black-400 rotate-45" />
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MosaicBackground