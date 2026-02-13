// fields/custom/tab/mainTab.ts
import type { Field, Tab } from 'payload';
import { enable } from '../../common/visibility';

interface MainTabOptions {
  name: string;
  record: string;
  mainGroupDescription: string;
  customGroups: Field[];
  extraFields: Field[];
}

export const createMainTab = ({
  name,
  record,
  mainGroupDescription,
  customGroups,
  extraFields,
}: MainTabOptions): Tab => {
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
          description: mainGroupDescription,
          hideGutter: true,
        },
        fields: [enable({ record, label })],
      },

      ...customGroups,

      ...extraFields,
    ],
  };
};