/*
  Warnings:

  - Added the required column `slug` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "publicId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "releasedIn" TEXT NOT NULL,
    "story" TEXT NOT NULL,
    "avgScore" DECIMAL NOT NULL
);
INSERT INTO "new_Movie" ("avgScore", "id", "name", "publicId", "releasedIn", "story") SELECT "avgScore", "id", "name", "publicId", "releasedIn", "story" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
CREATE UNIQUE INDEX "Movie_publicId_key" ON "Movie"("publicId");
CREATE UNIQUE INDEX "Movie_slug_key" ON "Movie"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
