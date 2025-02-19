/*
  Warnings:

  - You are about to drop the `Rating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `avgRating` on the `Movie` table. All the data in the column will be lost.
  - Added the required column `avgScore` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Rating_userId_idx";

-- DropIndex
DROP INDEX "Rating_movieId_idx";

-- DropIndex
DROP INDEX "Rating_publicId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Rating";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UserReview" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "publicId" TEXT NOT NULL,
    "movieId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "score" DECIMAL NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserReview_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "publicId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "releasedIn" TEXT NOT NULL,
    "story" TEXT NOT NULL,
    "avgScore" DECIMAL NOT NULL
);
INSERT INTO "new_Movie" ("id", "name", "publicId", "releasedIn", "story") SELECT "id", "name", "publicId", "releasedIn", "story" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
CREATE UNIQUE INDEX "Movie_publicId_key" ON "Movie"("publicId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "UserReview_publicId_key" ON "UserReview"("publicId");

-- CreateIndex
CREATE INDEX "UserReview_movieId_idx" ON "UserReview"("movieId");

-- CreateIndex
CREATE INDEX "UserReview_userId_idx" ON "UserReview"("userId");
