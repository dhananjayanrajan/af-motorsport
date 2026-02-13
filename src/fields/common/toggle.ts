import type { Field, StaticLabel } from 'payload'

export const createToggleGroup = (record: StaticLabel): Field => ({
  label: {
    en: 'Do you want to create a simple or advanced entry?',
    es: '¿Quieres crear una entrada simple o avanzada?',
    pt: 'Você deseja criar uma entrada simples ou avançada?',
  },
  type: 'group',
  admin: {
    description: {
      en: 'Simple mode contains basic info; Advanced mode shows all options.',
      es: 'El modo simple contiene información básica; el modo avanzado muestra todas las opciones.',
      pt: 'O modo simples contém informações básicas; o modo avançado mostra todas as opções.',
    },
    hideGutter: true,
  },
  fields: [
    {
      label: {
        en: 'Toggle to show all available options?',
        es: '¿Alternar para mostrar todas las opciones?',
        pt: 'Alternar para mostrar todas as opções?',
      },
      name: 'toggle',
      type: 'radio',
      options: [
        { label: { en: 'Simple', es: 'Simple', pt: 'Simples' }, value: 'simple' },
        { label: { en: 'Advanced', es: 'Avanzado', pt: 'Avançado' }, value: 'advanced' },
      ],
      defaultValue: 'advanced',
      admin: {
        width: '100%',
        layout: 'horizontal',
      },
    },
  ],
})