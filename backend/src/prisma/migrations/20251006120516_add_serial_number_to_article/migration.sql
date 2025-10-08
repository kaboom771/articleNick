/*
  Warnings:

  - A unique constraint covering the columns `[serialNumber]` on the table `Article` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "serialNumber" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Article_serialNumber_key" ON "Article"("serialNumber");
