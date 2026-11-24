/*
  Warnings:

  - The primary key for the `UserSettings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userid` on the `UserSettings` table. All the data in the column will be lost.
  - Added the required column `userId` to the `UserSettings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserSettings" DROP CONSTRAINT "UserSettings_userid_fkey";

-- AlterTable
ALTER TABLE "UserSettings" DROP CONSTRAINT "UserSettings_pkey",
DROP COLUMN "userid",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("userId");

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
