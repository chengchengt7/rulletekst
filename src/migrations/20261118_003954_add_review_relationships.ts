import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "directors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "actors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "rating" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" numeric NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "rating_block" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "reviews" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"director_id" integer NOT NULL,
  	"rating_id" integer NOT NULL,
  	"rating_block_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "reviews_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"actors_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "directors_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "actors_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "rating_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "rating_block_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "reviews_id" integer;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_director_id_directors_id_fk" FOREIGN KEY ("director_id") REFERENCES "public"."directors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_rating_id_rating_id_fk" FOREIGN KEY ("rating_id") REFERENCES "public"."rating"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_rating_block_id_rating_block_id_fk" FOREIGN KEY ("rating_block_id") REFERENCES "public"."rating_block"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reviews_rels" ADD CONSTRAINT "reviews_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reviews_rels" ADD CONSTRAINT "reviews_rels_actors_fk" FOREIGN KEY ("actors_id") REFERENCES "public"."actors"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "directors_slug_idx" ON "directors" USING btree ("slug");
  CREATE INDEX "directors_updated_at_idx" ON "directors" USING btree ("updated_at");
  CREATE INDEX "directors_created_at_idx" ON "directors" USING btree ("created_at");
  CREATE UNIQUE INDEX "actors_slug_idx" ON "actors" USING btree ("slug");
  CREATE INDEX "actors_updated_at_idx" ON "actors" USING btree ("updated_at");
  CREATE INDEX "actors_created_at_idx" ON "actors" USING btree ("created_at");
  CREATE INDEX "rating_updated_at_idx" ON "rating" USING btree ("updated_at");
  CREATE INDEX "rating_created_at_idx" ON "rating" USING btree ("created_at");
  CREATE INDEX "rating_block_updated_at_idx" ON "rating_block" USING btree ("updated_at");
  CREATE INDEX "rating_block_created_at_idx" ON "rating_block" USING btree ("created_at");
  CREATE UNIQUE INDEX "reviews_slug_idx" ON "reviews" USING btree ("slug");
  CREATE INDEX "reviews_director_idx" ON "reviews" USING btree ("director_id");
  CREATE INDEX "reviews_rating_idx" ON "reviews" USING btree ("rating_id");
  CREATE INDEX "reviews_rating_block_idx" ON "reviews" USING btree ("rating_block_id");
  CREATE INDEX "reviews_updated_at_idx" ON "reviews" USING btree ("updated_at");
  CREATE INDEX "reviews_created_at_idx" ON "reviews" USING btree ("created_at");
  CREATE INDEX "reviews_rels_order_idx" ON "reviews_rels" USING btree ("order");
  CREATE INDEX "reviews_rels_parent_idx" ON "reviews_rels" USING btree ("parent_id");
  CREATE INDEX "reviews_rels_path_idx" ON "reviews_rels" USING btree ("path");
  CREATE INDEX "reviews_rels_actors_id_idx" ON "reviews_rels" USING btree ("actors_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_directors_fk" FOREIGN KEY ("directors_id") REFERENCES "public"."directors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_actors_fk" FOREIGN KEY ("actors_id") REFERENCES "public"."actors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_rating_fk" FOREIGN KEY ("rating_id") REFERENCES "public"."rating"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_rating_block_fk" FOREIGN KEY ("rating_block_id") REFERENCES "public"."rating_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_directors_id_idx" ON "payload_locked_documents_rels" USING btree ("directors_id");
  CREATE INDEX "payload_locked_documents_rels_actors_id_idx" ON "payload_locked_documents_rels" USING btree ("actors_id");
  CREATE INDEX "payload_locked_documents_rels_rating_id_idx" ON "payload_locked_documents_rels" USING btree ("rating_id");
  CREATE INDEX "payload_locked_documents_rels_rating_block_id_idx" ON "payload_locked_documents_rels" USING btree ("rating_block_id");
  CREATE INDEX "payload_locked_documents_rels_reviews_id_idx" ON "payload_locked_documents_rels" USING btree ("reviews_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "directors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "actors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rating" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rating_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reviews" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reviews_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "directors" CASCADE;
  DROP TABLE "actors" CASCADE;
  DROP TABLE "rating" CASCADE;
  DROP TABLE "rating_block" CASCADE;
  DROP TABLE "reviews" CASCADE;
  DROP TABLE "reviews_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_directors_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_actors_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_rating_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_rating_block_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_reviews_fk";
  
  DROP INDEX "payload_locked_documents_rels_directors_id_idx";
  DROP INDEX "payload_locked_documents_rels_actors_id_idx";
  DROP INDEX "payload_locked_documents_rels_rating_id_idx";
  DROP INDEX "payload_locked_documents_rels_rating_block_id_idx";
  DROP INDEX "payload_locked_documents_rels_reviews_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "directors_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "actors_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "rating_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "rating_block_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "reviews_id";`)
}
