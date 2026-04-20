'use client'

import { RichText } from '@/components/RichText'
import type { Question } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { ArrowUpRight, HelpCircle, Minus, Plus } from 'lucide-react'
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
    <section className="relative w-full min-h-[600px] bg-white-pure flex flex-col lg:flex-row border-b-2 border-black-pure">
      <main className="flex-1 p-12 flex flex-col justify-between border-r-2 border-black-pure">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-1 w-10 bg-primary-500" />
            <span className="text-xs font-black text-black-pure tracking-widest uppercase">MEMBER HELP</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight text-black-pure">
            FREQUENT<br />QUESTIONS
          </h2>
          <div className="grid grid-cols-2 gap-4 max-w-sm">
            <div className="p-6 border-2 border-black-pure bg-secondary-500 flex flex-col justify-between">
              <HelpCircle className="size-6 text-black-pure mb-4" />
              <span className="text-xl font-black text-black-pure uppercase leading-none">
                {allVisibleCategories.length} TOPICS
              </span>
            </div>
            <div className="p-6 border-2 border-black-pure bg-black-pure text-white-pure flex flex-col justify-between hover:bg-primary-500 hover:text-black-pure transition-colors group">
              <div className="size-3 bg-white-pure group-hover:bg-black-pure rotate-45 mb-4" />
              <span className="text-xs font-black uppercase tracking-widest">INFO CENTER</span>
            </div>
          </div>
        </div>
      </main>

      <aside className="w-full lg:w-[450px] flex flex-col bg-white-100 divide-y-2 divide-black-pure overflow-y-auto">
        {allVisibleCategories.map((category, catIdx) => {
          const isCatOpen = openCategory === catIdx
          return (
            <div key={catIdx} className="bg-white-pure">
              <button
                onClick={() => { setOpenCategory(isCatOpen ? null : catIdx); setOpenId(null); }}
                className={cn(
                  "w-full h-20 px-8 flex items-center justify-between transition-all outline-none focus-visible:bg-secondary-500",
                  isCatOpen ? "bg-primary-500" : "hover:bg-white-200"
                )}
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono font-black text-base text-black-pure opacity-30">
                    {catIdx + 1}
                  </span>
                  <h4 className="text-lg font-black uppercase tracking-tight text-black-pure">
                    {category.label}
                  </h4>
                </div>
                <div className={cn("size-8 border-2 border-black-pure flex items-center justify-center bg-black-pure transition-transform duration-500", isCatOpen && "rotate-90")}>
                  <div className="size-1.5 bg-white-pure" />
                </div>
              </button>

              <AnimatePresence>
                {isCatOpen && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden border-t-2 border-black-pure bg-white-pure">
                    <div className="flex flex-col divide-y-2 divide-black-pure/5">
                      {category.items?.map((item, itemIdx) => {
                        const uniqueId = `${catIdx}-${itemIdx}`
                        const isItemOpen = openId === uniqueId
                        return (
                          <div key={itemIdx}>
                            <button
                              onClick={() => setOpenId(isItemOpen ? null : uniqueId)}
                              className={cn(
                                "w-full p-6 flex items-center justify-between text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary-500",
                                isItemOpen ? "bg-secondary-500" : "hover:bg-black-pure hover:text-white-pure"
                              )}
                            >
                              <span className="text-xs font-black uppercase leading-tight pr-8">{item.question}</span>
                              <div className="shrink-0">
                                {isItemOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                              </div>
                            </button>
                            <AnimatePresence>
                              {isItemOpen && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-white-50 border-t-2 border-black-pure">
                                  <div className="text-xs font-sans font-bold uppercase leading-relaxed text-black-pure/70">
                                    <RichText data={item.answer as any} enableGutter={false} />
                                  </div>
                                  {item.relatedPage && (
                                    <Link href={item.relatedPage} className="mt-6 h-10 inline-flex items-center gap-3 px-6 bg-black-pure text-white-pure hover:bg-tertiary-500 transition-colors text-[10px] font-black uppercase tracking-widest outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
                                      VIEW MORE <ArrowUpRight className="size-3" />
                                    </Link>
                                  )}
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
      </aside>
    </section>
  )
}