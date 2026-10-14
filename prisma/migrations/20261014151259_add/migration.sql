-- CreateTable
CREATE TABLE "Map" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lat_min" DOUBLE PRECISION NOT NULL,
    "lat_max" DOUBLE PRECISION NOT NULL,
    "lon_min" DOUBLE PRECISION NOT NULL,
    "lon_max" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Map_pkey" PRIMARY KEY ("id")
);
