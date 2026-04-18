"use client"

import React from 'react'
import GridBase, { GridInfo } from '../GridBase'

interface BlueprintBackgroundProps {
    zIndex?: string
    opacity?: number
    columnCount?: number
    rowHeight?: number
}

const BlueprintBackground: React.FC<BlueprintBackgroundProps> = ({
    zIndex = "z-0",
    opacity = 0.15,
    columnCount = 12,
    rowHeight = 24
}) => {
    const drawBlueprintPattern = (ctx: CanvasRenderingContext2D, grid: GridInfo) => {
        ctx.globalAlpha = 1

        const primaryColor = '#00FF41'
        const secondaryColor = '#FFEE00'
        const tertiaryColor = '#9000FF'
        const blueColor = '#1E3A8A'
        const whiteColor = '#FFFFFF'

        for (let row = 0; row < grid.rows; row++) {
            for (let col = 0; col < grid.cols; col++) {
                const x = grid.cellCenterX(col)
                const y = grid.cellCenterY(row)

                if ((row + col) % 4 === 0) {
                    ctx.fillStyle = blueColor
                    ctx.globalAlpha = 0.05
                    ctx.fillRect(
                        col * grid.colWidth,
                        row * grid.rowHeight,
                        grid.colWidth,
                        grid.rowHeight
                    )
                    ctx.globalAlpha = 1
                }

                if (row % 4 === 0 && col % 3 === 0) {
                    ctx.strokeStyle = primaryColor
                    ctx.lineWidth = 1
                    ctx.beginPath()
                    ctx.arc(x, y, 6, 0, Math.PI * 2)
                    ctx.stroke()

                    ctx.fillStyle = primaryColor
                    ctx.beginPath()
                    ctx.arc(x, y, 2, 0, Math.PI * 2)
                    ctx.fill()
                }

                if (row % 4 === 2 && col % 3 === 1) {
                    ctx.strokeStyle = secondaryColor
                    ctx.lineWidth = 1.5
                    ctx.save()
                    ctx.translate(x, y)
                    ctx.rotate(Math.PI / 4)
                    ctx.strokeRect(-4, -4, 8, 8)
                    ctx.restore()
                }
            }
        }

        for (let row = 0; row < grid.rows; row += 6) {
            for (let col = 0; col < grid.cols; col += 4) {
                const x = col * grid.colWidth
                const y = row * grid.rowHeight

                ctx.strokeStyle = whiteColor
                ctx.lineWidth = 2
                ctx.strokeRect(x + 2, y + 2, grid.colWidth - 4, grid.rowHeight - 4)

                ctx.fillStyle = tertiaryColor
                ctx.fillRect(x + grid.colWidth - 8, y + 4, 4, 4)
            }
        }
    }

    return (
        <GridBase
            zIndex={zIndex}
            opacity={opacity}
            columnCount={columnCount}
            rowHeight={rowHeight}
            onDraw={drawBlueprintPattern}
        />
    )
}

export default BlueprintBackground