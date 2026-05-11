'use client'

import { FAQAccordionBlock } from '@/components/Custom/layout/questions'
import { CMSLink } from '@/components/Link'
import { ShopCollectionsCTA } from '@/components/Section/Blocks/ShopCollectionCTASection'
import type { Announcement as AnnouncementType, Footer, Media, Organization, Product, Question, Social } from '@/payload-types'
import Image from 'next/image'
import { useState } from 'react'
import { AnnouncementsSection } from './announcements'
import { CTA } from './cta'

interface CustomFooterProps {
  footer: Footer
  socials?: Social
  organizations?: Organization[]
  questions?: Question
  announcements?: AnnouncementType
  latestProducts?: Product[]
}

export const CustomFooter = ({
  footer,
  socials,
  organizations = [],
  questions,
  announcements,
  latestProducts = []
}: CustomFooterProps) => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/form-submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form: 3,
          submissionData: [
            {
              field: 'email',
              value: email,
            },
          ],
        }),
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  if (!footer) return null

  const { columns, cta, copyright, brand, legal } = footer
  const currentYear = new Date().getFullYear()

  return (
    <div className="flex flex-col">
      {latestProducts.length > 0 && <ShopCollectionsCTA products={latestProducts} />}
      {announcements && <AnnouncementsSection data={announcements} />}
      {questions && (
        <div className="relative border-b-2 border-black-pure">
          <FAQAccordionBlock data={questions} />
        </div>
      )}
      {cta?.enable && (
        <CTA
          headline={cta.headline}
          subtext={cta.subtext}
          buttonLabel={cta.buttonLabel}
          buttonUrl={cta.link?.url}
          organizations={organizations}
        />
      )}

      <footer className="relative w-full bg-white-pure flex flex-col">
        <div className="flex flex-col lg:flex-row border-y-2 border-black-pure divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-black-pure">
          {brand?.enable && (
            <div className="w-full lg:w-32 bg-primary-500 py-16 px-6 flex lg:flex-col items-center justify-between shrink-0">
              {brand.logo && typeof brand.logo === 'object' && (brand.logo as Media).url ? (
                <Image
                  src={(brand.logo as Media).url!}
                  alt={(brand.logo as Media).alt || ''}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              ) : (
                <div className="size-3 bg-black-pure rotate-45" />
              )}
              <span className="w-24 text-xs font-black text-black-pure lg:-rotate-90 lg:whitespace-nowrap tracking-widest uppercase">
                {brand.tagline}
              </span>
            </div>
          )}

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black-pure">
            {columns?.filter(col => col.visible).map((column, idx) => (
              <div key={idx} className="p-8 flex flex-col gap-6 hover:bg-primary-50 transition-colors">
                <span className="text-xs font-black text-black-pure tracking-widest border-l-4 border-secondary-500 pl-4 uppercase">
                  {column.label}
                </span>
                <ul className="flex flex-col gap-2">
                  {column.links?.filter(l => l.visible).map((linkData, lIdx) => (
                    <li key={lIdx}>
                      <CMSLink
                        {...linkData.link}
                        label={linkData.label}
                        className="text-xs font-black text-black-pure/60 hover:text-primary-600 uppercase transition-colors"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-[400px] p-8 bg-white-100 flex flex-col justify-between">
            <div className="space-y-6">
              <span className="text-xs font-black text-black-pure tracking-widest uppercase">Social Media</span>
              <div className="grid grid-cols-2 gap-2">
                {socials?.accounts?.filter(acc => acc.visible).map((account) => (
                  <a
                    key={account.id}
                    href={account.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-12 border-2 border-black-pure flex items-center justify-center text-[10px] font-black uppercase hover:bg-secondary-500 transition-all"
                  >
                    {account.platform}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="h-12 flex border-2 border-black-pure focus-within:ring-2 focus-within:ring-primary-500 transition-all">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={status === 'success' ? "THANK YOU!" : "EMAIL ADDRESS"}
                    disabled={status === 'loading' || status === 'success'}
                    className="flex-1 px-4 text-[10px] font-black uppercase bg-transparent outline-none disabled:cursor-not-allowed"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className="px-6 bg-black-pure text-white-pure text-[10px] font-black hover:bg-primary-500 hover:text-black-pure transition-colors disabled:opacity-50"
                  >
                    {status === 'loading' ? '...' : 'JOIN'}
                  </button>
                </div>
                {status === 'error' && (
                  <p className="text-[8px] font-black text-red-600 uppercase">Error occurred. Try again.</p>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row divide-y-2 md:divide-y-0 md:divide-x-2 divide-black-pure border-b-2 border-black-pure">
          <div className="flex-1 py-4 px-8 bg-white-pure">
            <span className="text-[10px] font-black text-black-pure opacity-40 tracking-widest uppercase">
              {copyright ? copyright.replace('{year}', currentYear.toString()) : `© ${currentYear}`}
            </span>
          </div>

          <div className="w-full md:w-auto py-4 px-8 flex items-center gap-6 bg-black-pure overflow-x-auto">
            {legal?.filter(l => l.visible).map((legalLink, idx) => (
              <CMSLink
                key={idx}
                {...legalLink.link}
                label={legalLink.label}
                className="text-white-pure text-[10px] font-black tracking-widest uppercase hover:text-primary-500 transition-colors whitespace-nowrap"
              />
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}