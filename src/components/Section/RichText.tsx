'use client'

import React from 'react'
import SectionScroller from './Scroller'

interface RichTextProps {
    id: string
    title: string
    content: string | React.ReactNode
    meta?: string
    columns?: 1 | 2
}

const RichText: React.FC<RichTextProps> = ({
    id,
    title,
    content,
    meta,
    columns = 1
}) => {
    return (
        <section className="relative w-full min-h-[50vh] bg-white-pure flex flex-col border-b border-black-pure">
            <div className="flex h-16 border-b border-black-pure items-center px-6 justify-between bg-white-pure z-30 sticky top-0">
                <div className="flex items-center gap-4">
                    <span className="text-[11px] font-bold tracking-tight text-black-pure">{id}</span>
                    <div className="h-4 w-[1px] bg-neutral-200" />
                    <h2 className="text-[11px] text-neutral-500 uppercase tracking-wide">{title}</h2>
                </div>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row divide-x-0 lg:divide-x divide-black-pure">
                {meta && (
                    <div className="w-full lg:w-1/4 p-8 lg:p-12 bg-neutral-50">
                        <span className="text-[10px] font-bold text-primary-500 uppercase tracking-widest block mb-4">
                            Context Reference
                        </span>
                        <p className="text-[11px] font-bold text-black-pure uppercase leading-relaxed">
                            {meta}
                        </p>
                    </div>
                )}

                <div className={`flex-1 p-8 lg:p-20 bg-white-pure ${columns === 2 ? 'lg:columns-2 lg:gap-16' : ''}`}>
                    <div className="prose prose-neutral max-w-none 
                        prose-p:text-[14px] prose-p:leading-relaxed prose-p:text-neutral-600 prose-p:mb-6
                        prose-headings:font-race prose-headings:uppercase prose-headings:text-black-pure prose-headings:tracking-tight
                        prose-h2:text-3xl prose-h2:mb-8 prose-h2:mt-12
                        prose-h3:text-xl prose-h3:mb-6 prose-h3:mt-8
                        prose-strong:text-black-pure prose-strong:font-bold
                        prose-ul:list-none prose-ul:pl-0
                        prose-li:border-l-2 prose-li:border-black-pure prose-li:pl-6 prose-li:mb-4 prose-li:text-[13px] prose-li:font-medium prose-li:uppercase
                        prose-a:text-primary-500 prose-a:no-underline hover:prose-a:underline
                    ">
                        {typeof content === 'string' ? (
                            <div dangerouslySetInnerHTML={{ __html: content }} />
                        ) : (
                            content
                        )}
                    </div>
                </div>
            </div>

            <div className="z-30 bg-white-pure border-t border-black-pure">
                <SectionScroller
                    items={[title, id, "DOCUMENT_CONTENT_LOCK"]}
                    variant={3}
                />
            </div>
        </section>
    )
}

export default RichText