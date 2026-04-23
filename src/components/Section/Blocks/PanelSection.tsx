"use client"
import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import SectionHeader from '../Components/SectionHeader'
import SectionFooter from '../Components/SectionFooter'
import SectionButton from '../Components/SectionButton'
import TactileBackground from '../Backgrounds/TactileBackground'

export interface Panel {
  id: string
  title: string
  summary: string
  content: React.ReactNode
  metadata?: Record<string, string>
}

interface PanelSectionProps {
  id: string
  title: string
  subtitle: string
  panels: Panel[]
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
  panels,
  allowMultiple = false,
  ctaLabel,
  ctaPath,
  headerVariant = 1,
  footerVariant = 1,
  background = <TactileBackground opacity={0.3} />
}) => {
  const [openPanels, setOpenPanels] = useState<Set<string>>(new Set())

  const togglePanel = (panelId: string) => {
    setOpenPanels(prev => {
      const next = new Set(prev)
      if (next.has(panelId)) next.delete(panelId)
      else if (allowMultiple) next.add(panelId)
      else return new Set([panelId])
      return next
    })
  }

  return (
    <section className="relative w-full bg-background py-16 md:py-24">
      {background}
      <div className="relative z-10 container mx-auto px-4">
        <SectionHeader title={title} subtitle={subtitle} variant={headerVariant} metadata={String(panels.length)} />
        <div className="mt-12 space-y-4">
          {panels.map((panel) => {
            const isOpen = openPanels.has(panel.id)
            return (
              <div key={panel.id} className="border border-border rounded-lg overflow-hidden bg-card transition-all duration-300 hover:shadow-lg">
                <button
                  onClick={() => togglePanel(panel.id)}
                  className="w-full p-6 flex items-center justify-between text-left group focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">{panel.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{panel.summary}</p>
                  </div>
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-primary" /> : <ChevronDown className="w-4 h-4 text-primary" />}
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-6 pt-0 border-t border-border">
                    <div className="prose max-w-none mt-6">{panel.content}</div>
                    {panel.metadata && (
                      <div className="mt-6 grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                        {Object.entries(panel.metadata).map(([key, val]) => (
                          <div key={key}>
                            <span className="text-xs font-mono text-muted-foreground uppercase">{key}</span>
                            <p className="text-sm font-semibold text-foreground">{val}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {ctaLabel && ctaPath && <div className="flex justify-center mt-12"><SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" /></div>}
        <SectionFooter variant={footerVariant} />
      </div>
    </section>
  )
}

export default PanelSection
