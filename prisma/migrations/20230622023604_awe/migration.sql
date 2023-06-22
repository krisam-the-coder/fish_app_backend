-- CreateTable
CREATE TABLE "admin" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "farmer" (
    "id" TEXT NOT NULL,
    "profiilePicture" TEXT NOT NULL,
    "farmName" TEXT NOT NULL,
    "pondSize" INTEGER NOT NULL,
    "fiscalYear" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL,
    "approved" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    "buyerRequestId" TEXT,

    CONSTRAINT "farmer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location" (
    "id" TEXT NOT NULL,
    "pradesh" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "nagarpalika" TEXT,
    "mahaNagarpalika" TEXT,
    "upaMahaNagarpalika" TEXT,
    "gaupalika" TEXT,
    "Woda" INTEGER NOT NULL,
    "farmerId" TEXT,
    "buyerId" TEXT,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "buyer" (
    "id" TEXT NOT NULL,
    "organizationName" TEXT,
    "profiilePicture" TEXT NOT NULL,
    "fiscalYear" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL,
    "approved" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "buyer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentForFarmer" (
    "id" TEXT NOT NULL,
    "idenfication" TEXT[],
    "registration" TEXT[],
    "farmerId" TEXT NOT NULL,

    CONSTRAINT "documentForFarmer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "helpAndSupportFarmerIssues" (
    "id" TEXT NOT NULL,
    "issue" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "farmerId" TEXT,

    CONSTRAINT "helpAndSupportFarmerIssues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "helpAndSupportBuyerIssues" (
    "id" TEXT NOT NULL,
    "issue" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "buyerId" TEXT,

    CONSTRAINT "helpAndSupportBuyerIssues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "farmerSupply" (
    "id" TEXT NOT NULL,
    "fishType" TEXT NOT NULL,
    "avgWeight" INTEGER NOT NULL,
    "requiredDate" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "totalWeight" INTEGER NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "farmerId" TEXT NOT NULL,

    CONSTRAINT "farmerSupply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "buyerRequest" (
    "id" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "fishType" TEXT NOT NULL,
    "avgWeight" INTEGER NOT NULL,
    "requiredDate" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "totalWeight" INTEGER NOT NULL,
    "buyerId" TEXT NOT NULL,

    CONSTRAINT "buyerRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "buyerForm" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "contact" TEXT NOT NULL,
    "farmerSupplyId" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,

    CONSTRAINT "buyerForm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "farmer_userId_key" ON "farmer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "farmer_buyerRequestId_key" ON "farmer"("buyerRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "location_farmerId_key" ON "location"("farmerId");

-- CreateIndex
CREATE UNIQUE INDEX "location_buyerId_key" ON "location"("buyerId");

-- CreateIndex
CREATE UNIQUE INDEX "buyer_userId_key" ON "buyer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "documentForFarmer_farmerId_key" ON "documentForFarmer"("farmerId");

-- CreateIndex
CREATE UNIQUE INDEX "helpAndSupportFarmerIssues_farmerId_key" ON "helpAndSupportFarmerIssues"("farmerId");

-- CreateIndex
CREATE UNIQUE INDEX "helpAndSupportBuyerIssues_buyerId_key" ON "helpAndSupportBuyerIssues"("buyerId");

-- CreateIndex
CREATE UNIQUE INDEX "farmerSupply_farmerId_key" ON "farmerSupply"("farmerId");

-- CreateIndex
CREATE UNIQUE INDEX "buyerRequest_buyerId_key" ON "buyerRequest"("buyerId");

-- CreateIndex
CREATE UNIQUE INDEX "buyerForm_farmerSupplyId_key" ON "buyerForm"("farmerSupplyId");

-- CreateIndex
CREATE UNIQUE INDEX "buyerForm_buyerId_key" ON "buyerForm"("buyerId");

-- AddForeignKey
ALTER TABLE "farmer" ADD CONSTRAINT "farmer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "farmer" ADD CONSTRAINT "farmer_buyerRequestId_fkey" FOREIGN KEY ("buyerRequestId") REFERENCES "buyerRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "farmer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "buyer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buyer" ADD CONSTRAINT "buyer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documentForFarmer" ADD CONSTRAINT "documentForFarmer_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "farmer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "helpAndSupportFarmerIssues" ADD CONSTRAINT "helpAndSupportFarmerIssues_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "farmer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "helpAndSupportBuyerIssues" ADD CONSTRAINT "helpAndSupportBuyerIssues_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "buyer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "farmerSupply" ADD CONSTRAINT "farmerSupply_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "farmer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buyerRequest" ADD CONSTRAINT "buyerRequest_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "buyer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buyerForm" ADD CONSTRAINT "buyerForm_farmerSupplyId_fkey" FOREIGN KEY ("farmerSupplyId") REFERENCES "farmerSupply"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buyerForm" ADD CONSTRAINT "buyerForm_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "buyer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
