-- AlterTable
ALTER TABLE "User" ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "profilePicture" TEXT;
