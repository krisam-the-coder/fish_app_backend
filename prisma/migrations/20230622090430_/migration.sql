/*
  Warnings:

  - You are about to drop the column `buyerId` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `farmerId` on the `location` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[locationId]` on the table `buyer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[locationId]` on the table `farmer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `locationId` to the `buyer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `farmer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "location" DROP CONSTRAINT "location_buyerId_fkey";

-- DropForeignKey
ALTER TABLE "location" DROP CONSTRAINT "location_farmerId_fkey";

-- DropIndex
DROP INDEX "location_buyerId_key";

-- DropIndex
DROP INDEX "location_farmerId_key";

-- AlterTable
ALTER TABLE "buyer" ADD COLUMN     "locationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "farmer" ADD COLUMN     "locationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "location" DROP COLUMN "buyerId",
DROP COLUMN "farmerId";

-- CreateIndex
CREATE UNIQUE INDEX "buyer_locationId_key" ON "buyer"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "farmer_locationId_key" ON "farmer"("locationId");

-- AddForeignKey
ALTER TABLE "farmer" ADD CONSTRAINT "farmer_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buyer" ADD CONSTRAINT "buyer_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
