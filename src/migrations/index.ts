import * as migration_20261016_185911 from './20261016_185911';
import * as migration_20261118_001723_add_user_name from './20261118_001723_add_user_name';
import * as migration_20261118_003954_add_review_relationships from './20261118_003954_add_review_relationships';
import * as migration_20261118_004047_add_review_duration_journalist from './20261118_004047_add_review_duration_journalist';
import * as migration_20261118_004102_add_review_body from './20261118_004102_add_review_body';
import * as migration_20261118_010916_add_review_images from './20261118_010916_add_review_images';

export const migrations = [
  {
    up: migration_20261016_185911.up,
    down: migration_20261016_185911.down,
    name: '20261016_185911',
  },
  {
    up: migration_20261118_001723_add_user_name.up,
    down: migration_20261118_001723_add_user_name.down,
    name: '20261118_001723_add_user_name',
  },
  {
    up: migration_20261118_003954_add_review_relationships.up,
    down: migration_20261118_003954_add_review_relationships.down,
    name: '20261118_003954_add_review_relationships',
  },
  {
    up: migration_20261118_004047_add_review_duration_journalist.up,
    down: migration_20261118_004047_add_review_duration_journalist.down,
    name: '20261118_004047_add_review_duration_journalist',
  },
  {
    up: migration_20261118_004102_add_review_body.up,
    down: migration_20261118_004102_add_review_body.down,
    name: '20261118_004102_add_review_body',
  },
  {
    up: migration_20261118_010916_add_review_images.up,
    down: migration_20261118_010916_add_review_images.down,
    name: '20261118_010916_add_review_images'
  },
];
