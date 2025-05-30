-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerificationCode" TEXT,
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "smsVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verificationExpiresAt" TIMESTAMP(3);
