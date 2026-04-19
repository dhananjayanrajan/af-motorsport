import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import {
  JSXConvertersFunction,
  RichText as RichTextWithoutBlocks,
} from '@payloadcms/richtext-lexical/react'

import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'
import type {
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
} from '@/payload-types'
import { cn } from '@/utilities/cn'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | any | CodeBlockProps>

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    banner: ({ node }) => <BannerBlock className="my-8" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="my-10 border border-black-pure"
        imgClassName="m-0 grayscale hover:grayscale-0 transition-all duration-300"
        {...node.fields}
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="my-8 border border-black-pure" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
  },
})

type Props = {
  data: SerializedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export const RichText: React.FC<Props> = (props) => {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <div className="w-full bg-white-pure">
      <RichTextWithoutBlocks
        converters={jsxConverters}
        className={cn(
          'text-black-pure',
          {
            'px-6 md:px-10': enableGutter,
            'max-w-3xl mx-auto': enableProse,
          },
          'prose-headings:text-black-pure prose-headings:font-mono prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight',
          'prose-h1:text-4xl prose-h2:text-2xl prose-h3:text-xl',
          'prose-p:text-sm prose-p:font-mono prose-p:font-black prose-p:uppercase prose-p:leading-relaxed prose-p:opacity-90',
          'prose-strong:text-primary prose-strong:font-black',
          'prose-a:text-black-pure prose-a:underline prose-a:decoration-1 prose-a:underline-offset-4 hover:prose-a:text-primary transition-colors',
          'prose-img:border prose-img:border-black-pure',
          'prose-li:font-mono prose-li:font-black prose-li:uppercase prose-li:text-sm',
          className,
        )}
        {...rest}
      />
      <div className="mt-12 pt-6 border-t border-black-pure opacity-10 flex gap-1.5">
        <div className="size-1.5 bg-black-pure" />
        <div className="size-1.5 bg-black-pure" />
        <div className="size-1.5 bg-black-pure" />
      </div>
    </div>
  )
}