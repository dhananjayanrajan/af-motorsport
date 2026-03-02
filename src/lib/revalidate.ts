import { revalidateTag } from 'next/cache'
import { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload'

export const revalidateCollection: CollectionAfterChangeHook = ({ doc, collection }) => {
    revalidateTag(collection.slug)
    if (doc.slug) revalidateTag(`${collection.slug}-${doc.slug}`)
    return doc
}

export const revalidateGlobal: GlobalAfterChangeHook = ({ doc, global }) => {
    revalidateTag(`global_${global.slug}`)
    return doc
}