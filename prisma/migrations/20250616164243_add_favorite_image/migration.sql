/*
  Warnings:

  - You are about to drop the column `userId` on the `FavoriteImage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userEmail,imageId]` on the table `FavoriteImage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userEmail` to the `FavoriteImage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FavoriteImage" DROP CONSTRAINT "FavoriteImage_userId_fkey";

-- DropIndex
DROP INDEX "FavoriteImage_userId_imageId_key";

-- AlterTable
ALTER TABLE "FavoriteImage" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteImage_userEmail_imageId_key" ON "FavoriteImage"("userEmail", "imageId");

-- AddForeignKey
ALTER TABLE "FavoriteImage" ADD CONSTRAINT "FavoriteImage_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
