// FILE: src/fields/factories/toggles/visibility.ts
import type { Field, StaticLabel } from 'payload'

interface ControlOptions {
  record: StaticLabel
  label: StaticLabel
}

export const enable = ({ label }: ControlOptions): Field => ({
  name: 'enable',
  type: 'checkbox',
  label: 'Do you want to enable this section?',
  defaultValue: true,
  admin: {
    width: '100%',
    style: { borderLeft: '3px dotted var(--theme-elevation-100)', paddingLeft: 'var(--base)' },
    description: {
      en: 'Toggle the ' + label.en + ' section on or off.',
      es: 'Activar o desactivar la sección ' + label.es + '.',
      pt: 'Ativar ou desativar a seção ' + label.pt + '.',
    },
  },
})

export const show = ({ label }: ControlOptions): Field => ({
  type: 'group',
  name: 'visibility',
  label: '',
  admin: {
    width: '100%',
  },
  fields: [
    {
      name: 'show',
      type: 'checkbox',
      label: {
        en: 'Do you want to make the ' + label.en + ' section publicly visible?',
        es: '¿Quieres hacer la sección ' + label.es + ' visible públicamente?',
        pt: 'Você quer tornar a seção ' + label.pt + ' visível publicamente?',
      },
      defaultValue: false,
      admin: {
        description: {
          en: 'Toggle the ' + label.en + ' section on or off.',
          es: 'Activar o desactivar la sección ' + label.es + '.',
          pt: 'Ativar ou desativar a seção ' + label.pt + '.',
        },
        width: '100%',
        style: { borderLeft: '3px dotted var(--theme-elevation-100)', paddingLeft: 'var(--base)' },
      },
    }
  ],
})

interface VisibilityGroupOptions {
  record: StaticLabel
  entity: StaticLabel
}

export const visibilityGroup = ({ entity }: VisibilityGroupOptions): Field => ({
  type: 'group',
  name: 'settings',
  label: '',
  admin: {
    width: '100%',
    style: { borderLeft: '3px dotted var(--theme-elevation-100)', paddingLeft: 'var(--base)' },
  },
  fields: [
    {
      type: 'collapsible',
      label: {
        en: 'Change the visibility options for this ' + entity.en + ' entry.',
        es: 'Cambiar las opciones de visibilidad para esta ' + entity.es + ' entrada.',
        pt: 'Alterar as opções de visibilidade para esta ' + entity.pt + ' entrada.',
      },
      admin: {
        width: '100%',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'show',
          type: 'checkbox',
          label: {
            en: 'Do you want to make this ' + entity.en + ' visible?',
            es: '¿Quieres hacer esta ' + entity.es + ' visible públicamente?',
            pt: 'Você quer tornar esta ' + entity.pt + ' visível publicamente?',
          },
          defaultValue: true,
          admin: {
            description: {
              en: 'Toggle the ' + entity.en + ' entry on or off.',
              es: 'Activar o desactivar la entrada ' + entity.es + '.',
              pt: 'Ativar ou desativar a entrada ' + entity.pt + '.',
            },
          },
        },
        {
          name: 'featured',
          type: 'checkbox',
          label: {
            en: 'Do you want to make this ' + entity.en + ' featured?',
            es: '¿Quieres hacer esta ' + entity.es + ' destacada?',
            pt: 'Você quer tornar esta ' + entity.pt + ' em destaque?',
          },
          defaultValue: false,
          admin: {
            description: {
              en: 'Toggle the ' + entity.en + ' entry on or off.',
              es: 'Activar o desactivar la entrada ' + entity.es + '.',
              pt: 'Ativar ou desativar a entrada ' + entity.pt + '.',
            },
          },
        },
        {
          name: 'pinned',
          type: 'checkbox',
          label: {
            en: 'Do you want to make this ' + entity.en + ' pinned?',
            es: '¿Quieres hacer esta ' + entity.es + ' fijada?',
            pt: 'Você quer tornar esta ' + entity.pt + ' fixada?',
          },
          defaultValue: false,
          admin: {
            description: {
              en: 'Toggle the ' + entity.en + ' entry on or off.',
              es: 'Activar o desactivar la entrada ' + entity.es + '.',
              pt: 'Ativar ou desativar a entrada ' + entity.pt + '.',
            },
          },
        },
      ],
    },
  ],
})