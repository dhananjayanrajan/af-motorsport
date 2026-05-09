"use client"
import { ChevronRight, Minus, Plus } from 'lucide-react'
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
        next.delete(panelId)
      } else {
        if (!allowMultiple) next.clear()
        next.add(panelId)
      }
      return next
    })
  }

  const displayPanels = panels.slice(0, 6)

  return (
    <section id={id} className="relative w-full bg-white-pure py-12 md:py-20 lg:py-24">
      {background}

      <div className="container relative z-10">
        <div className="border-2 border-black-pure bg-white-pure">
          <SectionHeader
            title={title}
            subtitle={subtitle}
            variant={headerVariant}
            metadata={String(panels.length).padStart(2, '0')}
          />

          <div className="w-full flex flex-col bg-white-pure border-t-2 border-black-pure">
            {displayPanels.map((panel, idx) => {
              const isOpen = openPanels.has(panel.id)

              return (
                <div
                  key={panel.id}
                  className={`relative flex flex-col transition-colors duration-500 border-b-2 border-black-pure last:border-b-0 ${isOpen ? 'bg-white-pure' : 'bg-white-pure'}`}
                >
                  <button
                    onClick={() => togglePanel(panel.id)}
                    className="w-full flex items-stretch text-left outline-none group cursor-pointer"
                    style={{ minHeight: '100px' }}
                  >
                    <div className={`w-20 md:w-24 border-r-2 border-black-pure flex flex-col items-center justify-center shrink-0 transition-all duration-500 ${isOpen ? 'bg-primary-500 text-black-pure' : 'bg-white-pure text-black-pure group-hover:bg-black-pure group-hover:text-white-pure'}`}>
                      <span className={`text-base md:text-xl font-black mb-1 transition-transform duration-500 ${isOpen ? 'scale-125' : 'scale-100'}`}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className={`transition-all duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                        {isOpen ? <Minus className="w-6 h-6 stroke-[3px]" /> : <Plus className="w-6 h-6 stroke-[3px]" />}
                      </div>
                    </div>

                    <div className="flex-grow p-6 md:px-10 flex items-center justify-between gap-8">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-black uppercase tracking-widest transition-colors duration-500 ${isOpen ? 'text-primary-500' : 'text-black-pure'}`}>
                            {isOpen ? labels.expansionState.open : labels.expansionState.closed}
                          </span>
                        </div>
                        <h3 className={`text-xl md:text-3xl font-black transition-all duration-500 uppercase tracking-tighter ${isOpen ? 'text-primary-500 translate-x-4' : 'text-black-pure group-hover:text-primary-500'}`}>
                          {panel.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-12">
                        <p className={`hidden xl:block text-sm font-bold max-w-[280px] text-right leading-tight transition-all duration-500 ${isOpen ? 'text-black-pure' : 'text-black-pure'}`}>
                          {panel.summary}
                        </p>
                        <div className={`w-12 h-12 border-2 border-black-pure flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-primary-500 -translate-y-1' : 'bg-white-pure group-hover:bg-primary-500'}`}>
                          <ChevronRight className={`w-6 h-6 stroke-[3px] transition-all duration-500 ${isOpen ? 'rotate-90 text-black-pure' : 'text-black-pure'}`} />
                        </div>
                      </div>
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] overflow-hidden ${isOpen ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
                  >
                    <div className="p-8 md:p-16 lg:pl-32 bg-white-pure border-t-2 border-black-pure">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                        <div className={`lg:col-span-7 transition-all duration-700 delay-200 ${isOpen ? 'translate-y-0' : 'translate-y-10'}`}>
                          <div className="text-black-pure text-lg md:text-xl font-medium space-y-8 leading-relaxed border-l-4 border-primary-500 pl-8">
                            {panel.content}
                          </div>
                        </div>

                        {panel.metadata && (
                          <div className={`lg:col-span-5 transition-all duration-700 delay-400 ${isOpen ? 'translate-x-0' : 'translate-x-12'}`}>
                            <div className="border-2 border-black-pure bg-white-pure">
                              <div className="px-6 py-4 border-b-2 border-black-pure bg-primary-500 flex items-center justify-between">
                                <span className="text-sm md:text-base font-black text-black-pure uppercase tracking-tighter">
                                  {labels.metadataTitle}
                                </span>
                              </div>
                              <div className="flex flex-col bg-white-pure">
                                {Object.entries(panel.metadata).map(([key, val]) => (
                                  <div
                                    key={key}
                                    className="border-b-2 border-black-pure last:border-b-0 p-5 flex justify-between items-center transition-all duration-300 hover:bg-black-pure hover:text-white-pure group/item"
                                  >
                                    <span className="text-xs font-black text-black-pure uppercase tracking-widest group-hover/item:text-white-pure">
                                      {key}
                                    </span>
                                    <p className="text-base md:text-lg font-black text-black-pure uppercase group-hover/item:text-white-pure">
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
            {panels.length > 6 && (
              <div className="w-full py-12 flex items-center justify-center bg-primary-500 border-b-2 border-black-pure">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-black-pure bg-white-pure mx-auto mb-4 flex items-center justify-center">
                    <Plus className="w-8 h-8 text-black-pure" />
                  </div>
                  <span className="text-lg font-black text-black-pure uppercase">View All</span>
                  <span className="text-sm font-mono font-black text-black-pure block mt-2">{panels.length - 6} more</span>
                </div>
              </div>
            )}
          </div>

          {ctaLabel && ctaPath && (
            <div className="py-16 flex justify-center bg-white-pure border-t-2 border-black-pure">
              <div className="transition-all duration-500 hover:scale-110 active:scale-95">
                <SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" />
              </div>
            </div>
          )}

          <SectionFooter variant={footerVariant} />
        </div>
      </div>
    </section>
  )
}

export default PanelSection