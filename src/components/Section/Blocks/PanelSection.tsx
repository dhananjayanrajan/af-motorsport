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

      <div className="w-full flex flex-col border-b border-black-pure bg-white-pure">
        {panels.map((panel, idx) => {
          const isOpen = openPanels.has(panel.id)

          return (
            <div
              key={panel.id}
              className={`relative flex flex-col border-b border-black-pure last:border-b-0 transition-all duration-500 ease-in-out ${isOpen ? 'bg-slate-50/50' : 'bg-white-pure hover:bg-slate-50/30'
                }`}
            >
              <button
                onClick={() => togglePanel(panel.id)}
                className="w-full flex items-stretch text-left outline-none group"
              >
                <div className={`w-16 md:w-24 border-r border-black-pure flex flex-col items-center justify-center shrink-0 transition-colors duration-300 ${isOpen ? 'bg-black-pure text-primary-500' : 'text-black-pure/20 group-hover:text-black-pure'}`}>
                  <span className="text-[10px] font-mono font-black mb-2 italic">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className={`transition-transform duration-500 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </div>

                <div className="flex-grow p-6 md:p-10 flex items-center justify-between gap-8">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                      <Hash className={`w-3 h-3 transition-colors ${isOpen ? 'text-primary-500' : 'text-black-pure/10'}`} />
                      <span className="text-[9px] font-mono font-black text-black-pure/30 uppercase tracking-[0.2em]">
                        {isOpen ? labels.expansionState.open : labels.expansionState.closed}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-mono font-black uppercase italic tracking-tighter leading-none text-black-pure">
                      {panel.title}
                    </h3>
                  </div>

                  <div className="hidden md:flex items-center gap-8">
                    <p className="text-[11px] font-mono font-black text-black-pure/40 uppercase tracking-widest max-w-xs text-right truncate">
                      {panel.summary}
                    </p>
                    <ChevronRight className={`w-5 h-5 transition-all duration-300 ${isOpen ? 'translate-x-1 text-primary-500' : 'text-black-pure/10'}`} />
                  </div>
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-700 ease-[0.16,1,0.3,1] ${isOpen ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="px-6 pb-12 md:px-24 md:pb-20">
                  <div className="w-full h-px bg-black-pure/5 mb-12" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
                    <div className="lg:col-span-8">
                      <div className="text-black-pure/70 font-mono text-sm uppercase leading-relaxed space-y-6">
                        {panel.content}
                      </div>
                    </div>

                    {panel.metadata && (
                      <div className="lg:col-span-4">
                        <div className="border border-black-pure bg-white-pure p-px">
                          <div className="px-4 py-2 border-b border-black-pure bg-slate-50 flex items-center justify-between">
                            <span className="text-[9px] font-mono font-black text-black-pure uppercase tracking-widest">
                              {labels.metadataTitle}
                            </span>
                            <div className="w-2 h-2 bg-primary-500" />
                          </div>
                          <div className="grid grid-cols-1 gap-px bg-black-pure/10">
                            {Object.entries(panel.metadata).map(([key, val]) => (
                              <div key={key} className="bg-white-pure p-4 flex justify-between items-center group/meta">
                                <span className="text-[9px] font-mono font-black text-black-pure/30 uppercase tracking-tight">
                                  {key}
                                </span>
                                <p className="text-xs font-mono font-black text-black-pure uppercase italic tabular-nums group-hover/meta:text-primary-500 transition-colors">
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
        <div className="p-12 md:p-20 flex justify-center bg-white-pure">
          <SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" />
        </div>
      )}

      <SectionFooter variant={footerVariant} />
    </section>
  )
}

export default PanelSection