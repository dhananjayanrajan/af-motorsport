'use client'

import type { PayloadAdminBarProps } from '@payloadcms/admin-bar'

import { User } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { PayloadAdminBar } from '@payloadcms/admin-bar'
import { Settings } from 'lucide-react'
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
  <div className="flex items-center gap-3">
    <div className="size-5 bg-black flex items-center justify-center">
      <Settings className="h-3 w-3 text-white" />
    </div>
    <span className="text-[11px] font-black uppercase tracking-widest italic text-black">
      CMS_EDITOR
    </span>
  </div>
)

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps
}> = (props) => {
  const { adminBarProps } = props || {}
  const segments = useSelectedLayoutSegments()
  const [show, setShow] = useState(false)

  const collection = collectionLabels?.[segments?.[1] as keyof typeof collectionLabels]
    ? (segments?.[1] as keyof typeof collectionLabels)
    : 'pages'

  const onAuthChange = React.useCallback((user: User) => {
    const canSeeAdmin = user?.roles && Array.isArray(user?.roles) && user?.roles?.includes('admin')
    setShow(Boolean(canSeeAdmin))
  }, [])

  return (
    <div
      className={cn('py-2 bg-white border-b-2 border-black sticky top-0 z-[100] shadow-sm', {
        block: show,
        hidden: !show,
      })}
    >
      <div className="container max-w-none px-8">
        <PayloadAdminBar
          {...adminBarProps}
          className="py-1"
          classNames={{
            controls: 'text-[10px] font-black uppercase tracking-widest text-black italic',
            logo: 'flex items-center mr-10',
            user: 'text-[10px] font-bold text-zinc-400 uppercase tracking-tight italic',
          }}
          cmsURL={process.env.NEXT_PUBLIC_SERVER_URL}
          collectionLabels={{
            plural: collectionLabels[collection]?.plural || 'Pages',
            singular: collectionLabels[collection]?.singular || 'Page',
          }}
          logo={<Title />}
          // @ts-ignore
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