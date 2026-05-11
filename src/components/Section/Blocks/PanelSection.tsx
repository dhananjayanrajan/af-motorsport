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
    <section id={id} className="relative w-full bg-white-pure py-8 md:py-12 lg:py-16">
      {background}

      <div className="container relative z-10 max-w-full lg:max-w-6xl mx-auto">
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
                  className="relative flex flex-col border-b-2 border-black-pure last:border-b-0 bg-white-pure"
                >
                  <button
                    onClick={() => togglePanel(panel.id)}
                    className="w-full flex items-stretch text-left outline-none group cursor-pointer"
                    style={{ minHeight: '80px' }}
                  >
                    <div className="relative w-16 md:w-20 border-r-2 border-black-pure flex flex-col items-center justify-center shrink-0 overflow-hidden transition-colors duration-500">
                      <div className={`absolute inset-0 bg-primary-500 origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${isOpen ? 'scale-y-100' : 'scale-y-0'}`} />

                      <div className="relative z-10 flex flex-col items-center justify-center">
                        <span className={`text-sm md:text-base font-black tabular-nums transition-transform duration-500 ${isOpen ? 'scale-110' : 'scale-100'}`}>
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div className={`transition-all duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                          {isOpen ? <Minus className="w-4 h-4 md:w-5 md:h-5 stroke-[3px]" /> : <Plus className="w-4 h-4 md:w-5 md:h-5 stroke-[3px]" />}
                        </div>
                      </div>
                    </div>

                    <div className="flex-grow p-4 md:px-8 flex items-center justify-between gap-4 md:gap-8">
                      <div className="flex flex-col min-w-0">
                        <span className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-500 ${isOpen ? 'text-primary-500' : 'text-black-pure/50'}`}>
                          {isOpen ? labels.expansionState.open : labels.expansionState.closed}
                        </span>
                        <h3 className={`text-base sm:text-lg md:text-2xl font-black transition-all duration-500 uppercase tracking-tighter ${isOpen ? 'text-primary-500 translate-x-2 md:translate-x-4' : 'text-black-pure group-hover:text-primary-500'}`}>
                          {panel.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-6 md:gap-12 shrink-0">
                        <p className="hidden xl:block text-[11px] font-bold max-w-[220px] text-right leading-tight text-black-pure/60">
                          {panel.summary}
                        </p>
                        <div className={`w-8 h-8 md:w-10 md:h-10 border-2 border-black-pure flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-primary-500 -translate-y-1' : 'bg-white-pure group-hover:bg-primary-500'}`}>
                          <ChevronRight className={`w-4 h-4 md:w-5 md:h-5 stroke-[3px] transition-all duration-500 ${isOpen ? 'rotate-90' : ''}`} />
                        </div>
                      </div>
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] overflow-hidden ${isOpen ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
                  >
                    <div className="p-6 md:p-12 lg:pl-32 bg-white-pure border-t-2 border-black-pure">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                        <div className={`lg:col-span-7 transition-all duration-500 delay-100 ${isOpen ? 'translate-y-0' : 'translate-y-6'}`}>
                          <div className="text-black-pure text-sm md:text-base font-medium space-y-6 leading-relaxed border-l-2 border-primary-500 pl-6">
                            {panel.content}
                          </div>
                        </div>

                        {panel.metadata && (
                          <div className={`lg:col-span-5 transition-all duration-500 delay-200 ${isOpen ? 'translate-x-0' : 'translate-x-8'}`}>
                            <div className="border-2 border-black-pure bg-white-pure">
                              <div className="px-4 py-2 border-b-2 border-black-pure bg-primary-500">
                                <span className="text-[11px] font-black text-black-pure uppercase tracking-tighter">
                                  {labels.metadataTitle}
                                </span>
                              </div>
                              <div className="flex flex-col bg-white-pure">
                                {Object.entries(panel.metadata).map(([key, val]) => (
                                  <div
                                    key={key}
                                    className="border-b-2 border-black-pure last:border-b-0 p-3 flex justify-between items-center hover:bg-black-pure hover:text-white-pure group/item transition-colors duration-200"
                                  >
                                    <span className="text-[9px] font-black uppercase tracking-widest">
                                      {key}
                                    </span>
                                    <p className="text-xs md:text-sm font-black uppercase">
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
              <div className="w-full py-8 flex flex-col items-center justify-center bg-primary-500 border-b-2 border-black-pure group cursor-pointer">
                <div className="w-10 h-10 border-2 border-black-pure bg-white-pure flex items-center justify-center mb-2 transition-transform group-hover:scale-105">
                  <Plus className="w-5 h-5 text-black-pure stroke-[3px]" />
                </div>
                <span className="text-xs font-black uppercase">{panels.length - 6} more</span>
              </div>
            )}
          </div>

          {ctaLabel && ctaPath && (
            <div className="py-10 flex justify-center bg-white-pure border-t-2 border-black-pure">
              <div className="transition-all duration-500 hover:scale-105 active:scale-95">
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