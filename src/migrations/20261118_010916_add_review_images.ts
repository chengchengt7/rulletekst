import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "reviews" ALTER COLUMN "review" SET NOT NULL;
  ALTER TABLE "reviews" ALTER COLUMN "duration" SET NOT NULL;
  ALTER TABLE "reviews" ADD COLUMN "film_name" varchar NOT NULL;
  ALTER TABLE "reviews" ADD COLUMN "hero_photo_id" integer;
  ALTER TABLE "reviews" ADD COLUMN "sub_title" varchar NOT NULL;
  ALTER TABLE "reviews_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_hero_photo_id_media_id_fk" FOREIGN KEY ("hero_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reviews_rels" ADD CONSTRAINT "reviews_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "reviews_hero_photo_idx" ON "reviews" USING btree ("hero_photo_id");
  CREATE INDEX "reviews_rels_media_id_idx" ON "reviews_rels" USING btree ("media_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "reviews" DROP CONSTRAINT "reviews_hero_photo_id_media_id_fk";
  
  ALTER TABLE "reviews_rels" DROP CONSTRAINT "reviews_rels_media_fk";
  
  DROP INDEX "reviews_hero_photo_idx";
  DROP INDEX "reviews_rels_media_id_idx";
  ALTER TABLE "reviews" ALTER COLUMN "duration" DROP NOT NULL;
  ALTER TABLE "reviews" ALTER COLUMN "review" DROP NOT NULL;
  ALTER TABLE "reviews" DROP COLUMN "film_name";
  ALTER TABLE "reviews" DROP COLUMN "hero_photo_id";
  ALTER TABLE "reviews" DROP COLUMN "sub_title";
  ALTER TABLE "reviews_rels" DROP COLUMN "media_id";`)
}
