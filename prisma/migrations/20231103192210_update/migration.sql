/*
  Warnings:

  - You are about to drop the column `userId` on the `Technologies` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Technologies" DROP CONSTRAINT "Technologies_userId_fkey";

-- AlterTable
ALTER TABLE "Technologies" DROP COLUMN "userId",
ADD COLUMN     "username" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Technologies" ADD CONSTRAINT "Technologies_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE SET NULL ON UPDATE CASCADE;
