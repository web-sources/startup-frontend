import { create } from "zustand";

interface Room {
  id: string;
  name: string;
  description?: string;
  privacy: "public" | "private";
  room_type : "audio" | "video";
  interests: string[];
  participants?: string[] | undefined;
}

interface RoomStore {
  rooms: Room[];
  setRooms: (rooms: Room[]) => void;
  addRoom: (room: Room) => void;
}

export const useRoomStore = create<RoomStore>((set) => ({
  rooms: [],
  setRooms: (rooms) => set({ rooms }),
  addRoom: (room) => set((state) => ({ rooms: [room, ...state.rooms] })),
}));
