-- CreateEnum
CREATE TYPE "Role" AS ENUM ('usuario', 'gestor');

-- CreateEnum
CREATE TYPE "LocationRequestStatus" AS ENUM ('pendiente', 'aceptada', 'cancelada');

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_role_id_fkey";

-- AlterTable
ALTER TABLE "locations_request" DROP COLUMN "status",
ADD COLUMN     "status" "LocationRequestStatus" NOT NULL DEFAULT 'pendiente';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role_id",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'usuario';

-- DropTable
DROP TABLE "roles";