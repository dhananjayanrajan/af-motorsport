import type { Field } from 'payload';
import { enable, show } from '../../common/visibility';

interface SectionGroupOptions {
  label: string;
  record: string;
  description?: string;
  contentFields: Field[];
}

export const createMainGroup = ({
  label,
  record,
  description,
  contentFields,
}: SectionGroupOptions): Field => ({
  type: 'group',
  label: label,
  admin: {
    description: description || `Manage ${label.toLowerCase()} for this ${record}.`,
    hideGutter: true,
  },
  fields: [
    enable({ record, label }),

    {
      type: 'group',
      admin: {
        condition: (_, siblingData) => siblingData?.enable === true,
        hideGutter: true,
      },
      fields: [
        ...contentFields,
        show({ record, label }),
      ],
    },
  ],
});