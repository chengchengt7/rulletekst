import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "reviews" ADD COLUMN "duration" numeric;
  ALTER TABLE "reviews" ADD COLUMN "journalist_id" integer;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_journalist_id_users_id_fk" FOREIGN KEY ("journalist_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "reviews_journalist_idx" ON "reviews" USING btree ("journalist_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "reviews" DROP CONSTRAINT "reviews_journalist_id_users_id_fk";
  
  DROP INDEX "reviews_journalist_idx";
  ALTER TABLE "reviews" DROP COLUMN "duration";
  ALTER TABLE "reviews" DROP COLUMN "journalist_id";`)
}
