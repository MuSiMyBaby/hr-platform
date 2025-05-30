/*
  Warnings:

  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerificationCode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `englishName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `facebookLogin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `googleLogin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `identityNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lineLogin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nickname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passport` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profilePicture` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `smsVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verificationCode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verificationExpiresAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `workPermit` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_identityNumber_key";

-- DropIndex
DROP INDEX "User_passport_key";

-- DropIndex
DROP INDEX "User_phoneNumber_key";

-- DropIndex
DROP INDEX "User_workPermit_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "address",
DROP COLUMN "emailVerificationCode",
DROP COLUMN "emailVerified",
DROP COLUMN "englishName",
DROP COLUMN "facebookLogin",
DROP COLUMN "firstName",
DROP COLUMN "googleLogin",
DROP COLUMN "identityNumber",
DROP COLUMN "lastName",
DROP COLUMN "lineLogin",
DROP COLUMN "nickname",
DROP COLUMN "passport",
DROP COLUMN "phoneNumber",
DROP COLUMN "profilePicture",
DROP COLUMN "smsVerified",
DROP COLUMN "verificationCode",
DROP COLUMN "verificationExpiresAt",
DROP COLUMN "workPermit",
ADD COLUMN     "adminRoleId" INTEGER,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "deletionReason" TEXT,
ADD COLUMN     "isAnonymized" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "roleId" INTEGER,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;

-- CreateTable
CREATE TABLE "UserResume" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "identityNumber" TEXT,
    "workPermit" TEXT,
    "passport" TEXT,
    "email" TEXT,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "phoneNumber" TEXT,
    "phoneVerified" BOOLEAN NOT NULL DEFAULT false,
    "profilePicture" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "englishName" TEXT,
    "nickname" TEXT,
    "mailCountry" TEXT,
    "mailCity" TEXT,
    "mailDistrict" TEXT,
    "mailAddress" TEXT,
    "residentialCountry" TEXT,
    "residentialCity" TEXT,
    "residentialDistrict" TEXT,
    "residentialAddress" TEXT,
    "isRegistered" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserResume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" SERIAL NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "level" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" SERIAL NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "school" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" SERIAL NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "company" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" SERIAL NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "expiry" TIMESTAMP(3),

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trait" (
    "id" SERIAL NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "personality" TEXT NOT NULL,
    "interest" TEXT,

    CONSTRAINT "Trait_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commute" (
    "id" SERIAL NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "method" TEXT NOT NULL,

    CONSTRAINT "Commute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkingTime" (
    "id" SERIAL NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "shift" TEXT NOT NULL,
    "preference" TEXT NOT NULL,
    "expectedStart" TIMESTAMP(3),
    "expectedEnd" TIMESTAMP(3),

    CONSTRAINT "WorkingTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkIdentity" (
    "id" SERIAL NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "identity" TEXT NOT NULL,

    CONSTRAINT "WorkIdentity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobType" (
    "id" SERIAL NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "JobType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmergencyContact" (
    "id" SERIAL NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "relation" TEXT NOT NULL,

    CONSTRAINT "EmergencyContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Biography" (
    "id" SERIAL NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Biography_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Portfolio" (
    "id" SERIAL NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfilePhoto" (
    "id" SERIAL NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "type" TEXT,

    CONSTRAINT "ProfilePhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IpRecord" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "location" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IpRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeviceRecord" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "deviceInfo" TEXT NOT NULL,
    "platform" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeviceRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminRole" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "AdminRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeVersion" (
    "id" SERIAL NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "snapshot" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" TEXT,
    "note" TEXT,
    "isCurrent" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ResumeVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeVisibility" (
    "id" SERIAL NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "allowedAudience" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),

    CONSTRAINT "ResumeVisibility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeReviewStatus" (
    "id" SERIAL NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "viewerId" INTEGER NOT NULL,
    "viewerType" TEXT NOT NULL,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResumeReviewStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeViewLog" (
    "id" SERIAL NOT NULL,
    "adminId" INTEGER NOT NULL,
    "userViewedById" INTEGER NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResumeViewLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumePDF" (
    "id" SERIAL NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "template" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResumePDF_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserResume_userId_key" ON "UserResume"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserResume_identityNumber_key" ON "UserResume"("identityNumber");

-- CreateIndex
CREATE UNIQUE INDEX "UserResume_workPermit_key" ON "UserResume"("workPermit");

-- CreateIndex
CREATE UNIQUE INDEX "UserResume_passport_key" ON "UserResume"("passport");

-- CreateIndex
CREATE UNIQUE INDEX "UserResume_email_key" ON "UserResume"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserResume_phoneNumber_key" ON "UserResume"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Biography_resumeId_key" ON "Biography"("resumeId");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AdminRole_name_key" ON "AdminRole"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ResumeVisibility_resumeId_key" ON "ResumeVisibility"("resumeId");

-- CreateIndex
CREATE UNIQUE INDEX "ResumeReviewStatus_resumeId_viewerId_viewerType_key" ON "ResumeReviewStatus"("resumeId", "viewerId", "viewerType");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_adminRoleId_fkey" FOREIGN KEY ("adminRoleId") REFERENCES "AdminRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserResume" ADD CONSTRAINT "UserResume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Language" ADD CONSTRAINT "Language_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "UserResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "UserResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "UserResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "UserResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "UserResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trait" ADD CONSTRAINT "Trait_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "UserResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commute" ADD CONSTRAINT "Commute_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "UserResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkingTime" ADD CONSTRAINT "WorkingTime_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "UserResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkIdentity" ADD CONSTRAINT "WorkIdentity_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "UserResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobType" ADD CONSTRAINT "JobType_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "UserResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyContact" ADD CONSTRAINT "EmergencyContact_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "UserResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Biography" ADD CONSTRAINT "Biography_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "UserResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "UserResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfilePhoto" ADD CONSTRAINT "ProfilePhoto_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "UserResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IpRecord" ADD CONSTRAINT "IpRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceRecord" ADD CONSTRAINT "DeviceRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeVersion" ADD CONSTRAINT "ResumeVersion_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "UserResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeVisibility" ADD CONSTRAINT "ResumeVisibility_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "UserResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeReviewStatus" ADD CONSTRAINT "ResumeReviewStatus_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "UserResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeViewLog" ADD CONSTRAINT "ResumeViewLog_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeViewLog" ADD CONSTRAINT "ResumeViewLog_userViewedById_fkey" FOREIGN KEY ("userViewedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeViewLog" ADD CONSTRAINT "ResumeViewLog_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "UserResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumePDF" ADD CONSTRAINT "ResumePDF_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "UserResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
