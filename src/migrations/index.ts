import * as migration_20261016_185911 from './20261016_185911';
import * as migration_20261119_234308_reservations from './20261119_234308_reservations';

export const migrations = [
  {
    up: migration_20261016_185911.up,
    down: migration_20261016_185911.down,
    name: '20261016_185911',
  },
  {
    up: migration_20261119_234308_reservations.up,
    down: migration_20261119_234308_reservations.down,
    name: '20261119_234308_reservations'
  },
];
