import type { GlobalConfig } from 'payload'

export const Socials: GlobalConfig = {
  slug: 'socials',
  label: 'Socials',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Connectivity',
    description: 'All social media and external platform presences for AF Motorsport.',
  },
  fields: [
    {
      name: 'accounts',
      label: 'Social Accounts',
      type: 'array',
      maxRows: 16,
      fields: [
        {
          name: 'platform',
          label: 'Platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'X / Twitter', value: 'x' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'Threads', value: 'threads' },
            { label: 'Snapchat', value: 'snapchat' },
            { label: 'Pinterest', value: 'pinterest' },
            { label: 'Discord', value: 'discord' },
            { label: 'Twitch', value: 'twitch' },
            { label: 'WhatsApp', value: 'whatsapp' },
            { label: 'Telegram', value: 'telegram' },
            { label: 'GitHub', value: 'github' },
            { label: 'Spotify', value: 'spotify' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'label',
          label: 'Display Label',
          type: 'text',
          admin: {
            description: 'Optional override label. Defaults to platform name if left empty.',
          },
        },
        {
          name: 'handle',
          label: 'Handle / Username',
          type: 'text',
          admin: {
            description: 'E.g. @afmotorsport',
          },
        },
        {
          name: 'url',
          label: 'Profile URL',
          type: 'text',
          required: true,
        },
        {
          name: 'channel',
          label: 'Linked Channel',
          type: 'relationship',
          relationTo: 'channels',
          admin: {
            description: 'Optional link to the corresponding Channels collection record.',
          },
        },
        {
          name: 'visible',
          label: 'Visible',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
  ],
}