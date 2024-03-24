/*
  Warnings:

  - The primary key for the `UserLikedCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserLikedCategory` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "UserLikedCategory_userId_categoryId_key";

-- AlterTable
ALTER TABLE "UserLikedCategory" DROP CONSTRAINT "UserLikedCategory_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserLikedCategory_pkey" PRIMARY KEY ("userId", "categoryId");
