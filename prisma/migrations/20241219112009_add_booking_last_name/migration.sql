/*
  Warnings:

  - Added the required column `guest_last_name` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "guest_last_name" TEXT NOT NULL;
