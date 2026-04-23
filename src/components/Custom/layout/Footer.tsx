'use client'

import { FAQAccordionBlock } from '@/components/Custom/layout/questions'
import { CMSLink } from '@/components/Link'
import type { Announcement as AnnouncementType, Footer, Organization, Question, Social } from '@/payload-types'
import { AnnouncementsSection } from './announcements'
import { CTA } from './cta'

interface CustomFooterProps {
  footer: Footer
  socials?: Social
  organizations?: Organization[]
  questions?: Question
  announcements?: AnnouncementType
}

export const CustomFooter = ({ footer, socials, organizations = [], questions, announcements }: CustomFooterProps) => {
  if (!footer) return null
  const { columns, cta, copyright } = footer
  const currentYear = new Date().getFullYear()

  return (
    <div className="flex flex-col">
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
        <div className="flex flex-col lg:flex-row border-b-2 border-black-pure divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-black-pure">
          <div className="w-full lg:w-20 bg-primary-500 p-6 flex lg:flex-col items-center justify-between shrink-0">
            <span className="text-xs font-black text-black-pure lg:-rotate-90 lg:whitespace-nowrap tracking-widest uppercase">
              DIRECTORY
            </span>
            <div className="size-3 bg-black-pure rotate-45" />
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black-pure">
            {columns?.filter(col => col.visible).map((column, idx) => (
              <div key={idx} className="p-8 flex flex-col gap-6 hover:bg-primary-50 transition-colors">
                <span className="text-xs font-black text-black-pure tracking-widest border-l-4 border-secondary-500 pl-4 uppercase">
                  {column.label}
                </span>
                <ul className="flex flex-col gap-2">
                  {column.links?.filter(link => link.visible).map((linkData, lIdx) => (
                    <li key={lIdx}>
                      <CMSLink
                        {...linkData.link}
                        label={linkData.label || linkData.link.label}
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
              <span className="text-xs font-black text-black-pure tracking-widest uppercase">SOCIALS</span>
              <div className="grid grid-cols-2 gap-2">
                {socials?.accounts?.filter(acc => acc.visible).map((account) => (
                  <a key={account.id} href={account.url} className="h-12 border-2 border-black-pure flex items-center justify-center text-[10px] font-black uppercase hover:bg-secondary-500 transition-all">
                    {account.platform}
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-10 h-12 flex border-2 border-black-pure">
              <input type="email" placeholder="EMAIL ADDRESS" className="flex-1 px-4 text-[10px] font-black uppercase bg-transparent outline-none" />
              <button className="px-6 bg-black-pure text-white-pure text-[10px] font-black hover:bg-primary-500 hover:text-black-pure transition-colors">JOIN</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row divide-y-2 md:divide-y-0 md:divide-x-2 divide-black-pure border-b-2 border-black-pure">
          <div className="flex-1 py-4 px-8 bg-white-pure">
            <span className="text-[10px] font-black text-black-pure opacity-40 tracking-widest uppercase">
              {copyright || `COPYRIGHT ${currentYear} AF MOTORSPORT`}
            </span>
          </div>
          <div className="w-full md:w-[400px] py-4 px-8 flex items-center justify-between bg-black-pure">
            <span className="text-white-pure text-[10px] font-black tracking-widest uppercase">ACTIVE SESSION</span>
            <div className="flex gap-2">
              <div className="size-2 bg-primary-500" />
              <div className="size-2 bg-secondary-500" />
              <div className="size-2 bg-tertiary-500" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}