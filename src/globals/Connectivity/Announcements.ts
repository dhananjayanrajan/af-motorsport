import { adminOrPublishedStatus } from '@/access/adminOrPublishedStatus'
import type { GlobalConfig } from 'payload'

export const Announcements: GlobalConfig = {
  slug: 'announcements',
  label: 'Announcements',
  access: {
    read: adminOrPublishedStatus,
  },
  admin: {
    group: 'Connectivity',
    description: 'Site-wide announcements — banners, alerts, and notifications rendered across the frontend.',
  },
  fields: [
    {
      name: 'items',
      label: 'Announcements',
      type: 'array',
      fields: [
        {
          name: 'type',
          label: 'Type',
          type: 'select',
          required: true,
          options: [
            { label: 'Info', value: 'info' },
            { label: 'Warning', value: 'warning' },
            { label: 'Urgent', value: 'urgent' },
            { label: 'Celebration', value: 'celebration' },
          ],
          defaultValue: 'info',
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'message',
          label: 'Message',
          type: 'textarea',
          required: true,
          localized: true,
        },
        {
          name: 'link',
          label: 'Action Link',
          type: 'group',
          fields: [
            {
              name: 'enable',
              label: 'Include link',
              type: 'checkbox',
              defaultValue: false,
            },
            {
              name: 'label',
              label: 'Link Label',
              type: 'text',
              admin: {
                condition: (_, siblingData) => siblingData?.enable,
              },
            },
            {
              name: 'url',
              label: 'URL',
              type: 'text',
              admin: {
                condition: (_, siblingData) => siblingData?.enable,
              },
            },
          ],
        },
        {
          name: 'from',
          label: 'Show From',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
        {
          name: 'until',
          label: 'Show Until',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
        {
          name: 'audience',
          label: 'Target Audience',
          type: 'select',
          options: [
            { label: 'Everyone', value: 'everyone' },
            { label: 'Logged In Users', value: 'authenticated' },
            { label: 'Guests Only', value: 'guest' },
          ],
          defaultValue: 'everyone',
        },
        {
          name: 'dismissible',
          label: 'Dismissible',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'active',
          label: 'Active',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
  ],
}