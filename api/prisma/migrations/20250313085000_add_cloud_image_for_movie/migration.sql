-- CreateTable
CREATE TABLE "movie_image" (
    "movieId" INTEGER NOT NULL,
    "cloudImageId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,

    PRIMARY KEY ("movieId", "cloudImageId"),
    CONSTRAINT "movie_image_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "movie_image_cloudImageId_fkey" FOREIGN KEY ("cloudImageId") REFERENCES "CloudImage" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CloudImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "publicId" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "AR" DECIMAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "CloudImage_publicId_key" ON "CloudImage"("publicId");
