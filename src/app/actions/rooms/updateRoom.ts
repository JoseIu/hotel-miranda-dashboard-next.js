'use server';

import { UpdateRoom } from '@/interfaces';
import prisma from '@/lib/prisma';

export const updateRoomAction = async (room_id: string, roomToUpdate: Partial<UpdateRoom>) => {
  if (!room_id) return;

  try {
    const currentRoom = await prisma.room.findUnique({ where: { id: room_id } });

    if (!currentRoom) throw new Error('Room not found');

    const changedEntries = getEntriesChangedRoom(currentRoom, roomToUpdate);

    if (!changedEntries.length) throw new Error('No changes');

    await prisma.room.update({
      where: { id: room_id },
      data: Object.fromEntries(changedEntries.map(({ field, newValue }) => [field, newValue])),
    });
    return {
      error: false,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: true,
      };
    }
  }
};

interface EntriesChanged {
  field: string;
  newValue: string | number | boolean;
}

const getEntriesChangedRoom = (current: UpdateRoom, roomToCheck: Partial<UpdateRoom>): EntriesChanged[] => {
  return Object.entries(roomToCheck)
    .filter(([key, newValue]) => {
      const currentValue = current[key as keyof UpdateRoom];

      if (typeof currentValue === 'number' && typeof newValue === 'number') {
        return currentValue !== newValue;
      }
      if (typeof currentValue === 'boolean' && typeof newValue === 'boolean') {
        return currentValue !== newValue;
      }

      if (typeof currentValue === 'string' && typeof newValue === 'string') {
        return currentValue.trim() !== newValue.trim();
      }

      return currentValue !== newValue;
    })
    .map(([key, newValue]) => ({
      field: key,
      newValue,
    }));
};
