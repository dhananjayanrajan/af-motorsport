'use client'
import Logo from '@/assets/logo/logo'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import ShinyText from '@/components/Reactbits/shiny-text'
import type { Footer } from '@/payload-types'
import { motion } from 'motion/react'


export const CustomFooter = ({ footer }: { footer: Footer }) => {
  if (!footer) return null
  const { brand, columns, cta, legal, copyright } = footer

  return (
    <footer className="bg-white dark:bg-zinc-950 text-black dark:text-white py-20 px-20 border-t border-gray-100 dark:border-zinc-900 transition-colors duration-500 font-sans overflow-hidden">
      <div className="mx-auto">
        {/* Top Section - Brand and CTA */}
        {(brand?.enable || cta?.enable) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {brand?.logo && typeof brand.logo === 'object' ? (
                <div className="mb-8">
                  <Media resource={brand.logo} className="h-12 w-auto object-contain invert dark:invert-0" />
                </div>
              ) : (
                <div className="mb-8">
                  <Logo />
                </div>
              )}
              {brand?.tagline && (
                <ShinyText
                  text={brand.tagline}
                  speed={3.2}
                  delay={0.4}
                  color="#3b3b3b"
                  shineColor="#ffffff"
                  spread={115}
                  direction="left"
                  yoyo
                  pauseOnHover={false}
                  disabled={false}
                />
              )}
              {brand?.description && (
                <p className="max-w-md text-gray-500 dark:text-zinc-400 font-light leading-relaxed mt-6">
                  {brand.description}
                </p>
              )}
            </motion.div>

            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {cta?.enable && (
                <>
                  {cta.headline && (
                    <h2 className="text-5xl md:text-8xl font-light tracking-tighter text-gray-200 dark:text-zinc-800 leading-[0.9] lowercase">
                      {cta.headline}
                    </h2>
                  )}
                  {cta.subtext && (
                    <p className="max-w-md text-gray-400 dark:text-zinc-500 font-light leading-relaxed">
                      {cta.subtext}
                    </p>
                  )}
                  {cta.link && (
                    <CMSLink
                      {...cta.link}
                      label={cta.buttonLabel || cta.link.label}
                      className="inline-block px-10 cursor-pointer relative py-4 bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </>
              )}
            </motion.div>
          </div>
        )}

        {/* Middle Section - Navigation Columns by Footer01) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-16 mb-32 border-t border-gray-100 dark:border-zinc-900 pt-16">
          {columns?.filter(col => col.visible).map((column, index) => (
            <motion.div
              key={index}
              className="flex flex-col gap-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <p className="text-[10px] uppercase tracking-[0.4em] font-black text-black dark:text-white px-3 border-l-2 border-red-600">
                {column.label}
              </p>
              <ul className="flex flex-col gap-4">
                {column.links?.filter(link => link.visible).map((linkData, linkIndex) => (
                  <li key={linkIndex}>
                    <CMSLink
                      {...linkData.link}
                      label={linkData.label || linkData.link.label}
                      className="text-sm font-medium text-gray-500 dark:text-zinc-500 hover:text-red-600 dark:hover:text-red-500 transition-colors duration-300 uppercase tracking-widest text-[9px]"
                    />
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section - Copyright and Legal */}
        <motion.div
          className="pt-12 border-t border-gray-100 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-10 text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 dark:text-zinc-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row gap-4 md:gap-12 items-center text-center md:text-left">
            <p>{copyright || `© ${new Date().getFullYear()} AF MOTORSPORT. ALL RIGHTS RESERVED.`}</p>
            <p className="text-gray-300 dark:text-zinc-800 hidden md:block">/</p>
            <div className="flex flex-wrap justify-center gap-8">
              {legal?.filter(link => link.visible).map((linkData, index) => (
                <CMSLink
                  key={index}
                  {...linkData.link}
                  label={linkData.label || linkData.link.label}
                  className="hover:text-black dark:hover:text-white transition-colors duration-300"
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 group">
            <span className="text-gray-300 dark:text-zinc-800 uppercase text-[8px] tracking-[0.5em]">Built for</span>
            <span className="text-black dark:text-white group-hover:text-red-600 transition-colors duration-500 font-extrabold italic text-sm tracking-tighter">Glory.</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
