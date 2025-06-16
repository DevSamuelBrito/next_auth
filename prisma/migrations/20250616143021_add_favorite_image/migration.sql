-- CreateTable
CREATE TABLE "FavoriteImage" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoriteImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteImage_userId_imageId_key" ON "FavoriteImage"("userId", "imageId");

-- AddForeignKey
ALTER TABLE "FavoriteImage" ADD CONSTRAINT "FavoriteImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteImage" ADD CONSTRAINT "FavoriteImage_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "UserImage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
