import type { Field } from 'payload';

interface StandardizedConfig {
  groupName: string;
  groupLabel: string;
  record: string;
  conditionPath?: string;
  mimeType?: string;
  required?: boolean;
  groupDescription?: string;
  fieldLabel?: string;
  fieldDescription?: string;
}

export const createStandardizedGroup = (config: StandardizedConfig): Field => {
  const {
    groupName,
    groupLabel,
    record,
    conditionPath,
    mimeType,
    required = false,
    groupDescription = `This group contains the ${groupLabel.toLowerCase()} of the ${record}.`,
    fieldLabel = `Does the ${record} have a ${groupLabel.toLowerCase()}?`,
    fieldDescription = `${groupLabel} content displayed on the ${record} page.`,
  } = config;

  return {
    type: 'group',
    name: groupName,
    label: groupLabel,
    admin: {
      description: groupDescription,
      condition: conditionPath ? (data) => data?.[conditionPath]?.enable === true : undefined,
    },
    fields: [
      {
        label: fieldLabel,
        name: 'media',
        type: 'upload',
        relationTo: 'media',
        required,
        localized: false,
        admin: {
          description: fieldDescription,
        },
        filterOptions: mimeType ? {
          mimeType: { contains: mimeType },
        } : undefined,
      }
    ]
  };
};