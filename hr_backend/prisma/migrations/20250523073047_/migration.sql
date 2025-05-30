/*
  Warnings:

  - The values [INTERMEDIATE] on the enum `LanguageLevel` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `fileUrl` on the `Portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `adminRoleId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `AdminRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[resumeId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,isPrimary]` on the table `UserResume` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `externalUrl` to the `Portfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `UserResume` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'NEEDS_REVISION', 'OTHER');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PLATFORM_ADMIN', 'COMPANY_ADMIN', 'HR', 'REVIEWER', 'MEMBER', 'JOB_SEEKER');

-- CreateEnum
CREATE TYPE "CompanyType" AS ENUM ('AGENCY', 'CLIENT', 'FREELANCER', 'HEADHUNTER', 'PLATFORM', 'OTHER');

-- AlterEnum
BEGIN;
CREATE TYPE "LanguageLevel_new" AS ENUM ('BASIC', 'INTERMEDIATECompany', 'UPPER_INTERMEDIATE', 'ADVANCED', 'OTHER');
ALTER TABLE "Language" ALTER COLUMN "level" TYPE "LanguageLevel_new" USING ("level"::text::"LanguageLevel_new");
ALTER TYPE "LanguageLevel" RENAME TO "LanguageLevel_old";
ALTER TYPE "LanguageLevel_new" RENAME TO "LanguageLevel";
DROP TYPE "LanguageLevel_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_adminRoleId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleId_fkey";

-- DropIndex
DROP INDEX "UserResume_userId_key";

-- AlterTable
ALTER TABLE "Portfolio" DROP COLUMN "fileUrl",
ADD COLUMN     "externalUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "adminRoleId",
DROP COLUMN "password",
DROP COLUMN "roleId",
ADD COLUMN     "companyId" INTEGER,
ADD COLUMN     "resumeId" INTEGER,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'MEMBER';

-- AlterTable
ALTER TABLE "UserResume" ADD COLUMN     "companyId" INTEGER NOT NULL,
ADD COLUMN     "isPrimary" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "title" TEXT;

-- DropTable
DROP TABLE "AdminRole";

-- DropTable
DROP TABLE "Role";

-- CreateTable
CREATE TABLE "ResumeAccessGrant" (
    "id" SERIAL NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "grantedToId" INTEGER NOT NULL,
    "grantedById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResumeAccessGrant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "CompanyType" NOT NULL DEFAULT 'CLIENT',
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttendanceLog" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "clockIn" TIMESTAMP(3) NOT NULL,
    "clockOut" TIMESTAMP(3),
    "note" TEXT,
    "scheduleId" INTEGER,

    CONSTRAINT "AttendanceLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShiftSchedule" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "shiftDate" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "note" TEXT,

    CONSTRAINT "ShiftSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaySlip" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "issuedById" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "month" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "note" TEXT,
    "fileUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaySlip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobPosting" (
    "id" SERIAL NOT NULL,
    "companyId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT,
    "jobType" "JobTypeEnum" NOT NULL,
    "salaryRange" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiredAt" TIMESTAMP(3),

    CONSTRAINT "JobPosting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobApplication" (
    "id" SERIAL NOT NULL,
    "jobId" INTEGER NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessageThread" (
    "id" SERIAL NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "createdById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MessageThread_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessageLog" (
    "id" SERIAL NOT NULL,
    "threadId" INTEGER NOT NULL,
    "senderId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MessageLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserReviewLog" (
    "id" SERIAL NOT NULL,
    "targetUserId" INTEGER NOT NULL,
    "reviewerId" INTEGER NOT NULL,
    "score" INTEGER,
    "reviewType" TEXT,
    "isBlacklisted" BOOLEAN NOT NULL DEFAULT false,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserReviewLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeReviewLog" (
    "id" SERIAL NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "reviewerId" INTEGER NOT NULL,
    "score" INTEGER,
    "status" "ReviewStatus" NOT NULL DEFAULT 'PENDING',
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResumeReviewLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserReviewTag" (
    "id" SERIAL NOT NULL,
    "tagId" INTEGER NOT NULL,
    "reviewId" INTEGER NOT NULL,

    CONSTRAINT "UserReviewTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeReviewTag" (
    "id" SERIAL NOT NULL,
    "tagId" INTEGER NOT NULL,
    "reviewId" INTEGER NOT NULL,

    CONSTRAINT "ResumeReviewTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewTagOption" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "type" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ReviewTagOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountHistoryLog" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "operatorId" INTEGER,
    "action" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AccountHistoryLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResumeAccessGrant_resumeId_grantedToId_key" ON "ResumeAccessGrant"("resumeId", "grantedToId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE INDEX "JobPosting_companyId_idx" ON "JobPosting"("companyId");

-- CreateIndex
CREATE INDEX "UserReviewLog_targetUserId_reviewerId_idx" ON "UserReviewLog"("targetUserId", "reviewerId");

-- CreateIndex
CREATE INDEX "ResumeReviewLog_resumeId_reviewerId_idx" ON "ResumeReviewLog"("resumeId", "reviewerId");

-- CreateIndex
CREATE UNIQUE INDEX "ReviewTagOption_label_key" ON "ReviewTagOption"("label");

-- CreateIndex
CREATE UNIQUE INDEX "User_resumeId_key" ON "User"("resumeId");

-- CreateIndex
CREATE INDEX "UserResume_userId_idx" ON "UserResume"("userId");

-- CreateIndex
CREATE INDEX "UserResume_companyId_idx" ON "UserResume"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "UserResume_userId_isPrimary_key" ON "UserResume"("userId", "isPrimary");

-- AddForeignKey
ALTER TABLE "ResumeAccessGrant" ADD CONSTRAINT "ResumeAccessGrant_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "UserResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeAccessGrant" ADD CONSTRAINT "ResumeAccessGrant_grantedToId_fkey" FOREIGN KEY ("grantedToId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeAccessGrant" ADD CONSTRAINT "ResumeAccessGrant_grantedById_fkey" FOREIGN KEY ("grantedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceLog" ADD CONSTRAINT "AttendanceLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceLog" ADD CONSTRAINT "AttendanceLog_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceLog" ADD CONSTRAINT "AttendanceLog_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "ShiftSchedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShiftSchedule" ADD CONSTRAINT "ShiftSchedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShiftSchedule" ADD CONSTRAINT "ShiftSchedule_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaySlip" ADD CONSTRAINT "PaySlip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaySlip" ADD CONSTRAINT "PaySlip_issuedById_fkey" FOREIGN KEY ("issuedById") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobPosting" ADD CONSTRAINT "JobPosting_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "JobPosting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "UserResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageThread" ADD CONSTRAINT "MessageThread_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "UserResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageThread" ADD CONSTRAINT "MessageThread_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageLog" ADD CONSTRAINT "MessageLog_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "MessageThread"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageLog" ADD CONSTRAINT "MessageLog_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserResume" ADD CONSTRAINT "UserResume_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserReviewLog" ADD CONSTRAINT "UserReviewLog_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserReviewLog" ADD CONSTRAINT "UserReviewLog_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeReviewLog" ADD CONSTRAINT "ResumeReviewLog_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "UserResume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeReviewLog" ADD CONSTRAINT "ResumeReviewLog_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserReviewTag" ADD CONSTRAINT "UserReviewTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "ReviewTagOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserReviewTag" ADD CONSTRAINT "UserReviewTag_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "UserReviewLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeReviewTag" ADD CONSTRAINT "ResumeReviewTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "ReviewTagOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeReviewTag" ADD CONSTRAINT "ResumeReviewTag_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "ResumeReviewLog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "UserResume"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountHistoryLog" ADD CONSTRAINT "AccountHistoryLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountHistoryLog" ADD CONSTRAINT "AccountHistoryLog_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
