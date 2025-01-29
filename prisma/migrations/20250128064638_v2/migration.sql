-- CreateEnum
CREATE TYPE "token_type" AS ENUM ('auth', 'otp');

-- CreateTable
CREATE TABLE "access_token" (
    "id" TEXT NOT NULL,
    "expires_in" TEXT NOT NULL,
    "is_used" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "usedAt" TIMESTAMP(3),
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "access_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "access_token_token_key" ON "access_token"("token");

-- AddForeignKey
ALTER TABLE "access_token" ADD CONSTRAINT "access_token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
