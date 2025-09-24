/*
  Warnings:

  - The primary key for the `UserProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserProfile` table. All the data in the column will be lost.
  - Added the required column `txHash` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."UserProfile_userId_key";

-- AlterTable
ALTER TABLE "public"."Transaction" ADD COLUMN     "txHash" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."UserProfile" DROP CONSTRAINT "UserProfile_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("userId");

-- CreateTable
CREATE TABLE "public"."Messages" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "say" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Messages_transactionId_key" ON "public"."Messages"("transactionId");

-- AddForeignKey
ALTER TABLE "public"."Messages" ADD CONSTRAINT "Messages_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "public"."Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Messages" ADD CONSTRAINT "Messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
