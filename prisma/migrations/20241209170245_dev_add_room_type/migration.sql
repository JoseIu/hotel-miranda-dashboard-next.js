/*
  Warnings:

  - Added the required column `room_type` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "room_type" "RoomType" NOT NULL;
