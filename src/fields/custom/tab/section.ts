// utils/createSectionTabs.ts
import type { Field } from 'payload';
import { createMainGroup } from '../group/main';

interface SectionConfig {
  name: string;
  label: string;
  contentFields: (record: string) => Field[];
}

interface SectionTabsOptions {
  record: string;
  sections: SectionConfig[];
  parentConditionPath?: string;
}

export const createSectionTabs = ({
  record,
  sections,
  parentConditionPath = 'attributes.toggle',
}: SectionTabsOptions): Field => {
  if (sections.length === 0) {
    return {
      type: 'text',
      name: `_empty_section_placeholder_${record}`,
      admin: { hidden: true },
      required: false,
    };
  }

  return {
    type: 'group',
    label: '',
    admin: {
      condition: (data) => {
        const keys = parentConditionPath.split('.');
        let value: unknown = data;
        for (const key of keys) {
          if (value == null || typeof value !== 'object') return false;
          value = (value as Record<string, unknown>)[key];
        }
        return value === true;
      },
    },
    fields: [
      {
        type: 'tabs',
        tabs: sections.map(({ name, label, contentFields }) => ({
          label,
          name,
          fields: [
            createMainGroup({
              label,
              record,
              contentFields: contentFields(record),
            }),
          ],
        })),
      },
    ],
  };
};