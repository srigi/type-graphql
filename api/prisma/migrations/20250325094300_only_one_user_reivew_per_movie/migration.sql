/*
  Warnings:

  - A unique constraint covering the columns `[movieId,userId]` on the table `UserReview` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserReview_movieId_userId_key" ON "UserReview"("movieId", "userId");
