'use client'

import type { PayloadAdminBarProps } from '@payloadcms/admin-bar'

import ShinyText from '@/components/Reactbits/shiny-text'
import { User } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { PayloadAdminBar } from '@payloadcms/admin-bar'
import { Terminal } from 'lucide-react'
import { useSelectedLayoutSegments } from 'next/navigation'
import React, { useState } from 'react'

const collectionLabels = {
  pages: {
    plural: 'Pages',
    singular: 'Page',
  },
  posts: {
    plural: 'Posts',
    singular: 'Post',
  },
  projects: {
    plural: 'Projects',
    singular: 'Project',
  },
}

const Title: React.FC = () => (
  <div className="flex items-center gap-2">
    <Terminal className="h-3 w-3 text-[#00FF41] drop-shadow-[0_0_5px_#00FF41]" />
    <span className="text-[10px] font-black uppercase tracking-[0.3em] italic">
      <ShinyText
        text="Terminal"
        speed={1}
        delay={0}
        color="#52525b"
        shineColor="#00FF41"
        spread={150}
        direction="left"
        yoyo={false}
        pauseOnHover={false}
        disabled={false}
      />
    </span>
  </div>
)

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps
}> = (props) => {
  const { adminBarProps } = props || {}
  const segments = useSelectedLayoutSegments()
  const [show, setShow] = useState(false)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - todo fix, not sure why this is erroring
  const collection = collectionLabels?.[segments?.[1]] ? segments?.[1] : 'pages'

  const onAuthChange = React.useCallback((user: User) => {
    const canSeeAdmin = user?.roles && Array.isArray(user?.roles) && user?.roles?.includes('admin')

    setShow(Boolean(canSeeAdmin))
  }, [])

  return (
    <div
      className={cn('py-1 bg-zinc-950 border-b border-zinc-900 sticky top-0 z-[100] shadow-[0_1px_10px_rgba(0,0,0,0.5)]', {
        block: show,
        hidden: !show,
      })}
    >
      <div className="container max-w-none px-6">
        <PayloadAdminBar
          {...adminBarProps}
          className="py-1 text-white"
          classNames={{
            controls: 'text-[9px] font-black uppercase tracking-widest text-zinc-400',
            logo: 'flex items-center mr-8',
            user: 'text-[9px] font-mono text-zinc-500 uppercase tracking-tighter',
          }}
          cmsURL={process.env.NEXT_PUBLIC_SERVER_URL}
          collectionLabels={{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore - todo fix, not sure why this is erroring
            plural: collectionLabels[collection]?.plural || 'Pages',
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore - todo fix, not sure why this is erroring
            singular: collectionLabels[collection]?.singular || 'Page',
          }}
          logo={<Title />}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore - todo fix, not sure why this is erroring
          onAuthChange={onAuthChange}
          style={{
            backgroundColor: 'transparent',
            padding: 0,
            position: 'relative',
            zIndex: 'unset',
          }}
        />
      </div>
    </div>
  )
}