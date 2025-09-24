/*
  Warnings:

  - You are about to drop the column `address` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[address]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userName]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `UserProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `UserProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "address";

-- AlterTable
ALTER TABLE "public"."UserProfile" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_address_key" ON "public"."UserProfile"("address");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userName_key" ON "public"."UserProfile"("userName");
