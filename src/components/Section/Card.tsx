"use client"
import { Media } from '@/payload-types'
import Image from 'next/image'
import React from 'react'

interface SectionCardProps {
    title: string
    subtitle?: string
    image?: Media | string | null
    label?: string
    variant?: 1 | 2 | 3 | 4 | 5
    onClick?: () => void
    active?: boolean
}

const SectionCard: React.FC<SectionCardProps> = ({
    title,
    subtitle,
    image,
    label,
    variant = 1,
    onClick,
    active = false
}) => {
    const imageUrl = typeof image === 'string'
        ? image
        : (image && typeof image === 'object' && 'url' in image)
            ? (image as Media).url || ''
            : ''

    const finalImageSrc = imageUrl || `https://picsum.photos/seed/${title.replace(/\s+/g, '-')}/800/600`

    const renderVariant2 = () => (
        <button
            onClick={onClick}
            className={`group relative w-full h-full overflow-hidden rounded-2xl transition-all duration-500 ease-out outline-none ${active ? 'bg-primary-500 shadow-xl shadow-primary-500/20' : 'bg-white-pure hover:shadow-lg hover:-translate-y-1'}`}
        >
            <div className="relative h-48 w-full overflow-hidden">
                <Image src={finalImageSrc} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="p-6 md:p-8 flex flex-col items-start gap-3 lg:gap-4">
                {label && (
                    <span className={`text-base uppercase tracking-wide transition-colors duration-300 ${active ? 'text-black-pure' : 'text-secondary-500'}`}>
                        {label}
                    </span>
                )}
                <h4 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight transition-colors duration-300 ${active ? 'text-black-pure' : 'text-black-pure group-hover:text-primary-600'}`}>
                    {title}
                </h4>
                {subtitle && <span className="text-base lg:text-lg text-neutral-500">{subtitle}</span>}
            </div>
        </button>
    )

    const renderVariant3 = () => (
        <button
            onClick={onClick}
            className="group relative w-full h-full overflow-hidden rounded-2xl outline-none"
        >
            <Image src={finalImageSrc} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black-pure/80 via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-90" />
            <div className="absolute inset-0 p-6 md:p-8 lg:p-10 flex flex-col justify-end gap-4 lg:gap-6">
                <h4 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white-pure leading-tight group-hover:text-primary-500 transition-colors duration-300">{title}</h4>
                <div className="w-16 md:w-20 h-1.5 bg-secondary-500 rounded-full group-hover:w-24 transition-all duration-500" />
            </div>
        </button>
    )

    const renderVariant4 = () => (
        <button
            onClick={onClick}
            className="group relative w-full h-full overflow-hidden rounded-2xl bg-white-pure shadow-sm hover:shadow-lg transition-all duration-500 outline-none flex flex-col"
        >
            <div className="flex-1 p-6 md:p-8 lg:p-10 flex flex-col justify-between relative">
                {label && (
                    <span className="text-5xl font-black text-neutral-200 absolute top-4 md:top-6 lg:top-8 right-4 md:right-6 lg:right-8 group-hover:text-primary-200 transition-colors duration-500">
                        {label.charAt(0)}
                    </span>
                )}
                <h4 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black-pure group-hover:text-primary-600 transition-colors duration-300 relative z-10">
                    {title}
                </h4>
                <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 md:w-16 h-1.5 bg-black-pure rounded-full group-hover:bg-secondary-500 transition-colors duration-300" />
                    {subtitle && <span className="text-base md:text-lg font-medium text-neutral-500">{subtitle}</span>}
                </div>
            </div>
            <div className="h-32 md:h-40 w-full relative overflow-hidden rounded-b-2xl">
                <Image src={finalImageSrc} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
        </button>
    )

    const renderVariant5 = () => (
        <button
            onClick={onClick}
            className="group relative w-full h-full overflow-hidden rounded-2xl bg-white-pure hover:bg-secondary-50 transition-all duration-500 outline-none flex items-stretch"
        >
            <div className="w-2 md:w-3 lg:w-4 bg-primary-500 group-hover:bg-black-pure transition-colors duration-300" />
            <div className="flex-1 p-6 md:p-8 lg:p-10 flex flex-col justify-center gap-2 lg:gap-3">
                <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black-pure">{title}</h4>
                {subtitle && <p className="text-base md:text-lg text-neutral-500">{subtitle}</p>}
            </div>
            <div className="w-24 md:w-32 lg:w-40 relative overflow-hidden border-l border-neutral-200">
                <Image src={finalImageSrc} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
        </button>
    )

    const renderVariant1 = () => (
        <button
            onClick={onClick}
            className="relative w-full h-full overflow-hidden rounded-2xl group bg-primary-500 hover:shadow-2xl hover:shadow-primary-500/20 transition-all duration-500 outline-none"
        >
            <Image src={finalImageSrc} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black-pure/40 group-hover:bg-secondary-500/60 transition-colors duration-500" />
            <div className="absolute inset-0 p-6 md:p-8 lg:p-10 flex flex-col justify-between z-10">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-primary-500 bg-white-pure/20 backdrop-blur-sm" />
                    {label && (
                        <span className="text-base md:text-lg font-medium text-white-pure/90">
                            {label}
                        </span>
                    )}
                </div>
                <h4 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white-pure group-hover:translate-x-2 transition-transform duration-500">
                    {title}
                </h4>
            </div>
        </button>
    )

    if (variant === 2) return renderVariant2()
    if (variant === 3) return renderVariant3()
    if (variant === 4) return renderVariant4()
    if (variant === 5) return renderVariant5()
    return renderVariant1()
}

export default SectionCard