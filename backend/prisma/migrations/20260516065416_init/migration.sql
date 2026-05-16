-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "role" TEXT,
    "brandName" TEXT,
    "location" TEXT NOT NULL,
    "languages" TEXT[],
    "skills" TEXT[],
    "experience" TEXT,
    "jobType" TEXT,
    "workType" TEXT,
    "workDistance" TEXT,
    "accountNumber" TEXT,
    "bankName" TEXT,
    "accountName" TEXT,
    "trustScore" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
