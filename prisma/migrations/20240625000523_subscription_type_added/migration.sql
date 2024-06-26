-- CreateEnum
CREATE TYPE "Subscription_type" AS ENUM ('GRATIS', 'BASICO', 'AVANZADO', 'EMPRESARIAL');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "subscription" "Subscription_type" NOT NULL DEFAULT 'GRATIS';
