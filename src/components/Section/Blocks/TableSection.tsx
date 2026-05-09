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
  footerVariant = 1
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

  const sortedRows = [...rows].slice(0, 10)
  if (sortKey) {
    sortedRows.sort((a, b) => {
      const aVal = String(a.cells[sortKey] ?? '')
      const bVal = String(b.cells[sortKey] ?? '')
      const cmp = aVal.localeCompare(bVal)
      return sortDirection === 'asc' ? cmp : -cmp
    })
  }

  return (
    <section id={id} className="container py-8 md:py-16">
      <div className="relative w-full bg-white-pure border-4 border-black-pure transition-all duration-500">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          variant={headerVariant}
          metadata={String(rows.length).padStart(2, '0')}
        />

        <div className="w-full border-t-4 border-b-4 border-black-pure bg-white-pure overflow-hidden">
          <div className="w-full flex flex-col">
            <div className="hidden md:flex items-stretch border-b-4 border-black-pure bg-white-pure" style={{ height: '72px' }}>
              <div className="w-16 border-r-4 border-black-pure flex items-center justify-center shrink-0 bg-black-pure">
                <div className="w-4 h-4 bg-primary-500" />
              </div>
              {columns.map((col) => (
                <button
                  key={col.key}
                  disabled={!col.sortable}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`flex items-center px-6 border-r-4 border-black-pure last:border-r-0 transition-all duration-300 group text-left ${col.sortable ? 'hover:bg-black-pure hover:text-white-pure cursor-pointer' : 'cursor-default'}`}
                  style={{ flex: col.width ? `0 0 ${col.width}` : '1 1 0%' }}
                >
                  <div className="flex flex-col">
                    <span className={`text-xs font-black uppercase tracking-widest transition-colors duration-300 ${sortKey === col.key ? 'text-primary-500' : 'text-black-pure'}`}>
                      {sortKey === col.key ? labels.sortActive : col.key}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`text-base font-black uppercase tracking-tight transition-colors duration-300 ${col.sortable ? 'group-hover:text-white-pure' : 'text-black-pure'}`}>
                        {col.label}
                      </span>
                      {col.sortable && (
                        <ArrowUpDown className={`w-4 h-4 transition-all duration-300 ${sortKey === col.key ? 'text-primary-500 scale-125' : 'text-black-pure'}`} />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex flex-col">
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
                    className={`flex flex-col md:flex-row items-stretch border-b-4 border-black-pure last:border-b-0 transition-all duration-300 group relative ${isLink ? 'cursor-pointer' : ''} ${isHovered ? 'bg-black-pure translate-x-2' : 'bg-white-pure'}`}
                  >
                    <div className={`hidden md:flex w-16 border-r-4 border-black-pure flex-col items-center justify-center shrink-0 transition-colors duration-300 ${isHovered ? 'bg-primary-500 text-black-pure' : 'bg-white-pure text-black-pure'}`}>
                      <span className="text-xl font-black">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <div className="flex flex-wrap md:flex-nowrap w-full">
                      {columns.map((col) => (
                        <div
                          key={col.key}
                          className="w-full sm:w-1/2 md:w-auto px-6 py-4 border-b-4 border-black-pure last:border-b-0 sm:even:border-l-4 md:border-b-0 md:even:border-l-0 md:border-r-4 md:last:border-r-0 flex flex-col justify-center transition-transform duration-500 group-hover:translate-x-1"
                          style={{ flex: col.width ? `0 0 ${col.width}` : '1 1 0%' }}
                        >
                          <span className={`text-xs font-black uppercase tracking-widest mb-1 transition-colors duration-300 ${isHovered ? 'text-primary-500' : 'text-black-pure'}`}>
                            {col.label}
                          </span>
                          <div className={`text-lg md:text-xl font-black uppercase tracking-tight transition-all duration-300 ${isHovered ? 'text-white-pure' : 'text-black-pure'}`}>
                            {row.cells[col.key]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Tag>
                )
              })}
              {rows.length > 10 && (
                <a
                  href={ctaPath || '#'}
                  className="flex flex-col md:flex-row items-stretch border-b-4 border-black-pure last:border-b-0 transition-all duration-300 group bg-primary-500 hover:bg-black-pure cursor-pointer"
                >
                  <div className="hidden md:flex w-16 border-r-4 border-black-pure flex-col items-center justify-center shrink-0 bg-primary-500 group-hover:bg-black-pure">
                    <span className="text-xl font-black text-black-pure group-hover:text-white-pure">+</span>
                  </div>
                  <div className="flex-1 flex items-center justify-center px-6 py-8">
                    <span className="text-xl font-black uppercase tracking-tight text-black-pure group-hover:text-white-pure">
                      View All Entries ({rows.length - 10} more)
                    </span>
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>

        {ctaLabel && ctaPath && (
          <div className="py-12 flex justify-center bg-white-pure">
            <div className="transform transition-all duration-300 hover:scale-110 active:scale-95">
              <SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" />
            </div>
          </div>
        )}

        <SectionFooter variant={footerVariant} />
      </div>
    </section>
  )
}

export default TableSection