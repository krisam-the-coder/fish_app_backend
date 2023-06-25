/*
  Warnings:

  - You are about to drop the column `profiilePicture` on the `Buyer` table. All the data in the column will be lost.
  - Added the required column `profilePicture` to the `Buyer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Buyer" DROP COLUMN "profiilePicture",
ADD COLUMN     "profilePicture" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "FarmerSupply" (
    "id" TEXT NOT NULL,
    "farmerId" TEXT NOT NULL,
    "fishType" TEXT NOT NULL,
    "avgFishWeight" INTEGER NOT NULL,
    "totalWeight" INTEGER NOT NULL,
    "yieldDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FarmerSupply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuyerDemand" (
    "id" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "fishType" TEXT NOT NULL,
    "avgFishWeight" INTEGER NOT NULL,
    "totalWeight" INTEGER NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "yieldDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BuyerDemand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuyerRequest" (
    "id" TEXT NOT NULL,
    "farmerSupplyId" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL,

    CONSTRAINT "BuyerRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FarmerRequest" (
    "id" TEXT NOT NULL,
    "buyerDemandId" TEXT NOT NULL,
    "farmerId" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL,

    CONSTRAINT "FarmerRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FarmerSupply_farmerId_key" ON "FarmerSupply"("farmerId");

-- CreateIndex
CREATE UNIQUE INDEX "BuyerDemand_buyerId_key" ON "BuyerDemand"("buyerId");

-- CreateIndex
CREATE UNIQUE INDEX "BuyerRequest_farmerSupplyId_key" ON "BuyerRequest"("farmerSupplyId");

-- CreateIndex
CREATE UNIQUE INDEX "BuyerRequest_buyerId_key" ON "BuyerRequest"("buyerId");

-- CreateIndex
CREATE UNIQUE INDEX "FarmerRequest_buyerDemandId_key" ON "FarmerRequest"("buyerDemandId");

-- CreateIndex
CREATE UNIQUE INDEX "FarmerRequest_farmerId_key" ON "FarmerRequest"("farmerId");

-- AddForeignKey
ALTER TABLE "FarmerSupply" ADD CONSTRAINT "FarmerSupply_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuyerDemand" ADD CONSTRAINT "BuyerDemand_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Buyer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuyerRequest" ADD CONSTRAINT "BuyerRequest_farmerSupplyId_fkey" FOREIGN KEY ("farmerSupplyId") REFERENCES "FarmerSupply"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuyerRequest" ADD CONSTRAINT "BuyerRequest_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "Buyer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmerRequest" ADD CONSTRAINT "FarmerRequest_buyerDemandId_fkey" FOREIGN KEY ("buyerDemandId") REFERENCES "BuyerDemand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FarmerRequest" ADD CONSTRAINT "FarmerRequest_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
