-- CreateTable
CREATE TABLE "movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "publicId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "released" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "rating" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "publicId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "createdAt" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,
    CONSTRAINT "rating_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movie" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "movie_publicId_key" ON "movie"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "movie_slug_key" ON "movie"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "rating_publicId_key" ON "rating"("publicId");

-- CreateIndex
CREATE INDEX "rating_movieId_idx" ON "rating"("movieId");
