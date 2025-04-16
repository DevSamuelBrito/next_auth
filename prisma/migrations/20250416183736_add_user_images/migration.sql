/*
  Warnings:

  - You are about to drop the column `images` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "images";

-- CreateTable
CREATE TABLE "UserImage" (
    "id" TEXT NOT NULL,
    "secureUrl" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserImage" ADD CONSTRAINT "UserImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
