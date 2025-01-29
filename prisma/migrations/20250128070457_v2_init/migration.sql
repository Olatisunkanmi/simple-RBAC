/*
  Warnings:

  - You are about to drop the column `userId` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRolePermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserRolePermissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_roles_permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_user_roles` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[roleId,action,resource]` on the table `permissions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `roleId` to the `permissions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "UserRolePermission" DROP CONSTRAINT "UserRolePermission_roleId_fkey";

-- DropForeignKey
ALTER TABLE "UserRolePermission" DROP CONSTRAINT "UserRolePermission_userId_fkey";

-- DropForeignKey
ALTER TABLE "_UserRolePermissions" DROP CONSTRAINT "_UserRolePermissions_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserRolePermissions" DROP CONSTRAINT "_UserRolePermissions_B_fkey";

-- DropForeignKey
ALTER TABLE "_roles_permissions" DROP CONSTRAINT "_roles_permissions_A_fkey";

-- DropForeignKey
ALTER TABLE "_roles_permissions" DROP CONSTRAINT "_roles_permissions_B_fkey";

-- DropForeignKey
ALTER TABLE "_user_roles" DROP CONSTRAINT "_user_roles_A_fkey";

-- DropForeignKey
ALTER TABLE "_user_roles" DROP CONSTRAINT "_user_roles_B_fkey";

-- DropForeignKey
ALTER TABLE "access_token" DROP CONSTRAINT "access_token_user_id_fkey";

-- DropIndex
DROP INDEX "permissions_action_resource_key";

-- AlterTable
ALTER TABLE "permissions" ADD COLUMN     "description" TEXT,
ADD COLUMN     "roleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "userId",
ADD COLUMN     "isSystem" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "organizationId" TEXT;

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserRolePermission";

-- DropTable
DROP TABLE "_UserRolePermissions";

-- DropTable
DROP TABLE "_roles_permissions";

-- DropTable
DROP TABLE "_user_roles";

-- DropEnum
DROP TYPE "token_type";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "organizationId" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permission_fields" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "permission_fields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_userId_roleId_key" ON "user_roles"("userId", "roleId");

-- CreateIndex
CREATE UNIQUE INDEX "permission_fields_permissionId_name_key" ON "permission_fields"("permissionId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_roleId_action_resource_key" ON "permissions"("roleId", "action", "resource");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permission_fields" ADD CONSTRAINT "permission_fields_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_token" ADD CONSTRAINT "access_token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
