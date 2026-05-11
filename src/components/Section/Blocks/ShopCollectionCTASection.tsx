"use client"

import { Product } from '@/payload-types'
import React from 'react'
import GridSection, { GridItem } from './GridSection'

interface ShopCTAProps {
    products: Product[]
}

export const ShopCollectionsCTA: React.FC<ShopCTAProps> = ({ products }) => {
    const gridItems: GridItem[] = products.map((product) => {
        const firstGalleryImage = product.gallery?.[0]?.image
        const metaImage = product.meta?.image

        let imageUrl = ""
        if (typeof firstGalleryImage === 'object' && firstGalleryImage?.url) {
            imageUrl = firstGalleryImage.url
        } else if (typeof metaImage === 'object' && metaImage?.url) {
            imageUrl = metaImage.url
        }

        const category = product.categories?.[0]
        let categoryLabel = ""

        if (category && typeof category === 'object') {
            categoryLabel = (category as any).title || (category as any).name || ""
        }

        return {
            id: product.id.toString(),
            title: product.title,
            subtitle: product.meta?.description || "",
            image: imageUrl,
            href: `/shop/${product.slug}`,
            category: categoryLabel,
        }
    })

    return (
        <GridSection
            id="shop-collections-cta"
            title="SHOP COLLECTIONS"
            subtitle="CHECKOUT OUR LATEST PRODUCTS IN OUR SHOP"
            items={gridItems}
            columns={4}
            headerVariant={1}
            footerVariant={1}
            labels={{
                unitsCount: "ITEMS",
                viewProject: "VIEW PRODUCT",
                sectionIndex: "01",
                fallbackAlt: "COLLECTION IMAGE",
            }}
        />
    )
}