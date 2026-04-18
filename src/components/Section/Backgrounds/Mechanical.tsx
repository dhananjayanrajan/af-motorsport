"use client"

import React from 'react'

interface MechanicalBackgroundProps {
    zIndex?: string
    opacity?: string
}

const MechanicalBackground: React.FC<MechanicalBackgroundProps> = ({
    zIndex = "z-0",
    opacity = "opacity-[0.08]"
}) => {
    return (
        <div className={`absolute inset-0 ${zIndex} ${opacity} pointer-events-none overflow-hidden`}>
            <div className="grid grid-cols-12 h-full w-full">
                {[...Array(96)].map((_, i) => (
                    <div key={i} className="border border-black-400 flex items-center justify-center p-2 group h-16">
                        <div className="w-full aspect-square relative border-2 border-black-400 flex items-center justify-center">
                            <div className="w-[70%] h-[70%] border border-black-400 border-dashed rounded-full" />
                            <div className="absolute w-1 h-full bg-black-400" />
                            <div className="absolute w-full h-1 bg-black-400" />
                            <div className={`absolute w-3 h-3 ${i % 3 === 0 ? 'bg-primary' : 'bg-tertiary-500'} rounded-full`} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MechanicalBackground