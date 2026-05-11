"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import DotGridBackground from '../Backgrounds/DotGridBackground'
import SectionFooter from '../Components/SectionFooter'
import SectionHeader from '../Components/SectionHeader'
import SectionModal from '../Components/SectionModal'

export interface MasonryItem {
  id: string
  title: string
  image: string
  category?: string
  description?: string
  height?: 'short' | 'medium' | 'tall'
  slug?: string
}

interface MasonryLabels {
  categoryPrefix: string
  idPrefix: string
}

interface MasonrySectionProps {
  id: string
  title: string
  subtitle: string
  items: MasonryItem[]
  labels: MasonryLabels
  columns?: 2 | 3 | 4
  ctaLabel?: string
  ctaPath?: string
  headerVariant?: 1 | 2 | 3
  footerVariant?: 1 | 2 | 3
  background?: React.ReactNode
}

const MasonrySection: React.FC<MasonrySectionProps> = ({
  id,
  title,
  subtitle,
  items = [],
  labels,
  columns = 3,
  ctaLabel,
  ctaPath,
  headerVariant = 1,
  footerVariant = 1,
  background
}) => {
  const [columnItems, setColumnItems] = useState<MasonryItem[][]>([])
  const [selectedItem, setSelectedItem] = useState<MasonryItem | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const displayItems = items.slice(0, 9)
    const result: MasonryItem[][] = Array.from({ length: columns }, () => [])
    displayItems.forEach((item, idx) => {
      result[idx % columns].push(item)
    })
    setColumnItems(result)
  }, [items, columns])

  const openModal = (item: MasonryItem) => {
    setSelectedItem(item)
    setModalOpen(true)
  }

  return (
    <section id={id} className="relative w-full bg-white-pure border-t-2 border-black-pure flex flex-col overflow-hidden">
      {background}

      <DotGridBackground />

      <SectionHeader
        title={title}
        subtitle={subtitle}
        variant={headerVariant}
        metadata={String(items.length).padStart(2, '0')}
      />

      <div className="container py-8 sm:py-12 lg:py-16 max-w-full lg:max-w-7xl mx-auto relative z-10 flex-1 flex flex-col">
        <div className="w-full bg-white-pure border-2 border-black-pure z-1 overflow-hidden flex flex-col">

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b-2 border-black-pure">
            {columnItems.map((col, colIdx) => (
              <div
                key={colIdx}
                className="flex flex-col border-r-2 border-black-pure last:border-r-0"
              >
                {col.length > 0 ? (
                  col.map((item) => (
                    <div
                      key={item.id}
                      className="group relative w-full border-b-2 border-black-pure last:border-b-0 bg-white-pure flex flex-col"
                    >
                      <div className="p-5 sm:p-7 xl:p-8 flex flex-col gap-5">
                        <div className="flex justify-between items-start">
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-black-pure/50">
                              {labels.idPrefix}{String(item.id).padStart(2, '0')}
                            </span>
                            <span className="text-[10px] font-mono font-black uppercase tracking-widest text-primary-500">
                              {item.category}
                            </span>
                          </div>
                          <div className="size-2 bg-black-pure group-hover:bg-primary-500 group-hover:rotate-45 transition-all duration-500" />
                        </div>

                        <button
                          onClick={() => openModal(item)}
                          className="relative aspect-[4/3] overflow-hidden border-2 border-black-pure cursor-pointer"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black-pure/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="px-4 py-2 bg-primary-500 border-2 border-black-pure translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                              <span className="text-[10px] font-mono font-black text-black-pure uppercase tracking-widest">Preview</span>
                            </div>
                          </div>
                        </button>

                        <div className="space-y-3">
                          <h3 className="text-lg xl:text-xl font-black uppercase tracking-widest leading-none text-black-pure group-hover:text-primary-500 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs font-bold text-black-pure leading-relaxed uppercase opacity-80 line-clamp-2">
                            {item.description}
                          </p>
                        </div>

                        {item.slug && (
                          <div className="pt-4 border-t-2 border-black-pure flex justify-end">
                            <Link href={item.slug} className="group/link flex items-center gap-3">
                              <span className="text-[10px] font-mono font-black uppercase tracking-widest opacity-0 group-hover/link:opacity-100 transition-opacity">Launch</span>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-black-pure group-hover:text-primary-500 transition-transform group-hover:translate-x-1">
                                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
                              </svg>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex-1 bg-secondary-500/5 flex items-center justify-center min-h-[300px]">
                    <div className="w-12 h-[2px] bg-black-pure/10" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {items.length > 9 && (
            <div className="w-full py-10 md:py-16 flex items-center justify-center bg-white-pure px-6">
              <Link
                href={ctaPath || '#'}
                className="group flex items-center gap-4 md:gap-8"
              >
                <div className="h-[2px] w-8 md:w-16 bg-black-pure group-hover:bg-primary-500 group-hover:w-24 transition-all duration-500" />
                <span className="text-2xl md:text-3xl xl:text-4xl font-black uppercase tracking-widest text-black-pure group-hover:text-primary-500 transition-colors">
                  {ctaLabel || 'Full Archive'}
                </span>
                <div className="h-[2px] w-8 md:w-16 bg-black-pure group-hover:bg-primary-500 group-hover:w-24 transition-all duration-500" />
              </Link>
            </div>
          )}

          <SectionFooter variant={footerVariant} />
        </div>
      </div>

      <SectionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedItem?.title || ''}
        description={selectedItem?.description || ''}
        imageUrl={selectedItem?.image || ''}
        idCode={`${labels.idPrefix}${selectedItem?.id || ''}`}
        infoLabel={selectedItem?.category}
        buttonLabel={selectedItem?.slug ? "Open Project" : "Close"}
        onAction={() => {
          if (selectedItem?.slug) window.location.href = selectedItem.slug;
          setModalOpen(false);
        }}
        stats={[
          { label: "Ref", val: selectedItem?.id || '00', color: "bg-primary-500" },
          { label: "Type", val: selectedItem?.category || 'General', color: "bg-black-pure" }
        ]}
      />
    </section>
  )
}

export default MasonrySection