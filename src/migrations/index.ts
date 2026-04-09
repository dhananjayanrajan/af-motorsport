import * as migration_20260409_040922 from './20260409_040922';

export const migrations = [
  {
    up: migration_20260409_040922.up,
    down: migration_20260409_040922.down,
    name: '20260409_040922'
  },
];
