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
    <div className="flex flex-col bg-white-50">
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

      <footer className="relative w-full bg-white-pure flex flex-col overflow-hidden">
        <div className="flex flex-col lg:flex-row border-b-2 border-black-pure divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-black-pure">

          <div className="w-full lg:w-24 bg-black-pure p-6 flex lg:flex-col items-center justify-between shrink-0">
            <span className="text-xs font-mono font-black text-white-pure lg:-rotate-90 lg:whitespace-nowrap tracking-[0.4em] uppercase">
              INDEX
            </span>
            <div className="size-4 bg-primary rotate-45" />
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-black-pure">
            {columns?.filter(col => col.visible).map((column, idx) => (
              <div key={idx} className="p-8 md:p-10 flex flex-col gap-6 bg-white-pure transition-colors duration-300 hover:bg-white-100">
                <span className="text-xs font-mono font-black text-black-pure tracking-widest border-l-4 border-primary pl-4 uppercase">
                  {column.label}
                </span>
                <ul className="flex flex-col">
                  {column.links?.filter(link => link.visible).map((linkData, lIdx) => (
                    <li key={lIdx} className="border-b border-black-pure/5 last:border-0">
                      <CMSLink
                        {...linkData.link}
                        label={linkData.label || linkData.link.label}
                        className="flex items-center h-12 md:h-10 text-sm md:text-xs font-black text-black-pure/60 hover:text-black-pure uppercase transition-colors"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-[400px] xl:w-[480px] p-8 md:p-10 bg-white-50 flex flex-col justify-between shrink-0">
            <div className="space-y-8">
              <span className="text-xs font-mono font-black text-black-pure tracking-widest uppercase">
                SOCIAL CHANNELS
              </span>
              <div className="grid grid-cols-2 gap-2">
                {socials?.accounts?.filter(acc => acc.visible).map((account) => (
                  <a
                    key={account.id}
                    href={account.url}
                    className="h-14 md:h-12 border-2 border-black-pure flex items-center justify-center text-xs font-black uppercase hover:bg-black-pure hover:text-white-pure transition-all"
                  >
                    {account.platform}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-12 h-14 flex border-2 border-black-pure overflow-hidden">
              <input
                type="email"
                placeholder="ENTER EMAIL"
                className="flex-1 px-4 text-xs font-black uppercase bg-transparent outline-none placeholder:text-black-pure/20"
              />
              <button className="px-8 bg-black-pure text-white-pure text-xs font-black hover:bg-primary hover:text-black-pure transition-colors">
                JOIN
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center divide-y-2 md:divide-y-0 md:divide-x-2 divide-black-pure border-b-2 border-black-pure">
          <div className="flex-1 py-6 px-8 md:px-10 bg-white-pure">
            <span className="text-[10px] md:text-xs font-mono font-black text-black-pure/40 tracking-[0.2em] uppercase">
              {copyright || `COPYRIGHT ${currentYear} AF MOTORSPORT`}
            </span>
          </div>
          <div className="w-full md:w-[400px] xl:w-[480px] py-6 px-8 md:px-10 flex items-center justify-between bg-black-pure group">
            <span className="text-white-pure font-mono text-[10px] md:text-xs font-black tracking-widest uppercase">
              GRID STATUS
            </span>
            <div className="flex gap-2 items-center">
              <div className="size-2 bg-primary" />
              <div className="size-2 bg-secondary" />
              <div className="size-2 bg-tertiary-500" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}