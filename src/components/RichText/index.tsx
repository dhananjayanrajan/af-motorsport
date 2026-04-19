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
    banner: ({ node }) => <BannerBlock className="my-12" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="my-16 border-4 border-black"
        imgClassName="m-0"
        {...node.fields}
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="my-12 border-2 border-black" {...node.fields} />,
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
    <div className="w-full bg-white">
      <RichTextWithoutBlocks
        converters={jsxConverters}
        className={cn(
          'text-black',
          {
            'px-8 md:px-12': enableGutter,
            'max-w-4xl mx-auto': enableProse,
          },
          'prose-headings:text-black prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tighter',
          'prose-p:text-sm prose-p:font-bold prose-p:uppercase prose-p:leading-normal',
          'prose-strong:text-primary prose-strong:font-bold',
          'prose-a:text-black prose-a:underline prose-a:decoration-4 prose-a:decoration-primary hover:prose-a:bg-primary transition-colors',
          'prose-img:border-4 prose-img:border-black',
          className,
        )}
        {...rest}
      />
      <div className="mt-16 flex gap-2">
        <div className="h-1 flex-1 bg-black" />
        <div className="h-1 w-12 bg-primary" />
        <div className="h-1 w-12 bg-secondary" />
      </div>
    </div>
  )
}