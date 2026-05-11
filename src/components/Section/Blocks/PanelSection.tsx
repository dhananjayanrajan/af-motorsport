"use client"
import { cn } from '@/utilities/cn'
import { ChevronRight, Minus, Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
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
    <section id={id} className="relative w-full bg-white-pure border-t-2 border-black-pure overflow-hidden">
      {background}

      <SectionHeader
        title={title}
        subtitle={subtitle}
        variant={headerVariant}
        metadata={String(panels.length).padStart(2, '0')}
      />

      <div className="container py-8 sm:py-12 lg:py-16 max-w-full lg:max-w-7xl mx-auto relative z-10">
        <div className="border-2 border-black-pure bg-white-pure overflow-hidden">
          <div className="flex flex-col divide-y-2 divide-black-pure">
            {displayPanels.map((panel, idx) => {
              const isOpen = openPanels.has(panel.id)

              return (
                <div key={panel.id} className="bg-white-pure">
                  <button
                    onClick={() => togglePanel(panel.id)}
                    className={cn(
                      "w-full min-h-[80px] xl:min-h-[100px] flex items-stretch text-left outline-none group cursor-pointer transition-colors duration-300",
                      isOpen ? "bg-white-pure" : "bg-white-pure hover:bg-secondary-500"
                    )}
                  >
                    <div className="relative w-16 md:w-24 border-r-2 border-black-pure flex flex-col items-center justify-center shrink-0 overflow-hidden">
                      <div
                        className={cn(
                          "absolute inset-0 bg-black-pure origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
                          isOpen ? "scale-y-100" : "scale-y-0"
                        )}
                      />
                      <div className="relative z-10 flex flex-col items-center gap-2">
                        <span className={cn(
                          "text-sm md:text-lg font-mono font-black tabular-nums transition-colors duration-500",
                          isOpen ? "text-primary-500" : "text-black-pure"
                        )}>
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div className={cn(
                          "transition-all duration-500",
                          isOpen ? "text-white-pure rotate-180" : "text-black-pure rotate-0"
                        )}>
                          {isOpen ? <Minus className="size-4 md:size-6 stroke-[3px]" /> : <Plus className="size-4 md:size-6 stroke-[3px]" />}
                        </div>
                      </div>
                    </div>

                    <div className="flex-grow p-5 md:px-10 flex items-center justify-between gap-6">
                      <div className="flex flex-col gap-1">
                        <span className={cn(
                          "text-[10px] xl:text-xs font-black uppercase tracking-[0.2em] transition-colors duration-500",
                          isOpen ? "text-primary-500" : "text-black-pure"
                        )}>
                          {isOpen ? labels.expansionState.open : labels.expansionState.closed}
                        </span>
                        <h3 className={cn(
                          "text-lg md:text-2xl xl:text-4xl font-black uppercase tracking-tighter transition-all duration-500 leading-none",
                          isOpen ? "text-black-pure translate-x-2" : "text-black-pure group-hover:text-white-pure"
                        )}>
                          {panel.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-8 xl:gap-16 shrink-0">
                        <p className={cn(
                          "hidden lg:block text-xs xl:text-sm font-bold max-w-[280px] text-right leading-tight uppercase italic transition-colors",
                          isOpen ? "text-black-pure" : "text-black-pure group-hover:text-white-pure"
                        )}>
                          {panel.summary}
                        </p>
                        <div className={cn(
                          "size-10 xl:size-14 border-2 border-black-pure flex items-center justify-center transition-all duration-500",
                          isOpen ? "bg-primary-500 -translate-y-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : "bg-white-pure group-hover:bg-primary-500"
                        )}>
                          <ChevronRight className={cn(
                            "size-5 xl:size-7 stroke-[3px] transition-transform duration-500",
                            isOpen ? "rotate-90" : ""
                          )} />
                        </div>
                      </div>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                        className="overflow-hidden border-t-2 border-black-pure bg-white-pure"
                      >
                        <div className="p-8 md:p-16 lg:pl-40 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                          <div className="lg:col-span-7">
                            <div className="text-black-pure text-base md:text-lg xl:text-xl font-bold space-y-8 leading-relaxed border-l-4 border-primary-500 pl-8 xl:pl-12">
                              {panel.content}
                            </div>
                          </div>

                          {panel.metadata && (
                            <div className="lg:col-span-5">
                              <div className="border-2 border-black-pure bg-white-pure shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                <div className="px-6 py-4 border-b-2 border-black-pure bg-black-pure">
                                  <span className="text-xs xl:text-sm font-black text-primary-500 uppercase tracking-widest">
                                    {labels.metadataTitle}
                                  </span>
                                </div>
                                <div className="flex flex-col">
                                  {Object.entries(panel.metadata).map(([key, val]) => (
                                    <div
                                      key={key}
                                      className="border-b-2 border-black-pure last:border-b-0 p-4 xl:p-6 flex justify-between items-center hover:bg-primary-500 transition-colors duration-200 group/meta"
                                    >
                                      <span className="text-[10px] xl:text-xs font-black uppercase tracking-widest text-black-pure group-hover/meta:text-black-pure">
                                        {key}
                                      </span>
                                      <p className="text-sm xl:text-lg font-black uppercase text-black-pure">
                                        {val}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}

            {panels.length > 6 && (
              <button className="w-full py-12 flex flex-col items-center justify-center bg-secondary-500 border-t-2 border-black-pure group transition-colors hover:bg-primary-500">
                <div className="size-14 border-2 border-black-pure bg-white-pure flex items-center justify-center mb-4 transition-transform group-hover:rotate-90 group-hover:scale-110">
                  <Plus className="size-8 text-black-pure stroke-[3px]" />
                </div>
                <span className="text-sm xl:text-base font-black uppercase tracking-[0.3em] text-black-pure">{panels.length - 6} Additional Entries</span>
              </button>
            )}
          </div>

          {ctaLabel && ctaPath && (
            <div className="py-12 xl:py-20 flex justify-center bg-white-pure border-t-2 border-black-pure">
              <div className="transition-all duration-500 hover:scale-105 active:scale-95 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
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