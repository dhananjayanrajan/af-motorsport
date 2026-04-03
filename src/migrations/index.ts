import * as migration_20260403_062559_initialize_schema from './20260403_062559_initialize_schema';

export const migrations = [
  {
    up: migration_20260403_062559_initialize_schema.up,
    down: migration_20260403_062559_initialize_schema.down,
    name: '20260403_062559_initialize_schema'
  },
];
