'use client'

import { ClippedButton } from '@/components/Clipped/ClippedButton'
import { RichText } from '@/components/RichText'
import { DESIGN_SYSTEM } from '@/lib/constants'
import type { Question } from '@/payload-types'
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
    <section className="relative w-full px-8 py-20 border-t overflow-hidden" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[50], borderColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}>
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
              <span
                className="text-[10px] font-black uppercase italic"
                style={{
                  letterSpacing: DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL,
                  color: DESIGN_SYSTEM.COLORS.PRIMARY[500]
                }}
              >
                Frequently asked questions
              </span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black tracking-[-0.05em] uppercase italic leading-[0.75]" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
              Strategic <br />
              <span className="font-light not-italic" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>Briefing</span>
            </h2>
          </div>
          <div className="relative">
            <p
              className="max-w-[240px] text-[9px] uppercase font-bold leading-relaxed pl-6 border-l"
              style={{
                color: DESIGN_SYSTEM.COLORS.ZINC[400],
                letterSpacing: DESIGN_SYSTEM.TYPOGRAPHY.TRACKING_XL,
                borderLeftColor: `${DESIGN_SYSTEM.COLORS.PRIMARY[500]}30`
              }}
            >
              Sector-specific telemetry <br />
              and support protocols.
            </p>
            <div className="absolute top-0 left-0 w-[2px] h-4" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
          </div>
        </motion.div>

        <div className="space-y-0 border-t" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}>
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
                  className="w-full flex items-center justify-between group py-6 border-b transition-all duration-500"
                  style={{
                    borderBottomColor: isCatOpen ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[100]
                  }}
                >
                  <div className="flex items-center gap-10">
                    <motion.span
                      animate={{
                        color: isCatOpen ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[400],
                        opacity: isCatOpen ? 1 : 0.5
                      }}
                      className="text-[10px] font-black tracking-[0.2em] font-mono"
                    >
                      ID_{String(catIndex + 1).padStart(2, '0')}
                    </motion.span>
                    <motion.h3
                      animate={{
                        letterSpacing: isCatOpen ? "0.6em" : "0.4em",
                      }}
                      className="text-xs md:text-lg uppercase font-black transition-all duration-700"
                      style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}
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
                    <ChevronDown className="h-5 w-5" style={{ color: isCatOpen ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[300] }} />
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
                      style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.ZINC[50]}80` }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0 py-8 px-2 md:px-12">
                        {category.items?.map((item, itemIndex) => {
                          const uniqueId = `${catIndex}-${itemIndex}`
                          const isItemOpen = openId === uniqueId

                          return (
                            <motion.div
                              key={item.id || uniqueId}
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: itemIndex * 0.02 }}
                              className="border-b transition-all duration-300"
                              style={{
                                borderBottomColor: isItemOpen ? `${DESIGN_SYSTEM.COLORS.PRIMARY[500]}20` : DESIGN_SYSTEM.COLORS.ZINC[200]
                              }}
                            >
                              <button
                                onClick={() => setOpenId(isItemOpen ? null : uniqueId)}
                                className="flex w-full items-start justify-between py-4 text-left group/item"
                              >
                                <span
                                  className="pr-4 text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 leading-tight"
                                  style={{
                                    color: isItemOpen ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[400]
                                  }}
                                >
                                  {item.question}
                                </span>
                                <div className="flex items-center">
                                  <motion.div
                                    animate={{
                                      backgroundColor: isItemOpen ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : "transparent",
                                      borderColor: isItemOpen ? DESIGN_SYSTEM.COLORS.PRIMARY[500] : DESIGN_SYSTEM.COLORS.ZINC[200]
                                    }}
                                    className="w-4 h-4 border flex items-center justify-center transition-all duration-300"
                                  >
                                    <div className="relative w-2 h-2">
                                      <motion.div
                                        animate={{ rotate: isItemOpen ? 90 : 0 }}
                                        className="absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2"
                                        style={{ backgroundColor: isItemOpen ? DESIGN_SYSTEM.COLORS.WHITE[50] : DESIGN_SYSTEM.COLORS.ZINC[400] }}
                                      />
                                      {!isItemOpen && (
                                        <div
                                          className="absolute top-0 left-1/2 w-[1px] h-full -translate-x-1/2"
                                          style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[400] }}
                                        />
                                      )}
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
                                      <div
                                        className="text-[11px] leading-relaxed prose prose-sm max-w-none prose-p:my-2"
                                        style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}
                                      >
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