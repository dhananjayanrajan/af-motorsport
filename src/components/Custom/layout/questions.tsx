'use client'

import { RichText } from '@/components/RichText'
import DotGridBackground from '@/components/Section/Backgrounds/DotGridBackground'
import SectionHeader from '@/components/Section/Components/SectionHeader'
import type { Question } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { ArrowUpRight, Minus, Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { useState } from 'react'

interface QuestionsProps {
  data: Question
}

export function FAQAccordionBlock({ data }: QuestionsProps) {
  const [openId, setOpenId] = useState<string | null>(null)
  const [openCategory, setOpenCategory] = useState<number | null>(0)

  if (!data?.categories) return null
  const allVisibleCategories = data.categories.filter((cat) => cat.visible !== false)

  return (
    <section className="relative w-full bg-white-pure border-t-2 border-black-pure overflow-hidden">
      <DotGridBackground />

      <SectionHeader
        title="QUESTIONS"
        subtitle=""
        variant={1}
        metadata={String(allVisibleCategories.length).padStart(2, '0')}
      />

      <div className="container py-8 sm:py-12 lg:py-16 max-w-full lg:max-w-7xl mx-auto relative z-10">
        <div className="border-2 border-black-pure bg-white-pure overflow-hidden">
          <div className="flex flex-col divide-y-2 divide-black-pure">
            {allVisibleCategories.map((category, catIdx) => {
              const isCatOpen = openCategory === catIdx
              return (
                <div key={catIdx} className="bg-white-pure">
                  <button
                    onClick={() => {
                      setOpenCategory(isCatOpen ? null : catIdx)
                      setOpenId(null)
                    }}
                    className={cn(
                      "w-full h-14 xl:h-16 px-6 xl:px-8 flex items-center justify-between transition-colors duration-300 outline-none group/cat",
                      isCatOpen ? "bg-black-pure" : "bg-white-pure hover:bg-primary-500"
                    )}
                  >
                    <div className="flex items-center gap-6">
                      <span className={cn(
                        "text-xs xl:text-sm font-mono font-black tabular-nums transition-colors",
                        isCatOpen ? "text-primary-500" : "text-black-pure"
                      )}>
                        {(catIdx + 1).toString().padStart(2, '0')}
                      </span>
                      <h4 className={cn(
                        "text-sm xl:text-md font-black uppercase tracking-widest transition-colors",
                        isCatOpen ? "text-white-pure" : "text-black-pure"
                      )}>
                        {category.label}
                      </h4>
                    </div>
                    <div className={cn(
                      "size-6 border-2 flex items-center justify-center transition-all duration-300",
                      isCatOpen ? "border-primary-500 bg-primary-500 rotate-90" : "border-black-pure bg-white-pure"
                    )}>
                      <div className={cn("size-1.5", isCatOpen ? "bg-black-pure" : "bg-black-pure")} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isCatOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                        className="overflow-hidden border-t-2 border-black-pure bg-white-pure"
                      >
                        <div className="flex flex-col divide-y-2 divide-black-pure/10">
                          {category.items?.map((item, itemIdx) => {
                            const uniqueId = `${catIdx}-${itemIdx}`
                            const isItemOpen = openId === uniqueId
                            return (
                              <div key={itemIdx} className="bg-white-pure">
                                <button
                                  onClick={() => setOpenId(isItemOpen ? null : uniqueId)}
                                  className={cn(
                                    "w-full p-5 xl:p-8 flex items-center justify-between text-left transition-colors duration-200 outline-none",
                                    isItemOpen ? "bg-secondary-500" : "hover:bg-black-pure hover:text-white-pure group/item"
                                  )}
                                >
                                  <div className="flex flex-col gap-1">
                                    <span className="text-xs xl:text-sm font-black uppercase tracking-tight">
                                      {item.question}
                                    </span>
                                  </div>
                                  <div className="shrink-0 transition-transform duration-300">
                                    {isItemOpen ? <Minus className="size-5 stroke-[3px]" /> : <Plus className="size-5 stroke-[3px]" />}
                                  </div>
                                </button>
                                <AnimatePresence initial={false}>
                                  {isItemOpen && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                                      className="bg-white-pure border-t-2 border-black-pure"
                                    >
                                      <div className="p-6 xl:p-12 xl:px-20 flex flex-col items-start gap-6">
                                        <div className="text-xs xl:text-sm font-bold uppercase leading-relaxed text-black-pure max-w-4xl">
                                          <RichText data={item.answer as any} enableGutter={false} />
                                        </div>
                                        {item.relatedPage && (
                                          <Link
                                            href={item.relatedPage}
                                            className="h-10 inline-flex items-center gap-3 px-6 bg-black-pure text-white-pure hover:bg-primary-500 hover:text-black-pure transition-colors duration-300 text-[10px] font-black uppercase tracking-widest outline-none"
                                          >
                                            VIEW <ArrowUpRight className="size-4 stroke-[3px]" />
                                          </Link>
                                        )}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}