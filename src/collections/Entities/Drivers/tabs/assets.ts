import type { Field } from 'payload'
import { dictionary } from '../sources/dictionary'
import { uploadFieldFactory } from '@/fields/factories/fields/uploadField'
import { groupFactory } from '@/fields/factories/blueprint'
import { textFieldFactory } from '@/fields/factories/fields/textField'

export const assetsFields: Field[] = [
  uploadFieldFactory({
    name: 'avatar',
    relationTo: 'media',
    dictionary: dictionary.tabs.assets,
    width: 2,
    flags: [],
  }),
  uploadFieldFactory({
    name: 'autograph',
    relationTo: 'media',
    dictionary: dictionary.tabs.assets,
    width: 2,
    flags: [],
  }),
  uploadFieldFactory({
    name: 'cover',
    relationTo: 'media',
    dictionary: dictionary.tabs.assets,
    width: 2,
    flags: [],
  }),
  groupFactory(
    {
      name: 'gallery',
      label: { en: 'Gallery', es: 'Galería', pt: 'Galeria' },
      entity: { en: 'Gallery Item', es: 'Elemento de Galería', pt: 'Item da Galeria' },
      description: { en: 'Image gallery', es: 'Galería de imágenes', pt: 'Galeria de imagens' },
    },
    dictionary.host,
    [
      uploadFieldFactory({ name: 'image', relationTo: 'media', dictionary: undefined, width: 1, flags: ['required'] }),
      textFieldFactory({ name: 'caption', dictionary: undefined, width: 1, minLength: 1, maxLength: 200 }),
    ],
    true
  ),
]
