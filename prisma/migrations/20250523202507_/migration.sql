/*
  Warnings:

  - Added the required column `description` to the `UserImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `UserImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserImage" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserImageTags" (
    "imageId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "UserImageTags_pkey" PRIMARY KEY ("imageId","tagId")
);

-- AddForeignKey
ALTER TABLE "UserImageTags" ADD CONSTRAINT "UserImageTags_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "UserImage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserImageTags" ADD CONSTRAINT "UserImageTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
