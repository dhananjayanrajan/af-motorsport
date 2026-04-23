"use client"
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
        <section className="relative w-full min-h-[50vh] bg-background flex flex-col border-b border-border">
            <div className="flex h-16 border-b border-border items-center px-6 justify-between bg-background z-30 sticky top-0">
                <div className="flex items-center gap-4">
                    <span className="text-base font-semibold tracking-tight text-foreground">{id}</span>
                    <div className="h-4 w-px bg-border" />
                    <h2 className="text-base text-muted-foreground uppercase tracking-wide">{title}</h2>
                </div>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row divide-x-0 lg:divide-x divide-border">
                {meta && (
                    <div className="w-full lg:w-1/4 p-8 lg:p-12 bg-muted/30">
                        <span className="text-sm font-semibold text-primary uppercase tracking-wider block mb-4">
                            Context Reference
                        </span>
                        <p className="text-base font-semibold text-foreground uppercase leading-relaxed">
                            {meta}
                        </p>
                    </div>
                )}

                <div className={`flex-1 p-8 lg:p-20 bg-background ${columns === 2 ? 'lg:columns-2 lg:gap-16' : ''}`}>
                    <div className="prose prose-neutral max-w-none
            prose-p:text-base prose-p:leading-relaxed prose-p:text-muted-foreground prose-p:mb-6
            prose-headings:uppercase prose-headings:text-foreground prose-headings:tracking-tight
            prose-h2:text-3xl prose-h2:mb-8 prose-h2:mt-12
            prose-h3:text-xl prose-h3:mb-6 prose-h3:mt-8
            prose-strong:text-foreground prose-strong:font-bold
            prose-ul:list-none prose-ul:pl-0
            prose-li:border-l-2 prose-li:border-foreground prose-li:pl-6 prose-li:mb-4 prose-li:text-base prose-li:font-medium prose-li:uppercase
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          ">
                        {typeof content === 'string' ? (
                            <div dangerouslySetInnerHTML={{ __html: content }} />
                        ) : (
                            content
                        )}
                    </div>
                </div>
            </div>

            <div className="z-30 bg-background border-t border-border">
                <SectionScroller
                    items={[title, id, "Document Content"]}
                    variant={3}
                />
            </div>
        </section>
    )
}

export default RichText