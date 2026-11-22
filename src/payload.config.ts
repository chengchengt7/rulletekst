import { en } from 'payload/i18n/en';
import { nb } from "payload/i18n/nb";
import { zh } from "payload/i18n/zh";

import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import path from 'path';
import { Block, buildConfig, CollectionConfig, GlobalConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { migrations } from "./migrations";

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Directors } from './collections/Directors';
import { Actors } from './collections/Actors';
import { Rating } from './collections/Rating';
import { AgeRating } from './collections/Age-rating';
import { Reviews } from './collections/Reviews';
import { Articles } from './collections/Articles';
import { HomePage } from './globals/HomePage';
import { ReviewBlock } from './blocks/ReviewBlock';
import { BannerBlock } from './blocks/BannerBlock';
import { FilmNightsBlock } from './blocks/FilmNightsBlock';
import { ArticleBlock } from './blocks/ArticleBlock';
import { FilmNights } from './collections/FilmNights';
import { Reservations } from './collections/Reservations';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);



/**
 * Collections
 * Legg innholdssamlinger inn i dette arrayet for å inkludere dem.
 */

const collections: CollectionConfig[] = [
  Users,
  Media,
  Directors,
  Actors,
  Rating,
  AgeRating,
  Reviews,
  Articles,
  FilmNights,
  Reservations,
];

/**
 * Blokker
 * Legg blokker inn i dette arrayet for å inkludere dem.
 */
const blocks: Block[] = [
  BannerBlock,
  ArticleBlock,
  ReviewBlock,
  FilmNightsBlock,

];

const globals: GlobalConfig[] = [
  HomePage
];



/**
 * Payload-konfigurasjon
 * Endre her for å legge til plugins, justere på databaseinnstillinger
 * eller andre ting du trenger. Vær varsom - endringer du gjør her kan
 * gjøre at prosjektet ditt ikke kjører!
 */
export default buildConfig({
  i18n: {
    supportedLanguages: { en, nb, zh },
    fallbackLanguage: "en",
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  blocks,
  collections,
  globals,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    prodMigrations: migrations
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      collections: { media: { disablePayloadAccessControl: true } },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
      alwaysInsertFields: true,
      clientUploads: true,
    }),
  ],
});
