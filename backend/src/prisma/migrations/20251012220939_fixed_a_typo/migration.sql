/*
  Warnings:

  - The values [BLOCK_IDEAS] on the enum `UserPermission` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserPermission_new" AS ENUM ('BLOCK_ARTICLES', 'ALL');
ALTER TABLE "User" ALTER COLUMN "permissions" TYPE "UserPermission_new"[] USING ("permissions"::text::"UserPermission_new"[]);
ALTER TYPE "UserPermission" RENAME TO "UserPermission_old";
ALTER TYPE "UserPermission_new" RENAME TO "UserPermission";
DROP TYPE "UserPermission_old";
COMMIT;
