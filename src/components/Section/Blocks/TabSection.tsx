"use client"
import React, { useState } from 'react'
import ChevronBackground from '../Backgrounds/ChevronBackground'
import SectionButton from '../Components/SectionButton'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'

export interface Tab {
  id: string
  label: string
  content: React.ReactNode
  icon?: React.ReactNode
}

interface TabLabels {
  channelPrefix: string
  statusActive: string
}

interface TabSectionProps {
  id: string
  title: string
  subtitle: string
  tabs: Tab[]
  labels: TabLabels
  defaultTab?: string
  variant?: 'underline' | 'pill' | 'block'
  ctaLabel?: string
  ctaPath?: string
  headerVariant?: 1 | 2 | 3
  footerVariant?: 1 | 2 | 3
  background?: React.ReactNode
}

const TabSection: React.FC<TabSectionProps> = ({
  id,
  title,
  subtitle,
  tabs = [],
  labels = {
    channelPrefix: '',
    statusActive: ''
  },
  defaultTab,
  variant = 'underline',
  ctaLabel,
  ctaPath,
  headerVariant = 1,
  footerVariant = 1,
  background = <ChevronBackground opacity={0.3} />
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const tabButtonStyles = {
    underline: 'border-b border-black-pure data-[active=true]:border-b-4 data-[active=true]:border-primary-500 hover:bg-neutral-50',
    pill: 'border border-black-pure m-1 shadow-[2px_2px_0px_0px_#000000] data-[active=true]:bg-black-pure data-[active=true]:text-white-pure data-[active=true]:shadow-none data-[active=true]:translate-x-0.5 data-[active=true]:translate-y-0.5',
    block: 'flex-1 border-r border-black-pure last:border-r-0 hover:bg-neutral-50 data-[active=true]:bg-primary-500 data-[active=true]:text-black-pure'
  }

  return (
    <section id={id} className="relative w-full bg-white-pure border-t border-black-pure overflow-hidden">
      {background}

      <SectionHeader
        title={title}
        subtitle={subtitle}
        variant={headerVariant}
        metadata={String(tabs.length).padStart(2, '0')}
      />

      <div className="relative z-10 w-full flex flex-col">
        <div className="w-full bg-white-pure border-b border-black-pure">
          <div className={`flex flex-wrap ${variant === 'block' ? 'flex-col md:flex-row bg-black-pure gap-[1px]' : 'bg-white-pure'}`}>
            {tabs.map((tab, idx) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  data-active={isActive}
                  className={`relative px-8 py-6 bg-white-pure font-mono font-black uppercase tracking-widest transition-all duration-150 focus:outline-none group ${tabButtonStyles[variant]}`}
                >
                  <div className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-3">
                      <span className={`text-[8px] transition-colors ${isActive ? (variant === 'block' ? 'text-black-pure' : 'text-primary-500') : 'text-black-pure/20'}`}>
                        {labels.channelPrefix}{String(idx + 1).padStart(2, '0')}
                      </span>
                      {isActive && (
                        <div className="flex items-center gap-1">
                          <div className="w-1 h-1 bg-primary-500 animate-pulse" />
                          <span className={`text-[8px] ${variant === 'block' ? 'text-black-pure' : 'text-primary-500'}`}>
                            {labels.statusActive}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      {tab.icon && (
                        <span className={`w-4 h-4 transition-colors ${isActive ? (variant === 'block' ? 'text-black-pure' : 'text-primary-500') : 'text-black-pure/40'}`}>
                          {tab.icon}
                        </span>
                      )}
                      <span className={`text-xs md:text-sm transition-colors ${isActive ? 'text-black-pure' : 'text-black-pure/40 group-hover:text-black-pure'}`}>
                        {tab.label}
                      </span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="w-full p-8 md:p-16 min-h-[400px] border-b border-black-pure bg-neutral-100 flex flex-col items-center justify-center">
          <div className="relative w-full max-w-5xl bg-white-pure border border-black-pure p-8 md:p-12 shadow-[12px_12px_0px_0px_#000000]">
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-black-pure bg-primary-500 -translate-x-2 -translate-y-2" />
            <div className="text-black-pure font-mono uppercase font-bold text-sm leading-relaxed">
              {tabs.find(t => t.id === activeTab)?.content}
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-1 bg-primary-500 translate-x-3 translate-y-3" />
          </div>
        </div>
      </div>

      {ctaLabel && ctaPath && (
        <div className="p-16 flex justify-center bg-white-pure">
          <SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" />
        </div>
      )}

      <SectionFooter variant={footerVariant} />
    </section>
  )
}

export default TabSection