import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor', 'visitor');
  CREATE TYPE "public"."enum_rating_title" AS ENUM('1', '2', '3', '4', '5', '6');
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
  	"title" "enum_rating_title" NOT NULL,
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
  	"hero_photo_id" integer NOT NULL,
  	"director_id" integer NOT NULL,
  	"duration" numeric NOT NULL,
  	"rating_block_id" integer NOT NULL,
  	"review_title" varchar NOT NULL,
  	"reivew_rating_id" integer NOT NULL,
  	"sub_title" varchar NOT NULL,
  	"review_body" jsonb NOT NULL,
  	"journalist_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "reviews_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"actors_id" integer
  );
  
  CREATE TABLE "articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"category" varchar DEFAULT 'Cinema & Culture',
  	"published_at" timestamp(3) with time zone,
  	"hero_photo_id" integer NOT NULL,
  	"sub_title" varchar NOT NULL,
  	"review_body" jsonb NOT NULL,
  	"journalist_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "articles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "film_nights" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"event_date" timestamp(3) with time zone,
  	"hero_photo_id" integer NOT NULL,
  	"ticket_photo_id" integer NOT NULL,
  	"director_id" integer NOT NULL,
  	"duration" numeric NOT NULL,
  	"rating_block_id" integer NOT NULL,
  	"description" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "reservations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"age" numeric NOT NULL,
  	"film_night_id" integer NOT NULL,
  	"visitor_hash" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_blocks_review_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'Reviews' NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"reviews_id" integer
  );
  
  ALTER TABLE "users" ADD COLUMN "name" varchar NOT NULL;
  ALTER TABLE "users" ADD COLUMN "avatar_id" integer NOT NULL;
  ALTER TABLE "users" ADD COLUMN "role" "enum_users_role" DEFAULT 'visitor' NOT NULL;
  ALTER TABLE "media" ADD COLUMN "prefix" varchar DEFAULT '';
  ALTER TABLE "media" ADD COLUMN "_objectkey" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "directors_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "actors_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "rating_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "rating_block_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "reviews_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "articles_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "film_nights_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "reservations_id" integer;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_hero_photo_id_media_id_fk" FOREIGN KEY ("hero_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_director_id_directors_id_fk" FOREIGN KEY ("director_id") REFERENCES "public"."directors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_rating_block_id_rating_block_id_fk" FOREIGN KEY ("rating_block_id") REFERENCES "public"."rating_block"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_reivew_rating_id_rating_id_fk" FOREIGN KEY ("reivew_rating_id") REFERENCES "public"."rating"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_journalist_id_users_id_fk" FOREIGN KEY ("journalist_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reviews_rels" ADD CONSTRAINT "reviews_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reviews_rels" ADD CONSTRAINT "reviews_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "reviews_rels" ADD CONSTRAINT "reviews_rels_actors_fk" FOREIGN KEY ("actors_id") REFERENCES "public"."actors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_hero_photo_id_media_id_fk" FOREIGN KEY ("hero_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_journalist_id_users_id_fk" FOREIGN KEY ("journalist_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "film_nights" ADD CONSTRAINT "film_nights_hero_photo_id_media_id_fk" FOREIGN KEY ("hero_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "film_nights" ADD CONSTRAINT "film_nights_ticket_photo_id_media_id_fk" FOREIGN KEY ("ticket_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "film_nights" ADD CONSTRAINT "film_nights_director_id_directors_id_fk" FOREIGN KEY ("director_id") REFERENCES "public"."directors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "film_nights" ADD CONSTRAINT "film_nights_rating_block_id_rating_block_id_fk" FOREIGN KEY ("rating_block_id") REFERENCES "public"."rating_block"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reservations" ADD CONSTRAINT "reservations_film_night_id_film_nights_id_fk" FOREIGN KEY ("film_night_id") REFERENCES "public"."film_nights"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_blocks_review_cards" ADD CONSTRAINT "home_blocks_review_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
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
  CREATE INDEX "reviews_hero_photo_idx" ON "reviews" USING btree ("hero_photo_id");
  CREATE INDEX "reviews_director_idx" ON "reviews" USING btree ("director_id");
  CREATE INDEX "reviews_rating_block_idx" ON "reviews" USING btree ("rating_block_id");
  CREATE INDEX "reviews_reivew_rating_idx" ON "reviews" USING btree ("reivew_rating_id");
  CREATE INDEX "reviews_journalist_idx" ON "reviews" USING btree ("journalist_id");
  CREATE INDEX "reviews_updated_at_idx" ON "reviews" USING btree ("updated_at");
  CREATE INDEX "reviews_created_at_idx" ON "reviews" USING btree ("created_at");
  CREATE INDEX "reviews_rels_order_idx" ON "reviews_rels" USING btree ("order");
  CREATE INDEX "reviews_rels_parent_idx" ON "reviews_rels" USING btree ("parent_id");
  CREATE INDEX "reviews_rels_path_idx" ON "reviews_rels" USING btree ("path");
  CREATE INDEX "reviews_rels_media_id_idx" ON "reviews_rels" USING btree ("media_id");
  CREATE INDEX "reviews_rels_actors_id_idx" ON "reviews_rels" USING btree ("actors_id");
  CREATE UNIQUE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");
  CREATE INDEX "articles_hero_photo_idx" ON "articles" USING btree ("hero_photo_id");
  CREATE INDEX "articles_journalist_idx" ON "articles" USING btree ("journalist_id");
  CREATE INDEX "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE INDEX "articles_rels_order_idx" ON "articles_rels" USING btree ("order");
  CREATE INDEX "articles_rels_parent_idx" ON "articles_rels" USING btree ("parent_id");
  CREATE INDEX "articles_rels_path_idx" ON "articles_rels" USING btree ("path");
  CREATE INDEX "articles_rels_media_id_idx" ON "articles_rels" USING btree ("media_id");
  CREATE UNIQUE INDEX "film_nights_slug_idx" ON "film_nights" USING btree ("slug");
  CREATE INDEX "film_nights_hero_photo_idx" ON "film_nights" USING btree ("hero_photo_id");
  CREATE INDEX "film_nights_ticket_photo_idx" ON "film_nights" USING btree ("ticket_photo_id");
  CREATE INDEX "film_nights_director_idx" ON "film_nights" USING btree ("director_id");
  CREATE INDEX "film_nights_rating_block_idx" ON "film_nights" USING btree ("rating_block_id");
  CREATE INDEX "film_nights_updated_at_idx" ON "film_nights" USING btree ("updated_at");
  CREATE INDEX "film_nights_created_at_idx" ON "film_nights" USING btree ("created_at");
  CREATE INDEX "reservations_film_night_idx" ON "reservations" USING btree ("film_night_id");
  CREATE INDEX "reservations_visitor_hash_idx" ON "reservations" USING btree ("visitor_hash");
  CREATE INDEX "reservations_updated_at_idx" ON "reservations" USING btree ("updated_at");
  CREATE INDEX "reservations_created_at_idx" ON "reservations" USING btree ("created_at");
  CREATE UNIQUE INDEX "email_filmNight_idx" ON "reservations" USING btree ("email","film_night_id");
  CREATE INDEX "home_blocks_review_cards_order_idx" ON "home_blocks_review_cards" USING btree ("_order");
  CREATE INDEX "home_blocks_review_cards_parent_id_idx" ON "home_blocks_review_cards" USING btree ("_parent_id");
  CREATE INDEX "home_blocks_review_cards_path_idx" ON "home_blocks_review_cards" USING btree ("_path");
  CREATE INDEX "home_rels_order_idx" ON "home_rels" USING btree ("order");
  CREATE INDEX "home_rels_parent_idx" ON "home_rels" USING btree ("parent_id");
  CREATE INDEX "home_rels_path_idx" ON "home_rels" USING btree ("path");
  CREATE INDEX "home_rels_reviews_id_idx" ON "home_rels" USING btree ("reviews_id");
  ALTER TABLE "users" ADD CONSTRAINT "users_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_directors_fk" FOREIGN KEY ("directors_id") REFERENCES "public"."directors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_actors_fk" FOREIGN KEY ("actors_id") REFERENCES "public"."actors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_rating_fk" FOREIGN KEY ("rating_id") REFERENCES "public"."rating"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_rating_block_fk" FOREIGN KEY ("rating_block_id") REFERENCES "public"."rating_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_film_nights_fk" FOREIGN KEY ("film_nights_id") REFERENCES "public"."film_nights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reservations_fk" FOREIGN KEY ("reservations_id") REFERENCES "public"."reservations"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_avatar_idx" ON "users" USING btree ("avatar_id");
  CREATE INDEX "payload_locked_documents_rels_directors_id_idx" ON "payload_locked_documents_rels" USING btree ("directors_id");
  CREATE INDEX "payload_locked_documents_rels_actors_id_idx" ON "payload_locked_documents_rels" USING btree ("actors_id");
  CREATE INDEX "payload_locked_documents_rels_rating_id_idx" ON "payload_locked_documents_rels" USING btree ("rating_id");
  CREATE INDEX "payload_locked_documents_rels_rating_block_id_idx" ON "payload_locked_documents_rels" USING btree ("rating_block_id");
  CREATE INDEX "payload_locked_documents_rels_reviews_id_idx" ON "payload_locked_documents_rels" USING btree ("reviews_id");
  CREATE INDEX "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX "payload_locked_documents_rels_film_nights_id_idx" ON "payload_locked_documents_rels" USING btree ("film_nights_id");
  CREATE INDEX "payload_locked_documents_rels_reservations_id_idx" ON "payload_locked_documents_rels" USING btree ("reservations_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "directors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "actors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rating" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rating_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reviews" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reviews_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "articles_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "film_nights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "reservations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_blocks_review_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "directors" CASCADE;
  DROP TABLE "actors" CASCADE;
  DROP TABLE "rating" CASCADE;
  DROP TABLE "rating_block" CASCADE;
  DROP TABLE "reviews" CASCADE;
  DROP TABLE "reviews_rels" CASCADE;
  DROP TABLE "articles" CASCADE;
  DROP TABLE "articles_rels" CASCADE;
  DROP TABLE "film_nights" CASCADE;
  DROP TABLE "reservations" CASCADE;
  DROP TABLE "home_blocks_review_cards" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "home_rels" CASCADE;
  ALTER TABLE "users" DROP CONSTRAINT "users_avatar_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_directors_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_actors_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_rating_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_rating_block_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_reviews_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_articles_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_film_nights_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_reservations_fk";
  
  DROP INDEX "users_avatar_idx";
  DROP INDEX "payload_locked_documents_rels_directors_id_idx";
  DROP INDEX "payload_locked_documents_rels_actors_id_idx";
  DROP INDEX "payload_locked_documents_rels_rating_id_idx";
  DROP INDEX "payload_locked_documents_rels_rating_block_id_idx";
  DROP INDEX "payload_locked_documents_rels_reviews_id_idx";
  DROP INDEX "payload_locked_documents_rels_articles_id_idx";
  DROP INDEX "payload_locked_documents_rels_film_nights_id_idx";
  DROP INDEX "payload_locked_documents_rels_reservations_id_idx";
  ALTER TABLE "users" DROP COLUMN "name";
  ALTER TABLE "users" DROP COLUMN "avatar_id";
  ALTER TABLE "users" DROP COLUMN "role";
  ALTER TABLE "media" DROP COLUMN "prefix";
  ALTER TABLE "media" DROP COLUMN "_objectkey";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "directors_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "actors_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "rating_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "rating_block_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "reviews_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "articles_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "film_nights_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "reservations_id";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_rating_title";`)
}
