"use client"
import React, { useState } from 'react'
import SectionHeader from '../Components/SectionHeader'
import SectionFooter from '../Components/SectionFooter'
import SectionButton from '../Components/SectionButton'
import ChevronBackground from '../Backgrounds/ChevronBackground'

export interface Tab {
  id: string
  label: string
  content: React.ReactNode
  icon?: React.ReactNode
}

interface TabSectionProps {
  id: string
  title: string
  subtitle: string
  tabs: Tab[]
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
  tabs,
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
    underline: 'border-b-2 border-transparent hover:border-primary focus:border-primary data-[active=true]:border-primary',
    pill: 'rounded-full hover:bg-primary/10 focus:bg-primary/10 data-[active=true]:bg-primary data-[active=true]:text-primary-foreground',
    block: 'flex-1 text-center border border-border hover:bg-accent focus:bg-accent data-[active=true]:bg-primary data-[active=true]:text-primary-foreground'
  }

  return (
    <section className="relative w-full bg-background py-16 md:py-24">
      {background}
      <div className="relative z-10 container mx-auto px-4">
        <SectionHeader title={title} subtitle={subtitle} variant={headerVariant} metadata={String(tabs.length)} />
        <div className="mt-8">
          <div className={`flex flex-wrap gap-2 ${variant === 'block' ? 'flex-col sm:flex-row' : ''}`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                data-active={activeTab === tab.id}
                className={`px-6 py-3 font-mono font-semibold uppercase tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary active:scale-95 ${tabButtonStyles[variant]}`}
              >
                <div className="flex items-center gap-2">
                  {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
                  {tab.label}
                </div>
              </button>
            ))}
          </div>
          <div className="mt-8 p-6 bg-card border border-border rounded-xl transition-all duration-500">
            {tabs.find(t => t.id === activeTab)?.content}
          </div>
        </div>
        {ctaLabel && ctaPath && <div className="flex justify-center mt-12"><SectionButton label={ctaLabel} href={ctaPath} variant="primary" size="lg" /></div>}
        <SectionFooter variant={footerVariant} />
      </div>
    </section>
  )
}

export default TabSection
