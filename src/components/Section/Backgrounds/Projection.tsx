"use client"

import React from 'react'

interface ProjectionBackgroundProps {
    zIndex?: string
    opacity?: string
}

const ProjectionBackground: React.FC<ProjectionBackgroundProps> = ({
    zIndex = "z-0",
    opacity = "opacity-[0.18]"
}) => {
    return (
        <div className={`absolute inset-0 ${zIndex} ${opacity} pointer-events-none overflow-hidden bg-background`}>
            <div className="grid grid-cols-12 h-full w-full">
                {[...Array(96)].map((_, i) => (
                    <div key={i} className="relative aspect-square border-[0.5px] border-black-400 bg-background h-16">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute top-0 left-0 w-[200%] h-full border-l-[1.5px] border-black-400 rotate-[45deg] origin-top-left" />
                            <div className="absolute bottom-0 right-0 w-[200%] h-full border-r-[1.5px] border-black-400 rotate-[45deg] origin-bottom-right" />
                        </div>
                        {i % 7 === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center p-3">
                                <div className="w-full h-full bg-primary" />
                            </div>
                        )}
                        {i % 13 === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center p-3">
                                <div className="w-full h-full rounded-full border-[4px] border-secondary" />
                            </div>
                        )}
                        {i % 5 === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-full h-1/2 bg-black-400 mix-blend-multiply" />
                            </div>
                        )}
                        <div className="absolute top-0 left-0 w-full h-full border-[1px] border-black-400 opacity-20" />
                        <div className="absolute bottom-1 right-1 flex gap-[2px]">
                            <div className="w-1 h-1 bg-black-400" />
                            <div className="w-1 h-1 bg-black-400" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none">
                <div className="border-r-[4px] border-b-[4px] border-black-400/10" />
                <div className="border-b-[4px] border-black-400/10" />
                <div className="border-r-[4px] border-black-400/10" />
                <div className="bg-transparent" />
            </div>
        </div>
    )
}

export default ProjectionBackground