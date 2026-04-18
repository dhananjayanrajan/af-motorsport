"use client"

import React from 'react'

interface WeaveBackgroundProps {
    zIndex?: string
    opacity?: string
}

const WeaveBackground: React.FC<WeaveBackgroundProps> = ({
    zIndex = "z-0",
    opacity = "opacity-[0.05]",
}) => {
    return (
        <div className={`absolute inset-0 ${zIndex} ${opacity} pointer-events-none overflow-hidden`}>
            <div className="flex flex-col h-full w-full">
                {[...Array(16)].map((_, rowIndex) => (
                    <div key={rowIndex} className="flex-1 flex h-16">
                        {[...Array(16)].map((_, colIndex) => {
                            const isEven = (rowIndex + colIndex) % 2 === 0
                            return (
                                <div
                                    key={colIndex}
                                    className={`flex-1 border-[0.5px] border-black-400 transition-colors duration-500 ${isEven ? 'bg-black-400' : 'bg-transparent'
                                        }`}
                                >
                                    {!isEven && rowIndex % 3 === 0 && (
                                        <div className="w-full h-1/2 bg-primary" />
                                    )}
                                    {isEven && colIndex % 4 === 0 && (
                                        <div className="w-1/2 h-full bg-secondary ml-auto" />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WeaveBackground