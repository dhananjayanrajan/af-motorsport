"use client"
import React, { useEffect, useRef } from 'react'

interface GridBaseProps {
    zIndex?: string
    opacity?: number
    columnCount?: number
    rowHeight?: number
    onDraw?: (ctx: CanvasRenderingContext2D, gridInfo: GridInfo) => void
}

export interface GridInfo {
    width: number
    height: number
    cols: number
    rows: number
    colWidth: number
    rowHeight: number
    cellCenterX: (col: number) => number
    cellCenterY: (row: number) => number
}

const GridBase: React.FC<GridBaseProps> = ({
    zIndex = "z-0",
    opacity = 0.1,
    columnCount = 12,
    rowHeight = 24,
    onDraw
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const resizeCanvas = () => {
            const container = canvas.parentElement
            if (!container) return

            const width = container.clientWidth
            const height = container.clientHeight

            canvas.width = width
            canvas.height = height

            drawBaseGrid(ctx, width, height)

            if (onDraw) {
                const cols = columnCount
                const colWidth = width / cols
                const rows = Math.ceil(height / rowHeight)

                const gridInfo: GridInfo = {
                    width,
                    height,
                    cols,
                    rows,
                    colWidth,
                    rowHeight,
                    cellCenterX: (col: number) => col * colWidth + colWidth / 2,
                    cellCenterY: (row: number) => row * rowHeight + rowHeight / 2
                }

                onDraw(ctx, gridInfo)
            }
        }

        const drawBaseGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
            ctx.clearRect(0, 0, width, height)

            const cols = columnCount
            const colWidth = width / cols

            ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)'
            ctx.lineWidth = 0.5
            ctx.globalAlpha = opacity

            for (let i = 0; i <= cols; i++) {
                const x = i * colWidth
                ctx.beginPath()
                ctx.moveTo(x, 0)
                ctx.lineTo(x, height)
                ctx.stroke()
            }

            for (let y = 0; y <= height; y += rowHeight) {
                ctx.beginPath()
                ctx.moveTo(0, y)
                ctx.lineTo(width, y)
                ctx.stroke()
            }
        }

        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        return () => window.removeEventListener('resize', resizeCanvas)
    }, [opacity, columnCount, rowHeight, onDraw])

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 ${zIndex} pointer-events-none`}
        />
    )
}

export default GridBase