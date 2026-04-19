'use client'

import { RichText } from '@/components/RichText'
import type { Question } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { SerializedEditorState, SerializedLexicalNode } from 'lexical'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { useState } from 'react'

import SectionFooter from '@/components/Section/Footer'
import SectionHeader from '@/components/Section/Header'
import SectionTitle from '@/components/Section/Title'

interface QuestionsProps {
  data: Question
}

export function FAQAccordionBlock({ data }: QuestionsProps) {
  const [openId, setOpenId] = useState<string | null>(null)
  const [openCategory, setOpenCategory] = useState<number | null>(0)

  if (!data?.categories) return null

  const allVisibleCategories = data.categories.filter((cat) => cat.visible !== false)

  return (
    <section className="relative w-full min-h-screen bg-white-50 flex flex-col overflow-hidden">
      <SectionHeader
        title="MEMBER"
        subtitle="ASSISTANCE"
        variant={1}
      />

      <div className="flex-1 flex flex-col lg:flex-row w-full border-b-2 border-black-pure">
        <main className="flex-1 flex flex-col bg-white-pure">
          <div className="flex-1 grid grid-cols-12">
            <div className="col-span-12 p-8 md:p-16 flex flex-col justify-between border-r-0 lg:border-r-2 border-black-pure">
              <SectionTitle
                variant={1}
                label="INFORMATION CENTER"
                lineOne="MEMBER"
                lineTwo="RESOURCES"
                highlight="2026"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-2 border-black-pure mt-12 bg-white-50">
                <div className="flex flex-col p-8 bg-white-pure border-b-2 md:border-b-0 md:border-r-2 border-black-pure">
                  <span className="text-xs font-black tracking-widest text-tertiary-500 uppercase mb-3">SYSTEM STATUS</span>
                  <span className="text-3xl font-black text-black-pure uppercase leading-none">VERIFIED</span>
                </div>
                <div className="flex flex-col p-8 bg-primary">
                  <span className="text-xs font-black tracking-widest text-black-pure uppercase mb-3">ACTIVE TOPICS</span>
                  <span className="text-3xl font-black text-black-pure uppercase leading-none">{allVisibleCategories.length} UNITS</span>
                </div>
              </div>

              <div className="mt-16 max-w-2xl">
                <p className="text-sm font-black uppercase leading-tight text-black-pure">
                  Select a category to view the official documentation. All information is updated daily to ensure accuracy for all racing team members and support staff.
                </p>
              </div>
            </div>
          </div>
        </main>

        <aside className="w-full lg:w-[500px] bg-white-50 flex flex-col shrink-0 border-t-2 lg:border-t-0 lg:border-l-2 border-black-pure">
          <div className="h-24 bg-white-200 flex items-center px-10 border-b-2 border-black-pure">
            <span className="text-black-pure text-sm font-black tracking-[0.4em] uppercase">DOCUMENT INDEX</span>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar bg-black-pure flex flex-col gap-[2px]">
            {allVisibleCategories.map((category, catIndex) => {
              const isCatOpen = openCategory === catIndex

              return (
                <div key={category.id || catIndex} className="flex flex-col bg-white-pure">
                  <button
                    onClick={() => {
                      setOpenCategory(isCatOpen ? null : catIndex)
                      setOpenId(null)
                    }}
                    className={cn(
                      "w-full flex items-center h-28 px-10 transition-all duration-300 outline-none",
                      isCatOpen ? "bg-primary" : "hover:bg-white-200"
                    )}
                  >
                    <div className={cn(
                      "size-14 bg-black-pure flex items-center justify-center shrink-0 transition-colors duration-300",
                      isCatOpen ? "bg-white-pure" : ""
                    )}>
                      <span className={cn(
                        "font-black text-lg transition-colors duration-300",
                        isCatOpen ? "text-black-pure" : "text-white-pure"
                      )}>
                        {String(catIndex + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="flex-1 px-8">
                      <h4 className="text-xl font-black uppercase tracking-tighter text-black-pure text-left leading-none">
                        {category.label}
                      </h4>
                    </div>
                    <div className={cn(
                      "w-3 h-14 bg-black-pure transition-opacity duration-300 shrink-0",
                      isCatOpen ? "opacity-100" : "opacity-0"
                    )} />
                  </button>

                  <AnimatePresence>
                    {isCatOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden bg-white-100"
                      >
                        <div className="flex flex-col divide-y-2 divide-black-pure border-t-2 border-black-pure">
                          {category.items?.map((item, itemIndex) => {
                            const uniqueId = `${catIndex}-${itemIndex}`
                            const isItemOpen = openId === uniqueId

                            return (
                              <div key={item.id || uniqueId} className="flex flex-col">
                                <button
                                  onClick={() => setOpenId(isItemOpen ? null : uniqueId)}
                                  className={cn(
                                    "flex items-center justify-between p-8 text-left transition-colors",
                                    isItemOpen ? "bg-secondary text-black-pure" : "bg-white-50 hover:bg-white-pure"
                                  )}
                                >
                                  <span className="text-xs font-black uppercase leading-tight grow pr-8">
                                    {item.question}
                                  </span>
                                  <div className={cn(
                                    "size-8 border-2 border-black-pure flex items-center justify-center shrink-0 transition-all",
                                    isItemOpen ? "bg-black-pure text-white-pure rotate-180" : "bg-transparent"
                                  )}>
                                    <span className="font-black text-sm">{isItemOpen ? '−' : '+'}</span>
                                  </div>
                                </button>

                                <AnimatePresence>
                                  {isItemOpen && (
                                    <motion.div
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      className="p-8 bg-white-pure border-t-2 border-black-pure"
                                    >
                                      <div className="text-sm font-black uppercase leading-relaxed text-black-pure">
                                        <RichText
                                          data={item.answer as unknown as SerializedEditorState<SerializedLexicalNode>}
                                          enableGutter={false}
                                        />
                                      </div>
                                      {item.relatedPage && (
                                        <Link
                                          href={item.relatedPage}
                                          className="inline-flex mt-8 h-14 bg-black-pure px-10 items-center text-xs font-black text-white-pure uppercase hover:bg-tertiary-500 transition-colors"
                                        >
                                          VIEW PAGE
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
          </div>
        </aside>
      </div>

      <SectionFooter
        variant={1}
      />
    </section>
  )
}