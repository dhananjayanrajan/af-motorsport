// PanelSection.tsx
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

      <div className="w-full flex flex-col border-b border-black-pure bg-white-pure gap-px">
        {panels.map((panel, idx) => {
          const isOpen = openPanels.has(panel.id)

          return (
            <div
              key={panel.id}
              className={`relative flex flex-col transition-all duration-300 ${isOpen ? 'bg-neutral-50' : 'bg-white-pure'}`}
            >
              <button
                onClick={() => togglePanel(panel.id)}
                className="w-full flex items-stretch text-left outline-none group border-b border-black-pure last:border-b-0 transition-all duration-300 hover:bg-neutral-50"
                style={{ minHeight: '88px' }}
              >
                <div className={`w-20 border-r border-black-pure flex flex-col items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-black-pure text-primary-500' : 'bg-white-pure text-black-pure'}`}>
                  <span className="text-base font-bold mb-2">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className={`transition-all duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </div>

                <div className="flex-grow p-6 md:p-8 flex items-center justify-between gap-8">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Hash className={`w-3 h-3 transition-colors duration-300 ${isOpen ? 'text-primary-500' : 'text-black-pure/30'}`} />
                      <span className="text-base font-bold text-black-pure/60">
                        {isOpen ? labels.expansionState.open : labels.expansionState.closed}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-black-pure transition-colors duration-300 group-hover:text-primary-500">
                      {panel.title}
                    </h3>
                  </div>

                  <div className="hidden md:flex items-center gap-12">
                    <p className="text-base font-bold text-black-pure/60 max-w-[200px] text-right">
                      {panel.summary}
                    </p>
                    <div className={`w-8 h-8 border border-black-pure flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-primary-500' : 'bg-white-pure group-hover:bg-primary-500'}`}>
                      <ChevronRight className={`w-4 h-4 transition-all duration-300 ${isOpen ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                    </div>
                  </div>
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-400 ${isOpen ? 'max-h-[800px]' : 'max-h-0'}`}
              >
                <div className="p-8 md:p-12 md:pl-32 bg-neutral-50">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-7">
                      <div className="text-black-pure text-base space-y-6">
                        {panel.content}
                      </div>
                    </div>

                    {panel.metadata && (
                      <div className="lg:col-span-5">
                        <div className="border border-black-pure bg-white-pure transition-all duration-300 hover:shadow-lg">
                          <div className="px-4 py-2 border-b border-black-pure bg-black-pure flex items-center justify-between">
                            <span className="text-base font-bold text-primary-500">
                              {labels.metadataTitle}
                            </span>
                            <div className="w-2 h-2 bg-primary-500 transition-all duration-300 animate-pulse" />
                          </div>
                          <div className="flex flex-col">
                            {Object.entries(panel.metadata).map(([key, val]) => (
                              <div key={key} className="border-b border-black-pure last:border-b-0 p-4 flex justify-between items-center transition-all duration-300 hover:bg-neutral-50">
                                <span className="text-base font-bold text-black-pure/60">
                                  {key}
                                </span>
                                <p className="text-base font-bold text-black-pure">
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
        <div className="py-16 flex justify-center bg-white-pure border-b border-black-pure">
          <SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" />
        </div>
      )}

      <SectionFooter variant={footerVariant} />
    </section>
  )
}

export default PanelSection