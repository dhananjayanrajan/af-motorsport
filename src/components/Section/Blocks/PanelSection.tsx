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
        next.delete(panelId)
      } else {
        if (!allowMultiple) next.clear()
        next.add(panelId)
      }
      return next
    })
  }

  return (
    <section id={id} className="relative w-full bg-background py-12 md:py-20 lg:py-24">
      {background}

      <div className="container relative z-10">
        <div className="border-[3px] border-black-pure bg-white-pure shadow-[12px_12px_0px_0px_#000000]">
          <SectionHeader
            title={title}
            subtitle={subtitle}
            variant={headerVariant}
            metadata={String(panels.length).padStart(2, '0')}
          />

          <div className="w-full flex flex-col bg-white-pure border-t-[3px] border-black-pure">
            {panels.map((panel, idx) => {
              const isOpen = openPanels.has(panel.id)

              return (
                <div
                  key={panel.id}
                  className={`relative flex flex-col transition-colors duration-500 border-b-[3px] border-black-pure last:border-b-0 ${isOpen ? 'bg-black-950' : 'bg-white-pure'}`}
                >
                  {/* Header/Trigger */}
                  <button
                    onClick={() => togglePanel(panel.id)}
                    className="w-full flex items-stretch text-left outline-none group cursor-pointer"
                    style={{ minHeight: '100px' }}
                  >
                    <div className={`w-20 md:w-24 border-r-[3px] border-black-pure flex flex-col items-center justify-center shrink-0 transition-all duration-500 ${isOpen ? 'bg-primary-500 text-black-pure' : 'bg-white-pure text-black-pure group-hover:bg-neutral-100'}`}>
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
                          <Hash className={`w-4 h-4 transition-colors duration-500 ${isOpen ? 'text-primary-400' : 'text-neutral-400'}`} />
                          <span className={`text-xs font-black uppercase tracking-widest transition-colors duration-500 ${isOpen ? 'text-neutral-400' : 'text-neutral-500'}`}>
                            {isOpen ? labels.expansionState.open : labels.expansionState.closed}
                          </span>
                        </div>
                        <h3 className={`text-xl md:text-3xl font-black transition-all duration-500 uppercase italic tracking-tighter ${isOpen ? 'text-primary-500 translate-x-4' : 'text-black-pure group-hover:text-primary-600'}`}>
                          {panel.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-12">
                        <p className={`hidden xl:block text-sm font-bold max-w-[280px] text-right leading-tight transition-all duration-500 ${isOpen ? 'text-neutral-300' : 'text-neutral-500'}`}>
                          {panel.summary}
                        </p>
                        <div className={`w-12 h-12 border-[3px] border-black-pure flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-primary-500 shadow-[4px_4px_0px_0px_#ffffff] -translate-y-1' : 'bg-white-pure group-hover:bg-primary-500 group-hover:shadow-[4px_4px_0px_0px_#000000]'}`}>
                          <ChevronRight className={`w-6 h-6 stroke-[3px] transition-all duration-500 ${isOpen ? 'rotate-90 text-black-pure' : 'text-black-pure'}`} />
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Content Body - Pure CSS Collapse */}
                  <div
                    className={`transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] overflow-hidden ${isOpen ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
                  >
                    <div className="p-8 md:p-16 lg:pl-32 bg-black-950 border-t-[3px] border-black-pure">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                        {/* Text Content */}
                        <div className={`lg:col-span-7 transition-all duration-700 delay-200 ${isOpen ? 'translate-y-0' : 'translate-y-10'}`}>
                          <div className="text-neutral-100 text-lg md:text-xl font-medium space-y-8 leading-relaxed border-l-4 border-primary-500 pl-8">
                            {panel.content}
                          </div>
                        </div>

                        {/* Metadata Card */}
                        {panel.metadata && (
                          <div className={`lg:col-span-5 transition-all duration-700 delay-400 ${isOpen ? 'translate-x-0' : 'translate-x-12'}`}>
                            <div className="border-[3px] border-primary-500 bg-black-900 shadow-[8px_8px_0px_0px_#00FF41]">
                              <div className="px-6 py-4 border-b-[3px] border-primary-500 bg-primary-500 flex items-center justify-between">
                                <span className="text-sm md:text-base font-black text-black-pure uppercase tracking-tighter">
                                  {labels.metadataTitle}
                                </span>
                                <div className="flex gap-1">
                                  <div className="w-2 h-2 bg-black-pure rounded-full animate-pulse" />
                                  <div className="w-2 h-2 bg-black-pure rounded-full animate-pulse delay-75" />
                                </div>
                              </div>
                              <div className="flex flex-col bg-black-900">
                                {Object.entries(panel.metadata).map(([key, val]) => (
                                  <div
                                    key={key}
                                    className="border-b-[2px] border-neutral-800 last:border-b-0 p-5 flex justify-between items-center transition-all duration-300 hover:bg-black-800 group/item"
                                  >
                                    <span className="text-xs font-black text-neutral-500 uppercase tracking-widest group-hover/item:text-primary-400">
                                      {key}
                                    </span>
                                    <p className="text-base md:text-lg font-black text-neutral-100 uppercase italic group-hover/item:text-primary-500">
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
            <div className="py-16 flex justify-center bg-white-pure border-t-[3px] border-black-pure">
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

export default PanelSection;