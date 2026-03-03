'use client'

import { ClippedButton } from '@/components/Custom/ui/ClippedButton'
import { RichText } from '@/components/RichText'
import type { Question } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { SerializedEditorState, SerializedLexicalNode } from 'lexical'
import { ChevronDown } from 'lucide-react'
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
    <section className="relative w-full bg-white dark:bg-zinc-950 px-8 py-20 border-t border-zinc-100 dark:border-zinc-900 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="space-y-4">
            <ClippedButton
              label="Operational Intelligence"
              size="sm"
              className="pointer-events-none scale-90 origin-left"
            />
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-[0.8]">
              Strategic <span className="text-red-600 font-light">Briefing</span>
            </h2>
          </div>
          <p className="max-w-xs text-[9px] uppercase tracking-[0.4em] font-bold text-zinc-400 leading-relaxed border-l border-zinc-200 dark:border-zinc-800 pl-6">
            Sector-specific telemetry and support protocols.
          </p>
        </motion.div>

        <div className="space-y-0 border-t border-zinc-100 dark:border-zinc-900">
          {allVisibleCategories.map((category, catIndex) => {
            const isCatOpen = openCategory === catIndex

            return (
              <motion.div
                key={category.id || catIndex}
                animate={{
                  scale: isCatOpen ? 1.005 : 1,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative origin-center"
              >
                <button
                  onClick={() => {
                    setOpenCategory(isCatOpen ? null : catIndex)
                    setOpenId(null)
                  }}
                  className={cn(
                    "w-full flex items-center justify-between group py-6 border-b transition-all duration-500",
                    isCatOpen ? "border-red-600" : "border-zinc-100 dark:border-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700"
                  )}
                >
                  <div className="flex items-center gap-10">
                    <motion.span
                      animate={{
                        color: isCatOpen ? "#dc2626" : "#71717a",
                        opacity: isCatOpen ? 1 : 0.5
                      }}
                      className="text-[10px] font-black tracking-[0.2em] mono"
                    >
                      ID_{String(catIndex + 1).padStart(2, '0')}
                    </motion.span>
                    <motion.h3
                      animate={{
                        letterSpacing: isCatOpen ? "0.6em" : "0.4em",
                        color: isCatOpen ? "#09090b" : "#a1a1aa"
                      }}
                      className="text-xs md:text-lg uppercase font-black transition-all duration-700 dark:!text-white"
                    >
                      {category.label}
                    </motion.h3>
                  </div>
                  <motion.div
                    animate={{
                      rotate: isCatOpen ? 180 : 0,
                    }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className={cn("h-5 w-5", isCatOpen ? "text-red-600" : "text-zinc-200")} />
                  </motion.div>
                </button>

                <AnimatePresence mode="wait">
                  {isCatOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0 py-8 px-2 md:px-12">
                        {category.items?.filter(item => item.visible !== false).map((item, itemIndex) => {
                          const uniqueId = `${catIndex}-${itemIndex}`
                          const isItemOpen = openId === uniqueId

                          return (
                            <motion.div
                              key={item.id || uniqueId}
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: itemIndex * 0.02 }}
                              className={cn(
                                "border-b border-zinc-50 dark:border-zinc-900/50 transition-all duration-300",
                                isItemOpen ? "border-red-600/20" : "hover:border-zinc-200 dark:hover:border-zinc-800"
                              )}
                            >
                              <button
                                onClick={() => setOpenId(isItemOpen ? null : uniqueId)}
                                className="flex w-full items-start justify-between py-4 text-left group/item"
                              >
                                <span className={cn(
                                  "pr-4 text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 leading-tight",
                                  isItemOpen ? "text-red-600 translate-x-1" : "text-zinc-500 group-hover/item:text-zinc-950 dark:group-hover/item:text-white"
                                )}>
                                  {item.question}
                                </span>
                                <div className="flex items-center">
                                  <motion.div
                                    animate={{
                                      backgroundColor: isItemOpen ? "#dc2626" : "transparent",
                                      borderColor: isItemOpen ? "#dc2626" : "#e4e4e7"
                                    }}
                                    className="w-4 h-4 border flex items-center justify-center transition-all duration-300 dark:border-zinc-800"
                                  >
                                    <div className="relative w-2 h-2">
                                      <motion.div
                                        animate={{ rotate: isItemOpen ? 90 : 0 }}
                                        className={cn("absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2", isItemOpen ? "bg-white" : "bg-zinc-400")}
                                      />
                                      {!isItemOpen && <div className="absolute top-0 left-1/2 w-[1px] h-full -translate-x-1/2 bg-zinc-400" />}
                                    </div>
                                  </motion.div>
                                </div>
                              </button>

                              <AnimatePresence>
                                {isItemOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    className="overflow-hidden"
                                  >
                                    <div className="pb-8 pt-1 px-1 md:pl-6">
                                      <div className="text-zinc-500 dark:text-zinc-400 text-[11px] leading-relaxed prose prose-sm dark:prose-invert max-w-none prose-p:my-2">
                                        <RichText
                                          data={item.answer as unknown as SerializedEditorState<SerializedLexicalNode>}
                                          enableGutter={false}
                                        />
                                      </div>
                                      {item.relatedPage && (
                                        <div className="mt-6 flex">
                                          <Link href={item.relatedPage}>
                                            <ClippedButton
                                              label="Technical Link"
                                              size="sm"
                                            />
                                          </Link>
                                        </div>
                                      )}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}