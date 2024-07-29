export interface Floor {
  floor: string;
  data: Room[];
}
export interface Room {
  floor: string;
  id: number;
  roomCode: string;
  roomTypeCode: string;
  blockBy: string | null;
  blockRemark: string | null;
  blockStatus: string | null;
  hkStatus: string;
  isBlocked: string;
  roomStatus: string;
  noofGuest: number | null;
  isBackToBack: number;
  guestStatus: string | null;
  roomTypeName: string;
}

export interface RoomDetails {
  data: Room[][];
  floor: string;
}

export interface FloorData {
  data: Room[][];
  floor: string;
}

export type RoomData = FloorData[];
