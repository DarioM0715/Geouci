-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL,
    "its_official" BOOLEAN NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);
