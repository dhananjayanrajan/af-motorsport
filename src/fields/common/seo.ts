// FILE: src/fields/common/seo.ts
import type { Tab } from 'payload';
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields';

export const createSeoTab = (): Tab => ({
  label: { en: 'SEO', es: 'SEO', pt: 'SEO' },
  name: 'seo',
  description: {
    en: 'Controls search and share information like titles, descriptions and preview images. Helps the admin shape how the entity appears on Google and social platforms.',
    es: 'Controles de búsqueda y compartición de información como títulos, descripciones e imágenes de vista previa. Ayuda al administrador a dar forma a cómo aparece la entidad en Google y las plataformas sociales.',
    pt: 'Controla la información de búsqueda y uso compartido, como títulos, descripciones e imágenes de vista previa. Ayuda al administrador a dar forma a cómo aparece la entidad en Google y las plataformas sociales.'
  },
  fields: [
    OverviewField({
      titlePath: 'meta.title',
      descriptionPath: 'meta.description',
      imagePath: 'meta.image',
    }),
    MetaTitleField({ hasGenerateFn: true }),
    MetaImageField({ relationTo: 'media', hasGenerateFn: true }),
    MetaDescriptionField({ hasGenerateFn: true }),
    PreviewField({
      titlePath: 'meta.title',
      descriptionPath: 'meta.description',
      hasGenerateFn: true,
    }),
  ],
});