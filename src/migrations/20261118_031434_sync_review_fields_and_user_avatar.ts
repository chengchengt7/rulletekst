import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "reviews" RENAME COLUMN "title" TO "review_title";
  ALTER TABLE "reviews" RENAME COLUMN "film_name" TO "title";
  ALTER TABLE "reviews" RENAME COLUMN "rating_id" TO "reivew_rating_id";
  ALTER TABLE "reviews" RENAME COLUMN "review" TO "review_body";
  ALTER TABLE "reviews" DROP CONSTRAINT "reviews_rating_id_rating_id_fk";
  
  DROP INDEX "reviews_rating_idx";
  ALTER TABLE "users" ADD COLUMN "avatar_id" integer;
  ALTER TABLE "users" ADD CONSTRAINT "users_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_reivew_rating_id_rating_id_fk" FOREIGN KEY ("reivew_rating_id") REFERENCES "public"."rating"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_avatar_idx" ON "users" USING btree ("avatar_id");
  CREATE INDEX "reviews_reivew_rating_idx" ON "reviews" USING btree ("reivew_rating_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "reviews" RENAME COLUMN "title" TO "film_name";
  ALTER TABLE "reviews" RENAME COLUMN "review_title" TO "title";
  ALTER TABLE "reviews" RENAME COLUMN "reivew_rating_id" TO "rating_id";
  ALTER TABLE "reviews" RENAME COLUMN "review_body" TO "review";
  ALTER TABLE "users" DROP CONSTRAINT "users_avatar_id_media_id_fk";
  
  ALTER TABLE "reviews" DROP CONSTRAINT "reviews_reivew_rating_id_rating_id_fk";
  
  DROP INDEX "users_avatar_idx";
  DROP INDEX "reviews_reivew_rating_idx";
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_rating_id_rating_id_fk" FOREIGN KEY ("rating_id") REFERENCES "public"."rating"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "reviews_rating_idx" ON "reviews" USING btree ("rating_id");
  ALTER TABLE "users" DROP COLUMN "avatar_id";`)
}
