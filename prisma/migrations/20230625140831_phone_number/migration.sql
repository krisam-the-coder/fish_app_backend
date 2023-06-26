/*
  Warnings:

  - Added the required column `phoneNumber` to the `BuyerRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requestWeight` to the `BuyerRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `FarmerRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplyWeight` to the `FarmerRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BuyerRequest" ADD COLUMN     "phoneNumber" INTEGER NOT NULL,
ADD COLUMN     "requestWeight" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FarmerRequest" ADD COLUMN     "phoneNumber" INTEGER NOT NULL,
ADD COLUMN     "supplyWeight" TEXT NOT NULL;
