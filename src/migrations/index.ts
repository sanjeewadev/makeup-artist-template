import * as migration_20260918_151419_initial from './20260918_151419_initial';
import * as migration_20261105_170230_schema_sync from './20261105_170230_schema_sync';

export const migrations = [
  {
    up: migration_20260918_151419_initial.up,
    down: migration_20260918_151419_initial.down,
    name: '20260918_151419_initial',
  },
  {
    up: migration_20261105_170230_schema_sync.up,
    down: migration_20261105_170230_schema_sync.down,
    name: '20261105_170230_schema_sync'
  },
];
