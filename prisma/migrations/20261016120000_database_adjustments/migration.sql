-- Users: drop leftover columns, add new ones (all nullable or with default)
ALTER TABLE "users" DROP COLUMN "password_hash";
ALTER TABLE "users" DROP COLUMN "status";
ALTER TABLE "users" ADD COLUMN "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "users" ADD COLUMN "ist_resident" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "users" ADD COLUMN "reason_suspension" TEXT;
ALTER TABLE "users" ADD COLUMN "suspended" BOOLEAN NOT NULL DEFAULT false;

-- Default map to satisfy the new required map_id foreign keys
INSERT INTO "Map" ("name", "lat_min", "lat_max", "lon_min", "lon_max") VALUES ('Mapa por defecto', 0, 0, 0, 0);

-- Events: keep organizer from the old user_id, drop location/status, backfill map_id/outstanding
ALTER TABLE "events" RENAME COLUMN "user_id" TO "organizer_id";
ALTER TABLE "events" DROP CONSTRAINT "events_user_id_fkey";
ALTER TABLE "events" DROP CONSTRAINT "events_location_id_fkey";
ALTER TABLE "events" DROP COLUMN "location_id";
ALTER TABLE "events" DROP COLUMN "status";
ALTER TABLE "events" ADD COLUMN "map_id" INTEGER;
UPDATE "events" SET "map_id" = (SELECT "id" FROM "Map" ORDER BY "id" LIMIT 1);
ALTER TABLE "events" ALTER COLUMN "map_id" SET NOT NULL;
ALTER TABLE "events" ADD COLUMN "outstanding" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "events" ALTER COLUMN "outstanding" DROP DEFAULT;
ALTER TABLE "events" ADD CONSTRAINT "events_organizer_id_fkey" FOREIGN KEY ("organizer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "events" ADD CONSTRAINT "events_map_id_fkey" FOREIGN KEY ("map_id") REFERENCES "Map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Locations: drop user_id, backfill map_id/its_official and description NULLs
ALTER TABLE "locations" DROP CONSTRAINT "locations_user_id_fkey";
ALTER TABLE "locations" DROP COLUMN "user_id";
ALTER TABLE "locations" ADD COLUMN "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "locations" ADD COLUMN "its_official" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "locations" ALTER COLUMN "its_official" DROP DEFAULT;
ALTER TABLE "locations" ADD COLUMN "map_id" INTEGER;
UPDATE "locations" SET "map_id" = (SELECT "id" FROM "Map" ORDER BY "id" LIMIT 1);
ALTER TABLE "locations" ALTER COLUMN "map_id" SET NOT NULL;
UPDATE "locations" SET "description" = '' WHERE "description" IS NULL;
ALTER TABLE "locations" ALTER COLUMN "description" SET NOT NULL;
ALTER TABLE "locations" ADD CONSTRAINT "locations_map_id_fkey" FOREIGN KEY ("map_id") REFERENCES "Map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Location requests: keep applicant from the old user_id, backfill reason/done_at
ALTER TABLE "locations_request" RENAME COLUMN "user_id" TO "applicant_id";
ALTER TABLE "locations_request" DROP CONSTRAINT "locations_request_user_id_fkey";
ALTER TABLE "locations_request" ADD COLUMN "reason" TEXT;
UPDATE "locations_request" SET "reason" = '' WHERE "reason" IS NULL;
ALTER TABLE "locations_request" ALTER COLUMN "reason" SET NOT NULL;
ALTER TABLE "locations_request" ADD COLUMN "done_at" TIMESTAMP(3);
UPDATE "locations_request" SET "done_at" = COALESCE("request_date", now()) WHERE "done_at" IS NULL;
ALTER TABLE "locations_request" ALTER COLUMN "done_at" SET NOT NULL;
ALTER TABLE "locations_request" ADD COLUMN "location_id" INTEGER;
ALTER TABLE "locations_request" ADD COLUMN "manager_id" INTEGER;
ALTER TABLE "locations_request" ADD CONSTRAINT "locations_request_applicant_id_fkey" FOREIGN KEY ("applicant_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "locations_request" ADD CONSTRAINT "locations_request_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "locations_request" ADD CONSTRAINT "locations_request_manager_id_fkey" FOREIGN KEY ("manager_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Comments: keep text from the old content column, add edited_at
ALTER TABLE "comments" RENAME COLUMN "content" TO "text";
ALTER TABLE "comments" ADD COLUMN "edited_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Reactions: add validated flag
ALTER TABLE "reactions" ADD COLUMN "validated" BOOLEAN NOT NULL DEFAULT false;
