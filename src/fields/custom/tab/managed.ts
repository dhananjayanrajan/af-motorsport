// utils/createManagedTab.ts
import type { Field, Tab } from 'payload';
import { enable } from '../../common/visibility';

interface ManagedTabOptions {
  name: string;
  record: string;
  innerGroupDescription: string;
  customGroups: Field[];
  extraFields: Field[];
}

export const createManagedTab = ({
  name,
  record,
  innerGroupDescription,
  customGroups,
  extraFields,
}: ManagedTabOptions): Tab => {
  const label = name.charAt(0).toUpperCase() + name.slice(1);

  return {
    name,
    label,
    admin: {
      description: `Manages all the ${label.toLowerCase()} related to this ${record}.`,
      condition: (data) => data?.toggle === 'advanced',
    },
    fields: [
      {
        type: 'group',
        label,
        admin: {
          description: innerGroupDescription,
          hideGutter: true,
        },
        fields: [
          enable({ record, label }),
        ],
      },

      ...customGroups,

      ...extraFields,
    ],
  };
};