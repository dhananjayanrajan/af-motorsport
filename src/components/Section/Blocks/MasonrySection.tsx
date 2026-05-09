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
    <section id={id} className="relative w-full bg-white-pure py-12 md:py-20 lg:py-24 flex flex-col items-center">
      {background}

      <DotGridBackground />

      <div className="container relative z-10">
        <div className="w-full bg-white-pure border-2 border-black-pure z-1 overflow-hidden flex flex-col">
          <SectionHeader
            title={title}
            subtitle={subtitle}
            variant={headerVariant}
            metadata={String(items.length).padStart(2, '0')}
          />

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-y-2 border-black-pure">
            {columnItems.map((col, colIdx) => (
              <div
                key={colIdx}
                className="flex flex-col border-r-2 border-black-pure last:border-r-0 min-h-[200px]"
              >
                {col.length > 0 ? (
                  col.map((item) => (
                    <div
                      key={item.id}
                      className="group relative w-full border-b-2 border-black-pure last:border-b-0 bg-white-pure flex flex-col"
                    >
                      <div className="p-6 sm:p-8 flex flex-col gap-6">
                        <div className="flex justify-between items-start">
                          <div className="flex flex-col">
                            <span className="text-xs font-mono font-black uppercase tracking-tighter text-black-pure">
                              {labels.idPrefix}{item.id}
                            </span>
                            <span className="text-xs font-mono font-black uppercase text-primary-500">
                              {item.category}
                            </span>
                          </div>
                          <div className="size-2 bg-black-pure group-hover:bg-primary-500 group-hover:rotate-45 transition-all duration-300" />
                        </div>

                        <button
                          onClick={() => openModal(item)}
                          className="relative aspect-[4/3] overflow-hidden border-2 border-black-pure cursor-pointer"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="w-10 h-10 bg-white-pure border-2 border-black-pure flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500">
                              <div className="w-4 h-4 border-2 border-black-pure" />
                            </div>
                          </div>
                        </button>

                        <div className="space-y-3">
                          <h3 className="text-xl font-black uppercase tracking-tighter leading-none text-black-pure group-hover:text-primary-500 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs font-bold text-black-pure leading-tight uppercase line-clamp-2">
                            {item.description}
                          </p>
                        </div>

                        {item.slug && (
                          <div className="pt-4 border-t-2 border-black-pure flex justify-end">
                            <Link href={item.slug} className="flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-black-pure group-hover:text-primary-500">
                                <path d="M3 10H17M17 10L12 5M17 10L12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                              </svg>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex-1 bg-white-pure flex items-center justify-center p-12">
                    <div className="w-full border-t-2 border-black-pure border-dashed" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {items.length > 9 && (
            <div className="w-full py-12 md:py-16 flex items-center justify-center bg-white-pure px-6 border-y-2 border-black-pure">
              <Link
                href={ctaPath || '#'}
                className="group flex flex-col items-center gap-4"
              >
                <div className="flex items-center gap-6 md:gap-12">
                  <div className="h-1 w-8 md:w-16 bg-primary-500 group-hover:w-24 transition-all duration-500" />
                  <span className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-black-pure group-hover:text-primary-500 transition-colors">
                    View All
                  </span>
                  <div className="h-1 w-8 md:w-16 bg-primary-500 group-hover:w-24 transition-all duration-500" />
                </div>
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
        buttonLabel={selectedItem?.slug ? "View Details" : "Close"}
        onAction={() => {
          if (selectedItem?.slug) window.location.href = selectedItem.slug;
          setModalOpen(false);
        }}
        stats={[
          { label: "ID", val: selectedItem?.id || '00', color: "bg-primary-500" },
          { label: "Category", val: selectedItem?.category || 'None', color: "bg-black-pure" }
        ]}
      />
    </section>
  )
}

export default MasonrySection