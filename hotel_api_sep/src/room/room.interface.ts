import { RoomReservationDetails } from './dto/room.dto';

export interface Room {
  id: number;
  name: string;
  reserved: boolean;
  details: string;
  price: number;
  reservationDetails: RoomReservationDetails | null;
  previousReservationDetails: RoomReservationDetails[];
  nextReservationDetails: RoomReservationDetails[];
}
