/*
  Warnings:

  - You are about to drop the column `room_number` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `room_id` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_room_number_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "room_number",
ADD COLUMN     "room_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
