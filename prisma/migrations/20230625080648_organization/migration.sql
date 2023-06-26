/*
  Warnings:

  - Made the column `organizationName` on table `Buyer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Buyer" ALTER COLUMN "organizationName" SET NOT NULL;
