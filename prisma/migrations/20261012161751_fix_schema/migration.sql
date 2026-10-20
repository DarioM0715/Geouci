/*
  Warnings:

  - The primary key for the `locations_request` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `int` on the `locations_request` table. All the data in the column will be lost.
  - You are about to drop the column `reques_date` on the `locations_request` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "locations_request" DROP CONSTRAINT "locations_request_pkey",
DROP COLUMN "int",
DROP COLUMN "reques_date",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "request_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "locations_request_pkey" PRIMARY KEY ("id");
