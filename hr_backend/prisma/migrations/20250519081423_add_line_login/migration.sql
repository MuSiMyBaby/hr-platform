-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "identityNumber" TEXT,
    "workPermit" TEXT,
    "passport" TEXT,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "profilePicture" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "englishName" TEXT,
    "nickname" TEXT,
    "address" TEXT,
    "skipRegistration" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    "verificationCode" TEXT,
    "googleLogin" BOOLEAN,
    "facebookLogin" BOOLEAN,
    "lineId" TEXT,
    "lastLogin" TIMESTAMP(3),
    "lastLoginIp" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_identityNumber_key" ON "User"("identityNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_workPermit_key" ON "User"("workPermit");

-- CreateIndex
CREATE UNIQUE INDEX "User_passport_key" ON "User"("passport");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_lineId_key" ON "User"("lineId");
