"use client"

import React from 'react'

interface SchematicBackgroundProps {
    zIndex?: string
    opacity?: string
}

const SchematicBackground: React.FC<SchematicBackgroundProps> = ({
    zIndex = "z-0",
    opacity = "opacity-[0.12]"
}) => {
    return (
        <div className={`absolute inset-0 ${zIndex} ${opacity} pointer-events-none overflow-hidden bg-background`}>
            <div className="grid grid-cols-6 h-full w-full">
                {[...Array(48)].map((_, i) => (
                    <div key={i} className="border-[0.5px] border-black-400 relative flex flex-col p-2 h-32">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-3 h-3 border border-black-400 flex items-center justify-center">
                                <div className="w-1 h-1 bg-primary" />
                            </div>
                            <div className="w-4 h-1 bg-secondary" />
                        </div>
                        <div className="flex-1 border-t border-black-400 border-dashed relative">
                            <div className="absolute top-1/2 left-0 w-full h-px bg-black-400" />
                            <div className="absolute top-0 left-1/2 w-px h-full bg-black-400" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border border-black-400 rotate-45" />
                        </div>
                        <div className="mt-4 flex gap-1">
                            <div className="flex-1 h-1 bg-black-400" />
                            <div className="flex-1 h-1 bg-secondary" />
                            <div className="flex-1 h-1 bg-tertiary-500" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SchematicBackground