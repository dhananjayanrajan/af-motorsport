"use client"
import { ArrowUpDown } from 'lucide-react'
import React, { useState } from 'react'
import SectionButton from '../Components/SectionButton'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'

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

interface TableLabels {
  sortActive: string
  rowIndicator: string
}

interface TableSectionProps {
  id: string
  title: string
  subtitle: string
  columns: TableColumn[]
  rows: TableRow[]
  labels: TableLabels
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
  columns = [],
  rows = [],
  labels = {
    sortActive: '',
    rowIndicator: ''
  },
  ctaLabel,
  ctaPath,
  headerVariant = 1,
  footerVariant = 1,
  background
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
    <section id={id} className="relative w-full bg-white-pure border-t border-black-pure overflow-hidden">
      {background}

      <SectionHeader
        title={title}
        subtitle={subtitle}
        variant={headerVariant}
        metadata={String(rows.length).padStart(2, '0')}
      />

      <div className="w-full border-b border-black-pure overflow-x-auto bg-black-pure">
        <div className="min-w-[800px] w-full flex flex-col gap-[1px]">
          {/* Header */}
          <div className="flex items-stretch bg-neutral-100 h-14">
            <div className="w-14 border-r border-black-pure flex items-center justify-center shrink-0 bg-white-pure">
              <div className="w-1.5 h-1.5 bg-primary" />
            </div>
            {columns.map((col) => (
              <button
                key={col.key}
                disabled={!col.sortable}
                onClick={() => col.sortable && handleSort(col.key)}
                className={`flex items-center px-6 border-r border-black-pure last:border-r-0 transition-colors group text-left bg-white-pure ${col.sortable ? 'hover:bg-primary' : ''}`}
                style={{ flex: col.width ? `0 0 ${col.width}` : '1 1 0%' }}
              >
                <div className="flex flex-col">
                  {sortKey === col.key && (
                    <span className="text-[7px] font-mono font-black text-black-pure uppercase tracking-[0.2em] mb-0.5">
                      {labels.sortActive}
                    </span>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono font-black text-black-pure uppercase tracking-widest">
                      {col.label}
                    </span>
                    {col.sortable && (
                      <ArrowUpDown className={`w-3 h-3 ${sortKey === col.key ? 'text-black-pure' : 'text-neutral-300 group-hover:text-black-pure'}`} />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Body */}
          <div className="flex flex-col gap-[1px]">
            {sortedRows.map((row, idx) => {
              const isHovered = hoveredRow === row.id
              const isLink = !!row.href
              const Tag = isLink ? 'a' : 'div'

              return (
                <Tag
                  key={row.id}
                  href={row.href}
                  onMouseEnter={() => setHoveredRow(row.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`flex items-stretch transition-colors group ${isLink ? 'cursor-pointer' : ''} ${isHovered ? 'bg-black-pure' : 'bg-white-pure'}`}
                >
                  <div className={`w-14 border-r border-black-pure flex flex-col items-center justify-center shrink-0 transition-colors ${isHovered ? 'bg-primary text-black-pure' : 'bg-white-pure text-neutral-300'}`}>
                    <span className="text-[10px] font-mono font-black tabular-nums">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {columns.map((col) => (
                    <div
                      key={col.key}
                      className="px-6 py-4 border-r border-black-pure last:border-r-0 flex items-center"
                      style={{ flex: col.width ? `0 0 ${col.width}` : '1 1 0%' }}
                    >
                      <div className={`text-[11px] font-mono font-black uppercase transition-colors ${isHovered ? 'text-primary' : 'text-black-pure'}`}>
                        {row.cells[col.key]}
                      </div>
                    </div>
                  ))}
                </Tag>
              )
            })}
          </div>
        </div>
      </div>

      {ctaLabel && ctaPath && (
        <div className="p-16 flex justify-center bg-white-pure border-b border-black-pure">
          <SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" />
        </div>
      )}

      <SectionFooter variant={footerVariant} />
    </section>
  )
}

export default TableSection