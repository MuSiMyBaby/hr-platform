/*
  Warnings:

  - Changed the type of `method` on the `Commute` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `Education` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `relation` on the `EmergencyContact` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `JobType` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `level` on the `Language` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `identity` on the `WorkIdentity` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `shift` on the `WorkingTime` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "LanguageLevel" AS ENUM ('BASIC', 'INTERMEDIATE', 'UPPER_INTERMEDIATE', 'ADVANCED', 'OTHER');

-- CreateEnum
CREATE TYPE "EducationStatus" AS ENUM ('ENROLLED', 'SUSPENDED', 'GRADUATED', 'DROPPED_OUT', 'OTHER');

-- CreateEnum
CREATE TYPE "ShiftType" AS ENUM ('DAY', 'SWING', 'EVENING', 'NIGHT', 'OTHER');

-- CreateEnum
CREATE TYPE "WorkIdentityType" AS ENUM ('FRESH_GRADUATE', 'EXPAT', 'FREELANCER', 'HOUSE_PARENT', 'YOUTH', 'RETIREE', 'WORKING_WOMAN', 'STUDENT', 'SOCIAL_EXPLORER', 'GAP_YEAR', 'OTHER');

-- CreateEnum
CREATE TYPE "JobTypeEnum" AS ENUM ('FULL_TIME', 'PART_TIME', 'INTERNSHIP', 'FREELANCE', 'OTHER');

-- CreateEnum
CREATE TYPE "ContactRelation" AS ENUM ('FATHER', 'MOTHER', 'CHILD', 'OTHER');

-- CreateEnum
CREATE TYPE "CommuteMethod" AS ENUM ('CAR', 'MOTORCYCLE', 'WALK', 'OTHER');

-- AlterTable
ALTER TABLE "Commute" ADD COLUMN     "methodOther" TEXT,
DROP COLUMN "method",
ADD COLUMN     "method" "CommuteMethod" NOT NULL;

-- AlterTable
ALTER TABLE "Education" ADD COLUMN     "statusOther" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "EducationStatus" NOT NULL;

-- AlterTable
ALTER TABLE "EmergencyContact" ADD COLUMN     "relationOther" TEXT,
DROP COLUMN "relation",
ADD COLUMN     "relation" "ContactRelation" NOT NULL;

-- AlterTable
ALTER TABLE "JobType" ADD COLUMN     "typeOther" TEXT,
DROP COLUMN "type",
ADD COLUMN     "type" "JobTypeEnum" NOT NULL;

-- AlterTable
ALTER TABLE "Language" ADD COLUMN     "levelOther" TEXT,
DROP COLUMN "level",
ADD COLUMN     "level" "LanguageLevel" NOT NULL;

-- AlterTable
ALTER TABLE "WorkIdentity" ADD COLUMN     "identityOther" TEXT,
DROP COLUMN "identity",
ADD COLUMN     "identity" "WorkIdentityType" NOT NULL;

-- AlterTable
ALTER TABLE "WorkingTime" ADD COLUMN     "shiftOther" TEXT,
DROP COLUMN "shift",
ADD COLUMN     "shift" "ShiftType" NOT NULL;
