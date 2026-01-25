/*
  Warnings:

  - A unique constraint covering the columns `[uniqueKey]` on the table `conversations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uniqueKey` to the `conversations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "conversations" ADD COLUMN     "uniqueKey" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "conversations_uniqueKey_key" ON "conversations"("uniqueKey");
