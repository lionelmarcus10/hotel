import { Injectable, NotFoundException } from '@nestjs/common';
import { Room } from './room.interface';
import Room_db from '../local_db';

@Injectable()
export class RoomService {
  rooms: Room[] = Room_db;

  // toute les chambres
  findAllRooms(): Room[] {
    return this.rooms;
  }

  // chambres disponibles
  findDisponibleRooms(): Room[] {
    return this.rooms.filter((room) => room.disponible);
  }

  // chambres non disponibles
  findReservedRooms(): Room[] {
    return this.rooms.filter((room) => !room.disponible);
  }

  // detail d'une chambre
  findRoomById(id: number): Room {
    // faire un truc pour chambre non existante
    return this.rooms.find((room) => room.id === id);
  }

  // detail d'une reservation
  findReservationDetailById(id: number): string {
    const temp_db = this.rooms.find((room) => room.id === id);
    if (temp_db.reserved) {
      return temp_db.reservation_details;
    } else {
      return 'Not reserved so no reservation details';
    }
  }

  // reserver une chambre
  reserveRoom(id: number, reservation_details: string) {
    // find room
    const RoomUpdate = this.rooms.find((room) => room.id === id);
    if (!RoomUpdate) {
      return new NotFoundException('Room not found');
    } else {
      if (RoomUpdate.disponible) {
        // update room
        RoomUpdate.disponible = false;
        RoomUpdate.reserved = true;
        RoomUpdate.reservation_details = reservation_details;

        // update db
        const UpdatedRoom = this.rooms.map((room) =>
          room.id === id ? RoomUpdate : room,
        );
        this.rooms = [...UpdatedRoom];
        return `Room ${id} reserved successfully, reservation details : ${reservation_details}`;
      } else {
        return new NotFoundException('Room already reserved');
      }
    }
  }

  // suppression d'une reservation
  deleteReservation(id: number): string | NotFoundException {
    // find room
    const RoomUpdate = this.rooms.find((room) => room.id === id);
    if (!RoomUpdate) {
      return new NotFoundException('Room not found');
    } else {
      if (!RoomUpdate.disponible) {
        // update room
        RoomUpdate.disponible = true;
        RoomUpdate.reserved = false;
        RoomUpdate.reservation_details = null;

        // update db
        const UpdatedRoom = this.rooms.map((room) =>
          room.id === id ? RoomUpdate : room,
        );
        this.rooms = [...UpdatedRoom];
        return `Reservation for room ${id} deleted successfully`;
      } else {
        return new NotFoundException('Room not reserved');
      }
    }
  }

  // modification d'une reservation
  updateReservation(id: number, reservation_details: string) {
    // find room
    const RoomUpdate = this.rooms.find((room) => room.id === id);
    if (!RoomUpdate) {
      return new NotFoundException('Room not found');
    } else {
      if (!RoomUpdate.disponible) {
        // update room
        RoomUpdate.reservation_details = reservation_details;

        // update db
        const UpdatedRoom = this.rooms.map((room) =>
          room.id === id ? RoomUpdate : room,
        );
        this.rooms = [...UpdatedRoom];
        return `Reservation details for room ${id} updated successfully`;
      } else {
        return new NotFoundException('Room not reserved yet');
      }
    }
  }
}
