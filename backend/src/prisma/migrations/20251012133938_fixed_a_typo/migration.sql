/*
  Warnings:

  - The `permissions` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserPermission" AS ENUM ('BLOCK_IDEAS', 'ALL');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "permissions",
ADD COLUMN     "permissions" "UserPermission"[];

-- DropEnum
DROP TYPE "UserPermissoin";
