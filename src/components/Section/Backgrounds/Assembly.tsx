"use client"

import React from 'react'
import GridBase, { GridInfo } from '../GridBase'

interface AssemblyBackgroundProps {
    zIndex?: string
}

const AssemblyBackground: React.FC<AssemblyBackgroundProps> = ({
    zIndex = "z-0"
}) => {
    const drawAssemblyPattern = (ctx: CanvasRenderingContext2D, grid: GridInfo) => {
        ctx.fillStyle = '#00FF41'
        ctx.globalAlpha = 0.04

        for (let row = 0; row < grid.rows; row += 4) {
            for (let col = 0; col < grid.cols; col += 3) {
                if ((row + col) % 7 === 0) {
                    ctx.fillRect(
                        col * grid.colWidth,
                        row * grid.rowHeight,
                        grid.colWidth,
                        grid.rowHeight
                    )
                }
            }
        }

        ctx.fillStyle = '#FFEE00'
        ctx.globalAlpha = 0.04

        for (let row = 2; row < grid.rows; row += 4) {
            for (let col = 1; col < grid.cols; col += 3) {
                if ((row + col) % 5 === 0) {
                    ctx.fillRect(
                        col * grid.colWidth,
                        row * grid.rowHeight,
                        grid.colWidth * 2,
                        grid.rowHeight
                    )
                }
            }
        }

        ctx.fillStyle = '#9000FF'
        ctx.globalAlpha = 0.04

        for (let row = 1; row < grid.rows; row += 6) {
            for (let col = 2; col < grid.cols; col += 4) {
                if ((row + col) % 3 === 0) {
                    ctx.fillRect(
                        col * grid.colWidth,
                        row * grid.rowHeight,
                        grid.colWidth,
                        grid.rowHeight * 2
                    )
                }
            }
        }

        ctx.globalAlpha = 1
    }

    return (
        <GridBase
            zIndex={zIndex}
            opacity={0.08}
            columnCount={12}
            rowHeight={24}
            onDraw={drawAssemblyPattern}
        />
    )
}

export default AssemblyBackground