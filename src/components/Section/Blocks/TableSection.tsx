"use client"
import React, { useState } from 'react'
import { ArrowUpDown } from 'lucide-react'
import SectionHeader from '../Components/SectionHeader'
import SectionFooter from '../Components/SectionFooter'
import SectionButton from '../Components/SectionButton'
import DotGridBackground from '../Backgrounds/DotGridBackground'

export interface TableColumn {
  key: string
  label: string
  sortable?: boolean
  width?: string
}

export interface TableRow {
  id: string
  cells: Record<string, React.ReactNode>
  href?: string
}

interface TableSectionProps {
  id: string
  title: string
  subtitle: string
  columns: TableColumn[]
  rows: TableRow[]
  ctaLabel?: string
  ctaPath?: string
  headerVariant?: 1 | 2 | 3
  footerVariant?: 1 | 2 | 3
  background?: React.ReactNode
}

const TableSection: React.FC<TableSectionProps> = ({
  id,
  title,
  subtitle,
  columns,
  rows,
  ctaLabel,
  ctaPath,
  headerVariant = 1,
  footerVariant = 1,
  background = <DotGridBackground opacity={0.3} />
}) => {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  const sortedRows = [...rows]
  if (sortKey) {
    sortedRows.sort((a, b) => {
      const aVal = String(a.cells[sortKey] ?? '')
      const bVal = String(b.cells[sortKey] ?? '')
      const cmp = aVal.localeCompare(bVal)
      return sortDirection === 'asc' ? cmp : -cmp
    })
  }

  return (
    <section className="relative w-full bg-background py-16 md:py-24">
      {background}
      <div className="relative z-10 container mx-auto px-4">
        <SectionHeader title={title} subtitle={subtitle} variant={headerVariant} metadata={String(rows.length)} />
        <div className="mt-12 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-border bg-muted/30">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`p-4 text-left font-mono font-semibold text-sm uppercase tracking-wider text-muted-foreground ${col.sortable ? 'cursor-pointer hover:text-primary transition-colors' : ''}`}
                    style={{ width: col.width }}
                    onClick={() => col.sortable && handleSort(col.key)}
                  >
                    <div className="flex items-center gap-2">
                      {col.label}
                      {col.sortable && <ArrowUpDown className="w-3 h-3" />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedRows.map((row) => {
                const isHovered = hoveredRow === row.id
                const RowTag = row.href ? 'a' : 'div'
                return (
                  <RowTag
                    key={row.id}
                    href={row.href}
                    className={`border-b border-border transition-all duration-300 ${row.href ? 'cursor-pointer hover:bg-primary/5' : ''} ${isHovered ? 'bg-accent/50' : ''}`}
                    onMouseEnter={() => setHoveredRow(row.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    {columns.map((col) => (
                      <td key={col.key} className="p-4 text-foreground">
                        {row.cells[col.key]}
                      </td>
                    ))}
                  </RowTag>
                )
              })}
            </tbody>
          </table>
        </div>
        {ctaLabel && ctaPath && <div className="flex justify-center mt-12"><SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" /></div>}
        <SectionFooter variant={footerVariant} />
      </div>
    </section>
  )
}

export default TableSection
