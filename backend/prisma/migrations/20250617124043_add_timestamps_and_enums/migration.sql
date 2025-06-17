-- CreateEnum
CREATE TYPE "VacationType" AS ENUM ('Urlaub', 'Krankheit', 'Mutterschutz', 'Elternzeit', 'Pflegezeit', 'Miscellaneous', 'Kindkrankentage');

-- CreateEnum
CREATE TYPE "VacationStatus" AS ENUM ('pending', 'approved', 'rejected');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "fullname" TEXT,
    "phone" TEXT,
    "position" TEXT NOT NULL,
    "password" TEXT,
    "isAdmin" BOOLEAN NOT NULL,
    "vacationDaysUsed" INTEGER NOT NULL DEFAULT 0,
    "vacationDaysTotal" INTEGER NOT NULL DEFAULT 30,
    "profilePicture" TEXT,
    "provider" TEXT NOT NULL,
    "googleId" TEXT,
    "githubId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vacation" (
    "id" SERIAL NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Vacation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Vacation" ADD CONSTRAINT "Vacation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
