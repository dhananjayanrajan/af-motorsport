### CHANNELS
- ESSENTIALS
  - name `text` flags: [required, localized, index]
  - type `relationship: categories` (hasOne) flags: [required] [Social, Email, Phone, Website, Press]

- BASICS
  - identifier `group` [label `text` flags: [localized], title `text` flags: [localized]]
  - address `group` [value `text` flags: [localized], locator `text` flags: [localized, advanced], endpoint `text` flags: [localized, advanced]]
  - protocol `group` [format `select` flags: [required] [HTTP, HTTPS, FTP, SFTP, SMTP, Custom], scheme `select` flags: [advanced] [Standard, Secure, Legacy], specification `text` flags: [advanced]]

- TRAITS
  - usage `group` flags: [advanced] [purpose `text` flags: [localized], role `select` flags: [] [Primary, Secondary, Backup, Test], function `select` flags: [] [Broadcast, Receive, Monitor, Control]]
  - validity `group` flags: [advanced] [status `select` flags: [] [Active, Inactive, Pending, Deprecated], condition `select` flags: [] [Operational, Degraded, Failed, Maintenance], state `select` flags: [] [Enabled, Disabled, Locked]]

