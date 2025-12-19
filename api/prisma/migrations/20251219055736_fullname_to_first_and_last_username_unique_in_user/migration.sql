/*
  Warnings:

  - You are about to drop the column `name` on the `app_users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `app_users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firstName` to the `app_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `app_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `app_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "app_users" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "app_users_username_key" ON "app_users"("username");
