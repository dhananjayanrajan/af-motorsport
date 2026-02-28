// FILE: src/fields/factories/toggles/advanced.ts
import type { Field } from 'payload'

export const advanced = (field: Field): Field => {
  const advancedField = { ...field } as any
  advancedField.admin = {
    ...advancedField.admin,
    condition: (data: any) => data?.toggle === 'advanced',
  }
  advancedField.hooks = {
    ...advancedField.hooks,
    beforeValidate: [
      ({ value, data }: any) => {
        if (data?.toggle !== 'advanced') return null
        return value
      },
      ...(advancedField.hooks?.beforeValidate || []),
    ],
  }
  return advancedField as Field
}
