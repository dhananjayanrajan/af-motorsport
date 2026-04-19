'use client'

import { User } from '@/payload-types'
import { cn } from '@/utilities/cn'
import type { PayloadAdminBarProps } from '@payloadcms/admin-bar'
import { PayloadAdminBar } from '@payloadcms/admin-bar'
import { Zap } from 'lucide-react'
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
    <div className="size-6 bg-primary border-2 border-black flex items-center justify-center">
      <Zap className="h-3.5 w-3.5 text-black fill-black" />
    </div>
    <span className="text-[11px] font-black uppercase tracking-tighter text-black">
      ADMIN PANEL
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
      className={cn('sticky top-0 z-[999] w-full border-b-4 border-black bg-white h-14 flex items-center', {
        flex: show,
        hidden: !show,
      })}
    >
      <div className="w-full px-8 flex items-center justify-between">
        <div className="flex items-center flex-1">
          <PayloadAdminBar
            {...adminBarProps}
            className="w-full"
            classNames={{
              controls: 'flex items-center gap-6 text-[11px] font-black uppercase tracking-tight text-black',
              logo: 'mr-8',
              user: 'text-[11px] font-black uppercase text-secondary',
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
              color: 'black',
            }}
          />
        </div>

        <div className="flex items-center gap-2 border-l-4 border-black h-14 pl-8 ml-8">
          <div className="size-4 bg-primary border-2 border-black" />
          <div className="size-4 bg-secondary border-2 border-black" />
          <div className="size-4 bg-accent border-2 border-black" />
        </div>
      </div>
    </div>
  )
}