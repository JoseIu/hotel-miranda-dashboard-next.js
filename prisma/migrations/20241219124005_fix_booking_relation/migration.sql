/*
  Warnings:

  - You are about to drop the column `room_id` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `room_number` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_room_id_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "room_id",
ADD COLUMN     "room_number" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_room_number_fkey" FOREIGN KEY ("room_number") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
