"use client"
import { ChevronRight, Hash, Minus, Plus } from 'lucide-react'
import React, { useState } from 'react'
import SectionButton from '../Components/SectionButton'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'

export interface Panel {
  id: string
  title: string
  summary: string
  content: React.ReactNode
  metadata?: Record<string, string>
}

interface PanelLabels {
  expansionState: {
    open: string
    closed: string
  }
  metadataTitle: string
}

interface PanelSectionProps {
  id: string
  title: string
  subtitle: string
  panels: Panel[]
  labels: PanelLabels
  allowMultiple?: boolean
  ctaLabel?: string
  ctaPath?: string
  headerVariant?: 1 | 2 | 3
  footerVariant?: 1 | 2 | 3
  background?: React.ReactNode
}

const PanelSection: React.FC<PanelSectionProps> = ({
  id,
  title,
  subtitle,
  panels = [],
  labels,
  allowMultiple = false,
  ctaLabel,
  ctaPath,
  headerVariant = 1,
  footerVariant = 1,
  background
}) => {
  const [openPanels, setOpenPanels] = useState<Set<string>>(new Set([panels[0]?.id]))

  const togglePanel = (panelId: string) => {
    setOpenPanels(prev => {
      const next = new Set(prev)
      if (next.has(panelId)) {
        if (next.size > 1) next.delete(panelId)
      } else {
        if (!allowMultiple) next.clear()
        next.add(panelId)
      }
      return next
    })
  }

  return (
    <section id={id} className="relative w-full bg-white-pure border-t border-black-pure overflow-hidden">
      {background}

      <SectionHeader
        title={title}
        subtitle={subtitle}
        variant={headerVariant}
        metadata={String(panels.length).padStart(2, '0')}
      />

      <div className="w-full flex flex-col border-b border-black-pure bg-black-pure gap-[1px]">
        {panels.map((panel, idx) => {
          const isOpen = openPanels.has(panel.id)

          return (
            <div
              key={panel.id}
              className={`relative flex flex-col transition-colors duration-200 ${isOpen ? 'bg-neutral-100' : 'bg-white-pure'
                }`}
            >
              <button
                onClick={() => togglePanel(panel.id)}
                className="w-full flex items-stretch text-left outline-none group border-b border-black-pure last:border-b-0"
              >
                <div className={`w-16 md:w-20 border-r border-black-pure flex flex-col items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-black-pure text-primary' : 'bg-white-pure text-black-pure'}`}>
                  <span className="text-[10px] font-mono font-black mb-2 tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className={`transition-transform duration-200 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </div>

                <div className="flex-grow p-6 md:p-8 flex items-center justify-between gap-8 group-hover:bg-neutral-50 transition-colors">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Hash className={`w-3 h-3 ${isOpen ? 'text-primary' : 'text-neutral-300'}`} />
                      <span className="text-[8px] font-mono font-black text-neutral-500 uppercase tracking-widest">
                        {isOpen ? labels.expansionState.open : labels.expansionState.closed}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-mono font-black uppercase text-black-pure tracking-tight">
                      {panel.title}
                    </h3>
                  </div>

                  <div className="hidden md:flex items-center gap-12">
                    <p className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-wide max-w-[200px] text-right">
                      {panel.summary}
                    </p>
                    <div className={`w-8 h-8 border border-black-pure flex items-center justify-center transition-all ${isOpen ? 'bg-primary shadow-none translate-x-1 translate-y-1' : 'bg-white-pure shadow-[4px_4px_0px_0px_#000000]'}`}>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[2000px]' : 'max-h-0'
                  }`}
              >
                <div className="p-8 md:p-12 md:pl-32 bg-neutral-100">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-7">
                      <div className="text-black-pure font-mono text-[11px] font-bold uppercase leading-relaxed space-y-6">
                        {panel.content}
                      </div>
                    </div>

                    {panel.metadata && (
                      <div className="lg:col-span-5">
                        <div className="border border-black-pure bg-white-pure shadow-[8px_8px_0px_0px_#000000]">
                          <div className="px-4 py-2 border-b border-black-pure bg-black-pure flex items-center justify-between">
                            <span className="text-[8px] font-mono font-black text-primary uppercase tracking-widest">
                              {labels.metadataTitle}
                            </span>
                            <div className="w-2 h-2 bg-primary" />
                          </div>
                          <div className="flex flex-col">
                            {Object.entries(panel.metadata).map(([key, val]) => (
                              <div key={key} className="border-b border-black-pure last:border-b-0 p-4 flex justify-between items-center group/meta hover:bg-neutral-50 transition-colors">
                                <span className="text-[8px] font-mono font-black text-neutral-400 uppercase">
                                  {key}
                                </span>
                                <p className="text-[10px] font-mono font-black text-black-pure uppercase tabular-nums">
                                  {val}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
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

export default PanelSection