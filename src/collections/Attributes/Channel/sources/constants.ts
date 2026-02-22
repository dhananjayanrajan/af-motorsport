// FILE: src/collections/Attributes/Channel/sources/constants.ts
export const PROTOCOL_FORMAT = ['HTTP', 'HTTPS', 'FTP', 'SFTP', 'SMTP', 'Custom']
export const PROTOCOL_SCHEME = ['Standard', 'Secure', 'Legacy']
export const USAGE_ROLE = ['Primary', 'Secondary', 'Backup', 'Test']
export const USAGE_FUNCTION = ['Broadcast', 'Receive', 'Monitor', 'Control']
export const VALIDITY_STATUS = [
  'Active',
  'Inactive',
  'Pending',
  'Deprecated',
]
export const VALIDITY_CONDITION = [
  'Operational',
  'Degraded',
  'Failed',
  'Maintenance',
]
export const VALIDITY_STATE = ['Enabled', 'Disabled', 'Locked']
