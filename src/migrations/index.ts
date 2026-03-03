import * as migration_20260303_195832 from './20260303_195832';

export const migrations = [
  {
    up: migration_20260303_195832.up,
    down: migration_20260303_195832.down,
    name: '20260303_195832'
  },
];
