/*
  Warnings:

  - You are about to drop the column `attachments` on the `messages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "messages" DROP COLUMN "attachments",
ADD COLUMN     "attachment" TEXT,
ALTER COLUMN "body" DROP NOT NULL;
