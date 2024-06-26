/*
  Warnings:

  - You are about to drop the column `email_validateda` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "email_validateda",
ADD COLUMN     "email_validated" BOOLEAN NOT NULL DEFAULT false;
